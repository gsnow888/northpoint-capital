/* ============================================================
   index.html — script 1 de 2
   Extraído del JavaScript inline original (3 bloque(s) <script>, línea 1025 del HTML original).
   Se carga en el MISMO punto del documento donde estaba: el orden respecto
   al HTML importa (los scripts sólo ven los elementos que ya existen arriba).
   ============================================================ */


/* ── bloque <script> 1 de 3 ── */

/* ══ VISTAZOS · doce pedazos del Terminal, en cinta infinita ══
   (André, 31-ago-2026) Los huecos en blanco de la página se llenan con esto:
   trozos REALES de la aplicación —un KPI, una fila de trade, el panel del
   chart, una katana— corriendo de lado. Se pinta dos veces y la animación
   recorre justo la mitad, así el bucle no tiene costura. La segunda mitad va
   oculta a lectores de pantalla para no leer todo dos veces. */
(function(){
  /* (André, 31-ago-2026) Antes esto llenaba UNA sola cinta por id. Ahora llena
     todas las .vz-track que haya en la página: así el mismo material sirve para
     tapar cualquier hueco nuevo sin duplicar el arreglo. */
  var cintas = document.querySelectorAll('.vz-track');
  if (!cintas.length) return;
  var V = [
    '<i>WIN RATE · POR TRADE</i><b>65%</b><span>13W · 7L</span><div class="vz-bar"><s style="flex:65"></s><em style="flex:35"></em></div>',
    '<i>BALANCE</i><b class="up">$170,490</b><span>3 CUENTAS · +$20,490</span>',
    '<i>CURVA DE CAPITAL</i><div class="vz-spark"><svg viewBox="0 0 236 62"><path class="a" d="M4 52 L30 44 L56 48 L82 34 L108 38 L134 24 L160 28 L186 16 L212 20 L232 8 L232 58 L4 58 Z"/><path class="l" d="M4 52 L30 44 L56 48 L82 34 L108 38 L134 24 L160 28 L186 16 L212 20 L232 8"/></svg></div><span>20 TRADES · PF 4.97</span>',
    '<i>GANA / PIERDE</i><b>2.68<sup>R</sup></b><span>+$1,973 CONTRA −$737</span><div class="vz-bar"><s style="flex:73"></s><em style="flex:27"></em></div>',
    '<i>HISTORIAL · 31 AGO</i><div style="margin-top:10px"><div class="vz-fila"><span>10:42 MNQ</span><s class="dn">−$930</s></div><div class="vz-fila"><span>9:30 MNQ</span><s class="up">+$1,560</s></div><div class="vz-fila"><span>28/08 MNQ</span><s class="up">+$2,070</s></div></div>',
    '<i>DISCIPLINA DEL DÍA</i><div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:6px"><span class="vz-t">SIN SETUP</span><span class="vz-t">OVERTRADING</span><span class="vz-t">REVENGE</span><span class="vz-t on">LIMPIO</span></div><u>Cada trade guarda cómo lo operaste, no solo cuánto dejó.</u>',
    '<i>CAMINO A PAYOUT</i><b>70%</b><span>EVAL · FONDEADA · COLCHÓN · PAYOUTS</span><div class="vz-bar"><s style="flex:70"></s><em style="flex:30;background:var(--line)"></em></div>',
    '<i>APEX 13 · COBRANDO</i><b class="up">$56,830</b><span>LE QUEDA $6,730 AL DRAWDOWN</span>',
    '<i>PANEL DEL CHART · NP A+</i><div style="margin-top:10px"><div class="vz-fila"><span>ASIA</span><s class="up">+171.25 pts</s></div><div class="vz-fila"><span>LNDN</span><s class="dn">−71.50 pts</s></div><div class="vz-fila"><span>NY</span><s class="up">+68.00 pts</s></div><div class="vz-fila"><span>TOTAL</span><s class="up">+216.25 pts</s></div></div>',
    '<i>TU VENTANA</i><b>09:45</b><span>CIERRA EL ORB · 2 TRADES</span><u>Antes de esa hora no se entra, ni aunque el setup se vea perfecto.</u>',
    '<i>KURO · 7º DAN</i><div class="vz-kanji">七</div><span>1,612 ELO · 3 DUELOS ESTA SEMANA</span><u>Gana el mayor profit. Cada quien con su cuenta.</u>',
    '<i>ACADEMIA</i><b>35</b><span>LECCIONES · 249 MINUTOS</span><u>De qué es un contrato de futuros hasta cómo se cobra un payout.</u>'
  ];
  function mitad(oculta){
    var d = document.createElement('div');
    d.className = 'vz-mit';
    if (oculta) d.setAttribute('aria-hidden', 'true');
    V.forEach(function(h, k){
      var c = document.createElement('div');
      c.className = 'vz-c' + (k % 4 === 3 ? ' acento' : '');
      c.innerHTML = h;
      d.appendChild(c);
    });
    return d;
  }
  cintas.forEach(function(track){
    track.appendChild(mitad(false));
    track.appendChild(mitad(true));
  });
})();


/* ── bloque <script> 2 de 3 ── */

/* ══ LA PROBADITA · el Terminal funcionando dentro de la landing ══
   (André, 31-ago-2026) No es una foto ni una maqueta muerta: se cambia de
   pantalla, se registra un trade y TODO se recalcula —la curva, el balance,
   el win rate, el profit factor, el camino a payout y el historial— con las
   mismas cuentas que hace la aplicación. Los datos base son los de un mes
   rentable de verdad: 20 trades, 65% de aciertos, +$20,490. Nada se guarda. */
