/* Thrive · service worker.
   Páginas (HTML) y scripts propios: primero la red → siempre la versión nueva; sin conexión, la copia guardada.
   Imágenes e íconos: del caché y se actualizan en segundo plano.
   APIs y datos de mercado: nunca pasan por aquí (siempre en vivo). */
const VERSION = 'thrive-v12';
const SHELL = ['./', 'index.html', 'app.html', 'help.html', 'hl-sign.js', 'i18n.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'img/espacio.webp','img/espacio-1200.webp',
  ...Array.from({ length: 16 }, (_, i) => `av/${String(i + 1).padStart(2, '0')}.jpg`)];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, u = new URL(req.url);
  if (req.method !== 'GET' || u.origin !== location.origin || u.pathname.includes('/data/')) return;
  const fresh = req.mode === 'navigate' || /(\.html|\.js|\.webmanifest|\/)$/.test(u.pathname);
  if (fresh) {
    e.respondWith(fetch(req, { cache: 'no-cache' })
      .then(r => { if (r.ok) { const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp)); } return r; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(h => h || caches.match('app.html'))));
    return;
  }
  e.respondWith(caches.open(VERSION).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  }));
});
