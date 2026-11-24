/* NORTHPOINT ACADEMY · Campus
   Las clases salen de lecciones.js (generado de los guiones). El avance se guarda en este dispositivo (localStorage).
   CONFIG.videos: cuando se graben las clases, poner aquí el ID de YouTube de cada una, p. ej. "1.2": "dQw4w9WgXcQ".
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
  1: { n: "Dinero y mercados", d: "Inflación, interés compuesto, presupuesto, deuda y cómo detectar un fraude.", c: "var(--n1)" },
  2: { n: "Trading", d: "Gráficos, estructura, riesgo, psicología y tu diario. Todo en simulador.", c: "var(--n2)" },
  3: { n: "IA aplicada", d: "Prompts, investigación, IA para tu negocio, marketing, código y agentes.", c: "var(--n3)" },
  4: { n: "Proyecto final", d: "Tu portafolio simulado con asistente de IA, defendido frente a nosotros.", c: "var(--n4)" }
};
const INSTR = {
  andre: { n: "André Macouzet", r: "IA, programación, riesgo y mercados", f: "../img/andre.jpg" },
  goyo: { n: "Gregorio Sánchez", r: "Dinero, mente y negocios", f: "../img/goyo.jpg" },
  ambos: { n: "André y Goyo", r: "Cofundadores de NORTHPOINT", f: "" }
};
const HERRAMIENTAS = {
  inflacion: { t: "Calculadora de inflación", d: "Cuánto vale hoy el dinero que guardaste.", ic: "coin", clase: "1.2" },
  compuesto: { t: "Bola de nieve", d: "Interés compuesto, regla del 72 y comisiones.", ic: "trend", clase: "1.3" },
  presupuesto: { t: "Presupuesto 50/30/20", d: "Tu dinero del mes contra la regla.", ic: "pie", clase: "1.4" },
  cuatro: { t: "¿Inviertes o apuestas?", d: "La prueba de las 4 preguntas.", ic: "scale", clase: "1.5" },
  banderas: { t: "Detector de fraudes", d: "Las 5 banderas rojas de un anuncio.", ic: "shield", clase: "1.7" },
  riesgo: { t: "Tamaño de posición", d: "Contratos según tu riesgo y tu stop, y tu esperanza.", ic: "target", clase: "2.6" },
  respira: { t: "Respiración guiada", d: "Cuadrada, suspiro fisiológico y exhalación larga.", ic: "wind", clase: "2.8" },
  diario: { t: "Diario de trading", d: "Registra en R y mira tu estadística.", ic: "book", clase: "2.9" },
  prompt: { t: "Constructor de prompts", d: "Rol, Contexto, Tarea, Formato.", ic: "chat", clase: "3.1" },
  embudo: { t: "¿Te conviene anunciarte?", d: "Costo por cliente contra lo que te deja.", ic: "funnel", clase: "3.4" }
};
const METAS = {
  dinero: { t: "Ordenar mi dinero", d: "Ahorro, deuda, interés compuesto", ruta: ["1.2", "1.3", "1.4"] },
  negocio: { t: "Hacer crecer un negocio", d: "IA y marketing para vender", ruta: ["3.1", "3.3", "3.4"] },
  ia: { t: "Dominar la IA", d: "Prompts, código y agentes", ruta: ["3.1", "3.5", "3.6"] },
  mercados: { t: "Entender los mercados", d: "Acciones, gráficos y riesgo", ruta: ["1.6", "2.1", "2.6"] }
};

/* ── estado ── */
const KEY = "npa-campus-v1";
let S = (() => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (_) { return {}; } })();
S.hechas ||= {}; S.tareas ||= {}; S.quiz ||= {}; S.herr ||= {}; S.diario ||= []; S.proyecto ||= {};
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (_) {} }