(function(){
  var tabsEl = document.getElementById('txTabs');
  var cuerpo = document.getElementById('txCuerpo');
  if (!tabsEl || !cuerpo) return;

  var CAP = 150000;                    /* capital de las tres cuentas */
  var BASE = [
    ['18/08','9:30',1,2160],['18/08','10:42',1,-900],
    ['19/08','9:30',-1,1560],['19/08','10:42',1,2520],
    ['20/08','9:30',1,-420],['20/08','10:42',1,1680],
    ['21/08','9:30',-1,-737],['21/08','10:42',1,2070],
    ['24/08','9:30',1,1620],['24/08','10:42',-1,-930],
    ['25/08','9:30',1,3840],['25/08','10:42',1,-640],
    ['26/08','9:30',1,2520],['26/08','10:42',-1,-900],
    ['27/08','9:30',1,2160],['27/08','10:42',1,1680],
    ['28/08','9:30',-1,-420],['28/08','10:42',1,2070],
    ['31/08','9:30',1,1560],['31/08','10:42',-1,-930]
  ];
  var T = BASE.slice();
  var lado = 1;
  var vista = 'journal';

  var f$ = function(n){ return (n < 0 ? '−$' : '$') + Math.abs(Math.round(n)).toLocaleString('en-US'); };
  var fs = function(n){ return (n > 0 ? '+' : n < 0 ? '−' : '') + '$' + Math.abs(Math.round(n)).toLocaleString('en-US'); };

  function stats(){
    var g = 0, p = 0, w = 0, l = 0, dias = {};
    T.forEach(function(t){
      var v = t[3];
      if (v >= 0) { g += v; w++; } else { p += -v; l++; }
      dias[t[0]] = (dias[t[0]] || 0) + v;
    });
    var dw = 0, dl = 0;
    Object.keys(dias).forEach(function(k){ dias[k] >= 0 ? dw++ : dl++; });
    var n = T.length;
    return {
      pnl: g - p, g: g, p: p, w: w, l: l, n: n,
      wr: n ? Math.round(w / n * 100) : 0,
      pf: p > 0 ? (g / p) : (g > 0 ? 99 : 0),
      mg: w ? g / w : 0, mp: l ? p / l : 0,
      dw: dw, dl: dl, dwr: (dw + dl) ? Math.round(dw / (dw + dl) * 100) : 0
    };
  }

  function curva(){
    var s = stats(), acc = 0, pts = [], min = 0, max = 0;
    T.forEach(function(t){ acc += t[3]; pts.push(acc); if (acc < min) min = acc; if (acc > max) max = acc; });
    if (!pts.length) return '<div class="tx-curva"></div>';
    var W = 640, H = 150, pad = 10;
    var rango = (max - min) || 1;
    var d = '', a = '';
    pts.forEach(function(v, i){
      var x = pad + (W - pad * 2) * (pts.length === 1 ? 1 : i / (pts.length - 1));
      var y = pad + (H - pad * 2) * (1 - (v - min) / rango);
      d += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
      if (i === 0) a = 'M' + x.toFixed(1) + ' ' + y.toFixed(1);
      else a += ' L' + x.toFixed(1) + ' ' + y.toFixed(1);
    });
    var ux = pad + (W - pad * 2), uy = pad + (H - pad * 2) * (1 - (pts[pts.length - 1] - min) / rango);
    a += ' L' + ux.toFixed(1) + ' ' + (H - pad) + ' L' + pad + ' ' + (H - pad) + ' Z';
    var lineas = '';
    for (var k = 1; k <= 3; k++) lineas += '<line class="g" x1="0" y1="' + (H / 4 * k) + '" x2="' + W + '" y2="' + (H / 4 * k) + '"/>';
    return '<div class="tx-curva"><svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Curva de capital">' +
      lineas + '<path class="a" d="' + a + '"/><path class="l" d="' + d + '"/>' +
      '<circle class="p" cx="' + ux.toFixed(1) + '" cy="' + uy.toFixed(1) + '" r="4.5"/>' +
      '<text x="' + (ux - 6) + '" y="' + Math.max(14, uy - 10) + '" text-anchor="end" fill="currentColor" opacity=".65" font-size="11">' + fs(pts[pts.length - 1]) + '</text>' +
      '</svg></div>';
  }

  function encabezado(){
    var s = stats();
    return '<div class="tx-top"><div><span class="tx-k">BALANCE</span>' +
      '<span class="tx-big' + (s.pnl < 0 ? ' dn' : '') + '">' + f$(CAP + s.pnl) + '</span></div>' +
      '<div class="tx-lado">' +
        '<div><i>P&amp;L</i><s class="' + (s.pnl >= 0 ? 'up' : 'dn') + '">' + fs(s.pnl) + '</s></div>' +
        '<div><i>CAPITAL</i><s>' + f$(CAP) + '</s></div>' +
        '<div><i>TRADES</i><s>' + s.n + '</s></div>' +
      '</div></div>';
  }

  function kpis(){
    var s = stats();
    var r = s.mp > 0 ? (s.mg / s.mp) : 0;
    return '<div class="tx-kpis">' +
      '<div class="tx-kpi"><i>WIN RATE · POR TRADE</i><b>' + s.wr + '%</b><span>' + s.w + 'W · ' + s.l + 'L</span>' +
        '<div class="tx-bar"><s style="flex:' + Math.max(s.wr, 1) + '"></s><em style="flex:' + Math.max(100 - s.wr, 1) + '"></em></div></div>' +
      '<div class="tx-kpi"><i>DÍAS GANADOS</i><b>' + s.dwr + '%</b><span>' + s.dw + 'W · ' + s.dl + 'L</span>' +
        '<div class="tx-bar"><s style="flex:' + Math.max(s.dwr, 1) + '"></s><em style="flex:' + Math.max(100 - s.dwr, 1) + '"></em></div></div>' +
      '<div class="tx-kpi"><i>GANA / PIERDE</i><b>' + r.toFixed(2) + '<sup>R</sup></b><span>' + fs(s.mg) + ' · ' + fs(-s.mp) + '</span></div>' +
      '<div class="tx-kpi"><i>PROFIT FACTOR</i><b class="up">' + (s.pf >= 99 ? '∞' : s.pf.toFixed(2)) + '</b><span>' + fs(s.g) + ' contra ' + fs(-s.p) + '</span></div>' +
    '</div>';
  }

  function registro(){
    return '<div class="tx-reg">' +
      '<span class="tx-lad"><button type="button" data-lado="1" class="' + (lado === 1 ? 'on' : '') + '">LONG</button>' +
      '<button type="button" data-lado="-1" class="' + (lado === -1 ? 'on' : '') + '">SHORT</button></span>' +
      '<input id="txPnl" type="text" inputmode="numeric" placeholder="P&L en dólares — ej. 1560 o -930" aria-label="Resultado del trade">' +
      '<button type="button" class="add" id="txAdd">+ AGREGAR</button>' +
      '<button type="button" class="un" id="txUndo">DESHACER</button></div>' +
      '<p class="tx-ayuda">ESCRIBE UN RESULTADO Y MÍRALO ENTRAR: LA CURVA, EL WIN RATE Y EL CAMINO A PAYOUT SE RECALCULAN SOLOS</p>';
  }

  function vJournal(){ return encabezado() + kpis() + curva(); }

  function vLog(){ return encabezado() + curva() + registro(); }

  function vTrades(){
    var f = '<div class="tx-scroll"><table class="tx-tabla"><thead><tr><th>FECHA</th><th>HORA</th><th>SÍMBOLO</th><th>LADO</th><th style="text-align:right">P&amp;L</th></tr></thead><tbody>';
    T.slice().reverse().forEach(function(t){
      f += '<tr><td>' + t[0] + '</td><td>' + t[1] + '</td><td>MNQ</td><td><span class="tx-t ' + (t[2] === 1 ? 'l">LONG' : 's">SHORT') + '</span></td>' +
        '<td class="n ' + (t[3] >= 0 ? 'up' : 'dn') + '">' + fs(t[3]) + '</td></tr>';
    });
    return f + '</tbody></table></div>';
  }

  function vPlan(){
    var s = stats();
    /* el camino: la fondeada arranca a la mitad y de ahí sube. Con 12,000
       se topaba en 100% con los datos base y la barra no decía nada; con
       40,000 el mes de demo cae en el 74% y todavía tiene a dónde crecer. */
    var por = Math.max(0, Math.min(100, 50 + (s.pnl / 40000) * 50));
    var cta = function(nom, etapa, saldo, col){
      return '<div class="tx-cta"><b>' + nom + '<small>' + etapa + '</small></b>' +
        '<div><i>BALANCE</i><s class="up">' + f$(saldo) + '</s></div>' +
        '<div><i>LE QUEDA</i><s>' + f$(Math.max(0, col)) + '</s></div>' +
        '<div><i>ESTADO</i><s>' + (col > 3000 ? 'EN PIE' : 'CUIDADO') + '</s></div></div>';
    };
    var parte = s.pnl / 3;
    return cta('APEX 13', 'APEX · COBRANDO', 50000 + parte, 4000 + parte) +
      cta('APEX 22', 'APEX · COLCHÓN', 50000 + parte, 4000 + parte) +
      cta('EVAL 3', 'APEX · EVALUACIÓN', 50000 + parte, 4000 + parte) +
      '<div class="tx-riel"><i style="width:' + por.toFixed(0) + '%"></i></div>' +
      '<div class="tx-pies"><span>EVAL</span><span>FONDEADA</span><span>COLCHÓN</span><span>PAYOUTS</span><span>MÁX</span></div>' +
      '<p class="tx-ayuda">EL CAMINO SE MUEVE CON CADA TRADE QUE REGISTRAS EN LOG</p>';
  }

  var VISTAS = [
    ['journal', 'Journal', vJournal],
    ['log', 'Log trade', vLog],
    ['trades', 'Trade history', vTrades],
    ['plan', 'The plan', vPlan]
  ];

  function pinta(){
    tabsEl.innerHTML = VISTAS.map(function(v){
      return '<button type="button" data-v="' + v[0] + '" class="' + (v[0] === vista ? 'on' : '') + '">' + v[1] + '</button>';
    }).join('');
    var v = VISTAS.filter(function(x){ return x[0] === vista; })[0] || VISTAS[0];
    cuerpo.innerHTML = v[2]();
    var pie = document.getElementById('txPie');
    if (pie) pie.textContent = T.length + ' trades · cuenta de demostración · nada de lo que hagas aquí se guarda';
  }

  document.addEventListener('click', function(e){
    var b = e.target.closest ? e.target.closest('button') : null;
    if (!b) return;
    if (b.dataset && b.dataset.v) { vista = b.dataset.v; pinta(); return; }
    if (b.dataset && b.dataset.lado) { lado = parseInt(b.dataset.lado, 10); pinta(); return; }
    if (b.id === 'txAdd') {
      var inp = document.getElementById('txPnl');
      var raw = (inp && inp.value || '').replace(/[^0-9.\-]/g, '');
      var v = parseFloat(raw);
      if (!isFinite(v) || v === 0) { if (inp) { inp.focus(); inp.placeholder = 'Escribe un número — ej. 1560 o -930'; } return; }
      var hoy = new Date();
      var dd = String(hoy.getDate()).padStart(2, '0') + '/' + String(hoy.getMonth() + 1).padStart(2, '0');
      T.push([dd, '9:30', lado, Math.round(v)]);
      pinta();
      return;
    }
    if (b.id === 'txUndo') { if (T.length > BASE.length) T.pop(); else if (T.length) T.pop(); pinta(); return; }
    if (b.id === 'txReset') { T = BASE.slice(); lado = 1; pinta(); return; }
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Enter' && e.target && e.target.id === 'txPnl') {
      e.preventDefault();
      var add = document.getElementById('txAdd');
      if (add) add.click();
    }
  });

  pinta();
})();


/* ── bloque <script> 3 de 3 ── */

