/* NORTHPOINT DEPTH · plataforma: gráfico de clusters con historia profunda, heatmap, libro, cinta,
   indicadores, dibujos, replay, terminal simulada y auditoría. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const QS = new URLSearchParams(location.search), PANE = QS.get('pane') === '1', DEMO = PANE; // PANE = gráfico dentro de la cuadrícula
  const ses = NPAuth.session();
  if (!ses) { if (!PANE) location.replace('login.html'); return; }
  if (!NPLic.gate(PANE)) return; // sin licencia activa: pantalla de activación
  if (PANE) document.body.classList.add('pane');
  const MONO = '"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace';
  const REST = 'https://fapi.binance.com/fapi/v1/';
  const C = { up: '#22d3ee', dn: '#3d5afe', ac: '#5ab0ff', tx: '#e8ecf3', mut: '#7c8696', line: 'rgba(255,255,255,.06)' };
  const up = a => `rgba(34,211,238,${a})`, dn = a => `rgba(61,90,254,${a})`, bl = a => `rgba(90,176,255,${a})`;

  /* ---------- mercados ---------- */
  /* tick = tamaño real del tick · groups/hg/rng en ticks · qd = decimales de cantidad (respaldo si falla la lista) */
  let SY = [
    { id: 'BTCUSDT', tick: 0.1, dec: 1, qd: 3, groups: [10, 50, 100, 250, 500], g0: 100, hg: 10, volBar: 100, dBar: 25, rng: 500, tape: [0.5, 1, 5, 10], minImb: 0.5, big: 5, q0: 0.1 },
    { id: 'ETHUSDT', tick: 0.01, dec: 2, qd: 3, groups: [10, 25, 50, 100, 200], g0: 50, hg: 10, volBar: 2000, dBar: 500, rng: 300, tape: [10, 50, 100, 500], minImb: 5, big: 100, q0: 1 },
    { id: 'SOLUSDT', tick: 0.01, dec: 2, qd: 2, groups: [1, 2, 5, 10, 20], g0: 5, hg: 1, volBar: 20000, dBar: 5000, rng: 30, tape: [100, 500, 1000, 5000], minImb: 50, big: 1000, q0: 10 }
  ];
  const nice = x => { const p = Math.pow(10, Math.floor(Math.log10(x))), m = x / p; return +((m < 1.5 ? 1 : m < 3.5 ? 2.5 : m < 7.5 ? 5 : 10) * p).toPrecision(3); };
  const niceI = x => Math.max(1, Math.round(nice(Math.max(1, x))));
  const niceStep = x => { if (!(x > 1)) return 1; const p = Math.pow(10, Math.floor(Math.log10(x))), m = x / p; return Math.round((m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p); };
  const decs = s => { s = String(+s); if (s.includes('e-')) return +s.split('e-')[1]; const i = s.indexOf('.'); return i < 0 ? 0 : s.length - i - 1; };
  /* Los perpetuos USDT de Binance: tick, filas, trade grande, etc. salen del precio y del volumen real de 24 h */
  const ETF = { QQQ: 'Nasdaq 100', SPY: 'S&P 500', DIA: 'Dow Jones', IWM: 'Russell 2000', EWY: 'Corea', EWJ: 'Japón', SOXL: 'Semiconductores x3', TQQQ: 'Nasdaq 100 x3', SQQQ: 'Nasdaq 100 inverso x3', GLD: 'Oro (ETF)', SLV: 'Plata (ETF)', TLT: 'Bonos 20 años', EEM: 'Emergentes', FXI: 'China', ARKK: 'ARK Innovation', XLE: 'Energía', XLF: 'Financiero', SMH: 'Semiconductores' };
  const MAT = { XAU: 'Oro', XAG: 'Plata', XPT: 'Platino', XPD: 'Paladio', CL: 'Petróleo WTI', BZ: 'Petróleo Brent', NATGAS: 'Gas natural', COPPER: 'Cobre' };
  async function loadSyms() {
    /* la lista se guarda 10 min en esta pestaña: los gráficos de la cuadrícula no la vuelven a pedir (ticker/24hr pesa 40 en el límite de Binance) */
    try { const c = JSON.parse(sessionStorage.getItem('npd.sy')); if (c && Date.now() - c.t < 600000 && c.sy.length) { SY = c.sy; return; } } catch (e) {}
    const [ei, tk] = await Promise.all(['exchangeInfo', 'ticker/24hr'].map(p => fetch(REST + p).then(r => r.json())));
    const T = new Map(tk.map(t => [t.symbol, t])), out = [];
    for (const s of ei.symbols) {
      if (s.status !== 'TRADING' || s.quoteAsset !== 'USDT' || (s.contractType !== 'PERPETUAL' && s.contractType !== 'TRADIFI_PERPETUAL')) continue;
      const base = s.symbol.replace(/USDT$/, ''), cat = s.contractType === 'PERPETUAL' ? 'Cripto' : s.underlyingType === 'COMMODITY' ? 'Materias primas' : ETF[base] ? 'Índices y ETF' : 'Acciones';
      const t = T.get(s.symbol); if (!t || !(+t.lastPrice > 0) || !(+t.volume > 0)) continue;
      const pf = s.filters.find(f => f.filterType === 'PRICE_FILTER'), lf = s.filters.find(f => f.filterType === 'LOT_SIZE');
      const tick = +pf.tickSize, g0 = niceI(+t.lastPrice * 0.00015 / tick), m = +t.volume / 1440, big = nice(m / 20);
      out.push({ id: s.symbol, step: +lf.stepSize, minQ: +lf.minQty, cat, name: ETF[base] || MAT[base] || '', tick, dec: decs(pf.tickSize), qd: Math.min(3, decs(lf.stepSize)), g0,
        groups: [...new Set([0.1, 0.5, 1, 2.5, 5].map(k => Math.max(1, Math.round(g0 * k))))], hg: Math.max(1, Math.round(g0 / 10)),
        volBar: nice(m), dBar: nice(m / 4), rng: g0 * 5, tape: [nice(big / 10), nice(big / 4), big, nice(big * 2)], minImb: nice(m / 200), big,
        q0: Math.max(+lf.stepSize, nice(m / 1000)), qv: +t.quoteVolume });
    }
    out.sort((a, b) => b.qv - a.qv);
    const by = (c, n) => out.filter(s => s.cat === c).slice(0, n);
    if (out.length) SY = [...by('Cripto', 60), ...by('Índices y ETF', 20), ...by('Materias primas', 20), ...by('Acciones', 50)];
    try { sessionStorage.setItem('npd.sy', JSON.stringify({ t: Date.now(), sy: SY })); } catch (e) {}
  }

  /* ---------- ajustes guardados por usuario ---------- */
  const CK = 'npd.cfg2.' + ses.email;
  const IND0 = { prof: 1, vwap: 1, bands: 0, ema1: 0, ema2: 0, big: 1, imb: 1, zones: 1, poc: 1, heat: 0, stats: 1, day: 1, liq: 1, sess: 0, ice: 1, cvds: 0, cal: 1 };
  const cfg = { sym: 'BTCUSDT', bar: 'time:60000', mode: 'ba', imb: '3', dep: '2', e1: 20, e2: 50, srch: 0, bigX: 2, alSnd: 1, alBig: 0, ind: Object.assign({}, IND0) };
  try { const s = JSON.parse(localStorage.getItem(CK)); if (s && !DEMO) { Object.assign(cfg, s); cfg.ind = Object.assign({}, IND0, s.ind); } } catch (e) {}
  const saveCfg = () => { if (DEMO) return; try { localStorage.setItem(CK, JSON.stringify(cfg)); } catch (e) {} };

  /* ---------- estado ---------- */
  /* eng = motor que se dibuja (en vivo o replay) · live = siempre el de en vivo */
  let sym = SY[0], eng, live, feed, rep = null, view = 'fp', st = 'conectando', dirty = true, mouse = null;
  const v = { barW: 30, rowH: 16, rh: 16, offX: 0, cK: null, follow: true, autoY: true };
  const hv = { pps: 8, rowPx: 4, cK: null, follow: true, tR: 0, ref: 1 };
  const HR = 600, HMS = 500, HMAX = 4000;
  let heat = [], tape = [], cur = null, tapeMin = 1, domC = null, bigs = [], pend = [];
  let hist = [], histTok = 0, day = null;                 // velas históricas del exchange y niveles del día
  let D = [], tool = 'cur', draft = null, ruler = null;   // dibujos
  let sim = { pos: 0, avg: 0, real: 0, sl: null, tp: null }, grab = null;
  let AL = [], alLog = [], lastPx = null, liqs = [];
  const HOOK = { trade: [], snap: [], draw: [], low: [], slow: [], closed: [], open: [], can: [], ping: [], mode: null, real: false, reto: null };           // alertas de precio y liquidaciones
  const G = { A: [], nb: 0, xR: 0, ch: 0, cw: 0, rh: 16, g: 1 }; // geometría del último cuadro, para el mouse
  const stat = { cnt: 0, tps: 0, lat: 0 };
  let audit = { rows: [], ok: 0, n: 0 };
  let skew = 0; // diferencia entre el reloj de esta máquina y el del exchange
  (async () => { try { const a = Date.now(), j = await (await fetch(REST + 'time')).json(), b = Date.now(); skew = (a + b) / 2 - j.serverTime; } catch (e) {} })();

  function fit(c) {
    const d = window.devicePixelRatio || 1, w = c.clientWidth, h = c.clientHeight;
    if (c.width !== Math.round(w * d) || c.height !== Math.round(h * d)) { c.width = Math.round(w * d); c.height = Math.round(h * d); }
    const x = c.getContext('2d'); x.setTransform(d, 0, 0, d, 0, 0); return x;
  }
  const fv = q => q >= 1e6 ? +(q / 1e6).toPrecision(3) + 'M' : q >= 10000 ? (q / 1000).toFixed(0) + 'k' : q >= 1000 ? (q / 1000).toFixed(1) + 'k'
    : q >= 100 ? q.toFixed(0) : q >= 10 ? q.toFixed(Math.min(1, sym.qd)) : q >= 1 ? q.toFixed(Math.min(2, sym.qd)) : q.toFixed(sym.qd);
  const fs = q => (q >= 0 ? '+' : '-') + fv(Math.abs(q));
  const fp = k => (k * sym.tick).toFixed(sym.dec);
  const p2 = n => (n < 10 ? '0' : '') + n;
  const ft = (t, s) => { const d = new Date(t); return p2(d.getHours()) + ':' + p2(d.getMinutes()) + (s ? ':' + p2(d.getSeconds()) : ''); };
  const fd = t => { const d = new Date(t); return p2(d.getDate()) + '/' + p2(d.getMonth() + 1) + ' ' + ft(t); };
  const fdur = ms => { const m = Math.round(ms / 60000); return m >= 60 ? Math.floor(m / 60) + ' h ' + p2(m % 60) + ' m' : m + ' min'; };

  /* ---------- arranque / configuración ---------- */
  function barCfg() {
    const [type, sz] = $('barSel').value.split(':');
    return { type, size: sz === 'V' ? sym.volBar : sz === 'D' ? sym.dBar : sz === 'R' ? sym.rng : +sz, group: +$('grpSel').value, ratio: +$('imbSel').value, minImb: sym.minImb };
  }
  function fillSel() {
    $('grpSel').innerHTML = sym.groups.map(g => `<option value="${g}"${g === sym.g0 ? ' selected' : ''}>Fila ${(g * sym.tick).toFixed(sym.dec)}</option>`).join('');
    $('tapeMin').innerHTML = sym.tape.map((m, i) => `<option value="${m}"${i === 1 ? ' selected' : ''}>&ge; ${+m.toPrecision(3)}</option>`).join('');
    tapeMin = sym.tape[1]; $('simQ').value = sym.q0;
    for (const o of $('barSel').options) {
      if (o.value === 'volume:V') o.text = 'Volumen ' + fv(sym.volBar);
      if (o.value === 'delta:D') o.text = 'Delta ' + fv(sym.dBar);
      if (o.value === 'range:R') o.text = 'Rango ' + (sym.rng * sym.tick).toFixed(sym.dec);
    }
  }
  function start() {
    if (feed) feed.stop();
    heat = []; tape = []; cur = null; domC = null; bigs = []; pend = []; hist = []; day = null; draft = ruler = null; liqs = [];
    v.cK = hv.cK = null; v.offX = 0; v.follow = hv.follow = true; v.autoY = true; hv.ref = 1;
    audit = { rows: [], ok: 0, n: 0 }; stat.lat = 0; st = 'conectando';
    sim = { pos: 0, avg: 0, real: 0, sl: null, tp: null }; rep = null; $('rp').style.display = 'none';
    live = eng = new Engine(barCfg());
    const f = feed = new BinanceFeed(sym, {
      trade: onTrade, status: s => { st = s; },
      reset: () => { live.clear(); tape = []; bigs = []; pend = []; },
      older: b => { if (f === feed) pend.push(b); },
      liq: o => { if (f !== feed) return; liqs.push(o); if (liqs.length > 400) liqs.shift(); tape.unshift({ t: o.t, s: o.s, q: o.q, pv: o.p * o.q, liq: 1 }); dirty = true; }
    }, 3);
    f.until = PANE ? Date.now() : Date.now() - (+cfg.dep) * 3600e3; // los gráficos de la cuadrícula no cargan historia profunda (límite de peticiones)
    f.start(); loadHist(); loadDay(); loadDraw(); loadAL(); INFO.id = null; dirty = true;
  }
  function onTrade(t, p, q, s, E) {
    live.add(t, p, q, s); stat.cnt++;
    if (E) for (const f of HOOK.trade) f(t, p, q, s);
    if (!rep && sim.pos) bracket(p);
    if (E) { spdAdd(s, q); checkAlerts(p); }
    if (E) { const l = Math.max(0, Date.now() - skew - E); stat.lat = stat.lat ? stat.lat * 0.9 + l * 0.1 : l; }
    if (cur && cur.t === t && cur.s === s) { cur.q += q; cur.pv += p * q; }
    else {
      if (cur) { if (cur.q >= tapeMin) { tape.unshift(cur); if (tape.length > 40) tape.pop(); } if (cur.q >= sym.big) { bigs.push(cur); if (bigs.length > 20000) bigs.shift(); if (E && cfg.alBig && cur.q >= sym.big * Math.max(1, +cfg.bigX || 1) * 3) ping('Trade grande · ' + sym.id, (cur.s ? 'Venta' : 'Compra') + ' de ' + fv(cur.q) + ' en ' + fp(Math.round(cur.pv / cur.q))); } }
      cur = { t, s, q, pv: p * q };
    }
    dirty = true;
  }
  /* historia tick a tick que va llegando hacia atrás: se mete al motor por tandas */
  function mergeOlder() {
    if (!pend.length || !live) return;
    if (!feed) { pend = []; return; } // se cambió a varios gráficos: la historia pendiente ya no aplica
    const bs = pend.reverse(); pend = []; let k = 0; for (const b of bs) k += b.length;
    const T = new Float64Array(k), P = new Int32Array(k), Q = new Float64Array(k), S = new Uint8Array(k); let i = 0;
    for (const b of bs) for (const d of b) { T[i] = d.T; P[i] = feed.px(d.p); Q[i] = +d.q; S[i] = d.m ? 1 : 0; i++; }
    if (!live.prepend(T, P, Q, S, k)) { feed.deepStop = true; return; }
    live.set({}); scanBigs(); dirty = true;
  }
  function scanBigs() { // trades grandes de todo lo cargado (órdenes agresoras del mismo instante y lado, sumadas)
    const e = live, out = []; let a = null;
    for (let i = 0; i < e.n; i++) {
      if (a && a.t === e.T[i] && a.s === e.S[i]) { a.q += e.Q[i]; a.pv += e.P[i] * e.Q[i]; }
      else { if (a && a.q >= sym.big) out.push(a); a = { t: e.T[i], s: e.S[i], q: e.Q[i], pv: e.P[i] * e.Q[i] }; }
    }
    bigs = out;
  }
  /* velas oficiales del exchange para la historia larga (traen volumen y compra agresora: delta exacto por vela) */
  const IV = { 60000: '1m', 180000: '3m', 300000: '5m', 900000: '15m', 1800000: '30m', 3600000: '1h', 14400000: '4h' };
  const mk = (k, tick) => { const px = s => Math.round(parseFloat(s) / tick), vv = +k[5], b = +k[9]; return { t0: k[0], o: px(k[1]), h: px(k[2]), l: px(k[3]), c: px(k[4]), vol: vv, buy: b, sell: vv - b, n: k[8], lv: null }; };
  async function loadHist() {
    const tok = ++histTok; hist = []; const o = barCfg(), iv = o.type === 'time' && IV[o.size], id = sym.id, tick = sym.tick; if (!iv) return;
    try {
      let end = '', all = [];
      for (let pg = 0; pg < 2; pg++) {
        const a = await (await fetch(`${REST}klines?symbol=${id}&interval=${iv}&limit=1500${end}`)).json();
        if (tok !== histTok) return; if (!a.length) break;
        all = a.concat(all); end = '&endTime=' + (a[0][0] - 1); if (a.length < 1500) break;
      }
      hist = all.map(k => mk(k, tick)); dirty = true;
    } catch (e) {}
  }
  /* mantiene al día las últimas velas del exchange (la vela que los ticks todavía no cubren completa) */
  async function refreshHist() {
    const o = live && live.o; if (!o || o.type !== 'time' || !IV[o.size] || !hist.length) return; const tok = histTok, tick = sym.tick;
    try {
      const a = await (await fetch(`${REST}klines?symbol=${sym.id}&interval=${IV[o.size]}&limit=3`)).json(); if (tok !== histTok) return;
      for (const k of a) { const b = mk(k, tick); let i = hist.length - 1; while (i >= 0 && hist[i].t0 > b.t0) i--; if (i >= 0 && hist[i].t0 === b.t0) hist[i] = b; else hist.splice(i + 1, 0, b); }
      dirty = true;
    } catch (e) {}
  }
  async function loadDay() {
    const tok = histTok, tick = sym.tick;
    try {
      const a = await (await fetch(`${REST}klines?symbol=${sym.id}&interval=1d&limit=2`)).json(); if (tok !== histTok || a.length < 2) return;
      const px = s => Math.round(parseFloat(s) / tick);
      day = [['Máx. ayer', px(a[0][2])], ['Mín. ayer', px(a[0][3])], ['Cierre ayer', px(a[0][4])], ['Apertura hoy', px(a[1][1])]]; dirty = true;
    } catch (e) {}
  }

  /* ---------- foto del libro cada 500 ms para el heatmap ---------- */
  function snapHeat() {
    if (!feed || !feed.bookOk || !live || live.last == null) return;
    const [bb, ba] = feed.best(); if (!isFinite(bb) || !isFinite(ba)) return;
    const hg = sym.hg, base = Math.floor((bb + ba) / 2 / hg) - HR / 2, a = new Float32Array(HR);
    for (const [k, q] of feed.bids) { const i = Math.floor(k / hg) - base; if (i >= 0 && i < HR) a[i] += q; }
    for (const [k, q] of feed.asks) { const i = Math.floor(k / hg) - base; if (i >= 0 && i < HR) a[i] += q; }
    heat.push({ t: feed.bookT, base, a, bb, ba }); if (heat.length > HMAX) heat.shift();
    for (const f of HOOK.snap) f(heat[heat.length - 1]);
    const nz = Array.from(a).filter(x => x > 0).sort((x, y) => x - y);
    if (nz.length) { const r = nz[Math.floor(nz.length * 0.97)]; hv.ref = hv.ref === 1 ? r : hv.ref * 0.95 + r * 0.05; }
    dirty = true;
  }
  function j0(t) { let a = 0, b = heat.length - 1; while (a < b) { const m = (a + b + 1) >> 1; if (heat[m].t <= t) a = m; else b = m - 1; } return a; }
  const LUT = new Uint32Array(256);
  (function () {
    const S = [[0, 6, 14, 40], [0.35, 18, 52, 150], [0.72, 34, 180, 238], [1, 230, 250, 255]]; // azul marino → cian → hielo
    for (let u = 0; u < 256; u++) {
      const t = Math.pow(u / 255, 0.65); let i = 0; while (i < S.length - 2 && t > S[i + 1][0]) i++;
      const a = S[i], b = S[i + 1], f = (t - a[0]) / (b[0] - a[0]);
      const r = a[1] + (b[1] - a[1]) * f, g = a[2] + (b[2] - a[2]) * f, b2 = a[3] + (b[3] - a[3]) * f, al = Math.min(255, 40 + t * 330);
      LUT[u] = ((al << 24) | (b2 << 16) | (g << 8) | r) >>> 0;
    }
  })();
  /* pinta la liquidez en reposo: tx[px] = tiempo de cada columna de pixeles (creciente), rowOf[y] = fila de precio */
  const HC = {};
  function paintHeat(key, x, iw, ih, tx, rowOf, alpha) {
    if (!heat.length || iw < 1 || ih < 1) return;
    let o = HC[key];
    if (!o || o.w !== iw || o.h !== ih) { const cv2 = document.createElement('canvas'); cv2.width = iw; cv2.height = ih; o = HC[key] = { w: iw, h: ih, cv: cv2, cx: cv2.getContext('2d') }; o.img = o.cx.createImageData(iw, ih); }
    const d = new Uint32Array(o.img.data.buffer); d.fill(0);
    const sc = 255 / (hv.ref * 1.6) * +$('con').value; let j = -1;
    for (let px = 0; px < iw; px++) {
      const t = tx[px]; if (!(t > 0)) continue;
      if (j < 0) j = j0(t);
      while (j + 1 < heat.length && heat[j + 1].t <= t) j++;
      const col = heat[j]; if (col.t > t || t - col.t > 3000) continue;
      const a = col.a, b = col.base;
      for (let y = 0; y < ih; y++) {
        const q = a[rowOf[y] - b];
        if (q > 0) { let u = (q * sc) | 0; if (u > 255) u = 255; d[y * iw + px] = LUT[u]; }
      }
    }
    o.cx.putImageData(o.img, 0, 0); x.globalAlpha = alpha; x.drawImage(o.cv, 0, 0, iw, ih); x.globalAlpha = 1;
  }

  function hline(x, y, w, col, dash, label, right) {
    x.save(); x.strokeStyle = col; x.lineWidth = 1; x.setLineDash(dash || []); x.beginPath(); x.moveTo(0, Math.round(y) + 0.5); x.lineTo(w, Math.round(y) + 0.5); x.stroke();
    if (label) { x.fillStyle = col; x.font = '9px ' + MONO; x.textAlign = right ? 'right' : 'left'; x.fillText(label, right ? w - 6 : 4, y - 6); }
    x.restore();
  }
  function tag(x, cw, y, txt, bg, fg) {   // etiqueta de precio redondeada sobre el eje
    x.save(); x.fillStyle = bg; x.beginPath(); if (x.roundRect) x.roundRect(cw + 2, y - 9, 64, 18, 5); else x.rect(cw + 2, y - 9, 64, 18); x.fill();
    x.fillStyle = fg || '#03101a'; x.font = '600 11px ' + MONO; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(txt, cw + 7, y + 0.5); x.restore();
  }

  /* ---------- serie completa: velas del exchange (historia) + barras tick a tick (con clusters) ---------- */
  let cv = new Float64Array(8192), vw = new Float64Array(8192), sd = new Float64Array(8192), e1 = new Float64Array(8192), e2 = new Float64Array(8192);
  function build() {
    const eb = eng.bars, o = eng.o; let A = eb;
    if (o.type === 'time' && hist.length && eb.length && eng.firstT != null) {
      const cut = Math.floor(eng.firstT / o.size) * o.size; // primera barra con ticks (puede estar incompleta)
      let hi = hist.length; while (hi > 0 && hist[hi - 1].t0 >= cut) hi--;
      if (hi) {
        A = hist.slice(0, hi).concat(eb);
        /* esa primera barra: los ticks no la cubren entera, así que precio y volumen salen de la vela oficial */
        const K = hist[hi], E = eb[0];
        if (!rep && K && K.t0 === E.t0) A[hi] = Object.assign({}, E, { o: K.o, h: Math.max(K.h, E.h), l: Math.min(K.l, E.l), vol: Math.max(K.vol, E.vol), buy: Math.max(K.buy, E.buy), sell: Math.max(K.sell, E.sell), n: Math.max(K.n, E.n), st: null });
      }
    }
    const n = A.length;
    if (n > cv.length) { const m = n * 2; cv = new Float64Array(m); vw = new Float64Array(m); sd = new Float64Array(m); e1 = new Float64Array(m); e2 = new Float64Array(m); }
    const k1 = 2 / (cfg.e1 + 1), k2 = 2 / (cfg.e2 + 1); let c = 0, dy = -1, sv = 0, spv = 0, sp2 = 0;
    for (let i = 0; i < n; i++) {
      const b = A[i]; c += b.buy - b.sell; cv[i] = c;
      const d = Math.floor(b.t0 / 864e5); if (d !== dy) { dy = d; sv = spv = sp2 = 0; } // VWAP anclado al día (UTC)
      const tp = (b.h + b.l + b.c) / 3; sv += b.vol; spv += tp * b.vol; sp2 += tp * tp * b.vol;
      vw[i] = sv ? spv / sv : tp; sd[i] = sv ? Math.sqrt(Math.max(0, sp2 / sv - vw[i] * vw[i])) : 0;
      e1[i] = i ? e1[i - 1] + k1 * (b.c - e1[i - 1]) : b.c; e2[i] = i ? e2[i - 1] + k2 * (b.c - e2[i - 1]) : b.c;
    }
    return A;
  }
  function idxAt(A, t) { let a = 0, z = A.length - 1; while (a < z) { const m = (a + z + 1) >> 1; if (A[m].t0 <= t) a = m; else z = m - 1; } return a; }

  /* ---------- GRÁFICO DE CLUSTERS ---------- */
  function drawFP() {
    const c = $('fp'), x = fit(c), W = c.clientWidth, H = c.clientHeight; x.clearRect(0, 0, W, H);
    const I = cfg.ind, AX = 68, TB = 18, PR = I.prof ? 118 : 30, g = eng.o.group, A = build(), nb = A.length, isT = eng.o.type === 'time';
    x.textBaseline = 'middle'; x.font = '11px ' + MONO;
    if (!nb) { x.fillStyle = C.mut; x.textAlign = 'center'; x.fillText('Cargando mercado…', W / 2, H / 2); G.nb = 0; return; }
    const wide = v.barW >= 64, cells = v.barW >= 18, statsOn = I.stats && v.barW >= 46;
    const ST = statsOn ? 150 : 64, ch = H - TB - ST, cw = W - AX, last = A[nb - 1], xR = cw - PR, X = i => xR - (nb - i) * v.barW + v.offX;
    const iHi = Math.max(0, Math.min(nb - 1, Math.ceil(nb - v.offX / v.barW) - 1)), iLo = Math.min(iHi, Math.max(0, Math.floor(nb - (xR + v.offX) / v.barW)));
    if (v.cK == null) v.cK = last.c;
    let rh = v.rowH;
    if (!wide && v.autoY) { // ajusta el precio a lo visible
      let lo = Infinity, hi = -Infinity; for (let i = iLo; i <= iHi; i++) { if (A[i].l < lo) lo = A[i].l; if (A[i].h > hi) hi = A[i].h; }
      if (isFinite(lo)) { v.cK = (lo + hi) / 2; rh = ch * 0.84 / ((hi - lo) / g + 1); }
    } else if (!wide) rh = v.rh;
    else if (v.follow) { const yl = ch / 2 - (last.c - v.cK) / g * rh; if (yl < ch * 0.18 || yl > ch * 0.82) v.cK = last.c; }
    v.rh = rh;
    const num = wide && rh >= 11, Y = p => ch / 2 - (p - v.cK) / g * rh;
    Object.assign(G, { A, nb, xR, ch, cw, rh, g });
    const kTop = v.cK + ch / 2 / rh * g, kBot = v.cK - ch / 2 / rh * g, stepK = num ? g * Math.ceil(24 / rh) : niceStep(28 / rh * g);
    const size = eng.o.size, tNow = rep ? eng.lastT : Math.max(eng.lastT || 0, feed && feed.bookT || 0);

    x.save(); x.beginPath(); x.rect(0, 0, cw, ch); x.clip();
    /* liquidez en reposo detrás de las velas */
    if (I.heat && isT && heat.length) {
      const iw = cw | 0, ih = ch | 0, tx = new Float64Array(iw), rowOf = new Int32Array(ih), hg = sym.hg;
      for (let y = 0; y < ih; y++) rowOf[y] = Math.floor((v.cK + (ch / 2 - y - 0.5) / rh * g) / hg);
      for (let px = 0; px < iw; px++) {
        const i = nb + Math.floor((px - xR - v.offX) / v.barW);
        tx[px] = i < 0 ? 0 : i >= nb ? tNow : Math.min(tNow, A[i].t0 + (px - X(i)) / v.barW * size);
      }
      paintHeat('fp', x, iw, ih, tx, rowOf, 0.85);
    }
    x.fillStyle = C.line;
    for (let k = Math.ceil(kBot / stepK) * stepK; k <= kTop; k += stepK) x.fillRect(0, Math.round(Y(k)), cw, 1);
    /* perfil de volumen de los ticks cargados */
    const h1 = Math.max(1, rh - 1);
    if (I.prof) {
      for (const [k, e] of eng.prof) {
        const yT = Y(k + g); if (yT > ch || yT + rh < 0) continue;
        const tot = e[0] + e[1], w = tot / eng.pmax * (PR - 14), ws = w * e[0] / tot;
        x.fillStyle = dn(0.38); x.fillRect(xR + 8, yT, ws, h1); x.fillStyle = up(0.38); x.fillRect(xR + 8 + ws, yT, w - ws, h1);
      }
      const ps = eng.profStats();
      if (ps) {
        hline(x, Y(ps.vah + g), cw, 'rgba(255,255,255,.22)', [2, 4], 'VAH');
        hline(x, Y(ps.val), cw, 'rgba(255,255,255,.22)', [2, 4], 'VAL');
        hline(x, Y(ps.poc) - rh / 2, cw, 'rgba(90,176,255,.55)', [6, 4], 'POC');
      }
    }
    if (I.day && day) for (const [nm, p] of day) { const y = Y(p + 0.5); if (y > 0 && y < ch) hline(x, y, cw, 'rgba(232,236,243,.3)', [8, 5], nm + ' ' + fp(p), true); }
    /* zonas de desbalance apilado: se extienden hasta que el precio las atraviesa */
    if (I.zones && cells) {
      for (let i = Math.max(iLo, nb - 240); i <= iHi; i++) {
        const b = A[i]; if (!b.lv) continue; const zs = eng.stats(b).zones; if (!zs.length) continue;
        for (const [k1, k2, sd2] of zs) {
          let j = i + 1; while (j < nb && (sd2 > 0 ? A[j].l >= k1 : A[j].h < k2 + g)) j++;
          const xa = X(i) + v.barW, xb = j < nb ? X(j) : xR, yT = Y(k2 + g), hh = Y(k1) - yT;
          if (xb <= xa) continue;
          x.fillStyle = sd2 > 0 ? up(0.09) : dn(0.09); x.fillRect(xa, yT, xb - xa, hh);
          x.fillStyle = sd2 > 0 ? up(0.5) : dn(0.5); x.fillRect(xa, sd2 > 0 ? yT + hh - 1 : yT, xb - xa, 1);
        }
      }
    }
    /* footprint limpio (Bid x Ask): celdas neutras, números, la vela como línea central y solo lo importante en color */
    const cleanBar = (bx, b, s) => {
      const x0 = bx + 2, w = v.barW - 4, mid = x0 + w / 2, isUp = b.c >= b.o;
      const bt = Math.max(b.o, b.c), bb = Math.min(b.o, b.c);
      x.font = fz + 'px ' + MONO;
      for (const [k, e] of b.lv) {
        const yT = Y(k + g); if (yT > ch || yT + rh < 0) continue;
        const im = I.imb ? s.imb.get(k) || 0 : 0, tot = e[0] + e[1], ty = yT + h1 / 2 + 0.5, isPoc = I.poc && k === s.poc;
        x.fillStyle = isPoc ? 'rgba(90,176,255,.24)' : 'rgba(255,255,255,.045)'; x.fillRect(x0, yT, w, h1);
        const inBody = k <= bt && k >= bb;
        x.fillStyle = inBody ? (isUp ? C.up : C.dn) : 'rgba(255,255,255,.16)'; x.fillRect(Math.round(mid) - (inBody ? 1 : 0), yT, inBody ? 2 : 1, h1 + 1);
        x.textAlign = 'right'; x.font = (im < 0 ? '600 ' : '') + fz + 'px ' + MONO;
        x.fillStyle = im < 0 ? '#7f97ff' : e[0] ? 'rgba(232,236,243,.8)' : 'rgba(232,236,243,.28)'; x.fillText(fv(e[0]), mid - 5, ty);
        x.textAlign = 'left'; x.font = (im > 0 ? '600 ' : '') + fz + 'px ' + MONO;
        x.fillStyle = im > 0 ? '#3ee0f7' : e[1] ? 'rgba(232,236,243,.8)' : 'rgba(232,236,243,.28)'; x.fillText(fv(e[1]), mid + 5, ty);
        if (im === 2 || im === -2) { x.fillStyle = im > 0 ? C.up : C.dn; x.fillRect(im > 0 ? x0 + w - 2 : x0, yT, 2, h1); }
        if (srch && tot >= srch) { x.strokeStyle = '#fff'; x.lineWidth = 1.5; x.strokeRect(x0 + 1, yT + 1, w - 2, Math.max(1, h1 - 2)); }
      }
    };
    /* barras */
    const fz = Math.max(9, Math.min(11, rh - 4)), mode = cfg.mode, srch = +cfg.srch || 0;
    for (let i = iHi; i >= iLo; i--) {
      const bx = X(i), b = A[i], hasLv = cells && b.lv, clean = hasLv && num && mode === 'ba';
      if (clean) { cleanBar(bx, b, eng.stats(b)); continue; }
      const cwd = hasLv ? 3 : Math.max(1, cells ? v.barW * 0.5 : v.barW > 3 ? v.barW - 1.5 : v.barW), cx = hasLv ? bx + 3 : bx + (v.barW - cwd) / 2;
      x.fillStyle = b.c >= b.o ? C.up : C.dn;
      const yh = Y(b.h + 0.5), yl = Y(b.l + 0.5), yo = Y(b.o + 0.5), yc = Y(b.c + 0.5);
      x.fillRect(cx + cwd / 2 - 0.5, yh, 1, Math.max(1, yl - yh)); x.fillRect(cx, Math.min(yo, yc), cwd, Math.max(1, Math.abs(yc - yo)));
      if (!hasLv) continue;
      const s = eng.stats(b), x0 = bx + 9, w = v.barW - 11, mid = x0 + w / 2;
      for (const [k, e] of b.lv) {
        const yT = Y(k + g); if (yT > ch || yT + rh < 0) continue;
        const im = I.imb ? s.imb.get(k) || 0 : 0, tot = e[0] + e[1], d = e[1] - e[0], ty = yT + h1 / 2 + 0.5;
        if (mode === 'prof') {
          x.fillStyle = dn(0.7); x.fillRect(mid - e[0] / s.mxs * (w / 2), yT, e[0] / s.mxs * (w / 2), h1);
          x.fillStyle = up(0.7); x.fillRect(mid, yT, e[1] / s.mxs * (w / 2), h1);
        } else if (mode === 'vol') {
          x.fillStyle = bl(Math.min(0.75, 0.06 + tot / s.mx * 0.7)); x.fillRect(x0, yT, w, h1);
          if (num) { x.textAlign = 'center'; x.font = fz + 'px ' + MONO; x.fillStyle = 'rgba(232,236,243,.85)'; x.fillText(fv(tot), mid, ty); }
        } else if (mode === 'delta') {
          const a = Math.min(0.7, 0.06 + Math.abs(d) / s.mx * 0.9); x.fillStyle = d >= 0 ? up(a) : dn(a); x.fillRect(x0, yT, w, h1);
          if (num) { x.textAlign = 'center'; x.font = fz + 'px ' + MONO; x.fillStyle = 'rgba(232,236,243,.85)'; x.fillText(fs(d), mid, ty); }
        } else if (num) {
          const a = Math.min(0.4, 0.05 + tot / s.mx * 0.35);
          x.fillStyle = d >= 0 ? up(a) : dn(a); x.fillRect(x0, yT, w, h1);
          x.textAlign = 'right'; x.font = (im < 0 ? '700 ' : '') + fz + 'px ' + MONO; x.fillStyle = im < 0 ? '#a8b6ff' : 'rgba(232,236,243,.7)'; x.fillText(fv(e[0]), mid - 5, ty);
          x.textAlign = 'left'; x.font = (im > 0 ? '700 ' : '') + fz + 'px ' + MONO; x.fillStyle = im > 0 ? '#a5f3fc' : 'rgba(232,236,243,.7)'; x.fillText(fv(e[1]), mid + 5, ty);
          x.fillStyle = 'rgba(255,255,255,.12)'; x.fillRect(mid, yT + 2, 1, h1 - 4);
        } else {
          x.fillStyle = dn(Math.min(0.9, e[0] / s.mxs)); x.fillRect(x0, yT, w / 2, h1);
          x.fillStyle = up(Math.min(0.9, e[1] / s.mxs)); x.fillRect(mid, yT, w / 2, h1);
        }
        if ((im === 2 || im === -2) && rh >= 3) { x.fillStyle = im > 0 ? C.up : C.dn; x.fillRect(im > 0 ? x0 + w - 2 : x0, yT, 2, h1); }
        if (I.poc && k === s.poc && rh >= 3) { x.strokeStyle = C.ac; x.lineWidth = 1; x.strokeRect(x0 + 0.5, yT + 0.5, w - 1, h1 - 1); }
        if (srch && tot >= srch) { x.strokeStyle = '#fff'; x.lineWidth = 1.5; x.strokeRect(x0 + 1, yT + 1, w - 2, Math.max(1, h1 - 2)); }
      }
      x.fillStyle = 'rgba(255,255,255,.28)'; x.fillRect(bx + 7, Y(s.vah + g), 1, Y(s.val) - Y(s.vah + g));
    }
    /* VWAP del día, bandas y medias */
    const path = (arr, off, col, lw, dash) => {
      x.strokeStyle = col; x.lineWidth = lw; x.setLineDash(dash || []); x.beginPath(); let f = 1;
      for (let i = iLo; i <= iHi; i++) {
        if (arr === vw && i && Math.floor(A[i].t0 / 864e5) !== Math.floor(A[i - 1].t0 / 864e5)) f = 1;
        const px = X(i) + v.barW / 2, py = Y(arr[i] + (off ? off * sd[i] : 0) + 0.5); if (f) { x.moveTo(px, py); f = 0; } else x.lineTo(px, py);
      }
      x.stroke(); x.setLineDash([]);
    };
    if (I.bands) for (const m of [-2, -1, 1, 2]) path(vw, m, 'rgba(232,236,243,.22)', 1, [3, 3]);
    if (I.vwap) path(vw, 0, 'rgba(232,236,243,.75)', 1.25);
    if (I.ema1) path(e1, 0, '#f0b35e', 1.25);
    if (I.ema2) path(e2, 0, '#c7d2fe', 1.25);
    /* trades grandes */
    if (I.big && v.barW >= 6 && !(num && mode === 'ba')) {   // en Bid x Ask con números, los números ya dicen el tamaño
      const tMin = A[iLo].t0, bigMin = sym.big * Math.max(1, +cfg.bigX || 1);
      for (let j = bigs.length - 1; j >= 0; j--) {
        const b = bigs[j]; if (b.t > tNow || b.q < bigMin) continue; if (b.t < tMin) break;
        const a = idxAt(A, b.t); if (a > iHi) continue;
        const r = Math.max(2.5, Math.min(Math.max(4, v.barW * 0.42), Math.sqrt(b.q / bigMin) * (cells ? 5 : 3)));
        x.beginPath(); x.arc(X(a) + v.barW / 2 + (cells ? 4 : 0), Y(b.pv / b.q + 0.5), r, 0, 6.2832);
        x.fillStyle = b.s ? dn(0.18) : up(0.18); x.fill(); x.strokeStyle = b.s ? C.dn : C.up; x.lineWidth = 1.25; x.stroke();
      }
    }
    /* posición simulada */
    if (sim.pos) {
      hline(x, Y(sim.avg + 0.5), cw, C.ac, [], 'ENTRADA ' + (sim.pos > 0 ? '+' : '') + +sim.pos.toFixed(4));
      for (const [k, col, nm] of [['sl', C.dn, 'STOP'], ['tp', C.up, 'OBJETIVO']]) if (sim[k] != null) {
        const pl = (sim[k] - sim.avg) * sym.tick * sim.pos;
        hline(x, Y(sim[k] + 0.5), cw, col, [5, 3], nm + ' ' + fp(sim[k]) + '   ' + (pl >= 0 ? '+' : '') + pl.toFixed(2) + (grab === k ? '' : '   arrastra para mover'));
      }
    }
    for (const f of HOOK.draw) f(x, { Y, X, A, iLo, iHi, nb, cw, ch, rh, g, cells, tNow, xR, barW: v.barW });
    for (const a of AL) { const y = Y(a.p + 0.5); if (y > 0 && y < ch) hline(x, y, cw, '#ffd166', [2, 3], 'ALERTA ' + fp(a.p), true); }
    if (I.liq && liqs.length) { x.strokeStyle = '#ff9a2e'; x.lineWidth = 2; for (const q of liqs) { if (q.t < A[iLo].t0 || q.t > tNow) continue; const a = idxAt(A, q.t); if (a > iHi) continue; const px = X(a) + v.barW / 2, py = Y(q.p + 0.5); x.beginPath(); x.moveTo(px - 5, py - 5); x.lineTo(px + 5, py + 5); x.moveTo(px + 5, py - 5); x.lineTo(px - 5, py + 5); x.stroke(); } }
    for (const d of D) drawD(x, d);
    if (draft) drawD(x, draft); if (ruler) drawD(x, ruler);
    x.restore();

    /* eje de precio */
    x.font = '11px ' + MONO; x.textAlign = 'left'; x.fillStyle = C.mut;
    for (let k = Math.ceil(kBot / stepK) * stepK; k <= kTop; k += stepK) { const y = num ? Y(k) - rh / 2 : Y(k); if (y > 6 && y < ch - 6) x.fillText(fp(k), cw + 6, y); }
    const yl = Y(eng.last + 0.5);
    if (yl > 0 && yl < ch) {
      x.save(); x.setLineDash([2, 4]); x.strokeStyle = eng.lastS ? dn(0.55) : up(0.55); x.beginPath(); x.moveTo(0, Math.round(yl) + 0.5); x.lineTo(cw, Math.round(yl) + 0.5); x.stroke(); x.restore();   // línea del último precio
      tag(x, cw, yl, fp(eng.last), eng.lastS ? C.dn : C.up, eng.lastS ? '#fff' : '#03101a');
      if (isT && !rep) { const r = Math.max(0, last.t0 + size - (Date.now() - skew)), s = Math.floor(r / 1000); x.fillStyle = C.mut; x.font = '10px ' + MONO; x.fillText(s >= 3600 ? Math.floor(s / 3600) + ':' + p2(Math.floor(s / 60) % 60) + ':' + p2(s % 60) : p2(Math.floor(s / 60)) + ':' + p2(s % 60), cw + 6, yl + 15); }
    }

    /* panel inferior: delta por barra, CVD y estadística de clusters */
    x.fillStyle = C.line; x.fillRect(0, ch, W, 1); x.fillRect(cw, 0, 1, H - TB);
    const dh = 56, zy = ch + 3 + dh / 2;
    let md = 1e-9, mvv = 1e-9, c0 = Infinity, c1 = -Infinity;
    for (let i = iLo; i <= iHi; i++) { const b = A[i]; md = Math.max(md, Math.abs(b.buy - b.sell)); mvv = Math.max(mvv, b.vol); if (cv[i] < c0) c0 = cv[i]; if (cv[i] > c1) c1 = cv[i]; }
    x.save(); x.beginPath(); x.rect(0, ch, cw, ST + TB); x.clip();
    x.fillStyle = C.line; x.fillRect(0, zy, cw, 1);
    const stepL = Math.max(1, Math.ceil(84 / v.barW)), bigTF = size >= 3600000 && isT;
    const ROWS = ['VOL', 'DELTA', 'DELTA %', 'MÁX Δ', 'MÍN Δ', 'TRADES'], ty0 = ch + dh + 8;
    for (let i = iHi; i >= iLo; i--) {
      const b = A[i], bx = X(i), d = b.buy - b.sell, hh = Math.max(1, Math.abs(d) / md * (dh / 2 - 3)), bw = Math.max(1, v.barW > 4 ? v.barW - (cells ? 6 : 1.5) : v.barW);
      x.fillStyle = d >= 0 ? up(0.75) : dn(0.75); x.fillRect(bx + (v.barW - bw) / 2, d >= 0 ? zy - hh : zy, bw, hh);
      if (statsOn) {
        const dp = b.vol ? d / b.vol * 100 : 0;
        const cl = [[fv(b.vol), bl(0.05 + b.vol / mvv * 0.4)], [fs(d), d >= 0 ? up(0.08 + Math.abs(d) / md * 0.45) : dn(0.08 + Math.abs(d) / md * 0.45)], [(dp >= 0 ? '+' : '') + dp.toFixed(0) + '%', dp >= 0 ? up(Math.min(0.5, Math.abs(dp) / 80)) : dn(Math.min(0.5, Math.abs(dp) / 80))],
          [b.lv ? fs(b.dmax) : '·', b.lv ? up(0.05 + b.dmax / md * 0.3) : 'transparent'], [b.lv ? fs(b.dmin) : '·', b.lv ? dn(0.05 - b.dmin / md * 0.3) : 'transparent'], [b.n >= 1000 ? (b.n / 1000).toFixed(1) + 'k' : '' + b.n, 'rgba(255,255,255,.04)']];
        x.textAlign = 'center'; x.font = '10px ' + MONO;
        for (let r = 0; r < 6; r++) { x.fillStyle = cl[r][1]; x.fillRect(bx + 1, ty0 + r * 14, v.barW - 2, 13); x.fillStyle = 'rgba(232,236,243,.85)'; x.fillText(cl[r][0], bx + v.barW / 2, ty0 + r * 14 + 7); }
      }
      if (i % stepL === 0) { x.fillStyle = C.mut; x.textAlign = 'center'; x.font = '10px ' + MONO; x.fillText(bigTF ? fd(b.t0) : ft(b.t0, !isT || size < 60000), bx + v.barW / 2, H - TB / 2); }
    }
    x.strokeStyle = C.ac; x.lineWidth = 1.5; x.beginPath();
    for (let i = iLo; i <= iHi; i++) { const px = X(i) + v.barW / 2, py = ch + 6 + (c1 - cv[i]) / ((c1 - c0) || 1) * (dh - 8); i === iLo ? x.moveTo(px, py) : x.lineTo(px, py); }
    x.stroke(); for (const f of HOOK.low) f(x, { X, A, iLo, iHi, ch, dh, cw, barW: v.barW }); x.restore();
    x.textAlign = 'left'; x.font = '9px ' + MONO; x.fillStyle = C.ac; x.fillText('CVD ' + fs(cv[nb - 1]), cw + 6, ch + 12);
    x.fillStyle = C.mut; x.fillText('DELTA', cw + 6, ch + dh - 6);
    if (statsOn) for (let r = 0; r < 6; r++) x.fillText(ROWS[r], cw + 6, ty0 + r * 14 + 7);

    /* cursor y lectura */
    let ri = nb - 1;
    if (mouse && mouse.v === 'fp' && mouse.x < cw) {
      x.fillStyle = 'rgba(255,255,255,.18)'; x.fillRect(mouse.x, 0, 1, H - TB);
      if (mouse.y < ch) { x.fillRect(0, mouse.y, cw, 1); tag(x, cw, mouse.y, fp(Math.floor(v.cK + (ch / 2 - mouse.y) / rh * g)), '#1b2a48', C.tx); }
      const i = nb - Math.ceil((xR + v.offX - mouse.x) / v.barW); if (i >= 0 && i < nb) ri = i;
      if (i >= 0 && i < nb) { const lb = bigTF ? fd(A[i].t0) : ft(A[i].t0, !isT || size < 60000); x.save(); x.font = '600 10.5px ' + MONO; const tw = x.measureText(lb).width + 14; x.fillStyle = '#1b2a48'; x.beginPath(); if (x.roundRect) x.roundRect(mouse.x - tw / 2, H - TB + 1, tw, TB - 2, 5); else x.rect(mouse.x - tw / 2, H - TB + 1, tw, TB - 2); x.fill(); x.fillStyle = C.tx; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(lb, mouse.x, H - TB / 2); x.restore(); }   // hora bajo la cruz
    }
    const rb = A[ri], d = rb.buy - rb.sell;
    $('read').innerHTML = `<b>${sym.id}</b> ${bigTF ? fd(rb.t0) : ft(rb.t0, 1)} &nbsp; A <b>${fp(rb.o)}</b> M <b>${fp(rb.h)}</b> m <b>${fp(rb.l)}</b> C <b>${fp(rb.c)}</b> &nbsp; Vol <b>${fv(rb.vol)}</b> &nbsp; Delta <b class="${d >= 0 ? 'u' : 'd'}">${fs(d)}</b>` +
      (rb.lv ? ` &nbsp; POC <b>${fp(eng.stats(rb).poc)}</b>` : '') + ` &nbsp; Trades <b>${rb.n}</b> &nbsp; VWAP <b>${fp(Math.round(vw[ri]))}</b> &nbsp; ${nb.toLocaleString('es-MX')} barras · ${rb.lv ? 'tick a tick' : 'vela del exchange'}`;
  }

  /* ---------- DIBUJOS: línea horizontal, tendencia, zona, regla ---------- */
  const DKEY = () => 'npd.draw.' + ses.email + '.' + sym.id;
  function loadDraw() { try { D = JSON.parse(localStorage.getItem(DKEY())) || []; } catch (e) { D = []; } }
  function saveDraw() { if (!DEMO) try { localStorage.setItem(DKEY(), JSON.stringify(D)); } catch (e) {} }
  function ptAt(m) { // pixel → { tiempo, precio en ticks }
    const A = G.A, nb = G.nb, i = nb + Math.floor((m.x - G.xR - v.offX) / v.barW), lastB = A[nb - 1], sz = eng.o.type === 'time' ? eng.o.size : 0;
    return { t: i < 0 ? A[0].t0 : i < nb ? A[i].t0 : lastB.t0 + (i - nb + 1) * sz, p: v.cK + (G.ch / 2 - m.y) / G.rh * G.g - 0.5 };
  }
  function xOf(t) {
    const A = G.A, nb = G.nb; let i = idxAt(A, t); const lastB = A[nb - 1];
    if (t > lastB.t0 && eng.o.type === 'time') i = nb - 1 + Math.round((t - lastB.t0) / eng.o.size);
    return G.xR - (nb - i) * v.barW + v.offX + v.barW / 2;
  }
  const yOf = p => G.ch / 2 - (p + 0.5 - v.cK) / G.g * G.rh;
  function drawD(x, d) {
    const col = '#f0b35e';
    if (d.type === 'h') { hline(x, yOf(d.p1), G.cw, col, [], fp(Math.round(d.p1)), true); return; }
    const xa = xOf(d.t1), xb = xOf(d.t2), ya = yOf(d.p1), yb = yOf(d.p2);
    if (d.type === 'line') { x.strokeStyle = col; x.lineWidth = 1.5; x.beginPath(); x.moveTo(xa, ya); x.lineTo(xb, yb); x.stroke(); return; }
    const rx = Math.min(xa, xb), ry = Math.min(ya, yb), rw = Math.abs(xb - xa), rhh = Math.abs(yb - ya);
    if (d.type === 'rect') { x.fillStyle = 'rgba(240,179,94,.1)'; x.fillRect(rx, ry, rw, rhh); x.strokeStyle = 'rgba(240,179,94,.7)'; x.lineWidth = 1; x.strokeRect(rx + 0.5, ry + 0.5, rw, rhh); return; }
    /* regla: mide precio, %, barras, tiempo y el volumen y delta negociados en el tramo */
    const A = G.A, ia = Math.min(idxAt(A, d.t1), idxAt(A, d.t2)), ib = Math.max(idxAt(A, d.t1), idxAt(A, d.t2)); let vol = 0, del = 0;
    for (let i = ia; i <= ib; i++) { vol += A[i].vol; del += A[i].buy - A[i].sell; }
    const dp = d.p2 - d.p1, upw = dp >= 0;
    x.fillStyle = upw ? up(0.12) : dn(0.12); x.fillRect(rx, ry, rw, rhh); x.strokeStyle = upw ? C.up : C.dn; x.lineWidth = 1; x.strokeRect(rx + 0.5, ry + 0.5, rw, rhh);
    const L = [`${upw ? '+' : ''}${(dp * sym.tick).toFixed(sym.dec)}  (${upw ? '+' : ''}${(dp / d.p1 * 100).toFixed(2)}%)`, `${ib - ia + 1} barras · ${fdur(Math.abs(d.t2 - d.t1))}`, `Vol ${fv(vol)} · Delta ${fs(del)}`];
    x.font = '11px ' + MONO; const bw = Math.max(...L.map(s => x.measureText(s).width)) + 16, bx = Math.min(G.cw - bw - 4, Math.max(4, rx + rw / 2 - bw / 2)), by = Math.max(4, ry - 54);
    x.fillStyle = '#10161f'; x.fillRect(bx, by, bw, 50); x.strokeStyle = 'rgba(255,255,255,.14)'; x.strokeRect(bx + 0.5, by + 0.5, bw, 50);
    x.textAlign = 'left'; x.fillStyle = C.tx; L.forEach((s, i) => x.fillText(s, bx + 8, by + 11 + i * 15));
  }
  function hitD(m) {
    for (let i = D.length - 1; i >= 0; i--) {
      const d = D[i];
      if (d.type === 'h') { if (Math.abs(yOf(d.p1) - m.y) < 5) return i; continue; }
      const xa = xOf(d.t1), xb = xOf(d.t2), ya = yOf(d.p1), yb = yOf(d.p2);
      if (d.type === 'rect') { if (m.x > Math.min(xa, xb) - 4 && m.x < Math.max(xa, xb) + 4 && m.y > Math.min(ya, yb) - 4 && m.y < Math.max(ya, yb) + 4) return i; continue; }
      const L2 = (xb - xa) ** 2 + (yb - ya) ** 2, tt = L2 ? Math.max(0, Math.min(1, ((m.x - xa) * (xb - xa) + (m.y - ya) * (yb - ya)) / L2)) : 0;
      if (Math.hypot(m.x - (xa + tt * (xb - xa)), m.y - (ya + tt * (yb - ya))) < 5) return i;
    }
    return -1;
  }
  function setTool(t) { tool = t; for (const b of $('tools').querySelectorAll('[data-t]')) b.classList.toggle('on', b.dataset.t === t); $('fp').style.cursor = t === 'cur' ? '' : 'copy'; }

  /* ---------- HEATMAP DE LIQUIDEZ (vista propia) ---------- */
  function drawHM() {
    const c = $('hm'), x = fit(c), W = c.clientWidth, H = c.clientHeight; x.clearRect(0, 0, W, H);
    const AX = 68, TB = 18, NP = 74, ch = H - TB, cw = W - AX, hg = sym.hg;
    x.textBaseline = 'middle'; x.font = '11px ' + MONO;
    if (!heat.length || eng.last == null) { x.fillStyle = C.mut; x.textAlign = 'center'; x.fillText('Sincronizando libro…', W / 2, H / 2); return; }
    const lt = rep ? heat[j0(eng.lastT)] : heat[heat.length - 1];
    if (hv.follow) hv.tR = rep ? eng.lastT : Math.max(lt.t, eng.lastT || 0);
    if (hv.cK == null) hv.cK = eng.last;
    const Y = p => ch / 2 - (p - hv.cK) / hg * hv.rowPx;
    if (hv.follow) { const yl = Y(eng.last); if (yl < ch * 0.2 || yl > ch * 0.8) hv.cK = eng.last; }
    const xN = cw - NP, Xt = t => xN - (hv.tR - t) / 1000 * hv.pps, tL = hv.tR - xN / hv.pps * 1000;
    const iw = Math.max(1, xN | 0), ih = Math.max(1, ch | 0), tx = new Float64Array(iw), rowOf = new Int32Array(ih);
    for (let y = 0; y < ih; y++) rowOf[y] = Math.floor((hv.cK + (ch / 2 - y - 0.5) / hv.rowPx * hg) / hg);
    for (let px = 0; px < iw; px++) tx[px] = hv.tR - (xN - px - 0.5) / hv.pps * 1000;
    paintHeat('hm', x, iw, ih, tx, rowOf, 1);

    x.save(); x.beginPath(); x.rect(0, 0, xN, ch); x.clip();
    for (const side of [0, 1]) { // mejor bid / ask en el tiempo
      x.strokeStyle = side ? dn(0.75) : up(0.75); x.lineWidth = 1; x.beginPath(); let f = 1;
      for (let i = j0(tL); i < heat.length; i++) {
        const col = heat[i], px = Xt(col.t), py = Y((side ? col.ba : col.bb) + 0.5);
        if (f) { x.moveTo(px, py); f = 0; } else { x.lineTo(px, py); }
      }
      x.stroke();
    }
    const bms = Math.max(100, 2500 / hv.pps); let key = -1, ac = [null, null]; // trades agresores como burbujas
    const flush = () => {
      for (const a of ac) {
        if (!a || a.q < sym.big * 0.03) continue;
        const r = Math.max(1.5, Math.min(30, Math.sqrt(a.q / sym.big) * 9));
        x.beginPath(); x.arc(Xt(a.t), Y(a.pv / a.q + 0.5), r, 0, 6.2832);
        x.fillStyle = a.s ? dn(0.5) : up(0.5); x.fill(); x.strokeStyle = a.s ? C.dn : C.up; x.lineWidth = 1; x.stroke();
      }
      ac = [null, null];
    };
    for (let i = eng.seek(tL); i < eng.n; i++) {
      const t = eng.T[i]; if (t > hv.tR) break;
      const k = Math.floor(t / bms); if (k !== key) { flush(); key = k; }
      const s = eng.S[i]; let a = ac[s]; if (!a) a = ac[s] = { t, q: 0, pv: 0, s };
      a.q += eng.Q[i]; a.pv += eng.P[i] * eng.Q[i];
    }
    flush(); x.restore();

    x.fillStyle = C.line; x.fillRect(xN, 0, 1, ch); x.fillRect(cw, 0, 1, ch); x.fillRect(0, ch, W, 1);
    let mq = 1e-9; const r0 = Math.floor((hv.cK - ch / 2 / hv.rowPx * hg) / hg), r1 = Math.floor((hv.cK + ch / 2 / hv.rowPx * hg) / hg);
    for (let r = r0; r <= r1; r++) { const q = lt.a[r - lt.base]; if (q > mq) mq = q; }
    for (let r = r0; r <= r1; r++) { // libro actual a la derecha
      const q = lt.a[r - lt.base]; if (!(q > 0)) continue;
      x.fillStyle = r * hg <= lt.bb ? up(0.55) : dn(0.55); x.fillRect(xN + 3, Y((r + 1) * hg), q / mq * (NP - 8), Math.max(1, hv.rowPx - 0.5));
    }
    const stepK = hg * Math.ceil(24 / hv.rowPx), kT = hv.cK + ch / 2 / hv.rowPx * hg, kB = hv.cK - ch / 2 / hv.rowPx * hg;
    x.fillStyle = C.mut; x.textAlign = 'left';
    for (let k = Math.ceil(kB / stepK) * stepK; k <= kT; k += stepK) { const y = Y(k + hg / 2); if (y > 6 && y < ch - 6) x.fillText(fp(k), cw + 6, y); }
    const yl = Y(eng.last + 0.5); if (yl > 0 && yl < ch) tag(x, cw, yl, fp(eng.last), eng.lastS ? C.dn : C.up);
    const stepS = [1, 2, 5, 10, 15, 30, 60, 120, 300, 600].find(s => s * hv.pps >= 80) || 600;
    x.textAlign = 'center'; x.fillStyle = C.mut;
    for (let t = Math.ceil(tL / (stepS * 1000)) * stepS * 1000; t <= hv.tR; t += stepS * 1000) x.fillText(ft(t, 1), Xt(t), H - TB / 2);

    let txt = `<b>${sym.id}</b> liquidez en reposo · fila ${(hg * sym.tick).toFixed(sym.dec)} · foto cada ${HMS} ms · ${fdur(heat.length * HMS)} guardados`;
    if (mouse && mouse.v === 'hm' && mouse.x < xN && mouse.y < ch) {
      x.fillStyle = 'rgba(255,255,255,.18)'; x.fillRect(0, mouse.y, cw, 1); x.fillRect(mouse.x, 0, 1, ch);
      const p = Math.floor(hv.cK + (ch / 2 - mouse.y) / hv.rowPx * hg), t = hv.tR - (xN - mouse.x) / hv.pps * 1000;
      tag(x, cw, mouse.y, fp(p), '#1a2230', C.tx);
      const col = heat[j0(t)], q = col && col.t <= t ? col.a[Math.floor(p / hg) - col.base] || 0 : 0;
      txt = `<b>${sym.id}</b> ${ft(t, 1)} &nbsp; precio <b>${fp(Math.floor(p / hg) * hg)}</b> &nbsp; liquidez <b>${fv(q)}</b>`;
    }
    $('read').innerHTML = txt;
  }

  /* ---------- LIBRO (DOM) + CINTA + ESTADO ---------- */
  function drawDOM() {
    const c = $('dom'), x = fit(c), W = c.clientWidth, H = c.clientHeight; x.clearRect(0, 0, W, H);
    if (rep) { x.fillStyle = C.mut; x.font = '11px ' + MONO; x.textAlign = 'center'; x.fillText('Replay: el libro solo existe en vivo', W / 2, 30); return; }
    if (!feed || !feed.bookOk || eng.last == null) return;
    const g = eng.o.group, rh = 17, rows = Math.floor(H / rh), B = new Map(), A = new Map();
    for (const [k, q] of feed.bids) { const r = Math.floor(k / g) * g; B.set(r, (B.get(r) || 0) + q); }
    for (const [k, q] of feed.asks) { const r = Math.floor(k / g) * g; A.set(r, (A.get(r) || 0) + q); }
    const lk = Math.floor(eng.last / g) * g;
    if (domC == null || domC % g || Math.abs(lk - domC) / g > rows * 0.3) domC = lk;
    const top = domC + Math.floor(rows / 2) * g, pw = Math.round(W * 0.18), PC = 74, cwd = (W - pw - PC) / 2, xp = pw + cwd, xa = xp + PC;
    let mq = 1e-9, mp = 1e-9;
    for (let r = 0; r < rows; r++) { const k = top - r * g; mq = Math.max(mq, B.get(k) || 0, A.get(k) || 0); const e = eng.prof.get(k); if (e) mp = Math.max(mp, e[0] + e[1]); }
    x.textBaseline = 'middle'; x.font = '11px ' + MONO;
    for (let r = 0; r < rows; r++) {
      const k = top - r * g, y = r * rh, b = B.get(k) || 0, a = A.get(k) || 0, e = eng.prof.get(k);
      if (e) { const w = (e[0] + e[1]) / mp * (pw - 6), ws = w * e[0] / (e[0] + e[1]); x.fillStyle = dn(0.4); x.fillRect(2, y + 2, ws, rh - 4); x.fillStyle = up(0.4); x.fillRect(2 + ws, y + 2, w - ws, rh - 4); }
      if (b) { const w = b / mq * (cwd - 4); x.fillStyle = up(0.2); x.fillRect(xp - w, y + 1, w, rh - 2); x.fillStyle = C.up; x.textAlign = 'right'; x.fillText(fv(b), xp - 5, y + rh / 2); }
      if (a) { const w = a / mq * (cwd - 4); x.fillStyle = dn(0.2); x.fillRect(xa, y + 1, w, rh - 2); x.fillStyle = C.dn; x.textAlign = 'left'; x.fillText(fv(a), xa + 5, y + rh / 2); }
      if (k === lk) { x.fillStyle = 'rgba(90,176,255,.2)'; x.fillRect(xp, y, PC, rh); }
      x.fillStyle = k === lk ? C.tx : C.mut; x.textAlign = 'center'; x.fillText(fp(k), xp + PC / 2, y + rh / 2);
    }
    const [bb, ba] = feed.best(); $('spr').textContent = 'spread ' + ((ba - bb) * sym.tick).toFixed(sym.dec);
  }
  function drawSlowPane() { if (st === 'en vivo' && feed && feed.bookOk && !feed.deepOn) feed.deepOn = true; if (view === 'fp') dirty = true; }
  function slow() {
    if (!live) return;
    if (PANE) { drawSlowPane(); return; }
    for (const f of HOOK.slow) try { f(); } catch (e) { console.error(e); }
    if (!$('pBook').hidden) { drawDOM(); drawSpd();
      $('tape').innerHTML = tape.slice(0, 9).map(t => `<div class="r ${t.s ? 'd' : 'u'}"${t.liq ? ' style="color:#ff9a2e"' : ''}><span style="color:var(--mut)">${ft(t.t, 1)}</span><span>${t.liq ? 'LIQ ' : ''}${fp(Math.round(t.pv / t.q))}</span><span>${fv(t.q)}</span></div>`).join(''); }
    drawInfo();
    const pl = sim.pos ? (eng.last - sim.avg) * sym.tick * sim.pos : 0, sg = n => (n >= 0 ? '+' : '') + n.toFixed(2);
    $('sPos').textContent = sim.pos ? (sim.pos > 0 ? '+' : '') + +sim.pos.toFixed(4) : '0'; $('sAvg').textContent = sim.pos ? (sim.avg * sym.tick).toFixed(sym.dec) : '-';
    $('sSL').textContent = sim.sl != null ? fp(sim.sl) : '-'; $('sTP').textContent = sim.tp != null ? fp(sim.tp) : '-';
    $('sOpen').textContent = sg(pl); $('sOpen').className = pl >= 0 ? 'u' : 'd'; $('sReal').textContent = sg(sim.real); $('sReal').className = sim.real >= 0 ? 'u' : 'd';
    const isLive = st === 'en vivo' && feed && feed.bookOk, e = $('st');
    if (isLive && !feed.deepOn) { feed.deepOn = true; feed.deepen(feed.until); } // ya en vivo: empieza a traer historia tick a tick hacia atrás
    e.className = 'chip ' + (isLive ? 'ok' : st === 'reconectando' ? 'bad' : '');
    e.innerHTML = `<i></i>${isLive ? 'EN VIVO' : st} · ${Math.round(stat.lat)} ms · ${stat.tps}/s · ticks ${live.firstT ? fdur((live.lastT || 0) - live.firstT) : '0'}${feed && feed.deep ? ' y cargando' : ''}` +
      (feed && (feed.gaps || feed.resyncs) ? ` · ${feed.gaps} huecos recuperados · ${feed.resyncs} resync` : '') + (feed && feed.lost ? ` · ${feed.lost} PERDIDOS` : '');
    if (view === 'fp' && !rep) dirty = true; // la cuenta regresiva de la vela
  }

  /* ---------- AUDITORÍA contra la vela oficial del exchange ---------- */
  async function runAudit() {
    if (PANE) return;
    if (!feed || !feed.ready || !live || live.firstT == null) return;
    const f = feed; let kl; try { kl = await f.klines(15); } catch (e) { return; }
    if (f !== feed) return;
    const now = Math.max(f.bookT || 0, live.lastT || 0), rows = [];
    const k0 = live.mins.keys().next().value; // mi primer minuto: su borde con lo anterior no se puede comparar
    for (const k of kl) {
      if (k.t + 60000 + 3000 > now || !live.mins.has(k.t) || k.t <= k0) continue;
      const m = live.mins.get(k.t);
      rows.push({ t: k.t, v: m.v, b: m.b, ov: k.v, ob: k.b, ok: m.v === k.v && m.b === k.b });
    }
    /* La prueba de que no falta ningún trade es la secuencia de ids (consecutiva, sin huecos).
       La comparación por minuto puede diferir sin que falte nada: un trade agregado que empieza en un minuto
       y termina en el siguiente yo lo cuento en el primero y el exchange reparte sus partes entre los dos. */
    const good = rows.filter(r => r.ok).length, lost = f.lost || 0;
    audit = { rows, n: rows.length, ok: good, lost, gaps: f.gaps };
    const e = $('aud');
    e.className = 'chip ' + (!rows.length ? '' : lost ? 'bad' : 'ok');
    e.innerHTML = `<i></i>` + (rows.length ? `Auditoría · ${lost} trades perdidos · ${good}/${rows.length} min exactos` : 'Auditoría: esperando minutos completos');
    if ($('audP').style.display === 'block') showAudit();
  }
  function showAudit() {
    const u = n => (n / 1e6).toFixed(3);
    $('audP').innerHTML = `<h4>Auditoría de precisión</h4><p><b style="color:var(--tx)">Secuencia de ids:</b> cada trade trae un número consecutivo. Huecos detectados y recuperados: ${audit.gaps || 0} · trades perdidos: <b class="${audit.lost ? 'd' : 'u'}">${audit.lost || 0}</b>.</p>
      <p><b style="color:var(--tx)">Contra la vela oficial:</b> mi volumen y mi compra agresora por minuto. Cuando un trade agregado cruza el cambio de minuto, lo que le sobra a un minuto le falta al vecino: eso es "cruce", no pérdida.</p>
      <table><tr><th>Minuto</th><th>Mi vol</th><th>Oficial</th><th>Mi compra</th><th>Oficial</th><th></th></tr>` +
      audit.rows.slice().reverse().map(r => `<tr><td>${ft(r.t)}</td><td>${u(r.v)}</td><td>${u(r.ov)}</td><td>${u(r.b)}</td><td>${u(r.ob)}</td><td class="${r.ok ? 'u' : ''}">${r.ok ? 'exacto' : 'cruce ' + (r.v - r.ov > 0 ? '+' : '') + u(r.v - r.ov)}</td></tr>`).join('') +
      `</table>` + (audit.rows.length ? '' : '<p>Aún no cierran dos minutos completos.</p>');
  }

  /* ---------- eventos del gráfico ---------- */
  function hit(m) { // ¿el cursor está sobre la línea de stop u objetivo?
    if (!sim.pos || m.x > G.cw || m.y > G.ch) return null;
    for (const k of ['sl', 'tp']) if (sim[k] != null && Math.abs(yOf(sim[k]) - m.y) < 6) return k;
    return null;
  }
  function wire(id, name) {
    const c = $(id); let drag = null;
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect(); mouse = { v: name, x: e.clientX - r.left, y: e.clientY - r.top };
      if (name === 'fp' && G.nb) {
        if (draft) { const p = ptAt(mouse); draft.t2 = p.t; draft.p2 = p.p; dirty = true; return; }
        if (grab) { sim[grab] = Math.round(v.cK + (G.ch / 2 - mouse.y) / G.rh * G.g - 0.5); dirty = true; return; }
        if (tool === 'cur') c.style.cursor = hit(mouse) ? 'ns-resize' : '';
      }
      if (drag) {
        const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag = { x: e.clientX, y: e.clientY };
        if (name === 'fp') {
          v.offX += dx; v.follow = false;
          if (v.barW >= 64 || !v.autoY) v.cK += dy / v.rh * eng.o.group;
        } else { hv.tR -= dx / hv.pps * 1000; hv.cK += dy / hv.rowPx * sym.hg; hv.follow = false; }
        $('fol').style.borderColor = C.ac;
      }
      dirty = true;
    });
    c.addEventListener('mousedown', e => {
      if (e.button) return;
      if (name === 'fp' && mouse && G.nb && mouse.x < G.cw && mouse.y < G.ch) {
        if (tool !== 'cur') {
          const p = ptAt(mouse);
          if (tool === 'alert') { addAlert(Math.round(p.p)); setTool('cur'); return; }
          if (tool === 'h') { D.push({ type: 'h', p1: p.p }); saveDraw(); setTool('cur'); dirty = true; return; }
          ruler = null; draft = { type: tool, t1: p.t, p1: p.p, t2: p.t, p2: p.p }; return;
        }
        if ((grab = hit(mouse))) return;
        ruler = null;
      }
      drag = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener('mouseup', () => {
      if (name === 'fp' && draft) { if (draft.type === 'ruler') ruler = draft; else if (draft.t1 !== draft.t2 || draft.p1 !== draft.p2) { D.push(draft); saveDraw(); } draft = null; setTool('cur'); }
      drag = null; grab = null; dirty = true;
    });
    c.addEventListener('mouseleave', () => { mouse = null; dirty = true; });
    c.addEventListener('dblclick', follow);
    c.addEventListener('contextmenu', e => { // clic derecho sobre un dibujo: lo borra
      if (name !== 'fp' || !mouse) return; e.preventDefault(); ruler = null;
      const ai = AL.findIndex(a => Math.abs(yOf(a.p) - mouse.y) < 5); if (ai >= 0) { AL.splice(ai, 1); saveAL(); dirty = true; return; }
      const i = hitD(mouse); if (i >= 0) { D.splice(i, 1); saveDraw(); } dirty = true;
    });
    c.addEventListener('wheel', e => {
      e.preventDefault(); const f = e.deltaY < 0 ? 1.12 : 1 / 1.12, onAxis = e.shiftKey || e.ctrlKey || (mouse && mouse.x > c.clientWidth - 68);
      if (name === 'fp') {
        if (onAxis) { v.autoY = false; v.rh = v.rowH = Math.max(0.02, Math.min(40, v.rh * f)); }
        else {
          const nw = Math.max(1, Math.min(260, v.barW * f));
          if (v.offX !== 0 && mouse) { const rel = (mouse.x - G.xR - v.offX) / v.barW; v.offX = mouse.x - G.xR - rel * nw; } // zoom anclado a la barra bajo el cursor
          v.barW = nw; zoomUI();
        }
      } else { if (onAxis) hv.rowPx = Math.max(1, Math.min(24, hv.rowPx * f)); else hv.pps = Math.max(0.5, Math.min(80, hv.pps * f)); }
      dirty = true;
    }, { passive: false });
  }
  function follow() { v.follow = hv.follow = true; v.autoY = true; v.rowH = 16; v.offX = 0; v.cK = hv.cK = eng.last; $('fol').style.borderColor = ''; dirty = true; }
  function zoomUI() { for (const b of $('zoom').children) b.classList.toggle('on', +b.dataset.w === (v.barW < 18 ? 7 : v.barW < 64 ? 30 : 96)); }

  $('symSel').onchange = e => { sym = SY.find(s => s.id === e.target.value); cfg.sym = sym.id; saveCfg(); fillSel(); start(); tellParent(); };
  $('barSel').onchange = () => { cfg.bar = $('barSel').value; saveCfg(); live.set(barCfg()); if (rep) rep.eng.set(barCfg()); v.offX = 0; v.autoY = true; loadHist(); dirty = true; tellParent(); };
  for (const id of ['grpSel', 'imbSel']) $(id).onchange = () => { cfg.imb = $('imbSel').value; saveCfg(); live.set(barCfg()); if (rep) rep.eng.set(barCfg()); domC = null; dirty = true; };
  $('modeSel').onchange = e => { cfg.mode = e.target.value; saveCfg(); dirty = true; };
  $('depSel').onchange = e => { cfg.dep = e.target.value; saveCfg(); start(); };
  $('tapeMin').onchange = e => { tapeMin = +e.target.value; tape = []; };
  $('con').oninput = () => { dirty = true; };
  $('fol').onclick = follow;
  $('zoom').onclick = e => { const b = e.target.closest('button'); if (!b) return; v.barW = +b.dataset.w; v.offX = 0; v.autoY = true; v.rowH = 16; v.follow = true; zoomUI(); dirty = true; };
  $('tools').onclick = e => { const b = e.target.closest('[data-t]'); if (b) setTool(b.dataset.t); };
  $('delAll').onclick = () => { D = []; ruler = null; saveDraw(); dirty = true; };
  window.addEventListener('keydown', e => { if (e.key === 'Escape') { draft = ruler = null; setTool('cur'); dirty = true; } });
  function setView(nv) {
    view = nv === 'hm' ? 'hm' : 'fp';
    for (const q of $('tabs').children) q.classList.toggle('on', q.dataset.v === view);
    $('fp').style.display = view === 'fp' ? '' : 'none'; $('hm').style.display = view === 'hm' ? '' : 'none'; dirty = true;
  }
  $('tabs').onclick = e => { const b = e.target.closest('button'); if (b) setView(b.dataset.v); };
  window.addEventListener('message', e => { if (e.data && e.data.np === 'view') setView(e.data.v); });
  const pops = ['audP', 'trkP', 'indP', 'helpP'];
  function toggle(id, fn) { for (const p of pops) if (p !== id) $(p).style.display = 'none'; const p = $(id); p.style.display = p.style.display === 'block' ? 'none' : 'block'; if (fn) fn(); }
  $('aud').onclick = () => toggle('audP', showAudit);

  /* ---------- panel de indicadores ---------- */
  const INDS = [['PRECIO'], ['vwap', 'VWAP diario', 'Precio promedio ponderado desde las 00:00 UTC.'], ['bands', 'Bandas de VWAP', 'Una y dos desviaciones estándar.'], ['ema1', 'Media móvil rápida', 'Exponencial; elige el periodo.', 'e1'], ['ema2', 'Media móvil lenta', 'Exponencial; elige el periodo.', 'e2'], ['day', 'Niveles del día anterior', 'Máximo, mínimo, cierre y apertura de hoy.'], ['prof', 'Perfil de volumen', 'Punto de control y área de valor de la sesión cargada.'],
    ['FLUJO DE ÓRDENES'], ['imb', 'Desbalances', 'Resalta los niveles donde un lado domina.'], ['zones', 'Zonas apiladas', 'Tres o más desbalances seguidos; viven hasta que el precio las cruza.'], ['poc', 'Punto de control por vela', 'El nivel con más volumen de cada vela.'], ['big', 'Órdenes de gran tamaño', 'Las agresiones más grandes, en su precio exacto.'], ['liq', 'Liquidaciones', 'Posiciones cerradas a la fuerza por el exchange.'], ['ice', 'Icebergs y muros retirados', 'Órdenes ocultas que se recargan y muros que se retiran antes de tocarse.'], ['cvds', 'CVD por tamaño', 'Separa la presión de las órdenes grandes de la de las chicas.'],
    ['CONTEXTO'], ['sess', 'Perfil por sesión', 'Asia, Londres y Nueva York.'], ['cal', 'Agenda económica', 'Datos de alto impacto sobre el gráfico (app de escritorio).'], ['heat', 'Liquidez de fondo', 'El libro de órdenes en el tiempo, detrás de las velas.'], ['stats', 'Estadística por vela', 'Volumen, delta y extremos debajo del gráfico.']];
  function showInd() {
    $('indP').innerHTML = '<h4>Indicadores</h4><p>Elige qué ves sobre el gráfico. Se guarda en tu cuenta.</p>' + INDS.map(r => r.length === 1 ? `<h5>${r[0]}</h5>` :
      `<label><input type="checkbox" data-k="${r[0]}"${cfg.ind[r[0]] ? ' checked' : ''}><span>${r[1]}${r[2] ? `<br><small>${r[2]}</small>` : ''}</span>${r[3] ? `<input type="number" min="2" max="500" data-n="${r[3]}" value="${cfg[r[3]]}">` : ''}</label>`).join('') +
      `<h5>FILTROS</h5><label><span>Tamaño mínimo de orden grande<br><small>En múltiplos de ${fv(sym.big)}, el tamaño base de este mercado.</small></span><input type="number" min="1" step="1" data-n="bigX" value="${cfg.bigX}"></label>` +
      `<label><span>Resaltar niveles con volumen desde<br><small>Cero lo apaga. Referencia: ${fv(sym.big)}.</small></span><input type="number" min="0" step="any" data-n="srch" value="${cfg.srch}"></label>`;
  }
  $('indB').onclick = () => toggle('indP', showInd);
  $('indP').oninput = e => {
    const t = e.target; if (t.dataset.k) cfg.ind[t.dataset.k] = t.checked ? 1 : 0; else if (t.dataset.n) cfg[t.dataset.n] = Math.max(0, +t.value || 0);
    if (cfg.e1 < 2) cfg.e1 = 2; if (cfg.e2 < 2) cfg.e2 = 2; saveCfg(); dirty = true;
  };

  /* ---------- REPLAY: vuelve a pasar los trades guardados, tick por tick ---------- */
  function repAdd(to, quiet) { const r = rep; while (r.i < to) { r.eng.add(r.T[r.i], r.P[r.i], r.Q[r.i], r.S[r.i]); if (!quiet && sim.pos) bracket(r.P[r.i]); r.i++; } }
  function repSeek(f) { const r = rep; r.eng.clear(); r.i = 0; repAdd(Math.max(1, Math.floor(r.n * f)), true); r.t = r.T[r.i - 1]; follow(); }
  function repStart(D) {
    const src = D && D.n ? D : live; if (rep || src.n < 100) return; const n = src.n;
    rep = { T: src.T.slice(0, n), P: src.P.slice(0, n), Q: src.Q.slice(0, n), S: src.S.slice(0, n), n, i: 0, t: 0, play: true, eng: new Engine(barCfg()) };
    eng = rep.eng; $('rp').style.display = 'flex'; $('rpP').textContent = 'Pausa'; repSeek(0.5);
  }
  function repStop() { if (!rep) return; rep = null; eng = live; $('rp').style.display = 'none'; follow(); }
  function repTick(dt) {
    const r = rep; if (!r) return;
    if (r.play) {
      r.t += Math.min(dt, 200) * +$('rpS').value; let to = r.i; while (to < r.n && r.T[to] <= r.t) to++;
      if (to > r.i) { repAdd(to); dirty = true; }
      if (r.i >= r.n) { r.play = false; $('rpP').textContent = 'Reproducir'; }
      $('rpR').value = Math.round(r.i / r.n * 1000);
    }
    $('rpT').textContent = fd(r.t) + ':' + p2(new Date(r.t).getSeconds()) + ' · trade ' + r.i.toLocaleString('es-MX') + ' de ' + r.n.toLocaleString('es-MX');
  }
  $('rpB').onclick = repStart; $('rpX').onclick = repStop;
  $('rpP').onclick = () => { if (!rep) return; if (!rep.play && rep.i >= rep.n) repSeek(0); rep.play = !rep.play; $('rpP').textContent = rep.play ? 'Pausa' : 'Reproducir'; };
  $('rpR').oninput = e => { if (rep) repSeek(+e.target.value / 1000); };

  /* ---------- TERMINAL SIMULADA + historial automático (ninguna orden sale al mercado) ---------- */
  const TK = 'npd.trades.' + ses.email; let trk = [];
  try { trk = JSON.parse(localStorage.getItem(TK)) || []; } catch (e) {}
  /* stop = orden de mercado al tocarse (se llena al precio del trade que lo tocó, con su deslizamiento);
     objetivo = orden límite (se llena a su precio) */
  function bracket(p) {
    if (!sim.pos || HOOK.real) return; const s = Math.sign(sim.pos), q = Math.abs(sim.pos);
    if (sim.sl != null && (s > 0 ? p <= sim.sl : p >= sim.sl)) simOrder(-s, q, p, 'stop');
    else if (sim.tp != null && (s > 0 ? p >= sim.tp : p <= sim.tp)) simOrder(-s, q, sim.tp, 'objetivo');
  }
  function simOrder(side, q, fpx, why) {
    if (!(q > 0) || eng.last == null) return;
    if (HOOK.can.some(f => !f(side, q, why))) return;   // reglas de la cuenta
    if (HOOK.mode && HOOK.mode(side, q, why)) return;   // lo manda el bróker real
    let px = eng.last;
    if (!rep && feed && feed.bookOk) { const [bb, ba] = feed.best(); px = side > 0 ? ba : bb; } // en vivo: compra al ask, vende al bid
    if (fpx != null) px = fpx;
    let rem = q; const ps = Math.sign(sim.pos);
    if (ps && ps !== side) {
      const c = Math.min(Math.abs(sim.pos), rem), pnl = (px - sim.avg) * sym.tick * c * ps; sim.real += pnl;
      trk.unshift({ t: Date.now(), sym: sym.id, side: ps, q: c, a: sim.avg * sym.tick, b: px * sym.tick, pnl, rep: !!rep, tag: why || '' }); trk = trk.slice(0, 200);
      if (!DEMO) try { localStorage.setItem(TK, JSON.stringify(trk)); } catch (e) {}
      for (const f of HOOK.closed) try { f({ t: Date.now(), sym: sym.id, side: ps, q: c, a: sim.avg * sym.tick, b: px * sym.tick, pnl, mode: rep ? (HOOK.reto ? 'reto' : 'replay') : 'sim', why: why || '' }); } catch (e) { console.error(e); }
      sim.pos = +(sim.pos + side * c).toFixed(8); rem -= c; if (!sim.pos) sim.avg = 0;
    }
    if (rem > 1e-9) { const np = +(sim.pos + side * rem).toFixed(8); sim.avg = (Math.abs(sim.pos) * sim.avg + rem * px) / Math.abs(np); sim.pos = np; }
    /* al abrir o voltear posición: stop a 8 filas y objetivo a 16 (2R); luego se arrastran */
    if (!sim.pos) sim.sl = sim.tp = null;
    else if (ps !== Math.sign(sim.pos)) { const d = eng.o.group * 8 * Math.sign(sim.pos); sim.sl = Math.round(sim.avg) - d; sim.tp = Math.round(sim.avg) + 2 * d; for (const f of HOOK.open) try { f({ side: Math.sign(sim.pos), px: sim.avg * sym.tick }); } catch (e) {} }
    dirty = true; if ($('trkP').style.display === 'block') showTrk();
  }
  function showTrk() {
    const tot = trk.reduce((a, t) => a + t.pnl, 0), w = trk.filter(t => t.pnl > 0).length;
    $('trkP').innerHTML = `<h4>Historial automático</h4><p>Cada operación simulada queda registrada sola. Nada de esto sale al mercado.<br>${trk.length} operaciones · aciertos ${trk.length ? Math.round(w / trk.length * 100) : 0}% · P/L total <b class="${tot >= 0 ? 'u' : 'd'}">${tot >= 0 ? '+' : ''}${tot.toFixed(2)}</b></p>
      <table><tr><th>Hora</th><th>Símbolo</th><th>Lado</th><th>Cant.</th><th>Entrada</th><th>Salida</th><th>P/L</th></tr>` +
      trk.slice(0, 14).map(t => `<tr><td>${ft(t.t, 1)}${t.rep ? ' R' : ''}</td><td>${t.sym}</td><td class="${t.side > 0 ? 'u' : 'd'}">${t.side > 0 ? 'Largo' : 'Corto'}${t.tag ? ' · ' + t.tag : ''}</td><td>${+t.q.toFixed(4)}</td><td>${+t.a.toFixed(6)}</td><td>${+t.b.toFixed(6)}</td><td class="${t.pnl >= 0 ? 'u' : 'd'}">${t.pnl >= 0 ? '+' : ''}${t.pnl.toFixed(2)}</td></tr>`).join('') + '</table>';
  }
  $('buy').onclick = () => simOrder(1, +$('simQ').value); $('sell').onclick = () => simOrder(-1, +$('simQ').value);
  $('flat').onclick = () => { if (sim.pos) simOrder(-Math.sign(sim.pos), Math.abs(sim.pos)); };
  $('sSL').onclick = () => { sim.sl = null; dirty = true; }; $('sTP').onclick = () => { sim.tp = null; dirty = true; };
  $('trkB').onclick = () => toggle('trkP', showTrk);
  if (/Electron/.test(navigator.userAgent)) { $('dlMac').remove(); $('dlWin').remove(); } // dentro de la app de escritorio no hace falta
  $('usr').textContent = ses.name.split(' ')[0] + ' · Salir';
  $('usr').onclick = () => { NPAuth.logout(); location.href = 'index.html'; };
  wire('fp', 'fp'); wire('hm', 'hm');
  window.addEventListener('resize', () => { dirty = true; });


  /* ---------- avisos: alertas de precio y trades grandes ---------- */
  const AKEY = () => 'npd.al.' + ses.email + '.' + sym.id;
  function loadAL() { try { AL = JSON.parse(localStorage.getItem(AKEY())) || []; } catch (e) { AL = []; } lastPx = null; showAl(); }
  function saveAL() { if (!PANE) try { localStorage.setItem(AKEY(), JSON.stringify(AL)); } catch (e) {} showAl(); }
  function addAlert(p) { AL.push({ p }); saveAL(); dirty = true; try { if (window.Notification && Notification.permission === 'default') Notification.requestPermission(); } catch (e) {} }
  let actx = null;
  function beep() { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime; o.frequency.value = 880; o.connect(g); g.connect(actx.destination); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.2, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5); o.start(); o.stop(t + 0.5); } catch (e) {} }
  function ping(title, body) {
    if (PANE) return;
    alLog.unshift({ t: Date.now(), title, body }); alLog = alLog.slice(0, 30);
    const el = document.createElement('div'), b = document.createElement('b'); b.textContent = title; el.appendChild(b); el.appendChild(document.createTextNode(body)); $('toast').appendChild(el); setTimeout(() => el.remove(), 7000);
    if (cfg.alSnd !== 0) beep();
    for (const f of HOOK.ping) try { f(title, body); } catch (e) {}
    try { if (window.Notification && Notification.permission === 'granted' && document.hidden) new Notification(title, { body }); } catch (e) {}
    showAl();
  }
  function checkAlerts(p) {
    if (lastPx != null && AL.length) for (let i = AL.length - 1; i >= 0; i--) { const a = AL[i].p; if ((lastPx < a && p >= a) || (lastPx > a && p <= a)) { AL.splice(i, 1); saveAL(); ping('Alerta de precio · ' + sym.id, 'El precio tocó ' + fp(a)); dirty = true; } }
    lastPx = p;
  }
  function showAl() {
    const e = $('alBox'); if (!e || $('pAl').hidden) return;
    const sw = (k, t, s, on) => `<label class="sw"><input type="checkbox" data-c="${k}"${on ? ' checked' : ''}><span><b>${t}</b><small>${s}</small></span></label>`;
    e.innerHTML = `<h6>Preferencias</h6>` + sw('alSnd', 'Sonido', 'Un tono breve con cada aviso.', cfg.alSnd !== 0) + sw('alBig', 'Órdenes de gran tamaño', 'Te avisa cuando entra una orden tres veces mayor que tu filtro.', cfg.alBig) +
      `<h6>Niveles de precio · ${sym.id.replace(/USDT$/, '')}</h6>` + (AL.length ? '<div class="card">' + AL.map((a, i) => `<div class="it"><span>${fp(a.p)}</span><button data-x="${i}">Quitar</button></div>`).join('') + '</div>' : `<div class="card empty"><svg viewBox="0 0 24 24"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/></svg><span>Sin niveles activos.</span><span>Pulsa <b>A</b> y haz clic en el gráfico para crear uno.</span></div>`) +
      `<h6>Historial</h6>` + (alLog.length ? '<div class="card">' + alLog.slice(0, 12).map(l => `<div class="it"><span>${l.body}</span><span style="color:var(--mut2)">${ft(l.t)}</span></div>`).join('') + '</div>' : `<div class="card empty"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></svg><span>Aún no hay avisos en esta sesión.</span></div>`);
  }
  $('alBox').onclick = e => { const b = e.target.closest('[data-x]'); if (b) { AL.splice(+b.dataset.x, 1); saveAL(); dirty = true; } };
  $('alBox').onchange = e => { const k = e.target.dataset.c; if (k) { cfg[k] = e.target.checked ? 1 : 0; saveCfg(); } };

  /* ---------- velocidad de la cinta: compra y venta agresora por segundo, últimos 60 s ---------- */
  const SPD = { b: new Float64Array(60), s: new Float64Array(60), n: new Uint16Array(60), sec: 0 };
  function spdRoll() { const sc = Math.floor(Date.now() / 1000), gap = Math.min(60, sc - SPD.sec); for (let i = 1; i <= gap; i++) { const k = (SPD.sec + i) % 60; SPD.b[k] = SPD.s[k] = SPD.n[k] = 0; } if (gap > 0) SPD.sec = sc; return sc % 60; }
  function spdAdd(sell, q) { const k = spdRoll(); if (sell) SPD.s[k] += q; else SPD.b[k] += q; SPD.n[k]++; }
  function drawSpd() {
    const c = $('spd'); if (!c.clientWidth) return; const x = fit(c), W = c.clientWidth, H = c.clientHeight; x.clearRect(0, 0, W, H); spdRoll();
    let mx = 1e-9, tb = 0, ts = 0, n10 = 0; for (let i = 0; i < 60; i++) { mx = Math.max(mx, SPD.b[i], SPD.s[i]); tb += SPD.b[i]; ts += SPD.s[i]; }
    for (let i = 0; i < 60; i++) { const k = ((SPD.sec - 59 + i) % 60 + 60) % 60, bw = W / 60; if (i >= 50) n10 += SPD.n[k];
      x.fillStyle = up(0.8); const hb = SPD.b[k] / mx * (H / 2 - 2); x.fillRect(i * bw + 0.5, H / 2 - hb, bw - 1, hb);
      x.fillStyle = dn(0.8); x.fillRect(i * bw + 0.5, H / 2, bw - 1, SPD.s[k] / mx * (H / 2 - 2)); }
    x.fillStyle = C.line; x.fillRect(0, H / 2, W, 1);
    $('spdT').innerHTML = tb + ts ? `<span class="${tb >= ts ? 'u' : 'd'}">${Math.round(tb / (tb + ts) * 100)}% compra</span> · ${(n10 / 10).toFixed(1)}/s` : '';
  }

  /* ---------- franja de datos: precio de marca, funding, interés abierto, 24 h ---------- */
  const INFO = {}; let tick24 = new Map();
  const fm = n => n >= 1e9 ? (n / 1e9).toFixed(2) + ' B' : n >= 1e6 ? (n / 1e6).toFixed(1) + ' M' : n >= 1e3 ? (n / 1e3).toFixed(1) + ' k' : n.toFixed(0);
  async function infoFast() {
    if (PANE || document.body.classList.contains('multi')) return; const id = sym.id;
    try { const j = await (await fetch(REST + 'premiumIndex?symbol=' + id)).json(); if (id !== sym.id) return; INFO.id = id; INFO.mark = +j.markPrice; INFO.fund = +j.lastFundingRate; INFO.next = +j.nextFundingTime; } catch (e) {}
  }
  async function infoSlow() {
    if (PANE) return; const id = sym.id;
    try { const tk = await (await fetch(REST + 'ticker/24hr')).json(); tick24 = new Map(tk.map(t => [t.symbol, t])); } catch (e) {}
    try { const oi = await (await fetch(REST + 'openInterest?symbol=' + id)).json(); if (id === sym.id) INFO.oi = +oi.openInterest; } catch (e) {}
    showWatch();
  }
  function drawInfo() {
    const e = $('info'); if (PANE || !live) return; const t = tick24.get(sym.id), last = live.last != null ? live.last * sym.tick : null, ok = INFO.id === sym.id;
    const ch = t ? +t.priceChangePercent : null, rem = ok && INFO.next ? Math.max(0, INFO.next - (Date.now() - skew)) : null, hh = rem != null ? Math.floor(rem / 3600e3) : 0, mm = rem != null ? Math.floor(rem / 60000) % 60 : 0, ss = rem != null ? Math.floor(rem / 1000) % 60 : 0;
    const cell = (l, v) => `<div><small>${l}</small><b>${v}</b></div>`;
    e.innerHTML = `<div class="big"><small>${sym.name || sym.id}</small><b class="${live.lastS ? 'd' : 'u'}">${last != null ? last.toFixed(sym.dec) : '-'}</b></div>` +
      cell('CAMBIO 24 H', ch != null ? `<span class="${ch >= 0 ? 'u' : 'd'}">${ch >= 0 ? '+' : ''}${ch.toFixed(2)}%</span>` : '-') +
      cell('MÁX 24 H', t ? (+t.highPrice).toFixed(sym.dec) : '-') + cell('MÍN 24 H', t ? (+t.lowPrice).toFixed(sym.dec) : '-') +
      cell('VOLUMEN 24 H', t ? fm(+t.quoteVolume) + ' USDT' : '-') +
      cell('PRECIO DE MARCA', ok && INFO.mark ? INFO.mark.toFixed(sym.dec) : '-') +
      cell('FUNDING', ok && INFO.fund != null ? `<span class="${INFO.fund >= 0 ? 'u' : 'd'}">${(INFO.fund * 100).toFixed(4)}%</span> · en ${p2(hh)}:${p2(mm)}:${p2(ss)}` : '-') +
      cell('INTERÉS ABIERTO', ok && INFO.oi && last ? fm(INFO.oi * last) + ' USDT' : '-');
  }

  /* ---------- lista de mercados ---------- */
  function showWatch() {
    const e = $('watch'); if (!e || $('pWatch').hidden) return; let h = '', cat = '';
    for (const s of SY) {
      if (s.cat !== cat) { cat = s.cat; h += `<h6>${(cat || 'MERCADOS').toUpperCase()}</h6>`; }
      const t = tick24.get(s.id), ch = t ? +t.priceChangePercent : null;
      h += `<div class="wr${s.id === sym.id ? ' on' : ''}" data-s="${s.id}"><span>${s.id.replace(/USDT$/, '')}${s.name ? `<small>${s.name}</small>` : ''}</span><span>${t ? (+t.lastPrice).toFixed(s.dec) : ''}</span><span class="${ch == null ? '' : ch >= 0 ? 'u' : 'd'}">${ch == null ? '' : (ch >= 0 ? '+' : '') + ch.toFixed(2) + '%'}</span></div>`;
    }
    const y = e.scrollTop; e.innerHTML = h; e.scrollTop = y;
  }
  function setSym(id) { const s = SY.find(q => q.id === id); if (!s || s === sym) return; $('symSel').value = id; $('symSel').onchange({ target: $('symSel') }); showWatch(); }
  $('watch').onclick = e => { const r = e.target.closest('[data-s]'); if (r) setSym(r.dataset.s); };
  $('rtabs').onclick = e => { const b = e.target.closest('button'); if (!b) return; for (const q of $('rtabs').children) { q.classList.toggle('on', q === b); $(q.dataset.p).hidden = q !== b; } showWatch(); showAl(); dirty = true; };

  /* ---------- pedir un nombre (sirve también en la app de escritorio) ---------- */
  function ask(title, cb) {
    const m = $('ask'); $('askT').textContent = title; $('askI').value = ''; m.style.display = 'grid'; $('askI').focus();
    const done = v => { m.style.display = 'none'; m.querySelector('form').onsubmit = $('askN').onclick = null; if (v) cb(v); };
    m.querySelector('form').onsubmit = e => { e.preventDefault(); done($('askI').value.trim()); }; $('askN').onclick = () => done('');
  }

  /* ---------- plantillas: guardan barra, modo, zoom e indicadores ---------- */
  const TPK = 'npd.tpl.' + ses.email; let TPL = {}; try { TPL = JSON.parse(localStorage.getItem(TPK)) || {}; } catch (e) {}
  function tplUI() {
    const s = $('tplSel'); s.innerHTML = ''; const add = (v, t) => { const o = document.createElement('option'); o.value = v; o.textContent = t; s.appendChild(o); };
    add('', 'Plantillas'); for (const n of Object.keys(TPL)) add('t:' + n, n); add('save', 'Guardar espacio actual…'); if (Object.keys(TPL).length) add('del', 'Borrar una…');
  }
  function tplSave() { try { localStorage.setItem(TPK, JSON.stringify(TPL)); } catch (e) {} tplUI(); }
  $('tplSel').onchange = e => {
    const val = e.target.value; e.target.value = '';
    if (val === 'save') ask('Nombre de la plantilla', n => { TPL[n] = { sym: sym.id, lay: JSON.parse(JSON.stringify(LAY)), bar: cfg.bar, mode: cfg.mode, imb: cfg.imb, e1: cfg.e1, e2: cfg.e2, srch: cfg.srch, bigX: cfg.bigX, ind: Object.assign({}, cfg.ind), w: v.barW }; tplSave(); });
    else if (val === 'del') ask('Nombre de la plantilla a borrar', n => { delete TPL[n]; tplSave(); });
    else if (val.startsWith('t:')) {
      const t = TPL[val.slice(2)]; if (!t) return;
      Object.assign(cfg, { bar: t.bar, mode: t.mode, imb: t.imb, e1: t.e1, e2: t.e2, srch: t.srch, bigX: t.bigX }); cfg.ind = Object.assign({}, IND0, t.ind);
      for (const [id, k] of [['barSel', 'bar'], ['imbSel', 'imb'], ['modeSel', 'mode']]) if ([...$(id).options].some(o => o.value === cfg[k])) $(id).value = cfg[k];
      v.barW = t.w || 30; v.offX = 0; v.autoY = true; saveCfg(); live.set(barCfg()); loadHist(); zoomUI(); dirty = true;
      if (t.sym && t.sym !== sym.id) setSym(t.sym);
      if (t.lay) { LAY = JSON.parse(JSON.stringify(t.lay)); setLayout(LAY.n || 1); }
    }
  };

  /* ---------- captura del gráfico ---------- */
  $('shot').onclick = () => {
    const c = $(view === 'fp' ? 'fp' : 'hm'), o = document.createElement('canvas'); o.width = c.width; o.height = c.height; const x = o.getContext('2d');
    x.fillStyle = '#05070a'; x.fillRect(0, 0, o.width, o.height); x.drawImage(c, 0, 0);
    o.toBlob(b => { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = sym.id + '-' + new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-') + '.png'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 3000); });
  };

  /* ---------- atajos de teclado ---------- */
  const KEYS = [['1', 'Velas'], ['2', 'Clusters'], ['3', 'Números'], ['H', 'Línea horizontal'], ['T', 'Línea de tendencia'], ['R', 'Zona'], ['M', 'Regla'], ['A', 'Alerta de precio'], ['F', 'Seguir el precio'], ['G', 'Gráfico / Heatmap'], ['Espacio', 'Pausar o seguir el replay'], ['Esc', 'Soltar la herramienta']];
  $('helpB').onclick = () => toggle('helpP', () => { $('helpP').innerHTML = '<h4>Atajos de teclado</h4><p>Todo sin soltar el mouse del gráfico.</p>' + KEYS.map(k => `<div><kbd>${k[0]}</kbd>${k[1]}</div>`).join('') + '<p style="margin-top:10px">Rueda = zoom · Shift + rueda = zoom del precio · doble clic = seguir · clic derecho sobre un dibujo o alerta = borrarlo.</p>'; });
  window.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey || /INPUT|SELECT|TEXTAREA/.test(e.target.tagName) || document.body.classList.contains('multi')) return;
    const k = e.key.toLowerCase(), z = { 1: 7, 2: 30, 3: 96 }[k], tl = { h: 'h', t: 'line', r: 'rect', m: 'ruler', a: 'alert' }[k];
    if (z) { v.barW = z; v.offX = 0; v.autoY = true; v.rowH = 16; v.follow = true; zoomUI(); dirty = true; }
    else if (tl) setTool(tl); else if (k === 'f') follow(); else if (k === 'g') setView(view === 'fp' ? 'hm' : 'fp');
    else if (k === ' ' && rep) { e.preventDefault(); $('rpP').onclick(); }
  });

  /* ---------- varios gráficos a la vez: cada uno es la plataforma en modo compacto ---------- */
  const LK = 'npd.lay.' + ses.email; let LAY = { n: 1, panes: [] };
  try { LAY = Object.assign(LAY, JSON.parse(localStorage.getItem(LK))); } catch (e) {}
  const laySave = () => { try { localStorage.setItem(LK, JSON.stringify(LAY)); } catch (e) {} };
  function setLayout(n) {
    LAY.n = n; for (const b of $('lay').children) b.classList.toggle('on', +b.dataset.n === n);
    const g = $('grid'), multi = n > 1; document.body.classList.toggle('multi', multi); g.innerHTML = '';
    if (multi) {
      if (rep) repStop(); if (feed) { feed.stop(); feed = null; st = 'varios gráficos'; }
      const others = SY.filter(s => s.id !== sym.id && s.cat === 'Cripto').map(s => s.id); g.className = 'g' + n;
      for (let i = 0; i < n; i++) {
        const p = LAY.panes[i] && SY.some(s => s.id === LAY.panes[i].s) ? LAY.panes[i] : (LAY.panes[i] = { s: i ? others[i - 1] || sym.id : sym.id, bar: cfg.bar });
        const f = document.createElement('iframe'); f.title = 'Gráfico ' + (i + 1); f.src = `app.html?pane=1&i=${i}&s=${encodeURIComponent(p.s)}&bar=${encodeURIComponent(p.bar)}&w=${n > 2 ? 8 : 12}`; g.appendChild(f);
      }
    } else if (!feed) start();
    laySave();
  }
  $('lay').onclick = e => { const b = e.target.closest('button'); if (b) setLayout(+b.dataset.n); };
  window.addEventListener('message', e => { const m = e.data; if (m && m.np === 'pane' && e.origin === location.origin && LAY.panes[m.i]) { LAY.panes[m.i] = { s: String(m.s), bar: String(m.bar) }; laySave(); } });
  function tellParent() { if (PANE) try { parent.postMessage({ np: 'pane', i: +QS.get('i') || 0, s: sym.id, bar: $('barSel').value }, location.origin); } catch (e) {} }

  /* ---------- aviso si el exchange no responde desde esta red ---------- */
  async function reach() {
    let code = 0; try { code = (await fetch(REST + 'ping')).status; } catch (e) { code = -1; }
    if (code === 200) return true;
    const b = document.createElement('div'); b.style.cssText = 'position:fixed;left:50%;top:70px;transform:translateX(-50%);z-index:60;max-width:560px;background:#0a1528;border:1px solid #3d5afe;border-radius:12px;padding:14px 18px;font:13px/1.5 Inter,sans-serif;color:#eef5ff;box-shadow:0 14px 40px rgba(0,0,0,.6)';
    b.innerHTML = '<b style="display:block;margin-bottom:4px">No hay conexión con el mercado</b>' + (code === 451 || code === 403 ? 'Binance Futures no está disponible desde tu país o red (por ejemplo, desde EE. UU.). Prueba otra conexión.' : 'Revisa tu internet. La plataforma reintenta sola.');
    document.body.appendChild(b); return false;
  }
  /* ---------- inicio ---------- */
  (async () => {
    if (!PANE) reach();
    try { await loadSyms(); } catch (e) {}
    const want = QS.get('s') || cfg.sym;
    { let h = '', cat = null; for (const s of SY) { if (s.cat !== cat) { h += (cat === null ? '' : '</optgroup>') + `<optgroup label="${s.cat || 'Mercados'}">`; cat = s.cat; } h += `<option value="${s.id}">${s.id}${s.name ? ' · ' + s.name : ''}</option>`; } $('symSel').innerHTML = h + '</optgroup>'; }
    sym = SY.find(s => s.id === want) || SY.find(s => s.id === 'BTCUSDT') || SY[0]; $('symSel').value = sym.id; fillSel();
    for (const [id, k] of [['barSel', 'bar'], ['imbSel', 'imb'], ['depSel', 'dep'], ['modeSel', 'mode']]) if ([...$(id).options].some(o => o.value === cfg[k])) $(id).value = cfg[k];
    if (QS.get('w')) v.barW = Math.max(1, +QS.get('w') || 30);
    if (QS.get('bar') && [...$('barSel').options].some(o => o.value === QS.get('bar'))) $('barSel').value = QS.get('bar');
    zoomUI(); tplUI(); $('licT').textContent = (NPLic.info() || {}).plan || '';
    if (!PANE && LAY.n > 1) setLayout(LAY.n); else start();
    if (QS.get('v')) setView(QS.get('v'));
    if (!PANE) { infoFast(); infoSlow(); setInterval(infoFast, 5000); setInterval(infoSlow, 60000); setInterval(() => { $('clock').textContent = new Date().toLocaleTimeString('es-MX') + ' · UTC ' + new Date().toISOString().slice(11, 16); }, 1000); }
  })();
  setInterval(snapHeat, HMS);
  setInterval(slow, 200);
  setInterval(mergeOlder, 8000);
  setInterval(refreshHist, 10000);
  setInterval(() => { stat.tps = stat.cnt; stat.cnt = 0; }, 1000);
  setInterval(runAudit, 15000); setTimeout(runAudit, 6000);
  let pt = performance.now();
  (function loop() { const nt = performance.now(); repTick(nt - pt); pt = nt; if (dirty && eng) { dirty = false; try { view === 'fp' ? drawFP() : drawHM(); } catch (e) { console.error(e); } } requestAnimationFrame(loop); })();
  window.NPX = { HOOK, $, REST, ses, PANE, C, up, dn, fp, fv, ft, fs, fd, ping, ask, toggle, simOrder, repStart, repStop, setView, follow, idxAt,
    get sym() { return sym; }, get SY() { return SY; }, get eng() { return eng; }, get live() { return live; }, get feed() { return feed; }, get sim() { return sim; }, get rep() { return rep; },
    get G() { return G; }, get cfg() { return cfg; }, saveCfg, get D() { return D; }, get heat() { return heat; }, get heatRef() { return hv.ref; }, get skew() { return skew; },
    get vwap() { return G.nb ? vw[G.nb - 1] : null; }, get view() { return view; }, dirty() { dirty = true; },
    capture(w) { const c = $('fp'); if (!c.width) return null; const s = Math.min(1, (w || 900) / c.width), o = document.createElement('canvas'); o.width = c.width * s; o.height = c.height * s; const x = o.getContext('2d'); x.fillStyle = '#03060c'; x.fillRect(0, 0, o.width, o.height); x.drawImage(c, 0, 0, o.width, o.height); return o.toDataURL('image/jpeg', 0.72); } };
  window.__np = { get eng() { return eng; }, get live() { return live; }, get sim() { return sim; }, get feed() { return feed; }, get audit() { return audit; }, get heat() { return heat; }, get hist() { return hist; }, get D() { return D; }, G, v, cfg };
})();
