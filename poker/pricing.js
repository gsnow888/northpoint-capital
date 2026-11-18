/* Precios en DÓLARES. Se paga en USDC (1 USDC = 1 dólar) desde la wallet de cada jugador.
   Adentro de la mesa todo es en fichas; el buy-in en dólares compra las fichas de la mesa. */
window.PRICING = {
  network: 'mainnet', // 'mainnet' = dinero real · 'devnet' = USDC de prueba
  token: { mainnet: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', devnet: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU', decimals: 6, symbol: 'USDC' },
  tiers: [ // buy-in en dólares por tarjeta (mismo orden que las mesas)
    { name: 'Classic', usd: 5 }, { name: 'Silver', usd: 25 }, { name: 'Gold', usd: 100 }, { name: 'Platinum', usd: 500 },
    { name: 'Black', usd: 2000 }, { name: 'Diamond', usd: 10000 }, { name: 'Double Diamond', usd: 25000 }],
  entries: [ // torneos: entrada en dólares y tarjeta de mesa
    { k: 'starter', usd: 10, tier: 0 }, { k: 'pro', usd: 50, tier: 2 }, { k: 'high roller', usd: 250, tier: 4 }, { k: 'major', usd: 1000, tier: 6 }],
  px: { mxn: null },
  async load() { try { const r = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=mxn'); const d = await r.json(); this.px.mxn = d['usd-coin'].mxn; } catch (e) {} return this.px; },
  fmtUsd(n) { if (n == null) return ''; const v = Math.round(n * 100) / 100; if (v >= 1e6) return '$' + (v / 1e6).toFixed(v % 1e6 ? 1 : 0) + 'M'; return '$' + v.toLocaleString('en-US', { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 }); },
  fmtMxn(n) { return this.px.mxn ? '≈ $' + Math.round(n * this.px.mxn).toLocaleString('en-US') + ' MXN' : ''; }
};
