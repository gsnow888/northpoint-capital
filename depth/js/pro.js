/* NORTHPOINT DEPTH · funciones profesionales:
   diario automático, reglas de la cuenta, conexión a Binance Futures (prueba / real) con copiador,
   modo reto, replay por fecha, icebergs y muros retirados, perfil por sesión, CVD por tamaño,
   alertas avanzadas (con Telegram), correlaciones y datos económicos. */
(function () {
  'use strict';
  const N = window.NPX; if (!N || N.PANE) return;          // los gráficos de la cuadrícula no cargan esto
  const $ = N.$, H = N.HOOK, MONO = '"JetBrains Mono",ui-monospace,monospace';
  const UID = N.ses.email, LK = k => 'npd.' + k + '.' + UID;
  const get = (k, d) => { try { const v = JSON.parse(localStorage.getItem(LK(k))); return v == null ? d : v; } catch (e) { return d; } };
  const put = (k, v) => { try { localStorage.setItem(LK(k), JSON.stringify(v)); } catch (e) {} };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = n => (n >= 0 ? '+' : '-') + '$' + Math.abs(n).toFixed(2);
  const dayKey = t => { const d = new Date(t); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };
  const vis = id => !$(id).hidden;

  /* =================== DIARIO (IndexedDB: guarda capturas sin llenar el navegador) =================== */
  let DB = null, JR = [];
  function idb() {
    return new Promise((ok, no) => {
      const r = indexedDB.open('npd-diario', 1);
      r.onupgradeneeded = () => { const s = r.result.createObjectStore('trades', { keyPath: 'id' }); s.createIndex('u', 'u'); };
      r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error);
    });
  }
  const tx = (m) => DB.transaction('trades', m).objectStore('trades');
  async function jrLoad() {
    try { DB = await idb(); } catch (e) { DB = null; }
    if (!DB) { JR = get('jr', []); return; }
    JR = await new Promise(ok => { const r = tx('readonly').index('u').getAll(UID); r.onsuccess = () => ok(r.result || []); r.onerror = () => ok([]); });
    JR.sort((a, b) => b.t - a.t);
    if (!get('jrMig', false)) { // trae el historial simulado viejo
      let old = []; try { old = JSON.parse(localStorage.getItem('npd.trades.' + UID)) || []; } catch (e) {}
      for (const o of old) jrPut({ id: 'm' + o.t + Math.random().toString(36).slice(2, 6), u: UID, t: o.t, t0: o.t, sym: o.sym, side: o.side, q: o.q, a: o.a, b: o.b, pnl: o.pnl, mode: o.rep ? 'replay' : 'sim', why: o.tag || '', setup: '', note: '', stars: 0 });
      put('jrMig', true);
    }
  }
  function jrPut(r) { JR = [r].concat(JR.filter(x => x.id !== r.id)).sort((a, b) => b.t - a.t); if (DB) try { tx('readwrite').put(r); } catch (e) {} else put('jr', JR.slice(0, 500).map(x => Object.assign({}, x, { img: null }))); }
  function jrDel(id) { JR = JR.filter(x => x.id !== id); if (DB) try { tx('readwrite').delete(id); } catch (e) {} }

  /* la captura se toma al ENTRAR; el registro se completa al cerrar */
  let pendImg = {}, tag = get('tag', '');
  const SETUPS = () => get('setups', ['Absorción', 'Desbalance apilado', 'Trampa', 'Ruptura', 'Rebote en nivel', 'Iceberg']);
  H.open.push(o => { pendImg[N.sym.id] = { img: N.capture(900), t0: Date.now(), setup: tag }; });
  function record(r) {
    const p = pendImg[r.sym] || {}; delete pendImg[r.sym];
    jrPut(Object.assign({ id: 't' + r.t + Math.random().toString(36).slice(2, 7), u: UID, t0: p.t0 || r.t, img: p.img || null, setup: p.setup || '', note: '', stars: 0 }, r));
    rulesCheckAfter(); paintJr(); paintAc(); retoCheck();
  }
  H.closed.push(r => record(r));

  /* ---- panel derecho ---- */
  function stats(L) {
    const w = L.filter(x => x.pnl > 0), l = L.filter(x => x.pnl < 0), gw = w.reduce((a, x) => a + x.pnl, 0), gl = -l.reduce((a, x) => a + x.pnl, 0), net = gw - gl;
    let pk = 0, eq = 0, dd = 0; for (const x of L.slice().reverse()) { eq += x.pnl; pk = Math.max(pk, eq); dd = Math.max(dd, pk - eq); }
    return { n: L.length, net, win: L.length ? w.length / L.length : 0, pf: gl ? gw / gl : (gw ? Infinity : 0), aw: w.length ? gw / w.length : 0, al: l.length ? gl / l.length : 0, exp: L.length ? net / L.length : 0, dd, best: L.length ? Math.max(...L.map(x => x.pnl)) : 0, worst: L.length ? Math.min(...L.map(x => x.pnl)) : 0 };
  }
  const sw = (attr, t, sub, on) => `<label class="sw"><input type="checkbox" ${attr}${on ? ' checked' : ''}><span><b>${t}</b>${sub ? `<small>${sub}</small>` : ''}</span></label>`;
  function paintJr() {
    if (!vis('pJr')) return;
    const today = JR.filter(x => dayKey(x.t) === dayKey(Date.now())), s = stats(today);
    $('jrBox').innerHTML = `<h6>Hoy</h6><div class="card"><div class="stat"><div><small>Resultado</small><b class="${s.net >= 0 ? 'u' : 'd'}">${money(s.net)}</b></div><div><small>Operaciones</small><b>${s.n}</b></div><div><small>Acierto</small><b>${Math.round(s.win * 100)}%</b></div><div><small>Factor</small><b>${s.pf === Infinity ? '∞' : s.pf.toFixed(2)}</b></div></div></div>
      <h6>Setup de tu próxima entrada</h6><div class="card"><div class="chips" id="jrTags">${SETUPS().map(x => `<button data-tg="${esc(x)}" class="${x === tag ? 'on' : ''}">${esc(x)}</button>`).join('')}<button data-tg="+">+ Nuevo</button></div><p style="margin:10px 2px 0">Al entrar se guarda una captura del gráfico con este setup.</p></div>
      <h6>Recientes</h6>` + (JR.length ? '<div class="card">' + JR.slice(0, 7).map(x => `<div class="it"><span>${esc(x.sym.replace(/USDT$/, ''))} <span class="${x.side > 0 ? 'u' : 'd'}">${x.side > 0 ? 'Largo' : 'Corto'}</span> <span style="color:var(--mut2)">· ${esc(x.setup || x.mode)}</span></span><span class="${x.pnl >= 0 ? 'u' : 'd'}">${money(x.pnl)}</span></div>`).join('') + '</div>'
      : '<div class="card empty"><svg viewBox="0 0 24 24"><path d="M5 4h11l3 3v13H5z"/><path d="M9 10h6M9 14h6"/></svg><span>Tu diario está vacío.</span><span>Cada operación se registra sola, con su captura.</span></div>') +
      `<button id="jrOpen" class="pri wide">Abrir diario</button>`;
  }
  $('jrBox').addEventListener('click', e => {
    const b = e.target.closest('[data-tg]');
    if (b) { if (b.dataset.tg === '+') N.ask('Nombre del setup', n => { put('setups', SETUPS().concat(n)); tag = n; put('tag', tag); paintJr(); }); else { tag = tag === b.dataset.tg ? '' : b.dataset.tg; put('tag', tag); paintJr(); } return; }
    if (e.target.id === 'jrOpen') openJr();
  });

  /* ---- diario completo ---- */
  const mod = document.createElement('div'); mod.className = 'mod'; document.body.appendChild(mod);
  let jf = { mode: 'todas', sym: 'todos', per: '30' };
  function filtered() {
    const lim = jf.per === 'todo' ? 0 : Date.now() - (+jf.per) * 864e5;
    return JR.filter(x => x.t >= lim && (jf.mode === 'todas' || x.mode === jf.mode) && (jf.sym === 'todos' || x.sym === jf.sym));
  }
  function bars(c, labels, vals, title) {
    const d = devicePixelRatio || 1, w = c.clientWidth, h = c.clientHeight; c.width = w * d; c.height = h * d; const x = c.getContext('2d'); x.setTransform(d, 0, 0, d, 0, 0);
    x.font = '10px ' + MONO; x.fillStyle = '#8ea0bd'; x.fillText(title, 0, 10);
    const m = Math.max(1e-9, ...vals.map(Math.abs)), bw = w / vals.length, z = 18 + (h - 34) / 2;
    vals.forEach((v, i) => { const hh = Math.abs(v) / m * ((h - 34) / 2); x.fillStyle = v >= 0 ? N.up(0.8) : N.dn(0.8); x.fillRect(i * bw + 2, v >= 0 ? z - hh : z, bw - 4, hh); x.fillStyle = '#8ea0bd'; x.textAlign = 'center'; x.fillText(labels[i], i * bw + bw / 2, h - 3); });
    x.fillStyle = 'rgba(255,255,255,.1)'; x.fillRect(0, z, w, 1);
  }
  function openJr(sel) {
    const L = filtered(), s = stats(L), syms = [...new Set(JR.map(x => x.sym))];
    const opt = (v, cur, t) => `<option value="${esc(v)}"${v === cur ? ' selected' : ''}>${esc(t || v)}</option>`;
    mod.innerHTML = `<div><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><b style="font:600 18px var(--sans)">Diario de trading</b><div style="flex:1"></div>
      <select id="jfM">${opt('todas', jf.mode, 'Todas las cuentas')}${opt('sim', jf.mode, 'Simulado')}${opt('real', jf.mode, 'Real')}${opt('prueba', jf.mode, 'Binance prueba')}${opt('replay', jf.mode, 'Replay')}${opt('reto', jf.mode, 'Reto')}</select>
      <select id="jfS">${opt('todos', jf.sym, 'Todos los mercados')}${syms.map(x => opt(x, jf.sym)).join('')}</select>
      <select id="jfP">${opt('1', jf.per, 'Hoy')}${opt('7', jf.per, '7 días')}${opt('30', jf.per, '30 días')}${opt('90', jf.per, '90 días')}${opt('todo', jf.per, 'Todo')}</select>
      <button id="jfCsv">Exportar CSV</button><button id="jfX">Cerrar</button></div>
      <div class="kpis"><div><small>P/L NETO</small><b class="${s.net >= 0 ? 'u' : 'd'}">${money(s.net)}</b></div><div><small>OPERACIONES · ACIERTOS</small><b>${s.n} · ${Math.round(s.win * 100)}%</b></div><div><small>FACTOR DE BENEFICIO</small><b>${s.pf === Infinity ? '∞' : s.pf.toFixed(2)}</b></div><div><small>EXPECTATIVA POR OPERACIÓN</small><b class="${s.exp >= 0 ? 'u' : 'd'}">${money(s.exp)}</b></div>
        <div><small>GANANCIA PROMEDIO</small><b class="u">$${s.aw.toFixed(2)}</b></div><div><small>PÉRDIDA PROMEDIO</small><b class="d">$${s.al.toFixed(2)}</b></div><div><small>MÁXIMA CAÍDA</small><b class="d">$${s.dd.toFixed(2)}</b></div><div><small>MEJOR · PEOR</small><b>${money(s.best)} · ${money(s.worst)}</b></div></div>
      <canvas id="jfEq" style="width:100%;height:170px;display:block"></canvas>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin:16px 0"><canvas id="jfH" style="width:100%;height:130px"></canvas><canvas id="jfD" style="width:100%;height:130px"></canvas><canvas id="jfSt" style="width:100%;height:130px"></canvas></div>
      <div id="jfDet"></div>
      <table class="jt"><tr><th>Captura</th><th>Fecha</th><th>Mercado</th><th>Lado</th><th>Cant.</th><th>Entrada</th><th>Salida</th><th>Setup</th><th>Cuenta</th><th>P/L</th></tr>` +
      L.slice(0, 300).map(x => `<tr data-id="${x.id}"><td>${x.img ? `<img src="${x.img}" alt="">` : '<span style="color:var(--mut)">—</span>'}</td><td>${N.fd(x.t)}</td><td>${esc(x.sym)}</td><td class="${x.side > 0 ? 'u' : 'd'}">${x.side > 0 ? 'Largo' : 'Corto'}${x.why ? ' · ' + esc(x.why) : ''}</td><td>${+(+x.q).toFixed(4)}</td><td>${+(+x.a).toFixed(6)}</td><td>${+(+x.b).toFixed(6)}</td><td>${esc(x.setup) || '—'}</td><td>${esc(x.mode)}</td><td class="${x.pnl >= 0 ? 'u' : 'd'}">${money(x.pnl)}</td></tr>`).join('') +
      `</table>${L.length ? '' : '<p style="color:var(--mut)">No hay operaciones con estos filtros.</p>'}</div>`;
    mod.style.display = 'block';
    // curva de capital
    { const c = $('jfEq'), d = devicePixelRatio || 1, w = c.clientWidth, h = c.clientHeight; c.width = w * d; c.height = h * d; const x = c.getContext('2d'); x.setTransform(d, 0, 0, d, 0, 0);
      const pts = []; let e = 0; for (const t of L.slice().reverse()) { e += t.pnl; pts.push(e); }
      x.font = '10px ' + MONO; x.fillStyle = '#8ea0bd'; x.fillText('CURVA DE CAPITAL', 0, 10);
      if (pts.length > 1) { const lo = Math.min(0, ...pts), hi = Math.max(0, ...pts), Y = v => 18 + (hi - v) / ((hi - lo) || 1) * (h - 26);
        x.fillStyle = 'rgba(255,255,255,.1)'; x.fillRect(0, Y(0), w, 1); x.strokeStyle = N.C.ac; x.lineWidth = 2; x.beginPath(); pts.forEach((v, i) => { const px = i / (pts.length - 1) * w; i ? x.lineTo(px, Y(v)) : x.moveTo(px, Y(v)); }); x.stroke(); } }
    const byH = new Array(24).fill(0), byD = new Array(7).fill(0), st = {};
    for (const t of L) { const d = new Date(t.t0 || t.t); byH[d.getHours()] += t.pnl; byD[d.getDay()] += t.pnl; st[t.setup || 'Sin setup'] = (st[t.setup || 'Sin setup'] || 0) + t.pnl; }
    bars($('jfH'), byH.map((_, i) => i % 3 ? '' : i + 'h'), byH, 'P/L POR HORA DE ENTRADA');
    bars($('jfD'), ['D', 'L', 'M', 'M', 'J', 'V', 'S'], byD, 'P/L POR DÍA');
    const sk = Object.keys(st); bars($('jfSt'), sk.map(k => k.slice(0, 8)), sk.map(k => st[k]), 'P/L POR SETUP');
    if (sel) showDet(sel);
  }
  function showDet(id) {
    const x = JR.find(r => r.id === id); if (!x) return;
    $('jfDet').innerHTML = `<div style="display:grid;grid-template-columns:2fr 1fr;gap:16px;border:1px solid var(--line);border-radius:12px;padding:14px;margin-bottom:14px">
      <div>${x.img ? `<img src="${x.img}" style="width:100%;border-radius:8px" alt="Gráfico al entrar">` : '<p style="color:var(--mut)">Esta operación no tiene captura.</p>'}</div>
      <div style="font:12px var(--sans)"><b style="font-size:15px">${esc(x.sym)} · ${x.side > 0 ? 'Largo' : 'Corto'}</b><p style="color:var(--mut)">${N.fd(x.t0 || x.t)} → ${N.fd(x.t)}<br>Entrada ${+(+x.a).toFixed(6)} · Salida ${+(+x.b).toFixed(6)} · <span class="${x.pnl >= 0 ? 'u' : 'd'}">${money(x.pnl)}</span></p>
        <div class="fld"><span>Setup</span><select id="jdS"><option value="">Sin setup</option>${SETUPS().map(s => `<option${s === x.setup ? ' selected' : ''}>${esc(s)}</option>`).join('')}</select></div>
        <div class="fld"><span>Calificación</span><select id="jdR">${[0, 1, 2, 3, 4, 5].map(n => `<option value="${n}"${n === (x.stars || 0) ? ' selected' : ''}>${n ? n + ' de 5' : '—'}</option>`).join('')}</select></div>
        <textarea id="jdN" placeholder="Qué viste, por qué entraste, qué aprendiste" style="width:100%;height:110px;margin-top:6px;font:12px var(--sans);color:var(--tx);background:var(--card);border:1px solid var(--line);border-radius:9px;padding:8px">${esc(x.note)}</textarea>
        <div style="display:flex;gap:8px;margin-top:8px"><button id="jdSave" data-id="${x.id}" style="background:var(--ac);color:#03060c;border-color:var(--ac)">Guardar</button><button id="jdDel" data-id="${x.id}">Borrar operación</button></div></div></div>`;
    $('jfDet').scrollIntoView({ block: 'nearest' });
  }
  mod.addEventListener('click', e => {
    const t = e.target, row = t.closest('tr[data-id]');
    if (t.id === 'jfX' || t === mod) { mod.style.display = 'none'; return; }
    if (t.id === 'jfCsv') {
      const rows = [['fecha_entrada', 'fecha_salida', 'mercado', 'lado', 'cantidad', 'entrada', 'salida', 'pl', 'cuenta', 'setup', 'calificacion', 'nota']].concat(filtered().map(x => [new Date(x.t0 || x.t).toISOString(), new Date(x.t).toISOString(), x.sym, x.side > 0 ? 'largo' : 'corto', x.q, x.a, x.b, (+x.pnl).toFixed(4), x.mode, x.setup, x.stars || 0, x.note]));
      const csv = rows.map(r => r.map(v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"').join(',')).join('\n'), a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv' })); a.download = 'diario-northpoint-depth.csv'; a.click(); return;
    }
    if (t.id === 'jdSave') { const x = JR.find(r => r.id === t.dataset.id); if (x) { x.setup = $('jdS').value; x.stars = +$('jdR').value; x.note = $('jdN').value.slice(0, 4000); jrPut(x); openJr(x.id); } return; }
    if (t.id === 'jdDel') { jrDel(t.dataset.id); openJr(); return; }
    if (row) showDet(row.dataset.id);
  });
  mod.addEventListener('change', e => { if (e.target.id === 'jfM') jf.mode = e.target.value; else if (e.target.id === 'jfS') jf.sym = e.target.value; else if (e.target.id === 'jfP') jf.per = e.target.value; else return; openJr(); });

  /* =================== REGLAS DE LA CUENTA (fondeo) =================== */
  let R = get('rules', { on: 1, maxLoss: 500, target: 0, maxDD: 0, maxQty: 0, maxTrades: 0 });
  const curMode = () => (B.mode === 'sim' ? (N.rep ? (H.reto ? 'reto' : 'replay') : 'sim') : B.mode);
  function todayOf(mode) { const L = JR.filter(x => x.mode === mode && dayKey(x.t) === dayKey(Date.now())); return { pnl: L.reduce((a, x) => a + x.pnl, 0), n: L.length }; }
  function ddOf(mode) { let pk = 0, e = 0; for (const x of JR.filter(r => r.mode === mode).slice().reverse()) { e += x.pnl; pk = Math.max(pk, e); } return pk - e; }
  function rulesState() {
    const m = curMode(); if (m === 'replay' || m === 'reto') return { m, ok: true };
    const d = todayOf(m), open = B.mode === 'sim' ? (N.sim.pos ? (N.eng.last - N.sim.avg) * N.sym.tick * N.sim.pos : 0) : (B.pos ? B.pos.upl : 0), net = d.pnl + open;
    let why = '';
    if (R.maxLoss > 0 && net <= -R.maxLoss) why = 'Tocaste tu pérdida máxima diaria de $' + R.maxLoss + '.';
    else if (R.target > 0 && d.pnl >= R.target) why = 'Cumpliste tu meta diaria de $' + R.target + '.';
    else if (R.maxDD > 0 && ddOf(m) >= R.maxDD) why = 'Tocaste tu caída máxima total de $' + R.maxDD + '.';
    else if (R.maxTrades > 0 && d.n >= R.maxTrades) why = 'Llegaste a tus ' + R.maxTrades + ' operaciones del día.';
    return { m, d, net, ok: !why, why };
  }
  H.can.push((side, q, why) => {
    if (!R.on) return true;
    const pos = B.mode === 'sim' ? N.sim.pos : (B.pos ? B.pos.amt : 0), reduces = pos && Math.sign(pos) !== side && q <= Math.abs(pos) + 1e-12;
    if (reduces || why === 'stop' || why === 'objetivo') return true;          // cerrar siempre se permite
    if (R.maxQty > 0 && Math.abs(pos) + q > R.maxQty + 1e-12) { N.ping('Regla de la cuenta', 'El tamaño pasa tu máximo de ' + R.maxQty + '.'); return false; }
    const s = rulesState(); if (!s.ok) { N.ping('Entrada bloqueada', s.why); return false; }
    return true;
  });
  let warnedDay = '';
  function rulesCheckAfter() { const s = rulesState(); if (R.on && !s.ok && warnedDay !== dayKey(Date.now()) + s.why) { warnedDay = dayKey(Date.now()) + s.why; N.ping('Límite alcanzado', s.why + ' Las nuevas entradas quedan bloqueadas por hoy.'); } }
  const chip = document.createElement('div'); chip.className = 'chip'; chip.style.cursor = 'pointer'; chip.title = 'Reglas de la cuenta'; $('aud').after(chip);
  chip.onclick = () => $('rtabs').querySelector('[data-p="pAc"]').click();
  function paintChip() {
    const s = rulesState(), lbl = { sim: 'Simulado', real: 'REAL', prueba: 'Prueba', replay: 'Replay', reto: 'Reto' }[s.m] || s.m;
    if (s.m === 'replay') { chip.innerHTML = '<i></i>Replay'; chip.className = 'chip'; return; }
    if (s.m === 'reto') { chip.innerHTML = '<i></i>Reto ' + (H.reto ? money(retoPnl()) : ''); chip.className = 'chip ok'; return; }
    chip.className = 'chip ' + (!R.on ? '' : s.ok ? 'ok' : 'bad');
    chip.innerHTML = `<i></i>${lbl} · hoy ${money(s.net)}${R.on && R.maxLoss ? ' / límite -$' + R.maxLoss : ''}`;
  }

  /* =================== BRÓKER: Binance Futures (USDⓈ-M) =================== */
  const BASE = { real: 'https://fapi.binance.com', prueba: 'https://testnet.binancefuture.com' };
  const B = { mode: get('bmode', 'sim'), keys: get('bkeys', { k: '', s: '' }), copies: get('bcopies', []), copyOn: get('bcopyOn', 0), save: get('bsave', 1), pos: null, bal: null, err: '', skew: 0, lastId: get('blast', {}), placed: { sl: null, tp: null } };
  if (B.mode !== 'sim' && !B.keys.k) B.mode = 'sim';
  async function hmac(secret, msg) {
    const k = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    return Array.from(new Uint8Array(await crypto.subtle.sign('HMAC', k, new TextEncoder().encode(msg)))).map(x => x.toString(16).padStart(2, '0')).join('');
  }
  window.NPX.hmac = hmac; // para la prueba de firma
  async function api(acct, method, path, params) {
    const base = BASE[B.mode]; if (!base) throw new Error('Sin cuenta conectada');
    const q = new URLSearchParams(Object.assign({}, params, { recvWindow: 5000, timestamp: Date.now() - B.skew })).toString();
    const sig = await hmac(acct.s, q), r = await fetch(`${base}${path}?${q}&signature=${sig}`, { method, headers: { 'X-MBX-APIKEY': acct.k } });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || (j && j.code && j.code < 0)) throw new Error((j && j.msg) || 'HTTP ' + r.status);
    return j;
  }
  async function syncTime() { try { const a = Date.now(), j = await (await fetch(BASE[B.mode] + '/fapi/v1/time')).json(), b = Date.now(); B.skew = (a + b) / 2 - j.serverTime; } catch (e) {} }
  const accts = () => [Object.assign({ name: 'Principal', mult: 1 }, B.keys)].concat(B.copyOn ? B.copies.filter(c => c.k && c.s) : []);
  const stepRound = (q, mult) => { const st = N.sym.step || Math.pow(10, -N.sym.qd), v = Math.floor(q * (mult || 1) / st + 1e-9) * st; return +v.toFixed(8); };
  const pxStr = k => (k * N.sym.tick).toFixed(N.sym.dec);
  H.mode = (side, q, why) => {
    if (B.mode === 'sim') return false;
    sendMarket(side, q, why); return true;
  };
  async function sendMarket(side, q, why) {
    const sym = N.sym.id, res = [];
    for (const a of accts()) {
      const qty = stepRound(q, a.mult); if (!(qty > 0)) { res.push(a.name + ': cantidad muy chica'); continue; }
      try { await api(a, 'POST', '/fapi/v1/order', { symbol: sym, side: side > 0 ? 'BUY' : 'SELL', type: 'MARKET', quantity: qty, newOrderRespType: 'RESULT' }); res.push(a.name + ': ' + (side > 0 ? 'compra' : 'venta') + ' ' + qty); }
      catch (e) { res.push(a.name + ': ' + e.message); B.err = e.message; }
    }
    N.ping((B.mode === 'real' ? 'Orden REAL' : 'Orden de prueba') + ' · ' + sym, res.join(' · '));
    setTimeout(sync, 600);
  }
  /* stop y objetivo como órdenes condicionales (Binance las movió a /fapi/v1/algoOrder) */
  async function placeBrackets() {
    const p = B.pos, sim = N.sim; if (!p || !p.amt) return;
    const want = { sl: sim.sl, tp: sim.tp }; if (want.sl === B.placed.sl && want.tp === B.placed.tp) return;
    const sym = N.sym.id, close = p.amt > 0 ? 'SELL' : 'BUY';
    for (const a of accts()) {
      try { await api(a, 'DELETE', '/fapi/v1/algoOpenOrders', { symbol: sym }); } catch (e) {}
      for (const [k, type] of [['sl', 'STOP_MARKET'], ['tp', 'TAKE_PROFIT_MARKET']]) {
        if (want[k] == null) continue;
        try { await api(a, 'POST', '/fapi/v1/algoOrder', { algoType: 'CONDITIONAL', symbol: sym, side: close, type, triggerPrice: pxStr(want[k]), closePosition: 'true', workingType: 'CONTRACT_PRICE' }); }
        catch (e) { B.err = (k === 'sl' ? 'Stop: ' : 'Objetivo: ') + e.message; N.ping('No se pudo colocar ' + (k === 'sl' ? 'el stop' : 'el objetivo'), a.name + ': ' + e.message); }
      }
    }
    B.placed = want;
  }
  let syncing = false, bTimer = null;
  async function sync() {
    if (B.mode === 'sim' || syncing || !B.keys.k) return; syncing = true;
    const sym = N.sym.id, a = accts()[0];
    try {
      const [pr, bal] = await Promise.all([api(a, 'GET', '/fapi/v3/positionRisk', { symbol: sym }), api(a, 'GET', '/fapi/v3/balance', {})]);
      const p = (pr || []).find(x => x.symbol === sym) || {}, amt = +p.positionAmt || 0, usdt = (bal || []).find(x => x.asset === 'USDT') || {};
      const before = B.pos ? B.pos.amt : 0;
      B.pos = { amt, entry: +p.entryPrice || 0, upl: +p.unRealizedProfit || 0, liq: +p.liquidationPrice || 0 };
      B.bal = { total: +usdt.balance || 0, avail: +usdt.availableBalance || 0 }; B.err = '';
      // la posición real manda sobre la terminal
      const sim = N.sim, tk = N.sym.tick;
      sim.pos = amt; sim.avg = amt ? B.pos.entry / tk : 0; sim.real = 0;
      if (amt && (!before || Math.sign(before) !== Math.sign(amt))) { const d = N.eng.o.group * 8 * Math.sign(amt); sim.sl = Math.round(sim.avg) - d; sim.tp = Math.round(sim.avg) + 2 * d; B.placed = { sl: null, tp: null }; pendImg[sym] = { img: N.capture(900), t0: Date.now(), setup: tag }; }
      if (!amt) { sim.sl = sim.tp = null; B.placed = { sl: null, tp: null }; }
      if (amt) placeBrackets();
      await fills(a, sym);
      N.dirty();
    } catch (e) { B.err = e.message; }
    syncing = false; paintAc();
  }
  /* cierres reales al diario: cada trade con realizedPnl distinto de cero cierra posición */
  async function fills(a, sym) {
    const from = B.lastId[B.mode + sym];
    const tr = await api(a, 'GET', '/fapi/v1/userTrades', from ? { symbol: sym, fromId: from + 1, limit: 100 } : { symbol: sym, limit: 1 });
    if (!from) { if (tr.length) { B.lastId[B.mode + sym] = tr[tr.length - 1].id; put('blast', B.lastId); } return; }
    for (const t of tr) {
      B.lastId[B.mode + sym] = t.id;
      const rp = +t.realizedPnl; if (!rp) continue;
      const side = t.side === 'SELL' ? 1 : -1, q = +t.qty, exit = +t.price, entry = exit - rp / (q * side);
      record({ t: t.time, sym, side, q, a: entry, b: exit, pnl: rp - (+t.commission || 0), mode: B.mode, why: '' });
    }
    put('blast', B.lastId);
  }
  function startBroker() { clearInterval(bTimer); B.placed = { sl: null, tp: null }; H.real = B.mode !== 'sim'; if (B.mode === 'sim') { paintAc(); return; } syncTime().then(sync); bTimer = setInterval(sync, 2500); }
  // al soltar el stop u objetivo en el gráfico, se re-colocan
  window.addEventListener('mouseup', () => { if (B.mode !== 'sim' && B.pos && B.pos.amt) setTimeout(placeBrackets, 400); });

  /* ---- Exness y Tradeify: igual que NORTHPOINT, se inicia sesión en su propia ventana (solo app de escritorio) ---- */
  const DESK = location.hostname === '127.0.0.1';
  const XC = { exness: { n: 'Exness', on: get('cx.exness', 0), accts: [], err: '', ct: 0 }, tradeify: { n: 'Tradeify', on: get('cx.tradeify', 0), accts: [], err: '' } };
  async function brk(k, ruta) { const r = await fetch('/brk/' + k + ruta, { cache: 'no-store' }); const t = await r.text(); let j; try { j = JSON.parse(t); } catch (e) { throw new Error('respuesta inválida'); } if (j && j.e) throw new Error(j.e); return j; }
  async function readExness() {
    const C = XC.exness, all = await brk('exness', '/v4/trading-provider/api/v2/accounts');
    const arch = a => a.is_archived || a.is_hidden || a.archived_at || a.archived || /archiv/i.test(a.status || '');
    C.accts = (all || []).filter(a => a.platform === 'mt5' && !arch(a)).map(a => ({ id: a.account_number, name: a.name || a.account_type, real: !!a.is_real, type: a.account_type, cur: a.currency || 'USD', bal: +a.balance || 0, eq: +a.equity || 0, flt: +a.floating || 0 }));
    if (Date.now() - C.ct < 30000) return; C.ct = Date.now();
    const seen = new Set(get('exSeen', []));                  // los cierres entran solos al diario, una vez
    for (const a of C.accts) {
      const j = await brk('exness', `/v4/orders-history/orders/${a.id}?accountNumber=${a.id}&limit=50&offset=0&sort=close_time_desc&closed=1&platform=mt5`);
      for (const o of (j.orders || []).slice().reverse()) {
        if (!o.close_time) continue; const key = a.id + ':' + o.deal_id; if (seen.has(key)) continue; seen.add(key);
        record({ t: +o.close_time, t0: +o.open_time || +o.close_time, sym: o.symbol, side: o.action === 'buy' ? 1 : -1, q: +o.volume_position || 0, a: +o.open_price, b: +o.close_price, pnl: (+o.profit || 0) + (+o.commission || 0) + (+o.swap || 0), mode: 'exness', why: a.real ? 'real' : 'demo' });
      }
    }
    put('exSeen', [...seen].slice(-6000));
  }
  async function readTradeify() {
    const j = await brk('tradeify', '/api/dashboard/account-overview'), n = v => v == null || v === '' || isNaN(+v) ? null : +v;
    XC.tradeify.accts = ((j && j.data && j.data.data) || []).map(x => { const bal = n(x.account_balance), ini = n(x.initial_balance), floor = n(x.max_trailing_drawdown);
      return { id: x.id, name: x.account_type || 'Cuenta', status: x.funded_status || x.account_status || '', blown: /blown|fail|breach/i.test(x.account_status || ''), bal, ini, pnl: n(x.net_pnl) ?? (bal != null && ini != null ? bal - ini : null), cushion: bal != null && floor != null ? bal - floor : null, goal: n(x.profit_target), dll: n(x.daily_loss_limit), payout: x.available_for_payout }; });
  }
  async function readConn() {
    if (!DESK) return;
    for (const k of ['exness', 'tradeify']) { const C = XC[k]; if (!C.on) continue;
      try { await (k === 'exness' ? readExness() : readTradeify()); C.err = ''; } catch (e) { C.err = e.message; } }
    paintAc();
  }
  setInterval(readConn, 15000); setTimeout(readConn, 2500);

  /* ---- panel Cuenta ---- */
  const connCard = (lg, bg, name, sub, right) => `<div class="conn"><div class="lg" style="background:${bg}">${lg}</div><div class="tx"><b>${name}</b><small>${sub}</small></div>${right}</div>`;
  function xcBlock(k) {
    const C = XC[k], logo = k === 'exness' ? ['Ex', 'linear-gradient(135deg,#ffcf24,#f5a300)'] : ['Tf', 'linear-gradient(135deg,#7c5cff,#3d5afe)'];
    if (!DESK) return connCard(logo[0], logo[1], C.n, 'Disponible en la app de escritorio', '<span class="badge">Escritorio</span>');
    if (!C.on) return connCard(logo[0], logo[1], C.n, k === 'exness' ? 'Tus cuentas MT5: saldo, flotante y cierres al diario' : 'Tus cuentas de fondeo: colchón, meta y límite diario', `<button data-cx-on="${k}" class="pri">Conectar</button>`);
    const st = C.err === 'login' ? '<span class="badge live"><i></i>Inicia sesión</span>' : C.err === 'cargando' || (!C.accts.length && !C.err) ? '<span class="badge"><i></i>Conectando</span>' : C.err ? '<span class="badge live"><i></i>Error</span>' : '<span class="badge ok"><i></i>Conectado</span>';
    let h = connCard(logo[0], logo[1], C.n, C.accts.length ? C.accts.length + (C.accts.length === 1 ? ' cuenta' : ' cuentas') : C.err === 'login' ? 'Inicia sesión en la ventana de ' + C.n : C.err && C.err !== 'cargando' ? esc(C.err) : 'Leyendo tus cuentas…', st);
    if (k === 'exness') h += C.accts.map(a => `<div class="acct"><div class="nm"><b>${esc(a.name)}</b><span class="badge${a.real ? ' live' : ''}">${a.real ? 'Real' : 'Demo'} · #${a.id}</span></div><div class="row"><span>Balance</span><span>${a.bal.toFixed(2)} ${esc(a.cur)}</span></div><div class="row"><span>Equidad</span><span>${a.eq.toFixed(2)}</span></div><div class="row"><span>Flotante</span><span class="${a.flt >= 0 ? 'u' : 'd'}">${money(a.flt)}</span></div></div>`).join('');
    else h += C.accts.map(a => { const pg = a.goal && a.pnl != null ? Math.max(0, Math.min(100, a.pnl / a.goal * 100)) : 0;
      return `<div class="acct"><div class="nm"><b>${esc(a.name)}</b><span class="badge${a.blown ? ' live' : ' ok'}">${a.blown ? 'Perdida' : esc(a.status || 'Activa')}</span></div><div class="row"><span>Balance</span><span>${a.bal != null ? '$' + a.bal.toFixed(2) : '—'}</span></div><div class="row"><span>Resultado</span><span class="${(a.pnl || 0) >= 0 ? 'u' : 'd'}">${a.pnl != null ? money(a.pnl) : '—'}</span></div><div class="row"><span>Colchón al límite</span><span>${a.cushion != null ? '$' + a.cushion.toFixed(2) : '—'}</span></div>${a.dll != null ? `<div class="row"><span>Pérdida diaria máx.</span><span>$${a.dll.toFixed(0)}</span></div>` : ''}${a.goal ? `<div class="bar"><i style="width:${pg}%"></i></div><div class="row"><span>Hacia la meta de $${a.goal.toFixed(0)}</span><span>${Math.round(pg)}%</span></div>` : ''}${a.dll != null ? `<button class="wide" data-tf-rule="${esc(String(a.id))}">Usar su límite diario en mis reglas</button>` : ''}</div>`; }).join('');
    h += `<div class="btn-row"><button data-cx-win="${k}">Abrir ventana de ${C.n}</button><button data-cx-off="${k}">Desconectar</button></div>`;
    return h;
  }
  function paintAc() {
    if (!vis('pAc')) { paintChip(); return; }
    if (document.activeElement && $('acBox').contains(document.activeElement) && /INPUT|SELECT/.test(document.activeElement.tagName)) { paintChip(); return; }
    const s = rulesState(), real = B.mode === 'real', badge = B.mode === 'sim' ? '<span class="badge">Simulado</span>' : real ? '<span class="badge live"><i></i>En real</span>' : '<span class="badge ok"><i></i>Prueba</span>';
    const sc = B.scroll = $('acBox').parentNode.scrollTop;
    $('acBox').innerHTML = `<h6>Conexiones</h6>
      ${connCard('B', 'linear-gradient(135deg,#f3ba2f,#e0a100)', 'Binance Futures', 'Opera desde el gráfico: órdenes, stop y objetivo', badge)}
      <div class="card"><div class="fld"><span>Modo</span><select id="bMode"><option value="sim"${B.mode === 'sim' ? ' selected' : ''}>Simulado</option><option value="prueba"${B.mode === 'prueba' ? ' selected' : ''}>Cuenta de prueba</option><option value="real"${real ? ' selected' : ''}>Cuenta real</option></select></div>
        ${real ? '<div class="warn">Estás en tu cuenta real. Cada orden se ejecuta en el mercado con tu dinero.</div>' : ''}
        <div class="fld"><span>API key</span><input id="bK" type="password" autocomplete="off" value="${esc(B.keys.k)}" placeholder="Pega tu llave"></div>
        <div class="fld"><span>Secret key</span><input id="bS" type="password" autocomplete="off" value="${esc(B.keys.s)}" placeholder="Pega tu clave"></div>
        ${sw('id="bSave"', 'Recordar en este equipo', 'Las llaves nunca salen de tu computadora.', B.save)}
        <p>Crea la llave en Binance con permiso de <b>Futuros</b> y sin permiso de retiro. Para practicar, usa una llave de <b>testnet.binancefuture.com</b>.</p>
        ${B.mode !== 'sim' ? `<div class="stat"><div><small>Saldo USDT</small><b>${B.bal ? B.bal.total.toFixed(2) : '…'}</b></div><div><small>Disponible</small><b>${B.bal ? B.bal.avail.toFixed(2) : '…'}</b></div><div><small>Posición</small><b>${B.pos ? (B.pos.amt || 0) : '…'}</b></div><div><small>Flotante</small><b class="${B.pos && B.pos.upl >= 0 ? 'u' : 'd'}">${B.pos ? money(B.pos.upl) : '…'}</b></div></div>${B.err ? `<div class="warn">${esc(B.err)}</div>` : ''}` : ''}</div>
      ${xcBlock('exness')}${xcBlock('tradeify')}
      <h6>Copiar operaciones</h6><div class="card">${sw('id="bCopy"', 'Replicar en otras cuentas', 'Cada orden de Binance se copia con su multiplicador.', B.copyOn)}
        ${B.copies.map((c, i) => `<div class="it"><span>${esc(c.name)} · ×${c.mult}</span><button data-cx="${i}">Quitar</button></div>`).join('') || '<p>Aún no agregas cuentas.</p>'}<button id="bAddC" class="wide">Agregar cuenta</button></div>
      <h6>Reglas de riesgo</h6><div class="card">${sw('id="rOn"', 'Proteger la cuenta', 'Al tocar un límite se bloquean nuevas entradas. Cerrar siempre se permite.', R.on)}
        <div class="fld"><span>Pérdida máxima diaria</span><input id="rL" type="number" min="0" value="${R.maxLoss}"></div>
        <div class="fld"><span>Meta diaria</span><input id="rT" type="number" min="0" value="${R.target}" placeholder="Sin tope"></div>
        <div class="fld"><span>Caída máxima total</span><input id="rD" type="number" min="0" value="${R.maxDD}"></div>
        <div class="fld"><span>Tamaño máximo</span><input id="rQ" type="number" min="0" step="any" value="${R.maxQty}"></div>
        <div class="fld"><span>Operaciones por día</span><input id="rN" type="number" min="0" value="${R.maxTrades}"></div>
        <div class="${s.ok ? 'info2' : 'warn'}">${s.ok ? 'Hoy (' + esc({ sim: 'simulado', real: 'real', prueba: 'prueba', replay: 'replay', reto: 'reto' }[s.m] || s.m) + '): ' + money(s.net || 0) + (R.maxLoss ? ' · te quedan $' + Math.max(0, R.maxLoss + (s.net || 0)).toFixed(2) + ' antes del límite' : '') : esc(s.why)}</div></div>`;
    $('acBox').parentNode.scrollTop = sc;
    paintChip();
  }
  $('acBox').addEventListener('change', e => {
    const t = e.target, id = t.id;
    if (id === 'bMode') {
      const m = t.value;
      if (m !== 'sim' && (!B.keys.k || !B.keys.s)) { N.ping('Falta tu llave de API', 'Pégala arriba y vuelve a elegir el modo.'); t.value = B.mode; return; }
      if (m === 'real' && !confirm('Vas a conectar tu cuenta REAL de Binance Futures. Cada orden de la terminal se enviará al mercado con dinero real. ¿Continuar?')) { t.value = B.mode; return; }
      B.mode = m; put('bmode', m); startBroker(); paintAc(); return;
    }
    if (id === 'bK' || id === 'bS' || id === 'bSave') { B.keys = { k: $('bK').value.trim(), s: $('bS').value.trim() }; B.save = $('bSave').checked ? 1 : 0; put('bsave', B.save); put('bkeys', B.save ? B.keys : { k: '', s: '' }); return; }
    if (id === 'bCopy') { B.copyOn = t.checked ? 1 : 0; put('bcopyOn', B.copyOn); return; }
    if (/^r[OLTDQN]$/.test(id)) { R = { on: $('rOn').checked ? 1 : 0, maxLoss: +$('rL').value || 0, target: +$('rT').value || 0, maxDD: +$('rD').value || 0, maxQty: +$('rQ').value || 0, maxTrades: +$('rN').value || 0 }; put('rules', R); paintChip(); }
  });
  $('acBox').addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.cx != null) { B.copies.splice(+t.dataset.cx, 1); put('bcopies', B.copies); paintAc(); return; }
    if (t.id === 'bAddC') { N.ask('Nombre de la cuenta', name => N.ask('API key de ' + name, k => N.ask('Secret key de ' + name, s => N.ask('Multiplicador de tamaño (1 = igual)', m => { B.copies.push({ name, k, s, mult: Math.max(0.01, +m || 1) }); put('bcopies', B.copies); paintAc(); })))); return; }
    const k = t.dataset.cxOn || t.dataset.cxWin || t.dataset.cxOff;
    if (t.dataset.cxOn) { XC[k].on = 1; put('cx.' + k, 1); XC[k].err = 'cargando'; fetch('/brk/' + k + '/login'); paintAc(); setTimeout(readConn, 4000); return; }
    if (t.dataset.cxWin) { fetch('/brk/' + k + '/login'); return; }
    if (t.dataset.cxOff) { XC[k].on = 0; XC[k].accts = []; put('cx.' + k, 0); paintAc(); return; }
    if (t.dataset.tfRule) { const a = XC.tradeify.accts.find(x => String(x.id) === t.dataset.tfRule); if (a && a.dll != null) { R.maxLoss = Math.round(a.dll); R.on = 1; put('rules', R); N.ping('Reglas actualizadas', 'Tu pérdida máxima diaria ahora es $' + R.maxLoss + ', igual que tu cuenta de Tradeify.'); paintAc(); } }
  });

  /* =================== MODO RETO y REPLAY POR FECHA =================== */
  let reto = null;
  const retoPnl = () => JR.filter(x => x.mode === 'reto' && reto && x.t >= reto.t).reduce((a, x) => a + x.pnl, 0) + (N.sim.pos ? (N.eng.last - N.sim.avg) * N.sym.tick * N.sim.pos : 0);
  function retoCheck(end) {
    if (!reto || !N.rep) return;
    const p = retoPnl(); let res = '';
    if (p <= -reto.loss) res = 'No pasaste: tocaste la pérdida máxima.'; else if (p >= reto.goal) res = '¡Pasaste el reto! Llegaste a la meta.'; else if (end) res = 'Se acabó la sesión sin llegar a la meta.';
    if (!res) return;
    const L = JR.filter(x => x.mode === 'reto' && x.t >= reto.t), s = stats(L);
    N.$('rpP').textContent === 'Pausa' && N.$('rpP').click();
    mod.innerHTML = `<div style="max-width:520px"><b style="font:600 20px var(--sans)">${res}</b><div class="kpis" style="grid-template-columns:1fr 1fr"><div><small>RESULTADO</small><b class="${p >= 0 ? 'u' : 'd'}">${money(p)}</b></div><div><small>META · PÉRDIDA MÁX.</small><b>$${reto.goal} · $${reto.loss}</b></div><div><small>OPERACIONES · ACIERTOS</small><b>${s.n} · ${Math.round(s.win * 100)}%</b></div><div><small>FACTOR · CAÍDA MÁX.</small><b>${s.pf === Infinity ? '∞' : s.pf.toFixed(2)} · $${s.dd.toFixed(0)}</b></div></div><button id="jfX">Cerrar</button></div>`;
    mod.style.display = 'block'; reto = null; H.reto = null;
  }
  setInterval(() => { if (reto && N.rep) { retoCheck(N.rep.i >= N.rep.n); paintChip(); } if (reto && !N.rep) { reto = null; H.reto = null; } }, 1000);
  const rpPop = document.createElement('div'); rpPop.className = 'pop'; rpPop.style.width = '360px'; rpPop.style.font = '12px var(--sans)'; document.body.appendChild(rpPop);
  $('rpB').onclick = () => {
    const d = new Date(Date.now() - 864e5), iso = d.toISOString().slice(0, 10), lv = N.live;
    rpPop.innerHTML = `<h4>Replay</h4><button id="rpNow" style="width:100%">Lo cargado (${lv && lv.firstT ? Math.round((lv.lastT - lv.firstT) / 60000) : 0} min)</button>
      <h5 style="margin:14px 0 6px;font:600 10px var(--sans);letter-spacing:.14em;color:var(--mut)">UN DÍA PASADO</h5>
      <div class="fld"><span>Fecha</span><input id="rpD" type="date" value="${iso}" max="${new Date().toISOString().slice(0, 10)}"></div>
      <div class="fld"><span>Hora de inicio (tu hora)</span><input id="rpH" type="time" value="08:30"></div>
      <div class="fld"><span>Duración</span><select id="rpL"><option value="15">15 min</option><option value="30" selected>30 min</option><option value="60">1 hora</option></select></div>
      <button id="rpGo" style="width:100%">Cargar y reproducir</button><p id="rpMsg" style="color:var(--mut);margin-top:8px">Se descarga trade por trade desde Binance; en mercados muy activos tarda unos minutos.</p>
      <h5 style="margin:14px 0 6px;font:600 10px var(--sans);letter-spacing:.14em;color:var(--mut)">MODO RETO</h5>
      <label><input type="checkbox" id="rpR">Operar el replay como examen de fondeo</label>
      <div class="fld"><span>Meta ($)</span><input id="rpG" type="number" value="300"></div><div class="fld"><span>Pérdida máxima ($)</span><input id="rpX" type="number" value="200"></div>`;
    for (const p of ['audP', 'trkP', 'indP', 'helpP']) $(p).style.display = 'none';
    rpPop.style.display = rpPop.style.display === 'block' ? 'none' : 'block';
  };
  function armReto() { if ($('rpR') && $('rpR').checked) { reto = { t: Date.now(), goal: Math.max(1, +$('rpG').value || 300), loss: Math.max(1, +$('rpX').value || 200) }; H.reto = reto; } }
  let loading = null;
  rpPop.addEventListener('click', async e => {
    if (e.target.id === 'rpNow') { armReto(); rpPop.style.display = 'none'; N.repStart(); return; }
    if (e.target.id !== 'rpGo') return;
    if (loading) { loading.stop = true; return; }
    const st = new Date($('rpD').value + 'T' + $('rpH').value).getTime(), en = st + (+$('rpL').value) * 60000, sym = N.sym;
    if (!(st > 0) || en > Date.now()) { $('rpMsg').textContent = 'Elige una fecha y hora que ya hayan pasado.'; return; }
    const L = loading = { stop: false }, T = [], P = [], Q = [], S = []; e.target.textContent = 'Cancelar';
    try {
      let from = null;
      for (let i = 0; i < 3000 && !L.stop; i++) {
        const u = N.REST + 'aggTrades?symbol=' + sym.id + '&limit=1000&' + (from == null ? 'startTime=' + st + '&endTime=' + Math.min(en, st + 3599000) : 'fromId=' + from);
        const r = await fetch(u); if (r.status === 429 || r.status === 418) { await new Promise(z => setTimeout(z, 30000)); continue; } if (!r.ok) throw new Error('HTTP ' + r.status);
        const a = await r.json(); if (!a.length) break; let done = false;
        for (const d of a) { if (d.T > en) { done = true; break; } T.push(d.T); P.push(Math.round(parseFloat(d.p) / sym.tick)); Q.push(+d.q); S.push(d.m ? 1 : 0); }
        from = a[a.length - 1].a + 1; $('rpMsg').textContent = 'Cargando… ' + Math.min(99, Math.round((a[a.length - 1].T - st) / (en - st) * 100)) + '% · ' + T.length.toLocaleString('es-MX') + ' trades';
        if (done || a.length < 1000) break; await new Promise(z => setTimeout(z, 1000));
      }
      if (L.stop) { $('rpMsg').textContent = 'Cancelado.'; }
      else if (T.length < 100) $('rpMsg').textContent = 'Esa ventana casi no tuvo operaciones. Prueba otra hora.';
      else { armReto(); rpPop.style.display = 'none'; if (N.rep) N.repStop(); N.repStart({ T: Float64Array.from(T), P: Int32Array.from(P), Q: Float64Array.from(Q), S: Uint8Array.from(S), n: T.length }); }
    } catch (x) { $('rpMsg').textContent = 'No se pudo cargar: ' + x.message; }
    loading = null; const b = $('rpGo'); if (b) b.textContent = 'Cargar y reproducir';
  });

  /* =================== FLUJO: icebergs, muros retirados, CVD por tamaño, perfil por sesión =================== */
  let EV = [], icb = new Map(), tradedRow = new Map(), prevSnap = null, lastSym = '';
  function resetFlow() { EV = []; icb.clear(); tradedRow.clear(); prevSnap = null; cvdKey = ''; }
  H.trade.push((t, p, q, s) => {
    const sym = N.sym, f = N.feed; if (sym.id !== lastSym) { lastSym = sym.id; resetFlow(); }
    const row = Math.floor(p / sym.hg); tradedRow.set(row, (tradedRow.get(row) || 0) + q);
    if (!f || !f.bookOk) return;
    const book = s ? f.bids : f.asks, visQ = book.get(p) || 0;   // el agresor vende → pega a los bids; compra → a los asks
    let r = icb.get(p); if (!r || t - r.t > 30000 || r.s !== s) { r = { ex: 0, pk: 0, s, t, hit: false }; icb.set(p, r); }
    r.ex += q; r.t = t; r.pk = Math.max(r.pk, visQ);
    if (!r.hit && r.pk > 0 && visQ > 0 && r.ex >= 3 * r.pk && r.ex >= sym.big * 0.5) {
      r.hit = true; EV.push({ k: 'ice', t, p, s: s ? 1 : 0, q: r.ex }); if (EV.length > 300) EV.shift();
      if (get('alIce', 0)) N.ping('Iceberg · ' + sym.id, (s ? 'Compras ocultas' : 'Ventas ocultas') + ' en ' + N.fp(p) + ': ' + N.fv(r.ex) + ' ejecutado contra ' + N.fv(r.pk) + ' visible.');
    }
    if (icb.size > 4000) icb.clear();
    alertsOnTrade(t, p);
  });
  H.snap.push(col => {
    const sym = N.sym, prev = prevSnap; prevSnap = col; if (!prev || prev.base == null) { tradedRow.clear(); return; }
    const th = N.heatRef * 2.5, mid = (col.bb + col.ba) / 2 / sym.hg;
    for (let i = 0; i < prev.a.length; i++) {
      const q0 = prev.a[i]; if (!(q0 >= th)) continue;
      const row = prev.base + i, j = row - col.base, q1 = j >= 0 && j < col.a.length ? col.a[j] : 0;
      if (Math.abs(row - mid) > 60 || Math.abs(row - mid) < 2) continue;   // lejos no importa; pegado al precio se ejecuta
      if (q1 < q0 * 0.3 && (tradedRow.get(row) || 0) < (q0 - q1) * 0.3) {
        const side = row * sym.hg < col.bb ? 0 : 1, p = row * sym.hg;
        EV.push({ k: 'pull', t: col.t, p, s: side, q: q0 }); if (EV.length > 300) EV.shift();
        if (get('alPull', 0)) N.ping('Muro retirado · ' + sym.id, 'Se quitaron ' + N.fv(q0) + ' ' + (side ? 'en venta' : 'en compra') + ' en ' + N.fp(p) + ' sin ejecutarse.');
      }
    }
    tradedRow.clear();
  });
  H.draw.push((x, g) => {
    const I = N.cfg.ind, sym = N.sym;
    if (I.sess && g.cells) drawSess(x, g);
    if (I.cal) drawCal(x, g);
    if (!I.ice || !EV.length) return;
    const tMin = g.A[g.iLo].t0;
    for (const e of EV) {
      if (e.t < tMin || e.t > g.tNow) continue; const i = N.idxAt(g.A, e.t); if (i > g.iHi) continue;
      const px = g.X(i) + g.barW / 2, py = g.Y(e.p + 0.5), c = e.s ? N.C.dn : N.C.up;
      x.save(); x.strokeStyle = c; x.lineWidth = 1.5;
      if (e.k === 'ice') { x.fillStyle = 'rgba(191,227,255,.85)'; x.beginPath(); x.moveTo(px, py - 7); x.lineTo(px + 7, py); x.lineTo(px, py + 7); x.lineTo(px - 7, py); x.closePath(); x.fill(); x.stroke(); if (g.barW > 40) { x.fillStyle = '#bfe3ff'; x.font = '9px ' + MONO; x.fillText('ICE', px + 9, py + 3); } }
      else { x.setLineDash([3, 2]); x.strokeRect(px - 6, py - 6, 12, 12); x.setLineDash([]); if (g.barW > 40) { x.fillStyle = c; x.font = '9px ' + MONO; x.fillText('RETIRADO', px + 9, py + 3); } }
      x.restore();
    }
  });
  let cvdKey = '', cvdB = [], cvdS = [];
  H.low.push((x, g) => {
    if (!N.cfg.ind.cvds) return;
    const e = N.eng, A = g.A, key = e.n + ':' + A.length + ':' + e.o.type + e.o.size;
    if (key !== cvdKey) {   // recorre los trades y suma por barra: grandes vs chicos
      cvdKey = key; const big = N.sym.big, nb = A.length, db = new Float64Array(nb), ds = new Float64Array(nb); let j = 0;
      for (let i = 0; i < e.n; i++) { const t = e.T[i]; while (j + 1 < nb && A[j + 1].t0 <= t) j++; const q = e.Q[i] * (e.S[i] ? -1 : 1); if (e.Q[i] >= big) db[j] += q; else ds[j] += q; }
      cvdB = []; cvdS = []; let a = 0, b = 0; for (let i = 0; i < nb; i++) { a += db[i]; b += ds[i]; cvdB.push(a); cvdS.push(b); }
    }
    let lo = Infinity, hi = -Infinity; for (let i = g.iLo; i <= g.iHi; i++) { lo = Math.min(lo, cvdB[i], cvdS[i]); hi = Math.max(hi, cvdB[i], cvdS[i]); }
    const Y = v => g.ch + 6 + (hi - v) / ((hi - lo) || 1) * (g.dh - 8);
    for (const [arr, c] of [[cvdB, '#f0b35e'], [cvdS, 'rgba(232,236,243,.55)']]) { x.strokeStyle = c; x.lineWidth = 1.2; x.beginPath(); for (let i = g.iLo; i <= g.iHi; i++) { const px = g.X(i) + g.barW / 2; i === g.iLo ? x.moveTo(px, Y(arr[i])) : x.lineTo(px, Y(arr[i])); } x.stroke(); }
    x.font = '9px ' + MONO; x.fillStyle = '#f0b35e'; x.fillText('CVD grandes', g.cw - 150, g.ch + 12); x.fillStyle = 'rgba(232,236,243,.7)'; x.fillText('chicos', g.cw - 72, g.ch + 12);
  });
  const SESS = [['ASIA', 0, 7], ['LONDRES', 7, 13.5], ['NUEVA YORK', 13.5, 20]];   // horas UTC
  function drawSess(x, g) {
    const A = g.A, groups = new Map();
    for (let i = g.iLo; i <= g.iHi; i++) {
      const b = A[i]; if (!b.lv) continue; const d = new Date(b.t0), h = d.getUTCHours() + d.getUTCMinutes() / 60, s = SESS.find(z => h >= z[1] && h < z[2]); if (!s) continue;
      const k = d.toISOString().slice(0, 10) + s[0]; let G = groups.get(k); if (!G) { G = { name: s[0], i0: i, i1: i, lv: new Map() }; groups.set(k, G); }
      G.i1 = i; for (const [p, e] of b.lv) G.lv.set(p, (G.lv.get(p) || 0) + e[0] + e[1]);
    }
    for (const G of groups.values()) {
      let mx = 0, poc = 0; for (const [p, v] of G.lv) if (v > mx) { mx = v; poc = p; }
      const x0 = g.X(G.i0), x1 = g.X(G.i1) + g.barW, w = Math.min(70, (x1 - x0) * 0.45), gr = N.eng.o.group;
      x.fillStyle = 'rgba(90,176,255,.16)'; for (const [p, v] of G.lv) { const yT = g.Y(p + gr); x.fillRect(x0, yT, v / mx * w, Math.max(1, g.rh - 1)); }
      x.strokeStyle = 'rgba(191,227,255,.6)'; x.setLineDash([4, 3]); x.beginPath(); x.moveTo(x0, g.Y(poc) - g.rh / 2); x.lineTo(x1, g.Y(poc) - g.rh / 2); x.stroke(); x.setLineDash([]);
      x.fillStyle = 'rgba(191,227,255,.7)'; x.font = '9px ' + MONO; x.fillText(G.name, x0 + 3, 12);
      x.fillStyle = 'rgba(90,176,255,.25)'; x.fillRect(x0, 0, 1, g.ch);
    }
  }

  /* =================== ALERTAS AVANZADAS y TELEGRAM =================== */
  let lastP = null, lastVW = null, zonesSeen = 0;
  function alertsOnTrade(t, p) {
    if (lastP != null) {
      if (get('alLine', 0)) for (const d of N.D) if (d.type === 'h') { const k = Math.round(d.p1); if ((lastP < k && p >= k) || (lastP > k && p <= k)) N.ping('Tocó tu línea · ' + N.sym.id, 'El precio llegó a ' + N.fp(k)); }
      const vw = N.vwap; if (get('alVW', 0) && vw && lastVW && ((lastP < lastVW && p >= vw) || (lastP > lastVW && p <= vw))) N.ping('Cruce de VWAP · ' + N.sym.id, (p >= vw ? 'Arriba' : 'Abajo') + ' del VWAP en ' + N.fp(p));
      lastVW = vw;
    }
    lastP = p;
  }
  H.slow.push(() => {
    if (!get('alZone', 0)) return; const e = N.eng; if (!e || !e.bars.length || N.rep) return;
    const z = e.stats(e.bars[e.bars.length - 1]).zones; if (z.length > zonesSeen) { const s = z[z.length - 1]; N.ping('Desbalance apilado · ' + N.sym.id, (s[2] > 0 ? 'Compradores' : 'Vendedores') + ' de ' + N.fp(s[0]) + ' a ' + N.fp(s[1])); }
    zonesSeen = z.length;
  });
  let tg = get('tg', { tok: '', chat: '' });
  H.ping.push((title, body) => { if (tg.tok && tg.chat) fetch('https://api.telegram.org/bot' + encodeURIComponent(tg.tok) + '/sendMessage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: tg.chat, text: 'NORTHPOINT DEPTH · ' + title + '\n' + body }) }).catch(() => {}); });
  function paintAl2() {
    if (!vis('pAl') || ($('alBox2').contains(document.activeElement) && /INPUT/.test(document.activeElement.tagName))) return;
    const t = (k, a, b) => sw(`data-al="${k}"`, a, b, get(k, 0));
    $('alBox2').innerHTML = `<h6>Detecciones</h6>${t('alLine', 'Toque de tus líneas', 'Cuando el precio llega a una línea horizontal que dibujaste.')}${t('alVW', 'Cruce del VWAP', 'Cuando el precio pasa de un lado al otro del VWAP diario.')}${t('alZone', 'Desbalance apilado', 'Cuando aparece una zona nueva en la vela actual.')}${t('alIce', 'Iceberg', 'Órdenes ocultas que se recargan en el mismo precio.')}${t('alPull', 'Muro retirado', 'Una orden grande del libro desaparece sin ejecutarse.')}
      <h6>En tu teléfono</h6><div class="card"><p style="margin-top:0">Recibe cada aviso en Telegram. Crea un bot con <b>@BotFather</b> y obtén tu número de chat con <b>@userinfobot</b>.</p>
      <div class="fld"><span>Token del bot</span><input id="tgT" type="password" value="${esc(tg.tok)}" placeholder="123456:ABC…"></div><div class="fld"><span>Número de chat</span><input id="tgC" value="${esc(tg.chat)}" placeholder="Ej. 51234567"></div><button id="tgTest" class="wide">Enviar aviso de prueba</button></div>`;
  }
  $('alBox2').addEventListener('change', e => { const k = e.target.dataset.al; if (k) put(k, e.target.checked ? 1 : 0); if (e.target.id === 'tgT' || e.target.id === 'tgC') { tg = { tok: $('tgT').value.trim(), chat: $('tgC').value.trim() }; put('tg', tg); } });
  $('alBox2').addEventListener('click', e => { if (e.target.id === 'tgTest') { tg = { tok: $('tgT').value.trim(), chat: $('tgC').value.trim() }; put('tg', tg); N.ping('Prueba', 'Los avisos llegarán aquí.'); } });

  /* =================== CORRELACIONES y DATOS ECONÓMICOS =================== */
  const REFS = ['BTCUSDT', 'ETHUSDT', 'QQQUSDT', 'SPYUSDT', 'XAUUSDT'];
  let corrAt = 0, corrSym = '';
  async function corr() {
    if (!vis('pWatch') || (Date.now() - corrAt < 60000 && corrSym === N.sym.id)) return; corrAt = Date.now(); corrSym = N.sym.id;
    const ids = [N.sym.id].concat(REFS.filter(s => s !== N.sym.id && N.SY.some(q => q.id === s)));
    try {
      const all = await Promise.all(ids.map(s => fetch(N.REST + 'klines?symbol=' + s + '&interval=1m&limit=120').then(r => r.json())));
      const ret = all.map(k => k.slice(1).map((c, i) => Math.log(+c[4] / +k[i][4]))), base = ret[0];
      const cor = (a, b) => { const n = Math.min(a.length, b.length), ma = a.reduce((s, v) => s + v, 0) / n, mb = b.reduce((s, v) => s + v, 0) / n; let c = 0, va = 0, vb = 0; for (let i = 0; i < n; i++) { c += (a[i] - ma) * (b[i] - mb); va += (a[i] - ma) ** 2; vb += (b[i] - mb) ** 2; } return va && vb ? c / Math.sqrt(va * vb) : 0; };
      $('corr').innerHTML = '<div class="al" style="padding-bottom:0"><h6>Correlación · 2 h con ' + esc(N.sym.id.replace(/USDT$/, '')) + '</h6><div class="card">' + ids.slice(1).map((s, i) => { const r = cor(base, ret[i + 1]), k = all[i + 1], ch = (+k[k.length - 1][4] / +k[0][4] - 1) * 100; return `<div class="it"><span>${s.replace(/USDT$/, '')} <small style="color:var(--mut)">${ch >= 0 ? '+' : ''}${ch.toFixed(2)}%</small></span><span style="color:${r > 0.5 ? N.C.up : r < -0.5 ? N.C.dn : 'var(--mut)'}">${r.toFixed(2)}</span></div>`; }).join('') + '</div></div>' + calHtml();
    } catch (e) {}
  }
  /* calendario: solo en la app de escritorio (su servidor local lo trae; el navegador lo bloquea) */
  let CAL = [], calAt = 0;
  async function loadCal() { if (!DESK || Date.now() - calAt < 15 * 60000) return; calAt = Date.now(); try { const j = await (await fetch('/cal')).json(); CAL = (j || []).filter(e => e.impact === 'High' && (e.country === 'USD' || e.country === 'EUR' || e.country === 'CNY')).map(e => ({ t: Date.parse(e.date), n: e.title, c: e.country })); } catch (e) {} }
  function calHtml() {
    if (!DESK) return '<div class="al"><h6>Agenda económica</h6><div class="card empty"><span>La agenda de datos de alto impacto vive en la app de escritorio.</span></div></div>';
    const next = CAL.filter(e => e.t > Date.now() - 3600e3).slice(0, 6);
    return '<div class="al"><h6>Agenda · alto impacto</h6><div class="card">' + (next.map(e => `<div class="it"><span>${N.fd(e.t)} · ${esc(e.c)}</span><span style="text-align:right;max-width:60%;font-family:var(--sans)">${esc(e.n)}</span></div>`).join('') || '<p>Sin datos fuertes en las próximas horas.</p>') + '</div></div>';
  }
  function drawCal(x, g) {
    if (!CAL.length) return; const t0 = g.A[g.iLo].t0, t1 = g.tNow + 6 * 3600e3;
    for (const e of CAL) { if (e.t < t0 || e.t > t1) continue; let px; if (e.t <= g.A[g.nb - 1].t0) px = g.X(N.idxAt(g.A, e.t)); else { const sz = N.eng.o.size || 60000; px = g.X(g.nb - 1) + (e.t - g.A[g.nb - 1].t0) / sz * g.barW; } if (px < 0 || px > g.cw) continue;
      x.save(); x.strokeStyle = 'rgba(240,179,94,.55)'; x.setLineDash([2, 3]); x.beginPath(); x.moveTo(px, 0); x.lineTo(px, g.ch); x.stroke(); x.fillStyle = '#f0b35e'; x.font = '9px ' + MONO; x.fillText(e.c + ' ' + e.n.slice(0, 22), px + 3, g.ch - 6); x.restore(); }
  }

  /* =================== ciclo =================== */
  H.slow.push(() => { paintJr(); paintAl2(); corr(); loadCal(); });
  setInterval(() => { paintAc(); }, 1000);
  $('rtabs').addEventListener('click', () => setTimeout(() => { paintJr(); paintAc(); paintAl2(); corrAt = 0; corr(); }, 0));
  jrLoad().then(() => { paintJr(); paintChip(); });
  startBroker();
})();
