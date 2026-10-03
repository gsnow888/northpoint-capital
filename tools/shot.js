#!/usr/bin/env node
/* tools/shot.js — captura de página COMPLETA con viewport real, por CDP. Sin dependencias.
 *
 * Por qué no `chrome --screenshot`: captura exactamente el tamaño de la ventana, nunca
 * más. Para ver una página larga había que pedir --window-size=W,6000, y entonces
 * 100vh vale 6000px: el hero se estira a seis mil píxeles y lo que se mide ya no es
 * el layout que ve nadie. Aquí el viewport es real (812 en móvil, 900 en escritorio)
 * y la captura se extiende más allá de él con captureBeyondViewport.
 *
 * Uso: node tools/shot.js <url> <salida.png> <ancho> [alto-viewport] [--full|--fold]
 */
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const net = require('node:net');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const argv = process.argv.slice(2);
const evalIdx = argv.indexOf('--eval');
const evalFile = evalIdx > -1 ? argv.splice(evalIdx, 2)[1] : null;   // --eval script.js: ejecuta en la página y imprime el resultado
const [url, salida, anchoArg, altoArg, modo] = argv;
if (!url || !salida || !anchoArg) {
  console.error('uso: node tools/shot.js <url> <salida.png> <ancho> [alto] [--full|--fold]');
  process.exit(1);
}
const ancho = +anchoArg;
const alto = +(altoArg && !String(altoArg).startsWith('--') ? altoArg : (ancho < 700 ? 812 : 900));
const completa = (modo || altoArg) !== '--fold';

const puertoLibre = () => new Promise(res => {
  const s = net.createServer(); s.listen(0, () => { const p = s.address().port; s.close(() => res(p)); });
});

async function main() {
  const puerto = await puertoLibre();
  const perfil = fs.mkdtempSync('/tmp/np-chrome-');
  const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
    '--no-default-browser-check', '--disable-extensions', `--remote-debugging-port=${puerto}`,
    `--user-data-dir=${perfil}`, 'about:blank'], { stdio: 'ignore' });

  const limpia = () => { try { chrome.kill('SIGKILL'); } catch (e) {} try { fs.rmSync(perfil, { recursive: true, force: true }); } catch (e) {} };
  process.on('exit', limpia);

  // esperar a que el puerto de depuración responda
  let ws = null;
  for (let i = 0; i < 100; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${puerto}/json/list`);
      const tabs = await r.json();
      const page = tabs.find(t => t.type === 'page');
      if (page) { ws = page.webSocketDebuggerUrl; break; }
    } catch (e) { /* aún no levanta */ }
    await new Promise(r => setTimeout(r, 100));
  }
  if (!ws) { limpia(); throw new Error('Chrome no abrió el puerto de depuración'); }

  const sock = new WebSocket(ws);
  let id = 0; const pendientes = new Map(); const eventos = new Map();
  const cmd = (method, params) => new Promise((res, rej) => {
    const n = ++id; pendientes.set(n, { res, rej });
    sock.send(JSON.stringify({ id: n, method, params: params || {} }));
  });
  const esperaEvento = (nombre, ms) => new Promise(res => {
    const t = setTimeout(() => { eventos.delete(nombre); res(false); }, ms);
    eventos.set(nombre, () => { clearTimeout(t); eventos.delete(nombre); res(true); });
  });

  await new Promise((res, rej) => { sock.onopen = res; sock.onerror = rej; });
  sock.onmessage = ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pendientes.has(m.id)) {
      const { res, rej } = pendientes.get(m.id); pendientes.delete(m.id);
      m.error ? rej(new Error(m.error.message)) : res(m.result);
    } else if (m.method && eventos.has(m.method)) eventos.get(m.method)();
  };

  await cmd('Page.enable');
  await cmd('Emulation.setDeviceMetricsOverride', { width: ancho, height: alto, deviceScaleFactor: 1, mobile: ancho < 700 });
  await cmd('Page.navigate', { url });
  await esperaEvento('Page.loadEventFired', 15000);
  await new Promise(r => setTimeout(r, 2200));   // reveals .rv, fuentes, canvas

  if (completa) {
    // recorrer la página para disparar los IntersectionObserver de .rv, y volver arriba
    const { result } = await cmd('Runtime.evaluate', { returnByValue: true, awaitPromise: true, expression: `
      (async () => {
        // Un IntersectionObserver no dispara si el scroll pasa de largo entre frames.
        // Se avanza media pantalla por paso y se espera a DOS frames pintados, que es
        // cuando el observador entrega sus entradas. Si se scrollea a saltos grandes
        // con setTimeout, los .rv de abajo se quedan en opacity 0 y la captura miente.
        const frame = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
        // El sitio pone html{scroll-behavior:smooth}: con eso, cada scrollTo ANIMA y
        // un barrido en bucle nunca llega al pie — los .rv de abajo no se revelan y
        // la captura sale con media página en blanco. Se desactiva durante el barrido.
        const previo = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        const paso = Math.max(200, innerHeight * 0.5);
        let maxY = 0;
        for (let y = 0; y <= document.documentElement.scrollHeight; y += paso) {
          scrollTo(0, y); await frame(); await new Promise(r => setTimeout(r, 60));
          maxY = Math.max(maxY, scrollY);
        }
        scrollTo(0, 0); await frame(); await new Promise(r => setTimeout(r, 500));
        document.documentElement.style.scrollBehavior = previo;
        const rv = document.querySelectorAll('.rv').length, on = document.querySelectorAll('.rv.on').length;
        return { alto: document.documentElement.scrollHeight, ancho: document.documentElement.scrollWidth,
                 vp: innerWidth, rv, on, maxY,
                 fondo: Math.round(maxY + innerHeight) >= document.documentElement.scrollHeight - 4 };
      })()` });
    var medida = result.value;
  }

  if (evalFile) {
    // Interacción real: el script corre dentro de la página (clicks, inputs) y devuelve lo que quiera comprobar.
    const src = fs.readFileSync(evalFile, 'utf8');
    const r = await cmd('Runtime.evaluate', { returnByValue: true, awaitPromise: true, expression: '(async () => {' + src + '})()' });
    if (r.exceptionDetails) { console.error('✗ eval:', r.exceptionDetails.text, (r.exceptionDetails.exception || {}).description || ''); limpia(); process.exit(2); }
    console.log(JSON.stringify(r.result.value, null, 1));
  }
  const { data } = await cmd('Page.captureScreenshot', { format: 'png', captureBeyondViewport: completa, fromSurface: true });
  fs.writeFileSync(salida, Buffer.from(data, 'base64'));
  if (completa && medida) {
    const overflow = medida.ancho > medida.vp;
    const sinRevelar = medida.rv - medida.on;
    console.log(`${salida} · documento ${medida.ancho}x${medida.alto} · viewport ${medida.vp}x${alto}`
      + ` · revelados ${medida.on}/${medida.rv}`
      + (overflow ? ' · ⚠ OVERFLOW HORIZONTAL' : '')
      + (medida.fondo ? '' : ` · ⚠ el barrido sólo llegó a y=${medida.maxY}`)
      + (sinRevelar ? ` · ⚠ ${sinRevelar} SIN REVELAR (la captura no muestra todo)` : ''));
  } else console.log(`${salida} · fold ${ancho}x${alto}`);
  limpia();
  process.exit(0);
}
main().catch(e => { console.error('✗', e.message); process.exit(1); });
