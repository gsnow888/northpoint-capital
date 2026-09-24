/* ============================================================
   programa.html — script 1 de 1
   Extraído del JavaScript inline original (1 bloque(s) <script>, línea 181 del HTML original).
   Se carga en el MISMO punto del documento donde estaba: el orden respecto
   al HTML importa (los scripts sólo ven los elementos que ya existen arriba).
   ============================================================ */


/* tema compartido con la landing */
try{ if((localStorage.getItem('np_theme')||'light')==='light') document.documentElement.setAttribute('data-theme','light'); }catch(e){}

var PROGRAMAS = {
  futuros: {
    tag:'PROGRAMA · FUTUROS · 8 MÓDULOS', nombre:'Futuros Intradía',
    liner:'El programa insignia, ya grabado: del contrato en cero hasta operar la sesión de Nueva York con reglas escritas y ruta a cuenta fondeada.',
    precio:'$6,900', precioI:'MXN · individual · pago único',
    estado:'DISPONIBLE', disp:true,
    stats:[['8','módulos'],['40+','lecciones en video'],['+48 hrs','de video grabado']],
    modSub:'Grabado completo. Cada módulo se ve cuando puedas, las veces que quieras, y el orden es el orden: no se recomienda saltar.',
    modulos:[
      {t:'Futuros, desde cero', d:'El instrumento antes que la opinión: qué estás comprando cuando compras un contrato.',
       l:['Qué es un contrato de futuros','Ticks, puntos y tamaños de contrato','Micros contra minis','Las sesiones y sus horarios','Tu primer chart'], m:'5 LECCIONES · ~6 HRS · VIDEO BAJO DEMANDA'},
      {t:'Estructura de mercado', d:'Leer una sesión completa sin indicadores mágicos: solo precio y contexto.',
       l:['Máximos, mínimos y swings','Tendencia contra rango','Soportes y resistencias','Temporalidades y contexto','Leer una sesión completa'], m:'5 LECCIONES · ~6 HRS · VIDEO BAJO DEMANDA'},
      {t:'Liquidez', d:'Por qué se mueve el precio de verdad — y dónde están las trampas.',
       l:['Dónde descansan las órdenes','Barridos y trampas','Por qué se mueve el precio de verdad','Volumen, lo básico','La apertura, explicada'], m:'5 LECCIONES · ~5 HRS · VIDEO BAJO DEMANDA'},
      {t:'El setup', d:'Condiciones, no opiniones. Un setup que puedas escribir en una tarjeta.',
       l:['Qué es un setup — condiciones, no opiniones','Esperar la confirmación','Cuando NO hay trade','Pensar por checklist','Un setup, de memoria'], m:'5 LECCIONES · ~7 HRS · VIDEO BAJO DEMANDA'},
      {t:'La entrada', d:'La ejecución como rutina: disparador, stop, tamaño — y nada más.',
       l:['Disparadores y timing','Dónde va el stop','Tamaño de la posición','Una buena entrada al día','La rutina de ejecución'], m:'5 LECCIONES · ~7 HRS · VIDEO BAJO DEMANDA'},
      {t:'Riesgo', d:'Sobrevivir primero. La matemática que mantiene viva una cuenta.',
       l:['El stop diario','Riesgo por trade','Las cuentas del drawdown','Días de quema y el camino de regreso','Proteger el payout'], m:'5 LECCIONES · ~6 HRS · VIDEO BAJO DEMANDA'},
      {t:'El journal', d:'Medirte sin mentirte: cada trade escrito, cada semana revisada.',
       l:['Por qué cada trade se escribe','Qué anotar, exactamente','Revisar tu semana','Las métricas que importan','El mes, día por día'], m:'5 LECCIONES · ~5 HRS · VIDEO BAJO DEMANDA'},
      {t:'Cuentas fondeadas', d:'La ruta al capital de terceros: evaluaciones, reglas y cómo no quemarlas.',
       l:['Cómo funcionan las evaluaciones','Las reglas de la fondeadora que importan','Drawdown trailing contra EOD','Las reglas del payout','Mantener la cuenta viva'], m:'5 LECCIONES · ~6 HRS · VIDEO BAJO DEMANDA'}
    ],
    incluye:[
      ['Video bajo demanda','+48 horas grabadas, en la calidad con la que se grabó la mesa. Se ven las veces que quieras.'],
      ['Actualizaciones del programa','Cuando un módulo se regraba o se amplía, lo recibes sin pagar de nuevo.'],
      ['Material de cada módulo','Checklists y plantillas del journal listas para usar.'],
      ['Acceso para siempre','Compra individual = ese programa es tuyo, sin reloj.']
    ]
  },
  riesgo: {
    tag:'PROGRAMA · RIESGO Y PSICOLOGÍA', nombre:'Riesgo y Psicología del Operador',
    liner:'El problema casi nunca es el setup. Es lo que haces cuando vas perdiendo.',
    precio:'$2,900', precioI:'MXN · individual, al salir',
    estado:'EN GRABACIÓN', disp:false,
    stats:[['5','módulos previstos'],['En grabación','las lecciones'],['—','horas: se publican al salir']],
    modSub:'Temario previsto — está en grabación y puede ajustarse al salir. Lo que no cambia: aquí no hay promesas de resultados, hay mecanismos.',
    modulos:[
      {t:'Por qué rompes tus propias reglas', d:'El mecanismo, no el regaño: qué pasa en tu cabeza entre la regla escrita y el clic que la rompe.',
       l:['La regla escrita contra la regla sentida','Los tres momentos donde se rompe todo','Fricción a favor: hacer difícil lo que te quiebra','El contrato contigo mismo, por escrito'], m:'TEMARIO PREVISTO · EN GRABACIÓN'},
      {t:'Tilt', d:'Detectarlo en vivo — antes de que cueste dinero — y el protocolo para cortarlo.',
       l:['Las señales físicas del tilt','El trade de venganza, desarmado','Protocolo de corte: cuándo cerrar la pantalla','Volver al día siguiente, no en cinco minutos'], m:'TEMARIO PREVISTO · EN GRABACIÓN'},
      {t:'Tamaño y drawdown', d:'La matemática de sobrevivir: por qué el tamaño de posición es una decisión emocional disfrazada de técnica.',
       l:['Riesgo por trade que puedas dormir','La cuenta del drawdown, sin maquillaje','Bajar tamaño después de perder — y por qué duele','El camino de regreso, con números'], m:'TEMARIO PREVISTO · EN GRABACIÓN'},
      {t:'Rachas', d:'Aprender a perder bien y a ganar sin inflarte: las dos mitades del mismo músculo.',
       l:['Rachas perdedoras: qué es normal y qué no','La sobreconfianza después de ganar','Qué mirar cuando todo sale mal','El diario emocional junto al journal'], m:'TEMARIO PREVISTO · EN GRABACIÓN'},
      {t:'Disciplina medible', d:'La disciplina no se jura — se mide. Tu score en el Terminal, semana a semana.',
       l:['El NorthPoint Score, explicado','Reglas rotas: contarlas sin esconderlas','La racha como métrica principal','Revisión semanal: 20 minutos que cambian el mes'], m:'TEMARIO PREVISTO · EN GRABACIÓN'}
    ],
    incluye:[
      ['Video bajo demanda','Las lecciones grabadas, al salir el programa.'],
      ['Plantillas','El contrato de reglas y el diario emocional, listos para llenar.'],
      ['Actualizaciones','El programa crece con la mesa; lo recibes sin pagar de nuevo.'],
      ['Precio de salida','Compras al precio publicado hoy; al salir, ese precio no se garantiza.']
    ]
  },
  inversiones: {
    tag:'PROGRAMA · INVERSIONES', nombre:'Inversiones de Largo Plazo',
    liner:'La otra velocidad del dinero: lo aburrido que se trabaja a años, no a minutos. Sin gurús y sin prisa.',
    precio:'$3,900', precioI:'MXN · individual, al salir',
    estado:'EN GRABACIÓN', disp:false,
    stats:[['6','módulos previstos'],['En grabación','las lecciones'],['—','horas: se publican al salir']],
    modSub:'Temario previsto — está en grabación y puede ajustarse al salir. Educación financiera, no recomendaciones de inversión.',
    modulos:[
      {t:'Interés compuesto, sin cuento', d:'La única magia real de las finanzas, con números y sin motivación barata.',
       l:['La fórmula, explicada con tu dinero','Tiempo contra monto: cuál pesa más','Por qué empezar tarde cuesta décadas','La calculadora que vas a usar toda la vida'], m:'TEMARIO PREVISTO · EN GRABACIÓN'},
      {t:'Índices y ETFs', d:'Qué compras en realidad cuando compras un ETF — y qué no.',
       l:['Qué es un índice y quién lo arma','ETFs: la envoltura, los costos, el TER','Réplica física contra sintética','Los tres ETFs de los que todo el mundo habla'], m:'TEMARIO PREVISTO · EN GRABACIÓN'},
      {t:'Tu primer portafolio', d:'Armado paso a paso, con las decisiones en orden: primero estructura, luego productos.',
       l:['Perfil: horizonte antes que tolerancia','La mezcla renta fija / renta variable','Diversificar de verdad, no de adorno','El portafolio de una sola página'], m:'TEMARIO PREVISTO · EN GRABACIÓN'},
      {t:'Aportaciones y rebalanceo', d:'El hábito que hace todo el trabajo — y las dos fechas al año que importan.',
       l:['Aportar en automático','DCA contra suma única, con datos','Rebalancear: cuándo y cuánto','Qué hacer en las caídas (spoiler: casi nada)'], m:'TEMARIO PREVISTO · EN GRABACIÓN'},
      {t:'Brokers y CETES desde México', d:'La fontanería: dónde se abre la cuenta, cómo se fondea y qué papeles firmas.',
       l:['Brokers para mexicanos: qué comparar','CETES directo, explicado completo','Traspasos, comisiones y letras chiquitas','Impuestos de inversión, lo esencial'], m:'TEMARIO PREVISTO · EN GRABACIÓN'},
      {t:'Errores que cuestan décadas', d:'Los siete errores clásicos, con la cuenta de cuánto cuesta cada uno.',
       l:['Perseguir el rendimiento del año pasado','Vender en pánico, comprar en euforia','Productos caros disfrazados de asesoría','El apalancamiento donde no va'], m:'TEMARIO PREVISTO · EN GRABACIÓN'}
    ],
    incluye:[
      ['Video bajo demanda','Las lecciones grabadas, al salir el programa.'],
      ['Plantilla de portafolio','El portafolio de una página, listo para llenar con tu contador.'],
      ['Actualizaciones','Cambia la regulación o el producto, se regraba la lección.'],
      ['Precio de salida','Compras al precio publicado hoy; al salir, ese precio no se garantiza.']
    ]
  },
  algoritmico: {
    tag:'PROGRAMA · TRADING ALGORÍTMICO', nombre:'Trading Algorítmico',
    liner:'Convierte tus reglas en código, para que el sistema las respete cuando tú no puedas.',
    precio:'$4,900', precioI:'MXN · individual, al salir',
    estado:'PRÓXIMAMENTE', disp:false,
    stats:[['5','módulos previstos'],['Próximamente','las lecciones'],['—','horas: se publican al salir']],
    modSub:'Temario previsto — el programa está en diseño y puede ajustarse al salir. Requiere haber pasado por Futuros o tener reglas propias escritas.',
    modulos:[
      {t:'De regla escrita a lógica programable', d:'Tu checklist convertido en condiciones que una máquina pueda evaluar.',
       l:['Anatomía de una regla programable','Condiciones, filtros y horarios','Lo que NO se puede programar (y qué hacer con eso)','Tu primer sistema en papel'], m:'TEMARIO PREVISTO · PRÓXIMAMENTE'},
      {t:'Pine Script y automatización', d:'Del papel a TradingView: indicadores, señales y alertas que ejecutan tu plan.',
       l:['Pine Script desde cero','Pintar tu setup en el chart','Alertas que valen y alertas que estorban','Conectar la alerta a la ejecución'], m:'TEMARIO PREVISTO · PRÓXIMAMENTE'},
      {t:'Backtesting honesto', d:'La parte donde casi todos se mienten: probar sin hacer trampa.',
       l:['Datos limpios o nada','In-sample, out-of-sample','Los sesgos que inflan resultados','Forward testing antes de creer'], m:'TEMARIO PREVISTO · PRÓXIMAMENTE'},
      {t:'Métricas', d:'Leer un backtest como adulto: qué número importa y cuál es decoración.',
       l:['Profit factor y expectancy','Drawdown máximo y duración','Tamaño de muestra: cuántos trades son suficientes','Cuándo un sistema es solo suerte'], m:'TEMARIO PREVISTO · PRÓXIMAMENTE'},
      {t:'Cuándo apagar el bot', d:'La regla que casi nadie escribe: los criterios de muerte de un sistema.',
       l:['Degradación contra mala racha','Los límites que se fijan antes de encender','Monitoreo semanal en 10 minutos','Apagar sin drama, volver con datos'], m:'TEMARIO PREVISTO · PRÓXIMAMENTE'}
    ],
    incluye:[
      ['Video bajo demanda','Las lecciones grabadas, al salir el programa.'],
      ['Código de los ejemplos','Los scripts de las lecciones, comentados línea por línea.'],
      ['Actualizaciones','Cambia la plataforma, se regraba la lección.'],
      ['Precio de salida','Compras al precio publicado hoy; al salir, ese precio no se garantiza.']
    ]
  },
  ml: {
    tag:'PROGRAMA · MACHINE LEARNING', nombre:'Machine Learning Aplicado a Mercados',
    liner:'Qué puede predecir un modelo y qué no. Empezamos por lo segundo.',
    precio:'$5,900', precioI:'MXN · individual, al salir',
    estado:'PRÓXIMAMENTE', disp:false,
    stats:[['5','módulos previstos'],['Próximamente','las lecciones'],['—','horas: se publican al salir']],
    modSub:'Temario previsto — el programa está en diseño y puede ajustarse al salir. Es el programa más avanzado del catálogo: se asume Python básico o ganas de sufrir una semana.',
    modulos:[
      {t:'Python para mercados', d:'Lo mínimo indispensable, sin vueltas: el Python que sí vas a usar.',
       l:['Entorno: notebook, pandas y punto','Series de tiempo sin llorar','Traer datos de mercado a tu máquina','El primer gráfico que sí dice algo'], m:'TEMARIO PREVISTO · PRÓXIMAMENTE'},
      {t:'Datos', d:'Conseguirlos, limpiarlos, y sobre todo: no ensuciarlos con el futuro.',
       l:['Fuentes de datos y sus trampas','Limpieza: huecos, splits, horarios','Look-ahead bias: el pecado capital','Construir tu dataset reproducible'], m:'TEMARIO PREVISTO · PRÓXIMAMENTE'},
      {t:'Features y modelos', d:'De la intuición de trader a variables que un modelo pueda masticar.',
       l:['Features que tienen sentido de mercado','Etiquetas: qué significa "acertar"','Modelos simples primero, siempre','Evaluación que no se hace trampa'], m:'TEMARIO PREVISTO · PRÓXIMAMENTE'},
      {t:'Overfitting', d:'El enemigo número uno: por qué tu modelo perfecto es mentira.',
       l:['Memorizar contra aprender','Validación en series de tiempo','Cuántos experimentos invalidan el resultado','El modelo aburrido que sobrevive'], m:'TEMARIO PREVISTO · PRÓXIMAMENTE'},
      {t:'Del notebook a la operación real', d:'Lo que sobrevive al contacto con el mercado — y cómo desplegarlo con red.',
       l:['Paper trading del modelo','Tamaño mínimo, expectativas mínimas','Monitoreo y degradación','Cuándo el modelo se apaga'], m:'TEMARIO PREVISTO · PRÓXIMAMENTE'}
    ],
    incluye:[
      ['Video bajo demanda','Las lecciones grabadas, al salir el programa.'],
      ['Notebooks completos','El código de cada lección, listo para correr.'],
      ['Datasets de práctica','Datos limpios para reproducir cada ejercicio.'],
      ['Precio de salida','Compras al precio publicado hoy; al salir, ese precio no se garantiza.']
    ]
  },
  macro: {
    tag:'PROGRAMA · MACROECONOMÍA', nombre:'Macroeconomía para Traders',
    liner:'Tasas, Fed y calendario económico: entender el clima en el que operas antes de discutir con él.',
    precio:'$2,900', precioI:'MXN · individual, al salir',
    estado:'PRÓXIMAMENTE', disp:false,
    stats:[['5','módulos previstos'],['Próximamente','las lecciones'],['—','horas: se publican al salir']],
    modSub:'Temario previsto — el programa está en diseño y puede ajustarse al salir. El QUÉ del clima macro; el CÓMO operarlo sigue siendo tuyo.',
    modulos:[
      {t:'Tasas e inflación', d:'El motor detrás de todo: por qué dos números mueven todos los demás.',
       l:['Qué es la tasa de referencia, en cristiano','Inflación: cómo se mide y por qué importa','Tasas reales contra nominales','El efecto dominó en índices y futuros'], m:'TEMARIO PREVISTO · PRÓXIMAMENTE'},
      {t:'La Fed y los bancos centrales', d:'Quiénes son, qué deciden y por qué el mercado les cuenta las sílabas.',
       l:['El mandato dual, explicado','FOMC: qué pasa ese miércoles','El dot plot y las minutas','Banxico y el peso, de paso'], m:'TEMARIO PREVISTO · PRÓXIMAMENTE'},
      {t:'El calendario económico', d:'Leerlo sin miedo: qué dato importa, cuánto y a qué hora.',
       l:['NFP, CPI, PIB: la jerarquía real','Consenso contra dato: dónde está el movimiento','Las horas muertas y las horas vivas','Armar tu semana con el calendario'], m:'TEMARIO PREVISTO · PRÓXIMAMENTE'},
      {t:'Correlaciones que importan', d:'Dólar, bonos, índices: el tablero completo en cuatro relaciones.',
       l:['DXY y los índices','El 10-year como termómetro','Cuando las correlaciones se rompen','El dashboard macro de una pantalla'], m:'TEMARIO PREVISTO · PRÓXIMAMENTE'},
      {t:'Días de dato', d:'Operar o no operar: la decisión que se toma antes de que abra el mercado.',
       l:['La checklist de la mañana de dato','Volatilidad esperada contra la normal','Por qué la mesa a veces no opera','El día después del dato'], m:'TEMARIO PREVISTO · PRÓXIMAMENTE'}
    ],
    incluye:[
      ['Video bajo demanda','Las lecciones grabadas, al salir el programa.'],
      ['El dashboard macro','La plantilla de una pantalla para tu semana.'],
      ['Actualizaciones','El clima cambia; las lecciones también.'],
      ['Precio de salida','Compras al precio publicado hoy; al salir, ese precio no se garantiza.']
    ]
  }
};