const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];
const ic = (n, cls = "i") => `<svg class="${cls}"><use href="#i-${n}"/></svg>`;
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const mxn = n => (n < 0 ? "-$" : "$") + Math.round(Math.abs(n)).toLocaleString("es-MX");
const num = (v, d = 0) => { const n = parseFloat(String(v).replace(/[^\d.\-]/g, "")); return isFinite(n) ? n : d; };
const byId = id => L.find(x => x.id === id);
const abierta = l => CONFIG.nivelesLibres.includes(l.nivel) || CONFIG.clasesLibres.includes(l.id) || !!S.acceso;
const hecha = id => !!S.hechas[id];
const pct = () => Math.round(Object.keys(S.hechas).filter(byId).length / L.length * 100);
const nivelPct = n => { const ls = L.filter(l => l.nivel === n); return Math.round(ls.filter(l => hecha(l.id)).length / ls.length * 100); };
function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("on"), 2200); }
async function sha(t) { const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join(""); }
function siguiente() {
  return L.find(l => !hecha(l.id) && abierta(l)) || L.find(l => !hecha(l.id)) || L[L.length - 1];
}
function iniciales(n) { return (n || "?").trim().split(/\s+/).slice(0, 2).map(p => p[0]).join("").toUpperCase(); }

/* ── bienvenida ── */
function bienvenida() {
  let meta = "";
  $("#root").innerHTML = `<div class="welcome"><div class="wbox">
    <div class="brand" style="padding:0"><span class="mk">NP</span><span class="tx">NORTHPOINT<small>ACADEMY</small></span></div>
    <h1>Bienvenido al <strong>campus</strong>.</h1>
    <p class="muted" style="font-size:16px">23 clases en 4 niveles: dinero, inteligencia artificial, negocios, mercados y un proyecto final. El Nivel 1 es gratis, y tienes una clase de muestra de IA y otra de trading. Con cada clase hay apuntes, una tarea, un quiz y, en varias, una herramienta para practicar.</p>
    <form id="wf" class="card" style="display:grid;gap:16px">
      <label class="f">¿Cómo te llamas?<input class="in" name="nombre" required autocomplete="given-name" maxlength="40" placeholder="Tu nombre"></label>
      <div class="f" style="display:grid;gap:8px"><span>¿Qué te trae aquí?</span><div class="goals">${Object.entries(METAS).map(([k, m]) => `<button type="button" class="goal" data-m="${k}"><b>${m.t}</b><span>${m.d}</span></button>`).join("")}</div></div>
      <button class="btn btn-p" type="submit">Entrar al campus ${ic("arrow")}</button>
      <p class="fine">Tu avance se guarda solo en este dispositivo y navegador. No pedimos correo ni contraseña para empezar.</p>
    </form>
    <a href="../" class="muted" style="font-size:13px;display:inline-flex;gap:8px;align-items:center">${ic("back")} Volver a NORTHPOINT ACADEMY</a>
  </div></div>`;
  $$(".goal").forEach(b => b.onclick = () => { meta = b.dataset.m; $$(".goal").forEach(x => x.classList.toggle("on", x === b)); });
  $("#wf").onsubmit = e => {
    e.preventDefault();
    S.perfil = { nombre: e.target.nombre.value.trim().slice(0, 40), meta: meta || "dinero", desde: new Date().toISOString() };
    save(); location.hash = "#/"; render();
  };
}

/* ── armazón ── */
function shell(contenido, ruta) {
  const p = pct(), nombre = S.perfil.nombre;
  const lv = [1, 2, 3, 4].map(n => {
    const ls = L.filter(l => l.nivel === n);
    return `<div class="lvl-h"><span>Nivel ${n} · ${NIVELES[n].n}</span><em>${ls.filter(l => hecha(l.id)).length}/${ls.length}</em></div>
    <div class="ls">${ls.map(l => `<a href="#/clase/${l.id}" class="${hecha(l.id) ? "done" : ""} ${ruta === "clase/" + l.id ? "on" : ""}">
      <span class="st">${hecha(l.id) ? ic("check", "i") : l.id}</span><span>${esc(l.t)}</span>${abierta(l) ? "" : ic("lock", "i lk")}</a>`).join("")}</div>`;
  }).join("");
  const nav = [["", "home", "Inicio"], ["herramientas", "tool", "Herramientas"], ["h/diario", "book", "Mi diario"], ["proyecto", "flag", "Proyecto final"], ["constancia", "award", "Mi constancia"]];
  $("#root").innerHTML = `<div class="app">
    <aside class="side" id="side">
      <a class="brand" href="#/"><span class="mk">NP</span><span class="tx">NORTHPOINT<small>ACADEMY</small></span></a>
      <div class="me"><span class="av">${esc(iniciales(nombre))}</span><div style="flex:1;min-width:0"><b>${esc(nombre)}</b><span>${p}% del campus</span><div class="bar" style="margin-top:6px"><i style="width:${p}%"></i></div></div></div>
      <nav class="nav">${nav.map(([h, i, t]) => `<a href="#/${h}" class="${ruta === h ? "on" : ""}">${ic(i)}${t}</a>`).join("")}</nav>
      ${lv}
      <div class="side-foot"><a href="../">NORTHPOINT ACADEMY</a> · <a href="#/salir" id="salir">Cambiar de alumno</a></div>
    </aside>
    <div class="scrim" id="scrim"></div>
    <div>
      <div class="top"><button aria-label="Abrir menú" id="burger">${ic("menu")}</button><a class="brand" href="#/"><span class="mk">NP</span><span class="tx">NORTHPOINT<small>ACADEMY</small></span></a><span class="av" style="width:32px;height:32px;font-size:12px">${esc(iniciales(nombre))}</span></div>
      <main id="main">${contenido}</main>
    </div></div>`;
  $("#burger").onclick = () => document.body.classList.add("drawer");
  $("#scrim").onclick = () => document.body.classList.remove("drawer");
  $$("#side a").forEach(a => a.addEventListener("click", () => document.body.classList.remove("drawer")));
  $("#salir").onclick = e => {
    e.preventDefault();
    if (confirm("¿Cambiar de alumno? Se borra el avance guardado en este dispositivo.")) { S = { hechas: {}, tareas: {}, quiz: {}, herr: {}, diario: [], proyecto: {} }; save(); location.hash = "#/"; render(); }
  };
  const act = $("#side .ls a.on"); if (act) act.scrollIntoView({ block: "center" });
}

