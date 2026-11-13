/* Feed real tick a tick: Binance USD-M Futures (público, sin clave).
   - Trades: cada aggTrade con su agresor real. Los ids son consecutivos:
     si falta uno se detecta y se recupera por REST antes de seguir.
   - Libro: snapshot + diffs con la secuencia oficial (U / u / pu). Si se rompe, se resincroniza.
   Cualquier otro feed (Rithmic, Databento, dxFeed) solo tiene que emitir lo mismo:
     cb.trade(tMs, precioTicks, cantidad, agresorVende, tEvento)  ·  this.bids / this.asks (Map ticks → cantidad) */
(function (root) {
  'use strict';
  const REST = 'https://fapi.binance.com/fapi/v1/';

  class BinanceFeed {
    constructor(sym, cb, backMin) {
      this.s = sym; this.cb = cb; this.backMin = backMin || 10;
      this.bids = new Map(); this.asks = new Map();
      this.alive = true; this.lastId = null; this.q = []; this.dq = [];
      this.ready = false; this.bookOk = false; this.filling = false;
      this.gaps = 0; this.lost = 0; this.resyncs = 0; this.lu = null; this.L = 0;
    }
    px(s) { return Math.round(parseFloat(s) / this.s.tick); }
    start() { this.open(); }
    stop() { this.alive = false; for (const w of [this.wt, this.wd]) try { w.close(); } catch (e) {} }
    /* Binance separa los canales: /market = trades, /public = libro */
    open() { this.openT(); this.openD(); }
    openT() {
      const ws = this.wt = new WebSocket(`wss://fstream.binance.com/market/stream?streams=${this.s.id.toLowerCase()}@aggTrade/${this.s.id.toLowerCase()}@forceOrder`);
      ws.onopen = () => { this.cb.status('sincronizando'); this.fill(); };
      ws.onmessage = e => { const d = JSON.parse(e.data).data; if (!d) return; if (d.e === 'aggTrade') { this.lastMsg = Date.now(); this.onT(d); }
        else if (d.e === 'forceOrder' && d.o && this.cb.liq) this.cb.liq({ t: d.o.T, p: this.px(d.o.ap || d.o.p), q: +d.o.q, s: d.o.S === 'SELL' ? 1 : 0 }); }; // liquidación: posición cerrada a la fuerza
      ws.onclose = () => {
        if (!this.alive) return;
        this.cb.status('reconectando'); this.ready = false;
        setTimeout(() => this.alive && this.openT(), 1500);
      };
    }
    openD() {
      const ws = this.wd = new WebSocket(`wss://fstream.binance.com/public/stream?streams=${this.s.id.toLowerCase()}@depth@100ms`);
      ws.onopen = () => this.snap();
      ws.onmessage = e => { const d = JSON.parse(e.data).data; if (d && d.e === 'depthUpdate') this.onD(d); };
      ws.onclose = () => {
        if (!this.alive) return;
        this.bookOk = false; this.lu = null; this.dq = [];
        setTimeout(() => this.alive && this.openD(), 1500);
      };
    }
    emit(d) { if (this.firstId == null) { this.firstId = d.a; this.firstT = d.T; } this.cb.trade(d.T, this.px(d.p), +d.q, d.m ? 1 : 0, d.E || 0); }

    /* ---- trades ---- */
    onT(d) {
      if (!this.ready) { this.q.push(d); return; }
      if (!this.ap(d)) { this.q.unshift(d); this.fill(); }
    }
    ap(d) { // false = hay hueco antes de este trade
      if (this.lastId != null) {
        if (d.a <= this.lastId) return true;
        if (d.a > this.lastId + 1) { this.gaps++; this.ready = false; return false; }
      }
      this.lastId = d.a; this.emit(d); return true;
    }
    async fill() {
      if (this.filling) return; this.filling = true;
      const first = this.lastId == null;
      const start = Math.floor((Date.now() - this.backMin * 60000) / 60000) * 60000;
      let reqs = 0, capped = false;
      try {
        for (;;) {
          const u = REST + `aggTrades?symbol=${this.s.id}&limit=1000&` +
            (this.lastId == null ? `startTime=${start}` : `fromId=${this.lastId + 1}`);
          const r = await fetch(u); if (!r.ok) throw new Error('HTTP ' + r.status);
          const a = await r.json(); reqs++;
          if (!this.alive) return;
          for (const d of a) { if (this.lastId != null && d.a <= this.lastId) continue; this.lastId = d.a; this.emit(d); }
          if (first && a.length) this.cb.status('cargando historia ' + Math.min(99, Math.round((a[a.length - 1].T - start) / (Date.now() - start) * 100)) + '%');
          if (a.length < 1000) break;
          if (this.q.length && this.lastId >= this.q[0].a - 1) break;
          if (reqs >= 110) { capped = true; break; }
          if (reqs > 30) await new Promise(r => setTimeout(r, 600)); // respeta el límite de peticiones del exchange
        }
      } catch (e) { this.cb.status('sin historial (' + e.message + ')'); }
      if (capped && first) { this.cb.reset(); this.lastId = null; this.firstId = null; } // demasiado atrás: arrancar limpio en vivo
      this.filling = false; this.ready = true;
      const q = this.q; this.q = [];
      let just = true;
      for (let i = 0; i < q.length; i++) {
        const d = q[i];
        if (just && this.lastId != null && d.a > this.lastId + 1) { this.lost += d.a - this.lastId - 1; this.lastId = d.a - 1; }
        just = false;
        if (!this.ap(d)) { this.q = q.slice(i).concat(this.q); this.fill(); return; }
      }
      this.cb.status('en vivo');
    }

    /* Historia profunda: los ids son consecutivos, así que pedir los 1000 anteriores al más viejo es exacto.
       Va hacia atrás, una petición por segundo, hasta llegar a untilT. */
    async deepen(untilT) {
      if (this.deep) return; this.deep = true; let err = 0;
      const sleep = ms => new Promise(r => setTimeout(r, ms));
      while (this.alive && !this.deepStop && this.firstId != null && this.firstT > untilT && this.firstId > 1000) {
        try {
          const r = await fetch(REST + `aggTrades?symbol=${this.s.id}&fromId=${this.firstId - 1000}&limit=1000`);
          if (r.status === 429 || r.status === 418) { await sleep(Math.max(30, +(r.headers.get('Retry-After') || 60)) * 1000); continue; } // exceso de peticiones: espera lo que pide Binance
          if (!r.ok) throw new Error('HTTP ' + r.status);
          const b = (await r.json()).filter(d => d.a < this.firstId);
          if (!this.alive) return; if (!b.length) break;
          this.firstId = b[0].a; this.firstT = b[0].T; this.cb.older(b); err = 0;
        } catch (e) { if (++err > 4) break; await sleep(6000); continue; }
        await sleep(1000);
      }
      this.deep = false; this.deepEnd = true;
    }

    /* ---- libro ---- */
    onD(d) {
      if (!this.bookOk) { this.dq.push(d); if (this.dq.length > 5000) this.dq.shift(); return; }
      this.apD(d);
    }
    apD(d) {
      if (d.u < this.L) return;
      if (this.lu != null && d.pu !== this.lu) { this.resyncs++; this.bookOk = false; this.lu = null; this.dq = [d]; this.snap(); return; }
      for (const [p, q] of d.b) { const k = this.px(p), v = +q; if (v) this.bids.set(k, v); else this.bids.delete(k); }
      for (const [p, q] of d.a) { const k = this.px(p), v = +q; if (v) this.asks.set(k, v); else this.asks.delete(k); }
      this.lu = d.u; this.bookT = d.E;
    }
    async snap() {
      if (this.snapping) return; this.snapping = true;
      try {
        const r = await fetch(REST + `depth?symbol=${this.s.id}&limit=1000`); if (!r.ok) throw new Error('HTTP ' + r.status);
        const j = await r.json(); if (!this.alive) return;
        this.bids.clear(); this.asks.clear();
        for (const [p, q] of j.bids) this.bids.set(this.px(p), +q);
        for (const [p, q] of j.asks) this.asks.set(this.px(p), +q);
        this.L = j.lastUpdateId; this.lu = null;
        const q = this.dq.filter(d => d.u >= this.L); this.dq = [];
        if (q.length && q[0].U > this.L + 1) { this.snapping = false; this.dq = q; setTimeout(() => this.snap(), 700); return; }
        this.bookOk = true;
        for (const d of q) { if (!this.bookOk) break; this.apD(d); }
      } catch (e) { setTimeout(() => { this.snapping = false; this.alive && this.snap(); }, 2000); return; }
      this.snapping = false;
    }
    best() {
      let bb = -Infinity, ba = Infinity;
      for (const k of this.bids.keys()) if (k > bb) bb = k;
      for (const k of this.asks.keys()) if (k < ba) ba = k;
      return [bb, ba];
    }
    /* velas oficiales del exchange, para auditar mi propio conteo */
    async klines(n) {
      const r = await fetch(REST + `klines?symbol=${this.s.id}&interval=1m&limit=${n}`);
      return (await r.json()).map(k => ({ t: k[0], v: Math.round(parseFloat(k[5]) * 1e6), b: Math.round(parseFloat(k[9]) * 1e6) }));
    }
  }
  root.BinanceFeed = BinanceFeed;
})(this);
