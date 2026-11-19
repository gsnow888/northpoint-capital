/* Torneos multimesa (MTT): muchas mesas de 9, balanceo, rotura de mesas hasta la mesa final,
   KO (recompensa por eliminar a alguien), recompras y registro tardío. Sin red: lo corre el anfitrión. */
(function (root) {
  const H = root.Holdem;
  // reparto del premio según cuántos entraron (como en las salas grandes: ~15% cobra)
  function payStruct(n) {
    if (n <= 4) return [1]; if (n <= 6) return [.65, .35]; if (n <= 9) return [.5, .3, .2];
    if (n <= 18) return [.4, .25, .17, .11, .07]; if (n <= 27) return [.35, .22, .15, .1, .08, .06, .04];
    if (n <= 50) return [.3, .2, .14, .1, .08, .06, .05, .04, .03];
    const k = Math.ceil(n * .15), w = Array.from({ length: k }, (_, i) => 1 / Math.pow(i + 1, 1.05)), s = w.reduce((a, b) => a + b, 0); return w.map(x => x / s);
  }
  function create(cfg) {
    return { kind: 'mtt', code: cfg.code, name: cfg.name || 'tournament', hostUid: cfg.hostUid, money: cfg.money || null, bounty: cfg.bounty || 0,
      rebuy: cfg.rebuy || null, lateLevel: cfg.lateLevel || 0, stack: cfg.stack || 3000, levelMs: cfg.levelMs || 300000, bb0: cfg.bb0 || 40, venue: cfg.venue || 0,
      public: !!cfg.public, level: 0, levelAt: 0, started: false, finished: false, players: {}, order: [], tables: [], places: [], pool: 0, log: [], results: null, payout: null, used: {} };
  }
  const alive = T => T.order.filter(u => T.players[u] && !T.players[u].out);
  const curLevel = (T, now) => T.started ? Math.min(H.LEVELS.length - 1, Math.floor((now - T.levelAt) / T.levelMs)) : 0;
  const blinds = T => { const bb = Math.round(T.bb0 * H.LEVELS[T.level]); return { bb, sb: Math.max(1, Math.floor(bb / 2)) }; };
  const log = (T, s) => { T.log.push(s); if (T.log.length > 40) T.log.shift(); };
  const seated = g => g.seats.filter(Boolean).length;
  const openTables = T => T.tables.map((g, k) => k).filter(k => !T.tables[k].closed);
  const rebuyOpen = T => !!(T.rebuy && T.level < T.rebuy.untilLevel);
  const lateOpen = (T, now) => !T.finished && (!T.started || curLevel(T, now) < T.lateLevel);

  function mkTable(T) {
    const k = T.tables.length, { sb, bb } = blinds(T);
    const g = H.newTable({ code: T.code + '-' + (k + 1), name: `${T.name} · table ${k + 1}`, mode: 'cash', sb, bb, buyin: T.stack, venue: T.venue }, T.hostUid);
    g.tIdx = k; g.mtt = 1; T.tables.push(g); return k;
  }
  function seatAt(T, uid, k, stack) {
    const g = T.tables[k], free = g.seats.map((s, i) => s ? -1 : i).filter(i => i >= 0); if (!free.length) return false;
    const i = free[Math.floor(Math.random() * free.length)], pl = T.players[uid];
    H.sit(g, { uid, name: pl.name, seat: i, avatar: pl.avatar, lvl: pl.lvl }); g.seats[i].stack = stack; g.seats[i].wallet = pl.wallet; pl.t = k; return true;
  }
  function seatAnywhere(T, uid, stack) {
    const ks = openTables(T).filter(k => seated(T.tables[k]) < 9).sort((a, b) => seated(T.tables[a]) - seated(T.tables[b]));
    return seatAt(T, uid, ks.length ? ks[0] : mkTable(T), stack);
  }
  function register(T, p, now) {
    if (!lateOpen(T, now)) return T.finished ? 'the tournament is over' : 'registration is closed';
    const ex = T.players[p.uid]; if (ex && !ex.out) return 'you are already registered';
    if (ex && ex.out) return 'you are already out of this tournament';
    T.players[p.uid] = { uid: p.uid, name: String(p.name || 'player').slice(0, 16), wallet: p.wallet || '', avatar: p.avatar || '', lvl: p.lvl || 1, t: -1, out: false, place: 0,
      ko: 0, koUsd: 0, rebuys: 0, bust: false, wait: 0, bustBy: null, paid: p.sig || '' };
    T.order.push(p.uid); if (T.money) T.pool += T.money.usd - T.bounty;
    log(T, `${T.players[p.uid].name} ${T.started ? 'late-registered' : 'registered'}`);
    if (T.started) seatAnywhere(T, p.uid, T.stack);
    return null;
  }
  function unregister(T, uid) {
    if (T.started) return 'the tournament already started'; if (!T.players[uid]) return 'not registered';
    delete T.players[uid]; T.order = T.order.filter(u => u !== uid); if (T.money) T.pool -= T.money.usd - T.bounty; return null;
  }
  function start(T, now) {
    const A = alive(T); if (A.length < 2) return 'you need at least 2 players';
    T.started = true; T.levelAt = now; T.level = 0; const nt = Math.ceil(A.length / 9);
    for (let k = 0; k < nt; k++) mkTable(T);
    [...A].sort(() => Math.random() - .5).forEach((u, i) => seatAt(T, u, i % nt, T.stack));
    T.tables.forEach(g => { g.nextAt = now + 3000; });
    log(T, `tournament starts · ${A.length} players · ${nt} table${nt > 1 ? 's' : ''}`); return null;
  }
  function eliminate(T, uid) {
    const pl = T.players[uid]; if (!pl || pl.out) return;
    const g = T.tables[pl.t]; if (g) { const i = g.seats.findIndex(s => s && s.uid === uid); if (i >= 0) g.seats[i] = null; }
    pl.out = true; pl.wait = 0; pl.bust = false; T.outN = (T.outN || 0) + 1; pl.outIdx = T.outN; pl.place = alive(T).length + 1; T.places.unshift({ uid, name: pl.name, place: pl.place });
    const k = pl.bustBy && T.players[pl.bustBy];
    if (T.bounty && k && pl.bustBy !== uid) { k.ko++; k.koUsd += T.bounty; log(T, `${k.name} knocks out ${pl.name} (${pl.place}th) · +$${T.bounty}`); }
    else log(T, `${pl.name} is out in place ${pl.place}`);
  }
  function doRebuy(T, uid) {
    const pl = T.players[uid]; if (!pl || pl.out) return 'you are not in the tournament'; if (!rebuyOpen(T)) return 'rebuys are closed';
    const g = T.tables[pl.t], s = g && g.seats.find(x => x && x.uid === uid); if (!s) return 'no seat found'; if (s.stack > 0) return 'you still have chips';
    s.stack += T.rebuy.chips; s.sitout = false; s.timeouts = 0; pl.bust = false; pl.wait = 0; pl.rebuys++; if (T.money) T.pool += T.rebuy.cost;
    log(T, `${pl.name} rebuys`); return null;
  }
  function back(T, uid) { const pl = T.players[uid], g = pl && T.tables[pl.t], s = g && g.seats.find(x => x && x.uid === uid); if (s) { s.away = false; s.timeouts = 0; } }
  function decline(T, uid) { const pl = T.players[uid]; if (pl && pl.wait) eliminate(T, uid); }
  function afterHand(T, k, now) {
    const g = T.tables[k], R = g.results;
    g.seats.forEach(s => {
      if (!s || s.stack > 0) return; const pl = T.players[s.uid]; if (!pl || pl.out || pl.bust) return;
      pl.bust = true; let by = null;
      if (R && R.pots && R.pots.length) { const w = g.seats[R.pots[0].winners[0]]; by = w && w.uid !== s.uid ? w.uid : null; }
      pl.bustBy = by;
      if (rebuyOpen(T)) { s.sitout = true; pl.wait = now; } else eliminate(T, s.uid);
    });
    balance(T, k);
  }
  function expireRebuys(T, now) {
    T.order.forEach(u => { const pl = T.players[u]; if (pl && !pl.out && pl.wait && (!rebuyOpen(T) || now - pl.wait > 60000)) eliminate(T, u); });
  }
  function balance(T, k) {
    const g = T.tables[k]; if (g.closed) return; const open = openTables(T), need = Math.max(1, Math.ceil(alive(T).length / 9)), cnt = x => seated(T.tables[x]);
    if (open.length > need) { // romper la mesa más chica (solo si es esta, que está entre manos)
      const smallest = [...open].sort((a, b) => cnt(a) - cnt(b) || b - a)[0];
      if (smallest === k) {
        const movers = g.seats.filter(Boolean).map(s => ({ uid: s.uid, stack: s.stack, sitout: s.sitout }));
        g.seats.fill(null); g.closed = true; g.phase = 'closed';
        movers.forEach(m => { const to = openTables(T).filter(x => cnt(x) < 9).sort((a, b) => cnt(a) - cnt(b))[0]; if (to != null) { seatAt(T, m.uid, to, m.stack); const ns = T.tables[to].seats.find(x => x && x.uid === m.uid); if (ns) ns.sitout = m.sitout; } });
        log(T, open.length - 1 === 1 ? 'final table!' : `table ${k + 1} breaks`); return;
      }
    }
    const mn = Math.min(...open.map(cnt));
    if (cnt(k) - mn >= 2) { // mover a un jugador a la mesa con menos gente
      const to = open.find(x => cnt(x) === mn), cand = g.seats.map((s, i) => s ? i : -1).filter(i => i >= 0 && i !== g.button);
      const i = cand[Math.floor(Math.random() * cand.length)], s = g.seats[i]; g.seats[i] = null; seatAt(T, s.uid, to, s.stack);
      const ns = T.tables[to].seats.find(x => x && x.uid === s.uid); if (ns) ns.sitout = s.sitout; log(T, `${s.name} moves to table ${to + 1}`);
    }
  }
  function finish(T) {
    const A = alive(T); if (A.length !== 1 || T.finished) return; const w = T.players[A[0]];
    // lugares finales por orden de eliminación (cuenta también a los que entraron tarde)
    const N = T.order.length; T.order.forEach(u => { const p = T.players[u]; if (p.out) p.place = N - p.outIdx + 1; }); w.place = 1;
    T.places = T.order.map(u => T.players[u]).sort((a, b) => a.place - b.place).map(p => ({ uid: p.uid, name: p.name, place: p.place })); if (T.bounty) w.koUsd += T.bounty; // el campeón se queda con su propia recompensa
    T.finished = true; T.tables.forEach(g => { g.phase = 'closed'; g.toAct = -1; });
    const pay = payStruct(T.order.length);
    T.results = T.order.map(u => { const pl = T.players[u], prize = pl.place <= pay.length ? Math.floor(T.pool * pay[pl.place - 1] * 100) / 100 : 0;
      return { uid: u, name: pl.name, wallet: pl.wallet, place: pl.place, prize, ko: pl.ko, koUsd: pl.koUsd, rebuys: pl.rebuys, total: Math.round((prize + pl.koUsd) * 100) / 100 }; }).sort((a, b) => a.place - b.place);
    log(T, `${w.name} wins the tournament`);
  }
  // un paso del reloj: tiempos, niveles, manos que terminan, eliminaciones, balanceo y repartir la siguiente
  function tick(T, now) {
    const ch = new Set(); if (!T.started || T.finished) return ch;
    const L = curLevel(T, now); if (L !== T.level) { T.level = L; log(T, `blinds up · level ${L + 1}`); ch.add('meta'); }
    const before = alive(T).length; expireRebuys(T, now); if (alive(T).length !== before) ch.add('all');
    for (const k of openTables(T)) {
      const g = T.tables[k]; if (g.closed) continue;
      if (H.timeout(g, now)) ch.add(k);
      // en torneo nadie se sale de la mesa: el que no juega queda 'away', paga ciegas y se retira solo al instante
      g.seats.forEach(s => { if (s && s.sitout && s.stack > 0 && !(T.players[s.uid] && T.players[s.uid].wait)) { s.sitout = false; s.away = true; } });
      for (let guard = 0; guard < 9 && H.inBetting(g); guard++) { const p = g.seats[g.toAct]; if (!p || !p.away) break; H.act(g, p.uid, g.curBet - p.bet > 0 ? 'fold' : 'check', 0, true); p.timeouts = 0; ch.add(k); }
      const ended = g.phase === 'showdown' && now > g.nextAt;
      if (ended) { afterHand(T, k, now); ch.add('all'); if (g.closed) continue; }
      else if (g.phase === 'waiting') { const n0 = seated(g); balance(T, k); if (g.closed || seated(g) !== n0) ch.add('all'); if (g.closed) continue; }
      if ((ended || g.phase === 'waiting') && now > (g.nextAt || 0) && alive(T).length > 1) {
        const elig = g.seats.filter(s => s && s.stack > 0 && !s.sitout).length;
        if (elig >= 2) { const b = blinds(T); g.sb = b.sb; g.bb = b.bb; H.startHand(g); ch.add(k); ch.add('deal:' + k); }
        else if (ended) { g.phase = 'waiting'; g.toAct = -1; ch.add(k); }
      }
    }
    if (alive(T).length === 1) { finish(T); ch.add('all'); }
    return ch;
  }
  function meta(T, now) {
    const A = alive(T), stacks = {}; T.tables.forEach(g => g.seats.forEach(s => { if (s) stacks[s.uid] = s.stack; }));
    return { kind: 'mtt', code: T.code, name: T.name, hostUid: T.hostUid, money: T.money, bounty: T.bounty, rebuy: T.rebuy, lateLevel: T.lateLevel, lateOpen: lateOpen(T, now),
      stack: T.stack, level: T.level, levelAt: T.levelAt, levelMs: T.levelMs, bb0: T.bb0, started: T.started, finished: T.finished, pool: T.pool, venue: T.venue, public: T.public,
      left: A.length, entries: T.order.length, rebuys: T.order.reduce((a, u) => a + (T.players[u] ? T.players[u].rebuys : 0), 0),
      avg: A.length ? Math.round(A.reduce((a, u) => a + (stacks[u] || 0), 0) / A.length) : 0, blinds: blinds(T), rebuyOpen: rebuyOpen(T), payout: T.payout, results: T.results,
      log: T.log.slice(-14), places: T.places.slice(0, 60), pay: payStruct(T.order.length),
      tables: T.tables.map((g, k) => ({ k, closed: !!g.closed, n: seated(g) })),
      players: T.order.map(u => { const p = T.players[u]; return { uid: u, name: p.name, t: p.t, out: p.out, place: p.place, ko: p.ko, koUsd: p.koUsd, rebuys: p.rebuys, wait: !!p.wait, stack: stacks[u] || 0, paid: !!p.paid }; }) };
  }
  root.MTT = { back, create, register, unregister, start, tick, doRebuy, decline, meta, payStruct, alive, blinds, lateOpen, rebuyOpen };
})(typeof window !== 'undefined' ? window : globalThis);
