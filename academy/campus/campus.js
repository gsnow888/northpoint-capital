/* NORTHPOINT ACADEMY · Campus v3 (24-nov-2026)
   Plataforma completa: inicio con progreso, racha, semana y programas; programas con temario; Fundamentos (23 capítulos
   de los guiones); calendario con plan de estudio y exportación .ics; herramientas, diario, proyecto, constancia,
   configuración, buscador y Nori (tutor que busca en las clases; no es un modelo de lenguaje).
   El avance vive en este dispositivo (localStorage).
   CONFIG.videos: ID de YouTube por capítulo cuando se graben, p. ej. "1.2": "dQw4w9WgXcQ".
   CONFIG.sesiones: sesiones en vivo reales, p. ej. { f:"2026-12-03T19:00", t:"Revisión de proyectos", link:"https://..." }.
   CONFIG.acceso: SHA-256 de los códigos de alumno. Es una puerta de cortesía en el navegador, no protección real. */
const CONFIG = {
  videos: {},
  sesiones: [],
  acceso: ["354c1f96d219de2f21d16e955619daabfd8ab63cc4ca4e77538de55f2407832d"],
  nivelesLibres: [1],
  clasesLibres: ["2.1", "3.1"],
  inscripcion: "../../academia.html#inscripcion",
  ofertaFin: "2026-12-31T23:59:59-06:00",
  correo: "hola@northpointcapital.io",
  whatsapp: ""
};

const L = window.LECCIONES || [];
const NIVELES = {
  1: { n: "Dinero y mercados", d: "Inflación, interés compuesto, presupuesto, deuda y fraudes.", c: "#3DDC97" },
  2: { n: "Trading", d: "Gráficos, estructura, riesgo, psicología y diario. En simulador.", c: "#2563FF" },
  3: { n: "IA aplicada", d: "Prompts, investigación, IA para negocio, marketing, código y agentes.", c: "#A78BFA" },
  4: { n: "Proyecto final", d: "Portafolio simulado con asistente de IA, defendido en vivo.", c: "#F5B942" }
};
const INSTR = {
  andre: { n: "André Macouzet", r: "IA, programación, riesgo y mercados", f: "../img/w/andre.webp" },
  goyo: { n: "Gregorio Sánchez", r: "Finanzas, patrimonio y negocios", f: "../img/w/goyo.webp" },
  ambos: { n: "André Macouzet y Gregorio Sánchez", r: "Fundadores de NORTHPOINT", f: "" }
};
const IMG = "../img/w/";
const PROGRAMAS = [
  { id: "fund", n: "Fundamentos NORTHPOINT", d: "El campus base: dinero, trading en simulador, IA aplicada y proyecto final en 23 capítulos.", dur: "23 capítulos · a tu ritmo", pr: 0, img: "hero.webp", ins: "ambos", campus: true },
  { id: "neg", n: "IA y Negocios Digitales", d: "Inteligencia artificial para atención a clientes, operación, marketing, anuncios y números.", dur: "10 semanas", pr: 2400, img: "marketing.webp", ins: "goyo", cursos: ["ianeg", "mkt", "agentes", "excel"], extra: ["Sesiones en vivo con casos de negocio", "Plantillas de prompts, embudos y modelos", "Examen y certificado"] },
  { id: "fin", n: "Finanzas y Patrimonio Familiar", d: "Presupuesto, deuda, interés compuesto, portafolios y la estructura que protege tu patrimonio.", dur: "10 semanas", pr: 2400, img: "finanzas.webp", ins: "goyo", cursos: ["pers", "excel", "port", "fide", "suc"], extra: ["Sesiones en vivo de casos reales", "Plantillas de modelo y protocolo familiar", "Examen y certificado"] },
  { id: "ia", n: "IA y Datos para Mercados", d: "Python, backtesting y machine learning aplicados a investigación y trading, sin autoengaño.", dur: "16 semanas", pr: 3900, img: "datos.webp", ins: "andre", cursos: ["py", "bt", "ml", "iatr", "agentes"], extra: ["Proyecto final revisado", "Código y plantillas de cada clase", "Examen y certificado"] },
  { id: "trader", n: "Trader Profesional de Futuros", d: "Plan escrito, riesgo definido y diario de cada operación, practicado en simulador.", dur: "12 semanas", pr: 2900, img: "trading.webp", ins: "andre", cursos: ["fut0", "estr", "ny", "riesgo", "fondeo", "mente"], extra: ["Sesiones en vivo de práctica", "Revisión de tus operaciones", "Examen y certificado"] },
  { id: "elite", n: "Programa Élite NORTHPOINT", d: "Todo el catálogo más seis meses de mentoría uno a uno con los fundadores.", dur: "6 meses · cupo de 10", pr: 9800, img: "elite.webp", ins: "ambos", cursos: ["ianeg", "mkt", "pers", "port", "py", "bt", "riesgo", "mente"], extra: ["Mentoría 1:1 cada semana", "Sesiones en la oficina de Morelia", "Todos los certificados"] }
];
const HERRAMIENTAS = {
  inflacion: { t: "Calculadora de inflación", d: "Cuánto vale hoy el dinero que guardaste.", ic: "coin", clase: "1.2" },
  compuesto: { t: "Bola de nieve", d: "Interés compuesto, regla del 72 y comisiones.", ic: "trend", clase: "1.3" },
  presupuesto: { t: "Presupuesto 50/30/20", d: "Tu dinero del mes contra la regla.", ic: "pie", clase: "1.4" },
  cuatro: { t: "¿Inviertes o apuestas?", d: "La prueba de las 4 preguntas.", ic: "scale", clase: "1.5" },
  banderas: { t: "Detector de fraudes", d: "Las 5 banderas rojas de un anuncio.", ic: "shield", clase: "1.7" },
  riesgo: { t: "Tamaño de posición", d: "Contratos según tu riesgo y tu stop.", ic: "target", clase: "2.6" },
  respira: { t: "Respiración guiada", d: "Cuadrada, suspiro fisiológico y exhalación larga.", ic: "wind", clase: "2.8" },
  diario: { t: "Diario de trading", d: "Registra en R y mira tu estadística.", ic: "book", clase: "2.9" },
  prompt: { t: "Constructor de prompts", d: "Rol, Contexto, Tarea, Formato.", ic: "chat", clase: "3.1" },
  embudo: { t: "¿Te conviene anunciarte?", d: "Costo por cliente contra lo que te deja.", ic: "funnel", clase: "3.4" }
};
const METAS = {
  dinero: { t: "Ordenar mi dinero", d: "Ahorro, deuda, interés compuesto", prog: "fin" },
  negocio: { t: "Hacer crecer un negocio", d: "IA y marketing para vender", prog: "neg" },
  ia: { t: "Dominar la IA", d: "Prompts, código y agentes", prog: "ia" },
  mercados: { t: "Entender los mercados", d: "Acciones, gráficos y riesgo", prog: "trader" }
};
const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

/* ── estado ── */
const KEY = "npa-campus-v1";
let S = (() => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (_) { return {}; } })();
["hechas", "tareas", "quiz", "herr", "proyecto", "vistas", "act"].forEach(k => { if (!S[k] || typeof S[k] !== "object") S[k] = {}; });
if (!Array.isArray(S.diario)) S.diario = [];
if (!S.plan) S.plan = { dias: [1, 3, 5], hora: "19:00", porSesion: 1 };
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (_) {} }

const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];
const ic = (n, cls = "i") => `<svg class="${cls}"><use href="#i-${n}"/></svg>`;
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const plain = s => String(s ?? "").replace(/<[^>]+>/g, "");
const mxn = n => (n < 0 ? "-$" : "$") + Math.round(Math.abs(n)).toLocaleString("es-MX");
const usd = n => "$" + n.toLocaleString("en-US") + " USD";
const num = (v, d = 0) => { const n = parseFloat(String(v).replace(/[^\d.\-]/g, "")); return isFinite(n) ? n : d; };
const byId = id => L.find(x => x.id === id);
const abierta = l => CONFIG.nivelesLibres.includes(l.nivel) || CONFIG.clasesLibres.includes(l.id) || !!S.acceso;
const hecha = id => !!S.hechas[id];
const nHechas = () => Object.keys(S.hechas).filter(byId).length;
const pct = () => Math.round(nHechas() / L.length * 100);
function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("on"), 2200); }
async function sha(t) { const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join(""); }
function siguiente() { return L.find(l => !hecha(l.id) && abierta(l)) || L.find(l => !hecha(l.id)) || L[L.length - 1]; }
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const iniciales = n => (n || "?").trim().split(/\s+/).slice(0, 2).map(p => p[0]).join("").toUpperCase();
const ymd = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const hoyS = () => ymd(new Date());
function act() { const k = hoyS(); S.act[k] = (S.act[k] || 0) + 1; save(); }
function diasActivos() { const set = new Set(Object.keys(S.act).filter(k => S.act[k] > 0)); Object.values(S.hechas).forEach(v => { if (typeof v === "string" && v.length >= 10) set.add(ymd(new Date(v))); }); return set; }
function racha() { const set = diasActivos(); const d = new Date(); if (!set.has(ymd(d))) d.setDate(d.getDate() - 1); let n = 0; while (set.has(ymd(d))) { n++; d.setDate(d.getDate() - 1); } return n; }
const minRestantes = () => L.filter(l => !hecha(l.id)).reduce((a, l) => a + l.min, 0);
const progreso = p => p.campus ? pct() : 0;
const enOferta = () => Date.now() < new Date(CONFIG.ofertaFin).getTime();

