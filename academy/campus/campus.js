/* NORTHPOINT ACADEMY · Campus (v2, 24-nov-2026)
   Estructura de plataforma de bootcamp: inicio con "continúa", módulos, hoja del módulo con capítulos y lecciones,
   lección con presentación tipo chat, barra inferior con "Siguiente", buscador, soporte y Nori (tutor que busca en
   las clases; no es un modelo de lenguaje, no inventa respuestas).
   Las clases salen de lecciones.js (generado de los guiones). El avance se guarda en este dispositivo (localStorage).
   CONFIG.videos: cuando se graben las clases, poner el ID de YouTube de cada una, p. ej. "1.2": "dQw4w9WgXcQ".
   CONFIG.acceso: SHA-256 de los códigos de alumno que abren los niveles 2 a 4. Es una puerta de cortesía en el
   navegador, no protección real: para cobrar en serio hay que validar del lado del servidor. */
const CONFIG = {
  videos: {},
  acceso: ["354c1f96d219de2f21d16e955619daabfd8ab63cc4ca4e77538de55f2407832d"],
  nivelesLibres: [1],
  clasesLibres: ["2.1", "3.1"],   // una clase de muestra de trading y una de IA
  inscripcion: "../../academia.html#inscripcion",
  correo: "hola@northpointcapital.io",
  whatsapp: ""
};

const L = window.LECCIONES || [];
const NIVELES = {
  1: { n: "Dinero y mercados", c: "var(--green)" },
  2: { n: "Trading", c: "var(--blue)" },
  3: { n: "IA aplicada", c: "var(--peach)" },
  4: { n: "Proyecto final", c: "var(--gold)" }
};
const MODS = [
  { id: "bienv", eb: "Módulo adicional", t: "Te damos la bienvenida a NORTHPOINT ACADEMY", ic: "m-hola", clases: ["1.1"], flat: true },
  { id: "n1", eb: "Nivel 1", t: "Dinero y mercados: cómo funciona tu dinero", ic: "m-n1", clases: L.filter(l => l.nivel === 1 && l.id !== "1.1").map(l => l.id) },
  { id: "n2", eb: "Nivel 2", t: "Trading en simulador: gráficos, riesgo y mente", ic: "m-n2", clases: L.filter(l => l.nivel === 2).map(l => l.id) },
  { id: "n3", eb: "Nivel 3", t: "IA aplicada: prompts, negocio, marketing y código", ic: "m-n3", clases: L.filter(l => l.nivel === 3).map(l => l.id) },
  { id: "n4", eb: "Nivel 4", t: "Proyecto final: tu portafolio simulado con IA", ic: "m-n4", clases: ["4.1"] }
];
const INSTR = {
  andre: { n: "André Macouzet", r: "IA, programación, riesgo y mercados", f: "../img/andre.jpg", hola: "¡Hola, soy André!" },
  goyo: { n: "Gregorio Sánchez", r: "Dinero, mente y negocios", f: "../img/goyo.jpg", hola: "¡Hola, soy Goyo!" },
  ambos: { n: "André y Goyo", r: "Fundadores de NORTHPOINT", f: "", hola: "¡Hola! Somos André y Goyo." }
};
const HERRAMIENTAS = {
  inflacion: { t: "Calculadora de inflación", d: "Cuánto vale hoy el dinero que guardaste.", clase: "1.2" },
  compuesto: { t: "Bola de nieve", d: "Interés compuesto, regla del 72 y comisiones.", clase: "1.3" },
  presupuesto: { t: "Presupuesto 50/30/20", d: "Tu dinero del mes contra la regla.", clase: "1.4" },
  cuatro: { t: "¿Inviertes o apuestas?", d: "La prueba de las 4 preguntas.", clase: "1.5" },
  banderas: { t: "Detector de fraudes", d: "Las 5 banderas rojas de un anuncio.", clase: "1.7" },
  riesgo: { t: "Tamaño de posición", d: "Contratos según tu riesgo y tu stop, y tu esperanza.", clase: "2.6" },
  respira: { t: "Respiración guiada", d: "Cuadrada, suspiro fisiológico y exhalación larga.", clase: "2.8" },
  diario: { t: "Diario de trading", d: "Registra en R y mira tu estadística.", clase: "2.9" },
  prompt: { t: "Constructor de prompts", d: "Rol, Contexto, Tarea, Formato.", clase: "3.1" },
  embudo: { t: "¿Te conviene anunciarte?", d: "Costo por cliente contra lo que te deja.", clase: "3.4" }
};
const METAS = {
  dinero: { t: "Ordenar mi dinero", d: "Ahorro, deuda, interés compuesto" },
  negocio: { t: "Hacer crecer un negocio", d: "IA y marketing para vender" },
  ia: { t: "Dominar la IA", d: "Prompts, código y agentes" },
  mercados: { t: "Entender los mercados", d: "Acciones, gráficos y riesgo" }
};

/* ── estado ── */
const KEY = "npa-campus-v1";
let S = (() => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (_) { return {}; } })();
S.hechas ||= {}; S.tareas ||= {}; S.quiz ||= {}; S.herr ||= {}; S.diario ||= []; S.proyecto ||= {}; S.vistas ||= {}; S.chat ||= {}; S.rate ||= {};
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (_) {} }

const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];
const ic = (n, cls = "i") => `<svg class="${cls}"><use href="#i-${n}"/></svg>`;
const ill = n => `<svg viewBox="0 0 64 64" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><use href="#${n}"/></svg>`;
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const plain = s => String(s ?? "").replace(/<[^>]+>/g, "");
const mxn = n => (n < 0 ? "-$" : "$") + Math.round(Math.abs(n)).toLocaleString("es-MX");
const num = (v, d = 0) => { const n = parseFloat(String(v).replace(/[^\d.\-]/g, "")); return isFinite(n) ? n : d; };
const byId = id => L.find(x => x.id === id);
const abierta = l => CONFIG.nivelesLibres.includes(l.nivel) || CONFIG.clasesLibres.includes(l.id) || !!S.acceso;
const hecha = id => !!S.hechas[id];
const pct = () => Math.round(Object.keys(S.hechas).filter(byId).length / L.length * 100);
const modDe = id => MODS.find(m => m.clases.includes(id));
function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("on"), 2200); }
async function sha(t) { const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join(""); }
function siguiente() { return L.find(l => !hecha(l.id) && abierta(l)) || L.find(l => !hecha(l.id)) || L[L.length - 1]; }

/* partes (lecciones) de cada clase */
function partes(l) {
  const p = [{ k: "apuntes", t: l.t, tipo: "Teoría", ic: "doc" }];
  if (l.herr) p.push({ k: "practica", t: l.herr === "proyecto" ? "Entregables del proyecto" : HERRAMIENTAS[l.herr].t, tipo: "Práctica", ic: "chart" });
  p.push({ k: "tarea", t: "Tu tarea", tipo: "Práctica", ic: "pencil" });
  p.push({ k: "quiz", t: `Cuestionario «${l.t}»`, tipo: "Cuestionario", ic: "quiz" });
  return p;
}
const parteHecha = (l, k) => k === "quiz" ? hecha(l.id) : k === "tarea" ? !!(S.tareas[l.id] || "").trim() : !!S.vistas[l.id + "/" + k];
const secuencia = () => L.flatMap(l => partes(l).map(p => [l.id, p.k]));

/* ── herramientas ── */
const T = {};
const H = k => (S.herr[k] ||= {});
function bind(el, k, fn) {
  $$("[data-v]", el).forEach(inp => {
    const st = H(k); if (st[inp.dataset.v] !== undefined) inp.value = st[inp.dataset.v];
    inp.addEventListener("input", () => { st[inp.dataset.v] = inp.value; save(); fn(); });
  });
  fn();
}
const field = (v, lab, def, pre = "") => `<label class="f">${lab}<input class="in mono" data-v="${v}" inputmode="decimal" value="${def}" ${pre}></label>`;
const kpi = (lab, id) => `<div class="kpi"><span>${lab}</span><b id="${id}">—</b></div>`;

T.inflacion = el => {
  el.innerHTML = `<div class="tool"><div class="grid3">${field("m", "Dinero guardado (pesos)", 1000)}${field("a", "Años guardado", 10)}${field("i", "Inflación anual %", 4.5)}</div>
    <div class="out">${kpi("Lo que compra hoy", "o1")}${kpi("Poder de compra perdido", "o2")}${kpi("Para no perder, necesitabas", "o3")}</div>
    <div class="bars3" id="ob"></div><p class="fine">Usa la inflación promedio que quieras probar. El dato oficial por año lo publica el INEGI.</p></div>`;
  bind(el, "inflacion", () => {
    const m = num($("[data-v=m]", el).value), a = num($("[data-v=a]", el).value), i = num($("[data-v=i]", el).value) / 100;
    const real = m / Math.pow(1 + i, a), need = m * Math.pow(1 + i, a);
    $("#o1", el).textContent = mxn(real); $("#o2", el).textContent = m ? Math.round((1 - real / m) * 100) + "%" : "—"; $("#o2", el).className = "neg"; $("#o3", el).textContent = mxn(need);
    $("#ob", el).innerHTML = `<div class="b3" style="--c:var(--faint)"><div class="lab"><span>Lo que guardaste</span><span class="mono">${mxn(m)}</span></div><div class="tr"><i style="width:100%"></i></div></div><div class="b3" style="--c:var(--neg)"><div class="lab"><span>Lo que vale hoy</span><span class="mono">${mxn(real)}</span></div><div class="tr"><i style="width:${m ? real / m * 100 : 0}%"></i></div></div>`;
  });
};

