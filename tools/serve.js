/* serve.js — servidor estático mínimo para verificar el sitio local (sin dependencias).
   Uso: node serve.js <dir> <puerto> */
const http = require('http'), fs = require('fs'), path = require('path');
const DIR = path.resolve(process.argv[2] || '.'), PORT = +(process.argv[3] || 8080);
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.mp4': 'video/mp4', '.py': 'text/plain' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  let f = path.join(DIR, p);
  if (!f.startsWith(DIR)) { res.writeHead(403); return res.end(); }
  fs.stat(f, (e, st) => {
    if (e || !st.isFile()) { res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); return fs.createReadStream(path.join(DIR, '404.html')).on('error', () => res.end('404')).pipe(res); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(f).pipe(res);
  });
}).listen(PORT, () => console.log('sirviendo ' + DIR + ' en http://localhost:' + PORT));
