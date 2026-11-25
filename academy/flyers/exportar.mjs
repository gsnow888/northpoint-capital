// Exporta cada <section class="fly"> de flyers.html como PNG en esta carpeta.
// Uso: node academy/flyers/exportar.mjs   (necesita Google Chrome instalado; Node 22+ por WebSocket global)
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
const dir = dirname(fileURLToPath(import.meta.url));
const prof = mkdtempSync("/tmp/flyers-");
const ch = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--remote-debugging-port=9334", `--user-data-dir=${prof}`, "about:blank"], { stdio: "ignore" });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ws, id = 0; const pend = {};
for (let i = 0; i < 40; i++) { try { const t = (await (await fetch("http://127.0.0.1:9334/json")).json()).find(x => x.type === "page"); if (t) { ws = new WebSocket(t.webSocketDebuggerUrl); break; } } catch (_) {} await sleep(250); }
await new Promise(r => ws.onopen = r);
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 2100, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: pathToFileURL(join(dir, "flyers.html")).href });
await sleep(4000);
const r = await send("Runtime.evaluate", { expression: "document.fonts.ready.then(()=>JSON.stringify([...document.querySelectorAll('.fly')].map(f=>{const b=f.getBoundingClientRect();return {id:f.id,x:b.left+scrollX,y:b.top+scrollY,w:b.width,h:b.height}})))", awaitPromise: true, returnByValue: true });
for (const f of JSON.parse(r.result.result.value)) {
  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: f.x, y: f.y, width: f.w, height: f.h, scale: 1 } });
  writeFileSync(join(dir, f.id + ".png"), Buffer.from(shot.result.data, "base64"));
  console.log(f.id, f.w + "x" + f.h);
}
ch.kill(); process.exit(0);