T.compuesto = el => {
  el.innerHTML = `<div class="tool"><div class="grid2">${field("ini", "Monto inicial", 0)}${field("m", "Aporte mensual", 1000)}${field("t", "Rendimiento anual %", 8)}${field("a", "Años", 20)}${field("c", "Comisión anual %", 0)}</div>
    <div class="out">${kpi("Pusiste de tu bolsa", "o1")}${kpi("Valor al final", "o2")}${kpi("Lo que hizo el compuesto", "o3")}</div>
    <svg class="chart" id="ch" viewBox="0 0 640 220" preserveAspectRatio="none"></svg>
    <div class="verdict mid" id="o4"></div></div>`;
  bind(el, "compuesto", () => {
    const g = v => num($(`[data-v=${v}]`, el).value), ini = g("ini"), m = g("m"), a = Math.min(60, Math.max(1, Math.round(g("a")))), t = g("t") / 100, c = g("c") / 100;
    const serie = (tasa) => { let v = ini; const out = [v]; const r = Math.pow(1 + tasa, 1 / 12) - 1; for (let y = 1; y <= a; y++) { for (let k = 0; k < 12; k++) v = v * (1 + r) + m; out.push(v); } return out; };
    const s = serie(t - c), s0 = serie(t), ap = [...Array(a + 1)].map((_, y) => ini + m * 12 * y);
    const fin = s[a], puesto = ap[a];
    $("#o1", el).textContent = mxn(puesto); $("#o2", el).textContent = mxn(fin); $("#o3", el).textContent = mxn(fin - puesto); $("#o3", el).className = fin - puesto >= 0 ? "pos" : "neg";
    const max = Math.max(...s0, ...ap, 1), W = 640, Hh = 200, X = y => 36 + (W - 46) * y / a, Y = v => 10 + (Hh - 20) * (1 - v / max);
    const path = arr => arr.map((v, y) => (y ? "L" : "M") + X(y).toFixed(1) + "," + Y(v).toFixed(1)).join("");
    const ticks = [0, .5, 1].map(f => `<text x="0" y="${Y(max * f) + 4}">${max * f >= 1e6 ? (max * f / 1e6).toFixed(1) + "M" : Math.round(max * f / 1000) + "k"}</text><line x1="36" x2="${W - 10}" y1="${Y(max * f)}" y2="${Y(max * f)}" stroke="var(--line)"/>`).join("");
    $("#ch", el).innerHTML = `${ticks}<path d="${path(ap)}" fill="none" stroke="var(--faint)" stroke-width="2" stroke-dasharray="5 5"/>${c ? `<path d="${path(s0)}" fill="none" stroke="var(--acc)" stroke-opacity=".35" stroke-width="2"/>` : ""}<path d="${path(s)}" fill="none" stroke="var(--acc)" stroke-width="3"/><text x="${X(a) - 4}" y="${Hh + 14}" text-anchor="end">${a} años</text><text x="36" y="${Hh + 14}">hoy</text>`;
    const r72 = t - c > 0 ? (72 / ((t - c) * 100)).toFixed(1) : "—";
    $("#o4", el).innerHTML = `Regla del 72: al ${((t - c) * 100).toFixed(1)}% neto tu dinero se duplica cada ${r72} años.${c ? ` La comisión de ${(c * 100).toFixed(1)}% te cuesta ${mxn(s0[a] - fin)} (${Math.round((1 - fin / s0[a]) * 100)}% del resultado).` : ""}`;
  });
};

T.presupuesto = el => {
  el.innerHTML = `<div class="tool">${field("ing", "Ingreso del mes (después de impuestos)", 15000)}<div class="grid3">${field("n", "Necesidades: renta, comida, transporte", 8000)}${field("g", "Gustos", 5000)}${field("a", "Ahorro e inversión", 2000)}</div>
    <div class="bars3" id="ob"></div><div class="verdict" id="o4"></div></div>`;
  bind(el, "presupuesto", () => {
    const g = v => num($(`[data-v=${v}]`, el).value), ing = g("ing") || 1, d = { n: g("n"), g: g("g"), a: g("a") }, meta = { n: .5, g: .3, a: .2 };
    const nom = { n: "Necesidades", g: "Gustos", a: "Ahorro e inversión" }, col = { n: "var(--n2)", g: "var(--n3)", a: "var(--pos)" };
    $("#ob", el).innerHTML = Object.keys(d).map(k => `<div class="b3" style="--c:${col[k]}"><div class="lab"><span>${nom[k]} · meta ${meta[k] * 100}% (${mxn(ing * meta[k])})</span><span class="mono">${Math.round(d[k] / ing * 100)}% · ${mxn(d[k])}</span></div><div class="tr"><i style="width:${Math.min(100, d[k] / ing * 100)}%"></i><em style="left:${meta[k] * 100}%"></em></div></div>`).join("");
    const resto = ing - d.n - d.g - d.a, pa = d.a / ing, v = $("#o4", el);
    if (resto < 0) { v.className = "verdict bad"; v.textContent = `Gastas ${mxn(-resto)} más de lo que entra. Primero recorta gustos.`; }
    else if (pa >= .2) { v.className = "verdict ok"; v.textContent = `Ahorras ${Math.round(pa * 100)}%. Vas en la regla.${resto > 0 ? ` Te sobran ${mxn(resto)} sin asignar: dales un destino.` : ""}`; }
    else { v.className = "verdict mid"; v.textContent = `Ahorras ${Math.round(pa * 100)}%. Si no llegas a 20, empieza con 5 y págate primero el día que cobras.${resto > 0 ? ` Tienes ${mxn(resto)} sin asignar.` : ""}`; }
  });
};

T.cuatro = el => {
  const P = ["¿Sé por qué esto debería subir?", "¿Sé cuánto puedo perder?", "¿Tengo un plan de salida?", "¿Lo haría igual si nadie me viera?"], st = H("cuatro");
  el.innerHTML = `<div class="tool"><label class="f">¿En qué vas a poner tu dinero?<input class="in" data-v="q" placeholder="Ej. la cripto que me recomendó un amigo"></label>
    <div class="yn">${P.map((p, k) => `<label><span>${p}</span><span class="seg" data-k="${k}"><button type="button" data-a="1">Sí</button><button type="button" data-a="0" class="no">No</button></span></label>`).join("")}</div><div class="verdict" id="o4"></div></div>`;
  const pinta = () => {
    $$(".seg", el).forEach(s => { const a = st["p" + s.dataset.k]; $$("button", s).forEach(b => b.classList.toggle("on", b.dataset.a === a)); });
    const r = P.map((_, k) => st["p" + k]), v = $("#o4", el);
    if (r.some(x => x === "0")) { v.className = "verdict bad"; v.textContent = "Alguna respuesta es no: estás apostando. Arregla esa parte antes de poner dinero."; }
    else if (r.every(x => x === "1")) { v.className = "verdict ok"; v.textContent = "Las cuatro son sí. No garantiza que salga bien, pero ya no es una apuesta a ciegas."; }
    else { v.className = "verdict mid"; v.textContent = "Responde las cuatro."; }
  };
  $$(".seg button", el).forEach(b => b.onclick = () => { st["p" + b.parentNode.dataset.k] = b.dataset.a; save(); pinta(); });
  bind(el, "cuatro", pinta);
};

T.banderas = el => {
  const B = ["Te garantizan el rendimiento", "El rendimiento es muy alto y siempre igual", "Te pagan por traer gente", "No te dejan sacar tu dinero cuando quieres", "“No le digas a nadie, es exclusivo”"], st = H("banderas");
  el.innerHTML = `<div class="tool"><label class="f">El anuncio o la oferta<input class="in" data-v="q" placeholder="Pega el nombre o el link del anuncio"></label>
    <div class="yn">${B.map((b, k) => `<label class="chk"><input type="checkbox" data-b="${k}"><span>${b}</span></label>`).join("")}</div><div class="verdict" id="o4"></div></div>`;
  const pinta = () => {
    const n = B.filter((_, k) => st["b" + k]).length, v = $("#o4", el);
    v.className = "verdict " + (n === 0 ? "ok" : n === 1 ? "mid" : "bad");
    v.textContent = n === 0 ? "Sin banderas rojas marcadas. Aun así, pide su historial completo, incluidas las pérdidas." : n === 1 ? "Una bandera roja. Investiga antes de poner un peso." : `${n} banderas rojas. Trátalo como fraude.`;
  };
  $$("[data-b]", el).forEach(c => { c.checked = !!st["b" + c.dataset.b]; c.onchange = () => { st["b" + c.dataset.b] = c.checked; save(); pinta(); }; });
  bind(el, "banderas", pinta);
};

