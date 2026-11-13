/* NORTHPOINT DEPTH · motor de order flow.
   Precios SIEMPRE en ticks enteros (sin errores de punto flotante).
   Cada trade trae su lado agresor real del exchange: nada se estima. */
(function (root) {
  'use strict';
  const SC = 1e6; // escala entera para auditar volumen

  class Engine {
    constructor(o) {
      this.max = 3000000; this.cap = 1 << 17; // crece al doble según llegan trades, hasta 3 millones
      this.T = new Float64Array(this.cap);
      this.P = new Int32Array(this.cap);
      this.Q = new Float64Array(this.cap);
      this.S = new Uint8Array(this.cap);
      this.n = 0;
      this.o = Object.assign({ type: 'time', size: 60000, group: 10, ratio: 3, minImb: 0, va: 0.7 }, o);
      this.mins = new Map();
      this.firstT = null;
      this.reset();
    }
    reset() {
      this.bars = []; this.prof = new Map();
      this.vol = 0; this.pv = 0; this.cvd = 0; this.pmax = 0; this.ppoc = 0;
    }
    set(o) {
      Object.assign(this.o, o); this.reset();
      for (let i = 0; i < this.n; i++) this._ap(this.T[i], this.P[i], this.Q[i], this.S[i]);
    }
    clear() { this.n = 0; this.mins.clear(); this.firstT = null; this.last = undefined; this.reset(); }

    /* t ms · p ticks enteros · q cantidad · s 1 = agresor VENDE (pega al bid), 0 = agresor COMPRA */
    add(t, p, q, s) {
      if (this.n === this.cap && this.cap < this.max) this.grow(this.cap * 2);
      if (this.n === this.cap) {
        const h = this.cap >> 1;
        this.T.copyWithin(0, h); this.P.copyWithin(0, h); this.Q.copyWithin(0, h); this.S.copyWithin(0, h);
        this.n = h;
      }
      const i = this.n++;
      this.T[i] = t; this.P[i] = p; this.Q[i] = q; this.S[i] = s;
      if (this.firstT == null) this.firstT = t;
      const mk = Math.floor(t / 60000) * 60000;
      let m = this.mins.get(mk);
      if (!m) {
        m = { v: 0, b: 0, n: 0 }; this.mins.set(mk, m);
        if (this.mins.size > 180) this.mins.delete(this.mins.keys().next().value);
      }
      const qi = Math.round(q * SC);
      m.v += qi; m.n++; if (!s) m.b += qi;
      this._ap(t, p, q, s);
    }
    /* mete trades MÁS VIEJOS al inicio (historia que se va cargando hacia atrás). Después hay que llamar set({}) */
    grow(c) {
      c = Math.min(this.max, c); if (c <= this.cap) return;
      const t = new Float64Array(c), p = new Int32Array(c), q = new Float64Array(c), s = new Uint8Array(c);
      t.set(this.T.subarray(0, this.n)); p.set(this.P.subarray(0, this.n)); q.set(this.Q.subarray(0, this.n)); s.set(this.S.subarray(0, this.n));
      this.T = t; this.P = p; this.Q = q; this.S = s; this.cap = c;
    }
    prepend(T, P, Q, S, k) {
      if (this.n + k > this.cap) { let c = this.cap; while (c < this.n + k && c < this.max) c *= 2; this.grow(c); }
      if (this.n + k > this.cap) return false;
      this.T.copyWithin(k, 0, this.n); this.P.copyWithin(k, 0, this.n); this.Q.copyWithin(k, 0, this.n); this.S.copyWithin(k, 0, this.n);
      this.T.set(T.subarray(0, k)); this.P.set(P.subarray(0, k)); this.Q.set(Q.subarray(0, k)); this.S.set(S.subarray(0, k));
      this.n += k; this.firstT = this.T[0]; return true;
    }
    _closes(b, t, p) {
      const o = this.o;
      if (o.type === 'time') return t >= b.t0 + o.size;
      if (o.type === 'ticks') return b.n >= o.size;
      if (o.type === 'volume') return b.vol >= o.size;
      if (o.type === 'delta') return Math.abs(b.buy - b.sell) >= o.size;
      return Math.max(b.h, p) - Math.min(b.l, p) > o.size; // range, en ticks
    }
    _ap(t, p, q, s) {
      const o = this.o, g = o.group, k = Math.floor(p / g) * g;
      let b = this.bars[this.bars.length - 1];
      if (!b || this._closes(b, t, p)) {
        b = { t0: o.type === 'time' ? Math.floor(t / o.size) * o.size : t, t1: t, o: p, h: p, l: p, c: p,
              vol: 0, buy: 0, sell: 0, n: 0, dmax: 0, dmin: 0, lv: new Map(), cvd: this.cvd, st: null };
        this.bars.push(b);
      }
      b.t1 = t; b.c = p; if (p > b.h) b.h = p; if (p < b.l) b.l = p;
      b.vol += q; b.n++; b.st = null;
      let e = b.lv.get(k); if (!e) { e = [0, 0]; b.lv.set(k, e); } // [bid, ask]
      if (s) { b.sell += q; e[0] += q; this.cvd -= q; } else { b.buy += q; e[1] += q; this.cvd += q; }
      b.cvd = this.cvd;
      const dd = b.buy - b.sell; if (dd > b.dmax) b.dmax = dd; if (dd < b.dmin) b.dmin = dd; // extremos del delta dentro de la barra
      let pe = this.prof.get(k); if (!pe) { pe = [0, 0]; this.prof.set(k, pe); }
      pe[s ? 0 : 1] += q;
      const tv = pe[0] + pe[1]; if (tv > this.pmax) { this.pmax = tv; this.ppoc = k; }
      this.vol += q; this.pv += p * q; this.last = p; this.lastT = t; this.lastS = s;
    }

    /* área de valor: se expande desde el POC hacia el lado con más volumen */
    static valueArea(get, poc, pocVol, total, pct, g, kl, kh) {
      let lo = poc, hi = poc, acc = pocVol; const tgt = total * pct;
      while (acc < tgt && (lo > kl || hi < kh)) {
        const u = hi < kh ? get(hi + g) : -1, d = lo > kl ? get(lo - g) : -1;
        if (u >= d) { hi += g; acc += u; } else { lo -= g; acc += d; }
      }
      return [lo, hi];
    }
    stats(b) {
      if (b.st) return b.st;
      const g = this.o.group, r = this.o.ratio, mn = this.o.minImb;
      let poc = 0, mx = -1, mxs = 0;
      for (const [k, e] of b.lv) {
        const v = e[0] + e[1];
        if (v > mx || (v === mx && k < poc)) { mx = v; poc = k; }
        if (e[0] > mxs) mxs = e[0]; if (e[1] > mxs) mxs = e[1];
      }
      const kl = Math.floor(b.l / g) * g, kh = Math.floor(b.h / g) * g;
      const V = k => { const e = b.lv.get(k); return e ? e[0] + e[1] : 0; };
      const [val, vah] = Engine.valueArea(V, poc, mx, b.vol, this.o.va, g, kl, kh);
      /* desbalance diagonal: ask[k] contra bid[k-g]; bid[k] contra ask[k+g] */
      const imb = new Map();
      for (const [k, e] of b.lv) {
        if (k - g >= kl && e[1] > 0 && e[1] >= mn) {
          const lo = b.lv.get(k - g), bb = lo ? lo[0] : 0;
          if (e[1] >= r * bb) imb.set(k, 1);
        }
        if (k + g <= kh && e[0] > 0 && e[0] >= mn) {
          const up = b.lv.get(k + g), aa = up ? up[1] : 0;
          if (e[0] >= r * aa) imb.set(k, imb.get(k) === 1 ? 0 : -1); // ambos lados: se anulan
        }
      }
      for (const [k, v] of imb) if (v === 0) imb.delete(k);
      /* apilados: 3 o más seguidos del mismo lado */
      const zones = []; // [precio abajo, precio arriba, lado]
      for (let k = kl; k <= kh; k += g) {
        const s = imb.get(k); if (!s) continue;
        let j = k; while (Math.sign(imb.get(j + g) || 0) === Math.sign(s)) j += g;
        if ((j - k) / g + 1 >= 3) { for (let x = k; x <= j; x += g) imb.set(x, 2 * Math.sign(s)); zones.push([k, j, Math.sign(s)]); }
        k = j;
      }
      return (b.st = { poc, mx, mxs, val, vah, imb, zones });
    }
    profStats() {
      if (!this.prof.size) return null;
      let kl = Infinity, kh = -Infinity;
      for (const k of this.prof.keys()) { if (k < kl) kl = k; if (k > kh) kh = k; }
      const V = k => { const e = this.prof.get(k); return e ? e[0] + e[1] : 0; };
      const [val, vah] = Engine.valueArea(V, this.ppoc, this.pmax, this.vol, this.o.va, this.o.group, kl, kh);
      return { poc: this.ppoc, val, vah, vwap: this.pv / this.vol };
    }
    /* índice del primer trade con T >= t */
    seek(t) { let a = 0, b = this.n; while (a < b) { const m = (a + b) >> 1; if (this.T[m] < t) a = m + 1; else b = m; } return a; }
  }
  Engine.SC = SC;
  if (typeof module !== 'undefined') module.exports = Engine; else root.Engine = Engine;
})(this);