/* plan de estudio: reparte los capítulos pendientes en los días elegidos */
function agenda(dias = 120) {
  const pend = L.filter(l => !hecha(l.id) && abierta(l)).map(l => l.id), out = {}, d = new Date();
  const ps = Math.max(1, Math.min(4, +S.plan.porSesion || 1));
  for (let i = 0; i < dias && pend.length; i++) {
    if (S.plan.dias.includes(d.getDay())) out[ymd(d)] = pend.splice(0, ps);
    d.setDate(d.getDate() + 1);
  }
  return out;
}
function hechasPorDia() { const out = {}; Object.entries(S.hechas).forEach(([id, v]) => { if (byId(id) && typeof v === "string" && v.length >= 10) { const k = ymd(new Date(v)); (out[k] = out[k] || []).push(id); } }); return out; }
function eventosFijos() {
  const ev = {};
  CONFIG.sesiones.forEach(s => { const k = s.f.slice(0, 10); (ev[k] = ev[k] || []).push({ c: "vivo", t: s.t, h: s.f.slice(11, 16), link: s.link }); });
  if (!S.acceso && enOferta()) { const k = CONFIG.ofertaFin.slice(0, 10); (ev[k] = ev[k] || []).push({ c: "fecha", t: "Último día del 15% al agendar consulta" }); }
  return ev;
}
const LOGROS = [
  { t: "Primer capítulo", d: "Completa tu primer capítulo", ic: "check", ok: () => nHechas() >= 1 },
  { t: "Nivel 1 completo", d: "Termina Dinero y mercados", ic: "coin", ok: () => L.filter(l => l.nivel === 1).every(l => hecha(l.id)) },
  { t: "Racha de 5 días", d: "Estudia 5 días seguidos", ic: "fire", ok: () => racha() >= 5 },
  { t: "Constancia", d: "10 tareas entregadas", ic: "book", ok: () => Object.values(S.tareas).filter(t => (t || "").trim()).length >= 10 },
  { t: "Diario en marcha", d: "10 operaciones registradas", ic: "trend", ok: () => S.diario.length >= 10 },
  { t: "Mitad del camino", d: "50% de Fundamentos", ic: "target", ok: () => pct() >= 50 },
  { t: "Proyecto listo", d: "Los 4 entregables completos", ic: "flag", ok: () => ["tesis", "plan", "ia", "res"].every(k => (S.proyecto[k] || "").trim().length >= 40) },
  { t: "Fundamentos completo", d: "Los 23 capítulos", ic: "award", ok: () => nHechas() === L.length }
];
const CURSOS = {"fut0":["Futuros del Nasdaq desde cero",14,86,["El mercado de futuros","Contratos NQ y MNQ","La plataforma y el gráfico","Su primera operación con riesgo definido","Registro y revisión"]],"estr":["Estructura de mercado y liquidez",18,104,["Estructura: máximos y mínimos","Liquidez y dónde se acumula","Equilibrio, desequilibrio y FVG","Temporalidades: de 4 horas a 1 minuto","El mapa del día"]],"ny":["Sesión de Nueva York: plan, ejecución y registro",12,64,["La rutina de la mañana","Apertura y primeros 30 minutos","Ejecución y gestión","Cuándo no operar","Cierre y bitácora"]],"riesgo":["Gestión de riesgo profesional",10,58,["Por qué se pierde una cuenta","Tamaño de posición","Límites diarios y mensuales","Drawdown y recuperación","Métricas: R, expectativa y factor de ganancia"]],"fondeo":["Cuentas de fondeo: del examen al retiro",9,48,["Cómo funcionan las firmas","Reglas que importan","El plan de la evaluación","Cuenta fondeada y colchón","Retiros"]],"iatr":["IA aplicada al trading: de datos a señales",22,118,["Qué puede y qué no puede hacer la IA","Datos de mercado limpios","Variables y etiquetas","Modelos y validación","Del modelo a la regla de operación"]],"ml":["Machine learning para series de tiempo",24,126,["Series de tiempo y sus trampas","Validación walk-forward","Árboles y gradient boosting","Redes para secuencias","Evaluación económica del modelo"]],"agentes":["Agentes de IA para investigación financiera",12,62,["Modelos de lenguaje en finanzas","Instrucciones y contexto","Herramientas y búsqueda","Un agente para el reporte diario","Riesgos y verificación"]],"py":["Python para mercados financieros",20,112,["Python básico","Pandas y datos de mercado","Gráficas","Indicadores a mano","Su primer reporte automático"]],"bt":["Backtesting sin autoengaño",14,72,["Qué es un backtest honesto","El motor de pruebas","Costos reales","Sesgos y cómo evitarlos","Monte Carlo y tamaño de posición"]],"excel":["Modelación financiera en Excel",16,90,["Estructura de un buen modelo","Estados financieros","Proyecciones","Valuación por flujos","Escenarios y sensibilidad"]],"pers":["Finanzas personales e interés compuesto",8,44,["Su punto de partida","Presupuesto","Deudas y fondo de emergencia","Interés compuesto","Plan de ahorro a 5 años"]],"port":["Análisis de inversiones y portafolios",15,80,["Clases de activos","Riesgo y rendimiento","Construcción de portafolio","Rebalanceo","Activos digitales"]],"fide":["Fideicomisos y protección patrimonial",10,52,["Patrimonio y riesgos","El fideicomiso","Vehículos de tenencia","Protección de bienes","Casos prácticos"]],"suc":["Planeación sucesoria para familias",8,40,["Por qué se pierde un patrimonio","Vías de transmisión","Protocolo familiar","Impuestos","La siguiente generación"]],"mkt":["Marketing digital con IA",12,64,["El embudo de ventas","Contenido y ganchos con IA","Anuncios en Meta","Medir y escalar","Su campaña completa"]],"ianeg":["IA para tu empresa o negocio",10,54,["Qué puede hacer la IA en un negocio","Atención al cliente","Operación diaria","Decisiones con datos","Su primer proceso automatizado"]],"mente":["Psicología del trader: disciplina y proceso",7,36,["El trader contra sí mismo","Rutinas","Rachas perdedoras","Revisión y diario","Proceso sobre resultado"]]};

/* ── herramientas ── */
const T = {};
const H = k => (S.herr[k] = S.herr[k] || {});
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
    act(); save(); e.target.reset(); e.target.f.value = hoy; pinta(); toast("Operación registrada");
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


/* ── estructura ── */
const NAV = [
  ["", "home", "Inicio"], ["programas", "grid", "Programas"], ["clases", "play", "Fundamentos"], ["calendario", "cal", "Calendario"],
  ["herramientas", "tool", "Herramientas"], ["h/diario", "book", "Mi diario"], ["proyecto", "flag", "Proyecto final"], ["constancia", "award", "Certificado"]
];
const TITULOS = { "": "Inicio", programas: "Programas", programa: "Programa", clases: "Fundamentos", clase: "Fundamentos", calendario: "Calendario", herramientas: "Herramientas", h: "Herramientas", proyecto: "Proyecto final", constancia: "Certificado", ajustes: "Configuración" };
function shell(html, ruta, titulo) {
  const base = ruta.split("/")[0];
  const navOn = h => h === ruta || (h && base === h) || (h === "clases" && base === "clase") || (h === "programas" && base === "programa") || (h === "herramientas" && base === "h" && ruta !== "h/diario");
  $("#root").innerHTML = `<div class="app">
    <aside class="side" id="side">
      <a class="logo" href="#/"><span class="st"><svg viewBox="0 0 64 64"><use href="#i-star"/></svg></span><span><b>northpoint</b><small>Academy</small></span></a>
      <nav class="nav"><span class="lb">Aprende</span>${NAV.slice(0, 4).map(([h, i, t]) => `<a href="#/${h}" class="${navOn(h) ? "on" : ""}">${ic(i)}${t}${h === "clases" ? `<span class="ct">${nHechas()}/${L.length}</span>` : ""}</a>`).join("")}
        <span class="lb">Practica</span>${NAV.slice(4).map(([h, i, t]) => `<a href="#/${h}" class="${navOn(h) ? "on" : ""}">${ic(i)}${t}</a>`).join("")}
        <span class="lb">Cuenta</span><a href="#/ajustes" class="${ruta === "ajustes" ? "on" : ""}">${ic("gear")}Configuración</a><a href="#" data-act="soporte">${ic("help")}Soporte</a></nav>
      <a class="me" href="#/ajustes"><span class="av">${esc(iniciales(S.perfil.nombre))}</span><div style="min-width:0"><b>${esc(S.perfil.nombre)}</b><span>${S.acceso ? "Acceso completo" : "Nivel 1 gratis"}</span></div></a>
    </aside>
    <div class="scrim" id="scrim"></div>
    <div class="main">
      <header class="top"><button class="ibtn burger" id="burger" aria-label="Abrir menú">${ic("menu")}</button><h1>${esc(titulo || TITULOS[base] || "Campus")}</h1><span class="sp"></span>
        <button class="sbtn" data-act="buscar" aria-label="Buscar">${ic("search")}<span>Buscar clases y herramientas</span><kbd>⌘K</kbd></button>
        <a class="av" href="#/ajustes" aria-label="Mi cuenta" style="width:38px;height:38px">${esc(iniciales(S.perfil.nombre))}</a></header>
      <main class="content"><div class="view">${html}</div></main>
    </div></div>
    <nav class="tabbar">${[["", "home", "Inicio"], ["clases", "play", "Clases"], ["calendario", "cal", "Calendario"], ["herramientas", "tool", "Práctica"]].map(([h, i, t]) => `<a href="#/${h}" class="${navOn(h) ? "on" : ""}">${ic(i)}${t}</a>`).join("")}<button type="button" id="mas">${ic("menu")}Más</button></nav>
    <button class="fab" data-act="tutor" aria-label="Pregúntale a Nori">${ic("spark")}<span>Pregúntale a Nori</span></button>`;
  const open = () => document.body.classList.add("drawer"), close = () => document.body.classList.remove("drawer");
  $("#burger").onclick = open; $("#mas").onclick = open; $("#scrim").onclick = close;
  $$("#side a").forEach(a => a.addEventListener("click", close));
}

