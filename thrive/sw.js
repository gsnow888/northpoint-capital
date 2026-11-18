/* Thrive · service worker: la app abre al instante y funciona sin red (los datos de mercado siempre vienen en vivo). */
const VERSION = 'thrive-v1';
const SHELL = ['./', 'index.html', 'app.html', 'hl-sign.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'img/espacio.jpg',
  ...Array.from({ length: 16 }, (_, i) => `av/${String(i + 1).padStart(2, '0')}.jpg`)];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return; // APIs y datos de mercado: siempre de la red
  if (u.pathname.endsWith('/data/leaderboard.json')) return;
  // misma app: responde del caché y actualiza en segundo plano
  e.respondWith(caches.open(VERSION).then(async c => {
    const hit = await c.match(e.request, { ignoreSearch: true });
    const net = fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  }));
});