(function(){
  'use strict';

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          var el = entry.target;
          var d = parseInt(el.getAttribute('data-d') || '0', 10);
          if (d > 0) el.style.transitionDelay = (d * 70) + 'ms';
          el.classList.add('on');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('on'); });
  }

  /* ---------- Smooth scroll para anchors (respeta reduced-motion) ---------- */
  var scrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  /* El índice ES la navegación: cada sección se abre como documento. Esta lista
     tiene que coincidir con las secciones que existen — un id de más deja un
     renglón del índice que no abre nada. */
  /* CUATRO listas tienen que decir lo mismo: ésta, DECK_MAP, `mapa` y las
     filas del índice. Agregar una sección y olvidar DOC_SECS deja una fila que
     no abre nada — el enrutador simplemente no la reconoce. */
  /* 'academia' agrupa lo que antes eran seis documentos sueltos; los ids
     viejos siguen aquí para que cualquier link profundo (#educacion, #mesa…)
     abra la academia completa y aterrice en su sección. */
  /* LA ACADEMIA SE QUEDA CON DOS (André, 3-sep-2026): la mesa en vivo y el
     temario. Todo lo demás que se apilaba aquí —la filosofía, el journal, el
     Terminal, Kuro, el expediente y los planes— ya vive en su propia landing,
     y tenerlo dos veces es de donde salen las contradicciones. */
  /* SIN DOCUMENTOS (André, 3-sep-2026): la academia era el único que se abría
     aquí dentro, y se fue. La portada es ahora un índice y sus puertas, cada
     una a su propia página. El router se queda —vacío y sin costo— porque una
     liga vieja con #academia debe seguir cayendo de pie en la portada. */
  var DOC_SECS = [];
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var href = a.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        if (location.hash) location.hash = '';
        window.scrollTo({ top: 0, behavior: scrollBehavior });
        return;
      }
      if (DOC_SECS.indexOf(href.slice(1)) !== -1) return; /* el router de documentos toma el control */
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
        if (history.pushState) history.pushState(null, '', href);
      }
    });
  });


  /* ── DÓNDE SE TRANSMITE ── Los tres canales reales de André, verificados
     uno por uno en su navegador. El que quede vacío se apaga solo y dice
     «pronto»: un icono que no lleva a ningún lado es peor que no ponerlo.

     ESTADO DE LOS NOMBRES, a hoy:
       · YouTube — el @ ya es northpointcapital (cambiado y verificado). El
         NOMBRE visible sigue siendo «Rorropirrorro69»: YouTube rechaza el
         cambio con «se ha producido un error» en cuatro intentos seguidos.
       · Kick — sigue en kick.com/rorropirrorro69. Kick NO deja cambiar el
         nombre de usuario sin 2FA activado en la cuenta, y activar 2FA es
         configuración de seguridad: eso lo tiene que hacer André con su
         teléfono, no yo.

     ⚠️ EL ENLACE DEL DISCORD CADUCA — es lo más frágil de este archivo.
       Discord pone 30 días por defecto a los invites y NADIE se entera hasta
       que un desconocido ve «Invitación no válida» y se va. Ha pasado ya: el
       enlace que vivió aquí meses (TWeVqTTPS) caducaba el 5-sep-2026, y el que
       está abajo caduca el **14-sep-2026**.
       ARREGLARLO DE VERDAD son treinta segundos, y sólo puede hacerlo André
       desde la app de escritorio (la sesión con permisos vive ahí, no en
       Chrome): nombre del servidor → Invitar a gente → Editar enlace de
       invitación → «Expira después de: Nunca» → Generar un nuevo enlace →
       pegar el código aquí y en gracias.html. Mientras eso no pase, esta línea
       tiene fecha de caducidad.

     El servidor es el de la comunidad real (guild 1366544038953484410, ~19
     miembros, donde ya conversan Gregorio, Luis y los demás). Aterriza en
     #chat a propósito: es donde está la plática, no el canal de anuncios. */
  var REDES = {
    kick:    'https://kick.com/rorropirrorro69',
    youtube: 'https://www.youtube.com/@northpointcapital',
    discord: 'https://discord.gg/eEp8Tv9tr'
  };
  (function(){
    document.querySelectorAll('.lv-red').forEach(function(a){
      var u = REDES[a.dataset.red];
      if (u){ a.href = u; }
      else {
        a.setAttribute('aria-disabled', 'true');
        a.removeAttribute('href');
        a.querySelector('i').textContent = 'pronto';
      }
    });
  })();


  /* ── LAS RESEÑAS ── Una por línea. `nombre` y `logro` salen tal cual; deja la
     lista vacía y la sección entera se queda sin pintar, que es justo lo que
     debe pasar mientras no haya reseñas de verdad. Ejemplo del formato:

       { nombre:'Luis M.', dato:'6 meses en la mesa', logro:'PRIMER PAYOUT',
         texto:'Llevaba dos años sin escribir un solo trade…' }
  */
  var RESEÑAS = [
  ];
  (function(){
    var caja = document.getElementById('reseñas');
    var pista = document.getElementById('rsTrack');
    if (!caja || !pista) return;
    if (!RESEÑAS.length) return;                 /* sin reseñas, no hay sección */
    caja.hidden = false;
    function tarjeta(r){
      var d = document.createElement('article');
      d.className = 'rs-card';
      var i = document.createElement('i'); i.textContent = r.logro || '';
      var p = document.createElement('p'); p.textContent = r.texto || '';
      var f = document.createElement('footer');
      var b = document.createElement('b'); b.textContent = r.nombre || '';
      var sp = document.createElement('span'); sp.textContent = r.dato || '';
      f.appendChild(b); f.appendChild(sp);
      d.appendChild(i); d.appendChild(p); d.appendChild(f);
      return d;
    }
    /* DOS mitades idénticas y −50%: la costura no se ve. La segunda va oculta
       a lectores de pantalla para no leer todo dos veces. */
    for (var m = 0; m < 2; m++){
      var mit = document.createElement('div');
      mit.className = 'rs-mit';
      if (m) mit.setAttribute('aria-hidden', 'true');
      RESEÑAS.forEach(function(r){ mit.appendChild(tarjeta(r)); });
      pista.appendChild(mit);
    }
  })();

  /* ---------- Router de documentos: el índice ES la navegación ----------
     Un solo documento: LA ACADEMIA. Cualquier hash del grupo activa TODAS las
     secciones apiladas; si el hash es un id concreto, además aterriza ahí. */
  /* ══ UNA SOLA LISTA, Y QUE SE ESCRIBA SOLA ══ (André, 3-sep-2026)
     Aquí había DOS listas a mano —DOC_SECS decidía qué hash abre documento y
     ACADEMIA_SECS cuáles se encienden— y el comentario del CSS de arriba ya
     advertía que de eso salen los errores. Salió: al dejar la academia en dos
     secciones actualicé DOC_SECS y la sección nueva quedó invisible, porque
     la que enciende es ésta.
     Ahora ACADEMIA_SECS se deriva de DOC_SECS: agregar o quitar una sección se
     hace en un solo lugar. */
  var ACADEMIA_SECS = DOC_SECS.filter(function(id){ return id !== 'academia'; });
  function routeDoc(){
    var h = location.hash.slice(1);
    var open = DOC_SECS.indexOf(h) !== -1;
    document.body.classList.toggle('doc-open', open);
    ACADEMIA_SECS.forEach(function(id){
      var el = document.getElementById(id);
      if (el) el.classList.toggle('doc-active', open);
    });
    var deckSecEl = document.getElementById('deckSec');
    if (open) {
      document.querySelectorAll('section.doc-active .rv').forEach(function(el){ el.classList.add('on'); });
      var target = h !== 'academia' ? document.getElementById(h) : null;
      if (target) { setTimeout(function(){ target.scrollIntoView(); }, 40); }
      else window.scrollTo(0, 0);
      if (deckSecEl) deckSecEl.textContent = '// ACADEMIA /0.1';
    } else {
      if (deckSecEl) deckSecEl.textContent = '// ÍNDICE /0.0';
    }
  }
  window.addEventListener('hashchange', routeDoc);
  routeDoc();



  /* ---------- Tracker de sección (barra inferior) ---------- */
  var deckSec = document.getElementById('deckSec');
  if (deckSec && 'IntersectionObserver' in window) {
    /* Este mapa traía todavía estructura/conducta/tecnología/snowball: la poda
       de hace horas reventó a media corrida ANTES de guardar y se perdió sin
       que nadie lo notara — los ids ya no existían y find() devolvía undefined
       en silencio. Queda podado y en inglés. */
    var mapa = [
      ['indice','// ÍNDICE /0.0'],
      ['filosofia','// ACADEMIA · FILOSOFÍA'],
      ['mesa','// ACADEMIA · FUTUROS'],
      ['comunidad','// ACADEMIA · COMUNIDAD'],
      ['educacion','// ACADEMIA · PREGUNTAS'],
      ['journal','// ACADEMIA · JOURNAL'],
      ['terminal','// ACADEMIA · TERMINAL'],
      ['kuro','// ACADEMIA · KURO'],
      ['expediente','// ACADEMIA · EL EXPEDIENTE'],
      ['planes','// ACADEMIA · LOS PLANES']
    ];
    var ioSec = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (e.isIntersecting) {
          var m = mapa.find(function(x){ return x[0] === e.target.id; });
          if (m) deckSec.textContent = m[1];
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    mapa.forEach(function(m){
      var el = document.getElementById(m[0]);
      if (el) ioSec.observe(el);
    });
  }


  /* ---------- Dark / White mode ---------- */
  function applyTheme(t){
    if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
    var tb = document.getElementById('themeBtn');
    if (tb) tb.textContent = t === 'light' ? '◐ OSCURO' : '◐ CLARO';
    try { localStorage.setItem('np_theme', t); } catch(e){}
  }
  var savedTheme = 'dark';
  try { savedTheme = localStorage.getItem('np_theme') || 'light'; } catch(e){}  /* default BLANCO (André) */
  applyTheme(savedTheme);
  document.addEventListener('DOMContentLoaded', function(){
    applyTheme(savedTheme);
    var tb = document.getElementById('themeBtn');
    if (tb) tb.addEventListener('click', function(){
      applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    });
  });

  /* ---------- Nav con estado de scroll ---------- */
  var nav = document.querySelector('.nav');
  var setNav = function(){ nav.classList.toggle('scrolled', window.scrollY > 24); };
  window.addEventListener('scroll', setNav, { passive: true });
  setNav();

  /* ---------- Parallax sutil del hero ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var heroWrap = document.querySelector('.hero .wrap');
  if (heroWrap && !reduce) {
    var ticking = false;
    window.addEventListener('scroll', function(){
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function(){
        var sy = window.scrollY;
        if (sy < 900) {
          heroWrap.style.transform = 'translateY(' + (sy * 0.14).toFixed(1) + 'px)';
          heroWrap.style.opacity = Math.max(0, 1 - sy / 640);
        }
        ticking = false;
      });
    }, { passive: true });
  }

  /* La curva Snowball y su constructor se fueron con la sección: sin #snowchart
     ni .proj-card en el documento eran líneas que ya no podían correr nunca. */
})();