T.riesgo = el => {
  const INS = { MNQ: 2, NQ: 20, MES: 5, ES: 50 };
  el.innerHTML = `<div class="tool"><div class="grid2">${field("cta", "Tamaño de la cuenta (USD)", 50000)}${field("r", "Riesgo por operación %", .5)}${field("d", "Distancia al stop (puntos)", 20)}
    <label class="f">Contrato<select class="in" data-v="ins">${Object.entries(INS).map(([k, v]) => `<option value="${k}">${k} · $${v} por punto</option>`).join("")}</select></label></div>
    <div class="out">${kpi("Riesgo en dinero", "o1")}${kpi("Contratos", "o2")}${kpi("Riesgo real con ese tamaño", "o3")}</div>
    <hr class="sep" style="margin:6px 0"><div class="eyebrow">Tu esperanza</div>
    <div class="grid3">${field("pa", "% de acierto", 45)}${field("gm", "Ganancia media (R)", 2)}${field("pm", "Pérdida media (R)", 1)}</div>
    <div class="verdict" id="o4"></div><p class="fine">Contratos = riesgo en dinero ÷ (distancia al stop × valor del punto), redondeado hacia abajo. El stop va donde la idea se invalida; el tamaño se ajusta al stop.</p></div>`;
  bind(el, "riesgo", () => {
    const g = v => num($(`[data-v=${v}]`, el).value), vp = INS[$("[data-v=ins]", el).value] || 2;
    const rd = g("cta") * g("r") / 100, d = g("d"), n = d > 0 ? Math.floor(rd / (d * vp)) : 0;
    $("#o1", el).textContent = "$" + Math.round(rd).toLocaleString("en-US"); $("#o2", el).textContent = n; $("#o2", el).className = n ? "" : "neg";
    $("#o3", el).textContent = n ? "$" + Math.round(n * d * vp).toLocaleString("en-US") : "Stop muy amplio";
    const pa = g("pa") / 100, e = pa * g("gm") - (1 - pa) * g("pm"), v = $("#o4", el);
    v.className = "verdict " + (e > 0 ? "ok" : "bad");
    v.textContent = `Esperanza: ${e >= 0 ? "+" : ""}${e.toFixed(2)}R por operación. ${e > 0 ? `En 100 operaciones serían cerca de ${(e * 100).toFixed(0)}R, si sigues las reglas.` : "Con estos números pierdes a la larga aunque aciertes seguido."}`;
  });
};

T.respira = el => {
  const MODOS = { cuadrada: { t: "Respiración cuadrada", f: [["Inhala", 4], ["Sostén", 4], ["Exhala", 4], ["Sostén", 4]], u: "Un minuto antes de la apertura o de trabajar." },
    larga: { t: "Exhalación larga", f: [["Inhala", 4], ["Exhala", 8]], u: "Después de una pérdida o de una mala noticia." },
    suspiro: { t: "Suspiro fisiológico", f: [["Inhala por nariz", 2], ["Otra inhalación corta", 1], ["Exhala largo por boca", 6]], u: "Para el pico de ansiedad. 2 o 3 veces." } };
  let modo = H("respira").modo || "cuadrada", timer = null;
  el.innerHTML = `<div class="tool"><div class="row" id="modos">${Object.entries(MODOS).map(([k, m]) => `<button type="button" class="chip" data-m="${k}">${m.t}</button>`).join("")}</div>
    <div class="breath"><div class="sq" id="sq"><span class="pt" id="pt"></span><div class="ph"><div><b id="fase">Listo</b><span id="cnt">—</span></div></div></div>
    <div style="display:grid;gap:14px"><p id="uso" class="muted"></p><div class="row"><button class="btn btn-p" id="go" type="button">Empezar</button><span class="muted mono" id="rondas"></span></div>
    <p class="fine">Técnicas de bienestar general. Si tienes una condición médica, consulta a tu médico.</p></div></div></div>`;
  const pt = $("#pt", el);
  const pinta = () => { $$("#modos .chip", el).forEach(b => { b.style.borderColor = b.dataset.m === modo ? "var(--acc)" : ""; b.style.color = b.dataset.m === modo ? "var(--fg)" : ""; }); $("#uso", el).textContent = MODOS[modo].u; };
  const para = () => { clearInterval(timer); timer = null; $("#go", el).textContent = "Empezar"; $("#fase", el).textContent = "Listo"; $("#cnt", el).textContent = "—"; pt.style.transition = "none"; pt.style.left = "0%"; pt.style.top = "100%"; };
  const esquinas = [[0, 100], [0, 0], [100, 0], [100, 100]];
  const arranca = () => {
    const f = MODOS[modo].f; let k = 0, s = 0, ronda = 0;
    const paso = () => {
      const [nom, dur] = f[k]; $("#fase", el).textContent = nom; $("#cnt", el).textContent = dur - s;
      if (s === 0) { const [x, y] = modo === "cuadrada" ? esquinas[(k + 1) % 4] : (nom.startsWith("Exhala") ? [50, 100] : [50, k === 0 ? 30 : 0]); pt.style.transition = `left ${dur}s linear, top ${dur}s linear`; pt.style.left = x + "%"; pt.style.top = y + "%"; }
      s++; if (s >= dur) { s = 0; k = (k + 1) % f.length; if (k === 0) { ronda++; $("#rondas", el).textContent = ronda + (ronda === 1 ? " ronda" : " rondas"); } }
    };
    if (modo !== "cuadrada") { pt.style.transition = "none"; pt.style.left = "50%"; pt.style.top = "100%"; }
    paso(); timer = setInterval(paso, 1000); $("#go", el).textContent = "Parar";
  };
  $$("#modos .chip", el).forEach(b => b.onclick = () => { modo = b.dataset.m; H("respira").modo = modo; save(); para(); pinta(); });
  $("#go", el).onclick = () => timer ? para() : arranca();
  pinta(); para();
  window.__stopTool = para;
};