function poster(l, extra = "") {
  const i = INSTR[l.quien];
  const fotos = l.quien === "ambos" ? `<img class="ph two" src="${INSTR.goyo.f}" alt=""><img class="ph" src="${INSTR.andre.f}" alt="">` : `<img class="ph" src="${i.f}" alt="">`;
  return `<div class="poster" style="--c:${NIVELES[l.nivel].c}"><span class="num">${l.id}</span>${fotos}${extra}</div>`;
}

/* ── inicio ── */
function inicio() {
  const p = pct(), s = siguiente(), meta = METAS[S.perfil.meta] || METAS.dinero, C = 2 * Math.PI * 48;
  const hechasN = Object.keys(S.hechas).filter(byId).length;
  const saludo = hechasN === 0 ? "Empecemos por lo que nadie te enseñó." : p === 100 ? "Terminaste las 23 clases." : `Llevas ${hechasN} de ${L.length} clases.`;
  return `<div class="page wide">
    <div class="hello"><div><div class="eyebrow">Campus</div><h1 style="margin-top:10px">Hola, ${esc(S.perfil.nombre)}.</h1><p>${saludo}</p></div>
      <div class="ring"><svg viewBox="0 0 112 112"><circle cx="56" cy="56" r="48" fill="none" stroke="var(--line)" stroke-width="8"/><circle cx="56" cy="56" r="48" fill="none" stroke="var(--acc)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - p / 100)}"/></svg><div><span>${p}%<small>avance</small></span></div></div></div>
    <a class="card cont" href="#/clase/${s.id}">${poster(s)}<div class="bd"><div class="eyebrow" style="color:${NIVELES[s.nivel].c}">${hechasN ? "Continúa" : "Tu primera clase"} · Nivel ${s.nivel}</div><h2>${esc(s.t)}</h2><p class="muted">${esc(s.sub)} · ${s.min} min · ${INSTR[s.quien].n}</p><div class="row" style="margin-top:6px"><span class="btn btn-p">${abierta(s) ? "Abrir clase" : "Ver cómo desbloquear"} ${ic("arrow")}</span></div></div></a>
    <div class="sec-t"><h2>Los cuatro niveles</h2><span class="muted" style="font-size:13px">${S.acceso ? "Acceso completo" : "Nivel 1 gratis + 2 clases de muestra"}</span></div>
    <div class="lvls">${[1, 2, 3, 4].map(n => { const ls = L.filter(l => l.nivel === n), np = nivelPct(n), first = ls.find(l => !hecha(l.id)) || ls[0];
      return `<a class="lv" href="#/clase/${first.id}" style="--c:${NIVELES[n].c}"><div class="row" style="justify-content:space-between"><span class="n">NIVEL ${n}</span>${CONFIG.nivelesLibres.includes(n) || S.acceso ? `<span class="dot" style="background:${NIVELES[n].c}"></span>` : ic("lock", "i lk")}</div><h3>${NIVELES[n].n}</h3><p>${NIVELES[n].d}</p><div class="bar"><i style="width:${np}%"></i></div><span class="muted" style="font-size:12px">${ls.length} ${ls.length === 1 ? "clase" : "clases"} · ${np}%</span></a>`; }).join("")}</div>
    <div class="sec-t"><h2>Tu ruta para: ${meta.t.toLowerCase()}</h2><a class="muted" style="font-size:13px" href="#/" id="cambiaMeta">Cambiar</a></div>
    <div class="grid3">${meta.ruta.map(id => { const l = byId(id); return `<a class="lv" href="#/clase/${id}" style="--c:${NIVELES[l.nivel].c}"><span class="n">${id} · ${l.min} MIN</span><h3>${esc(l.t)}</h3><p>${esc(l.sub)}</p><span style="font-size:12px;font-weight:700;color:${hecha(id) ? "var(--pos)" : "var(--muted)"}">${hecha(id) ? "Completada" : abierta(l) ? "Disponible" : "Requiere inscripción"}</span></a>`; }).join("")}</div>
    <div class="sec-t"><h2>Herramientas</h2><a class="muted" style="font-size:13px" href="#/herramientas">Ver todas</a></div>
    <div class="tools">${Object.entries(HERRAMIENTAS).slice(0, 8).map(([k, h]) => toolCard(k, h)).join("")}</div>
  </div>`;
}
function toolCard(k, h) { return `<a class="tl" href="#/h/${k}"><span class="ic">${ic(h.ic)}</span><b>${h.t}</b><span>${h.d}</span></a>`; }