(function(){
  var slug = new URLSearchParams(location.search).get('p') || 'futuros';
  var P = PROGRAMAS[slug] || PROGRAMAS.futuros;

  document.title = P.nombre + ' — NORTHPOINT';
  document.getElementById('pTag').textContent = P.tag;
  document.getElementById('pNombre').textContent = P.nombre;
  document.getElementById('pLiner').textContent = P.liner;
  var pr = document.getElementById('pPrecio');
  pr.innerHTML = P.precio + '<i>' + P.precioI + '</i>';
  var es = document.getElementById('pEstado');
  es.textContent = P.estado; if (P.disp) es.classList.add('disp');
  document.getElementById('pCta').href =
    'mailto:andremacouzetruiz@gmail.com?subject=' + encodeURIComponent('Programa ' + P.nombre + ' · NORTHPOINT')
    + '&body=' + encodeURIComponent('Me interesa el programa ' + P.nombre + ' (' + P.precio + ' MXN).');
  document.getElementById('pModSub').textContent = P.modSub;

  document.getElementById('pStats').innerHTML = P.stats.map(function(s){
    return '<div class="stat"><b>'+s[0]+'</b><span>'+s[1]+'</span></div>';
  }).join('');

  document.getElementById('pModulos').innerHTML = P.modulos.map(function(m,i){
    var n = String(i+1).padStart(2,'0');
    return '<div class="mod rv"><div class="mod-n">'+n+'</div><div>'
      + '<h3 class="mod-t">'+m.t+'</h3><p class="mod-d">'+m.d+'</p>'
      + '<ul class="mod-l">'+m.l.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>'
      + '<p class="mod-meta">'+m.m+'</p></div></div>';
  }).join('');

  document.getElementById('pIncluye').innerHTML = P.incluye.map(function(x){
    return '<div class="inc"><b>'+x[0]+'</b><span>'+x[1]+'</span></div>';
  }).join('');

  /* reveal */
  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}
    })},{threshold:.1});
    els.forEach(function(el){io.observe(el)});
  } else { els.forEach(function(el){el.classList.add('on')}); }
})();