T.diario = el => {
  const D = S.diario;
  const hoy = new Date().toISOString().slice(0, 10);
  el.innerHTML = `<div class="tool"><form id="df" style="display:grid;gap:14px"><div class="grid3">
      <label class="f">Fecha<input class="in mono" name="f" type="date" value="${hoy}" required></label>
      <label class="f">Activo<input class="in" name="a" placeholder="MNQ, ES, BTC…" required maxlength="12"></label>
      <label class="f">Setup<input class="in" name="s" placeholder="Nombre de tu setup" maxlength="30"></label>
      <label class="f">Entrada<input class="in mono" name="e" inputmode="decimal"></label>
      <label class="f">Stop<input class="in mono" name="st" inputmode="decimal"></label>
      <label class="f">Objetivo<input class="in mono" name="o" inputmode="decimal"></label>
      <label class="f">Resultado en R<input class="in mono" name="r" inputmode="decimal" placeholder="2 · -1 · 0" required></label>
      <label class="f">¿Seguiste tu plan?<select class="in" name="p"><option value="1">Sí</option><option value="0">No</option></select></label>
      <label class="f">Emoción<select class="in" name="em"><option>Tranquilo</option><option>Miedo</option><option>Avaricia</option><option>Revancha</option><option>Euforia</option></select></label></div>
      <label class="f">Nota<input class="in" name="n" placeholder="Qué viste, qué aprendiste" maxlength="200"></label>
      <div class="row"><button class="btn btn-p" type="submit">Registrar operación</button><button class="btn btn-g" type="button" id="csv">Descargar CSV</button></div></form>
    <div class="out" style="grid-template-columns:repeat(4,1fr)" id="stats"></div><div id="tabla"></div>
    <p class="fine">Opera en simulador, igual que con dinero real: mismo tamaño y mismas reglas. Saca conclusiones a partir de 50 a 100 operaciones.</p></div>`;
  const pinta = () => {
    const n = D.length, g = D.filter(x => x.r > 0).length, tot = D.reduce((a, x) => a + x.r, 0), plan = D.filter(x => x.p === "1").length;
    const k = (l, v, c = "") => `<div class="kpi"><span>${l}</span><b class="${c}">${v}</b></div>`;
    $("#stats", el).innerHTML = k("Operaciones", n) + k("% de acierto", n ? Math.round(g / n * 100) + "%" : "—") + k("R total", n ? (tot >= 0 ? "+" : "") + tot.toFixed(1) + "R" : "—", tot > 0 ? "pos" : tot < 0 ? "neg" : "") + k("Plan seguido", n ? Math.round(plan / n * 100) + "%" : "—");
    $("#tabla", el).innerHTML = n ? `<div class="tblw"><table class="tbl"><thead><tr><th>Fecha</th><th>Activo</th><th>Setup</th><th>R</th><th>Plan</th><th>Emoción</th><th>Nota</th><th></th></tr></thead><tbody>${D.slice().reverse().map(x => `<tr><td class="mono">${esc(x.f.slice(5))}</td><td>${esc(x.a)}</td><td>${esc(x.s)}</td><td class="r" style="color:${x.r > 0 ? "var(--pos)" : x.r < 0 ? "var(--neg)" : "var(--muted)"}">${x.r > 0 ? "+" : ""}${x.r}R</td><td>${x.p === "1" ? "Sí" : "No"}</td><td>${esc(x.em)}</td><td class="muted">${esc(x.n)}</td><td><button class="x" data-del="${x.id}" aria-label="Borrar">${ic("x")}</button></td></tr>`).join("")}</tbody></table></div>` : `<p class="muted" style="text-align:center;padding:20px">Todavía no registras operaciones.</p>`;
    $$("[data-del]", el).forEach(b => b.onclick = () => { if (!confirm("¿Borrar esta operación?")) return; const i = D.findIndex(x => x.id === b.dataset.del); if (i > -1) D.splice(i, 1); save(); pinta(); });
  };
  $("#df", el).onsubmit = e => {
    e.preventDefault(); const d = Object.fromEntries(new FormData(e.target));
    D.push({ id: Date.now().toString(36), f: d.f, a: d.a.toUpperCase(), s: d.s, e: d.e, st: d.st, o: d.o, r: num(d.r), p: d.p, em: d.em, n: d.n });
    save(); e.target.reset(); e.target.f.value = hoy; pinta(); toast("Operación registrada");
  };
  $("#csv", el).onclick = () => {
    const rows = [["fecha", "activo", "setup", "entrada", "stop", "objetivo", "R", "plan", "emocion", "nota"], ...D.map(x => [x.f, x.a, x.s, x.e, x.st, x.o, x.r, x.p === "1" ? "si" : "no", x.em, x.n])];
    const csv = rows.map(r => r.map(c => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv" })); a.download = "diario-northpoint-academy.csv"; a.click();
  };
  pinta();
};

T.prompt = el => {
  el.innerHTML = `<div class="tool"><div class="grid2">
    <label class="f">Rol · ¿quién es la IA?<textarea class="in" data-v="r" style="min-height:80px" placeholder="Eres profesor de finanzas para alguien de 17 años."></textarea></label>
    <label class="f">Contexto · ¿qué sabe de ti?<textarea class="in" data-v="c" style="min-height:80px" placeholder="No sé nada de bolsa."></textarea></label>
    <label class="f">Tarea · ¿qué quieres?<textarea class="in" data-v="t" style="min-height:80px" placeholder="Explícame qué es una acción con el ejemplo de una tienda de la esquina."></textarea></label>
    <label class="f">Formato · ¿cómo lo entrega?<textarea class="in" data-v="f" style="min-height:80px" placeholder="En 5 puntos, máximo 2 líneas cada uno."></textarea></label></div>
    <div class="prompt-out" id="po"></div><div class="row"><button class="btn btn-p" type="button" id="cp">${ic("copy")}Copiar prompt</button><span class="muted" style="font-size:13px">Después pide: “más corto”, “con un ejemplo mexicano”, “¿qué podría estar mal en lo que dijiste?”.</span></div></div>`;
  bind(el, "prompt", () => {
    const g = v => $(`[data-v=${v}]`, el).value.trim() || $(`[data-v=${v}]`, el).placeholder;
    $("#po", el).textContent = `${g("r")}\n\nContexto: ${g("c")}\n\nTarea: ${g("t")}\n\nFormato: ${g("f")}`;
  });
  $("#cp", el).onclick = () => { navigator.clipboard?.writeText($("#po", el).textContent).then(() => toast("Prompt copiado"), () => toast("No se pudo copiar")); };
};

T.embudo = el => {
  el.innerHTML = `<div class="tool"><div class="grid2">${field("p", "Presupuesto de anuncios (pesos)", 1500)}${field("cc", "Costo por contacto (pesos)", 25)}${field("ci", "% de contactos que compran", 10)}${field("mg", "Lo que te deja cada cliente (margen)", 500)}</div>
    <div class="out">${kpi("Contactos", "o1")}${kpi("Clientes", "o2")}${kpi("Costo por cliente", "o3")}</div><div class="verdict" id="o4"></div>
    <p class="fine">Empieza con un presupuesto diario pequeño, 3 creativos distintos, mide el costo por contacto, apaga lo que no funciona y escala lo que sí.</p></div>`;
  bind(el, "embudo", () => {
    const g = v => num($(`[data-v=${v}]`, el).value), p = g("p"), cc = g("cc"), ci = g("ci") / 100, mg = g("mg");
    const con = cc > 0 ? p / cc : 0, cli = con * ci, cpc = cli > 0 ? p / cli : Infinity, util = cli * mg - p;
    $("#o1", el).textContent = Math.floor(con); $("#o2", el).textContent = cli.toFixed(1); $("#o3", el).textContent = isFinite(cpc) ? mxn(cpc) : "—";
    const v = $("#o4", el);
    v.className = "verdict " + (util > 0 ? "ok" : "bad");
    v.textContent = !isFinite(cpc) ? "Con estos números no llega ningún cliente." : util > 0 ? `Cada cliente te cuesta ${mxn(cpc)} y te deja ${mxn(mg)}. Ganas ${mxn(util)} con esta campaña.` : `Cada cliente te cuesta ${mxn(cpc)} y te deja ${mxn(mg)}: el anuncio te hace más pobre (${mxn(util)}). Mejora el creativo o el cierre antes de escalar.`;
  });
};

T.proyecto = el => {
  const P = S.proyecto, E = [["tesis", "Tesis", "Qué activos, por qué y en qué horizonte. ¿Inversión o especulación?"], ["plan", "Plan de trading", "Setup, reglas de entrada, riesgo por operación y límite diario."], ["ia", "Asistente IA", "Tu prompt o agente para el análisis diario y tu indicador propio. Pega el prompt o el código."], ["res", "Resultados", "Lo que te dijo tu diario: acierto, R total, qué setup funciona y qué error se repite."]];
  const ops = S.diario.length, lecc = Object.keys(S.hechas).filter(byId).length;
  const okE = k => (P[k] || "").trim().length >= 40;
  el.innerHTML = `<div class="tool">${E.map(([k, t, d], i) => `<div class="ent ${okE(k) ? "ok" : ""}" data-e="${k}"><span class="k">${okE(k) ? ic("check", "i") : i + 1}</span><div><h3 style="font-size:17px;font-weight:800">${t}</h3><p class="muted" style="font-size:13.5px;margin:2px 0 10px">${d}</p><textarea class="in" data-p="${k}" placeholder="Escribe aquí. Se guarda sola.">${esc(P[k] || "")}</textarea></div></div>`).join("")}
    <div class="out">${kpi("Clases completadas", "p1")}${kpi("Operaciones en tu diario", "p2")}${kpi("Entregables listos", "p3")}</div>
    <div class="verdict" id="pv"></div>
    <div class="row"><a class="btn btn-p" id="defensa" href="#">Solicitar mi defensa ${ic("arrow")}</a><a class="btn btn-g" href="#/h/diario">Abrir mi diario</a></div></div>`;
  const pinta = () => {
    const ne = E.filter(([k]) => okE(k)).length, listo = ne === 4 && ops >= 30;
    $("#p1", el).textContent = `${lecc}/${L.length}`; $("#p2", el).textContent = `${ops}/30`; $("#p3", el).textContent = `${ne}/4`;
    $$(".ent", el).forEach(x => { const k = x.dataset.e; x.classList.toggle("ok", okE(k)); $(".k", x).innerHTML = okE(k) ? ic("check", "i") : E.findIndex(e => e[0] === k) + 1; });
    const v = $("#pv", el); v.className = "verdict " + (listo ? "ok" : "mid");
    v.textContent = listo ? "Todo listo. Solicita tu defensa: 10 minutos frente a André y Goyo." : `Te falta: ${[ne < 4 ? `${4 - ne} entregable${4 - ne > 1 ? "s" : ""}` : "", ops < 30 ? `${30 - ops} operaciones en el diario` : ""].filter(Boolean).join(" y ")}.`;
    const txt = `Hola, quiero agendar mi defensa del proyecto final de NORTHPOINT ACADEMY.\nNombre: ${S.perfil.nombre}\nClases completadas: ${lecc}/${L.length}\nOperaciones en el diario: ${ops}\nEntregables: ${ne}/4`;
    $("#defensa", el).href = CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(txt)}` : `mailto:${CONFIG.correo}?subject=${encodeURIComponent("Defensa del proyecto final")}&body=${encodeURIComponent(txt)}`;
    $("#defensa", el).classList.toggle("btn-g", !listo); $("#defensa", el).classList.toggle("btn-p", listo);
  };
  $$("[data-p]", el).forEach(t => t.addEventListener("input", () => { P[t.dataset.p] = t.value; save(); pinta(); }));
  pinta();
};


/* ── barra superior ── */
function topbar(modo, ctx = {}) {
  const right = modo === "leccion"
    ? `<button class="tb" data-act="soporte">${ic("help")}<span class="lb">Soporte</span></button><button class="tb" data-act="tutor">${ic("bot")}<span class="lb">Tutor de IA</span></button>`
    : `<button class="tb" data-act="buscar">${ic("search")}<span class="lb">Buscar</span></button><button class="tb" data-act="soporte">${ic("help")}<span class="lb">Soporte</span></button><button class="tb" data-act="tutor">${ic("bot")}<span class="lb">Tutor de IA</span></button><a class="tb ${ctx.ruta === "ajustes" ? "on" : ""}" href="#/ajustes">${ic("gear")}<span class="lb">Configuración</span></a><span class="sepv"></span><button class="tb" data-act="invitar">${ic("gift")}<span class="lb">Invitar amigos</span></button>`;
  const left = modo === "leccion"
    ? `<a class="tb" href="#/">${ic("home")}<span class="lb">Inicio</span></a><button class="tb" data-act="buscar">${ic("search")}<span class="lb">Buscar</span></button>`
    : `<a class="tb ${ctx.ruta === "" ? "on" : ""}" href="#/">${ic("home")}<span class="lb">Inicio</span></a>`;
  const mid = modo === "leccion"
    ? `<div class="mid"><a class="ib" href="${ctx.prev || "#"}" aria-label="Lección anterior" aria-disabled="${!ctx.prev}">${ic("back")}</a><button class="tt" data-act="modulo" data-m="${ctx.mod}">${ic("list")}<span>${esc(ctx.titulo)}</span></button><a class="ib" href="${ctx.next || "#"}" aria-label="Lección siguiente" aria-disabled="${!ctx.next}">${ic("arrow")}</a></div>`
    : `<div></div>`;
  return `<header class="top ${modo === "leccion" ? "les" : ""}"><div class="l">${left}</div>${mid}<div class="r">${right}</div></header>`;
}

/* ── bienvenida ── */
function bienvenida() {
  let meta = "";
  $("#root").innerHTML = `<div class="welcome"><div class="wbox">
    <span class="logo">northpoint<small>academy</small></span>
    <h1>Te damos la bienvenida al <b>campus</b>.</h1>
    <p style="font-size:17px">23 clases en 4 niveles: dinero, inteligencia artificial, negocios, mercados y un proyecto final. El Nivel 1 es gratis, y tienes una clase de muestra de IA y otra de trading.</p>
    <form id="wf" class="box" style="display:grid;gap:16px">
      <label class="f">¿Cómo te llamas?<input class="in" name="nombre" required autocomplete="given-name" maxlength="40" placeholder="Tu nombre"></label>
      <div class="f" style="display:grid;gap:8px"><span>¿Qué te trae aquí?</span><div class="goals">${Object.entries(METAS).map(([k, m]) => `<button type="button" class="goal" data-m="${k}"><b>${m.t}</b><span>${m.d}</span></button>`).join("")}</div></div>
      <button class="btn btn-p" type="submit" style="height:50px">Entrar al campus ${ic("arrow")}</button>
      <p class="fine">Tu avance se guarda solo en este dispositivo y navegador. No pedimos correo ni contraseña para empezar.</p>
    </form>
    <a href="../../academia.html" class="fine" style="display:inline-flex;gap:8px;align-items:center">${ic("back")} Volver a NORTHPOINT ACADEMY</a>
  </div></div>`;
  $$(".goal").forEach(b => b.onclick = () => { meta = b.dataset.m; $$(".goal").forEach(x => x.classList.toggle("on", x === b)); });
  $("#wf").onsubmit = e => {
    e.preventDefault();
    S.perfil = { nombre: e.target.nombre.value.trim().slice(0, 40), meta: meta || "dinero", desde: new Date().toISOString() };
    save(); location.hash = "#/"; render();
  };
}

/* ── inicio ── */
function inicio() {
  const s = siguiente(), m = modDe(s.id), ls = m.clases.map(byId), hechasMod = ls.filter(l => hecha(l.id)).length;
  const modCard = mm => {
    const cl = mm.clases.map(byId), n = cl.filter(l => hecha(l.id)).length, locked = cl.every(l => !abierta(l));
    const meta = mm.flat ? `${partes(cl[0]).length} lecciones` : `${cl.length} ${cl.length === 1 ? "capítulo" : "capítulos"}`;
    return `<button class="mod" data-act="modulo" data-m="${mm.id}"><span class="tile">${ill(mm.ic)}</span><div><small>${mm.eb}</small><b>${esc(mm.t)}</b><span>${locked ? ic("lock") : ""}${meta}</span></div>${n === cl.length ? `<span class="done">${ic("check")}<span>Completado</span></span>` : n ? `<span class="done" style="color:var(--mute)">${n}/${cl.length}</span>` : ""}</button>`;
  };
  const extra = [
    { href: "#/herramientas", eb: "Módulo adicional", t: "Herramientas para practicar", ic: "m-tool", meta: "10 herramientas" },
    { href: "#/h/diario", eb: "Módulo adicional", t: "Tu diario de trading en R", ic: "m-diario", meta: `${S.diario.length} ${S.diario.length === 1 ? "operación" : "operaciones"}` },
    { href: "#/constancia", eb: "Módulo adicional", t: "Tu constancia de avance", ic: "m-award", meta: `${pct()}% del campus` }
  ];
  return `${topbar("inicio", { ruta: "" })}<main class="home">
    <div class="prog"><h1>NORTHPOINT ACADEMY</h1>${S.acceso ? `<span class="pill" style="background:var(--green);color:#1A1A1A">Acceso completo</span>` : `<a class="pill" href="${CONFIG.inscripcion}">Inscríbete al programa completo</a>`}</div>
    <a class="cont" href="#/clase/${s.id}/${primeraPendiente(s)}"><div class="hd"><span class="tile">${ill(m.ic)}</span><div><b>${m.eb} <span class="mini"><i style="width:${Math.round(hechasMod / ls.length * 100)}%"></i></span></b><span>${esc(m.t)}</span></div></div>
      <div class="card"><small>Capítulo ${s.id}</small><h2>${esc(s.t)}: ${esc(s.sub.charAt(0).toLowerCase() + s.sub.slice(1))}</h2></div></a>
    <h2 class="secT">Contenido</h2>
    <div class="mods">${MODS.map(modCard).join("")}${extra.map(x => `<a class="mod" href="${x.href}"><span class="tile">${ill(x.ic)}</span><div><small>${x.eb}</small><b>${x.t}</b><span>${x.meta}</span></div></a>`).join("")}</div>
  </main>`;
}
function primeraPendiente(l) { const p = partes(l).find(p => !parteHecha(l, p.k)); return p ? p.k : "apuntes"; }

/* ── hoja del módulo ── */
function abrirModulo(id, clase) {
  const k = MODS.findIndex(m => m.id === id); if (k < 0) return;
  const m = MODS[k], prev = MODS[k - 1], next = MODS[k + 1], cl = m.clases.map(byId), locked = cl.every(l => !abierta(l));
  const lesHTML = l => partes(l).map(p => {
    const cur = location.hash === `#/clase/${l.id}/${p.k}`, ok = parteHecha(l, p.k);
    return `<a class="les ${cur ? "cur" : ""} ${abierta(l) ? "" : "lk"}" href="#/clase/${l.id}/${p.k}"><span class="ic">${ic(p.ic)}</span><div><b>${esc(p.t)}</b><em>${p.tipo}${l.id === "1.1" ? " · Opcional" : ""}</em></div>${ok ? `<span class="st y">${ic("check")}</span>` : abierta(l) ? "" : `<span class="st">${ic("lock")}</span>`}</a>`;
  }).join("");
  let el = $("#sheet"); if (!el) { el = document.createElement("div"); el.id = "sheet"; el.className = "sheet"; document.body.appendChild(el); }
  el.innerHTML = `<div class="shtop"><button class="ib" data-close aria-label="Ver contenido">${ic("list")}</button>
      ${prev ? `<button class="nv" data-go="${prev.id}">${ic("left")}<span>${prev.eb}: ${esc(prev.t)}</span></button>` : "<span></span>"}<span></span>
      ${next ? `<button class="nv r" data-go="${next.id}"><span>${next.eb}: ${esc(next.t)}</span>${ic("right")}</button>` : "<span></span>"}
      <button class="ib" data-close aria-label="Cerrar">${ic("x")}</button></div>
    <div class="shbody"><div class="peek"></div><div class="panel"><div class="pin">
      <div class="mh"><span class="tile lg">${ill(m.ic)}</span><div><small>${m.eb}</small><h2>${esc(m.t)}</h2><span>${locked ? ic("lock") : ""}${m.flat ? `${partes(cl[0]).length} lecciones` : `${cl.length} ${cl.length === 1 ? "capítulo" : "capítulos"}`}</span></div></div>
      ${m.flat ? `<div class="lessons flat">${lesHTML(cl[0])}</div>` : cl.map((l, i) => `<div class="chap ${l.id === clase ? "open" : ""}"><button type="button"><span class="n">${String(i + 1).padStart(2, "0")}</span><div><b>${esc(l.t)}</b><em>${partes(l).length} lecciones${hecha(l.id) ? " · completado" : ""}</em></div>${hecha(l.id) ? `<span class="ok">${ic("check")}</span>` : ic("down", "i chev")}</button><div class="lessons">${lesHTML(l)}</div></div>`).join("")}
    </div></div><div class="peek"></div></div>`;
  el.classList.add("on"); document.documentElement.style.overflow = "hidden";
  $$("[data-close]", el).forEach(b => b.onclick = cerrarModulo);
  $$("[data-go]", el).forEach(b => b.onclick = () => abrirModulo(b.dataset.go));
  $$(".chap>button", el).forEach(b => b.onclick = () => b.parentElement.classList.toggle("open"));
  $$(".les", el).forEach(a => a.addEventListener("click", cerrarModulo));
  const o = $(".chap.open", el); if (o) o.scrollIntoView({ block: "center" });
}
function cerrarModulo() { const el = $("#sheet"); if (el) el.classList.remove("on"); document.documentElement.style.overflow = ""; }

/* ── lección ── */
function leccion(id, k) {
  const l = byId(id); if (!l) return `${topbar("inicio", {})}<main class="page"><p>No encontramos esa clase.</p></main>`;
  const ps = partes(l); k = ps.some(p => p.k === k) ? k : "apuntes";
  const seq = secuencia(), pos = seq.findIndex(([a, b]) => a === id && b === k), pv = seq[pos - 1], nx = seq[pos + 1];
  const m = modDe(id), p = ps.find(x => x.k === k), falta = ps.filter(x => !parteHecha(l, x.k)).length;
  S.ultima = id; save();
  const bar = topbar("leccion", { mod: m.id, titulo: `${m.eb}: ${m.t}`, prev: pv && `#/clase/${pv[0]}/${pv[1]}`, next: nx && `#/clase/${nx[0]}/${nx[1]}` });
  const ch = `<div class="chcard"><small>Capítulo ${l.id} <em>· ${falta ? `Faltan ${falta} ${falta === 1 ? "lección" : "lecciones"}` : "Completado"}</em></small><b>${esc(l.t)}</b><div class="segs">${ps.map(x => `<i class="${parteHecha(l, x.k) ? "y" : x.k === k ? "c" : ""}"></i>`).join("")}</div></div>`;
  let body;
  if (!abierta(l)) body = `<span class="eyeb">${p.tipo}</span><h1>${esc(p.t)}</h1>${bloqueo(l)}`;
  else if (k === "apuntes") body = apuntes(l);
  else if (k === "practica") body = `<span class="eyeb">Práctica</span><h1>${esc(p.t)}</h1><p style="margin:-14px 0 24px">${l.herr === "proyecto" ? "Llena los cuatro entregables. Se guardan solos." : esc(HERRAMIENTAS[l.herr].d) + " Cambia los números y mira qué pasa."}</p><div id="tool"></div>`;
  else if (k === "tarea") body = `<span class="eyeb">Práctica</span><h1>Tu tarea</h1><div class="tip"><b class="h">Lo que tienes que hacer</b>${l.tarea}</div>
      <label class="f">Tu respuesta<textarea class="in" id="tareaTx" placeholder="Escribe aquí. Se guarda sola.">${esc(S.tareas[id] || "")}</textarea></label>
      <div class="row" style="justify-content:space-between;margin-top:10px"><span class="saved" id="savedT">${S.tareas[id] ? "Guardada" : "Sin guardar"}</span></div>`;
  else body = quiz(l);
  const last = !nx;
  return `${bar}<div class="lwrap"><div class="lin">${ch}${body}</div></div>
    <div class="botbar"><button class="bbtn g ${S.rate[id] ? "on" : ""}" data-act="rate">${ic("rate")}<span class="lb">Valoración de la lección</span></button><a class="bbtn d" id="sig" href="${last ? "#/constancia" : `#/clase/${nx[0]}/${nx[1]}`}">${last ? "Ver mi constancia" : "Siguiente"} ${ic("arrow")}</a></div>
    <div class="rate" id="rate"><span>¿Te sirvió esta lección?</span><div><button data-r="up" class="${S.rate[id] === "up" ? "on" : ""}" aria-label="Me sirvió">${ic("up")}</button><button data-r="dn" class="${S.rate[id] === "dn" ? "on" : ""}" aria-label="No me sirvió">${ic("dn")}</button></div></div>`;
}
function apuntes(l) {
  const i = INSTR[l.quien], visto = !!S.chat[l.id];
  const bubs = [i.hola, l.gancho, l.promesa].filter(Boolean);
  const vid = CONFIG.videos[l.id];
  const resto = `${vid ? `<div class="vid"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(vid)}?rel=0" title="${esc(l.t)}" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>` : ""}
    ${l.aviso ? `<div class="tip"><b class="h">Aviso</b>${l.aviso}</div>` : ""}
    ${l.bloques.map(b => `<h3>${b.t}</h3>${b.p ? `<p>${b.p}</p>` : ""}${b.li.length ? `<ul>${b.li.map(x => `<li>${x}</li>`).join("")}</ul>` : ""}`).join("")}
    ${l.ejemplo ? `<div class="tip"><b class="h">En el video</b>${l.ejemplo}</div>` : ""}
    ${l.error ? `<div class="tip err"><b class="h">Error común</b>${l.error}</div>` : ""}
    ${l.cierre || l.puente ? `<div class="tip ok"><b class="h">Para cerrar</b>${l.cierre || l.puente}</div>` : ""}
    ${!vid ? `<p class="fine" style="margin-top:20px">El video de esta clase está en grabación. Mientras, estos apuntes tienen todo el contenido.</p>` : ""}
    <div class="instr">${i.f ? `<img src="${i.f}" alt="${i.n}">` : `<span class="ph">AG</span>`}<div><b>${i.n}</b><span>${i.r}</span></div></div>`;
  return `<span class="eyeb">Teoría${l.id === "1.1" ? " · Opcional" : ""}</span><h1>${esc(l.t)}</h1>
    <div class="chat"><span class="av ${i.f ? "" : "two"}" ${i.f ? `style="background-image:url(${i.f})"` : ""}>${i.f ? "" : "AG"}</span><div class="bubs" id="bubs" data-n="${bubs.length}">${visto ? bubs.map(b => `<div class="bub">${b}</div>`).join("") : ""}</div></div>
    <template id="bubsT">${bubs.map(b => `<div class="bub">${b}</div>`).join("")}</template>
    <div class="rest" id="rest" ${visto ? "" : 'style="display:none"'}>${resto}</div>`;
}
function quiz(l) {
  return `<span class="eyeb">Cuestionario</span><h1>Cuestionario «${esc(l.t)}»</h1><div id="quiz">
    ${l.quiz.map((q, k) => `<div class="qi" data-k="${k}"><h4>${k + 1}. ${q[0]}</h4><div class="opts">${q[1].map((o, j) => `<button type="button" class="opt" data-j="${j}"><span class="r"></span>${o}</button>`).join("")}</div><div class="why"></div></div>`).join("")}
    <div class="row" style="margin-top:20px"><button class="btn btn-p" id="qOk" type="button">Revisar respuestas</button><span class="fine" id="qMsg">${hecha(l.id) ? "Ya completaste este capítulo. Puedes repetirlo." : "Acierta todas para completar el capítulo."}</span></div></div>`;
}
function bloqueo(l) {
  return `<div class="lock"><span class="tile">${ic("lock")}</span><h2>El Nivel ${l.nivel} es parte de la inscripción</h2>
    <p>El Nivel 1 es gratis, igual que los capítulos 2.1 y 3.1. Para abrir el resto de trading, inteligencia artificial y el proyecto final, inscríbete y te mandamos tu código de alumno.</p>
    <div class="row" style="justify-content:center;margin-top:6px"><a class="btn btn-pe" href="${CONFIG.inscripcion}">Inscribirme ${ic("arrow")}</a></div>
    <form id="codeF"><input class="in mono" name="c" placeholder="Código de alumno" autocomplete="off" autocapitalize="characters" aria-label="Código de alumno"><button class="btn btn-p" type="submit">Abrir</button></form>
    <div class="msg" id="codeMsg"></div></div>`;
}

/* ── páginas ── */
function herramientas() {
  return `${topbar("inicio", { ruta: "herramientas" })}<main class="page"><span class="eyeb">Módulo adicional</span><h1>Herramientas para practicar</h1><p class="lead">Todas son gratis y guardan lo que escribes en este dispositivo.</p>
    <div class="tgrid">${Object.entries(HERRAMIENTAS).map(([k, h]) => `<a class="tl" href="#/h/${k}"><span class="tile">${ill("m-tool")}</span><div><b>${h.t}</b><span>${h.d}</span></div></a>`).join("")}</div></main>`;
}
function herramientaPag(k) {
  const h = HERRAMIENTAS[k]; if (!h) return `${topbar("inicio", {})}<main class="page"><p>No existe esa herramienta.</p></main>`;
  return `${topbar("inicio", { ruta: "h" })}<main class="page"><a class="fine" href="#/herramientas" style="display:inline-flex;gap:6px;align-items:center">${ic("back")} Herramientas</a><h1>${h.t}</h1><p class="lead">${h.d} Se ve en el <a href="#/clase/${h.clase}/apuntes" style="text-decoration:underline">capítulo ${h.clase}</a>.</p><div class="box"><div id="tool"></div></div></main>`;
}
function proyectoPag() {
  const l = byId("4.1");
  return `${topbar("inicio", {})}<main class="page"><span class="eyeb">Nivel 4</span><h1>Tu portafolio simulado con IA</h1>
    ${abierta(l) ? `<p class="lead">Cuatro entregables y mínimo 30 operaciones en simulador. Rúbrica: reglas seguidas 30%, riesgo 25%, uso de IA 20%, diario y análisis 15%, presentación 10%.</p><div class="box"><div id="tool"></div></div>` : bloqueo(l)}</main>`;
}
function constancia() {
  const n = Object.keys(S.hechas).filter(byId).length, falta = L.length - n, s = siguiente();
  const folio = "NPA-" + new Date(S.perfil.desde || Date.now()).getFullYear() + "-" + (Math.abs([...(S.perfil.nombre + S.perfil.desde)].reduce((a, c) => Math.imul(a, 31) + c.charCodeAt(0) | 0, 7)) % 100000).toString().padStart(5, "0");
  const fecha = new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
  return `${topbar("inicio", {})}<main class="page"><span class="eyeb">Módulo adicional</span><h1>${falta ? `Te faltan ${falta} ${falta === 1 ? "capítulo" : "capítulos"}` : "Completaste el campus"}</h1>
    <p class="lead">${falta ? "La constancia de avance se abre al completar los 23 capítulos (cada uno se completa al acertar todo su cuestionario)." : "Descarga tu constancia de avance. El certificado NORTHPOINT ACADEMY se emite al aprobar tu defensa del proyecto final."}</p>
    ${falta ? `<div class="box"><div class="segs" style="gap:3px">${L.map(l => `<i class="${hecha(l.id) ? "y" : ""}"></i>`).join("")}</div><p style="margin-top:14px">${n} de ${L.length} · siguiente: <a href="#/clase/${s.id}/${primeraPendiente(s)}" style="text-decoration:underline">${esc(s.t)}</a></p></div>`
    : `<div class="const"><div class="t"><span>northpoint academy</span><span>${folio}</span></div><div><small>Constancia de avance · Campus en línea</small><h2>${esc(S.perfil.nombre)}</h2><p>Completó los ${L.length} capítulos de los cuatro niveles del campus de NORTHPOINT ACADEMY: dinero y mercados, trading, inteligencia artificial aplicada y proyecto final, con sus cuestionarios aprobados.</p></div><div class="s"><div>André Macouzet</div><div>Gregorio Sánchez</div><div class="mono" style="font-weight:500">${fecha}</div></div><span class="seal">NORTH<br>POINT<br>2026</span></div>
      <div class="row" style="margin-top:18px"><button class="btn btn-p" type="button" onclick="print()">Descargar en PDF</button><a class="btn btn-g" href="#/proyecto">Ir al proyecto final</a></div>
      <p class="fine" style="margin-top:12px">Constancia de avance emitida por el campus. No es un título oficial ni una licencia para asesorar o administrar dinero de terceros.</p>`}</main>`;
}
function ajustes() {
  return `${topbar("inicio", { ruta: "ajustes" })}<main class="page"><h1>Configuración</h1><p class="lead">Tu avance se guarda en este dispositivo y navegador.</p>
    <form class="box" id="af" style="display:grid;gap:14px"><label class="f">Tu nombre<input class="in" name="nombre" value="${esc(S.perfil.nombre)}" maxlength="40"></label>
      <label class="f">Lo que te trae aquí<select class="in" name="meta">${Object.entries(METAS).map(([k, m]) => `<option value="${k}" ${S.perfil.meta === k ? "selected" : ""}>${m.t}</option>`).join("")}</select></label>
      <div class="row"><button class="btn btn-p" type="submit">Guardar</button></div></form>
    <div class="box" style="margin-top:12px"><b style="font:600 18px var(--h);color:var(--ink-s)">Código de alumno</b><p class="fine" style="margin:6px 0 12px">${S.acceso ? "Tienes acceso completo a los cuatro niveles." : "Ábrelo con el código que te mandamos al inscribirte."}</p>${S.acceso ? "" : `<form id="codeF" style="display:flex;gap:8px"><input class="in mono" name="c" placeholder="Código de alumno" autocomplete="off"><button class="btn btn-p" type="submit">Abrir</button></form><div class="fine" id="codeMsg" style="margin-top:8px"></div>`}</div>
    <div class="box" style="margin-top:12px"><b style="font:600 18px var(--h);color:var(--ink-s)">Empezar de cero</b><p class="fine" style="margin:6px 0 12px">Borra tu avance, tareas y diario de este dispositivo.</p><button class="btn btn-g" type="button" id="reset">Borrar mi avance</button></div></main>`;
}

/* ── paneles: buscar, soporte, tutor ── */
function indice() {
  const out = [];
  L.forEach(l => {
    const txt = plain([l.t, l.sub, l.gancho, l.promesa, ...l.bloques.flatMap(b => [b.t, b.p, ...b.li]), l.error, l.tarea, l.ejemplo].join(" "));
    out.push({ href: `#/clase/${l.id}/apuntes`, t: `${l.id} · ${l.t}`, s: l.sub, ic: modDe(l.id).ic, txt, l });
  });
  Object.entries(HERRAMIENTAS).forEach(([k, h]) => out.push({ href: `#/h/${k}`, t: h.t, s: "Herramienta · " + h.d, ic: "m-tool", txt: h.t + " " + h.d }));
  return out;
}
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
function buscarEn(q) {
  const ws = norm(q).split(/\W+/).filter(w => w.length > 2 && !["que","como","para","con","los","las","una","del","por","mas","esto","cual","sobre"].includes(w));
  if (!ws.length) return [];
  return indice().map(x => { const t = norm(x.txt), tt = norm(x.t); let sc = 0; ws.forEach(w => { if (tt.includes(w)) sc += 5; const n = t.split(w).length - 1; sc += Math.min(n, 6); }); return { ...x, sc }; }).filter(x => x.sc > 0).sort((a, b) => b.sc - a.sc);
}
function abrirBuscar() {
  let el = $("#srch"); if (!el) { el = document.createElement("div"); el.id = "srch"; el.className = "srch"; document.body.appendChild(el); }
  el.innerHTML = `<div class="sbox"><div class="q">${ic("search")}<input id="sq" placeholder="Busca una clase, un tema o una herramienta" autocomplete="off"><button class="ib" id="sx" aria-label="Cerrar">${ic("x")}</button></div><div class="sres" id="sres"></div></div>`;
  el.classList.add("on");
  const pinta = () => { const q = $("#sq").value, r = q.trim() ? buscarEn(q).slice(0, 12) : indice().slice(0, 8);
    $("#sres").innerHTML = r.length ? r.map((x, i) => `<a href="${x.href}" class="${i === 0 ? "on" : ""}"><span class="tile">${ill(x.ic)}</span><div><b>${esc(x.t)}</b><span>${esc(x.s)}</span></div></a>`).join("") : `<p class="fine" style="padding:14px">Sin resultados para “${esc(q)}”.</p>`;
    $$("#sres a").forEach(a => a.onclick = cerrarBuscar); };
  $("#sq").oninput = pinta; $("#sq").onkeydown = e => { if (e.key === "Enter") { const a = $("#sres a"); if (a) { location.hash = a.getAttribute("href"); cerrarBuscar(); } } };
  $("#sx").onclick = cerrarBuscar; el.onclick = e => { if (e.target === el) cerrarBuscar(); };
  pinta(); setTimeout(() => $("#sq").focus(), 30);
}
function cerrarBuscar() { const el = $("#srch"); if (el) el.classList.remove("on"); }
function flotante(id, titulo, cuerpo, pie = "") {
  $$(".float").forEach(f => { if (f.id !== id) f.classList.remove("on"); });
  let el = $("#" + id);
  if (!el) { el = document.createElement("div"); el.id = id; el.className = "float"; document.body.appendChild(el); el.innerHTML = `<div class="fhd"><span>${titulo}</span><button class="ib" aria-label="Cerrar">${ic("x")}</button></div>${cuerpo}${pie}`; $(".fhd .ib", el).onclick = () => el.classList.remove("on"); }
  el.classList.toggle("on"); return el;
}
function abrirSoporte() {
  const wa = CONFIG.whatsapp ? `<a class="btn btn-g" href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>` : "";
  flotante("soporte", "Soporte", `<div class="fbody"><p class="nm">¿Algo no funciona o tienes una duda que no está en tus clases? Escríbenos y te respondemos.</p><div class="row"><a class="btn btn-p" href="mailto:${CONFIG.correo}?subject=${encodeURIComponent("Soporte campus NORTHPOINT ACADEMY")}">${ic("mail")}Escribir al equipo</a>${wa}</div><p class="fine">Para dudas de contenido, prueba primero con el Tutor de IA: busca la respuesta en tus clases.</p></div>`);
}
function abrirTutor() {
  const el = flotante("tutor", "Chatear con Nori", `<div class="fbody" id="tb"><p class="nm">Hola${S.perfil ? ", " + esc(S.perfil.nombre) : ""}. Soy Nori: busco la respuesta en tus 23 clases y te llevo al capítulo exacto. Pregúntame algo.</p><div class="row" id="sugs">${["¿Qué es la regla del 72?", "¿Cuántos contratos opero?", "¿Cómo escribo un buen prompt?", "¿Cómo detecto un fraude?"].map(s => `<button class="chip" type="button">${s}</button>`).join("")}</div></div>`,
    `<form class="fin" id="tf"><input id="ti" placeholder="Pregunta cualquier cosa..." autocomplete="off"><div class="row"><span></span><button class="send" type="submit">${ic("arrow")}Enviar</button></div></form><div class="ffoot">Nori busca en tus clases; no es asesoría de inversión.</div>`);
  if (el.dataset.w) return; el.dataset.w = 1;
  const ask = q => {
    const tb = $("#tb"); tb.insertAdjacentHTML("beforeend", `<p class="nm me">${esc(q)}</p>`);
    const r = buscarEn(q).filter(x => x.l).slice(0, 2);
    let a;
    if (!r.length) a = `No lo encontré en tus clases. Prueba con otras palabras o escribe al equipo en <a href="#" data-act="soporte">Soporte</a>.`;
    else a = "Esto lo vemos en tus clases:" + r.map(x => { const l = x.l, ws = norm(q).split(/\W+/).filter(w => w.length > 3);
      const b = l.bloques.find(b => ws.some(w => norm(plain(b.p + b.li.join(" ") + b.t)).includes(w))) || l.bloques[0];
      const sn = plain(b.p || b.li.join(" ")).slice(0, 220);
      return `<a class="ref" href="#/clase/${l.id}/apuntes"><b>${l.id} · ${esc(l.t)} · ${esc(b.t)}</b>${esc(sn)}${sn.length >= 220 ? "…" : ""}</a>`; }).join("");
    tb.insertAdjacentHTML("beforeend", `<div class="nm">${a}</div>`); tb.scrollTop = tb.scrollHeight;
    $$("#tb [data-act=soporte]").forEach(x => x.onclick = e => { e.preventDefault(); abrirSoporte(); });
  };
  $("#tf").onsubmit = e => { e.preventDefault(); const v = $("#ti").value.trim(); if (v) { ask(v); $("#ti").value = ""; } };
  $$("#sugs .chip").forEach(c => c.onclick = () => ask(c.textContent));
}

