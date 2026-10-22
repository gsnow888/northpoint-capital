#!/usr/bin/env node
/* tools/consola.js — abre una página en Chrome headless (CDP) y reporta errores y avisos de consola,
 * excepciones, cargas fallidas y respuestas HTTP >= 400. Sin dependencias. Hermano de shot.js.
 * Uso: node tools/consola.js <url> [ancho]     → imprime "consola limpia" o la lista de problemas */
const { spawn } = require('node:child_process'); const fs = require('node:fs'); const net = require('node:net');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [url, anchoArg] = process.argv.slice(2); const ancho = +(anchoArg || 1440);
const puertoLibre = () => new Promise(res => { const s = net.createServer(); s.listen(0, () => { const p = s.address().port; s.close(() => res(p)); }); });
(async () => {
  const puerto = await puertoLibre(); const perfil = fs.mkdtempSync('/tmp/np-chrome-c-');
  const chrome = spawn(CHROME, ['--headless=new','--disable-gpu','--hide-scrollbars','--no-first-run','--no-default-browser-check','--disable-extensions',`--remote-debugging-port=${puerto}`,`--user-data-dir=${perfil}`,'about:blank'], { stdio: 'ignore' });
  const limpia = () => { try { chrome.kill('SIGKILL'); } catch (e) {} try { fs.rmSync(perfil, { recursive: true, force: true }); } catch (e) {} };
  process.on('exit', limpia);
  let ws = null; for (let i = 0; i < 100 && !ws; i++) { try { const r = await fetch(`http://127.0.0.1:${puerto}/json/list`); const t = (await r.json()).find(t => t.type === 'page'); if (t) ws = t.webSocketDebuggerUrl; } catch (e) {} await new Promise(r => setTimeout(r, 100)); }
  const sock = new WebSocket(ws); let id = 0; const pend = new Map(); const out = [];
  const cmd = (method, params) => new Promise((res, rej) => { const n = ++id; pend.set(n, { res, rej }); sock.send(JSON.stringify({ id: n, method, params: params || {} })); });
  await new Promise((res, rej) => { sock.onopen = res; sock.onerror = rej; });
  sock.onmessage = ev => { const m = JSON.parse(ev.data);
    if (m.id && pend.has(m.id)) { const { res, rej } = pend.get(m.id); pend.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); return; }
    if (m.method === 'Runtime.consoleAPICalled' && ['error','warning'].includes(m.params.type)) out.push(m.params.type + ': ' + m.params.args.map(a => a.value || a.description || '').join(' '));
    if (m.method === 'Runtime.exceptionThrown') out.push('EXCEPTION: ' + (m.params.exceptionDetails.exception || {}).description || m.params.exceptionDetails.text);
    if (m.method === 'Log.entryAdded' && ['error','warning'].includes(m.params.entry.level)) out.push(m.params.entry.level + ': ' + m.params.entry.text + ' ' + (m.params.entry.url || ''));
    if (m.method === 'Network.loadingFailed') out.push('NETFAIL: ' + m.params.errorText);
    if (m.method === 'Network.responseReceived' && m.params.response.status >= 400) out.push('HTTP ' + m.params.response.status + ': ' + m.params.response.url); };
  await cmd('Runtime.enable'); await cmd('Log.enable'); await cmd('Network.enable'); await cmd('Page.enable');
  await cmd('Emulation.setDeviceMetricsOverride', { width: ancho, height: 900, deviceScaleFactor: 1, mobile: ancho < 700 });
  await cmd('Page.navigate', { url }); await new Promise(r => setTimeout(r, 4000));
  await cmd('Runtime.evaluate', { expression: 'document.documentElement.style.scrollBehavior="auto"; scrollTo(0, document.body.scrollHeight/2); scrollTo(0, document.body.scrollHeight)', awaitPromise: true });
  await new Promise(r => setTimeout(r, 2500));
  console.log(url, ancho, '→', out.length ? out.join('\n') : 'consola limpia');
  limpia(); process.exit(0);
})();
