/* Motor de Texas Hold'em (sin red): mesa de 9, ciegas, rondas de apuestas, botes laterales y ranking de manos.
   Lo corre el anfitrión de la mesa; los demás solo ven el estado público. Funciona igual en el navegador y en Node. */
(function (root) {
  const RANKS = '23456789TJQKA', SUITS = 'shdc', SEATS = 9, TURN_MS = 25000;
  const CAT = ['high card', 'pair', 'two pair', 'three of a kind', 'straight', 'flush', 'full house', 'four of a kind', 'straight flush'];

  function shuffle(rng) { const d = [...Array(52).keys()]; for (let i = 51; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [d[i], d[j]] = [d[j], d[i]]; } return d; }
  const cardStr = c => RANKS[c % 13] + SUITS[Math.floor(c / 13)];

  function eval5(cs) {
    const r = cs.map(c => c % 13).sort((a, b) => b - a), s = cs.map(c => Math.floor(c / 13));
    const flush = s.every(x => x === s[0]), cnt = {};
    r.forEach(x => cnt[x] = (cnt[x] || 0) + 1);
    const g = Object.entries(cnt).map(([k, v]) => [v, +k]).sort((a, b) => b[0] - a[0] || b[1] - a[1]);
    const u = [...new Set(r)]; let st = -1;
    if (u.length === 5) { if (u[0] - u[4] === 4) st = u[0]; else if (u.join() === '12,3,2,1,0') st = 3; }
    let cat, k;
    if (st >= 0 && flush) { cat = 8; k = [st]; }
    else if (g[0][0] === 4) { cat = 7; k = [g[0][1], g[1][1]]; }
    else if (g[0][0] === 3 && g[1][0] === 2) { cat = 6; k = [g[0][1], g[1][1]]; }
    else if (flush) { cat = 5; k = r; }
    else if (st >= 0) { cat = 4; k = [st]; }
    else if (g[0][0] === 3) { cat = 3; k = g.map(x => x[1]); }
    else if (g[0][0] === 2 && g[1][0] === 2) { cat = 2; k = g.map(x => x[1]); }
    else if (g[0][0] === 2) { cat = 1; k = g.map(x => x[1]); }
    else { cat = 0; k = r; }
    let v = cat; for (let i = 0; i < 5; i++) v = v * 13 + (k[i] || 0); return v;
  }
  function best(cards) {
    let bv = -1, bc = null; const n = cards.length;
    for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) for (let c = b + 1; c < n; c++) for (let d = c + 1; d < n; d++) for (let e = d + 1; e < n; e++) {
      const h = [cards[a], cards[b], cards[c], cards[d], cards[e]], v = eval5(h); if (v > bv) { bv = v; bc = h; }
    }
    return { v: bv, cards: bc, name: CAT[Math.floor(bv / Math.pow(13, 5))] };
  }

  // estructura de ciegas de torneo: sube cada nivel (multiplicadores sobre la ciega grande inicial)
  const LEVELS = [1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 100, 150, 200];
  function payouts(n) { return n <= 4 ? [1] : n <= 6 ? [0.65, 0.35] : [0.5, 0.3, 0.2]; }
  function newTable(cfg, hostUid) {
    return { v: 2, code: cfg.code, name: cfg.name || 'private table', mode: cfg.mode || 'cash', venue: cfg.venue || 0, public: !!cfg.public,
      sb: cfg.sb, bb: cfg.bb, buyin: cfg.buyin, stack: cfg.stack || cfg.buyin, levelMs: cfg.levelMs || 300000, level: 0, levelAt: 0, bb0: cfg.bb,
      started: false, places: [], prize: 0, hostUid,
      seats: Array(SEATS).fill(null), button: -1, phase: 'waiting', board: [], curBet: 0, minRaise: 0, toAct: -1,
      handNo: 0, deadline: 0, nextAt: 0, results: null, log: [], priv: { deck: [], holes: {} } };
  }
  const nextSeat = (G, from, pred) => { for (let k = 1; k <= SEATS; k++) { const i = ((from + k) % SEATS + SEATS) % SEATS, p = G.seats[i]; if (p && pred(p, i)) return i; } return -1; };
  const needs = (G, p) => p.inHand && !p.folded && !p.allin && (!p.acted || p.bet < G.curBet);
  const live = G => G.seats.map((p, i) => [p, i]).filter(([p]) => p && p.inHand && !p.folded);
  const log = (G, t) => { G.log.push(t); if (G.log.length > 40) G.log.shift(); };
  function post(G, i, amt) { const p = G.seats[i], a = Math.max(0, Math.min(amt, p.stack)); p.stack -= a; p.bet += a; p.contrib += a; if (p.stack === 0 && p.inHand) p.allin = true; return a; }
  const pot = G => G.seats.reduce((a, p) => a + (p ? p.contrib : 0), 0);

  function sit(G, { uid, name, seat, avatar, lvl }) {
    if (G.seats.some(p => p && p.uid === uid)) return 'you are already seated';
    if (seat < 0 || seat >= SEATS || G.seats[seat]) return 'that seat is taken';
    if (G.mode === 'sng' && G.started) return 'this tournament already started';
    G.seats[seat] = { uid, name: String(name || 'player').slice(0, 16), avatar: typeof avatar === 'string' && avatar.length < 12000 ? avatar : '', lvl: +lvl || 1, stack: G.mode === 'sng' ? G.stack : G.buyin, bet: 0, contrib: 0, inHand: false, folded: false, allin: false, acted: false, sitout: false, timeouts: 0, leaving: false };
    if (G.mode === 'sng') G.prize += G.buyin;
    log(G, `${G.seats[seat].name} ${G.mode === 'sng' ? 'registered' : 'sat down with ' + G.buyin}`); return null;
  }
  const eligible = G => G.seats.filter(p => p && p.stack > 0 && !p.sitout && !p.leaving);
  const inBetting = G => ['preflop', 'flop', 'turn', 'river'].includes(G.phase);

  function bust(G) { // torneo: quien se quedó sin fichas queda eliminado, con su lugar
    if (G.mode !== 'sng' || !G.started) return;
    const out = G.seats.map((p, i) => [p, i]).filter(([p]) => p && p.stack === 0 && !p.out);
    out.sort((a, b) => b[0].contrib - a[0].contrib).forEach(([p]) => { p.out = true; p.sitout = true; const left = G.seats.filter(q => q && !q.out).length; G.places.unshift({ uid: p.uid, name: p.name, place: left + 1 }); log(G, `${p.name} is out in place ${left + 1}`); });
    const alive = G.seats.filter(p => p && !p.out);
    if (alive.length === 1) {
      const w = alive[0]; G.places.unshift({ uid: w.uid, name: w.name, place: 1 });
      const n = G.places.length, pay = payouts(n);
      G.places.forEach(pl => { pl.prize = pl.place <= pay.length ? Math.floor(G.prize * pay[pl.place - 1]) : 0; });
      G.phase = 'finished'; G.toAct = -1; log(G, `${w.name} wins the tournament · ${G.places[0].prize}`);
    }
  }
  function startHand(G, rng = Math.random) {
    if (G.phase === 'finished') return 'tournament finished';
    bust(G); if (G.phase === 'finished') return 'tournament finished';
    if (G.mode === 'sng') {
      if (!G.started) { if (eligible(G).length < 2) { G.phase = 'waiting'; return 'waiting for players'; } G.started = true; G.levelAt = Date.now(); log(G, `tournament starts · ${eligible(G).length} players · prize pool ${G.prize}`); }
      const lv = Math.min(LEVELS.length - 1, Math.floor((Date.now() - G.levelAt) / G.levelMs));
      if (lv !== G.level) { G.level = lv; log(G, `blinds up · level ${lv + 1}`); }
      G.bb = Math.round(G.bb0 * LEVELS[G.level]); G.sb = Math.max(1, Math.floor(G.bb / 2));
    }
    G.seats.forEach((p, i) => { if (p && p.leaving && !(G.mode === 'sng' && G.started)) G.seats[i] = null; });
    if (eligible(G).length < 2) { G.phase = 'waiting'; G.toAct = -1; return 'waiting for players'; }
    G.seats.forEach(p => { if (p) Object.assign(p, { bet: 0, contrib: 0, folded: false, allin: false, acted: false, inHand: p.stack > 0 && !p.sitout }); });
    const inH = p => p.inHand;
    G.button = nextSeat(G, G.button < 0 ? SEATS - 1 : G.button, inH);
    G.handNo++; G.board = []; G.results = null; G.phase = 'preflop';
    const n = G.seats.filter(p => p && p.inHand).length;
    const sbi = n === 2 ? G.button : nextSeat(G, G.button, inH), bbi = nextSeat(G, sbi, inH);
    post(G, sbi, G.sb); post(G, bbi, G.bb); G.curBet = G.bb; G.minRaise = G.bb; G.sbi = sbi; G.bbi = bbi;
    const deck = shuffle(rng), holes = {};
    for (let r = 0; r < 2; r++) for (let k = 1; k <= SEATS; k++) { const i = (G.button + k) % SEATS; if (G.seats[i] && G.seats[i].inHand) (holes[i] = holes[i] || []).push(deck.pop()); }
    G.priv = { deck, holes };
    log(G, `hand #${G.handNo} · ${G.seats[sbi].name} posts ${G.sb}, ${G.seats[bbi].name} posts ${G.bb}`);
    const nx = nextSeat(G, bbi, p => needs(G, p));
    if (nx < 0) endStreet(G); else { G.toAct = nx; G.deadline = Date.now() + TURN_MS; }
    return null;
  }

  function act(G, uid, type, amount, auto) {
    if (!inBetting(G)) return 'no hand in progress';
    const i = G.toAct, p = G.seats[i];
    if (!p || (!auto && p.uid !== uid)) return 'it is not your turn';
    const toCall = G.curBet - p.bet;
    if (type === 'check' && toCall > 0) return 'you cannot check, there is a bet';
    if (type === 'call' && toCall <= 0) type = 'check';
    if (type === 'fold') { p.folded = true; log(G, `${p.name} folds`); }
    else if (type === 'check') log(G, `${p.name} checks`);
    else if (type === 'call') { const a = post(G, i, toCall); log(G, `${p.name} calls ${a}${p.allin ? ' (all-in)' : ''}`); }
    else if (type === 'raise') {
      const maxTo = p.bet + p.stack; let to = Math.floor(+amount || 0); if (to >= maxTo) to = maxTo;
      if (to <= G.curBet) { if (to === maxTo) return act(G, uid, 'call', 0, auto); return `the bet must be above ${G.curBet}`; }
      const inc = to - G.curBet;
      if (to < maxTo && inc < G.minRaise) return `the minimum is ${G.curBet + G.minRaise}`;
      post(G, i, to - p.bet);
      if (inc >= G.minRaise) { G.minRaise = inc; G.seats.forEach((q, k) => { if (q && k !== i) q.acted = false; }); }
      log(G, `${p.name} ${G.curBet === 0 ? 'bets' : 'raises to'} ${to}${p.allin ? ' (all-in)' : ''}`);
      G.curBet = Math.max(G.curBet, to);
    } else return 'unknown action';
    p.acted = true; if (!auto) p.timeouts = 0;
    progress(G, i); return null;
  }

  function progress(G, i) {
    const L = live(G);
    if (L.length === 1) return winByFold(G, L[0][1]);
    const nx = nextSeat(G, i, p => needs(G, p));
    if (nx >= 0) { G.toAct = nx; G.deadline = Date.now() + TURN_MS; return; }
    endStreet(G);
  }

  function endStreet(G) {
    G.seats.forEach(p => { if (p) { p.bet = 0; p.acted = false; } }); G.curBet = 0; G.minRaise = G.bb;
    const d = G.priv.deck, deal = n => { d.pop(); for (let k = 0; k < n; k++) G.board.push(d.pop()); };
    if (G.phase === 'preflop') { deal(3); G.phase = 'flop'; }
    else if (G.phase === 'flop') { deal(1); G.phase = 'turn'; }
    else if (G.phase === 'turn') { deal(1); G.phase = 'river'; }
    else return showdown(G);
    const canAct = G.seats.filter(p => p && p.inHand && !p.folded && !p.allin).length;
    if (canAct <= 1) return endStreet(G);
    G.toAct = nextSeat(G, G.button, p => needs(G, p)); G.deadline = Date.now() + TURN_MS;
  }

  function award(G, i, amt) { G.seats[i].stack += amt; }
  function finish(G, results) { G.results = results; G.phase = 'showdown'; G.toAct = -1; G.nextAt = Date.now() + 6000; }

  function winByFold(G, i) {
    const amt = pot(G); award(G, i, amt); log(G, `${G.seats[i].name} wins ${amt}`);
    finish(G, { pots: [{ amount: amt, winners: [i], hand: null }], shown: {} });
  }

  function showdown(G) {
    const L = live(G), H = {}, shown = {};
    L.forEach(([p, i]) => { H[i] = best(G.priv.holes[i].concat(G.board)); shown[i] = G.priv.holes[i]; });
    const all = G.seats.map((p, i) => [p, i]).filter(([p]) => p && p.contrib > 0);
    const levels = [...new Set(all.map(([p]) => p.contrib))].sort((a, b) => a - b);
    let prev = 0; const pots = [];
    for (const lv of levels) {
      const amount = all.reduce((a, [p]) => a + Math.max(0, Math.min(p.contrib, lv) - prev), 0);
      const elig = L.filter(([p]) => p.contrib >= lv).map(([, i]) => i);
      if (!elig.length) { if (pots.length) pots[pots.length - 1].amount += amount; prev = lv; continue; }
      const last = pots[pots.length - 1];
      if (last && last.elig.join() === elig.join()) last.amount += amount; else pots.push({ amount, elig });
      prev = lv;
    }
    const dist = i => (i - G.button + SEATS) % SEATS || SEATS;
    const out = pots.map(pt => {
      const top = Math.max(...pt.elig.map(i => H[i].v)), w = pt.elig.filter(i => H[i].v === top).sort((a, b) => dist(a) - dist(b));
      const share = Math.floor(pt.amount / w.length); let rem = pt.amount - share * w.length;
      w.forEach(i => { award(G, i, share + (rem > 0 ? 1 : 0)); if (rem > 0) rem--; });
      log(G, `${w.map(i => G.seats[i].name).join(' & ')} ${w.length > 1 ? 'split' : 'wins'} ${pt.amount} with ${H[w[0]].name}`);
      return { amount: pt.amount, winners: w, hand: H[w[0]].name, cards: H[w[0]].cards };
    });
    const hands = {}; Object.keys(H).forEach(i => hands[i] = H[i].name);
    finish(G, { pots: out, shown, hands });
  }

  function timeout(G, now = Date.now()) {
    if (!inBetting(G) || now < G.deadline) return false;
    const p = G.seats[G.toAct]; if (!p) return false;
    p.timeouts++; if (p.timeouts >= 2) p.sitout = true;
    act(G, p.uid, G.curBet - p.bet > 0 ? 'fold' : 'check', 0, true); return true;
  }

  function leave(G, uid) {
    const i = G.seats.findIndex(p => p && p.uid === uid); if (i < 0) return 'not seated';
    const p = G.seats[i];
    if (!inBetting(G) || !p.inHand || p.folded) { if (inBetting(G) && p.inHand) p.leaving = true; else G.seats[i] = null; log(G, `${p.name} left`); return null; }
    p.leaving = true;
    if (G.toAct === i) return act(G, uid, 'fold', 0);
    p.folded = true; log(G, `${p.name} left and folds`); progress(G, G.toAct - 1 < 0 ? SEATS - 1 : G.toAct - 1);
    return null;
  }
  function rebuy(G, uid) { if (G.mode === 'sng') return 'no rebuys in tournaments'; const p = G.seats.find(p => p && p.uid === uid); if (!p) return 'not seated'; if (p.stack > 0 || (inBetting(G) && p.inHand && !p.folded)) return 'you still have chips'; p.stack = G.buyin; log(G, `${p.name} rebuys ${G.buyin}`); return null; }
  function sitout(G, uid, on) { const p = G.seats.find(p => p && p.uid === uid); if (!p) return 'not seated'; p.sitout = !!on; if (!on) p.timeouts = 0; return null; }
  function publicView(G) { const o = JSON.parse(JSON.stringify(G)); delete o.priv; o.pot = pot(G); return o; }

  root.Holdem = { LEVELS, payouts, bust, SEATS, TURN_MS, RANKS, SUITS, CAT, newTable, sit, startHand, act, timeout, leave, rebuy, sitout, publicView, best, eval5, cardStr, shuffle, inBetting, eligible, pot };
})(typeof window !== 'undefined' ? window : globalThis);