/* ── router ── */
function render() {
  window.__stopTool && window.__stopTool(); window.__stopTool = null; clearTimeout(render.chat);
  if (!S.perfil) return bienvenida();
  const r = location.hash.replace(/^#\/?/, "").split("/");
  let html, tool = null, ruta = r[0] || "";
  if (ruta === "clase") { html = leccion(r[1], r[2]); const l = byId(r[1]); if (l && abierta(l) && r[2] === "practica") tool = l.herr; }
  else if (ruta === "herramientas") html = herramientas();
  else if (ruta === "h") { html = herramientaPag(r[1]); tool = r[1]; }
  else if (ruta === "proyecto") { html = proyectoPag(); if (abierta(byId("4.1"))) tool = "proyecto"; }
  else if (ruta === "constancia") html = constancia();
  else if (ruta === "ajustes") html = ajustes();
  else html = inicio();
  $("#root").innerHTML = html;
  if (tool && T[tool] && $("#tool")) T[tool]($("#tool"));
  wire(r);
  if (!render.keep) scrollTo(0, 0); render.keep = false;
  if (ruta === "m" && r[1]) abrirModulo(r[1]); else cerrarModulo();
}
function marcarVista(id, k) { if (k === "apuntes" || k === "practica") { S.vistas[id + "/" + k] = true; save(); } }
function wire(r) {
  $$("[data-act]").forEach(b => b.addEventListener("click", e => {
    const a = b.dataset.act;
    if (a === "buscar") abrirBuscar();
    if (a === "soporte") abrirSoporte();
    if (a === "tutor") abrirTutor();
    if (a === "modulo") abrirModulo(b.dataset.m, r[0] === "clase" ? r[1] : null);
    if (a === "invitar") { const u = location.origin + location.pathname; (navigator.clipboard?.writeText(u) || Promise.reject()).then(() => toast("Link del campus copiado. Compártelo."), () => toast(u)); }
    if (a === "rate") $("#rate").classList.toggle("on");
  }));
  if (r[0] === "clase") {
    const id = r[1], k = r[2] || "apuntes", l = byId(id);
    const sig = $("#sig"); if (sig) sig.addEventListener("click", () => marcarVista(id, k));
    if (l && abierta(l) && k === "practica") marcarVista(id, k);
    $$("#rate [data-r]").forEach(b => b.onclick = () => { S.rate[id] = b.dataset.r; save(); $$("#rate [data-r]").forEach(x => x.classList.toggle("on", x === b)); $("[data-act=rate]").classList.add("on"); toast("Gracias, lo tomamos en cuenta"); setTimeout(() => $("#rate").classList.remove("on"), 700); });
    const bubs = $("#bubs");
    if (bubs && !S.chat[id]) {
      const tpl = [...$("#bubsT").content.children], rest = $("#rest");
      const skip = document.createElement("div"); skip.className = "skip"; skip.innerHTML = `<button type="button">Omitir</button>`; document.body.appendChild(skip);
      let n = 0;
      const fin = () => { clearTimeout(render.chat); bubs.innerHTML = ""; tpl.forEach(t => bubs.appendChild(t.cloneNode(true))); rest.style.display = ""; skip.remove(); S.chat[id] = 1; save(); };
      const paso = () => {
        if (n >= tpl.length) return fin();
        const ty = document.createElement("div"); ty.className = "bub typing"; ty.innerHTML = "<i></i><i></i><i></i>"; bubs.appendChild(ty);
        render.chat = setTimeout(() => { ty.remove(); bubs.appendChild(tpl[n].cloneNode(true)); n++; render.chat = setTimeout(paso, n >= tpl.length ? 500 : 650); }, Math.min(1400, 450 + plain(tpl[n].textContent).length * 6));
      };
      skip.firstChild.onclick = fin;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) fin(); else paso();
      const off = () => { skip.remove(); removeEventListener("hashchange", off); }; addEventListener("hashchange", off);
    }
  }
  const t = $("#tareaTx");
  if (t) { const id = r[1]; t.addEventListener("input", () => { S.tareas[id] = t.value; save(); const s = $("#savedT"); s.textContent = "Guardada"; s.classList.add("on"); $$(".segs i")[partes(byId(id)).findIndex(p => p.k === "tarea")]?.classList.toggle("y", !!t.value.trim()); clearTimeout(wire.t); wire.t = setTimeout(() => s.classList.remove("on"), 900); }); }
  const q = $("#quiz");
  if (q) {
    const id = r[1], l = byId(id), sel = {};
    $$(".qi", q).forEach(it => $$(".opt", it).forEach(o => o.onclick = () => { sel[it.dataset.k] = +o.dataset.j; $$(".opt", it).forEach(x => x.className = "opt" + (x === o ? " sel" : "")); $(".why", it).textContent = ""; }));
    $("#qOk").onclick = () => {
      if (Object.keys(sel).length < l.quiz.length) { $("#qMsg").textContent = "Te falta responder alguna pregunta."; return; }
      let bien = 0;
      $$(".qi", q).forEach(it => { const k = +it.dataset.k, qq = l.quiz[k], ok = sel[k] === qq[2]; if (ok) bien++;
        $$(".opt", it).forEach(x => { const j = +x.dataset.j; x.className = "opt" + (j === sel[k] ? (ok ? " ok" : " bad") : ""); });
        const w = $(".why", it); w.className = "why " + (ok ? "ok" : "bad"); w.textContent = ok ? "Correcto. " + qq[3] : "Revisa los apuntes e inténtalo otra vez."; });
      S.quiz[id] = { bien, de: l.quiz.length, fecha: new Date().toISOString() };
      if (bien === l.quiz.length) {
        const nueva = !hecha(id); S.hechas[id] ||= new Date().toISOString(); save();
        $("#qMsg").textContent = `${bien}/${l.quiz.length}. Capítulo completado.`;
        if (nueva) { toast("Capítulo completado"); const segs = $$(".segs i"); segs[segs.length - 1].className = "y"; }
      } else { save(); $("#qMsg").textContent = `${bien}/${l.quiz.length}. Corrige las que fallaste para completar el capítulo.`; }
    };
  }
  const f = $("#codeF");
  if (f) f.onsubmit = async e => {
    e.preventDefault(); const c = f.c.value.trim().toUpperCase(), m = $("#codeMsg");
    if (!c) return;
    let h = ""; try { h = await sha(c); } catch (_) {}
    if (CONFIG.acceso.includes(h)) { S.acceso = { desde: new Date().toISOString() }; save(); toast("Acceso completo abierto"); render.keep = true; render(); }
    else { m.style.color = "var(--neg)"; m.textContent = "Ese código no es válido. Revísalo o escríbenos."; }
  };
  const af = $("#af");
  if (af) af.onsubmit = e => { e.preventDefault(); const n = af.nombre.value.trim(); if (n) S.perfil.nombre = n.slice(0, 40); S.perfil.meta = af.meta.value; save(); toast("Guardado"); };
  const rs = $("#reset");
  if (rs) rs.onclick = () => { if (confirm("¿Borrar tu avance de este dispositivo? No se puede deshacer.")) { S = { hechas: {}, tareas: {}, quiz: {}, herr: {}, diario: [], proyecto: {}, vistas: {}, chat: {}, rate: {} }; save(); location.hash = "#/"; render(); } };
}
addEventListener("hashchange", render);
addEventListener("keydown", e => { if (e.key === "Escape") { cerrarBuscar(); cerrarModulo(); $$(".float").forEach(f => f.classList.remove("on")); } if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && S.perfil) { e.preventDefault(); abrirBuscar(); } });
render();