/* ── bienvenida ── */
function bienvenida() {
  let meta = "", dias = [1, 3, 5];
  $("#root").innerHTML = `<div class="welcome"><div class="wbox">
    <a class="logo" href="../../academia.html" style="padding:0"><span class="st"><svg viewBox="0 0 64 64"><use href="#i-star"/></svg></span><span><b>northpoint</b><small>Academy</small></span></a>
    <h1>Bienvenido a tu <span>campus</span>.</h1>
    <p style="color:var(--muted);font-size:16px">Programas de dinero, inteligencia artificial, negocios y mercados. Empieza gratis con el Nivel 1 de Fundamentos y arma tu plan de estudio.</p>
    <form id="wf" class="card" style="display:grid;gap:16px">
      <label class="f">¿Cómo te llamas?<input class="in" name="nombre" required autocomplete="given-name" maxlength="40" placeholder="Tu nombre"></label>
      <div class="f" style="display:grid;gap:8px"><span>¿Cuál es tu objetivo principal?</span><div class="goals">${Object.entries(METAS).map(([k, m]) => `<button type="button" class="goal" data-m="${k}"><b>${m.t}</b><span>${m.d}</span></button>`).join("")}</div></div>
      <div class="f" style="display:grid;gap:8px"><span>¿Qué días quieres estudiar?</span><div class="dayt" id="wdays">${DIAS.map((d, i) => `<button type="button" data-d="${i}" class="${dias.includes(i) ? "on" : ""}">${d}</button>`).join("")}</div></div>
      <button class="btn btn-p" type="submit" style="height:48px">Entrar al campus ${ic("arrow")}</button>
      <p class="fine">Tu avance se guarda en este dispositivo. No pedimos correo ni contraseña para empezar.</p>
    </form></div></div>`;
  $$(".goal").forEach(b => b.onclick = () => { meta = b.dataset.m; $$(".goal").forEach(x => x.classList.toggle("on", x === b)); });
  $$("#wdays button").forEach(b => b.onclick = () => { const d = +b.dataset.d; dias = dias.includes(d) ? dias.filter(x => x !== d) : [...dias, d].sort(); b.classList.toggle("on"); });
  $("#wf").onsubmit = e => { e.preventDefault(); S.perfil = { nombre: e.target.nombre.value.trim().slice(0, 40), meta: meta || "dinero", desde: new Date().toISOString() }; S.plan.dias = dias.length ? dias : [1, 3, 5]; save(); location.hash = "#/"; render(); };
}

/* ── piezas ── */
const progCard = p => {
  const pr = progreso(p), incl = p.campus || S.acceso && p.id === "fund";
  const badge = p.campus ? (pr ? `<span class="chip b badge">En curso · ${pr}%</span>` : `<span class="chip g badge">Nivel 1 gratis</span>`) : `<span class="chip badge" style="background:rgba(0,0,0,.6)">Inscripción abierta</span>`;
  return `<a class="pc" href="#/programa/${p.id}"><div class="im" style="background-image:url(${IMG}${p.img})"></div>${badge}<div class="bd"><span class="fine">${p.dur}</span><h3>${esc(p.n)}</h3><p>${esc(p.d)}</p>
    <div class="ft">${p.campus ? `<div class="bar" style="flex:1"><i style="width:${pr}%"></i></div><b style="margin-left:10px">${pr}%</b>` : `<span>Desde</span><b>${usd(p.pr)}</b>`}</div></div></a>`;
};
const toolCard = (k, h) => `<a class="tl" href="#/h/${k}"><span class="ic">${ic(h.ic)}</span><div><b>${h.t}</b><span>${h.d}</span></div></a>`;
function weekStrip() {
  const ag = agenda(14), hd = hechasPorDia(), fx = eventosFijos(), d = new Date(); d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  let out = "";
  for (let i = 0; i < 7; i++) {
    const k = ymd(d), esHoy = k === hoyS(), pl = ag[k] || [], hh = hd[k] || [];
    out += `<div class="wd ${esHoy ? "hoy" : ""}"><small>${DIAS[d.getDay()]}</small><b>${d.getDate()}</b>${hh.length ? `<span class="okd">${ic("check")} ${hh.length}</span>` : ""}${pl.slice(0, 2).map(id => `<a class="ev" href="#/clase/${id}" title="${esc(byId(id).t)}">${id}</a>`).join("")}${(fx[k] || []).map(e => `<span class="ev" style="color:var(--gold);background:rgba(245,185,66,.12)">${e.c === "vivo" ? "En vivo" : "Fecha"}</span>`).join("")}</div>`;
    d.setDate(d.getDate() + 1);
  }
  return out;
}

