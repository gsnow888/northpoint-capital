/* NORTHPOINT DEPTH · licencia. Mismo esquema que la app NORTHPOINT:
   la suscripción se compra en Whop, el comprador recibe una clave y aquí se valida contra el
   servidor de licencias de NORTHPOINT (la llave de Whop nunca sale de ese servidor). */
(function () {
  'use strict';
  const C = {
    server: 'https://northpoint-licencias.andremacouzetruiz.workers.dev',
    plan: /depth/i,                 // el producto de Whop debe llevar "DEPTH" en el nombre
    comprar: 'https://northpointcapital.io/depth/#precio',
    gracia: 7 * 864e5,              // sin internet: hasta 7 días con la última validación
    cada: 12 * 36e5,                // se vuelve a validar cada 12 h
    fundadores: ['97123888cb0614d7fb24b8c0222a50f7d8d05c9ddfb1eb4ad2b7bf86ffe6c612', '03468f245b92e08fc98abb04cf4877ba2d7b65ceb783648e97e2deaec9bc2167', 'fc409374ce774c9f1af3fcc3464112811a3f39a9931b005992d5c9a4077a2ae0']
  };
  const get = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } };
  const put = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const sha = async t => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)))).map(x => x.toString(16).padStart(2, '0')).join('');
  function hwid() { let h = get('npd.hwid', null); if (!h) { h = Array.from(crypto.getRandomValues(new Uint8Array(12))).map(x => x.toString(16).padStart(2, '0')).join(''); put('npd.hwid', h); } return h; }

  function state() {
    if (C.fundadores.includes(get('npd.lic.fund', ''))) return { t: 'libre' };
    const L = get('npd.lic', null);
    if (!L || !L.key) return { t: 'sin', msg: 'Activa NORTHPOINT DEPTH con tu clave de licencia.' };
    if (L.status !== 'active') return { t: 'vencida', msg: 'Tu suscripción no está activa.' };
    if (Date.now() - (L.ok || 0) < C.gracia) return { t: 'activa', L, toca: Date.now() - (L.ok || 0) > C.cada };
    return { t: 'revalidar', L, msg: 'Conéctate a internet para confirmar tu suscripción.' };
  }
  async function ask(key) {
    const r = await fetch(C.server, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key, hwid: hwid() }) });
    return r.json();
  }
  async function activate(key) {
    key = (key || '').trim(); if (!key) throw new Error('Pega tu clave de licencia.');
    const h = await sha('npd:' + key.toUpperCase()); if (C.fundadores.includes(h)) { put('npd.lic.fund', h); return; }
    let j; try { j = await ask(key); } catch (e) { throw new Error('No hay conexión con el servidor de licencias. Intenta de nuevo.'); }
    if (!j.ok) throw new Error(j.error || 'Esa clave no es válida.');
    if (!C.plan.test(j.plan || '')) throw new Error('Esa clave es de otro producto de NORTHPOINT (' + (j.plan || 'sin nombre') + ').');
    put('npd.lic', { key, status: 'active', plan: j.plan, email: j.email || '', vence: j.vence || null, ok: Date.now() });
  }
  async function recheck(L) { // en segundo plano; si la suscripción se canceló, la siguiente carga pide clave
    try { const j = await ask(L.key); if (j.ok) put('npd.lic', Object.assign({}, L, { ok: Date.now(), vence: j.vence || null })); else if (j.error && !/servidor|configurado/i.test(j.error)) { put('npd.lic', Object.assign({}, L, { status: 'expired' })); location.reload(); } } catch (e) {}
  }
  function overlay(msg) {
    const d = document.createElement('div');
    d.style.cssText = 'position:fixed;inset:0;z-index:99;display:grid;place-items:center;background:radial-gradient(700px 420px at 50% 20%,rgba(90,176,255,.16),transparent 70%),#03060c;font:15px Inter,-apple-system,"Helvetica Neue",sans-serif;color:#e8ecf3;padding:20px';
    d.innerHTML = '<form style="width:100%;max-width:420px;border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:30px;background:rgba(255,255,255,.035)">' +
      '<div style="font-weight:700;letter-spacing:.16em;font-size:12px;margin-bottom:22px">NORTHPOINT <b style="color:#5ab0ff">DEPTH</b></div>' +
      '<h1 style="font-size:24px;letter-spacing:-.02em;margin:0 0 8px">Activa tu suscripción</h1><p id="lcMsg" style="color:#8791a1;margin:0 0 20px;line-height:1.5"></p>' +
      '<input id="lcKey" placeholder="Tu clave de licencia" autocomplete="off" spellcheck="false" style="width:100%;font:14px ui-monospace,Menlo,monospace;color:#e8ecf3;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:11px;padding:13px;outline:0">' +
      '<button id="lcGo" style="width:100%;margin-top:12px;font:600 15px inherit;padding:13px;border-radius:11px;border:0;background:#5ab0ff;color:#03060c;cursor:pointer">Activar</button>' +
      '<div id="lcErr" style="color:#3d5afe;font-size:13px;min-height:20px;margin-top:10px"></div>' +
      '<div style="display:flex;justify-content:space-between;font-size:13px;margin-top:8px"><a href="' + C.comprar + '" style="color:#5ab0ff">Ver planes</a><a href="#" id="lcOut" style="color:#8791a1">Cerrar sesión</a></div></form>';
    document.body.appendChild(d);
    d.querySelector('#lcMsg').textContent = msg + ' La clave te llega al comprar tu plan.';
    d.querySelector('#lcOut').onclick = e => { e.preventDefault(); if (window.NPAuth) NPAuth.logout(); location.href = 'login.html'; };
    d.querySelector('form').onsubmit = async e => {
      e.preventDefault(); const b = d.querySelector('#lcGo'), er = d.querySelector('#lcErr'); er.textContent = ''; b.disabled = true; b.textContent = 'Validando…';
      try { await activate(d.querySelector('#lcKey').value); location.reload(); } catch (x) { er.textContent = x.message; b.disabled = false; b.textContent = 'Activar'; }
    };
  }
  /* true = puede entrar. Si no, pinta la pantalla de activación (silent = no pintar, para los gráficos de la cuadrícula). */
  function gate(silent) {
    const s = state();
    if (s.t === 'libre') return true;
    if (s.t === 'activa') { if (s.toca) recheck(s.L); return true; }
    if (s.t === 'revalidar') recheck(s.L);
    if (!silent) overlay(s.msg);
    return false;
  }
  window.NPLic = { state, activate, gate, info: () => get('npd.lic', null), salir() { try { localStorage.removeItem('npd.lic'); localStorage.removeItem('npd.lic.fund'); } catch (e) {} } };
})();