/* ── clase ── */
function clase(id, tab) {
  const l = byId(id); if (!l) return `<div class="page"><p>No encontramos esa clase.</p></div>`;
  S.ultima = id; save();
  const i = INSTR[l.quien], k = L.indexOf(l), prev = L[k - 1], next = L[k + 1];
  const head = `<div class="crumb"><a href="#/">Campus</a><span>›</span><span>Nivel ${l.nivel} · ${NIVELES[l.nivel].n}</span><span>›</span><span>Clase ${l.id}</span></div>
    <div class="les-h"><h1>${esc(l.t)}</h1><p class="sub">${esc(l.sub)}</p>
    <div class="meta"><span class="chip"><span class="dot" style="background:${NIVELES[l.nivel].c}"></span>Nivel ${l.nivel}</span><span class="chip">${l.min} min</span><span class="chip">${i.n}</span>${hecha(id) ? `<span class="chip" style="color:var(--pos);border-color:rgba(52,211,153,.4)">${ic("check")}Completada</span>` : ""}</div></div>`;
  if (!abierta(l)) return `<div class="page">${head}<div class="video">${poster(l)}</div>${bloqueo(l)}</div>`;
  const vid = CONFIG.videos[id];
  const video = vid ? `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(vid)}?rel=0" title="${esc(l.t)}" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
    : `<div class="video">${poster(l)}<div class="q"><p>“${l.gancho}”</p><span>Video en grabación · mientras, estudia con los apuntes</span></div></div>`;
  const tabs = [["apuntes", "Apuntes"], ...(l.herr ? [["practica", l.herr === "proyecto" ? "Entregables" : "Practica"]] : []), ["tarea", "Tarea"], ["quiz", "Quiz"]];
  tab = tabs.some(t => t[0] === tab) ? tab : "apuntes";
  const okTab = { tarea: !!(S.tareas[id] || "").trim(), quiz: hecha(id) };
  let body = "";
  if (tab === "apuntes") body = apuntes(l);
  if (tab === "practica") body = l.herr === "proyecto" ? `<div id="tool"></div>` : `<div class="card"><div class="eyebrow" style="margin-bottom:6px">Herramienta</div><h3 style="font-size:20px;font-weight:800;margin-bottom:16px">${HERRAMIENTAS[l.herr].t}</h3><div id="tool"></div></div>`;
  if (tab === "tarea") body = `<div class="card"><div class="eyebrow" style="margin-bottom:8px">Tu tarea</div><p style="font-size:17px;font-weight:600;line-height:1.5">${l.tarea}</p>
    <label class="f" style="margin-top:18px">Tu respuesta<textarea class="in" id="tareaTx" placeholder="Escribe aquí. Se guarda sola.">${esc(S.tareas[id] || "")}</textarea></label>
    <div class="row" style="justify-content:space-between;margin-top:10px"><span class="saved" id="savedT">${S.tareas[id] ? "Guardada" : "Sin guardar"}</span><a class="btn btn-g" href="#/clase/${id}/quiz">Ir al quiz ${ic("arrow")}</a></div></div>`;
  if (tab === "quiz") body = quiz(l);
  return `<div class="page">${head}${video}
    <nav class="tabs">${tabs.map(([t, n]) => `<a href="#/clase/${id}/${t}" class="${t === tab ? "on" : ""}">${n}${okTab[t] ? `<span class="ok">${ic("check", "i")}</span>` : ""}</a>`).join("")}</nav>
    ${body}
    <div class="nextbar">${prev ? `<a class="btn btn-g" href="#/clase/${prev.id}">${ic("back")} ${prev.id}</a>` : "<span></span>"}${next ? `<a class="btn ${hecha(id) ? "btn-p" : "btn-g"}" href="#/clase/${next.id}">Siguiente: ${esc(next.t)} ${ic("arrow")}</a>` : `<a class="btn btn-p" href="#/constancia">Ver mi constancia ${ic("arrow")}</a>`}</div>
  </div>`;
}
function apuntes(l) {
  const i = INSTR[l.quien];
  return `<div class="notes">
    ${l.aviso ? `<div class="call av">${ic("info")}<div><b class="h">Aviso</b>${l.aviso}</div></div>` : ""}
    ${l.promesa ? `<p class="prom">${l.promesa}</p>` : ""}
    ${l.bloques.map((b, k) => `<div class="blk"><span class="k">0${k + 1}</span><div><h3>${b.t}</h3>${b.p ? `<p>${b.p}</p>` : ""}${b.li.length ? `<ul>${b.li.map(x => `<li>${x}</li>`).join("")}</ul>` : ""}</div></div>`).join("")}
    ${l.ejemplo ? `<div class="call ex">${ic("eye")}<div><b class="h">En el video</b>${l.ejemplo}</div></div>` : ""}
    ${l.error ? `<div class="call err">${ic("alert")}<div><b class="h">Error común</b>${l.error}</div></div>` : ""}
    ${l.cierre ? `<p class="cierre">${l.cierre}</p>` : ""}${l.puente ? `<p class="cierre">${l.puente}</p>` : ""}
    <div class="inst">${i.f ? `<img src="${i.f}" alt="${i.n}">` : `<span class="av">AG</span>`}<div><b>${i.n}</b><span>${i.r}</span></div></div>
    <div class="row">${l.herr ? `<a class="btn btn-p" href="#/clase/${l.id}/practica">${l.herr === "proyecto" ? "Llenar entregables" : "Practica con la herramienta"} ${ic("arrow")}</a>` : ""}<a class="btn ${l.herr ? "btn-g" : "btn-p"}" href="#/clase/${l.id}/tarea">Hacer la tarea ${ic("arrow")}</a></div>
  </div>`;
}
function quiz(l) {
  const r = S.quiz[l.id] || {};
  return `<div class="card" id="quiz"><div class="eyebrow" style="margin-bottom:14px">Quiz · ${l.quiz.length} preguntas</div>
    ${l.quiz.map((q, k) => `<div class="q-item" data-k="${k}"><h4>${k + 1}. ${q[0]}</h4><div class="opts">${q[1].map((o, j) => `<button type="button" class="opt" data-j="${j}"><span class="r"></span>${o}</button>`).join("")}</div><div class="why"></div></div>`).join("")}
    <div class="row" style="margin-top:18px"><button class="btn btn-p" id="qOk" type="button">Revisar respuestas</button><span class="muted" style="font-size:13px" id="qMsg">Responde todas para completar la clase.</span></div>
    ${hecha(l.id) ? `<div class="donebox"><span class="c">${ic("check")}</span><div><b>Clase completada</b><div class="muted" style="font-size:13px">El ${new Date(S.hechas[l.id]).toLocaleDateString("es-MX", { day: "numeric", month: "long" })}.</div></div></div>` : ""}
  </div>`;
}
function bloqueo(l) {
  return `<div class="card lock"><span class="ic">${ic("lock")}</span><h2>El Nivel ${l.nivel} es parte de la inscripción</h2>
    <p>El Nivel 1 es gratis, igual que las clases 2.1 y 3.1. Para abrir el resto de trading, inteligencia artificial y el proyecto final, inscríbete y te mandamos tu código de alumno.</p>
    <div class="row" style="justify-content:center;margin-top:6px"><a class="btn btn-p" href="${CONFIG.inscripcion}">Inscribirme ${ic("arrow")}</a></div>
    <form id="codeF"><input class="in mono" name="c" placeholder="Código de alumno" autocomplete="off" autocapitalize="characters" aria-label="Código de alumno"><button class="btn btn-g" type="submit">Abrir</button></form>
    <div class="msg" id="codeMsg"></div></div>`;
}

/* ── herramientas ── */
function herramientas() {
  return `<div class="page wide"><div class="eyebrow">Herramientas</div><h1 style="font-weight:800;font-size:clamp(26px,3.6vw,36px);margin:10px 0 6px">Para practicar lo que ves en clase.</h1><p class="muted" style="margin-bottom:24px">Todas son gratis y guardan lo que escribes en este dispositivo.</p>
    <div class="tools">${Object.entries(HERRAMIENTAS).map(([k, h]) => toolCard(k, h)).join("")}</div></div>`;
}
function herramientaPag(k) {
  const h = HERRAMIENTAS[k]; if (!h) return `<div class="page"><p>No existe esa herramienta.</p></div>`;
  return `<div class="page"><div class="crumb"><a href="#/herramientas">Herramientas</a><span>›</span><span>Clase ${h.clase}</span></div>
    <h1 style="font-weight:800;font-size:clamp(26px,3.6vw,36px)">${h.t}</h1><p class="muted" style="margin:6px 0 22px">${h.d} Se ve en la <a href="#/clase/${h.clase}" style="color:var(--acc)">clase ${h.clase}</a>.</p>
    <div class="card"><div id="tool"></div></div></div>`;
}

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

function proyectoPag() {
  const l = byId("4.1");
  if (!abierta(l)) return `<div class="page"><div class="eyebrow">Proyecto final</div><h1 style="font-weight:800;font-size:clamp(26px,3.6vw,36px);margin:10px 0 20px">Tu portafolio simulado con IA</h1>${bloqueo(l)}</div>`;
  return `<div class="page"><div class="eyebrow">Proyecto final</div><h1 style="font-weight:800;font-size:clamp(26px,3.6vw,36px);margin:10px 0 6px">Tu portafolio simulado con IA</h1>
    <p class="muted" style="margin-bottom:22px">Cuatro entregables y mínimo 30 operaciones en simulador. Rúbrica: reglas seguidas 30%, riesgo 25%, uso de IA 20%, diario y análisis 15%, presentación 10%. <a href="#/clase/4.1" style="color:var(--acc)">Ver la clase 4.1</a>.</p>
    <div class="card"><div id="tool"></div></div></div>`;
}

function constancia() {
  const n = Object.keys(S.hechas).filter(byId).length, falta = L.length - n;
  const folio = "NPA-" + new Date(S.perfil.desde || Date.now()).getFullYear() + "-" + (Math.abs([...(S.perfil.nombre + S.perfil.desde)].reduce((a, c) => Math.imul(a, 31) + c.charCodeAt(0) | 0, 7)) % 100000).toString().padStart(5, "0");
  const fecha = new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
  return `<div class="page"><div class="eyebrow">Mi constancia</div><h1 style="font-weight:800;font-size:clamp(26px,3.6vw,36px);margin:10px 0 6px">${falta ? `Te faltan ${falta} ${falta === 1 ? "clase" : "clases"}.` : "Completaste el campus."}</h1>
    <p class="muted" style="margin-bottom:22px">${falta ? "La constancia de avance se abre al completar las 23 clases (cada clase se completa al acertar todo su quiz)." : "Descarga tu constancia de avance. El certificado NORTHPOINT ACADEMY se emite al aprobar tu defensa del proyecto final."}</p>
    ${falta ? `<div class="card"><div class="bar" style="height:10px"><i style="width:${pct()}%"></i></div><p class="muted" style="margin-top:12px;font-size:14px">${n} de ${L.length} clases · siguiente: <a href="#/clase/${siguiente().id}" style="color:var(--acc)">${esc(siguiente().t)}</a></p></div>`
    : `<div class="const"><div class="t"><span>NORTHPOINT · ACADEMY</span><span>${folio}</span></div><div><small>Constancia de avance · Campus en línea</small><h2>${esc(S.perfil.nombre)}</h2><p>Completó las ${L.length} clases de los cuatro niveles del campus de NORTHPOINT ACADEMY: dinero y mercados, trading, inteligencia artificial aplicada y proyecto final, con sus quiz aprobados.</p></div><div class="s"><div>André Macouzet</div><div>Gregorio Sánchez</div><div class="mono" style="font-weight:500">${fecha}</div></div></div>
      <div class="row" style="margin-top:18px"><button class="btn btn-p" type="button" onclick="print()">Descargar en PDF</button><a class="btn btn-g" href="#/proyecto">Ir al proyecto final</a></div>
      <p class="fine" style="margin-top:12px">Constancia de avance emitida por el campus. No es un título oficial ni una licencia para asesorar o administrar dinero de terceros.</p>`}</div>`;
}

/* ── router ── */
function render() {
  window.__stopTool && window.__stopTool(); window.__stopTool = null;
  if (!S.perfil) return bienvenida();
  const r = location.hash.replace(/^#\/?/, "").split("/");
  let html, ruta = r[0] || "", tool = null;
  if (ruta === "clase") { html = clase(r[1], r[2]); ruta = "clase/" + r[1]; const l = byId(r[1]); if (l && abierta(l) && r[2] === "practica") tool = l.herr; }
  else if (ruta === "herramientas") html = herramientas();
  else if (ruta === "h") { html = herramientaPag(r[1]); tool = r[1]; ruta = r[1] === "diario" ? "h/diario" : "herramientas"; }
  else if (ruta === "proyecto") { html = proyectoPag(); if (abierta(byId("4.1"))) tool = "proyecto"; }
  else if (ruta === "constancia") html = constancia();
  else { html = inicio(); ruta = ""; }
  shell(html, ruta);
  if (tool && T[tool] && $("#tool")) T[tool]($("#tool"));
  wire();
  if (!render.keep) scrollTo(0, 0); render.keep = false;
}
function wire() {
  const t = $("#tareaTx");
  if (t) { const id = location.hash.split("/")[2]; t.addEventListener("input", () => { S.tareas[id] = t.value; save(); const s = $("#savedT"); s.textContent = "Guardada"; s.classList.add("on"); clearTimeout(wire.t); wire.t = setTimeout(() => s.classList.remove("on"), 900); }); }
  const q = $("#quiz");
  if (q) {
    const id = location.hash.split("/")[2], l = byId(id), sel = {};
    $$(".q-item", q).forEach(it => $$(".opt", it).forEach(o => o.onclick = () => { sel[it.dataset.k] = +o.dataset.j; $$(".opt", it).forEach(x => x.className = "opt" + (x === o ? " sel" : "")); $(".why", it).textContent = ""; }));
    $("#qOk").onclick = () => {
      if (Object.keys(sel).length < l.quiz.length) { $("#qMsg").textContent = "Te falta responder alguna pregunta."; return; }
      let bien = 0;
      $$(".q-item", q).forEach(it => { const k = +it.dataset.k, qq = l.quiz[k], ok = sel[k] === qq[2]; if (ok) bien++;
        $$(".opt", it).forEach(x => { const j = +x.dataset.j; x.className = "opt" + (j === sel[k] ? (ok ? " ok" : " bad") : ""); });
        const w = $(".why", it); w.className = "why " + (ok ? "ok" : "bad"); w.textContent = ok ? "Correcto. " + qq[3] : "Revisa los apuntes e inténtalo otra vez."; });
      S.quiz[id] = { bien, de: l.quiz.length, fecha: new Date().toISOString() };
      if (bien === l.quiz.length) {
        const nueva = !hecha(id); S.hechas[id] ||= new Date().toISOString(); save();
        if (nueva) { toast("Clase completada"); render.keep = true; setTimeout(() => { render(); $("#quiz")?.scrollIntoView({ block: "center" }); }, 900); }
        $("#qMsg").textContent = `${bien}/${l.quiz.length}. Clase completada.`;
      } else { save(); $("#qMsg").textContent = `${bien}/${l.quiz.length}. Corrige las que fallaste para completar la clase.`; }
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
  const cm = $("#cambiaMeta");
  if (cm) cm.onclick = e => { e.preventDefault(); const ks = Object.keys(METAS); S.perfil.meta = ks[(ks.indexOf(S.perfil.meta) + 1) % ks.length]; save(); render.keep = true; render(); };
}
addEventListener("hashchange", render);
render();