/* ── inicio ── */
function inicio() {
  const s = siguiente(), p = pct(), C = 2 * Math.PI * 52, r = racha(), meta = METAS[S.perfil.meta] || METAS.dinero;
  const h = new Date().getHours(), sal = h < 12 ? "Buenos días" : h < 19 ? "Buenas tardes" : "Buenas noches";
  const fecha = cap(new Date().toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" }));
  const prox = CONFIG.sesiones.filter(x => new Date(x.f) > new Date()).sort((a, b) => a.f.localeCompare(b.f)).slice(0, 3);
  const ag = agenda(30), proxEstudio = Object.entries(ag).slice(0, 3);
  const recomendado = PROGRAMAS.find(x => x.id === meta.prog);
  return `<div class="hello"><div><p style="margin:0 0 4px">${fecha}</p><h2>${sal}, <span>${esc(S.perfil.nombre)}</span></h2></div>
      <div class="row"><span class="chip">${ic("fire")}Racha: ${r} ${r === 1 ? "día" : "días"}</span><span class="chip b">${ic("clock")}${Math.round(minRestantes() / 60 * 10) / 10} h para terminar Fundamentos</span></div></div>
    <div class="g-top stag">
      <a class="card cont" href="#/clase/${s.id}"><div class="im" style="background-image:url(${IMG}${["hero", "trading", "ia", "elite"][s.nivel - 1]}.webp)"></div>
        <div class="bd"><span class="eyebrow">${nHechas() ? "Continúa donde te quedaste" : "Tu primer capítulo"}</span><h3>${esc(s.t)}</h3><p style="color:var(--muted)">${esc(s.sub)}</p>
          <div class="meta"><span class="chip"><span class="dot" style="background:${NIVELES[s.nivel].c}"></span>Nivel ${s.nivel} · ${NIVELES[s.nivel].n}</span><span class="chip">${s.min} min</span></div>
          <div class="pg"><span><span>Fundamentos</span><span>${p}%</span></span><div class="bar"><i style="width:${p}%"></i></div></div>
          <span class="btn btn-p" style="align-self:flex-start;margin-top:6px">${abierta(s) ? "Continuar" : "Ver cómo desbloquear"} ${ic("arrow")}</span></div></a>
      <div class="card prog"><div class="ring"><svg viewBox="0 0 120 120"><defs><linearGradient id="rg" x1="0" x2="1"><stop offset="0" stop-color="#2563FF"/><stop offset="1" stop-color="#7AA2FF"/></linearGradient></defs><circle cx="60" cy="60" r="52" fill="none" stroke="#202026" stroke-width="10"/><circle class="v" cx="60" cy="60" r="52" fill="none" stroke="url(#rg)" stroke-width="10" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - p / 100)}"/></svg><div class="v2"><span>${p}%<small>avance</small></span></div></div>
        <div class="stats"><div class="stat"><span>${ic("check")}Capítulos</span><b>${nHechas()}/${L.length}</b></div><div class="stat"><span>${ic("book")}Tareas entregadas</span><b>${Object.values(S.tareas).filter(t => (t || "").trim()).length}</b></div><div class="stat"><span>${ic("trend")}Operaciones en diario</span><b>${S.diario.length}</b></div><div class="stat"><span>${ic("award")}Logros</span><b>${LOGROS.filter(x => x.ok()).length}/${LOGROS.length}</b></div></div></div>
    </div>
    <div class="g-mid stag">
      <div class="card"><div class="ch"><h3>Tu semana</h3><a href="#/calendario">Ver calendario</a></div><div class="week">${weekStrip()}</div>
        <p class="fine" style="margin-top:12px">Plan: ${S.plan.dias.map(d => DIAS[d]).join(", ")} a las ${S.plan.hora} · ${S.plan.porSesion} ${S.plan.porSesion == 1 ? "capítulo" : "capítulos"} por sesión.</p></div>
      <div class="card"><div class="ch"><h3>Próximas sesiones de estudio</h3></div><div class="list">${proxEstudio.length ? proxEstudio.map(([k, ids]) => { const d = new Date(k + "T12:00"); return `<a class="li" href="#/clase/${ids[0]}"><span class="dt"><b>${d.getDate()}</b><small>${d.toLocaleDateString("es-MX", { month: "short" }).replace(".", "")}</small></span><div><b class="t">${esc(byId(ids[0]).t)}</b><span>${DIAS[d.getDay()]} · ${S.plan.hora}${ids.length > 1 ? ` · +${ids.length - 1}` : ""}</span></div>${ic("right")}</a>`; }).join("") : `<div class="empty">Completaste todo lo disponible. ${S.acceso ? "" : "Inscríbete para abrir los niveles 2 a 4."}</div>`}</div></div>
      <div class="card"><div class="ch"><h3>Sesiones en vivo</h3></div>${prox.length ? `<div class="list">${prox.map(x => { const d = new Date(x.f); return `<a class="li" href="${esc(x.link || "#")}" target="_blank" rel="noopener"><span class="dt"><b>${d.getDate()}</b><small>${d.toLocaleDateString("es-MX", { month: "short" }).replace(".", "")}</small></span><div><b class="t">${esc(x.t)}</b><span>${d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}</span></div>${ic("video")}</a>`; }).join("")}</div>` : `<div class="empty">${ic("video")}<br>Las sesiones en vivo de tu programa aparecerán aquí con fecha, hora y enlace.</div>`}</div>
    </div>
    <div class="sec"><h2>Programas disponibles</h2><a href="#/programas">Ver todos</a></div>
    <div class="pgrid stag">${PROGRAMAS.map(progCard).join("")}</div>
    ${recomendado ? `<div class="card" style="margin-top:16px;display:flex;gap:16px;align-items:center;flex-wrap:wrap;background:linear-gradient(120deg,rgba(37,99,255,.16),rgba(11,11,13,1) 60%)"><span class="eyebrow">Recomendado para ti</span><b style="font:600 17px var(--h)">${esc(recomendado.n)}</b><span class="fine" style="flex:1;min-width:200px">Por tu objetivo: ${esc(meta.t.toLowerCase())}.${!S.acceso && enOferta() ? " 15% de descuento si agendas tu consulta antes del 31 de diciembre." : ""}</span><a class="btn btn-p" href="#/programa/${recomendado.id}">Ver programa ${ic("arrow")}</a></div>` : ""}
    <div class="sec"><h2>Herramientas</h2><a href="#/herramientas">Ver las 10</a></div>
    <div class="tgrid stag">${Object.entries(HERRAMIENTAS).slice(0, 4).map(([k, h]) => toolCard(k, h)).join("")}</div>
    <div class="sec"><h2>Logros</h2></div>
    <div class="logros stag">${LOGROS.map(x => `<div class="lg ${x.ok() ? "on" : ""}"><span class="ic">${ic(x.ic)}</span><div><b>${x.t}</b><span>${x.d}</span></div></div>`).join("")}</div>`;
}

/* ── programas ── */
function programas() {
  return `<div class="hello"><div><h2>Programas</h2><p>Elige tu ruta. Fundamentos está abierto: empieza gratis con el Nivel 1.</p></div></div><div class="pgrid stag">${PROGRAMAS.map(progCard).join("")}</div>`;
}
function programa(id) {
  const p = PROGRAMAS.find(x => x.id === id); if (!p) return `<div class="empty">No encontramos ese programa.</div>`;
  const ins = INSTR[p.ins];
  if (p.campus) {
    return `<div class="ban" style="background-image:url(${IMG}${p.img})"><div class="in2"><span class="eyebrow">Programa base · incluido</span><h2>${esc(p.n)}</h2><p>${esc(p.d)}</p><div class="row"><span class="chip b">${pct()}% completado</span><span class="chip">${L.length} capítulos</span><span class="chip">${Math.round(L.reduce((a, l) => a + l.min, 0) / 60 * 10) / 10} h</span></div></div></div>
      <div class="p2"><div class="card"><div class="ch"><h3>Temario</h3></div><div class="acc">${[1, 2, 3, 4].map(n => { const ls = L.filter(l => l.nivel === n); return `<details ${n === siguiente().nivel ? "open" : ""}><summary><span class="n">0${n}</span><div><b>${NIVELES[n].n}</b><br><span>${ls.length} capítulos · ${ls.filter(l => hecha(l.id)).length} completados</span></div>${ic("right")}</summary><ol>${ls.map(l => `<li><a href="#/clase/${l.id}">${l.id} · ${esc(l.t)}</a></li>`).join("")}</ol></details>`; }).join("")}</div></div>
      <div class="buy card"><span class="eyebrow">Tu acceso</span><div class="pr">${S.acceso ? "Completo" : "Nivel 1 gratis"}</div><ul><li>${ic("check")}23 capítulos con apuntes y quiz</li><li>${ic("check")}10 herramientas interactivas</li><li>${ic("check")}Proyecto final y certificado</li></ul><a class="btn btn-p" href="#/clases">Ir a Fundamentos ${ic("arrow")}</a>${S.acceso ? "" : `<a class="btn btn-g" href="${CONFIG.inscripcion}">Abrir niveles 2 a 4</a>`}</div></div>`;
  }
  const cs = p.cursos.map(c => ({ id: c, t: CURSOS[c][0], h: CURSOS[c][1], lec: CURSOS[c][2], mods: CURSOS[c][3] }));
  const hrs = cs.reduce((a, c) => a + c.h, 0), lec = cs.reduce((a, c) => a + c.lec, 0);
  return `<div class="ban" style="background-image:url(${IMG}${p.img})"><div class="in2"><span class="eyebrow">Programa · ${p.dur}</span><h2>${esc(p.n)}</h2><p>${esc(p.d)}</p><div class="row"><span class="chip">${cs.length} cursos</span><span class="chip">${hrs} h de contenido</span><span class="chip">${lec} lecciones</span></div></div></div>
    <div class="p2"><div style="display:grid;gap:16px"><div class="card"><div class="ch"><h3>Temario del programa</h3></div><div class="acc">${cs.map((c, i) => `<details ${i === 0 ? "open" : ""}><summary><span class="n">0${i + 1}</span><div><b>${esc(c.t)}</b><br><span>${c.h} h · ${c.lec} lecciones</span></div>${ic("right")}</summary><ol>${c.mods.map(m => `<li>${esc(m)}</li>`).join("")}</ol></details>`).join("")}</div></div>
      <div class="card"><div class="ch"><h3>Instructor</h3></div><div class="inst" style="border:0;padding:0;background:none">${ins.f ? `<img src="${ins.f}" alt="${esc(ins.n)}">` : `<span class="two">AG</span>`}<div><b>${esc(ins.n)}</b><span>${esc(ins.r)}</span></div></div></div>
      <div class="card"><div class="ch"><h3>Mientras tanto, en Fundamentos</h3></div><p class="fine" style="margin-bottom:12px">El Nivel 1 de Fundamentos es gratis y te prepara para cualquier programa.</p><a class="btn btn-g" href="#/clases">Ir a Fundamentos ${ic("arrow")}</a></div></div>
    <div class="buy card"><span class="eyebrow">Inversión</span><div class="pr">${usd(p.pr)} <small>programa completo</small></div>${enOferta() ? `<div class="dsc">${usd(Math.round(p.pr * .85))} con 15% al agendar tu consulta antes del 31 de diciembre</div>` : ""}
      <ul><li>${ic("check")}${cs.length} cursos · ${hrs} horas</li>${p.extra.map(x => `<li>${ic("check")}${esc(x)}</li>`).join("")}</ul>
      <a class="btn btn-p" href="${CONFIG.inscripcion}">Agendar mi consulta ${ic("arrow")}</a><p class="fine">El contenido del programa se abre en tu campus al inscribirte.</p></div></div>`;
}

/* ── Fundamentos ── */
function clases() {
  return `<div class="hello"><div><h2>Fundamentos NORTHPOINT</h2><p>${nHechas()} de ${L.length} capítulos · ${S.acceso ? "acceso completo" : "Nivel 1 gratis, más los capítulos 2.1 y 3.1"}</p></div><a class="btn btn-p" href="#/clase/${siguiente().id}">Continuar ${ic("arrow")}</a></div>
    <div class="bar" style="height:8px"><i style="width:${pct()}%"></i></div>
    ${[1, 2, 3, 4].map(n => { const ls = L.filter(l => l.nivel === n), hn = ls.filter(l => hecha(l.id)).length;
      return `<section class="lvl"><div class="hd"><span class="k" style="background:${NIVELES[n].c}">${n}</span><div><b>${NIVELES[n].n}</b><span>${NIVELES[n].d}</span></div><div class="bar"><i style="width:${Math.round(hn / ls.length * 100)}%"></i></div></div>
        <div class="stag">${ls.map(l => `<a class="crow ${hecha(l.id) ? "done" : ""}" href="#/clase/${l.id}"><span class="st">${hecha(l.id) ? ic("check") : l.id}</span><div><b>${esc(l.t)}</b><span>${esc(l.sub)} · ${INSTR[l.quien].n.split(" y ")[0]}</span></div><span class="mn">${l.min} min</span>${abierta(l) ? ic("right") : ic("lock", "i lk")}</a>`).join("")}</div></section>`; }).join("")}`;
}

/* ── lección ── */
function clase(id, tab) {
  const l = byId(id); if (!l) return `<div class="empty">No encontramos ese capítulo.</div>`;
  S.ultima = id; save();
  const i = INSTR[l.quien], k = L.indexOf(l), prev = L[k - 1], next = L[k + 1];
  const head = `<div class="crumb"><a href="#/clases">Fundamentos</a>${ic("right")}<span>Nivel ${l.nivel} · ${NIVELES[l.nivel].n}</span>${ic("right")}<span>Capítulo ${l.id}</span></div>
    <div class="lh"><h2>${esc(l.t)}</h2><p class="sub">${esc(l.sub)}</p><div class="meta"><span class="chip"><span class="dot" style="background:${NIVELES[l.nivel].c}"></span>Nivel ${l.nivel}</span><span class="chip">${ic("clock")}${l.min} min</span><span class="chip">${esc(i.n)}</span>${hecha(id) ? `<span class="chip g">${ic("check")}Completado</span>` : ""}</div></div>`;
  const fotos = l.quien === "ambos" ? `<img class="ph two" src="${INSTR.goyo.f}" alt=""><img class="ph" src="${INSTR.andre.f}" alt="">` : `<img class="ph" src="${i.f}" alt="">`;
  const vid = CONFIG.videos[id];
  const video = vid ? `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(vid)}?rel=0" title="${esc(l.t)}" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
    : `<div class="video"><div class="poster"><span class="num">${l.id}</span>${fotos}</div><div class="q"><p>“${l.gancho}”</p><span>Video en grabación · estudia con los apuntes</span></div></div>`;
  const lado = `<aside class="side2"><div class="card" style="padding:14px"><div class="ch" style="margin-bottom:8px"><h3>Nivel ${l.nivel}</h3><span class="fine">${L.filter(x => x.nivel === l.nivel && hecha(x.id)).length}/${L.filter(x => x.nivel === l.nivel).length}</span></div><div class="mini">${L.filter(x => x.nivel === l.nivel).map(x => `<a href="#/clase/${x.id}" class="${hecha(x.id) ? "done" : ""} ${x.id === id ? "on" : ""}"><span class="st">${hecha(x.id) ? ic("check") : x.id}</span><span>${esc(x.t)}</span></a>`).join("")}</div></div>
    <div class="card" style="padding:14px"><div class="inst" style="border:0;padding:0;background:none">${i.f ? `<img src="${i.f}" alt="${esc(i.n)}">` : `<span class="two">AG</span>`}<div><b>${esc(i.n)}</b><span>${esc(i.r)}</span></div></div></div></aside>`;
  if (!abierta(l)) return `<div class="lgrid"><div>${head}<div class="video"><div class="poster"><span class="num">${l.id}</span>${fotos}</div></div>${bloqueo(l)}</div>${lado}</div>`;
  const tabs = [["apuntes", "Apuntes"], ...(l.herr ? [["practica", l.herr === "proyecto" ? "Entregables" : "Práctica"]] : []), ["tarea", "Tarea"], ["quiz", "Quiz"]];
  tab = tabs.some(t => t[0] === tab) ? tab : "apuntes";
  if (tab === "apuntes" || tab === "practica") { const kk = id + "/" + tab; if (!S.vistas[kk]) { S.vistas[kk] = 1; act(); } }
  const okTab = { tarea: !!(S.tareas[id] || "").trim(), quiz: hecha(id), apuntes: !!S.vistas[id + "/apuntes"], practica: !!S.vistas[id + "/practica"] };
  let body = "";
  if (tab === "apuntes") body = apuntes(l);
  if (tab === "practica") body = l.herr === "proyecto" ? `<div id="tool"></div>` : `<div class="card"><div class="eyebrow" style="margin-bottom:6px">Herramienta</div><h3 style="font:600 20px var(--h);margin-bottom:16px">${HERRAMIENTAS[l.herr].t}</h3><div id="tool"></div></div>`;
  if (tab === "tarea") body = `<div class="card"><div class="eyebrow" style="margin-bottom:8px">Tu tarea</div><p style="font:500 17px/1.5 var(--b)">${l.tarea}</p>
    <label class="f" style="margin-top:18px">Tu respuesta<textarea class="in" id="tareaTx" placeholder="Escribe aquí. Se guarda sola.">${esc(S.tareas[id] || "")}</textarea></label>
    <div class="row" style="justify-content:space-between;margin-top:10px"><span class="saved" id="savedT">${S.tareas[id] ? "Guardada" : "Sin guardar"}</span><a class="btn btn-g" href="#/clase/${id}/quiz">Ir al quiz ${ic("arrow")}</a></div></div>`;
  if (tab === "quiz") body = quiz(l);
  return `<div class="lgrid"><div>${head}${video}
    <nav class="ltabs">${tabs.map(([t, n]) => `<a href="#/clase/${id}/${t}" class="${t === tab ? "on" : ""}">${n}${okTab[t] ? `<span class="ok">${ic("check")}</span>` : ""}</a>`).join("")}</nav>
    <div class="view">${body}</div>
    <div class="nextbar">${prev ? `<a class="btn btn-g" href="#/clase/${prev.id}">${ic("back")} ${prev.id}</a>` : "<span></span>"}${next ? `<a class="btn ${hecha(id) ? "btn-p" : "btn-g"}" href="#/clase/${next.id}">Siguiente: ${esc(next.t)} ${ic("arrow")}</a>` : `<a class="btn btn-p" href="#/constancia">Ver mi certificado ${ic("arrow")}</a>`}</div></div>${lado}</div>`;
}
function apuntes(l) {
  return `<div class="notes">
    ${l.aviso ? `<div class="call av">${ic("info")}<div><b class="h">Aviso</b>${l.aviso}</div></div>` : ""}
    ${l.promesa ? `<p class="prom">${l.promesa}</p>` : ""}
    ${l.bloques.map((b, k) => `<div class="blk"><span class="k">0${k + 1}</span><div><h3>${b.t}</h3>${b.p ? `<p>${b.p}</p>` : ""}${b.li.length ? `<ul>${b.li.map(x => `<li>${x}</li>`).join("")}</ul>` : ""}</div></div>`).join("")}
    ${l.ejemplo ? `<div class="call ex">${ic("eye")}<div><b class="h">En el video</b>${l.ejemplo}</div></div>` : ""}
    ${l.error ? `<div class="call err">${ic("alert")}<div><b class="h">Error común</b>${l.error}</div></div>` : ""}
    ${l.cierre ? `<p class="cierre">${l.cierre}</p>` : ""}${l.puente ? `<p class="cierre">${l.puente}</p>` : ""}
    <div class="row">${l.herr ? `<a class="btn btn-p" href="#/clase/${l.id}/practica">${l.herr === "proyecto" ? "Llenar entregables" : "Practicar con la herramienta"} ${ic("arrow")}</a>` : ""}<a class="btn ${l.herr ? "btn-g" : "btn-p"}" href="#/clase/${l.id}/tarea">Hacer la tarea ${ic("arrow")}</a></div></div>`;
}
function quiz(l) {
  return `<div class="card" id="quiz"><div class="eyebrow" style="margin-bottom:14px">Quiz · ${l.quiz.length} preguntas</div>
    ${l.quiz.map((q, k) => `<div class="q-item" data-k="${k}"><h4>${k + 1}. ${q[0]}</h4><div class="opts">${q[1].map((o, j) => `<button type="button" class="opt" data-j="${j}"><span class="r"></span>${o}</button>`).join("")}</div><div class="why"></div></div>`).join("")}
    <div class="row" style="margin-top:18px"><button class="btn btn-p" id="qOk" type="button">Revisar respuestas</button><span class="fine" id="qMsg">Acierta todas para completar el capítulo.</span></div>
    ${hecha(l.id) ? `<div class="donebox"><span class="c">${ic("check")}</span><div><b>Capítulo completado</b><div class="fine">El ${new Date(S.hechas[l.id]).toLocaleDateString("es-MX", { day: "numeric", month: "long" })}.</div></div></div>` : ""}</div>`;
}
function bloqueo(l) {
  return `<div class="card lock"><span class="ic">${ic("lock")}</span><h2>El Nivel ${l.nivel} es parte de la inscripción</h2>
    <p>El Nivel 1 es gratis, igual que los capítulos 2.1 y 3.1. Para abrir trading, inteligencia artificial y el proyecto final, inscríbete y recibe tu código de alumno.</p>
    <div class="row" style="justify-content:center"><a class="btn btn-p" href="${CONFIG.inscripcion}">Inscribirme ${ic("arrow")}</a></div>
    <form id="codeF"><input class="in mono" name="c" placeholder="Código de alumno" autocomplete="off" autocapitalize="characters" aria-label="Código de alumno"><button class="btn btn-g" type="submit">Abrir</button></form>
    <div class="msg" id="codeMsg"></div></div>`;
}

/* ── calendario ── */
let calMes = null;
function calendario() {
  const hoy = new Date(); if (!calMes) calMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const ag = agenda(400), hd = hechasPorDia(), fx = eventosFijos();
  const ini = new Date(calMes); ini.setDate(1 - ((ini.getDay() + 6) % 7));
  let cells = "";
  for (let i = 0; i < 42; i++) {
    const d = new Date(ini); d.setDate(ini.getDate() + i); const k = ymd(d);
    const evs = [...(hd[k] || []).map(id => `<a class="ev hecho" href="#/clase/${id}">${id} ${esc(byId(id).t)}</a>`), ...(ag[k] || []).map(id => `<a class="ev plan" href="#/clase/${id}">${id} ${esc(byId(id).t)}</a>`), ...(fx[k] || []).map(e => `<span class="ev ${e.c}">${e.h ? e.h + " " : ""}${esc(e.t)}</span>`)];
    cells += `<div class="mday ${d.getMonth() !== calMes.getMonth() ? "out" : ""} ${k === hoyS() ? "hoy" : ""} ${evs.length ? "has" : ""}"><span class="d">${d.getDate()}${diasActivos().has(k) ? "<i></i>" : ""}</span>${evs.slice(0, 3).join("")}${evs.length > 3 ? `<span class="fine">+${evs.length - 3}</span>` : ""}</div>`;
    if (i >= 34 && d.getMonth() !== calMes.getMonth() && d.getDay() === 0) break;
  }
  const titulo = cap(calMes.toLocaleDateString("es-MX", { month: "long" })) + " " + calMes.getFullYear();
  const restantes = L.filter(l => !hecha(l.id) && abierta(l)).length, fin = Object.keys(ag).pop();
  return `<div class="cal"><div class="card"><div class="mhd"><h2>${titulo}</h2><button class="ibtn" id="mPrev" aria-label="Mes anterior">${ic("left")}</button><button class="btn btn-g" id="mHoy" style="height:38px">Hoy</button><button class="ibtn" id="mNext" aria-label="Mes siguiente">${ic("right")}</button></div>
      <div class="mgrid">${["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map(d => `<span class="dn">${d}</span>`).join("")}${cells}</div>
      <div class="legend"><span><span class="dot" style="background:var(--blue2)"></span>Plan de estudio</span><span><span class="dot" style="background:var(--pos)"></span>Completado</span><span><span class="dot" style="background:var(--gold)"></span>Sesión en vivo</span><span><span class="dot" style="background:#C4B5FD"></span>Fecha importante</span></div></div>
    <div style="display:grid;gap:16px"><div class="card"><div class="ch"><h3>Tu plan de estudio</h3></div>
        <div class="f" style="display:grid;gap:8px"><span class="fine">Días</span><div class="dayt" id="pDias">${DIAS.map((d, i) => `<button type="button" data-d="${i}" class="${S.plan.dias.includes(i) ? "on" : ""}">${d}</button>`).join("")}</div></div>
        <div class="grid2" style="margin-top:12px"><label class="f">Hora<input class="in" type="time" id="pHora" value="${esc(S.plan.hora)}"></label><label class="f">Capítulos por sesión<select class="in" id="pPor">${[1, 2, 3].map(n => `<option ${S.plan.porSesion == n ? "selected" : ""}>${n}</option>`).join("")}</select></label></div>
        <div class="verdict ok" style="margin-top:14px">${restantes ? `Te faltan ${restantes} capítulos disponibles. Con este plan terminas el ${fin ? new Date(fin + "T12:00").toLocaleDateString("es-MX", { day: "numeric", month: "long" }) : "—"}.` : "Completaste todos los capítulos disponibles."}</div>
        <button class="btn btn-g" id="ics" style="margin-top:12px;width:100%">${ic("down")}Agregar a mi calendario (.ics)</button></div>
      <div class="card"><div class="ch"><h3>Sesiones en vivo</h3></div>${CONFIG.sesiones.length ? `<div class="list">${CONFIG.sesiones.map(x => { const d = new Date(x.f); return `<a class="li" href="${esc(x.link || "#")}" target="_blank" rel="noopener"><span class="dt"><b>${d.getDate()}</b><small>${d.toLocaleDateString("es-MX", { month: "short" }).replace(".", "")}</small></span><div><b class="t">${esc(x.t)}</b><span>${d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}</span></div>${ic("video")}</a>`; }).join("")}</div>` : `<div class="empty">Cuando tu programa tenga sesiones en vivo, aparecerán aquí y en el calendario.</div>`}</div></div></div>`;
}
function exportarICS() {
  const ag = agenda(70), [hh, mm] = (S.plan.hora || "19:00").split(":");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//NORTHPOINT ACADEMY//Campus//ES", "CALSCALE:GREGORIAN"];
  Object.entries(ag).forEach(([k, ids]) => { const d = k.replace(/-/g, ""); lines.push("BEGIN:VEVENT", `UID:${d}-${ids[0]}@northpointcapital.io`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`, `DTSTART:${d}T${hh}${mm}00`, `DURATION:PT${Math.max(15, ids.reduce((a, id) => a + byId(id).min, 0) + 10)}M`, `SUMMARY:NORTHPOINT ACADEMY · ${ids.map(id => byId(id).t).join(" + ")}`, `DESCRIPTION:Capítulos ${ids.join(", ")} de Fundamentos.`, "END:VEVENT"); });
  lines.push("END:VCALENDAR");
  const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([lines.join("\r\n")], { type: "text/calendar" })); a.download = "plan-northpoint-academy.ics"; a.click();
}

/* ── herramientas, proyecto, certificado, ajustes ── */
function herramientas() { return `<div class="hello"><div><h2>Herramientas</h2><p>Para practicar lo que ves en cada capítulo. Guardan lo que escribes en este dispositivo.</p></div></div><div class="tgrid stag">${Object.entries(HERRAMIENTAS).map(([k, h]) => toolCard(k, h)).join("")}</div>`; }
function herramientaPag(k) {
  const h = HERRAMIENTAS[k]; if (!h) return `<div class="empty">No existe esa herramienta.</div>`;
  return `<div class="crumb"><a href="#/herramientas">Herramientas</a>${ic("right")}<span>Capítulo ${h.clase}</span></div><div class="hello"><div><h2>${h.t}</h2><p>${h.d} Se ve en el <a href="#/clase/${h.clase}" style="color:var(--blue2)">capítulo ${h.clase}</a>.</p></div></div><div class="card"><div id="tool"></div></div>`;
}
function proyectoPag() {
  const l = byId("4.1");
  return `<div class="hello"><div><h2>Proyecto final</h2><p>Cuatro entregables y mínimo 30 operaciones en simulador. Rúbrica: reglas seguidas 30%, riesgo 25%, uso de IA 20%, diario y análisis 15%, presentación 10%.</p></div></div>${abierta(l) ? `<div class="card"><div id="tool"></div></div>` : bloqueo(l)}`;
}
function constancia() {
  const n = nHechas(), falta = L.length - n, s = siguiente();
  const folio = "NPA-" + new Date(S.perfil.desde || Date.now()).getFullYear() + "-" + (Math.abs([...(S.perfil.nombre + S.perfil.desde)].reduce((a, c) => Math.imul(a, 31) + c.charCodeAt(0) | 0, 7)) % 100000).toString().padStart(5, "0");
  const fecha = new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
  return `<div class="hello"><div><h2>${falta ? `Te faltan ${falta} ${falta === 1 ? "capítulo" : "capítulos"}` : "Completaste Fundamentos"}</h2><p>${falta ? "La constancia de avance se abre al completar los 23 capítulos. El certificado de cada programa se emite al aprobar su proyecto final." : "Descarga tu constancia. El certificado del programa se emite al aprobar tu proyecto final."}</p></div></div>
    ${falta ? `<div class="card"><div class="bar" style="height:10px"><i style="width:${pct()}%"></i></div><p class="fine" style="margin-top:12px">${n} de ${L.length} · siguiente: <a href="#/clase/${s.id}" style="color:var(--blue2)">${esc(s.t)}</a></p></div>`
    : `<div class="const"><div class="t"><span>northpoint academy</span><span>${folio}</span></div><div><small>Constancia de avance · Fundamentos NORTHPOINT</small><h2>${esc(S.perfil.nombre)}</h2><p>Completó los ${L.length} capítulos de Fundamentos NORTHPOINT: dinero y mercados, trading, inteligencia artificial aplicada y proyecto final, con sus evaluaciones aprobadas.</p></div><div class="s"><div>André Macouzet</div><div>Gregorio Sánchez</div><div class="mono" style="font-weight:500">${fecha}</div></div><span class="seal">NORTH<br>POINT<br>2026</span></div>
      <div class="row" style="margin-top:18px"><button class="btn btn-p" type="button" onclick="print()">${ic("down")}Descargar en PDF</button><a class="btn btn-g" href="#/proyecto">Ir al proyecto final</a></div>
      <p class="fine" style="margin-top:12px">Constancia de avance emitida por el campus. No es un título oficial ni una licencia para asesorar o administrar dinero de terceros.</p>`}`;
}
function ajustes() {
  return `<div class="hello"><div><h2>Configuración</h2><p>Tu avance se guarda en este dispositivo y navegador.</p></div></div>
    <div class="grid2" style="align-items:start"><form class="card" id="af" style="display:grid;gap:14px"><div class="ch" style="margin:0"><h3>Perfil</h3></div><label class="f">Nombre<input class="in" name="nombre" value="${esc(S.perfil.nombre)}" maxlength="40"></label>
      <label class="f">Objetivo<select class="in" name="meta">${Object.entries(METAS).map(([k, m]) => `<option value="${k}" ${S.perfil.meta === k ? "selected" : ""}>${m.t}</option>`).join("")}</select></label><button class="btn btn-p" type="submit" style="justify-self:start">Guardar</button></form>
    <div style="display:grid;gap:12px"><div class="card"><div class="ch"><h3>Código de alumno</h3></div><p class="fine" style="margin-bottom:12px">${S.acceso ? "Tienes acceso completo a los cuatro niveles." : "Ábrelo con el código que recibes al inscribirte."}</p>${S.acceso ? "" : `<form id="codeF" style="display:flex;gap:8px"><input class="in mono" name="c" placeholder="Código de alumno" autocomplete="off" aria-label="Código de alumno"><button class="btn btn-p" type="submit">Abrir</button></form><div class="fine" id="codeMsg" style="margin-top:8px"></div>`}</div>
      <div class="card"><div class="ch"><h3>Plan de estudio</h3><a href="#/calendario">Editar</a></div><p class="fine">${S.plan.dias.map(d => DIAS[d]).join(", ")} a las ${S.plan.hora}.</p></div>
      <div class="card"><div class="ch"><h3>Empezar de cero</h3></div><p class="fine" style="margin-bottom:12px">Borra tu avance, tareas y diario de este dispositivo.</p><button class="btn btn-g" type="button" id="reset">Borrar mi avance</button></div></div></div>`;
}

/* ── buscar, soporte, Nori ── */
function indice() {
  const out = [];
  L.forEach(l => out.push({ href: `#/clase/${l.id}`, t: `${l.id} · ${l.t}`, s: l.sub, ic: "play", txt: plain([l.t, l.sub, l.gancho, l.promesa, ...l.bloques.flatMap(b => [b.t, b.p, ...b.li]), l.error, l.tarea, l.ejemplo].join(" ")), l }));
  Object.entries(HERRAMIENTAS).forEach(([k, h]) => out.push({ href: `#/h/${k}`, t: h.t, s: "Herramienta · " + h.d, ic: h.ic, txt: h.t + " " + h.d }));
  PROGRAMAS.forEach(p => out.push({ href: `#/programa/${p.id}`, t: p.n, s: "Programa · " + p.dur, ic: "grid", txt: p.n + " " + p.d }));
  return out;
}
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
function buscarEn(q) {
  const ws = norm(q).split(/\W+/).filter(w => w.length > 2 && !["que", "como", "para", "con", "los", "las", "una", "del", "por", "mas", "esto", "cual", "sobre"].includes(w));
  if (!ws.length) return [];
  return indice().map(x => { const t = norm(x.txt), tt = norm(x.t); let sc = 0; ws.forEach(w => { if (tt.includes(w)) sc += 5; sc += Math.min(t.split(w).length - 1, 6); }); return Object.assign({}, x, { sc }); }).filter(x => x.sc > 0).sort((a, b) => b.sc - a.sc);
}
function abrirBuscar() {
  let el = $("#srch"); if (!el) { el = document.createElement("div"); el.id = "srch"; el.className = "srch"; document.body.appendChild(el); }
  el.innerHTML = `<div class="sbox"><div class="q">${ic("search")}<input id="sq" placeholder="Busca un capítulo, un tema, un programa o una herramienta" autocomplete="off"><button class="ibtn" id="sx" aria-label="Cerrar">${ic("x")}</button></div><div class="sres" id="sres"></div></div>`;
  el.classList.add("on");
  const pinta = () => { const q = $("#sq").value, r = q.trim() ? buscarEn(q).slice(0, 12) : indice().filter(x => x.l && !hecha(x.l.id)).slice(0, 6);
    $("#sres").innerHTML = r.length ? r.map((x, i) => `<a href="${x.href}" class="${i === 0 ? "on" : ""}"><span class="ic">${ic(x.ic)}</span><div><b>${esc(x.t)}</b><span>${esc(x.s)}</span></div></a>`).join("") : `<p class="fine" style="padding:14px">Sin resultados para “${esc(q)}”.</p>`;
    $$("#sres a").forEach(a => a.onclick = cerrarBuscar); };
  $("#sq").oninput = pinta; $("#sq").onkeydown = e => { if (e.key === "Enter") { const a = $("#sres a"); if (a) { location.hash = a.getAttribute("href"); cerrarBuscar(); } } };
  $("#sx").onclick = cerrarBuscar; el.onclick = e => { if (e.target === el) cerrarBuscar(); };
  pinta(); setTimeout(() => $("#sq").focus(), 30);
}
function cerrarBuscar() { const el = $("#srch"); if (el) el.classList.remove("on"); }
function abrirSoporte() {
  let el = $("#sop"); if (!el) { el = document.createElement("div"); el.id = "sop"; el.className = "nori"; document.body.appendChild(el);
    el.innerHTML = `<div class="hd"><span class="av">${ic("help")}</span><div><b>Soporte</b><span>Respondemos por correo</span></div><button class="ibtn" aria-label="Cerrar">${ic("x")}</button></div><div class="nb"><p class="nm">¿Algo no funciona o tienes una duda sobre tu programa? Escríbenos y te respondemos.</p><a class="btn btn-p" href="mailto:${CONFIG.correo}?subject=${encodeURIComponent("Soporte campus NORTHPOINT ACADEMY")}" style="justify-self:start">${ic("mail")}Escribir al equipo</a>${CONFIG.whatsapp ? `<a class="btn btn-g" href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener" style="justify-self:start">WhatsApp</a>` : ""}<p class="fine">Para dudas del contenido, prueba primero con Nori: busca la respuesta en tus capítulos.</p></div>`;
    $(".ibtn", el).onclick = () => el.classList.remove("on"); el.style.height = "auto"; }
  $("#nori")?.classList.remove("on"); el.classList.toggle("on");
}
function abrirTutor() {
  let el = $("#nori");
  if (!el) { el = document.createElement("div"); el.id = "nori"; el.className = "nori"; document.body.appendChild(el);
    el.innerHTML = `<div class="hd"><span class="av">${ic("spark")}</span><div><b>Nori</b><span>Busca la respuesta en tus capítulos</span></div><button class="ibtn" aria-label="Cerrar">${ic("x")}</button></div>
      <div class="nb" id="tb"><p class="nm">Hola, ${esc(S.perfil.nombre)}. Pregúntame algo y te llevo al capítulo exacto donde se explica.</p><div class="sugs">${["¿Qué es la regla del 72?", "¿Cuántos contratos opero?", "¿Cómo escribo un buen prompt?", "¿Cómo detecto un fraude?"].map(s => `<button type="button">${s}</button>`).join("")}</div></div>
      <form class="nf" id="tf"><input id="ti" placeholder="Escribe tu pregunta" autocomplete="off" aria-label="Tu pregunta"><button class="btn btn-p" type="submit" style="height:40px;padding:0 14px" aria-label="Enviar">${ic("arrow")}</button></form>`;
    $(".hd .ibtn", el).onclick = () => el.classList.remove("on");
    const ask = q => { const tb = $("#tb"); tb.insertAdjacentHTML("beforeend", `<p class="nm me">${esc(q)}</p>`);
      const r = buscarEn(q).filter(x => x.l).slice(0, 2);
      const a = r.length ? "Esto se explica aquí:" + r.map(x => { const l = x.l, ws = norm(q).split(/\W+/).filter(w => w.length > 3); const b = l.bloques.find(b => ws.some(w => norm(plain(b.p + b.li.join(" ") + b.t)).includes(w))) || l.bloques[0]; const sn = plain(b.p || b.li.join(" ")).slice(0, 220); return `<a class="ref" href="#/clase/${l.id}"><b>${l.id} · ${esc(l.t)} · ${esc(b.t)}</b>${esc(sn)}${sn.length >= 220 ? "…" : ""}</a>`; }).join("") : "No lo encontré en los capítulos. Prueba con otras palabras o escribe a Soporte.";
      setTimeout(() => { tb.insertAdjacentHTML("beforeend", `<div class="nm">${a}</div>`); tb.scrollTop = tb.scrollHeight; }, 250); tb.scrollTop = tb.scrollHeight; };
    $("#tf").onsubmit = e => { e.preventDefault(); const v = $("#ti").value.trim(); if (v) { ask(v); $("#ti").value = ""; } };
    $$("#tb .sugs button").forEach(c => c.onclick = () => ask(c.textContent)); }
  $("#sop")?.classList.remove("on"); el.classList.toggle("on"); if (el.classList.contains("on")) setTimeout(() => $("#ti").focus(), 50);
}

/* ── router ── */
function render() {
  window.__stopTool && window.__stopTool(); window.__stopTool = null;
  if (!S.perfil) return bienvenida();
  const r = location.hash.replace(/^#\/?/, "").split("/");
  let html, tool = null, ruta = r[0] || "", titulo = null;
  if (ruta === "clase") { html = clase(r[1], r[2]); const l = byId(r[1]); if (l && abierta(l) && r[2] === "practica") tool = l.herr; titulo = l ? `Capítulo ${l.id}` : null; ruta = "clase"; }
  else if (ruta === "programas") html = programas();
  else if (ruta === "programa") { html = programa(r[1]); const p = PROGRAMAS.find(x => x.id === r[1]); titulo = p ? p.n : null; }
  else if (ruta === "clases") html = clases();
  else if (ruta === "calendario") html = calendario();
  else if (ruta === "herramientas") html = herramientas();
  else if (ruta === "h") { html = herramientaPag(r[1]); tool = r[1]; ruta = r[1] === "diario" ? "h/diario" : "h"; titulo = HERRAMIENTAS[r[1]] ? HERRAMIENTAS[r[1]].t : null; }
  else if (ruta === "proyecto") { html = proyectoPag(); if (abierta(byId("4.1"))) tool = "proyecto"; }
  else if (ruta === "constancia") html = constancia();
  else if (ruta === "ajustes") html = ajustes();
  else { html = inicio(); ruta = ""; }
  shell(html, ruta, titulo);
  if (tool && T[tool] && $("#tool")) T[tool]($("#tool"));
  wire(r);
  if (!render.keep) scrollTo(0, 0); render.keep = false;
}
function wire(r) {
  $$("[data-act]").forEach(b => b.addEventListener("click", e => { e.preventDefault(); const a = b.dataset.act; if (a === "buscar") abrirBuscar(); if (a === "soporte") abrirSoporte(); if (a === "tutor") abrirTutor(); }));
  const t = $("#tareaTx");
  if (t) { const id = r[1]; let marcado = false; t.addEventListener("input", () => { S.tareas[id] = t.value; if (!marcado && t.value.trim()) { marcado = true; act(); } save(); const s = $("#savedT"); s.textContent = "Guardada"; s.classList.add("on"); clearTimeout(wire.t); wire.t = setTimeout(() => s.classList.remove("on"), 900); }); }
  const q = $("#quiz");
  if (q) {
    const id = r[1], l = byId(id), sel = {};
    $$(".q-item", q).forEach(it => $$(".opt", it).forEach(o => o.onclick = () => { sel[it.dataset.k] = +o.dataset.j; $$(".opt", it).forEach(x => x.className = "opt" + (x === o ? " sel" : "")); $(".why", it).textContent = ""; }));
    $("#qOk").onclick = () => {
      if (Object.keys(sel).length < l.quiz.length) { $("#qMsg").textContent = "Te falta responder alguna pregunta."; return; }
      let bien = 0;
      $$(".q-item", q).forEach(it => { const k = +it.dataset.k, qq = l.quiz[k], ok = sel[k] === qq[2]; if (ok) bien++;
        $$(".opt", it).forEach(x => { const j = +x.dataset.j; x.className = "opt" + (j === sel[k] ? (ok ? " ok" : " bad") : ""); });
        const w = $(".why", it); w.className = "why " + (ok ? "ok" : "bad"); w.textContent = ok ? "Correcto. " + qq[3] : "Revisa los apuntes e inténtalo otra vez."; });
      S.quiz[id] = { bien, de: l.quiz.length, fecha: new Date().toISOString() };
      if (bien === l.quiz.length) { const nueva = !hecha(id); if (nueva) { S.hechas[id] = new Date().toISOString(); act(); } save(); $("#qMsg").textContent = `${bien}/${l.quiz.length}. Capítulo completado.`;
        if (nueva) { toast("Capítulo completado"); render.keep = true; setTimeout(() => { render(); $("#quiz")?.scrollIntoView({ block: "center" }); }, 900); } }
      else { save(); $("#qMsg").textContent = `${bien}/${l.quiz.length}. Corrige las que fallaste para completar el capítulo.`; }
    };
  }
  const f = $("#codeF");
  if (f) f.onsubmit = async e => { e.preventDefault(); const c = f.c.value.trim().toUpperCase(), m = $("#codeMsg"); if (!c) return;
    let h = ""; try { h = await sha(c); } catch (_) {}
    if (CONFIG.acceso.includes(h)) { S.acceso = { desde: new Date().toISOString() }; save(); toast("Acceso completo abierto"); render.keep = true; render(); }
    else { m.style.color = "var(--neg)"; m.textContent = "Ese código no es válido. Revísalo o escríbenos."; } };
  const af = $("#af");
  if (af) af.onsubmit = e => { e.preventDefault(); const n = af.nombre.value.trim(); if (n) S.perfil.nombre = n.slice(0, 40); S.perfil.meta = af.meta.value; save(); toast("Guardado"); render.keep = true; render(); };
  const rs = $("#reset");
  if (rs) rs.onclick = () => { if (confirm("¿Borrar tu avance de este dispositivo? No se puede deshacer.")) { S = { hechas: {}, tareas: {}, quiz: {}, herr: {}, diario: [], proyecto: {}, vistas: {}, act: {}, plan: { dias: [1, 3, 5], hora: "19:00", porSesion: 1 } }; save(); location.hash = "#/"; render(); } };
  if (r[0] === "calendario") {
    $("#mPrev").onclick = () => { calMes = new Date(calMes.getFullYear(), calMes.getMonth() - 1, 1); render.keep = true; render(); };
    $("#mNext").onclick = () => { calMes = new Date(calMes.getFullYear(), calMes.getMonth() + 1, 1); render.keep = true; render(); };
    $("#mHoy").onclick = () => { calMes = null; render.keep = true; render(); };
    $$("#pDias button").forEach(b => b.onclick = () => { const d = +b.dataset.d; const ds = S.plan.dias.includes(d) ? S.plan.dias.filter(x => x !== d) : [...S.plan.dias, d].sort(); if (!ds.length) return toast("Elige al menos un día"); S.plan.dias = ds; save(); render.keep = true; render(); });
    $("#pHora").onchange = e => { S.plan.hora = e.target.value || "19:00"; save(); render.keep = true; render(); };
    $("#pPor").onchange = e => { S.plan.porSesion = +e.target.value; save(); render.keep = true; render(); };
    $("#ics").onclick = exportarICS;
  }
}
addEventListener("hashchange", render);
addEventListener("keydown", e => { if (e.key === "Escape") { cerrarBuscar(); $$(".nori").forEach(n => n.classList.remove("on")); document.body.classList.remove("drawer"); } if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && S.perfil) { e.preventDefault(); abrirBuscar(); } });
render();
