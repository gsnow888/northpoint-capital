/* Torneos multimesa en vivo: el anfitrión corre todas las mesas (mttcore.js) y transmite cada mesa por separado.
   Cada jugador ve su mesa; el lobby del torneo muestra inscritos, mesas, niveles, bote, KO, recompras y registro tardío. */
(function () {
  if (!window.MTT) return;
  const MS = { T: null, host: false, code: null, ch: null, meta: null, ts: {}, myT: -1, viewT: -1, lastFull: 0, dirty: new Set(), seen: {}, shownOut: false, shownEnd: '' };
  window.MS = MS;
  const usd = n => PRICING.fmtUsd(n);
  const ord = n => n + (['th', 'st', 'nd', 'rd'][(n % 100 - 20) % 10] || ['th', 'st', 'nd', 'rd'][n % 100] || 'th');

  // ---------- crear ----------
  window.createMtt = function (cfg) {
    if (cfg.money && (!P.wallet || P.wallet.kind !== 'sol')) { walletModal(); return; }
    const code = newCode();
    const T = MTT.create({ ...cfg, code, hostUid: UID, money: cfg.money ? { usd: cfg.money.usd, bank: P.wallet.addr, net: PRICING.network } : null });
    T.bankName = P.name; st.set('mtt.' + code, T); location.hash = '#m/' + code; location.reload();
  };

  // ---------- anfitrión ----------
  function replyM(p, e) { if (p.uid === UID) toast(e); else MS.ch.send({ type: 'broadcast', event: 'err', payload: { to: p.uid, e } }); }
  function mHandle(p) {
    const T = MS.T; if (!T) return; const now = Date.now(); let e = null;
    if (p.pub) PUBS[p.uid] = { ...(PUBS[p.uid] || {}), uid: p.uid, name: p.name, pub: p.pub };
    const paidAction = (p.type === 'register' || p.type === 'rebuy') && T.money && p.uid !== T.hostUid;
    if (paidAction) {
      const amount = p.type === 'register' ? T.money.usd : T.rebuy && T.rebuy.cost;
      if (!p.sig || T.used[p.sig]) return replyM(p, 'payment missing');
      if (p.type === 'register') { const pre = MTT.lateOpen(T, now) ? null : 'registration is closed'; if (pre) return replyM(p, pre + ' · ask the bank for a refund'); }
      verifyPay(p.sig, p.wallet, T.money.bank, amount, T.money.net).then(ok => {
        if (!ok) return replyM(p, 'payment not found on-chain. ask the bank for help.');
        T.used[p.sig] = 1;
        const e2 = p.type === 'register' ? MTT.register(T, { uid: p.uid, name: p.name, wallet: p.wallet, avatar: p.avatar, lvl: p.lvl, sig: p.sig }, Date.now()) : MTT.doRebuy(T, p.uid);
        if (e2) return replyM(p, e2 + ' · your payment arrived: the bank can refund it');
        commitM(true);
      });
      return;
    }
    switch (p.type) {
      case 'hello': commitM(true); sendHoleTo(p.uid); return;
      case 'register': e = MTT.register(T, { uid: p.uid, name: p.name, wallet: p.wallet || (p.uid === T.hostUid && P.wallet ? P.wallet.addr : ''), avatar: p.avatar, lvl: p.lvl }, now); break;
      case 'unregister': e = MTT.unregister(T, p.uid); break;
      case 'start': e = p.uid !== T.hostUid ? 'only the host can start' : MTT.start(T, now); break;
      case 'act': { const pl = T.players[p.uid]; if (!pl || pl.t < 0) return; const g = T.tables[pl.t]; const s = g.seats.find(x => x && x.uid === p.uid); if (s) s.away = false; e = H.act(g, p.uid, p.a, p.amount); if (!e) MS.dirty.add(pl.t); break; }
      case 'rebuy': e = MTT.doRebuy(T, p.uid); break;
      case 'decline': MTT.decline(T, p.uid); break;
      case 'back': MTT.back(T, p.uid); break;
      case 'leave': if (!T.started) e = MTT.unregister(T, p.uid); else { const pl = T.players[p.uid], g = pl && T.tables[pl.t], s = g && g.seats.find(x => x && x.uid === p.uid); if (s) s.away = true; } break;
      default: return;
    }
    if (e) replyM(p, e); else commitM(true);
  }
  function sendHoleTo(uid) {
    const T = MS.T, pl = T && T.players[uid]; if (!pl || pl.t < 0 || pl.out) return; const g = T.tables[pl.t];
    if (!H.inBetting(g) && g.phase !== 'showdown') return; const i = g.seats.findIndex(s => s && s.uid === uid), cards = g.priv.holes[i]; if (!cards) return;
    if (uid === UID) { HOLE = { hand: g.handNo, cards, t: pl.t }; return; }
    const pub = PUBS[uid] && PUBS[uid].pub; if (!pub) return;
    seal(pub, cards).then(box => MS.ch.send({ type: 'broadcast', event: 'mhole', payload: { to: uid, t: pl.t, hand: g.handNo, box } }));
  }
  function commitM(full) {
    const T = MS.T, now = Date.now(); st.set('mtt.' + MS.code, T);
    const m = MTT.meta(T, now); m.hostPub = KEYS.pub; m.bankName = T.bankName;
    MS.ch.send({ type: 'broadcast', event: 'tmeta', payload: m }); onMeta(m);
    const ks = full ? T.tables.map((g, k) => k) : [...MS.dirty]; MS.dirty.clear();
    ks.forEach(k => { const g = T.tables[k]; if (!g) return; const v = H.publicView(g); v.tIdx = k; MS.ch.send({ type: 'broadcast', event: 'tstate', payload: { k, v } }); onTs({ k, v });
      if (H.inBetting(g) && MS.seen[k] !== g.handNo) { MS.seen[k] = g.handNo; g.seats.forEach(s => { if (s && s.inHand) sendHoleTo(s.uid); }); } });
    if (full) MS.lastFull = now;
    if (T.public) { lastAnn = { code: T.code, name: T.name, mode: 'mtt', venue: T.venue, seated: T.order.length, sb: 0, bb: 0, buyin: T.money ? T.money.usd : 0, started: T.started, finished: T.finished, prize: T.pool, late: m.lateOpen }; ensureLobby(); if (lobbyOk) lobby.track(lastAnn); }
  }
  function mTick() {
    const T = MS.T; if (!T) return; const ch = MTT.tick(T, Date.now()); let full = false;
    ch.forEach(x => { if (typeof x === 'number') MS.dirty.add(x); else if (x === 'all' || x === 'meta' || String(x).startsWith('deal')) full = true; });
    if (full || Date.now() - MS.lastFull > 5000) commitM(true); else if (MS.dirty.size) commitM(false);
  }
  async function payWinners() {
    const m = MS.meta, T = MS.T; if (!T || !T.results || !T.money) return; const btn = $('[data-mpayout]');
    const list = T.results.filter(r => r.total > 0 && r.wallet && r.wallet !== T.money.bank).map(r => ({ to: r.wallet, usd: r.total }));
    if (!list.length) { T.payout = ['bank']; commitM(true); return toast('the bank won it all: nothing to send'); }
    const sigs = []; try {
      for (let i = 0; i < list.length; i += 6) { if (btn) btn.textContent = `approve in Phantom… (${Math.floor(i / 6) + 1}/${Math.ceil(list.length / 6)})`; sigs.push(await payTo(list.slice(i, i + 6), `suited:${MS.code}:payout`, T.money.net)); }
      T.payout = sigs; ledger({ type: 'payout', usd: list.reduce((a, x) => a + x.usd, 0), sig: sigs[0], net: T.money.net, memo: 'prizes ' + T.name }); commitM(true); toast('winners paid');
    } catch (e) { if (sigs.length) { T.payout = sigs; commitM(true); } if (btn) btn.textContent = 'pay winners'; toast('payout stopped: ' + e.message); }
  }

  // ---------- jugadores ----------
  function mSend(type, d) {
    const p = { type, uid: UID, name: P.name, pub: KEYS.pub, avatar: P.avatar, lvl: lvlOf(P.xp), ...d };
    if (MS.host) mHandle(p); else MS.ch.send({ type: 'broadcast', event: 'req', payload: p });
  }
  async function payThen(type, amount, btn) {
    if (!P.wallet || P.wallet.kind !== 'sol') return walletModal();
    if (btn) { btn.disabled = true; btn.textContent = 'approve in Phantom…'; }
    try {
      const sig = await payTo([{ to: MS.meta.money.bank, usd: amount }], `suited:${MS.code}:${UID}:${type}`, MS.meta.money.net);
      ledger({ type: type === 'rebuy' ? 'rebuy' : 'entry', usd: amount, sig, net: MS.meta.money.net, memo: MS.meta.name });
      if (btn) btn.textContent = 'confirming…'; mSend(type, { sig, wallet: P.wallet.addr }); setTimeout(() => $('#over').classList.remove('on'), 1500); balance();
    } catch (e) { if (btn) { btn.disabled = false; btn.textContent = 'try again'; } toast(/reject|cancel/i.test(e.message) ? 'payment cancelled' : 'payment failed: ' + e.message); }
  }
  function onMeta(m) {
    MS.meta = m; const me = m.players.find(x => x.uid === UID), prev = MS.myT; MS.myT = me && !me.out && me.t >= 0 ? me.t : -1;
    if (MS.myT !== prev) { if (prev >= 0 && MS.myT >= 0) toast(`you moved to table ${MS.myT + 1}`); HOLE = null; if (MS.myT >= 0) MS.viewT = MS.myT; }
    const open = m.tables.filter(t => !t.closed); if (MS.viewT < 0 || (m.tables[MS.viewT] && m.tables[MS.viewT].closed)) MS.viewT = MS.myT >= 0 ? MS.myT : (open[0] ? open[0].k : -1);
    if (me && me.out && !MS.shownOut && !m.finished) { MS.shownOut = true; showOver(`<h3>you finished ${ord(me.place)}</h3><p>${me.ko ? `${me.ko} knockout${me.ko > 1 ? 's' : ''} · +${usd(me.koUsd)} in bounties. ` : ''}you can keep watching the tables.</p><button class="btn w" data-mclose>watch</button>`); }
    if (m.finished && MS.shownEnd !== JSON.stringify(m.payout)) { MS.shownEnd = JSON.stringify(m.payout); showEnd(m); }
    if (me && me.wait && !m.finished) rebuyPrompt(m); else if ($('#overIn') && $('#overIn').dataset.k === 'rebuy') $('#over').classList.remove('on');
    updateView(); panel();
  }
  function onTs({ k, v }) { MS.ts[k] = v; if (k === MS.viewT) updateView(); }
  function updateView() {
    const m = MS.meta, v = MS.ts[MS.viewT];
    if (!m || !m.started || !v) { G = null; V = null; $('#rail').style.visibility = m && m.started ? 'visible' : 'hidden'; return; }
    $('#rail').style.visibility = 'visible';
    if (HOLE && HOLE.t !== MS.viewT) HOLE = null;
    G = { ...v, mode: 'sng', started: true, level: m.level, levelAt: m.levelAt, levelMs: m.levelMs, hostUid: m.hostUid, hostPub: m.hostPub, name: `${m.name} · table ${MS.viewT + 1}` }; V = G;
    try { onState(); } catch (e) { render(); }
  }
  function rebuyPrompt(m) {
    if ($('#over').classList.contains('on') && $('#overIn').dataset.k === 'rebuy') return;
    showOver(`<h3>you’re out of chips</h3><p>rebuys are open: ${fmt(m.rebuy.chips)} chips${m.money ? ` for <b style="color:#fff">${usd(m.rebuy.cost)}</b>` : ''}. you have 60 seconds.</p><button class="btn w" data-mrebuy>${m.money ? 'rebuy · ' + usd(m.rebuy.cost) : 'rebuy'}</button><button class="btn gh w" style="margin-top:8px" data-mdecline>no thanks</button>`);
    $('#overIn').dataset.k = 'rebuy';
  }
  function showEnd(m) {
    const R = m.results || [], isBank = m.hostUid === UID;
    showOver(`<h3>${esc(m.name)} · final results</h3><p>${m.entries} entries${m.rebuys ? ` · ${m.rebuys} rebuys` : ''}${m.money ? ` · prize pool ${usd(m.pool)}${m.bounty ? ` + ${usd(m.bounty * m.entries)} in bounties` : ''}` : ''}</p>
     <div class="places" style="max-height:44vh;overflow:auto">${R.filter(r => r.total > 0 || r.place <= 3).map(r => `<div class="${r.uid === UID ? 'me' : ''}"><span>${r.place}. ${esc(r.name)}${r.ko ? ` <small style="color:var(--mut)">· ${r.ko} KO</small>` : ''}</span><b class="m">${m.money ? (r.total ? '+' + usd(r.total) : '—') : (r.prize ? 'paid' : '—')}</b></div>`).join('')}</div>
     ${m.money ? (m.payout ? `<p style="color:var(--g);margin:0 0 12px">winners paid ✓ ${m.payout[0] !== 'bank' ? m.payout.map((s, i) => `<a href="${scan(s, m.money.net)}" target="_blank" rel="noopener" style="color:var(--g)">tx ${i + 1}</a>`).join(' · ') : ''}</p>` : isBank ? `<button class="btn w" data-mpayout style="margin-bottom:8px">pay winners</button>` : `<p style="margin:0 0 12px">waiting for ${esc(m.bankName || 'the bank')} to send the prizes…</p>`) : ''}
     <button class="btn w gh" data-back>back to lobby</button>`);
  }
  // lobby del torneo + barra de datos
  function panel() {
    const m = MS.meta; if (!m) return; const me = m.players.find(x => x.uid === UID), isHost = m.hostUid === UID, lv = m.level, lvLeft = m.started ? Math.max(0, m.levelMs - ((Date.now() - m.levelAt) % m.levelMs)) : 0;
    let box = $('#mlobby'); if (!box) { box = document.createElement('div'); box.id = 'mlobby'; $('#room').appendChild(box); }
    let hud = $('#mhud'); if (!hud) { hud = document.createElement('div'); hud.id = 'mhud'; hud.className = 'hud'; $('#room').appendChild(hud); }
    $('#hud').style.display = 'none';
    const facts = `${m.money ? `<div><b>${usd(m.money.usd)}</b><span>entry${m.bounty ? ` · ${usd(m.bounty)} KO` : ''}</span></div>` : '<div><b>free</b><span>practice</span></div>'}<div><b>${fmt(m.stack)}</b><span>starting chips</span></div><div><b>${m.rebuy ? 'until lv ' + m.rebuy.untilLevel : 'no'}</b><span>rebuys</span></div><div><b>${m.lateLevel ? 'until lv ' + m.lateLevel : 'no'}</b><span>late registration</span></div><div><b>${Math.round(m.levelMs / 60000)} min</b><span>per level</span></div>`;
    const showLobby = !m.started || (MS.myT < 0 && !MS.watching);
    box.className = showLobby ? 'mlobby on' : 'mlobby';
    put(box, showLobby ? `<div class="ml-in"><div class="ml-k">${m.started ? (m.finished ? 'finished' : 'running · level ' + (lv + 1)) : 'registering'}${m.public ? '' : ' · private'}</div><h2>${esc(m.name)}</h2>
      <div class="ml-pool"><div><b>${m.money ? usd(m.pool + m.bounty * m.entries) : m.entries}</b><span>${m.money ? 'total prize pool' : 'players'}</span></div><div><b>${m.entries}</b><span>entries</span></div><div><b>${m.left}</b><span>left</span></div><div><b>${m.tables.filter(t => !t.closed).length}</b><span>tables</span></div></div>
      <div class="ml-facts">${facts}</div>
      <div class="ml-acts">${!me && m.lateOpen ? `<button class="btn" data-mreg>${m.started ? 'late register' : 'register'}${m.money ? ' · ' + usd(m.money.usd) : ''}</button>` : ''}${me && !m.started && !isHost ? '<button class="btn gh" data-munreg>unregister</button>' : ''}${isHost && !m.started ? `<button class="btn" data-mstart ${m.entries < 2 ? 'disabled' : ''}>start tournament · ${m.entries} players</button>` : ''}${m.started ? '<button class="btn gh" data-mwatch>watch a table</button>' : ''}<button class="btn gh" data-mcopy>invite</button></div>
      <div class="ml-players">${m.players.map(p => `<span class="${p.out ? 'out' : ''}">${esc(p.name)}${p.out ? ' · ' + ord(p.place) : ''}${p.ko ? ` · ${p.ko} KO` : ''}</span>`).join('') || '<em>no one yet. be the first.</em>'}</div>
      ${m.money ? `<div class="ml-note">entries are paid in USDC to ${esc(m.bankName || 'the host')}’s wallet (the bank), who pays the prizes and bounties at the end. ${m.pay.length} places paid.</div>` : ''}</div>` : '');
    put(hud, m.started ? `<div class="chip2">${esc(m.name)} · table ${MS.viewT + 1}</div><div class="chip2">level ${lv + 1} · blinds <b>${short(m.blinds.sb)}/${short(m.blinds.bb)}</b> · next ${Math.floor(lvLeft / 60000)}:${String(Math.floor(lvLeft / 1000) % 60).padStart(2, '0')}</div><div class="chip2">${m.left} of ${m.entries} left · avg <b>${fmt(m.avg)}</b></div>${m.money ? `<div class="chip2 bank">prize pool <b>${usd(m.pool)}</b>${m.bounty ? ` · KO <b>${usd(m.bounty)}</b>` : ''}</div>` : ''}${m.lateOpen ? '<div class="chip2">late registration open</div>' : ''}${m.rebuyOpen ? '<div class="chip2">rebuys open</div>' : ''}${me && me.ko ? `<div class="chip2">your KOs: <b>${me.ko}</b> · ${usd(me.koUsd)}</div>` : ''}<div class="mtabs2"><button class="pill" data-mtables>tables</button>${MS.watching || MS.myT < 0 ? '<button class="pill" data-mlobbyv>lobby</button>' : ''}${me && !me.out && MS.viewT !== MS.myT && MS.myT >= 0 ? '<button class="pill" data-mmine>my table</button>' : ''}</div>` : '');
    const myS = MS.myT >= 0 && MS.ts[MS.myT] ? MS.ts[MS.myT].seats.find(s => s && s.uid === UID) : null;
    let bar = $('#mbar2'); if (!bar) { bar = document.createElement('div'); bar.id = 'mbar2'; bar.className = 'mybar'; bar.style.bottom = '60px'; $('#room').appendChild(bar); }
    put(bar, myS && myS.away ? '<button class="pill" data-mback style="background:var(--g);color:#03130a;border-color:var(--g)">i’m back</button>' : '');
  }
  function tablesOverlay() {
    const m = MS.meta; if (!m) return;
    showOver(`<h3>tables</h3><p>${m.left} players on ${m.tables.filter(t => !t.closed).length} tables. tap one to watch it.</p><div class="places">${m.tables.filter(t => !t.closed).map(t => `<div style="cursor:pointer" data-mview="${t.k}"><span>table ${t.k + 1}${t.k === MS.myT ? ' · yours' : ''}</span><b class="m">${t.n} players</b></div>`).join('')}</div><button class="btn w gh" data-mclose>close</button>`);
  }

  async function enterMtt(code) {
    MS.code = code; CODE = code; window.enterTable = () => enterMtt(code);
    document.body.style.overflow = 'hidden'; document.body.classList.add('inroom'); $('#room').classList.add('on'); $$('.page').forEach(p => p.classList.remove('on'));
    if (!P.name) { needName(); return; }
    const saved = st.get('mtt.' + code, null); MS.host = !!(saved && saved.hostUid === UID); if (MS.host) MS.T = saved;
    HOST = false; await myKeys();
    send = mSend; const orig = render; render = function () { orig(); panel(); };
    MS.ch = sb.channel('suited-m-' + code, { config: { broadcast: { self: false }, presence: { key: UID } } }); ch = MS.ch;
    MS.ch.on('broadcast', { event: 'tmeta' }, ({ payload }) => { if (!MS.host) onMeta(payload); });
    MS.ch.on('broadcast', { event: 'tstate' }, ({ payload }) => { if (!MS.host) onTs(payload); });
    MS.ch.on('broadcast', { event: 'mhole' }, async ({ payload }) => { if (payload.to !== UID || !MS.meta) return; try { HOLE = { hand: payload.hand, t: payload.t, cards: await unseal(MS.meta.hostPub, payload.box) }; render(); } catch (e) {} });
    MS.ch.on('broadcast', { event: 'req' }, ({ payload }) => { if (MS.host) mHandle(payload); });
    MS.ch.on('broadcast', { event: 'err' }, ({ payload }) => { if (payload.to === UID) toast(payload.e); });
    MS.ch.on('presence', { event: 'sync' }, () => { PUBS = {}; Object.values(MS.ch.presenceState()).flat().forEach(p => PUBS[p.uid] = p); });
    MS.ch.subscribe(async s => {
      if (s !== 'SUBSCRIBED') return; await MS.ch.track({ uid: UID, name: P.name, pub: KEYS.pub });
      if (MS.host) commitM(true); else { mSend('hello', {}); setTimeout(() => { if (!MS.meta) $('#msg').textContent = 'waiting for the host… they need to have the tournament open.'; }, 5000); }
    });
    if (MS.host) setInterval(mTick, 700);
    setInterval(() => { if (MS.meta) { panel(); render(); } }, 500);
  }

  document.addEventListener('click', e => {
    if (!MS.code) return; const t = e.target, m = MS.meta;
    if (t.closest('[data-copy],[data-mcopy]')) { e.stopImmediatePropagation(); navigator.clipboard?.writeText(location.origin + location.pathname + '#m/' + MS.code).then(() => toast('invite link copied')); return; }
    if (t.closest('[data-mreg]')) { if (!needName()) return; if (m.money && m.hostUid !== UID) { if (!P.wallet || P.wallet.kind !== 'sol') return walletModal();
        showOver(`<h3>${esc(m.name)}</h3><div class="bi-amt">${usd(m.money.usd)}</div><p>tournament entry${m.bounty ? ` (${usd(m.bounty)} is the bounty on your head)` : ''}${PRICING.fmtMxn(m.money.usd) ? ' · ' + PRICING.fmtMxn(m.money.usd) : ''}. paid in USDC from your Phantom to ${esc(m.bankName || 'the host')}’s wallet. you’re registered as soon as it confirms.</p><button class="btn w" data-mpay>pay ${usd(m.money.usd)} &amp; register</button>`); }
      else mSend('register', { wallet: P.wallet ? P.wallet.addr : '' }); return; }
    const pb = t.closest('[data-mpay]'); if (pb) { payThen('register', m.money.usd, pb); return; }
    if (t.closest('[data-munreg]')) { mSend('unregister', {}); return; }
    if (t.closest('[data-mstart]')) { mSend('start', {}); return; }
    const rb = t.closest('[data-mrebuy]'); if (rb) { if (m.money && m.hostUid !== UID) payThen('rebuy', m.rebuy.cost, rb); else { mSend('rebuy', {}); $('#over').classList.remove('on'); } return; }
    if (t.closest('[data-mdecline]')) { mSend('decline', {}); $('#over').classList.remove('on'); return; }
    if (t.closest('[data-mback]')) { mSend('back', {}); return; }
    if (t.closest('[data-mpayout]')) { payWinners(); return; }
    if (t.closest('[data-mtables]')) { tablesOverlay(); return; }
    if (t.closest('[data-mwatch]')) { MS.watching = true; const o = m.tables.find(x => !x.closed); if (o) MS.viewT = o.k; updateView(); panel(); return; }
    if (t.closest('[data-mlobbyv]')) { MS.watching = false; panel(); return; }
    if (t.closest('[data-mmine]')) { MS.viewT = MS.myT; updateView(); panel(); return; }
    const mv = t.closest('[data-mview]'); if (mv) { MS.viewT = +mv.dataset.mview; MS.watching = true; $('#over').classList.remove('on'); updateView(); panel(); return; }
    if (t.closest('[data-mclose]')) { $('#over').classList.remove('on'); return; }
  }, true);

  const mm = location.hash.match(/^#m\/([A-Z0-9]{6})$/i); if (mm) enterMtt(mm[1].toUpperCase());
  addEventListener('hashchange', () => { if (/^#m\//.test(location.hash)) location.reload(); });
})();