/* ---------- LAS PANTALLAS DE PARTÍCULAS (Filosofía y Mesa) ----------
   Un solo motor para las dos. Lo que comparten: canvas a pantalla completa,
   colores del TEMA (en claro se invierten solos: el motor lee el color y el
   fondo computados cada ~1.5s, y al cambiar borra las estelas del tema
   anterior), el velo por frame que deja estela, y un campo de estrellas por
   TODA la pantalla —subiendo apenas— para que se sienta espacio y no un
   recuadro. Lo que cambia es el contenido: construir(W,H) devuelve el río
   que fluye (la flecha) o las casas fijas (el rótulo muestreado). */
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function pantalla(cv, construir){
    if (!cv || !cv.getContext) return;
    var cx = cv.getContext('2d');
    var sec = cv.closest('section');
    var st = null, W = 0, H = 0, dpr = 1, f = 0, tAntes = 0, quieta = true;
    var tinta = '#F4F4F4', fondo = 'rgb(8,8,8)', velo = 'rgba(8,8,8,.15)';

    /* De dónde sale el fondo. Se leía de la <section> y punto: una sección SIN
       fondo propio resuelve a rgba(0,0,0,0) y esto pintaba NEGRO encima del
       tema claro — la sección entera se veía en blanco (negro sobre negro).
       Ahora, si el elemento es transparente, se sube hasta encontrar quien sí
       tenga color. Vale para cualquier sección que se agregue después. */
    function fondoReal(){
      var n = sec;
      while (n){
        var v = getComputedStyle(n).backgroundColor;
        var p = (v || '').match(/[\d.]+/g);
        if (p && p.length >= 3 && (p.length < 4 || parseFloat(p[3]) > 0)) return p.slice(0, 3);
        n = n.parentElement;
      }
      return ['8', '8', '8'];
    }
    function colores(){
      var c = getComputedStyle(cv).color;
      var b = fondoReal();
      var fo = 'rgb(' + b.join(',') + ')';
      if (c !== tinta || fo !== fondo){
        tinta = c; fondo = fo; velo = 'rgba(' + b.join(',') + ',0.15)';
        cx.fillStyle = fondo; cx.fillRect(0, 0, W, H);   /* fuera las estelas del tema anterior */
        quieta = true;
      }
    }

    function arma(){
      var r = cv.getBoundingClientRect();
      if (r.width < 10 || r.height < 10) return;
      W = r.width; H = r.height;
      dpr = Math.min(2, devicePixelRatio || 1);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      colores();
      st = construir(W, H);
      /* el espacio: estrellas por toda la pantalla */
      st.aire = [];
      var nA = Math.round(Math.min(260, Math.max(100, W * H / 9000)));
      for (var q = 0; q < nA; q++){
        st.aire.push({ x: Math.random() * W, y: Math.random() * H,
                       v: 3 + Math.random() * 11, ph: Math.random() * 6.283,
                       amp: 3 + Math.random() * 7,
                       s: Math.random() < .8 ? 1 : 1.6,
                       a: .05 + Math.random() * .12 });
      }
      cx.fillStyle = fondo; cx.fillRect(0, 0, W, H);
      quieta = true;
    }

    function puntoEn(d){
      var segs = st.segs;
      for (var j = 0; j < segs.length; j++){
        if (d <= segs[j].len){
          var g = segs[j], fr = d / g.len;
          return [g[0][0] + (g[1][0] - g[0][0]) * fr, g[0][1] + (g[1][1] - g[0][1]) * fr];
        }
        d -= segs[j].len;
      }
      var u = segs[segs.length - 1];
      return [u[1][0], u[1][1]];
    }

    function pinta(t, dt){
      cx.fillStyle = velo; cx.fillRect(0, 0, W, H);   /* la estela vive aquí */
      cx.fillStyle = tinta;
      var i, p, xy;
      /* la física: cada partícula INTEGRA el sistema de Lorenz (σ=10, ρ=28,
         β=8/3) y se proyecta el plano x–z, que es la vista de mariposa. El
         paso de simulación va atado al dt real con tope: en una pestaña que
         despierta, un paso gigante sacaría a todas del atractor de un brinco. */
      if (st.lor){
        var L = st.lor, h = Math.min(.011, dt * .55);
        for (i = 0; i < L.parts.length; i++){
          p = L.parts[i];
          for (var k2 = 0; k2 < 2; k2++){
            var dx = 10 * (p.y - p.x);
            var dy = p.x * (28 - p.z) - p.y;
            var dz = p.x * p.y - (8 / 3) * p.z;
            p.x += dx * h; p.y += dy * h; p.z += dz * h;
          }
          cx.globalAlpha = p.a * (.55 + .45 * Math.sin(t * 1.2 + p.ph));
          cx.fillRect(L.ox + p.x * L.esc, L.oy - (p.z - 25) * L.esc, p.s, p.s);
        }
      }
      for (i = 0; i < st.rio.length; i++){
        p = st.rio[i];
        p.d = (p.d + p.v * dt) % st.total;
        xy = puntoEn(p.d);
        cx.globalAlpha = p.a * (.6 + .4 * Math.sin(t * 1.3 + p.ph * 2));
        cx.fillRect(xy[0] + Math.sin(t * 1.7 + p.ph) * p.amp,
                    xy[1] + Math.cos(t * 1.3 + p.ph) * p.amp, p.s, p.s);
      }
      for (i = 0; i < st.fijos.length; i++){
        p = st.fijos[i];
        cx.globalAlpha = p.a * (.6 + .4 * Math.sin(t * 1.4 + p.ph * 2));
        cx.fillRect(p.hx + Math.sin(t * p.sp + p.ph) * p.amp,
                    p.hy + Math.cos(t * p.sp * .8 + p.ph * 1.6) * p.amp, p.s, p.s);
      }
      for (i = 0; i < st.aire.length; i++){
        p = st.aire[i];
        p.y -= p.v * dt;
        if (p.y < -12){ p.y = H + 12; p.x = Math.random() * W; }
        cx.globalAlpha = p.a * (.7 + .3 * Math.sin(t * .9 + p.ph));
        cx.fillRect(p.x + Math.sin(t * .5 + p.ph) * p.amp, p.y, p.s, p.s);
      }
      cx.globalAlpha = 1;
      /* el fondo propio de la pantalla (la ciudad sólida de Futures) se dibuja
         AL FINAL: opaco, tapa a las partículas donde hay edificio — así las
         estrellas viven sólo en el cielo sin tener que recortarlas a mano */
      if (st.fondo) st.fondo(cx, tinta, fondo, t);
    }

    function loop(ms){
      requestAnimationFrame(loop);
      if (!cv.clientWidth) return;                 /* la sección está cerrada */
      if (Math.abs(cv.clientWidth - W) > 1) arma();
      if (!st) return;
      var dt = Math.min(.05, (ms - tAntes) / 1000 || 0);
      tAntes = ms;
      if (f++ % 90 === 0) colores();
      if (reduce){
        if (quieta){ cx.fillStyle = fondo; cx.fillRect(0, 0, W, H); pinta(0, 0); quieta = false; }
        return;
      }
      pinta(ms / 1000, dt);
    }
    requestAnimationFrame(loop);
    /* la tipografía llega tarde: al cargar la de verdad se rearma el muestreo */
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ W = 0; });
  }

  /* Muestrear un texto a partículas: se dibuja en un lienzo aparte, y cada
     píxel con tinta (cada `paso`) se vuelve la casa de una partícula. Si salen
     de más, se ralea AL AZAR — recortar por el final deja las letras cojas. */
  function textoAPuntos(W, H, texto, px, ls, y, paso, tope){
    var off = document.createElement('canvas');
    off.width = Math.max(1, Math.round(W)); off.height = Math.max(1, Math.round(H));
    var oc = off.getContext('2d'), iw = off.width;
    oc.fillStyle = '#fff'; oc.textAlign = 'center'; oc.textBaseline = 'middle';
    oc.font = '500 ' + px + 'px "IBM Plex Mono", ui-monospace, monospace';
    try{ oc.letterSpacing = Math.round(ls) + 'px'; }catch(e){}
    oc.fillText(texto, iw / 2, y);
    var datos = oc.getImageData(0, 0, iw, off.height).data, pts = [];
    for (var yy = 0; yy < off.height; yy += paso)
      for (var xx = 0; xx < iw; xx += paso)
        if (datos[(yy * iw + xx) * 4 + 3] > 120) pts.push([xx, yy]);
    if (pts.length > tope){
      var prob = tope / pts.length, ralas = [];
      for (var z = 0; z < pts.length; z++) if (Math.random() < prob) ralas.push(pts[z]);
      pts = ralas;
    }
    return pts;
  }
  function fija(c, amp0, ampV){
    return { hx: c[0], hy: c[1], ph: Math.random() * 6.283, sp: .5 + Math.random() * .9,
             amp: amp0 + Math.random() * ampV, s: 1, a: .35 + Math.random() * .65 };
  }



  /* ── FUTURES · NUEVA YORK (v4): la ciudad SÓLIDA ──
     Las v2/v3 dibujaban los edificios con partículas y André dijo la verdad:
     no se entendía qué eran. Cambio de técnica — los edificios son SILUETAS
     SÓLIDAS con retícula de ventanas de verdad, pre-renderizadas a un lienzo
     aparte y blitteadas encima de las partículas cada frame: nítidas, con dos
     capas de profundidad, una torre que se sale por arriba y balizas latiendo.
     Las partículas quedan para lo que son buenas: las estrellas del cielo, que
     la ciudad opaca tapa sola donde hay edificio. Todo tema-consciente: la
     ciudad se re-renderiza cuando cambia la tinta. */
  pantalla(document.getElementById('torreCanvas'), function(W, H){
    var R = function(i2){ var v = Math.sin(i2 * 91.7) * 4735.73; return v - Math.floor(v); };
    var dpr = Math.min(2, devicePixelRatio || 1);
    var off = document.createElement('canvas');
    off.width = Math.max(1, Math.round(W * dpr));
    off.height = Math.max(1, Math.round(H * dpr));
    var oc = off.getContext('2d');
    /* Las alturas se bajaron (André: «los edificios se cortan hasta arriba»).
       Antes el frente arrancaba en .185, .06 y hasta -.12 —o sea, fuera del
       lienzo— y el resultado era un muro de ventanas, no una ciudad. Un skyline
       necesita CIELO: con el más alto en .30 queda casi un tercio de aire
       arriba, y ahí es donde se lee que son torres vistas desde lejos. */
    var FONDOS = [
      { x:.115, w:.062, top:.545 }, { x:.315, w:.058, top:.475 }, { x:.475, w:.052, top:.51 },
      { x:.715, w:.058, top:.49 },  { x:.915, w:.05,  top:.55 }
    ];
    var FRENTE = [
      { x:-.03, w:.175, top:.42,  tapa:1 },
      { x:.245, w:.155, top:.335, ant:.055 },
      { x:.505, w:.195, top:.30 },
      { x:.765, w:.17,  top:.39,  tapa:1, ant:.04 }
    ];
    var balizas = [], cacheTinta = null;

    function torre(t2, prof, tinta, fondoC){
      var bx = t2.x * W, bw = t2.w * W, top = t2.top * H;
      var capW = bw * .62, capH = bw * .16;
      /* cuerpo opaco (tapa estrellas) + velo de tinta para separarlo del cielo */
      oc.fillStyle = fondoC;
      oc.fillRect(bx, top - (t2.tapa ? capH : 0) - 2, bw, H + 40 - top);
      oc.fillStyle = tinta;
      oc.globalAlpha = .055 * prof;
      oc.fillRect(bx, top, bw, H + 40 - top);
      /* el remate y la antena */
      if(t2.tapa){
        oc.globalAlpha = .09 * prof;
        oc.fillRect(bx + (bw - capW) / 2, top - capH, capW, capH);
      }
      oc.globalAlpha = .35 * prof;
      oc.fillRect(bx, top, bw, 1.5);                          /* la azotea */
      oc.fillRect(bx, top, 1.5, H + 40 - top);                /* filos */
      oc.fillRect(bx + bw - 1.5, top, 1.5, H + 40 - top);
      if(t2.ant){
        oc.globalAlpha = .5 * prof;
        oc.fillRect(bx + bw / 2 - 1, top - (t2.tapa ? capH : 0) - t2.ant * H, 2, t2.ant * H);
        balizas.push({ x: bx + bw / 2, y: top - (t2.tapa ? capH : 0) - t2.ant * H });
      }
      /* LAS VENTANAS: la retícula que hace edificio al edificio. Prendidas y
         apagadas con PRNG fija; de vez en cuando un piso entero encendido. */
      var cols = Math.max(4, Math.round(bw / 13));
      var colW = bw / cols;
      var filaH = 11;
      for(var fy = Math.max(8, top + 10), fi = 0; fy < H - 2; fy += filaH, fi++){
        var pisoLleno = R(fi * 31 + t2.x * 97) < .07;
        for(var ci = 0; ci < cols; ci++){
          var rz = R(ci * 13.7 + fi * 7.3 + t2.x * 53);
          var prendida = pisoLleno || rz < .44;
          oc.globalAlpha = (prendida ? .28 + R(ci + fi) * .5 : .07) * prof;
          oc.fillRect(bx + ci * colW + colW * .24, fy, colW * .5, filaH * .52);
        }
      }
      oc.globalAlpha = 1;
    }

    function renderCiudad(tinta, fondoC){
      balizas.length = 0;
      oc.setTransform(dpr, 0, 0, dpr, 0, 0);
      oc.clearRect(0, 0, W, H);
      FONDOS.forEach(function(t2){ torre(t2, .45, tinta, fondoC); });
      FRENTE.forEach(function(t2){ torre(t2, 1, tinta, fondoC); });
    }

    var st = { segs: [], total: 1, rio: [], fijos: [] };
    st.fondo = function(cx2, tinta, fondoC, t){
      if(tinta !== cacheTinta){ renderCiudad(tinta, fondoC); cacheTinta = tinta; }
      cx2.drawImage(off, 0, 0, W, H);
      /* las balizas de las antenas, latiendo despacio */
      cx2.fillStyle = tinta;
      for(var b2 = 0; b2 < balizas.length; b2++){
        cx2.globalAlpha = .25 + .45 * (.5 + .5 * Math.sin(t * 1.5 + b2 * 2.1));
        cx2.beginPath(); cx2.arc(balizas[b2].x, balizas[b2].y, 3, 0, 7); cx2.fill();
      }
      cx2.globalAlpha = 1;
    };
    return st;
  });

  /* ── EL DEMO DEL JOURNAL · una cuenta de fondeo simulada ──
     Los datos imitan un agosto REAL en una eval de $50k con target de $500 y
     stop de -$100 diarios: 21 sesiones, rachas cortas, TODOS los rojos en
     -$100 o menos (el stop se respeta) y dos días marcados aunque uno cerró
     verde. Fijos a propósito: el demo cuenta la misma historia en cada vuelta.
     La cinta de KPIs es la infinita de siempre (dos mitades, -50%). */
  (function(){
    var demo = document.getElementById('jrDemo');
    if(!demo) return;
    var DIAS  = [180,240,-100,160,310,-100,220,140,90,-100,260,180,-80,240,150,310,-100,200,120,280,240];
    var FLAGS = { 8:true, 15:true };

    /* los KPIs finales, calculados de los datos y puestos ANTES de clonar */
    var tot = 0, g = 0, p2 = 0, sg = 0, sp = 0, fl = 0, mejor = -1e9, peor = 1e9;
    DIAS.forEach(function(d, i2){
      tot += d;
      if(d > 0){ g++; sg += d; mejor = Math.max(mejor, d); }
      else { p2++; sp += -d; peor = Math.min(peor, d); }
      if(FLAGS[i2]) fl++;
    });
    var $$q = function(c){ return demo.querySelector(c); };
    $$q('.v-pnl').textContent  = '+$' + tot.toLocaleString('en-US');
    $$q('.v-acct').textContent = '$' + (50000 + tot).toLocaleString('en-US');
    $$q('.v-wd').textContent   = Math.round(g / DIAS.length * 100) + '%';
    $$q('.v-wl').textContent   = g + 'W · ' + p2 + 'L';
    $$q('.v-r').textContent    = (sg / g / (sp / p2)).toFixed(1) + 'R';
    $$q('.v-best').textContent = '+$' + mejor;
    $$q('.v-worst').textContent= '−$' + Math.abs(peor);
    $$q('.v-prog').textContent = Math.min(100, Math.round(tot / 3000 * 100)) + '%';
    $$q('.v-dis').textContent  = Math.round((DIAS.length - fl) / DIAS.length * 100) + '%';
    $$q('.v-fl').textContent   = fl + ' flagged days';

    /* la cinta: la segunda mitad es un clon (sin ids, no hay) */
    var gr = document.getElementById('jdGrupo');
    var copia = gr.cloneNode(true);
    copia.removeAttribute('id');
    copia.setAttribute('aria-hidden', 'true');
    gr.parentNode.appendChild(copia);

    /* agosto 2026 de verdad: arranca en sábado y los findes se atenúan */
    var cal = document.getElementById('jdCal'), mapa = [];
    for(var h2 = 0; h2 < 5; h2++){
      var v0 = document.createElement('i'); v0.className = 'jd-c off'; cal.appendChild(v0);
    }
    for(var d2 = 1; d2 <= 31; d2++){
      var wd = new Date(2026, 7, d2).getDay();
      var cel = document.createElement('i');
      cel.className = 'jd-c' + (wd === 0 || wd === 6 ? ' finde' : '');
      cel.innerHTML = '<u>' + d2 + '</u><b></b>';
      cal.appendChild(cel);
      if(wd !== 0 && wd !== 6) mapa.push(cel);
    }

    var cv = document.getElementById('jdCurva'), cx = cv.getContext('2d');
    var paso = 0, tPrev = 0, espera = 0;

    function curva(){
      var w = cv.clientWidth || 600, h = 170, dpr = Math.min(2, devicePixelRatio || 1);
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx.clearRect(0, 0, w, h);
      var tinta = getComputedStyle(cv).color;
      var acum = [0], mn = 0, mx = 1;
      for(var i2 = 0; i2 < paso; i2++){
        acum.push(acum[i2] + DIAS[i2]);
        mn = Math.min(mn, acum[i2 + 1]); mx = Math.max(mx, acum[i2 + 1]);
      }
      var X = function(i3){ return 8 + i3 / DIAS.length * (w - 16); };
      var Y = function(v){ return 12 + (mx - v) / (mx - mn || 1) * (h - 24); };
      cx.strokeStyle = tinta; cx.globalAlpha = .25; cx.setLineDash([4, 5]);
      cx.beginPath(); cx.moveTo(8, Y(0)); cx.lineTo(w - 8, Y(0)); cx.stroke();
      cx.setLineDash([]); cx.globalAlpha = 1;
      if(paso < 1) return;
      cx.lineWidth = 2; cx.lineJoin = 'round';
      cx.beginPath(); cx.moveTo(X(0), Y(0));
      for(var j2 = 1; j2 <= paso; j2++) cx.lineTo(X(j2), Y(acum[j2]));
      cx.stroke();
      cx.globalAlpha = .07; cx.lineTo(X(paso), Y(mn)); cx.lineTo(X(0), Y(mn));
      cx.closePath(); cx.fillStyle = tinta; cx.fill(); cx.globalAlpha = 1;
    }

    function totales(){
      var t2 = 0, g2 = 0, p3 = 0;
      for(var i2 = 0; i2 < paso; i2++){
        t2 += DIAS[i2];
        if(DIAS[i2] > 0) g2++; else p3++;
      }
      document.getElementById('jdTot').textContent = (t2 < 0 ? '−$' : '+$') + Math.abs(t2).toLocaleString('en-US');
      document.getElementById('jdTotWl').textContent = g2 + 'W · ' + p3 + 'L';
    }

    function reinicia(){
      paso = 0;
      mapa.forEach(function(c2){
        c2.className = 'jd-c' + (c2.className.indexOf('finde') > -1 ? ' finde' : '');
        c2.querySelector('b').textContent = '';
      });
      totales(); curva();
    }

    function tic(ms){
      requestAnimationFrame(tic);
      if(!demo.clientWidth) return;                /* la sección está cerrada */
      if(ms - tPrev < 560) return;
      tPrev = ms;
      if(espera > 0){ if(--espera === 0) reinicia(); return; }
      if(paso >= DIAS.length){ espera = 6; return; }
      var d = DIAS[paso], cel = mapa[paso];
      cel.className = 'jd-c ' + (d > 0 ? 'up' : 'dn') + (FLAGS[paso] ? ' flag' : '');
      cel.querySelector('b').textContent = (d > 0 ? '+$' : '−$') + Math.abs(d);
      paso++;
      totales(); curva();
    }
    requestAnimationFrame(tic);
  })();


  /* ── JOURNAL · el POV del escritorio, A TODA PÁGINA ── responsivo y con
     dos horas del día: la ciudad y el gráfico leen data-theme y se repintan
     al vuelo (resize, hashchange y el MutationObserver del tema). */
  (function(){
    var pov = document.getElementById('pov');
    if (!pov) return;
    var dpr = Math.min(2, devicePixelRatio || 1);
    function esDia(){ return document.documentElement.getAttribute('data-theme') === 'light'; }

    /* el journal se escala al ancho REAL del monitor vertical */
    var pantV = pov.querySelector('.mon-v .mon-pant');
    var monEsc = pov.querySelector('.mon-esc');
    function ajustaMon(){
      var w = pantV ? pantV.clientWidth : 0;
      if (!(w > 0) || !monEsc) return;
      var k = w / 772;
      monEsc.style.transform = 'scale(' + k.toFixed(4) + ')';
      /* Y la ALTURA se la pasamos a mano. Un transform no ocupa caja: con una
         proporción fija la lámina terminaba con un palmo de vacío abajo, que a
         tamaño grande se ve como un error. El contenido manda. */
      var alto = Math.round(monEsc.scrollHeight * k) + 8;   /* +8: scrollHeight
         no cuenta el margen del último bloque y la fila del total salía cortada */
      if (alto > 40) pantV.style.height = alto + 'px';
    }

    /* LA PARED (André: «en vez de ventanas, una pared con monitores y pósters
       de trading, premios, etc — adórnalo como oficina pro»).

       Todo va a BAJO CONTRASTE y dentro del rango de valores de la pared. Ése
       es el truco entero: en una foto de producto real el fondo está fuera de
       foco y lo único que se lee son los números del monitor de enfrente. Si
       los pósters gritan, esto vuelve a parecer una lámina de clip art.

       El centro de la pared se deja LIBRE a propósito: ahí va el monitor del
       diario. Los adornos viven en las dos bandas laterales. */
    var pared = document.getElementById('povCiudad');
    var cxC = pared.getContext('2d');
    var quietoJ = matchMedia('(prefers-reduced-motion: reduce)').matches;
    function seudoJ(n){ var x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x); }

    function pintaPared(t){
      var W = pared.clientWidth, H = pared.clientHeight;
      if (!W || !H) return;
      if (pared.width !== Math.round(W * dpr) || pared.height !== Math.round(H * dpr)){
        pared.width = Math.round(W * dpr); pared.height = Math.round(H * dpr);
      }
      cxC.setTransform(dpr, 0, 0, dpr, 0, 0);
      var dia = esDia();
      var P = dia ? {
            muroA:'#EAE9E3', muroB:'#DAD9D2', tinta:'26,26,24',
            marco:'#3B3934', mate:'#F7F6F2', arte:'#EDECE7',
            mesaA:'#CBC9C2', mesaB:'#B4B2AB', filo:'rgba(0,0,0,.13)',
            vidrio:'#1B1B19', luzPant:'rgba(255,255,255,.05)'
          } : {
            muroA:'#171715', muroB:'#0C0C0B', tinta:'232,232,228',
            marco:'#2B2A27', mate:'#1C1B19', arte:'#151513',
            mesaA:'#1B1916', mesaB:'#0B0A09', filo:'rgba(255,255,255,.08)',
            vidrio:'#0A0E13', luzPant:'rgba(150,180,240,.09)'
          };
      var MESA = H * .795;                    /* dónde empieza el escritorio */

      /* ── el muro ── */
      var g = cxC.createLinearGradient(0, 0, 0, MESA);
      g.addColorStop(0, P.muroA); g.addColorStop(1, P.muroB);
      cxC.fillStyle = g; cxC.fillRect(0, 0, W, MESA);

      /* juntas de los paneles: una cada 320 px, apenas visibles */
      cxC.strokeStyle = 'rgba(' + P.tinta + ',.05)'; cxC.lineWidth = 1;
      for (var jx = 320; jx < W; jx += 320){
        cxC.beginPath(); cxC.moveTo(Math.round(jx) + .5, 0);
        cxC.lineTo(Math.round(jx) + .5, MESA); cxC.stroke();
      }

      /* la luz del techo, cayendo sobre el centro */
      var lz = cxC.createRadialGradient(W * .5, -H * .12, 0, W * .5, -H * .12, H * 1.15);
      lz.addColorStop(0, dia ? 'rgba(255,255,255,.5)' : 'rgba(226,220,200,.09)');
      lz.addColorStop(1, 'rgba(255,255,255,0)');
      cxC.fillStyle = lz; cxC.fillRect(0, 0, W, MESA);

      /* La pared va DESNUDA (André: «elimina lo que está colgado… en la
         pared»). Antes traía banco de pantallas, relojes de NY·LDN·TYO,
         repisa, pósters y reconocimientos; se fueron todos, y con ellos sus
         funciones de dibujo. Queda el muro, su luz y el escritorio: el único
         objeto de la escena es el monitor del diario. */

      /* ══ el escritorio ══ */
      var gm = cxC.createLinearGradient(0, MESA, 0, H);
      gm.addColorStop(0, P.mesaA); gm.addColorStop(1, P.mesaB);
      cxC.fillStyle = gm; cxC.fillRect(0, MESA, W, H - MESA);
      cxC.fillStyle = P.filo; cxC.fillRect(0, MESA, W, 1);
      /* el charco de luz que tira el monitor sobre la madera */
      var pl = cxC.createRadialGradient(W * .5, MESA + 6, 0, W * .5, MESA + 6, W * .3);
      pl.addColorStop(0, dia ? 'rgba(255,255,255,.34)' : 'rgba(150,175,235,.13)');
      pl.addColorStop(1, 'rgba(255,255,255,0)');
      cxC.fillStyle = pl; cxC.fillRect(0, MESA, W, H - MESA);
      /* y su sombra de contacto */
      var sc = cxC.createRadialGradient(W * .5, MESA + 10, 0, W * .5, MESA + 10, W * .12);
      sc.addColorStop(0, 'rgba(0,0,0,' + (dia ? .22 : .5) + ')');
      sc.addColorStop(1, 'rgba(0,0,0,0)');
      cxC.fillStyle = sc; cxC.fillRect(W * .5 - W * .14, MESA, W * .28, H - MESA);

      /* teclado y taza: sin ellos el escritorio es una banda muerta. Van en
         perspectiva y al mismo valor que la mesa — son mobiliario, no tema. */
      var ky = MESA + (H - MESA) * .26, kw = Math.min(W * .26, 320), kh = (H - MESA) * .12;
      var kc = W * .5;
      cxC.beginPath();
      cxC.moveTo(kc - kw * .43, ky); cxC.lineTo(kc + kw * .43, ky);
      cxC.lineTo(kc + kw * .5, ky + kh); cxC.lineTo(kc - kw * .5, ky + kh);
      cxC.closePath();
      cxC.fillStyle = dia ? '#C4C2BB' : '#181715'; cxC.fill();
      cxC.strokeStyle = P.filo; cxC.lineWidth = 1; cxC.stroke();
      cxC.save(); cxC.clip();
      cxC.strokeStyle = 'rgba(' + P.tinta + ',.10)';
      for (var tk = 1; tk < 16; tk++){
        var tx = kc - kw * .5 + kw * tk / 16;
        cxC.beginPath(); cxC.moveTo(tx, ky); cxC.lineTo(tx - 3, ky + kh); cxC.stroke();
      }
      cxC.beginPath(); cxC.moveTo(kc - kw * .5, ky + kh * .5);
      cxC.lineTo(kc + kw * .5, ky + kh * .5); cxC.stroke();
      cxC.restore();
      var tzx = kc + kw * .72, tzy = ky - kh * .3, tzw = kh * 1.05, tzh = kh * 1.35;
      cxC.fillStyle = dia ? '#DCDAD3' : '#201F1C';
      cxC.fillRect(tzx, tzy, tzw, tzh);
      cxC.strokeStyle = P.filo; cxC.lineWidth = 1.6;
      cxC.beginPath();
      cxC.arc(tzx + tzw, tzy + tzh * .45, tzh * .24, -1.2, 1.2); cxC.stroke();
      cxC.fillStyle = 'rgba(' + P.tinta + ',.12)';
      cxC.fillRect(tzx, tzy, tzw, 2);

      /* viñeta: cierra la escena */
      var vg = cxC.createRadialGradient(W * .5, H * .42, Math.min(W, H) * .35,
                                        W * .5, H * .42, Math.max(W, H) * .82);
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, dia ? 'rgba(120,118,112,.2)' : 'rgba(0,0,0,.5)');
      cxC.fillStyle = vg; cxC.fillRect(0, 0, W, H);
    }

    ajustaMon();
    /* el demo se llena por JS después: hay que volver a medir cuando crezca */
    if (window.ResizeObserver && monEsc) new ResizeObserver(ajustaMon).observe(monEsc);
    addEventListener('resize', ajustaMon);
    addEventListener('hashchange', function(){ requestAnimationFrame(ajustaMon); });
    if (quietoJ){
      requestAnimationFrame(function(){ pintaPared(0); });
      addEventListener('resize', function(){ pintaPared(0); });
      new MutationObserver(function(){ pintaPared(0); })
        .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    } else {
      (function lazo(ts){
        pintaPared(ts / 1000);
        requestAnimationFrame(lazo);
      })(0);
    }

  })();


  /* ── FILOSOFÍA · el leopardo, la sabana COMPLETA ── (André: «está muy
     simple… ríos, montañas, más árboles, animales randoms, pájaros — y
     después de cazar debería llevarse su presa arriba del árbol»). El ciclo
     entero: acecha (avanza SOLO cuando ninguna gacela mira) → sprint (las
     parvadas del árbol se espantan) → captura con destellos → CAMINA con la
     presa en el hocico hasta la acacia grande → TREPA el tronco → descansa
     en la RAMA con la presa colgada — la estampa clásica del leopardo — y la
     escena se funde para empezar de nuevo. Atrás: dos cordilleras, un río
     con destellos, tres acacias, una jirafa comiendo de la chica y un
     elefante cruzando a lo lejos. Todo determinista salvo los tiempos de
     mirada de las gacelas. */
  (function(){
    var cv = document.getElementById('cazaCanvas');
    if (!cv) return;
    var cx = cv.getContext('2d');
    var dpr = Math.min(2, devicePixelRatio || 1);
    var quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var tAntes = 0, chispas = [], alfaEsc = 1;
    var leo = null, presas = [], fase = 'acecho', faseAntes = '', faseT = 0, capturaX = 0;
    var parvadas = [], susto = [];
    function esDia(){ return document.documentElement.getAttribute('data-theme') === 'light'; }
    function seudo(n){ var x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x); }

    function reinicia(W, H){
      leo = { x: W * .07, y: 0 };
      /* UNA sola presa (André): el duelo es de dos */
      presas = [ { x: W * .74, mira: 0, prox: 1.5 + Math.random() * 3,
                   fase: Math.random() * 6.28, vx: 0, viva: true } ];
      fase = 'acecho'; faseT = 0;
      parvadas = [ { x: W * .2, y: H * .16, v: 13, n: 6, sep: 15 },
                   { x: W * .72, y: H * .26, v: -9, n: 5, sep: 13 } ];
    }

    /* leopardo RELATIVO: (0,0) = el suelo bajo la cadera; dir voltea, carga
       dibuja la presa en el hocico. Así el mismo dibujo camina, trepa
       (rotado) y descansa en la rama. */
    function leon(px, py, c, r, t, alfa, dir, carga, rot){
      /* CON COLORES (André): cuerpo leonado, melena café, borla y orejas
         oscuras — un león de verdad, no una silueta */
      var a2 = alfa.toFixed(2);
      var cuerpo = 'rgba(193,135,60,' + a2 + ')';
      var melena = 'rgba(122,74,29,' + a2 + ')';
      var oscuro = 'rgba(84,52,20,' + a2 + ')';
      cx.save(); cx.translate(px, py);
      if (rot) cx.rotate(rot);
      cx.scale(dir, 1);
      cx.fillStyle = cx.strokeStyle = cuerpo; cx.lineCap = 'round';
      var alto = 15 - 5 * c + 3 * r, largo = 44 + 16 * r;
      var yb = -alto;
      cx.lineWidth = 11 - 3 * c;
      cx.beginPath(); cx.moveTo(0, yb); cx.lineTo(largo, yb - 2 - 4 * r); cx.stroke();
      /* la MELENA café con la cabeza leonada asomando; orejas oscuras */
      cx.fillStyle = melena;
      cx.beginPath(); cx.arc(largo + 4, yb - 5 - 4 * r, 10.5, 0, 6.2832); cx.fill();
      cx.fillStyle = cuerpo;
      cx.beginPath(); cx.arc(largo + 11, yb - 4 - 4 * r, 5.5, 0, 6.2832); cx.fill();
      cx.fillStyle = oscuro;
      cx.fillRect(largo + 6, yb - 17 - 4 * r, 2.5, 4);
      cx.fillRect(largo + 1, yb - 17 - 4 * r, 2.5, 4);
      cx.strokeStyle = cuerpo;
      cx.lineWidth = 3;
      cx.beginPath(); cx.moveTo(-1, yb);
      cx.quadraticCurveTo(-18, yb - 15 + 8 * c + Math.sin(t * 2.2) * 2.5 * (1 - r),
                          -27, yb - 2 + 9 * c);
      cx.stroke();
      /* la borla oscura de la cola */
      cx.fillStyle = oscuro;
      cx.beginPath(); cx.arc(-27, yb - 2 + 9 * c, 2.8, 0, 6.2832); cx.fill();
      cx.fillStyle = cx.strokeStyle = cuerpo;
      cx.lineWidth = 3.4;
      for (var pp = 0; pp < 4; pp++){
        var lx = 6 + pp * (largo - 10) / 3;
        var sw = r ? Math.sin(t * 14 + pp * 1.7) * 11 * r : Math.sin(t * 2.5 + pp) * 1.2 * (1 - c);
        cx.beginPath(); cx.moveTo(lx, yb + 2); cx.lineTo(lx + sw, 0); cx.stroke();
      }
      if (carga){
        /* la presa colgando del hocico */
        var ink2 = esDia() ? 'rgba(26,26,24,.85)' : 'rgba(225,232,240,.7)';
        cx.fillStyle = cx.strokeStyle = ink2;
        cx.beginPath(); cx.ellipse(largo + 12, yb + 4, 8, 4.5, .3, 0, 6.2832); cx.fill();
        cx.lineWidth = 1.6;
        for (var qq = 0; qq < 3; qq++){
          cx.beginPath(); cx.moveTo(largo + 8 + qq * 5, yb + 6);
          cx.lineTo(largo + 7 + qq * 5 + Math.sin(t * 3 + qq), yb + 14); cx.stroke();
        }
      }
      cx.restore();
    }

    function presaEnRama(x, y, t, ink){
      /* la presa drapeada sobre la rama, colgando — la estampa */
      cx.fillStyle = cx.strokeStyle = ink;
      cx.beginPath(); cx.ellipse(x, y, 9, 4.5, .12, 0, 6.2832); cx.fill();
      cx.lineWidth = 1.6;
      for (var q = 0; q < 4; q++){
        cx.beginPath(); cx.moveTo(x - 6 + q * 4, y + 3);
        cx.lineTo(x - 7 + q * 4 + Math.sin(t * 1.4 + q) * 1.5, y + 13); cx.stroke();
      }
      cx.beginPath(); cx.moveTo(x + 8, y + 2); cx.lineTo(x + 11, y + 10); cx.stroke();
      cx.beginPath(); cx.arc(x + 11, y + 11, 2.4, 0, 6.2832); cx.fill();
    }

    function gacela(g, y, t, ink){
      var alza = g.mira > 0 ? 1 : 0;
      var brinco = g.vx ? Math.abs(Math.sin(t * 9 + g.fase)) * (g.vx > 200 ? 12 : 4) : 0;
      var x = g.x, yy = y - brinco;
      cx.fillStyle = cx.strokeStyle = ink; cx.lineCap = 'round';
      cx.beginPath(); cx.ellipse(x, yy - 15, 11, 5.5, 0, 0, 6.2832); cx.fill();
      var hx = x - 10;
      var chy = alza ? yy - 32 : y - 4;
      cx.lineWidth = 2.6;
      cx.beginPath(); cx.moveTo(hx, yy - 16); cx.lineTo(hx - 4 + 2 * alza, chy + 4); cx.stroke();
      cx.beginPath(); cx.arc(hx - 5 + 2 * alza, chy, 3.4, 0, 6.2832); cx.fill();
      cx.lineWidth = 1.4;
      cx.beginPath();
      cx.moveTo(hx - 5 + 2 * alza, chy - 3);
      cx.quadraticCurveTo(hx - 2 + 2 * alza, chy - 9, hx + 1 + 2 * alza, chy - 10);
      cx.stroke();
      cx.lineWidth = 2.2;
      for (var pp = 0; pp < 4; pp++){
        var px = x - 7 + pp * 5;
        var sw = g.vx ? Math.sin(t * 12 + pp * 1.9 + g.fase) * 8 : 0;
        cx.beginPath(); cx.moveTo(px, yy - 11); cx.lineTo(px + sw, y); cx.stroke();
      }
    }

    function acacia(x, suelo, esc, ink){
      cx.strokeStyle = cx.fillStyle = ink;
      cx.lineWidth = 3 * esc;
      cx.beginPath(); cx.moveTo(x, suelo); cx.lineTo(x - 15 * esc, suelo - 64 * esc); cx.stroke();
      cx.lineWidth = 2 * esc;
      cx.beginPath(); cx.moveTo(x - 15 * esc, suelo - 64 * esc); cx.lineTo(x - 40 * esc, suelo - 84 * esc); cx.stroke();
      cx.beginPath(); cx.moveTo(x - 15 * esc, suelo - 64 * esc); cx.lineTo(x + 20 * esc, suelo - 88 * esc); cx.stroke();
      cx.beginPath(); cx.ellipse(x - 10 * esc, suelo - 92 * esc, 58 * esc, 12 * esc, 0, 0, 6.2832); cx.fill();
    }

    function pinta(ts){
      var t = ts / 1000, dt = Math.min(.05, t - tAntes); tAntes = t;
      var W = cv.clientWidth, H = cv.clientHeight;
      if (W && H){
        if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)){
          cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
          reinicia(W, H);
        }
        cx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var dia = esDia(), suelo = H * .74, ax = W * .52;
        var ink = dia ? 'rgba(26,26,24,.9)' : 'rgba(225,232,240,.8)';
        var lejos = dia ? 'rgba(60,58,50,.35)' : 'rgba(200,195,175,.14)';

        /* cielo y astro */
        cx.fillStyle = dia ? '#F3F2EE' : '#050507';
        cx.fillRect(0, 0, W, H);
        if (!dia){
          for (var e = 0; e < 70; e++){
            cx.fillStyle = 'rgba(255,255,255,' + (.1 + (e % 5) * .06) + ')';
            cx.fillRect((e * 173.2) % W, (e * 57.3) % (suelo * .7), 1.2, 1.2);
          }
        }
        var ga = cx.createRadialGradient(W * .84, H * .14, 4, W * .84, H * .14, 70);
        ga.addColorStop(0, 'rgba(240,220,143,' + (dia ? .8 : .5) + ')');
        ga.addColorStop(1, 'rgba(240,220,143,0)');
        cx.fillStyle = ga; cx.fillRect(W * .84 - 80, H * .14 - 80, 160, 160);

        /* parvadas cruzando el cielo */
        parvadas.forEach(function(pv){
          pv.x += pv.v * dt;
          if (pv.x > W + 120) pv.x = -120;
          if (pv.x < -120) pv.x = W + 120;
          cx.strokeStyle = lejos; cx.lineWidth = 1.4;
          for (var b = 0; b < pv.n; b++){
            var bx = pv.x + b * pv.sep - (b % 2) * 6, by = pv.y + (b % 3) * 5;
            var ala = Math.sin(t * 8 + b * 1.3) * 3.5;
            cx.beginPath(); cx.moveTo(bx - 4, by - ala);
            cx.lineTo(bx, by); cx.lineTo(bx + 4, by - ala); cx.stroke();
          }
        });

        /* dos cordilleras */
        function sierra(paso, alto, alfa, semilla){
          cx.fillStyle = dia ? 'rgba(70,66,58,' + alfa + ')' : 'rgba(160,155,140,' + alfa + ')';
          cx.beginPath(); cx.moveTo(0, suelo);
          for (var mx = 0; mx <= W + paso; mx += paso){
            cx.lineTo(mx, suelo - alto - seudo(mx * .13 + semilla) * alto * 1.1);
            cx.lineTo(mx + paso * .5, suelo - alto * .35 - seudo(mx * .29 + semilla) * alto * .4);
          }
          cx.lineTo(W, suelo); cx.closePath(); cx.fill();
        }
        sierra(W / 5, H * .14, dia ? .18 : .07, 3);
        sierra(W / 3.4, H * .09, dia ? .26 : .1, 11);

        /* el río, con destellos que corren */
        var yr = suelo - 26;
        cx.fillStyle = dia ? 'rgba(70,90,105,.38)' : 'rgba(120,160,200,.13)';
        cx.beginPath();
        for (var rx = 0; rx <= W; rx += 14) cx.lineTo(rx, yr + Math.sin(rx * .012 + 1) * 4);
        for (rx = W; rx >= 0; rx -= 14) cx.lineTo(rx, yr + 11 + Math.sin(rx * .012) * 4);
        cx.closePath(); cx.fill();
        cx.strokeStyle = dia ? 'rgba(255,255,255,.5)' : 'rgba(200,225,255,.22)';
        cx.lineWidth = 1;
        for (var gl = 0; gl < 9; gl++){
          var gx2 = ((gl * 149 + t * 26) % W);
          cx.beginPath(); cx.moveTo(gx2, yr + 3 + (gl % 3) * 3);
          cx.lineTo(gx2 + 10, yr + 3 + (gl % 3) * 3); cx.stroke();
        }

        /* el PRIMER PLANO ya no está pelón (André): lagos con destellos —
           el astro reflejado en el grande —, piedras y matas regadas por
           toda la franja del suelo */
        function lago(lx, ly, lw, lh){
          cx.fillStyle = dia ? 'rgba(70,90,105,.35)' : 'rgba(120,160,200,.12)';
          cx.beginPath(); cx.ellipse(lx, ly, lw, lh, 0, 0, 6.2832); cx.fill();
          cx.strokeStyle = dia ? 'rgba(255,255,255,.5)' : 'rgba(200,225,255,.2)';
          cx.lineWidth = 1;
          for (var g3 = 0; g3 < 3; g3++){
            var glx = lx - lw * .6 + ((g3 * 97 + t * 18) % (lw * 1.2));
            cx.beginPath(); cx.moveTo(glx, ly - 2 + g3 * 3);
            cx.lineTo(glx + 8, ly - 2 + g3 * 3); cx.stroke();
          }
        }
        var fondoY = suelo + (H - suelo) * .42;
        lago(W * .2, fondoY, Math.min(150, W * .13), 13);
        cx.fillStyle = 'rgba(240,220,143,' + (dia ? .22 : .12) + ')';
        cx.beginPath(); cx.ellipse(W * .2 + 20, fondoY - 2, 26, 4, 0, 0, 6.2832); cx.fill();
        lago(W * .76, suelo + (H - suelo) * .68, Math.min(100, W * .085), 10);
        for (var pi2 = 0; pi2 < 6; pi2++){
          var prx = (seudo(pi2 * 3.7) * .9 + .05) * W;
          var pry = suelo + (H - suelo) * (.18 + seudo(pi2 * 7.1) * .72);
          cx.fillStyle = dia ? 'rgba(90,86,78,.4)' : 'rgba(160,160,170,.1)';
          cx.beginPath(); cx.arc(prx, pry, 5 + seudo(pi2) * 9, Math.PI, 0); cx.fill();
        }
        cx.lineWidth = 1.4;
        for (var mt = 0; mt < 14; mt++){
          var mx2 = (seudo(mt * 5.3 + 40) * .94 + .03) * W;
          var my2 = suelo + (H - suelo) * (.12 + seudo(mt * 9.7) * .8);
          cx.strokeStyle = dia ? 'rgba(80,76,60,.4)' : 'rgba(170,165,130,.14)';
          for (var br2 = -2; br2 <= 2; br2++){
            cx.beginPath(); cx.moveTo(mx2, my2);
            cx.lineTo(mx2 + br2 * 3 + Math.sin(t * 1.2 + mt) * 2, my2 - 8 - Math.abs(br2)); cx.stroke();
          }
        }

        /* acacia lejana */
        acacia(W * .16, suelo, .62, lejos);

        /* las acacias del frente: la GRANDE (el escenario del final) + una más */
        var inkArbol = dia ? 'rgba(50,46,40,.6)' : 'rgba(180,172,150,.22)';
        cx.strokeStyle = cx.fillStyle = inkArbol;
        cx.lineWidth = 4.5;
        cx.beginPath(); cx.moveTo(ax, suelo); cx.lineTo(ax - 12, suelo - 96); cx.stroke();
        cx.lineWidth = 3.5;                                       /* LA RAMA */
        cx.beginPath(); cx.moveTo(ax - 8, suelo - 70); cx.lineTo(ax + 54, suelo - 82); cx.stroke();
        cx.lineWidth = 2.5;
        cx.beginPath(); cx.moveTo(ax - 12, suelo - 96); cx.lineTo(ax - 44, suelo - 116); cx.stroke();
        cx.beginPath(); cx.moveTo(ax - 12, suelo - 96); cx.lineTo(ax + 22, suelo - 120); cx.stroke();
        cx.beginPath(); cx.ellipse(ax - 8, suelo - 124, 72, 14, 0, 0, 6.2832); cx.fill();
        acacia(W * .88, suelo, .48, inkArbol);

        /* ══ la cacería ══ */
        faseT += dt;
        var vigilan = presas.some(function(g){ return g.mira > 0 && g.viva; });
        if (fase === 'acecho'){
          presas.forEach(function(g){
            if (!g.viva) return;
            if (g.mira > 0){ g.mira -= dt; }
            else { g.prox -= dt; if (g.prox <= 0){ g.mira = .9 + Math.random() * 1.4; g.prox = 2 + Math.random() * 4; } }
          });
          if (!vigilan) leo.x += 15 * dt;
          if (presas[0].x - leo.x < W * .17){ fase = 'carga'; faseT = 0; }
        } else if (fase === 'carga'){
          leo.x += 460 * dt;
          presas.forEach(function(g, gi){
            g.mira = 0;
            g.vx = 250;
            g.x += g.vx * dt;
          });
          if (presas[0].viva && leo.x + 52 >= presas[0].x){
            presas[0].viva = false; capturaX = Math.min(presas[0].x, W - 60);
            for (var ch = 0; ch < 16; ch++){
              var aa = Math.random() * 6.28, vv = 40 + Math.random() * 90;
              chispas.push({ x: capturaX, y: suelo - 18, vx: Math.cos(aa) * vv,
                             vy: -Math.abs(Math.sin(aa)) * vv - 30, vida: 1 });
            }
            leo.x = capturaX - 40;
            fase = 'premio'; faseT = 0;
          }
          if (leo.x > W + 80){ fase = 'fundido'; faseT = 0; }
        } else if (fase === 'premio'){
          presas.forEach(function(g){ if (g.viva){ g.x += g.vx * dt; } });
          if (faseT > 1.2){ fase = 'acarreo'; faseT = 0; }
        } else if (fase === 'acarreo'){
          leo.x -= 90 * dt;                        /* camina a la acacia, presa al hocico */
          if (leo.x <= ax + 26){ fase = 'trepa'; faseT = 0; }
        } else if (fase === 'trepa'){
          if (faseT > 1.6){ fase = 'rama'; faseT = 0; }
        } else if (fase === 'rama'){
          if (faseT > 4.4){ fase = 'fundido'; faseT = 0; }
        } else if (fase === 'fundido'){
          alfaEsc = Math.max(0, 1 - faseT * 1.6);
          if (faseT > .8){ reinicia(W, H); alfaEsc = 0; fase = 'entra'; faseT = 0; }
        } else if (fase === 'entra'){
          alfaEsc = Math.min(1, faseT * 1.6);
          if (faseT > .8){ fase = 'acecho'; faseT = 0; alfaEsc = 1; }
        }

        /* el sprint espanta a los pájaros del árbol */
        if (fase === 'carga' && faseAntes !== 'carga'){
          for (var sb = 0; sb < 6; sb++){
            susto.push({ x: ax - 10 + sb * 8, y: suelo - 116,
                         vx: -30 - Math.random() * 60, vy: -40 - Math.random() * 50, vida: 1 });
          }
        }
        faseAntes = fase;

        cx.save(); cx.globalAlpha = alfaEsc;

        /* pasto de atrás */
        cx.strokeStyle = dia ? 'rgba(80,76,60,.35)' : 'rgba(170,165,130,.14)';
        cx.lineWidth = 1.4;
        for (var pb = 0; pb < W; pb += 17){
          var swb = Math.sin(t * 1.3 + pb) * 3;
          cx.beginPath(); cx.moveTo(pb, suelo);
          cx.lineTo(pb + swb, suelo - 6 - (pb * 7919 % 14)); cx.stroke();
        }

        /* la manada */
        presas.forEach(function(g){ if (g.viva) gacela(g, suelo, t, ink); });

        /* el leopardo, según la fase */
        var agacho = fase === 'acecho' ? (vigilan ? 1 : .8) : 0;
        if (fase === 'carga'){
          leon(leo.x, suelo, 0, 1, t, alfaEsc, 1, false, 0);
        } else if (fase === 'premio'){
          leon(leo.x, suelo, 0, 0, t, alfaEsc, 1, true, 0);
        } else if (fase === 'acarreo'){
          leon(leo.x, suelo, 0, .25, t, alfaEsc, -1, true, 0);
        } else if (fase === 'trepa'){
          var k = faseT / 1.6, kk = k * k * (3 - 2 * k);
          var tx = (ax + 26) + (ax - 2 - (ax + 26)) * kk;
          var ty = suelo + (suelo - 74 - suelo) * kk;
          leon(tx, ty, .5, .3, t, alfaEsc, -1, true, -1.05);
        } else if (fase === 'rama'){
          leon(ax + 34, suelo - 80, .6, 0, t, alfaEsc, -1, false, .12);
          presaEnRama(ax + 14, suelo - 74, t, ink);
        } else if (fase === 'acecho' || fase === 'entra' || fase === 'fundido'){
          leon(leo.x, suelo, agacho, 0, t, alfaEsc, 1, false, 0);
        }

        /* pasto de ENFRENTE */
        cx.strokeStyle = dia ? 'rgba(66,62,48,.5)' : 'rgba(150,145,112,.22)';
        cx.lineWidth = 2;
        for (var pf = 0; pf < W; pf += 9){
          var swf = Math.sin(t * 1.1 + pf * .7) * 4;
          cx.beginPath(); cx.moveTo(pf, suelo + 3);
          cx.quadraticCurveTo(pf + swf * .5, suelo - 8, pf + swf, suelo - 9 - (pf * 104729 % 19));
          cx.stroke();
        }
        cx.restore();

        /* pájaros espantados */
        for (var su = susto.length - 1; su >= 0; su--){
          var sv = susto[su];
          sv.vida -= dt / 2.5; sv.x += sv.vx * dt; sv.y += sv.vy * dt; sv.vy -= 8 * dt;
          if (sv.vida <= 0){ susto.splice(su, 1); continue; }
          cx.strokeStyle = dia ? 'rgba(26,26,24,' + (sv.vida * .8).toFixed(2) + ')'
                               : 'rgba(225,232,240,' + (sv.vida * .7).toFixed(2) + ')';
          cx.lineWidth = 1.4;
          var ala2 = Math.sin(t * 12 + su) * 4;
          cx.beginPath(); cx.moveTo(sv.x - 4, sv.y - ala2);
          cx.lineTo(sv.x, sv.y); cx.lineTo(sv.x + 4, sv.y - ala2); cx.stroke();
        }

        /* destellos del premio */
        for (var q = chispas.length - 1; q >= 0; q--){
          var cq = chispas[q];
          cq.vida -= dt * 1.1; cq.x += cq.vx * dt; cq.y += cq.vy * dt; cq.vy += 70 * dt;
          if (cq.vida <= 0){ chispas.splice(q, 1); continue; }
          cx.fillStyle = 'rgba(240,220,143,' + cq.vida.toFixed(2) + ')';
          cx.fillRect(cq.x, cq.y, 2.4, 2.4);
        }
      }
      if (!quieto) requestAnimationFrame(pinta);
    }
    if (quieto){
      requestAnimationFrame(pinta);
      addEventListener('resize', function(){ requestAnimationFrame(pinta); });
      addEventListener('hashchange', function(){ requestAnimationFrame(pinta); });
      new MutationObserver(function(){ requestAnimationFrame(pinta); })
        .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    } else {
      requestAnimationFrame(pinta);
    }
  })();

})();

