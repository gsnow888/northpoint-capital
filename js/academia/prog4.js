/* ══════════════════════════════════════════════════════════════════════════
   NORTHPOINT · ACADEMIA · PROGRAMA 4 — Fondeo y payouts
   Lecciones de cierre del método. Contenido educativo "para dummies", muy
   visual, con SVG dibujados a mano. Se inyectan en window.LECCIONES_HTML y la
   app las pinta con las clases lec-* dentro del modal de lección.

   Datos del contrato NorthPoint usados en todos los ejemplos:
     · Cuenta de 50k
     · Evaluación: objetivo +$3,000  (50,000 → 53,000)
     · Buffer:     objetivo +$2,500  (50,000 → 52,500)
     · Payouts diarios: de +$250 a +$1,000
     · Riesgo: 1% = $500 por trade · 1 trade al día
   ══════════════════════════════════════════════════════════════════════════ */
window.LECCIONES_HTML = Object.assign(window.LECCIONES_HTML || {}, {

/* ─────────────────────────────────────────────────────────────────────────
   l11a · Las 3 fases — Evaluación: llegar al target
   ───────────────────────────────────────────────────────────────────────── */
'l11a': `
<div class="lec">
  <h1 class="lec-h1">Evaluación: llegar al target</h1>
  <p class="lec-lede">Antes de que una fondeadora te preste su dinero, te pone un examen. Se llama <b>evaluación</b> y es la primera de las 3 fases. Tu única misión aquí es una sola: subir la cuenta de <b>50,000 a 53,000</b> sin romper ninguna regla. Nada más. Ni cobrar, ni presumir, ni operar raro. Solo llegar arriba, con calma.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>La evaluación es como el <b>examen de manejo</b>. Nadie te presta un coche caro para que salgas a la carretera sin antes ver que sabes frenar, meter reversa y respetar el semáforo. El examen no lo pasas manejando rapidísimo: lo pasas manejando <b>bien</b>. Aquí es igual. No necesitas ganar mucho de golpe, necesitas demostrar que sabes operar sin chocar.</p>
  </div>

  <section class="lec-sec">
    <h2>Las 3 fases, de un vistazo</h2>
    <p>Todo el camino del fondeo son tres escalones. Primero pruebas que sabes (evaluación), después construyes un colchón de seguridad (buffer) y hasta entonces empiezas a cobrar todos los días (payouts). No puedes brincarte ninguno: son una escalera, no un menú. Esta lección vive en el primer escalón.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 300" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
      <!-- escalera de 3 fases -->
      <!-- escalón 1: evaluación (resaltado) -->
      <rect x="20" y="200" width="180" height="80" rx="6" fill="none" stroke="var(--up)" stroke-width="2.5"/>
      <text x="110" y="230" text-anchor="middle" font-size="15" fill="var(--up)">1 · EVALUACIÓN</text>
      <text x="110" y="252" text-anchor="middle" font-size="12" fill="currentColor">llegar al target</text>
      <text x="110" y="270" text-anchor="middle" font-size="13" fill="var(--up)">+$3,000</text>
      <text x="110" y="196" text-anchor="middle" font-size="11" fill="var(--up)">◄ ESTÁS AQUÍ</text>
      <!-- escalón 2: buffer -->
      <rect x="220" y="130" width="180" height="80" rx="6" fill="none" stroke="var(--dim)" stroke-width="1.5"/>
      <text x="310" y="160" text-anchor="middle" font-size="15" fill="var(--dim)">2 · BUFFER</text>
      <text x="310" y="182" text-anchor="middle" font-size="12" fill="var(--dim)">el colchón</text>
      <text x="310" y="200" text-anchor="middle" font-size="13" fill="var(--dim)">+$2,500</text>
      <!-- escalón 3: payouts -->
      <rect x="420" y="60" width="180" height="80" rx="6" fill="none" stroke="var(--dim)" stroke-width="1.5"/>
      <text x="510" y="90" text-anchor="middle" font-size="15" fill="var(--dim)">3 · PAYOUTS</text>
      <text x="510" y="112" text-anchor="middle" font-size="12" fill="var(--dim)">cobrar diario</text>
      <text x="510" y="130" text-anchor="middle" font-size="13" fill="var(--dim)">$250–$1,000</text>
      <!-- flechas -->
      <path d="M200 200 L222 178" stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#a11a)"/>
      <path d="M400 130 L422 108" stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#a11a)"/>
      <defs><marker id="a11a" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>
    </svg>
    <figcaption>La escalera del fondeo. Hoy solo importa el primer escalón: llegar a +$3,000.</figcaption>
  </figure>

  <figure class="lec-shot">
    <img src="assets/images/kuro-c-plan.jpg" alt="La pantalla del plan de la terminal" decoding="async">
    <figcaption>As&iacute; se ve de verdad: la barra de la fase. EVAL &rarr; FUNDED &rarr; BUFFER &rarr; PAYOUTS, y d&oacute;nde vas dentro de la que te toca.<br>
      <span style="opacity:.72">Captura de la terminal. Los n&uacute;meros de la imagen son de una cuenta
      de pr&aacute;ctica, no un resultado prometido.</span></figcaption>
  </figure>


  <section class="lec-sec">
    <h2>El target: qué número tienes que tocar</h2>
    <p>Tu cuenta empieza en <b>50,000</b>. El objetivo de la evaluación es <b>+$3,000</b>, o sea llegar a que el balance marque <b>53,000</b>. En cuanto lo tocas y cierras el día, pasaste. No hay que quedarse ahí "por si sube más". Tocaste el número, pasaste, se acabó la fase.</p>
    <p>Ojo con una cosa: no es que necesites 3,000 dólares de un solo trade heroico. Es la <b>suma</b> de tus resultados. Ganas un poco, pierdes un poco, ganas otro poco… y lo que importa es dónde queda la cuenta al final. Es un maratón corto, no un clavado.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 320" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
      <!-- curva de equity subiendo al target -->
      <!-- ejes -->
      <line x1="70" y1="40" x2="70" y2="270" stroke="var(--line)" stroke-width="1"/>
      <line x1="70" y1="270" x2="590" y2="270" stroke="var(--line)" stroke-width="1"/>
      <!-- línea target 53,000 -->
      <line x1="70" y1="60" x2="590" y2="60" stroke="var(--up)" stroke-width="1.5" stroke-dasharray="6 5"/>
      <text x="78" y="54" font-size="12" fill="var(--up)">TARGET · 53,000  (+$3,000)</text>
      <!-- línea inicio 50,000 -->
      <line x1="70" y1="210" x2="590" y2="210" stroke="var(--dim)" stroke-width="1" stroke-dasharray="3 4"/>
      <text x="78" y="204" font-size="11" fill="var(--dim)">inicio · 50,000</text>
      <!-- línea drawdown abajo -->
      <line x1="70" y1="250" x2="590" y2="250" stroke="var(--down)" stroke-width="1.5" stroke-dasharray="4 4"/>
      <text x="78" y="266" font-size="11" fill="var(--down)">línea de quiebre (drawdown)</text>
      <!-- curva escalonada de equity -->
      <polyline points="70,210 130,210 130,180 200,180 200,195 270,195 270,150 340,150 340,120 410,120 410,135 480,135 480,60 560,60"
        fill="none" stroke="var(--up)" stroke-width="2.5"/>
      <!-- puntos -->
      <circle cx="130" cy="180" r="3" fill="var(--up)"/>
      <circle cx="270" cy="150" r="3" fill="var(--up)"/>
      <circle cx="410" cy="120" r="3" fill="var(--up)"/>
      <circle cx="480" cy="60" r="4.5" fill="var(--up)"/>
      <text x="500" y="52" font-size="12" fill="var(--up)">¡PASASTE!</text>
      <!-- etiqueta eje x -->
      <text x="330" y="292" text-anchor="middle" font-size="11" fill="var(--dim)">días de operación →</text>
    </svg>
    <figcaption>La curva no sube en línea recta: sube a escalones, con tropiezos. Lo que cuenta es que la última pisada toque la línea verde antes de tocar la roja.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>La matemática, en servilleta</h2>
    <p>Con el método NorthPoint arriesgas <b>1% = $500</b> por trade y buscas un riesgo-beneficio de <b>1:2</b>. Traducido: cuando pierdes, pierdes 500; cuando ganas, ganas <b>1,000</b>. Haces <b>un trade al día</b>. Con esos números, la cuenta sale sola con un puñado de días buenos.</p>
    <p>Imagina que de cada 10 días ganas 6 y pierdes 4 (un win rate muy realista con este método). Serían 6 × +$1,000 = +$6,000 y 4 × −$500 = −$2,000. Neto: <b>+$4,000</b>. Ya pasaste el +$3,000 y hasta te sobró. Y ni siquiera fue una racha perfecta.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 220" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
      <!-- barra de progreso hacia el target -->
      <text x="20" y="30" font-size="13" fill="currentColor">Progreso hacia el objetivo de la evaluación</text>
      <!-- carril -->
      <rect x="20" y="50" width="580" height="40" rx="8" fill="none" stroke="var(--line)" stroke-width="1.5"/>
      <!-- relleno (2 de 3 mil) -->
      <rect x="20" y="50" width="386" height="40" rx="8" fill="var(--up)" opacity="0.22"/>
      <rect x="20" y="50" width="386" height="40" rx="8" fill="none" stroke="var(--up)" stroke-width="2"/>
      <text x="213" y="75" text-anchor="middle" font-size="14" fill="var(--up)">+$2,000 avanzados</text>
      <!-- meta -->
      <line x1="600" y1="42" x2="600" y2="98" stroke="var(--up)" stroke-width="2"/>
      <text x="600" y="115" text-anchor="end" font-size="12" fill="var(--up)">META +$3,000</text>
      <!-- inicio -->
      <text x="20" y="115" font-size="12" fill="var(--dim)">$0</text>
      <!-- nota -->
      <text x="20" y="160" font-size="12" fill="currentColor">Te faltarían +$1,000 = un solo día verde a RR 1:2.</text>
      <text x="20" y="182" font-size="12" fill="var(--dim)">Un trade ganador: +$1,000. Y quedas del otro lado.</text>
    </svg>
    <figcaption>El target se llena a cuentagotas. No corras: cada día verde es una barra que avanza.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>El error número uno en la evaluación no es perder, es <b>tener prisa</b>. Cuando alguien quiere pasar en dos días, sube el riesgo, hace tres trades en vez de uno, opera fuera de su plan… y truena. La evaluación no premia al rápido, premia al que <b>no se rompe</b>. Puedes tardar 6 días o 20 días: no hay reloj en tu contra si respetas el drawdown.</p>
  </div>

  <section class="lec-sec">
    <h2>El drawdown va contigo desde el día 1</h2>
    <p>Mientras subes al target, abajo hay una línea roja que no puedes tocar: el <b>drawdown</b> (el límite de pérdida). En la evaluación tienes las dos cosas al mismo tiempo: una línea verde arriba que quieres tocar y una roja abajo que debes evitar. Ganar la evaluación es simplemente <b>tocar la verde antes que la roja</b>. En la lección 11c vemos a fondo cómo funciona esa línea roja.</p>
  </section>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>Cuenta de 50k. Andrés opera 1 trade al día, arriesga $500, busca +$1,000.<br>
    · Día 1: gana → 51,000<br>
    · Día 2: pierde → 50,500<br>
    · Día 3: gana → 51,500<br>
    · Día 4: gana → 52,500<br>
    · Día 5: pierde → 52,000<br>
    · Día 6: gana → <b>53,000 ✓ evaluación superada</b><br>
    Seis días, cuatro verdes y dos rojos. Nunca arriesgó de más, nunca se acercó al drawdown. Así se ve pasar bien.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>La <b>evaluación</b> es el primer escalón: un examen para probar que sabes operar.</li>
      <li>Objetivo único: subir la cuenta de <b>50,000 a 53,000</b> (+$3,000).</li>
      <li>Es la <b>suma</b> de tus días, no un trade heroico. Un trade al día, 1% de riesgo, RR 1:2.</li>
      <li>Ganar = <b>tocar la línea verde arriba antes que la roja abajo</b>.</li>
      <li>El enemigo real no es perder: es la <b>prisa</b>. No hay reloj si respetas el drawdown.</li>
    </ul>
  </div>
</div>`,

/* ─────────────────────────────────────────────────────────────────────────
   l11b · Las 3 fases — Buffer: el colchón antes de cobrar
   ───────────────────────────────────────────────────────────────────────── */
'l11b': `
<div class="lec">
  <h1 class="lec-h1">Buffer: el colchón antes de cobrar</h1>
  <p class="lec-lede">Pasaste la evaluación. Felicidades: ya operas con el dinero de la fondeadora. Pero todavía no puedes cobrar. Falta el segundo escalón, el más incomprendido de todos: construir un <b>buffer</b>, un <b>colchón de +$2,500</b> que te separa del drawdown y te da permiso de retirar sin morir en el intento.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>El buffer es tu <b>ahorro de emergencia</b>. Nadie inteligente gasta hasta el último peso de su quincena: dejas un colchón por si el coche se descompone. En trading es idéntico. Si cobras absolutamente todo lo que ganas, cualquier día malo te empuja contra el límite y pierdes la cuenta. El colchón es el aire entre tú y el precipicio.</p>
  </div>

  <section class="lec-sec">
    <h2>¿Por qué no puedo cobrar de una vez?</h2>
    <p>Porque el <b>drawdown se arrastra</b> hacia arriba pegado a tus ganancias (lo verás en la 11c). Justo después de pasar la evaluación, ese límite quedó muy cerca de tu balance. Si sacaras dinero en ese momento, bajarías el balance… y quedarías pegadito a la línea roja. Un solo día rojo y adiós cuenta. El buffer es lo que pones <b>entre</b> tú y esa línea para poder retirar con red de seguridad.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 300" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
      <!-- diagrama del colchón: balance arriba, drawdown abajo, distancia = buffer -->
      <!-- suelo drawdown -->
      <line x1="60" y1="240" x2="580" y2="240" stroke="var(--down)" stroke-width="2.5"/>
      <text x="60" y="262" font-size="12" fill="var(--down)">LÍNEA DE DRAWDOWN — si la tocas, pierdes la cuenta</text>
      <!-- balance -->
      <line x1="60" y1="90" x2="580" y2="90" stroke="var(--up)" stroke-width="2.5"/>
      <text x="60" y="80" font-size="12" fill="var(--up)">TU BALANCE — 52,500</text>
      <!-- colchón (bloque acolchado entre ambas) -->
      <rect x="220" y="95" width="200" height="140" rx="10" fill="var(--up)" opacity="0.12"/>
      <rect x="220" y="95" width="200" height="140" rx="10" fill="none" stroke="var(--up)" stroke-width="1.5" stroke-dasharray="5 5"/>
      <text x="320" y="158" text-anchor="middle" font-size="15" fill="var(--up)">EL COLCHÓN</text>
      <text x="320" y="180" text-anchor="middle" font-size="13" fill="currentColor">+$2,500</text>
      <text x="320" y="200" text-anchor="middle" font-size="11" fill="var(--dim)">este aire te protege</text>
      <!-- flecha de medida -->
      <line x1="150" y1="90" x2="150" y2="240" stroke="currentColor" stroke-width="1.2" marker-start="url(#b11b)" marker-end="url(#b11b)"/>
      <text x="130" y="168" font-size="11" fill="currentColor" transform="rotate(-90 130 168)">distancia = seguridad</text>
      <defs><marker id="b11b" markerWidth="9" markerHeight="9" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>
    </svg>
    <figcaption>El buffer es el espacio entre tu balance y la línea de quiebre. Entre más grueso el colchón, más tranquilo operas y cobras.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>El número del buffer: +$2,500</h2>
    <p>En NorthPoint el colchón objetivo es <b>+$2,500</b>: llevar la cuenta de 50,000 a <b>52,500</b> ya con dinero real de la fondeadora, y no tocarlo. Ese medio millar por debajo de los 3,000 que ya ganaste en la evaluación es tu almohada. Con el colchón puesto, cuando empieces a cobrar, un día rojo te baja del colchón… pero no te tira contra la línea roja.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 320" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
      <!-- curva subiendo a 52,500 construyendo buffer -->
      <line x1="70" y1="40" x2="70" y2="270" stroke="var(--line)" stroke-width="1"/>
      <line x1="70" y1="270" x2="590" y2="270" stroke="var(--line)" stroke-width="1"/>
      <!-- meta buffer -->
      <line x1="70" y1="80" x2="590" y2="80" stroke="var(--up)" stroke-width="1.5" stroke-dasharray="6 5"/>
      <text x="78" y="74" font-size="12" fill="var(--up)">COLCHÓN LISTO · 52,500  (+$2,500)</text>
      <!-- arranque post-eval -->
      <line x1="70" y1="200" x2="590" y2="200" stroke="var(--dim)" stroke-width="1" stroke-dasharray="3 4"/>
      <text x="78" y="194" font-size="11" fill="var(--dim)">arrancas fondeado · 50,000</text>
      <!-- dd -->
      <line x1="70" y1="248" x2="590" y2="248" stroke="var(--down)" stroke-width="1.5" stroke-dasharray="4 4"/>
      <text x="78" y="264" font-size="11" fill="var(--down)">drawdown</text>
      <!-- curva -->
      <polyline points="70,200 140,200 140,175 220,175 220,188 300,188 300,150 380,150 380,130 460,130 460,145 520,145 520,80 570,80"
        fill="none" stroke="var(--up)" stroke-width="2.5"/>
      <circle cx="520" cy="80" r="4.5" fill="var(--up)"/>
      <text x="470" y="66" font-size="12" fill="var(--up)">colchón completo</text>
      <text x="330" y="292" text-anchor="middle" font-size="11" fill="var(--dim)">días fondeado →</text>
    </svg>
    <figcaption>Después de la evaluación sigues operando igual, pero ahora subes con calma hasta armar el colchón de +$2,500. Recién ahí empieza lo bueno.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>Sin colchón vs con colchón</h2>
    <p>La diferencia se ve clarísima cuando llega un día malo. Sin colchón, tu balance está pegado al drawdown: un trade perdido y estás rozando el borde. Con colchón, ese mismo trade perdido apenas te quita un poco de la almohada. Sigues arriba, sigues vivo, sigues cobrando mañana.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 300" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
      <!-- comparación dos cuentas -->
      <!-- izquierda: sin colchón -->
      <text x="150" y="30" text-anchor="middle" font-size="13" fill="var(--down)">SIN COLCHÓN</text>
      <line x1="40" y1="230" x2="260" y2="230" stroke="var(--down)" stroke-width="2"/>
      <text x="40" y="248" font-size="10" fill="var(--down)">drawdown</text>
      <line x1="40" y1="90" x2="260" y2="90" stroke="var(--up)" stroke-width="1" stroke-dasharray="3 3"/>
      <!-- balance pegado -->
      <line x1="40" y1="215" x2="150" y2="215" stroke="var(--up)" stroke-width="2.5"/>
      <!-- día malo -->
      <path d="M150 215 L200 228" stroke="var(--down)" stroke-width="2.5" fill="none"/>
      <circle cx="200" cy="228" r="4" fill="var(--down)"/>
      <text x="150" y="272" text-anchor="middle" font-size="10" fill="var(--down)">un día rojo = tocas el fondo</text>
      <!-- divisor -->
      <line x1="310" y1="30" x2="310" y2="270" stroke="var(--line)" stroke-width="1"/>
      <!-- derecha: con colchón -->
      <text x="470" y="30" text-anchor="middle" font-size="13" fill="var(--up)">CON COLCHÓN</text>
      <line x1="360" y1="230" x2="580" y2="230" stroke="var(--down)" stroke-width="2"/>
      <text x="360" y="248" font-size="10" fill="var(--down)">drawdown</text>
      <!-- colchón sombreado -->
      <rect x="360" y="120" width="220" height="90" fill="var(--up)" opacity="0.12"/>
      <text x="470" y="170" text-anchor="middle" font-size="10" fill="var(--up)">+$2,500 de aire</text>
      <!-- balance alto -->
      <line x1="360" y1="115" x2="470" y2="115" stroke="var(--up)" stroke-width="2.5"/>
      <!-- día malo -->
      <path d="M470 115 L520 130" stroke="var(--down)" stroke-width="2.5" fill="none"/>
      <circle cx="520" cy="130" r="4" fill="var(--up)"/>
      <text x="470" y="272" text-anchor="middle" font-size="10" fill="var(--up)">un día rojo = sigues muy arriba</text>
    </svg>
    <figcaption>El mismo día malo, dos finales distintos. El colchón no evita las pérdidas: evita que una pérdida normal te cueste la cuenta.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>La tentación de cobrar apenas te fondean es enorme. Aguanta. El buffer se construye <b>una sola vez</b> y después te da de comer por meses. Cobrar antes de tener colchón es como sacar dinero del cajero justo cuando la cuenta va a rebotar un cheque: técnicamente puedes, pero te vas a arrepentir.</p>
  </div>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>Cuenta de 50k, ya fondeada. Andrés se propone armar el colchón antes de tocar un solo peso.<br>
    · Semana fondeado: +$1,000, −$500, +$1,000, +$1,000 = <b>+$2,500</b> → balance 52,500.<br>
    Colchón listo. Ahora, si mañana pierde su trade (−$500), baja a 52,000: <b>sigue $2,000 por encima de donde arrancó</b> y lejísimos del drawdown. Recién aquí Andrés puede empezar a cobrar todos los días sin miedo. Ese es el propósito del buffer.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>El <b>buffer</b> es el segundo escalón: el colchón que armas <b>antes de cobrar</b>.</li>
      <li>Objetivo: llevar la cuenta a <b>52,500</b> (+$2,500) con dinero de la fondeadora y no tocarlo.</li>
      <li>Sirve para separarte del <b>drawdown</b>, que quedó pegado a ti tras la evaluación.</li>
      <li>Con colchón, un día rojo normal te resta almohada, no la vida.</li>
      <li>Se construye <b>una vez</b> y te protege durante meses. No cobres antes de tenerlo.</li>
    </ul>
  </div>
</div>`,

/* ─────────────────────────────────────────────────────────────────────────
   l11c · Las 3 fases — Reglas: drawdown y consistencia
   ───────────────────────────────────────────────────────────────────────── */
'l11c': `
<div class="lec">
  <h1 class="lec-h1">Reglas: drawdown y consistencia</h1>
  <p class="lec-lede">Las fondeadoras no regalan dinero: te prestan su capital a cambio de que juegues con sus reglas. Las dos que más cuentas matan son el <b>trailing drawdown</b> (un límite de pérdida que se arrastra hacia arriba) y la <b>regla de consistencia</b> (que ningún día te salga demasiado grande). Entenderlas es la diferencia entre cobrar y perderlo todo por un tecnicismo.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>El drawdown es un <b>piso que sube contigo</b>. Imagina que subes una escalera con una plataforma pegada a tus pies: cada vez que subes un escalón, la plataforma sube también y se queda ahí, aunque tú bajes. Si algún día resbalas y caes hasta esa plataforma… se acabó. Lo bueno: entre más alto subes, más lejos dejas atrás el suelo original.</p>
  </div>

  <section class="lec-sec">
    <h2>Regla 1 — El trailing drawdown</h2>
    <p>El drawdown es tu <b>máxima pérdida permitida</b>. Lo importante es que en muchas cuentas <b>no es fijo</b>: se arrastra. Empieza, digamos, $2,000 por debajo de tu balance inicial. Pero cada vez que tu cuenta hace un nuevo máximo, la línea del drawdown <b>sube y se queda</b> a esa misma distancia por debajo del pico. Sube cuando ganas, pero <b>no baja</b> cuando pierdes.</p>
    <p>Por eso el colchón de la lección pasada es tan valioso: cada dólar que subes empuja esa línea roja hacia arriba, hasta que la rebasa tu punto de partida y ya nunca puedes "perder los 50k" originales. A partir de cierto punto operas con red de verdad.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 320" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
      <!-- trailing drawdown que se arrastra con el pico -->
      <line x1="70" y1="30" x2="70" y2="270" stroke="var(--line)" stroke-width="1"/>
      <line x1="70" y1="270" x2="590" y2="270" stroke="var(--line)" stroke-width="1"/>
      <!-- equity -->
      <polyline points="70,210 150,210 150,170 240,170 240,190 330,190 330,120 420,120 420,150 500,150 500,110 580,110"
        fill="none" stroke="var(--up)" stroke-width="2.5"/>
      <text x="470" y="102" font-size="11" fill="var(--up)">tu balance</text>
      <!-- trailing dd: escalonado que sólo sube -->
      <polyline points="70,270 150,270 150,230 240,230 240,230 330,230 330,180 420,180 420,180 500,180 500,170 580,170"
        fill="none" stroke="var(--down)" stroke-width="2.5" stroke-dasharray="6 4"/>
      <text x="360" y="200" font-size="11" fill="var(--down)">drawdown (se arrastra, nunca baja)</text>
      <!-- flechas mostrando que sube con el pico -->
      <circle cx="330" cy="120" r="4" fill="var(--up)"/>
      <text x="300" y="112" font-size="10" fill="var(--up)">nuevo pico</text>
      <path d="M330 128 L330 172" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" marker-end="url(#c11c)"/>
      <text x="336" y="150" font-size="9" fill="currentColor">jala el dd arriba</text>
      <defs><marker id="c11c" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L7 4 L0 8 z" fill="currentColor"/></marker></defs>
    </svg>
    <figcaption>La línea roja persigue a tu balance hacia arriba y se queda clavada en cada nuevo máximo. Ganar sube tu piso de seguridad; perder no lo baja.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>El trailing drawdown suele medirse contra el <b>pico más alto que tocó tu cuenta</b>, no contra el balance con el que cerraste. ¿Qué significa? Que si en la mañana ibas +$1,500 arriba y luego devolviste todo, el drawdown ya subió como si hubieras conservado esa ganancia. Moraleja NorthPoint: <b>cierra tus trades ganadores y no le devuelvas el dinero al mercado</b>. Ganaste, cierra la gráfica.</p>
  </div>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 240" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
      <!-- pico intradía vs cierre: por qué cerrar ganadores -->
      <line x1="70" y1="30" x2="70" y2="190" stroke="var(--line)" stroke-width="1"/>
      <line x1="70" y1="190" x2="590" y2="190" stroke="var(--line)" stroke-width="1"/>
      <!-- recorrido del día: sube a un pico y devuelve -->
      <polyline points="70,160 150,160 220,90 300,120 380,150 460,150" fill="none" stroke="var(--up)" stroke-width="2.5"/>
      <!-- pico -->
      <circle cx="220" cy="90" r="4.5" fill="var(--up)"/>
      <text x="150" y="80" font-size="11" fill="var(--up)">pico intradía +$1,500</text>
      <!-- línea punteada del pico -->
      <line x1="220" y1="90" x2="590" y2="90" stroke="var(--up)" stroke-width="1" stroke-dasharray="3 4"/>
      <!-- cierre -->
      <circle cx="460" cy="150" r="4.5" fill="var(--dim)"/>
      <text x="470" y="155" font-size="11" fill="var(--dim)">cerraste en +$0</text>
      <!-- dd que subió con el pico -->
      <line x1="70" y1="120" x2="590" y2="120" stroke="var(--down)" stroke-width="1.8" stroke-dasharray="5 4"/>
      <text x="300" y="138" font-size="10" fill="var(--down)">el drawdown ya subió por el pico… aunque devolviste todo</text>
      <text x="330" y="215" text-anchor="middle" font-size="11" fill="var(--dim)">horas del día →</text>
    </svg>
    <figcaption>Devolver una ganancia es el peor error: el drawdown se quedó arriba por el pico, pero tú cerraste sin nada. Cierra el ganador y protege la distancia que te costó ganar.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>Regla 2 — La consistencia</h2>
    <p>La segunda regla parece rara al principio: te piden que <b>ningún día concentre demasiado</b> de tu ganancia total. Un tope típico es que tu mejor día no valga más del <b>30% al 40%</b> de todo lo que ganaste. ¿Por qué? Porque quieren traders <b>estables</b>, no un boleto de lotería que pegó una vez. Un solo día gigante huele a suerte o a riesgo brutal, y eso no lo quieren financiar.</p>
    <p>La consecuencia práctica es linda: te <b>obliga</b> a hacer justo lo que el método ya pide. Un trade al día, riesgo parejo, ganancias parecidas. Si operas ordenado, la regla de consistencia ni la sientes. Solo estorba a los que apuestan en grande buscando el día milagroso.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 300" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
      <!-- barras de días: uno demasiado alto en rojo -->
      <line x1="60" y1="240" x2="590" y2="240" stroke="var(--line)" stroke-width="1"/>
      <!-- barras consistentes -->
      <rect x="80"  y="180" width="46" height="60"  fill="var(--up)" opacity="0.3" stroke="var(--up)" stroke-width="1.5"/>
      <rect x="150" y="165" width="46" height="75"  fill="var(--up)" opacity="0.3" stroke="var(--up)" stroke-width="1.5"/>
      <rect x="220" y="185" width="46" height="55"  fill="var(--up)" opacity="0.3" stroke="var(--up)" stroke-width="1.5"/>
      <rect x="290" y="170" width="46" height="70"  fill="var(--up)" opacity="0.3" stroke="var(--up)" stroke-width="1.5"/>
      <!-- barra gigante roja -->
      <rect x="360" y="60"  width="46" height="180" fill="var(--down)" opacity="0.25" stroke="var(--down)" stroke-width="2"/>
      <text x="383" y="50" text-anchor="middle" font-size="10" fill="var(--down)">¡día gigante!</text>
      <text x="383" y="130" text-anchor="middle" font-size="9" fill="var(--down)" transform="rotate(-90 383 130)">rompe consistencia</text>
      <rect x="430" y="178" width="46" height="62"  fill="var(--up)" opacity="0.3" stroke="var(--up)" stroke-width="1.5"/>
      <rect x="500" y="168" width="46" height="72"  fill="var(--up)" opacity="0.3" stroke="var(--up)" stroke-width="1.5"/>
      <!-- línea del tope 40% -->
      <line x1="60" y1="120" x2="590" y2="120" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/>
      <text x="64" y="114" font-size="11" fill="currentColor">tope permitido por día (~40% del total)</text>
      <text x="325" y="270" text-anchor="middle" font-size="11" fill="var(--dim)">tus días de ganancia →</text>
    </svg>
    <figcaption>Días parejos = trader estable = pagan sin problema. Un día que se dispara por encima del tope activa la regla de consistencia y frena tu retiro.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>Otras reglas menores que conviene conocer</h2>
    <p>Además de esas dos, casi todos los contratos traen: un <b>daily loss</b> (pérdida máxima en un solo día, que con 1% de riesgo y un trade al día jamás te va a rozar), la obligación de operar un <b>mínimo de días</b> antes de cobrar, y prohibiciones de estilo (nada de noticias de alto impacto, nada de dejar posiciones abiertas de un día a otro si el contrato lo prohíbe). Ninguna te estorba si sigues el método al pie de la letra.</p>
  </section>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>Cuenta de 50k con trailing drawdown de $2,000.<br>
    · Arranca: balance 50,000, drawdown en <b>48,000</b>.<br>
    · Sube a 52,000 (pico nuevo): el drawdown se arrastra a <b>50,000</b>. ¡Ya no puedes perder tu capital inicial!<br>
    · Sube a 53,500 (pico): drawdown ahora en <b>51,500</b>.<br>
    · Tiene un día rojo, baja a 53,000: el drawdown <b>se queda</b> en 51,500 (no baja).<br>
    Entre más subes, más lejos dejas la línea roja. Ese es el premio de operar con paciencia y construir colchón.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>El <b>trailing drawdown</b> es tu límite de pérdida: sube pegado a tus máximos y <b>nunca baja</b>.</li>
      <li>Suele medirse contra tu <b>pico</b>, así que cierra ganadores y no devuelvas el dinero.</li>
      <li>La <b>regla de consistencia</b> pide que ningún día valga demasiado (~30–40% del total).</li>
      <li>Ambas reglas premian exactamente lo que el método ya hace: riesgo parejo, un trade al día.</li>
      <li>Con 1% de riesgo y disciplina, el daily loss y las demás reglas ni las sientes.</li>
    </ul>
  </div>
</div>`,

/* ─────────────────────────────────────────────────────────────────────────
   l12a · De cero a payout — Daily payouts y cómo se cobra
   ───────────────────────────────────────────────────────────────────────── */
'l12a': `
<div class="lec">
  <h1 class="lec-h1">Daily payouts y cómo se cobra</h1>
  <p class="lec-lede">Este es el escalón que todos quieren: el momento en que el trading deja de ser un examen y empieza a <b>pagar</b>. Con el colchón puesto, ya puedes pedir <b>payouts diarios</b> de entre <b>$250 y $1,000</b>. Aquí ves cómo funciona el cobro por dentro: el flujo, los mínimos, el reparto y el ritmo sano para que la cuenta te dure años, no semanas.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Tu cuenta fondeada es un <b>árbol de fruta</b>. La evaluación fue plantarlo, el buffer fue esperar a que echara raíces. El payout es cosechar. Y la regla del buen agricultor: <b>cortas la fruta madura, no cortas el árbol</b>. Retiras tus ganancias del día, pero dejas intacto el colchón que hace que mañana vuelva a dar fruto.</p>
  </div>

  <section class="lec-sec">
    <h2>Qué es un payout diario</h2>
    <p>Un payout es simplemente un <b>retiro</b> de tus ganancias. "Diario" quiere decir que, una vez que cumpliste requisitos (colchón armado, mínimo de días operados), puedes solicitarlo con mucha frecuencia en lugar de esperar al fin de mes. En NorthPoint el rango sano por día va de <b>+$250 a +$1,000</b>: sacas lo que ganaste ese día por encima del colchón, y el colchón se queda quieto haciendo su trabajo.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 250" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
      <!-- flujo del payout en pasos -->
      <!-- paso 1 -->
      <rect x="20" y="90" width="120" height="70" rx="8" fill="none" stroke="var(--up)" stroke-width="2"/>
      <text x="80" y="118" text-anchor="middle" font-size="12" fill="var(--up)">1 · GANAS</text>
      <text x="80" y="138" text-anchor="middle" font-size="10" fill="currentColor">el día verde</text>
      <!-- paso 2 -->
      <rect x="175" y="90" width="120" height="70" rx="8" fill="none" stroke="currentColor" stroke-width="1.8"/>
      <text x="235" y="112" text-anchor="middle" font-size="12" fill="currentColor">2 · PIDES</text>
      <text x="235" y="130" text-anchor="middle" font-size="10" fill="currentColor">el retiro en</text>
      <text x="235" y="145" text-anchor="middle" font-size="10" fill="currentColor">el panel</text>
      <!-- paso 3 -->
      <rect x="330" y="90" width="120" height="70" rx="8" fill="none" stroke="currentColor" stroke-width="1.8"/>
      <text x="390" y="112" text-anchor="middle" font-size="12" fill="currentColor">3 · REVISAN</text>
      <text x="390" y="130" text-anchor="middle" font-size="10" fill="currentColor">que cumples</text>
      <text x="390" y="145" text-anchor="middle" font-size="10" fill="currentColor">las reglas</text>
      <!-- paso 4 -->
      <rect x="485" y="90" width="120" height="70" rx="8" fill="none" stroke="var(--up)" stroke-width="2.2"/>
      <text x="545" y="118" text-anchor="middle" font-size="12" fill="var(--up)">4 · TE PAGAN</text>
      <text x="545" y="138" text-anchor="middle" font-size="10" fill="var(--up)">a tu banco</text>
      <!-- flechas -->
      <path d="M140 125 L173 125" stroke="currentColor" stroke-width="1.5" marker-end="url(#f12a)"/>
      <path d="M295 125 L328 125" stroke="currentColor" stroke-width="1.5" marker-end="url(#f12a)"/>
      <path d="M450 125 L483 125" stroke="currentColor" stroke-width="1.5" marker-end="url(#f12a)"/>
      <defs><marker id="f12a" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>
      <text x="312" y="40" text-anchor="middle" font-size="13" fill="currentColor">El camino de un payout</text>
    </svg>
    <figcaption>Ganas, pides, revisan, pagan. Es un trámite, no una pelea: si respetaste las reglas, el dinero cae solo.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>El reparto: tú te quedas con casi todo</h2>
    <p>Las fondeadoras trabajan a <b>profit split</b>: del dinero que ganas, una parte es tuya y una parte es de ellas por prestarte el capital. El reparto típico es muy a tu favor, del orden de <b>90% para ti</b>. Es decir, de cada $1,000 que ganas y retiras, cerca de <b>$900 son tuyos</b>. Es un trato justo: ellos ponen el capital y aguantan el riesgo; tú pones la habilidad.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 200" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
      <!-- barra de reparto 90/10 -->
      <text x="20" y="30" font-size="13" fill="currentColor">De cada $1,000 ganados y retirados:</text>
      <rect x="20" y="55" width="540" height="55" rx="8" fill="none" stroke="var(--line)" stroke-width="1.5"/>
      <!-- 90% -->
      <rect x="22" y="57" width="482" height="51" rx="6" fill="var(--up)" opacity="0.25"/>
      <text x="263" y="88" text-anchor="middle" font-size="14" fill="var(--up)">TÚ · $900 (90%)</text>
      <!-- 10% -->
      <rect x="506" y="57" width="52" height="51" fill="var(--dim)" opacity="0.35"/>
      <text x="532" y="128" text-anchor="middle" font-size="10" fill="var(--dim)">firma 10%</text>
      <text x="20" y="165" font-size="12" fill="var(--dim)">Ellos ponen el capital y el riesgo; tú pones la ejecución.</text>
    </svg>
    <figcaption>El profit split típico es 90/10 a tu favor. Cobrar no te cuesta capital: solo compartes una rebanada de la ganancia.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>La regla de oro del cobro: nunca toques el colchón</h2>
    <p>Aquí está el secreto de que una cuenta dure. Tu balance de trabajo es 52,500 (los 50,000 + el colchón de 2,500). Todo lo que ganes <b>por encima</b> de eso es cosechable. Pero el colchón se queda. Si un día ganas +$800, retiras hasta ese +$800 y vuelves a 52,500. Si pierdes, no retiras nada ese día y lo recuperas mañana. El colchón es sagrado: es lo que te mantiene lejos del drawdown para siempre.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 250" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
      <!-- diente de sierra: cada cobro regresa el balance al colchón -->
      <line x1="70" y1="30" x2="70" y2="200" stroke="var(--line)" stroke-width="1"/>
      <line x1="70" y1="200" x2="595" y2="200" stroke="var(--line)" stroke-width="1"/>
      <!-- línea colchón -->
      <line x1="70" y1="150" x2="595" y2="150" stroke="var(--up)" stroke-width="1.5" stroke-dasharray="6 5"/>
      <text x="76" y="145" font-size="10" fill="var(--up)">colchón · 52,500 (nunca lo tocas)</text>
      <!-- drawdown lejos abajo -->
      <line x1="70" y1="190" x2="595" y2="190" stroke="var(--down)" stroke-width="1.2" stroke-dasharray="4 4"/>
      <text x="76" y="185" font-size="9" fill="var(--down)">drawdown, lejísimos</text>
      <!-- sierra: sube con el trade, baja de golpe con el cobro -->
      <polyline points="70,150 120,95 120,150 200,95 200,150 280,110 280,150 360,90 360,150 440,100 440,150 520,95 520,150 570,120"
        fill="none" stroke="var(--up)" stroke-width="2.3"/>
      <!-- flechas de cobro -->
      <path d="M120 100 L120 145" stroke="var(--dim)" stroke-width="1" marker-end="url(#i12a)"/>
      <path d="M200 100 L200 145" stroke="var(--dim)" stroke-width="1" marker-end="url(#i12a)"/>
      <path d="M360 95 L360 145" stroke="var(--dim)" stroke-width="1" marker-end="url(#i12a)"/>
      <text x="300" y="55" text-anchor="middle" font-size="11" fill="currentColor">↑ ganas el día  ·  ↓ cobras y vuelves al colchón</text>
      <text x="330" y="225" text-anchor="middle" font-size="11" fill="var(--dim)">días de cobro →</text>
      <defs><marker id="i12a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L7 4 L0 8 z" fill="var(--dim)"/></marker></defs>
    </svg>
    <figcaption>El ritmo del trader que cobra: cada día verde levanta el balance, cada cobro lo devuelve al colchón. Una sierra tranquila que nunca baja de 52,500.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>El rango de <b>$250 a $1,000</b> no es un capricho, es higiene financiera. Retirar de a poco todos los días crea un <b>ingreso constante</b> y mantiene tu colchón sano. La tentación de "sacar todo lo que pueda hoy" es la misma que vació mil cuentas. Cosecha la fruta madura, no el árbol.</p>
  </div>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>Cuenta de 50k con colchón ya armado (balance 52,500). Andrés cobra por días:<br>
    · Lunes: gana +$1,000 → retira <b>$1,000</b> (recibe ~$900 netos) → vuelve a 52,500.<br>
    · Martes: pierde −$500 → no retira, balance 52,000, mañana lo recompone.<br>
    · Miércoles: gana +$1,000 → sube a 53,000, retira <b>$500</b>, deja 500 para recomponer el colchón.<br>
    · Jueves: gana +$700 → retira <b>$700</b> → vuelve a 52,500.<br>
    · Viernes: gana +$1,000 → retira <b>$1,000</b>.<br>
    Semana: retiró <b>$3,200</b> brutos (~$2,880 netos) y su colchón quedó intacto en 52,500. Listo para repetir el lunes.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>Un <b>payout diario</b> es un retiro frecuente de tus ganancias, de <b>+$250 a +$1,000</b>.</li>
      <li>El flujo es simple: <b>ganas → pides → revisan → te pagan</b>. Si cumples reglas, cae solo.</li>
      <li>El <b>profit split</b> típico es <b>90% para ti</b>: de $1,000, unos $900 son tuyos.</li>
      <li>Regla de oro: <b>nunca toques el colchón</b>. Retira solo lo que ganes por encima de 52,500.</li>
      <li>Cobrar de a poco y seguido = ingreso estable + cuenta que dura años.</li>
    </ul>
  </div>
</div>`,

/* ─────────────────────────────────────────────────────────────────────────
   l12b · De cero a payout — Escalar cuentas con profits
   ───────────────────────────────────────────────────────────────────────── */
'l12b': `
<div class="lec">
  <h1 class="lec-h1">Escalar cuentas con profits</h1>
  <p class="lec-lede">Ya sabes ganar con <b>una</b> cuenta. La pregunta natural es: ¿y si tuviera varias? Aquí está la palanca que convierte un buen ingreso en un ingreso grande sin arriesgar más de ti mismo. Se llama <b>escalar</b>: usar las ganancias para financiar más cuentas y operar todas <b>con el mismo trade</b>, al mismo tiempo, gracias a la copiadora.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Una cuenta fondeada es como <b>un local que ya funciona</b>. Cuando un negocio prospera, el dueño no trabaja el doble de horas: abre una <b>segunda sucursal</b> con las ganancias de la primera, y luego una tercera. Tú haces lo mismo, pero es más fácil todavía: tus "sucursales" ejecutan solas el mismo trade que tú ya ibas a hacer. El esfuerzo es el mismo; el resultado, multiplicado.</p>
  </div>

  <section class="lec-sec">
    <h2>La idea: tu trabajo no cambia, tu resultado sí</h2>
    <p>El método NorthPoint es <b>un trade al día</b>. Ese trade lo piensas una sola vez, tengas 1 cuenta o 10. La copiadora toma tu entrada, tu stop y tu target, y los <b>replica</b> en todas tus cuentas al instante. Si el trade sale bien, no ganaste en una cuenta: ganaste en todas. Tu tiempo frente a la pantalla es idéntico; lo que crece es cuántas cuentas cosechan ese mismo acierto.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 260" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
      <!-- copiadora: un trade a N cuentas -->
      <!-- fuente -->
      <rect x="240" y="20" width="140" height="55" rx="8" fill="none" stroke="var(--up)" stroke-width="2.2"/>
      <text x="310" y="43" text-anchor="middle" font-size="12" fill="var(--up)">TU 1 TRADE</text>
      <text x="310" y="62" text-anchor="middle" font-size="10" fill="currentColor">entry · stop · target</text>
      <!-- copiadora -->
      <rect x="255" y="105" width="110" height="34" rx="17" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <text x="310" y="127" text-anchor="middle" font-size="11" fill="currentColor">COPIADORA</text>
      <path d="M310 75 L310 104" stroke="currentColor" stroke-width="1.5" marker-end="url(#g12b)"/>
      <!-- cuentas -->
      <g>
        <rect x="40"  y="180" width="90" height="50" rx="6" fill="none" stroke="var(--up)" stroke-width="1.5"/>
        <text x="85"  y="205" text-anchor="middle" font-size="10" fill="var(--up)">Cuenta 1</text>
        <text x="85"  y="220" text-anchor="middle" font-size="9" fill="currentColor">50k</text>
        <rect x="160" y="180" width="90" height="50" rx="6" fill="none" stroke="var(--up)" stroke-width="1.5"/>
        <text x="205" y="205" text-anchor="middle" font-size="10" fill="var(--up)">Cuenta 2</text>
        <text x="205" y="220" text-anchor="middle" font-size="9" fill="currentColor">50k</text>
        <rect x="280" y="180" width="90" height="50" rx="6" fill="none" stroke="var(--up)" stroke-width="1.5"/>
        <text x="325" y="205" text-anchor="middle" font-size="10" fill="var(--up)">Cuenta 3</text>
        <text x="325" y="220" text-anchor="middle" font-size="9" fill="currentColor">50k</text>
        <rect x="400" y="180" width="90" height="50" rx="6" fill="none" stroke="var(--up)" stroke-width="1.5"/>
        <text x="445" y="205" text-anchor="middle" font-size="10" fill="var(--up)">Cuenta 4</text>
        <text x="445" y="220" text-anchor="middle" font-size="9" fill="currentColor">50k</text>
        <rect x="520" y="180" width="90" height="50" rx="6" fill="none" stroke="var(--dim)" stroke-width="1.5" stroke-dasharray="4 3"/>
        <text x="565" y="205" text-anchor="middle" font-size="10" fill="var(--dim)">…más</text>
      </g>
      <!-- ramas -->
      <path d="M290 139 L85 178"  stroke="currentColor" stroke-width="1.2" marker-end="url(#g12b)"/>
      <path d="M300 139 L205 178" stroke="currentColor" stroke-width="1.2" marker-end="url(#g12b)"/>
      <path d="M320 139 L325 178" stroke="currentColor" stroke-width="1.2" marker-end="url(#g12b)"/>
      <path d="M330 139 L445 178" stroke="currentColor" stroke-width="1.2" marker-end="url(#g12b)"/>
      <path d="M340 139 L560 178" stroke="var(--dim)" stroke-width="1.2" stroke-dasharray="3 3" marker-end="url(#g12b)"/>
      <defs><marker id="g12b" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L7 4 L0 8 z" fill="currentColor"/></marker></defs>
    </svg>
    <figcaption>Un solo trade, replicado por la copiadora en todas tus cuentas. Piensas una vez, cosechas muchas veces.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>Cómo se multiplican las cuentas</h2>
    <p>El truco es <b>reinvertir</b>. Con lo que cobras de tu primera cuenta pagas la evaluación de una segunda. Con lo que cobran las dos, pagas dos más. Es un efecto bola de nieve: cada cuenta nueva que se fondea empieza a generar payouts que financian la siguiente tanda. No metes más de tu bolsillo: dejas que las ganancias se paguen a sí mismas el crecimiento.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 250" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
      <!-- cuentas multiplicándose 1 -> 2 -> 4 -->
      <text x="70"  y="30" text-anchor="middle" font-size="11" fill="var(--dim)">Mes 1</text>
      <text x="250" y="30" text-anchor="middle" font-size="11" fill="var(--dim)">Mes 2</text>
      <text x="470" y="30" text-anchor="middle" font-size="11" fill="var(--dim)">Mes 3</text>
      <!-- 1 -->
      <rect x="45" y="110" width="50" height="40" rx="5" fill="var(--up)" opacity="0.25" stroke="var(--up)" stroke-width="1.5"/>
      <text x="70" y="135" text-anchor="middle" font-size="10" fill="var(--up)">1</text>
      <!-- 2 -->
      <rect x="210" y="85"  width="50" height="40" rx="5" fill="var(--up)" opacity="0.25" stroke="var(--up)" stroke-width="1.5"/>
      <rect x="210" y="135" width="50" height="40" rx="5" fill="var(--up)" opacity="0.25" stroke="var(--up)" stroke-width="1.5"/>
      <!-- 4 -->
      <rect x="420" y="60"  width="50" height="38" rx="5" fill="var(--up)" opacity="0.25" stroke="var(--up)" stroke-width="1.5"/>
      <rect x="420" y="105" width="50" height="38" rx="5" fill="var(--up)" opacity="0.25" stroke="var(--up)" stroke-width="1.5"/>
      <rect x="420" y="150" width="50" height="38" rx="5" fill="var(--up)" opacity="0.25" stroke="var(--up)" stroke-width="1.5"/>
      <rect x="485" y="105" width="50" height="38" rx="5" fill="var(--up)" opacity="0.25" stroke="var(--up)" stroke-width="1.5"/>
      <!-- flechas -->
      <path d="M100 130 L205 120" stroke="currentColor" stroke-width="1.5" marker-end="url(#h12b)"/>
      <path d="M265 130 L415 120" stroke="currentColor" stroke-width="1.5" marker-end="url(#h12b)"/>
      <text x="150" y="105" text-anchor="middle" font-size="9" fill="currentColor">reinviertes</text>
      <text x="345" y="105" text-anchor="middle" font-size="9" fill="currentColor">reinviertes</text>
      <text x="70"  y="175" text-anchor="middle" font-size="11" fill="currentColor">1 cuenta</text>
      <text x="235" y="200" text-anchor="middle" font-size="11" fill="currentColor">2 cuentas</text>
      <text x="480" y="210" text-anchor="middle" font-size="11" fill="currentColor">4 cuentas</text>
      <defs><marker id="h12b" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>
    </svg>
    <figcaption>La bola de nieve: cada tanda de payouts financia la siguiente tanda de cuentas. El capital de tu bolsillo casi no crece; el número de cuentas sí.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>El ingreso, multiplicado</h2>
    <p>Si una cuenta te da, digamos, +$700 en un día verde, cuatro cuentas te dan <b>+$2,800</b> ese mismo día, por el mismo trabajo. Ese es todo el juego. Escalar no es operar más ni arriesgar más de ti: es <b>multiplicar el resultado de la misma decisión</b>. Por eso el foco nunca se mueve de la calidad del trade: un solo acierto ahora vale por todas tus cuentas juntas.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 220" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
      <!-- ingreso escalando en barras -->
      <line x1="60" y1="180" x2="590" y2="180" stroke="var(--line)" stroke-width="1"/>
      <text x="60" y="30" font-size="12" fill="currentColor">Un día verde (+$700 por cuenta), según cuántas cuentas tengas</text>
      <!-- 1 cuenta -->
      <rect x="90"  y="150" width="60" height="30"  fill="var(--up)" opacity="0.3" stroke="var(--up)" stroke-width="1.5"/>
      <text x="120" y="145" text-anchor="middle" font-size="10" fill="var(--up)">$700</text>
      <text x="120" y="197" text-anchor="middle" font-size="10" fill="var(--dim)">1 cta</text>
      <!-- 2 -->
      <rect x="220" y="120" width="60" height="60"  fill="var(--up)" opacity="0.3" stroke="var(--up)" stroke-width="1.5"/>
      <text x="250" y="115" text-anchor="middle" font-size="10" fill="var(--up)">$1,400</text>
      <text x="250" y="197" text-anchor="middle" font-size="10" fill="var(--dim)">2 ctas</text>
      <!-- 3 -->
      <rect x="350" y="90"  width="60" height="90"  fill="var(--up)" opacity="0.3" stroke="var(--up)" stroke-width="1.5"/>
      <text x="380" y="85"  text-anchor="middle" font-size="10" fill="var(--up)">$2,100</text>
      <text x="380" y="197" text-anchor="middle" font-size="10" fill="var(--dim)">3 ctas</text>
      <!-- 4 -->
      <rect x="480" y="60"  width="60" height="120" fill="var(--up)" opacity="0.3" stroke="var(--up)" stroke-width="2"/>
      <text x="510" y="55"  text-anchor="middle" font-size="10" fill="var(--up)">$2,800</text>
      <text x="510" y="197" text-anchor="middle" font-size="10" fill="var(--dim)">4 ctas</text>
    </svg>
    <figcaption>El mismo trade, el mismo día, el mismo esfuerzo. Lo único que cambia es cuántas cuentas cosechan el acierto.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>Escalar es un arma de doble filo: la copiadora también <b>replica las pérdidas</b>. Un día rojo con 4 cuentas es −$2,000, no −$500. Por eso <b>solo se escala sobre una base sólida</b>: método probado, disciplina de un trade al día y riesgo del 1% respetado al pie de la letra. Multiplicar un sistema ganador te hace rico; multiplicar la indisciplina te arruina cuatro veces más rápido. Primero domina una cuenta.</p>
  </div>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>Andrés arranca con una cuenta de 50k. En ~6 semanas la fondea y cobra sus primeros ~$3,000 en payouts.<br>
    · Con eso paga la evaluación de <b>2 cuentas más</b> (le sobra, las evaluaciones son baratas frente a lo que rinden).<br>
    · Al mes siguiente ya opera <b>3 cuentas de 50k</b> con la copiadora, un solo trade al día.<br>
    · Un día verde a +$700 por cuenta = <b>+$2,100</b> en un día, mismo trabajo que cuando tenía una.<br>
    · Reinvierte de nuevo y llega a <b>4–5 cuentas</b>. Ahí un día bueno ronda los +$3,000–$3,500.<br>
    Nunca arriesgó más del 1% por cuenta ni hizo más de un trade al día. Solo dejó que las ganancias compraran más árboles.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li><b>Escalar</b> = usar tus payouts para financiar más cuentas y operarlas con la copiadora.</li>
      <li>Un <b>solo trade</b> se replica en todas: piensas una vez, cosechas en muchas cuentas.</li>
      <li>Reinviertes ganancias (bola de nieve); casi no metes capital nuevo de tu bolsillo.</li>
      <li>El ingreso se multiplica por el número de cuentas, con el <b>mismo esfuerzo</b>.</li>
      <li>Cuidado: la copiadora también multiplica pérdidas. <b>Escala solo sobre disciplina probada.</b></li>
    </ul>
  </div>
</div>`,

/* ─────────────────────────────────────────────────────────────────────────
   l12c · De cero a payout — El plan de 30 días, ejecutado
   ───────────────────────────────────────────────────────────────────────── */
'l12c': `
<div class="lec">
  <h1 class="lec-h1">El plan de 30 días, ejecutado</h1>
  <p class="lec-lede">Hasta aquí viste las piezas por separado: evaluación, buffer, reglas, cobro, escalar. Esta última lección las junta en <b>un solo mapa de 30 días</b>. Es el camino completo de cero a payout, día por día, con números reales de una cuenta de 50k. No es teoría: es el plan que ejecutas cuando cierras esta academia y abres la plataforma.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Es una <b>obra de construcción</b>. Primero pones los cimientos (evaluación), luego levantas los muros de carga (buffer), y solo entonces la casa empieza a dar renta (payouts). Nadie renta una casa sin techo. Los 30 días son el cronograma del maestro de obra: cada semana tiene su tarea, y no se adelanta ninguna.</p>
  </div>

  <section class="lec-sec">
    <h2>El mapa completo, coloreado por fase</h2>
    <p>Un mes calendario, tres colores. Los primeros días son de <b>evaluación</b> (llegar a +$3,000). Los siguientes, de <b>buffer</b> (armar el colchón de +$2,500). El resto del mes, ya <b>cobrando</b> todos los días verdes. Fíjate cómo la mayor parte del calendario es cosecha: la parte dura es corta, la recompensa es larga.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 340" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
      <!-- calendario 30 días coloreado por fase -->
      <text x="310" y="24" text-anchor="middle" font-size="13" fill="currentColor">Calendario de 30 días</text>
      <!-- leyenda -->
      <rect x="40"  y="38" width="12" height="12" fill="var(--up)" opacity="0.22" stroke="var(--up)" stroke-width="1"/>
      <text x="58"  y="48" font-size="10" fill="currentColor">Evaluación</text>
      <rect x="160" y="38" width="12" height="12" fill="currentColor" opacity="0.14" stroke="currentColor" stroke-width="1"/>
      <text x="178" y="48" font-size="10" fill="currentColor">Buffer</text>
      <rect x="250" y="38" width="12" height="12" fill="var(--up)" opacity="0.5" stroke="var(--up)" stroke-width="1"/>
      <text x="268" y="48" font-size="10" fill="currentColor">Payouts</text>
      <rect x="360" y="38" width="12" height="12" fill="var(--down)" opacity="0.25" stroke="var(--down)" stroke-width="1"/>
      <text x="378" y="48" font-size="10" fill="currentColor">Día rojo (no cobras)</text>
    </svg>
  </figure>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 300" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
      <!-- rejilla 6 columnas x 5 filas = 30 días -->
      <!-- fila 1: días 1-6 evaluación (con un rojo) -->
      <!-- helper: cada celda 90x46 aprox -->
      <!-- días 1..6 -->
      <g font-size="10">
        <!-- Semana 1 · EVALUACIÓN -->
        <rect x="20"  y="20" width="90" height="44" rx="5" fill="var(--up)" opacity="0.22" stroke="var(--up)" stroke-width="1.2"/><text x="65"  y="40" text-anchor="middle" fill="currentColor">Día 1</text><text x="65"  y="55" text-anchor="middle" fill="var(--up)">+1000</text>
        <rect x="118" y="20" width="90" height="44" rx="5" fill="var(--down)" opacity="0.22" stroke="var(--down)" stroke-width="1.2"/><text x="163" y="40" text-anchor="middle" fill="currentColor">Día 2</text><text x="163" y="55" text-anchor="middle" fill="var(--down)">-500</text>
        <rect x="216" y="20" width="90" height="44" rx="5" fill="var(--up)" opacity="0.22" stroke="var(--up)" stroke-width="1.2"/><text x="261" y="40" text-anchor="middle" fill="currentColor">Día 3</text><text x="261" y="55" text-anchor="middle" fill="var(--up)">+1000</text>
        <rect x="314" y="20" width="90" height="44" rx="5" fill="var(--up)" opacity="0.22" stroke="var(--up)" stroke-width="1.2"/><text x="359" y="40" text-anchor="middle" fill="currentColor">Día 4</text><text x="359" y="55" text-anchor="middle" fill="var(--up)">+1000</text>
        <rect x="412" y="20" width="90" height="44" rx="5" fill="var(--down)" opacity="0.22" stroke="var(--down)" stroke-width="1.2"/><text x="457" y="40" text-anchor="middle" fill="currentColor">Día 5</text><text x="457" y="55" text-anchor="middle" fill="var(--down)">-500</text>
        <rect x="510" y="20" width="90" height="44" rx="5" fill="var(--up)" opacity="0.22" stroke="var(--up)" stroke-width="1.5"/><text x="555" y="40" text-anchor="middle" fill="currentColor">Día 6</text><text x="555" y="55" text-anchor="middle" fill="var(--up)">+1000 ✓</text>
        <!-- Semana 2 · BUFFER (días 7-12) -->
        <rect x="20"  y="72" width="90" height="44" rx="5" fill="currentColor" opacity="0.13" stroke="currentColor" stroke-width="1"/><text x="65"  y="92" text-anchor="middle" fill="currentColor">Día 7</text><text x="65"  y="107" text-anchor="middle" fill="var(--up)">+1000</text>
        <rect x="118" y="72" width="90" height="44" rx="5" fill="currentColor" opacity="0.13" stroke="currentColor" stroke-width="1"/><text x="163" y="92" text-anchor="middle" fill="currentColor">Día 8</text><text x="163" y="107" text-anchor="middle" fill="var(--down)">-500</text>
        <rect x="216" y="72" width="90" height="44" rx="5" fill="currentColor" opacity="0.13" stroke="currentColor" stroke-width="1"/><text x="261" y="92" text-anchor="middle" fill="currentColor">Día 9</text><text x="261" y="107" text-anchor="middle" fill="var(--up)">+1000</text>
        <rect x="314" y="72" width="90" height="44" rx="5" fill="currentColor" opacity="0.13" stroke="currentColor" stroke-width="1"/><text x="359" y="92" text-anchor="middle" fill="currentColor">Día 10</text><text x="359" y="107" text-anchor="middle" fill="var(--up)">+1000 ✓</text>
        <rect x="412" y="72" width="90" height="44" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--up)" stroke-width="1.2"/><text x="457" y="92" text-anchor="middle" fill="currentColor">Día 11</text><text x="457" y="107" text-anchor="middle" fill="#fff">cobra 700</text>
        <rect x="510" y="72" width="90" height="44" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--up)" stroke-width="1.2"/><text x="555" y="92" text-anchor="middle" fill="currentColor">Día 12</text><text x="555" y="107" text-anchor="middle" fill="#fff">cobra 1000</text>
        <!-- Semana 3-5 · PAYOUTS -->
        <rect x="20"  y="124" width="90" height="44" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--up)" stroke-width="1.2"/><text x="65"  y="144" text-anchor="middle" fill="currentColor">Día 13</text><text x="65"  y="159" text-anchor="middle" fill="#fff">cobra 800</text>
        <rect x="118" y="124" width="90" height="44" rx="5" fill="var(--down)" opacity="0.22" stroke="var(--down)" stroke-width="1"/><text x="163" y="144" text-anchor="middle" fill="currentColor">Día 14</text><text x="163" y="159" text-anchor="middle" fill="var(--down)">-500</text>
        <rect x="216" y="124" width="90" height="44" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--up)" stroke-width="1.2"/><text x="261" y="144" text-anchor="middle" fill="currentColor">Día 15</text><text x="261" y="159" text-anchor="middle" fill="#fff">cobra 1000</text>
        <rect x="314" y="124" width="90" height="44" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--up)" stroke-width="1.2"/><text x="359" y="144" text-anchor="middle" fill="currentColor">Día 16</text><text x="359" y="159" text-anchor="middle" fill="#fff">cobra 600</text>
        <rect x="412" y="124" width="90" height="44" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--up)" stroke-width="1.2"/><text x="457" y="144" text-anchor="middle" fill="currentColor">Día 17</text><text x="457" y="159" text-anchor="middle" fill="#fff">cobra 1000</text>
        <rect x="510" y="124" width="90" height="44" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--up)" stroke-width="1.2"/><text x="555" y="144" text-anchor="middle" fill="currentColor">Día 18</text><text x="555" y="159" text-anchor="middle" fill="#fff">cobra 900</text>
        <!-- fila 4 -->
        <rect x="20"  y="176" width="90" height="44" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--up)" stroke-width="1.2"/><text x="65"  y="196" text-anchor="middle" fill="currentColor">Día 19–24</text><text x="65"  y="211" text-anchor="middle" fill="#fff">cobra</text>
        <rect x="118" y="176" width="482" height="44" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--up)" stroke-width="1.2"/>
        <text x="359" y="203" text-anchor="middle" font-size="11" fill="#fff">semanas de cosecha · retiros de $250 a $1,000 los días verdes, colchón intacto</text>
        <!-- fila 5 -->
        <rect x="20"  y="228" width="285" height="44" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--up)" stroke-width="1.2"/>
        <text x="162" y="255" text-anchor="middle" font-size="11" fill="#fff">Día 25–30 · sigues cobrando</text>
        <rect x="314" y="228" width="286" height="44" rx="5" fill="var(--up)" opacity="0.22" stroke="var(--up)" stroke-width="1.5"/>
        <text x="457" y="249" text-anchor="middle" font-size="11" fill="var(--up)">+ reinviertes en cuenta 2</text>
        <text x="457" y="264" text-anchor="middle" font-size="10" fill="currentColor">(empieza a escalar)</text>
      </g>
    </svg>
    <figcaption>El mes completo. La parte dura (evaluación + buffer) son ~10-12 días; el resto es cosecha. Y al cierre ya reinviertes para escalar.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>Semana por semana</h2>
    <p><b>Días 1–6 · Evaluación.</b> Un trade al día, 1% de riesgo, RR 1:2. Objetivo: llegar a 53,000. En el ejemplo, cuatro verdes y dos rojos bastan. Pasas la fase.</p>
    <p><b>Días 7–10 · Buffer.</b> Ya fondeado, sigues operando igual pero sin cobrar todavía. Armas el colchón de +$2,500 hasta llevar la cuenta a 52,500. Aquí toca <b>aguantar la tentación</b> de retirar.</p>
    <p><b>Días 11–30 · Payouts.</b> Colchón puesto. Ahora cada día verde es cosecha: retiras de $250 a $1,000, nunca tocas el colchón, y los días rojos simplemente no cobras y recompones. Al final del mes, además, reinviertes para abrir tu segunda cuenta.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 320" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
      <!-- curva de equity de 30 días con hitos -->
      <line x1="70" y1="30" x2="70" y2="270" stroke="var(--line)" stroke-width="1"/>
      <line x1="70" y1="270" x2="595" y2="270" stroke="var(--line)" stroke-width="1"/>
      <!-- zonas de fase (fondos) -->
      <rect x="70"  y="30" width="120" height="240" fill="var(--up)" opacity="0.06"/>
      <rect x="190" y="30" width="90"  height="240" fill="currentColor" opacity="0.05"/>
      <rect x="280" y="30" width="315" height="240" fill="var(--up)" opacity="0.10"/>
      <text x="130" y="290" text-anchor="middle" font-size="10" fill="var(--up)">EVAL</text>
      <text x="235" y="290" text-anchor="middle" font-size="10" fill="currentColor">BUFFER</text>
      <text x="437" y="290" text-anchor="middle" font-size="10" fill="var(--up)">PAYOUTS</text>
      <!-- líneas guía -->
      <line x1="70" y1="150" x2="595" y2="150" stroke="var(--dim)" stroke-width="1" stroke-dasharray="3 4"/>
      <text x="76" y="145" font-size="9" fill="var(--dim)">50,000</text>
      <line x1="70" y1="95" x2="595" y2="95" stroke="var(--up)" stroke-width="1" stroke-dasharray="5 4"/>
      <text x="76" y="90" font-size="9" fill="var(--up)">52,500 (colchón)</text>
      <line x1="70" y1="72" x2="280" y2="72" stroke="var(--up)" stroke-width="1" stroke-dasharray="5 4"/>
      <text x="200" y="66" font-size="9" fill="var(--up)">53,000 (target eval)</text>
      <line x1="70" y1="240" x2="595" y2="240" stroke="var(--down)" stroke-width="1.2" stroke-dasharray="4 4"/>
      <text x="76" y="256" font-size="9" fill="var(--down)">drawdown (se arrastra arriba)</text>
      <!-- curva eval subiendo a 53,000 -->
      <polyline points="70,150 95,120 120,135 145,105 170,120 185,72" fill="none" stroke="var(--up)" stroke-width="2.5"/>
      <!-- buffer: baja poco y estabiliza en 52,500 -->
      <polyline points="185,72 210,95 235,110 260,95 280,95" fill="none" stroke="var(--up)" stroke-width="2.5"/>
      <!-- payouts: sierra que sube y se recorta (cobros) manteniéndose sobre 52,500 -->
      <polyline points="280,95 305,72 305,95 335,72 335,95 360,110 385,72 385,95 410,80 410,95 440,72 440,95 470,78 470,95 500,72 500,95 530,80 530,95 560,72 560,90"
        fill="none" stroke="var(--up)" stroke-width="2.2"/>
      <text x="430" y="120" font-size="9" fill="var(--up)">cada diente = un cobro (vuelve al colchón)</text>
      <circle cx="185" cy="72" r="4" fill="var(--up)"/>
      <circle cx="280" cy="95" r="4" fill="var(--up)"/>
    </svg>
    <figcaption>La equity de 30 días: sube al target, se estabiliza en el colchón, y luego dibuja una sierra (sube con el trade, baja con el cobro) siempre por encima de 52,500. El drawdown quedó abajo, lejísimos.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>Este plan de 30 días es un <b>ejemplo ordenado</b>, no una promesa. Los días verdes y rojos caerán en otro orden, unas semanas tardarás más, otras menos. Lo que <b>no</b> cambia es la secuencia de las fases ni las reglas: siempre evaluación → buffer → payouts, siempre 1% de riesgo, siempre un trade al día. El calendario baila; la disciplina no.</p>
  </div>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>Resultado del mes completo (cuenta 50k):<br>
    · <b>Días 1–6:</b> evaluación superada. Balance 53,000.<br>
    · <b>Días 7–10:</b> colchón armado. Balance de trabajo 52,500.<br>
    · <b>Días 11–24:</b> ~10 días verdes cobrados, promedio ~$750 → <b>~$7,500 brutos</b> (~$6,750 netos al 90%).<br>
    · <b>Días 25–30:</b> más cobros + se paga la evaluación de una <b>segunda cuenta</b> con las ganancias.<br>
    Cierre del mes: primer sueldo de trader fondeado en la bolsa, colchón intacto, y el motor del escalado ya encendido para el mes 2. De cero a payout, ejecutado.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>El plan de 30 días junta todo: <b>evaluación → buffer → payouts</b>, en orden, sin brincos.</li>
      <li>La parte dura (llegar al target + armar colchón) es corta: ~10–12 días. El resto es cosecha.</li>
      <li>En fase de cobro dibujas una <b>sierra</b> siempre por encima del colchón; el drawdown queda lejísimos.</li>
      <li>El calendario exacto varía; la <b>secuencia y las reglas</b> nunca cambian.</li>
      <li>Al cierre del mes, reinviertes payouts para abrir la 2ª cuenta y <b>empezar a escalar</b>.</li>
    </ul>
  </div>
</div>`,

});
