window.LECCIONES_HTML = Object.assign(window.LECCIONES_HTML || {}, {

  // ============================================================
  // L4A — ORB: Definir el rango de apertura
  // ============================================================
  'l4a': `
<div class="lec">
  <h1 class="lec-h1">ORB — Definir el rango de apertura</h1>
  <p class="lec-lede">Cada mañana, cuando el mercado abre, hay una pelea. Compradores y vendedores se empujan durante los primeros minutos y dibujan una cajita. Esa cajita se llama <b>rango de apertura</b> (Opening Range, u ORB) y es el punto de partida de todo el método NorthPoint. Aprende a dibujarla bien y ya ganaste la mitad del día.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Imagina el primer minuto de un partido de box. Los dos peleadores todavía se están midiendo: uno tira, el otro responde, ninguno domina. En esos primeros golpes ves quién pega más fuerte y hacia dónde se mueve el ring. El rango de apertura es exactamente eso: los primeros golpes del día. No adivinamos quién va a ganar todavía; solo dibujamos las cuerdas del cuadrilátero.</p>
  </div>

  <section class="lec-sec">
    <h2>¿Qué es exactamente el rango de apertura?</h2>
    <p>Cuando abre el mercado de futuros (por ejemplo el índice, a las 8:30 de la mañana hora de Chicago), los primeros minutos son los más movidos del día. Entra muchísima gente al mismo tiempo: los que esperaron toda la noche, los que reaccionan a las noticias, los robots. Todo ese empujón crea un <b>precio máximo</b> y un <b>precio mínimo</b> en una ventana corta de tiempo.</p>
    <p>El <b>rango de apertura</b> es simplemente esa cajita: desde el punto más alto hasta el punto más bajo que tocó el precio durante los primeros minutos. La línea de arriba se llama <b>ORH</b> (Opening Range High, el techo) y la de abajo <b>ORL</b> (Opening Range Low, el piso). Todo lo que hagamos el resto del día va a girar alrededor de esas dos líneas.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 260" style="width:100%;height:auto;display:block" font-family="monospace">
        <!-- ejes -->
        <line x1="60" y1="20" x2="60" y2="220" stroke="var(--line)" stroke-width="1"/>
        <line x1="60" y1="220" x2="460" y2="220" stroke="var(--line)" stroke-width="1"/>
        <!-- caja del rango -->
        <rect x="70" y="70" width="120" height="90" fill="var(--dim)" opacity="0.12"/>
        <line x1="60" y1="70" x2="460" y2="70" stroke="var(--dim)" stroke-width="1.2" stroke-dasharray="5 4"/>
        <line x1="60" y1="160" x2="460" y2="160" stroke="var(--dim)" stroke-width="1.2" stroke-dasharray="5 4"/>
        <text x="466" y="74" fill="currentColor" font-size="11">ORH</text>
        <text x="466" y="164" fill="currentColor" font-size="11">ORL</text>
        <!-- velas dentro del rango -->
        <line x1="90" y1="80" x2="90" y2="150" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="85" y="95" width="10" height="45" fill="var(--up)"/>
        <line x1="115" y1="75" x2="115" y2="155" stroke="var(--down)" stroke-width="1.5"/>
        <rect x="110" y="90" width="10" height="50" fill="var(--down)"/>
        <line x1="140" y1="72" x2="140" y2="150" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="135" y="100" width="10" height="45" fill="var(--up)"/>
        <line x1="165" y1="78" x2="165" y2="158" stroke="var(--down)" stroke-width="1.5"/>
        <rect x="160" y="110" width="10" height="42" fill="var(--down)"/>
        <text x="130" y="45" fill="currentColor" font-size="12" text-anchor="middle">EL RANGO</text>
        <text x="130" y="245" fill="var(--dim)" font-size="10" text-anchor="middle">primeros minutos</text>
        <text x="320" y="245" fill="var(--dim)" font-size="10" text-anchor="middle">resto del día</text>
      </svg>
      <figcaption>La cajita se forma con las primeras velas del día. Su techo es ORH y su piso ORL. Esas dos líneas se proyectan hacia la derecha durante toda la sesión.</figcaption>
    </figure>

  <figure class="lec-fig viva">
    <svg viewBox="0 0 640 240" style="width:100%;height:auto;max-width:640px" font-family="monospace">
      <text x="320" y="20" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">EL RANGO SE FORMA SOLO &middot; PRIMEROS 15 MINUTOS</text>
      <line x1="40" y1="205" x2="610" y2="205" stroke="currentColor" stroke-opacity=".25"/>
      <text x="40" y="224" fill="var(--dim)" font-size="10">09:30</text>
      <text x="248" y="224" fill="var(--dim)" font-size="10">09:45</text>
      <polyline class="lv-traza" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-width="2"
        points="46,150 62,120 78,138 94,96 110,112 126,80 142,104 158,72 174,110 190,92 206,132 222,108 238,146 254,118 270,140"/>
      <g class="lv-1">
        <line x1="40" y1="72" x2="600" y2="72" stroke="var(--up)" stroke-width="2"/>
        <text x="606" y="68" fill="var(--up)" font-size="11" font-weight="bold">ORH</text>
      </g>
      <g class="lv-2">
        <line x1="40" y1="150" x2="600" y2="150" stroke="var(--down)" stroke-width="2"/>
        <text x="606" y="163" fill="var(--down)" font-size="11" font-weight="bold">ORL</text>
      </g>
      <g class="lv-3">
        <rect x="46" y="72" width="224" height="78" fill="var(--w02)" stroke="currentColor" stroke-opacity=".35" stroke-dasharray="4 4"/>
        <text x="158" y="116" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">EL RANGO</text>
      </g>
      <g class="lv-4">
        <line x1="270" y1="30" x2="270" y2="205" stroke="currentColor" stroke-opacity=".3" stroke-dasharray="3 5"/>
        <text x="284" y="44" fill="currentColor" font-size="11" font-weight="bold">aqu&iacute; cierra el rango</text>
        <text x="284" y="62" fill="var(--dim)" font-size="10.5">antes de esta l&iacute;nea no se entra, nunca</text>
      </g>
    </svg>
    <figcaption>El rango no se decide: se termina de formar solo a las 09:45.
      Hasta que esa l&iacute;nea no pasa, no hay se&ntilde;al que valga.</figcaption>
  </figure>

  </section>

  <section class="lec-sec">
    <h2>Primero: ¿qué ventana de tiempo uso?</h2>
    <p>Aquí hay una decisión sencilla pero importante: ¿cuántos minutos dura la cajita? En NorthPoint usamos casi siempre el <b>rango de los primeros 15 minutos</b>. Es decir: desde que abre el mercado hasta 15 minutos después, observamos y dibujamos. No entramos, no hacemos nada, solo miramos formarse la cajita.</p>
    <p>¿Por qué 15 minutos y no 5 o 60? Porque es el punto medio bueno:</p>
    <ul>
      <li><b>5 minutos</b> es muy poquito: la cajita sale chiquita y cualquier movimiento la rompe, dándote señales falsas todo el rato.</li>
      <li><b>60 minutos</b> es demasiado: para cuando termina de formarse, el movimiento fuerte del día ya pasó y llegas tarde.</li>
      <li><b>15 minutos</b> deja que se calme el caos inicial pero todavía te da tiempo de subirte al movimiento bueno.</li>
    </ul>
    <div class="lec-callout">
      <b>Ojo</b>
      <p>Sé consistente. Si escoges 15 minutos, úsalo TODOS los días. La mitad de los errores de los principiantes vienen de cambiar la regla a media semana porque "hoy se veía diferente". El método funciona porque lo repites igual, no porque lo adivines cada mañana.</p>
    </div>
  </section>

  <section class="lec-sec">
    <h2>Cómo dibujar la cajita, paso a paso</h2>
    <p>Vamos despacio, como si nunca lo hubieras hecho:</p>
    <ul>
      <li><b>Paso 1.</b> Marca en tu reloj la hora exacta de apertura del mercado que operas.</li>
      <li><b>Paso 2.</b> Deja correr 15 minutos. Durante ese tiempo, el precio va a subir y bajar. Solo observa.</li>
      <li><b>Paso 3.</b> Al terminar los 15 minutos, ubica el <b>punto más alto</b> que tocó el precio: ese es tu <b>ORH</b>. Traza una línea horizontal ahí.</li>
      <li><b>Paso 4.</b> Ubica el <b>punto más bajo</b>: ese es tu <b>ORL</b>. Traza otra línea horizontal.</li>
      <li><b>Paso 5.</b> Extiende ambas líneas hacia la derecha. Ya tienes tu cancha marcada para el resto del día.</li>
    </ul>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 260" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="20" x2="40" y2="220" stroke="var(--line)" stroke-width="1"/>
        <line x1="40" y1="220" x2="470" y2="220" stroke="var(--line)" stroke-width="1"/>
        <!-- zona de formacion sombreada -->
        <rect x="55" y="20" width="130" height="200" fill="var(--dim)" opacity="0.08"/>
        <text x="120" y="35" fill="var(--dim)" font-size="10" text-anchor="middle">15 min de observar</text>
        <!-- lineas ORH ORL -->
        <line x1="40" y1="65" x2="470" y2="65" stroke="var(--up)" stroke-width="1.4"/>
        <line x1="40" y1="165" x2="470" y2="165" stroke="var(--down)" stroke-width="1.4"/>
        <text x="44" y="60" fill="var(--up)" font-size="11">ORH (techo)</text>
        <text x="44" y="180" fill="var(--down)" font-size="11">ORL (piso)</text>
        <!-- velas de formacion -->
        <g>
          <line x1="70" y1="80" x2="70" y2="150" stroke="var(--up)" stroke-width="1.5"/>
          <rect x="65" y="95" width="10" height="45" fill="var(--up)"/>
          <line x1="95" y1="70" x2="95" y2="160" stroke="var(--down)" stroke-width="1.5"/>
          <rect x="90" y="90" width="10" height="55" fill="var(--down)"/>
          <line x1="120" y1="68" x2="120" y2="140" stroke="var(--up)" stroke-width="1.5"/>
          <rect x="115" y="90" width="10" height="45" fill="var(--up)"/>
          <line x1="145" y1="75" x2="145" y2="165" stroke="var(--down)" stroke-width="1.5"/>
          <rect x="140" y="95" width="10" height="55" fill="var(--down)"/>
          <line x1="170" y1="66" x2="170" y2="150" stroke="var(--up)" stroke-width="1.5"/>
          <rect x="165" y="88" width="10" height="50" fill="var(--up)"/>
        </g>
        <!-- flechas a los extremos -->
        <path d="M170 66 L200 55" stroke="currentColor" stroke-width="1" fill="none"/>
        <text x="205" y="53" fill="currentColor" font-size="10">punto mas alto = ORH</text>
        <path d="M140 150 L200 195" stroke="currentColor" stroke-width="1" fill="none"/>
        <text x="205" y="198" fill="currentColor" font-size="10">punto mas bajo = ORL</text>
      </svg>
      <figcaption>Durante los 15 minutos solo miras. Al cerrar la ventana, el punto más alto de todas esas velas es el ORH y el más bajo es el ORL.</figcaption>
    </figure>
  </section>

  <section class="lec-sec">
    <h2>Rango ancho vs. rango angosto: qué te dice el tamaño</h2>
    <p>No todas las cajitas son iguales. El <b>tamaño</b> del rango de apertura ya te está contando algo antes de que pase nada más:</p>
    <ul>
      <li><b>Rango ancho</b> (cajita grande): hubo mucha pelea y mucho volumen. El día promete movimiento, pero cuidado: los stops (tu red de seguridad) tendrán que ir más lejos, así que arriesgas más por operación.</li>
      <li><b>Rango angosto</b> (cajita chica): el mercado está tranquilo, comprimido, como un resorte apretado. Cuando por fin rompe, muchas veces explota fuerte. Los stops caben más cerca.</li>
    </ul>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 220" style="width:100%;height:auto;display:block" font-family="monospace">
        <!-- ancho -->
        <rect x="40" y="40" width="150" height="120" fill="var(--dim)" opacity="0.12"/>
        <line x1="40" y1="40" x2="190" y2="40" stroke="var(--up)" stroke-width="1.3"/>
        <line x1="40" y1="160" x2="190" y2="160" stroke="var(--down)" stroke-width="1.3"/>
        <text x="115" y="30" fill="currentColor" font-size="11" text-anchor="middle">RANGO ANCHO</text>
        <text x="115" y="185" fill="var(--dim)" font-size="9" text-anchor="middle">mucha pelea, stop lejos</text>
        <line x1="200" y1="30" x2="200" y2="200" stroke="var(--line)" stroke-width="1" stroke-dasharray="3 3"/>
        <!-- angosto -->
        <rect x="290" y="80" width="150" height="40" fill="var(--dim)" opacity="0.12"/>
        <line x1="290" y1="80" x2="440" y2="80" stroke="var(--up)" stroke-width="1.3"/>
        <line x1="290" y1="120" x2="440" y2="120" stroke="var(--down)" stroke-width="1.3"/>
        <text x="365" y="30" fill="currentColor" font-size="11" text-anchor="middle">RANGO ANGOSTO</text>
        <text x="365" y="185" fill="var(--dim)" font-size="9" text-anchor="middle">resorte apretado, stop cerca</text>
      </svg>
      <figcaption>El ancho de la cajita te avisa qué tipo de día podrías tener y cuánto vas a tener que arriesgar en el stop.</figcaption>
    </figure>
    <div class="lec-ejemplo">
      <b>Ejemplo</b>
      <p>Un martes el índice abre y en 15 minutos el ORH queda en 20,050 y el ORL en 20,020. El rango mide 30 puntos: es angosto, mercado comprimido. El miércoles siguiente, con noticias de por medio, el ORH queda en 20,100 y el ORL en 20,020: rango de 80 puntos, ancho. En el día angosto tu stop podría caber en 12 puntos; en el ancho quizá necesites 35. El tamaño de la cajita ya te cambió el plan de riesgo antes de entrar.</p>
    </div>
  </section>

  <section class="lec-sec">
    <h2>Errores clásicos al dibujar el rango</h2>
    <ul>
      <li><b>Contar la mecha o no contarla.</b> El ORH es el punto más alto que TOCÓ el precio, mechas incluidas. No uses solo el cuerpo de la vela. Decide una vez y sé consistente.</li>
      <li><b>Empezar a contar antes de la apertura oficial.</b> La sesión previa (pre-market) no cuenta. El reloj arranca en la campana de apertura.</li>
      <li><b>Mover las líneas después.</b> Una vez cerrados los 15 minutos, esas líneas están congeladas. No las ajustes porque el precio se acercó.</li>
      <li><b>Operar dentro de la cajita.</b> Mientras el precio está entre ORH y ORL no hay señal. La acción de verdad empieza cuando ROMPE una de las dos (eso es la próxima lección).</li>
    </ul>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 200" style="width:100%;height:auto;display:block" font-family="monospace">
        <rect x="60" y="60" width="360" height="80" fill="var(--dim)" opacity="0.10"/>
        <line x1="60" y1="60" x2="420" y2="60" stroke="var(--up)" stroke-width="1.3"/>
        <line x1="60" y1="140" x2="420" y2="140" stroke="var(--down)" stroke-width="1.3"/>
        <text x="425" y="63" fill="var(--up)" font-size="10">ORH</text>
        <text x="425" y="145" fill="var(--down)" font-size="10">ORL</text>
        <text x="240" y="105" fill="currentColor" font-size="13" text-anchor="middle">ZONA DE ESPERA</text>
        <text x="240" y="125" fill="var(--dim)" font-size="10" text-anchor="middle">aqui adentro NO se opera</text>
        <text x="240" y="30" fill="var(--dim)" font-size="10" text-anchor="middle">paciencia: todavia no hay trade</text>
      </svg>
      <figcaption>Dentro de la cajita se espera. La señal nace en el borde, nunca en el centro.</figcaption>
    </figure>
  </section>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>El <b>rango de apertura (ORB)</b> es la cajita de precio de los primeros minutos del día.</li>
      <li>Usamos los <b>primeros 15 minutos</b>, siempre igual, para dibujarla.</li>
      <li>El techo es <b>ORH</b> y el piso es <b>ORL</b>; ambas líneas se proyectan a la derecha.</li>
      <li>Mechas incluidas, reloj desde la apertura oficial, y una vez cerrada la cajita ya no se mueve.</li>
      <li>El <b>ancho</b> te avisa el tipo de día y cuánto riesgo pide el stop.</li>
      <li>Dentro de la cajita no se opera: solo se espera la ruptura.</li>
    </ul>
  </div>
</div>`,

  // ============================================================
  // L4B — ORB: El break y la confirmación
  // ============================================================
  'l4b': `
<div class="lec">
  <h1 class="lec-h1">ORB — El break y la confirmación</h1>
  <p class="lec-lede">Ya tienes tu cajita dibujada. Ahora viene lo bueno: el precio va a intentar salirse por arriba o por abajo. A eso le llamamos el <b>break</b> (ruptura). Pero cuidado, no toda salida es de verdad. En esta lección aprendes a distinguir un break real de una finta que solo quiere cazarte.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Es como abrir la puerta de tu casa cuando escuchas un ruido afuera. Sacas la cabeza un segundo (eso es el precio asomándose). ¿Sales de verdad a la calle o solo era el viento y cierras la puerta otra vez? El break confirmado es cuando de verdad SALES y cierras la puerta detrás de ti; la finta es cuando asomas la cabeza y te metes corriendo. No apostamos por cada asomada: esperamos a ver quién de verdad cruza la puerta.</p>
  </div>

  <section class="lec-sec">
    <h2>¿Qué es un break?</h2>
    <p>Un <b>break</b> ocurre cuando el precio cruza una de las líneas del rango: sale por arriba del ORH (break alcista, hacia arriba) o por abajo del ORL (break bajista, hacia abajo). Es la señal de que la pelea de la apertura ya se decidió y un bando ganó.</p>
    <ul>
      <li><b>Break alcista:</b> el precio rompe el ORH. Los compradores ganaron. El movimiento probable es hacia arriba.</li>
      <li><b>Break bajista:</b> el precio rompe el ORL. Los vendedores ganaron. El movimiento probable es hacia abajo.</li>
    </ul>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 260" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="20" x2="40" y2="220" stroke="var(--line)" stroke-width="1"/>
        <line x1="40" y1="220" x2="470" y2="220" stroke="var(--line)" stroke-width="1"/>
        <line x1="40" y1="90" x2="470" y2="90" stroke="var(--up)" stroke-width="1.3"/>
        <line x1="40" y1="170" x2="470" y2="170" stroke="var(--down)" stroke-width="1.3"/>
        <text x="44" y="85" fill="var(--up)" font-size="10">ORH</text>
        <text x="44" y="185" fill="var(--down)" font-size="10">ORL</text>
        <!-- velas dentro -->
        <line x1="80" y1="100" x2="80" y2="160" stroke="var(--down)" stroke-width="1.5"/>
        <rect x="75" y="115" width="10" height="35" fill="var(--down)"/>
        <line x1="105" y1="105" x2="105" y2="165" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="100" y="120" width="10" height="35" fill="var(--up)"/>
        <line x1="130" y1="95" x2="130" y2="150" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="125" y="105" width="10" height="40" fill="var(--up)"/>
        <!-- vela que rompe arriba -->
        <line x1="160" y1="55" x2="160" y2="110" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="155" y="62" width="10" height="35" fill="var(--up)"/>
        <line x1="185" y1="40" x2="185" y2="85" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="180" y="48" width="10" height="30" fill="var(--up)"/>
        <path d="M150 88 L150 60" stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#arrUp4b)"/>
        <defs><marker id="arrUp4b" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto"><path d="M0 6 L4 0 L8 6" fill="currentColor"/></marker></defs>
        <text x="230" y="55" fill="var(--up)" font-size="11">BREAK ALCISTA</text>
        <text x="230" y="70" fill="var(--dim)" font-size="9">rompe por arriba del ORH</text>
      </svg>
      <figcaption>El precio venía dentro de la cajita y de repente cierra por encima del ORH: eso es un break alcista.</figcaption>
    </figure>

  <figure class="lec-shots">
    <b>Lo que pas&oacute; de verdad</b>
    <div class="lec-shots-tira">
      <a href="assets/images/tr/np-tr-01.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-01.jpg" alt="Ejecuci&oacute;n real 1" decoding="async"></a>
      <a href="assets/images/tr/np-tr-02.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-02.jpg" alt="Ejecuci&oacute;n real 2" decoding="async"></a>
      <a href="assets/images/tr/np-tr-03.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-03.jpg" alt="Ejecuci&oacute;n real 3" decoding="async"></a>
      <a href="assets/images/tr/np-tr-04.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-04.jpg" alt="Ejecuci&oacute;n real 4" decoding="async"></a>
      <a href="assets/images/tr/np-tr-05.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-05.jpg" alt="Ejecuci&oacute;n real 5" decoding="async"></a>
      <a href="assets/images/tr/np-tr-06.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-06.jpg" alt="Ejecuci&oacute;n real 6" decoding="async"></a>
      <a href="assets/images/tr/np-tr-07.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-07.jpg" alt="Ejecuci&oacute;n real 7" decoding="async"></a>
      <a href="assets/images/tr/np-tr-08.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-08.jpg" alt="Ejecuci&oacute;n real 8" decoding="async"></a>
      <a href="assets/images/tr/np-tr-09.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-09.jpg" alt="Ejecuci&oacute;n real 9" decoding="async"></a>
      <a href="assets/images/tr/np-tr-10.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-10.jpg" alt="Ejecuci&oacute;n real 10" decoding="async"></a>
    </div>
    <figcaption>Diez ejecuciones reales en MNQ sobre el rango de apertura de Nueva York.
      No son ejemplos dibujados: son los fills que est&aacute;n en el log. P&iacute;cales para verlas en grande.</figcaption>
  </figure>

  </section>

  <section class="lec-sec">
    <h2>El problema: los breaks falsos</h2>
    <p>Aquí está la trampa que arruina a los principiantes. Muchas veces el precio <b>asoma la cabeza</b> por encima del ORH, toca la línea, y regresa de volada a la cajita. A eso se le llama <b>break falso</b> o <b>fakeout</b>. Si entraste apenas tocó la línea, quedaste atrapado del lado equivocado.</p>
    <p>¿Por qué pasa esto? Porque hay mucha gente con órdenes justo arriba del ORH. Los grandes jugadores lo saben y empujan el precio un poquito para "recoger" esas órdenes antes de irse al otro lado. Es una cacería, y tú no quieres ser la presa.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 240" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="90" x2="470" y2="90" stroke="var(--up)" stroke-width="1.3"/>
        <text x="44" y="85" fill="var(--up)" font-size="10">ORH</text>
        <!-- vela que asoma y regresa -->
        <line x1="120" y1="105" x2="120" y2="160" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="115" y="115" width="10" height="35" fill="var(--up)"/>
        <!-- mecha que perfora pero cierra abajo -->
        <line x1="160" y1="60" x2="160" y2="130" stroke="var(--down)" stroke-width="1.5"/>
        <rect x="155" y="100" width="10" height="25" fill="var(--down)"/>
        <line x1="200" y1="110" x2="200" y2="175" stroke="var(--down)" stroke-width="1.5"/>
        <rect x="195" y="120" width="10" height="45" fill="var(--down)"/>
        <line x1="240" y1="130" x2="240" y2="200" stroke="var(--down)" stroke-width="1.5"/>
        <rect x="235" y="145" width="10" height="45" fill="var(--down)"/>
        <path d="M160 60 Q175 70 175 100" stroke="currentColor" stroke-width="1" fill="none" stroke-dasharray="3 3"/>
        <text x="185" y="55" fill="var(--down)" font-size="11">FINTA</text>
        <text x="185" y="70" fill="var(--dim)" font-size="9">asoma y se regresa</text>
        <circle cx="160" cy="62" r="14" fill="none" stroke="var(--down)" stroke-width="1.2" stroke-dasharray="3 2"/>
      </svg>
      <figcaption>Una mecha perfora el ORH pero la vela CIERRA de regreso dentro de la cajita. Eso no es un break: es una finta para cazar stops.</figcaption>
    </figure>
    <div class="lec-callout">
      <b>Ojo</b>
      <p>La diferencia entre ganar y perder con ORB casi siempre está aquí: no persigas la primera mecha que toca la línea. Los grandes ganan cazando exactamente a los impacientes que hacen eso.</p>
    </div>
  </section>

  <section class="lec-sec">
    <h2>La regla de oro: cierre por fuera, no solo toque</h2>
    <p>Aquí está la herramienta que separa un break real de una finta. La regla es simple:</p>
    <p style="font-size:1.05em"><b>No cuenta el toque. Cuenta el CIERRE.</b></p>
    <p>Esto quiere decir: espera a que una vela <b>cierre completa</b> por fuera de la línea. No importa que la mecha la perfore; importa dónde termina el cuerpo de la vela cuando se acaba su tiempo. Si el precio cierra arriba del ORH, el break es de verdad. Si solo lo tocó con la mecha y cerró adentro, fue finta.</p>
    <p>Recuerda qué es una vela: cada velita representa un pedazo de tiempo (por ejemplo 5 minutos). El <b>cuerpo</b> es dónde abrió y dónde cerró el precio en esos 5 minutos; las <b>mechas</b> son los extremos que tocó pero no aguantó. El cierre es la palabra final de esa vela.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 230" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="80" x2="470" y2="80" stroke="var(--up)" stroke-width="1.3"/>
        <text x="44" y="75" fill="var(--up)" font-size="10">ORH</text>
        <!-- VELA BUENA: cierra arriba -->
        <line x1="130" y1="35" x2="130" y2="120" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="122" y="45" width="16" height="30" fill="var(--up)"/>
        <text x="130" y="150" fill="var(--up)" font-size="9" text-anchor="middle">CIERRA</text>
        <text x="130" y="163" fill="var(--up)" font-size="9" text-anchor="middle">ARRIBA</text>
        <text x="130" y="180" fill="currentColor" font-size="10" text-anchor="middle">break REAL</text>
        <!-- flecha al cuerpo -->
        <path d="M155 60 L175 60" stroke="currentColor" stroke-width="0.8" fill="none"/>
        <text x="178" y="63" fill="var(--dim)" font-size="8">cuerpo por fuera</text>
        <!-- VELA MALA: mecha perfora cierra adentro -->
        <line x1="330" y1="45" x2="330" y2="130" stroke="var(--down)" stroke-width="1.5"/>
        <rect x="322" y="90" width="16" height="30" fill="var(--down)"/>
        <text x="330" y="155" fill="var(--down)" font-size="9" text-anchor="middle">CIERRA</text>
        <text x="330" y="168" fill="var(--down)" font-size="9" text-anchor="middle">ADENTRO</text>
        <text x="330" y="185" fill="currentColor" font-size="10" text-anchor="middle">FINTA</text>
        <path d="M355 55 L378 55" stroke="currentColor" stroke-width="0.8" fill="none"/>
        <text x="381" y="58" fill="var(--dim)" font-size="8">solo mecha</text>
      </svg>
      <figcaption>Izquierda: el cuerpo cierra arriba del ORH, break real. Derecha: solo la mecha lo tocó y el cuerpo cerró adentro, es finta.</figcaption>
    </figure>
  </section>

  <section class="lec-sec">
    <h2>Confirmación extra: el retest</h2>
    <p>Los traders más pacientes agregan una segunda capa de seguridad: el <b>retest</b> (reprueba). Después de que una vela cierra por fuera del ORH, esperan a que el precio <b>regrese a tocar la línea desde arriba</b>, la respete (o sea, rebote sin volver a meterse), y ENTONCES entran. Es como el break confirmándose dos veces.</p>
    <p>El ORH, que antes era techo, ahora se convierte en piso. Eso es una señal preciosa: significa que los compradores ahora defienden esa línea. En trading a esto le llamamos que un nivel "cambió de rol": lo que frenaba ahora sostiene.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 230" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="120" x2="470" y2="120" stroke="var(--up)" stroke-width="1.3"/>
        <text x="44" y="115" fill="var(--up)" font-size="10">ORH</text>
        <!-- 1 rompe -->
        <line x1="110" y1="80" x2="110" y2="140" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="105" y="90" width="10" height="30" fill="var(--up)"/>
        <text x="110" y="70" fill="var(--dim)" font-size="9" text-anchor="middle">1. rompe</text>
        <!-- 2 regresa a testear -->
        <line x1="160" y1="90" x2="160" y2="125" stroke="var(--down)" stroke-width="1.5"/>
        <rect x="155" y="100" width="10" height="22" fill="var(--down)"/>
        <text x="185" y="140" fill="var(--dim)" font-size="9">2. regresa y toca</text>
        <!-- 3 rebota y sigue -->
        <line x1="210" y1="75" x2="210" y2="120" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="205" y="85" width="10" height="30" fill="var(--up)"/>
        <line x1="250" y1="50" x2="250" y2="100" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="245" y="60" width="10" height="30" fill="var(--up)"/>
        <line x1="290" y1="35" x2="290" y2="80" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="285" y="42" width="10" height="30" fill="var(--up)"/>
        <text x="300" y="55" fill="var(--up)" font-size="10">3. rebota y sube</text>
        <path d="M175 118 Q200 105 215 95" stroke="currentColor" stroke-width="1" fill="none" stroke-dasharray="3 3"/>
        <text x="240" y="150" fill="currentColor" font-size="9">el techo se volvio piso</text>
      </svg>
      <figcaption>El retest: rompe, regresa a tocar la línea desde arriba, la respeta y sigue subiendo. Entrada más segura, aunque a veces te pierdes los breaks que no regresan.</figcaption>
    </figure>
    <div class="lec-ejemplo">
      <b>Ejemplo</b>
      <p>ORH en 20,050. A las 8:52 una vela de 5 minutos cierra en 20,058: break confirmado por cierre. En vez de saltar, esperas. A las 8:58 el precio baja y toca 20,051, apenitas arriba del ORH, y rebota cerrando en 20,062. Ese rebote es el retest: los compradores defendieron la línea. Ahí entras, con la tranquilidad de que el nivel ya cambió de rol.</p>
    </div>
  </section>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>Un <b>break</b> es cuando el precio cruza el ORH (alcista) o el ORL (bajista).</li>
      <li>Cuidado con los <b>breaks falsos</b>: mechas que asoman y regresan para cazar impacientes.</li>
      <li>Regla de oro: <b>no cuenta el toque, cuenta el cierre</b> del cuerpo de la vela por fuera de la línea.</li>
      <li>Para más seguridad, espera el <b>retest</b>: que el precio regrese, respete la línea y siga.</li>
      <li>Cuando el ORH aguanta como piso (o el ORL como techo), el nivel "cambió de rol": buena señal.</li>
    </ul>
  </div>
</div>`,

  // ============================================================
  // L4C — ORB: ORH y ORL como imanes
  // ============================================================
  'l4c': `
<div class="lec">
  <h1 class="lec-h1">ORB — ORH y ORL como imanes</h1>
  <p class="lec-lede">Las dos líneas del rango de apertura no solo sirven para entrar. Durante todo el día actúan como <b>imanes</b>: el precio tiende a regresar a ellas, rebotar en ellas o usarlas como metas. Entender esto te da mapas para todo el resto de la sesión, no solo para el primer break.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Piensa en una alberca con dos orillas: la parte honda y la parte baja. Un nadador puede alejarse al centro, pero tarde o temprano vuelve a tocar una orilla para empujarse. El ORH y el ORL son esas orillas. El precio se aleja, nada un rato, y con frecuencia regresa a empujarse en una de ellas. Si sabes dónde están las orillas, sabes hacia dónde puede volver el nadador.</p>
  </div>

  <section class="lec-sec">
    <h2>¿Por qué el precio regresa a estas líneas?</h2>
    <p>Un <b>imán</b> en trading es un nivel de precio que atrae al mercado, como si jalara. El ORH y el ORL son imanes por una razón sencilla: <b>muchísima gente puso órdenes ahí</b>. En esos niveles hay compradores esperando, vendedores esperando, stops de otros, metas de otros. Toda esa concentración de intereses hace que el precio "quiera" ir a visitarlos.</p>
    <p>Cuando el mercado se aleja de una de las líneas, con frecuencia vuelve a probarla antes de decidir su siguiente movimiento. Por eso, aunque el break ya haya pasado, las líneas siguen siendo puntos de referencia vivos toda la jornada.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 260" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="220" x2="470" y2="220" stroke="var(--line)" stroke-width="1"/>
        <line x1="40" y1="80" x2="470" y2="80" stroke="var(--up)" stroke-width="1.3"/>
        <line x1="40" y1="170" x2="470" y2="170" stroke="var(--down)" stroke-width="1.3"/>
        <text x="44" y="75" fill="var(--up)" font-size="10">ORH (iman)</text>
        <text x="44" y="185" fill="var(--down)" font-size="10">ORL (iman)</text>
        <!-- trayectoria ondulante que toca ambas -->
        <path d="M70 125 L100 90 L130 82 L160 130 L200 168 L240 172 L280 120 L320 85 L360 82 L400 130 L440 168"
              fill="none" stroke="currentColor" stroke-width="1.6"/>
        <circle cx="130" cy="82" r="5" fill="var(--up)"/>
        <circle cx="240" cy="172" r="5" fill="var(--down)"/>
        <circle cx="360" cy="82" r="5" fill="var(--up)"/>
        <circle cx="440" cy="168" r="5" fill="var(--down)"/>
        <text x="240" y="30" fill="var(--dim)" font-size="10" text-anchor="middle">el precio rebota entre las dos orillas todo el dia</text>
      </svg>
      <figcaption>El precio se aleja al centro pero vuelve una y otra vez a tocar el ORH o el ORL. Las líneas siguen vivas después del primer break.</figcaption>
    </figure>
  </section>

  <section class="lec-sec">
    <h2>Uso 1: la línea como META (target)</h2>
    <p>Cuando rompes por arriba del ORH, ¿hasta dónde puede llegar el precio? Una respuesta natural: hasta el <b>próximo imán</b>. Y muchas veces el imán más obvio en el día es la línea opuesta o niveles del día anterior. Pero dentro de la cajita misma, hay una lógica limpia:</p>
    <ul>
      <li>Si rompes el ORH hacia arriba, una meta conservadora es una distancia igual al ancho de la cajita proyectada hacia arriba. A la cajita se le llama a veces "la medida", y el mercado suele moverse al menos una medida completa tras romper.</li>
      <li>Si rompes el ORL hacia abajo, igual: proyecta el ancho de la cajita hacia abajo como primera meta.</li>
    </ul>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 270" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="150" x2="470" y2="150" stroke="var(--up)" stroke-width="1.3"/>
        <line x1="40" y1="210" x2="470" y2="210" stroke="var(--down)" stroke-width="1.3"/>
        <text x="44" y="145" fill="var(--up)" font-size="10">ORH</text>
        <text x="44" y="225" fill="var(--down)" font-size="10">ORL</text>
        <!-- medida de la caja -->
        <line x1="55" y1="150" x2="55" y2="210" stroke="var(--dim)" stroke-width="1"/>
        <text x="20" y="185" fill="var(--dim)" font-size="9">1 medida</text>
        <!-- meta proyectada arriba -->
        <line x1="40" y1="90" x2="470" y2="90" stroke="var(--dim)" stroke-width="1.1" stroke-dasharray="5 4"/>
        <text x="44" y="85" fill="var(--dim)" font-size="10">META = ORH + 1 medida</text>
        <line x1="55" y1="90" x2="55" y2="150" stroke="var(--dim)" stroke-width="1"/>
        <!-- velas que rompen y suben -->
        <line x1="120" y1="160" x2="120" y2="200" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="115" y="168" width="10" height="28" fill="var(--up)"/>
        <line x1="160" y1="130" x2="160" y2="165" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="155" y="138" width="10" height="25" fill="var(--up)"/>
        <line x1="200" y1="105" x2="200" y2="140" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="195" y="112" width="10" height="25" fill="var(--up)"/>
        <line x1="240" y1="88" x2="240" y2="118" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="235" y="92" width="10" height="24" fill="var(--up)"/>
        <path d="M270 92 L300 92" stroke="currentColor" stroke-width="1.2" fill="none" marker-end="url(#arrR4c)"/>
        <defs><marker id="arrR4c" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8" fill="currentColor"/></marker></defs>
        <text x="305" y="95" fill="currentColor" font-size="9">llega a la meta</text>
      </svg>
      <figcaption>Tras romper el ORH, proyecta el ancho de la cajita ("una medida") hacia arriba: esa es una primera meta razonable.</figcaption>
    </figure>
  </section>

  <section class="lec-sec">
    <h2>Uso 2: la línea como REBOTE (soporte o resistencia)</h2>
    <p>Cuando el precio regresa a una línea que ya rompió, esa línea suele funcionar como <b>rebote</b>. Si rompiste el ORH hacia arriba y el precio baja a tocarlo, el ORH ahora es <b>soporte</b> (lo detiene por abajo, como un piso). Si rompiste el ORL hacia abajo y el precio sube a tocarlo, el ORL ahora es <b>resistencia</b> (lo frena por arriba, como un techo).</p>
    <p>Estos son los términos clave, en simple: <b>soporte</b> = un piso donde el precio tiende a rebotar hacia arriba; <b>resistencia</b> = un techo donde el precio tiende a rebotar hacia abajo. Las líneas del rango cambian de papel según de qué lado esté el precio.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 240" style="width:100%;height:auto;display:block" font-family="monospace">
        <!-- caso soporte -->
        <line x1="40" y1="120" x2="230" y2="120" stroke="var(--up)" stroke-width="1.3"/>
        <text x="44" y="115" fill="var(--up)" font-size="9">ORH = soporte</text>
        <path d="M60 90 L90 70 L120 105 L150 118 L180 95 L210 60" fill="none" stroke="currentColor" stroke-width="1.4"/>
        <circle cx="150" cy="118" r="5" fill="var(--up)"/>
        <text x="150" y="150" fill="var(--dim)" font-size="9" text-anchor="middle">rebota hacia ARRIBA</text>
        <line x1="245" y1="30" x2="245" y2="210" stroke="var(--line)" stroke-width="1" stroke-dasharray="3 3"/>
        <!-- caso resistencia -->
        <line x1="260" y1="110" x2="450" y2="110" stroke="var(--down)" stroke-width="1.3"/>
        <text x="264" y="105" fill="var(--down)" font-size="9">ORL = resistencia</text>
        <path d="M280 150 L310 175 L340 120 L370 112 L400 150 L430 185" fill="none" stroke="currentColor" stroke-width="1.4"/>
        <circle cx="370" cy="112" r="5" fill="var(--down)"/>
        <text x="365" y="150" fill="var(--dim)" font-size="9" text-anchor="middle">rebota hacia ABAJO</text>
      </svg>
      <figcaption>La misma línea sostiene por abajo (soporte) o frena por arriba (resistencia) según de qué lado quede el precio.</figcaption>
    </figure>
    <div class="lec-callout">
      <b>Ojo</b>
      <p>Cuando el precio rompe una línea con fuerza y luego la respeta como rebote, esa es la confirmación más limpia que existe en ORB. Es el mercado diciéndote: "esta línea sí importa, y ahora está de tu lado".</p>
    </div>
  </section>

  <section class="lec-sec">
    <h2>El día de vuelta a la cajita (rango sin dirección)</h2>
    <p>No todos los días hay tendencia. Algunos días el precio rompe el ORH, se regresa, rompe el ORL, se regresa otra vez. Rebota entre las dos orillas sin decidirse. A esto le llamamos <b>día de rango</b> o mercado lateral (que no va ni arriba ni abajo, solo de lado).</p>
    <p>Reconocer esto es oro puro: en un día de rango, los breaks fallan una y otra vez. Si ves que el precio regresa a la cajita dos o tres veces, baja tu tamaño o mejor no operes. El método NorthPoint premia saber cuándo NO hacer nada tanto como saber cuándo entrar.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 230" style="width:100%;height:auto;display:block" font-family="monospace">
        <rect x="40" y="90" width="430" height="70" fill="var(--dim)" opacity="0.08"/>
        <line x1="40" y1="90" x2="470" y2="90" stroke="var(--up)" stroke-width="1.3"/>
        <line x1="40" y1="160" x2="470" y2="160" stroke="var(--down)" stroke-width="1.3"/>
        <text x="44" y="85" fill="var(--up)" font-size="9">ORH</text>
        <text x="44" y="175" fill="var(--down)" font-size="9">ORL</text>
        <path d="M60 125 L95 80 L120 130 L150 165 L185 120 L215 82 L245 128 L280 168 L310 118 L345 84 L375 130 L410 160"
              fill="none" stroke="currentColor" stroke-width="1.5"/>
        <text x="255" y="40" fill="var(--dim)" font-size="10" text-anchor="middle">DIA DE RANGO: rompe, falla, regresa, repite</text>
        <text x="255" y="205" fill="currentColor" font-size="10" text-anchor="middle">aqui lo mejor muchas veces es NO operar</text>
      </svg>
      <figcaption>Cuando el precio rebota una y otra vez entre las líneas sin irse, es día de rango. Los breaks fallan: baja tamaño o quédate afuera.</figcaption>
    </figure>
    <div class="lec-ejemplo">
      <b>Ejemplo</b>
      <p>Cajita entre 20,020 (ORL) y 20,050 (ORH), ancho de 30 puntos. Rompes el ORH, entras, y el precio se devuelve a 20,025: falló. Una hora después rompe el ORL, entras corto, y rebota a 20,048: falló otra vez. Dos breaks fallidos seguidos = día de rango. La lección: guarda las manos en los bolsillos y espera un cierre convincente fuera de la caja, con vela grande y seguimiento, o simplemente no operes hoy.</p>
    </div>
  </section>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>ORH y ORL son <b>imanes</b>: concentran órdenes y el precio tiende a volver a ellos todo el día.</li>
      <li>Sirven como <b>meta</b>: proyecta el ancho de la cajita ("una medida") tras el break.</li>
      <li>Sirven como <b>rebote</b>: el ORH roto se vuelve soporte (piso), el ORL roto se vuelve resistencia (techo).</li>
      <li><b>Soporte</b> = piso que rebota hacia arriba; <b>resistencia</b> = techo que rebota hacia abajo.</li>
      <li>Si el precio regresa a la cajita varias veces, es <b>día de rango</b>: baja tamaño o no operes.</li>
    </ul>
  </div>
</div>`,

  // ============================================================
  // L5A — EMAs 14/50: La tendencia con las dos medias
  // ============================================================
  'l5a': `
<div class="lec">
  <h1 class="lec-h1">EMAs 14/50 — La tendencia con las dos medias</h1>
  <p class="lec-lede">Mirar velas sueltas puede marear. Sube una, baja otra, ¿para dónde va esto? Las <b>medias móviles</b> son dos líneas suavecitas que se dibujan solas sobre tus velas y te dicen, de un vistazo, hacia dónde apunta el mercado. En NorthPoint usamos dos: la de 14 y la de 50. Esta lección te enseña a leerlas como un mapa.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Imagina que vas manejando en la carretera con niebla. Cada vela es un poste que aparece y desaparece; solos no te dicen nada. Pero si conectas los postes con dos rayas pintadas en el asfalto, de repente ves la curva: la carretera sube o baja. Las EMAs son esas rayas pintadas. No adivinan el futuro, pero te muestran la forma del camino que ya llevas.</p>
  </div>

  <section class="lec-sec">
    <h2>¿Qué es una media móvil?</h2>
    <p>Una <b>media móvil</b> es un promedio del precio de las últimas velas, que se va actualizando vela con vela. Si haces el promedio de los últimos 14 precios de cierre y lo dibujas, y luego el promedio de los siguientes 14, y así, obtienes una línea suave que sigue al precio sin todo el ruido de cada velita.</p>
    <p>La <b>EMA</b> (media móvil exponencial) es una versión que le da <b>más peso a las velas recientes</b>. En cristiano: reacciona más rápido a lo que acaba de pasar, sin quedarse pegada al pasado lejano. Por eso la preferimos: es ágil.</p>
    <ul>
      <li>El número (14 o 50) es <b>cuántas velas</b> promedia.</li>
      <li><b>EMA 14</b> = promedio corto, rápido, pegado al precio. Es la línea nerviosa.</li>
      <li><b>EMA 50</b> = promedio largo, lento, tranquilo. Es la línea de fondo, la tendencia grande.</li>
    </ul>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 240" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="210" x2="470" y2="210" stroke="var(--line)" stroke-width="1"/>
        <!-- velas ruidosas -->
        <g stroke-width="1.3">
          <line x1="70" y1="150" x2="70" y2="185" stroke="var(--dim)"/><rect x="66" y="158" width="8" height="20" fill="var(--dim)"/>
          <line x1="100" y1="130" x2="100" y2="170" stroke="var(--dim)"/><rect x="96" y="140" width="8" height="22" fill="var(--dim)"/>
          <line x1="130" y1="145" x2="130" y2="180" stroke="var(--dim)"/><rect x="126" y="150" width="8" height="24" fill="var(--dim)"/>
          <line x1="160" y1="120" x2="160" y2="160" stroke="var(--dim)"/><rect x="156" y="128" width="8" height="24" fill="var(--dim)"/>
          <line x1="190" y1="135" x2="190" y2="170" stroke="var(--dim)"/><rect x="186" y="142" width="8" height="20" fill="var(--dim)"/>
          <line x1="220" y1="105" x2="220" y2="145" stroke="var(--dim)"/><rect x="216" y="112" width="8" height="26" fill="var(--dim)"/>
          <line x1="250" y1="120" x2="250" y2="155" stroke="var(--dim)"/><rect x="246" y="126" width="8" height="22" fill="var(--dim)"/>
          <line x1="280" y1="90" x2="280" y2="130" stroke="var(--dim)"/><rect x="276" y="98" width="8" height="24" fill="var(--dim)"/>
          <line x1="310" y1="105" x2="310" y2="140" stroke="var(--dim)"/><rect x="306" y="110" width="8" height="24" fill="var(--dim)"/>
          <line x1="340" y1="75" x2="340" y2="115" stroke="var(--dim)"/><rect x="336" y="82" width="8" height="26" fill="var(--dim)"/>
        </g>
        <!-- EMA suave encima -->
        <path d="M70 170 L100 155 L130 162 L160 145 L190 152 L220 130 L250 138 L280 115 L310 122 L340 100"
              fill="none" stroke="currentColor" stroke-width="2"/>
        <text x="360" y="100" fill="currentColor" font-size="10">EMA suaviza el ruido</text>
        <text x="255" y="35" fill="var(--dim)" font-size="10" text-anchor="middle">la linea sigue el rumbo sin marearte con cada vela</text>
      </svg>
      <figcaption>Cada vela por su cuenta es ruido. La media móvil los junta en una línea suave que muestra el rumbo real.</figcaption>
    </figure>
  </section>

  <section class="lec-sec">
    <h2>Las dos líneas juntas: el orden lo es todo</h2>
    <p>La magia no está en una línea, sino en <b>cómo se acomodan las dos</b>. El orden en que quedan la EMA 14 y la EMA 50 te dice la tendencia de un golpe:</p>
    <ul>
      <li><b>EMA 14 por ENCIMA de la EMA 50</b> = <span style="color:var(--up)">tendencia alcista</span> (el mercado sube). La línea rápida jala hacia arriba.</li>
      <li><b>EMA 14 por DEBAJO de la EMA 50</b> = <span style="color:var(--down)">tendencia bajista</span> (el mercado baja). La línea rápida jala hacia abajo.</li>
      <li><b>Las dos enredadas, cruzándose</b> = sin tendencia clara, mercado indeciso. Mejor esperar.</li>
    </ul>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 250" style="width:100%;height:auto;display:block" font-family="monospace">
        <!-- alcista -->
        <path d="M40 180 L70 165 L100 150 L130 130 L160 110" fill="none" stroke="var(--up)" stroke-width="2"/>
        <path d="M40 195 L70 188 L100 180 L130 168 L160 155" fill="none" stroke="var(--dim)" stroke-width="2"/>
        <text x="100" y="220" fill="var(--up)" font-size="10" text-anchor="middle">ALCISTA</text>
        <text x="100" y="234" fill="var(--dim)" font-size="8" text-anchor="middle">14 arriba de 50</text>
        <text x="165" y="112" fill="var(--up)" font-size="8">14</text>
        <text x="165" y="158" fill="var(--dim)" font-size="8">50</text>
        <line x1="185" y1="30" x2="185" y2="220" stroke="var(--line)" stroke-width="0.8" stroke-dasharray="3 3"/>
        <!-- bajista -->
        <path d="M210 90 L240 110 L270 130 L300 150 L330 170" fill="none" stroke="var(--down)" stroke-width="2"/>
        <path d="M210 105 L240 115 L270 125 L300 138 L330 150" fill="none" stroke="var(--dim)" stroke-width="2"/>
        <text x="270" y="220" fill="var(--down)" font-size="10" text-anchor="middle">BAJISTA</text>
        <text x="270" y="234" fill="var(--dim)" font-size="8" text-anchor="middle">14 abajo de 50</text>
        <text x="335" y="172" fill="var(--down)" font-size="8">14</text>
        <text x="335" y="150" fill="var(--dim)" font-size="8">50</text>
        <line x1="355" y1="30" x2="355" y2="220" stroke="var(--line)" stroke-width="0.8" stroke-dasharray="3 3"/>
        <!-- enredado -->
        <path d="M375 120 L400 140 L420 115 L445 135 L465 118" fill="none" stroke="var(--up)" stroke-width="2"/>
        <path d="M375 130 L400 118 L420 138 L445 116 L465 134" fill="none" stroke="var(--dim)" stroke-width="2"/>
        <text x="420" y="220" fill="currentColor" font-size="10" text-anchor="middle">INDECISO</text>
        <text x="420" y="234" fill="var(--dim)" font-size="8" text-anchor="middle">enredadas: espera</text>
      </svg>
      <figcaption>El orden de las dos líneas es tu semáforo: 14 arriba = verde para comprar, 14 abajo = rojo, enredadas = amarillo, espera.</figcaption>
    </figure>
    <div class="lec-callout">
      <b>Ojo</b>
      <p>La EMA 50 es tu jefe. En un día alcista sano, el precio se queda ARRIBA de la EMA 50 casi todo el tiempo. Si de repente el precio se hunde por debajo de la EMA 50 y se queda ahí, la fiesta alcista probablemente se acabó. Respeta a la línea lenta.</p>
    </div>
  </section>

  <section class="lec-sec">
    <h2>La distancia entre líneas: fuerza de la tendencia</h2>
    <p>No solo importa el orden, también <b>qué tan separadas</b> están. Piénsalo como el acelerador de un coche:</p>
    <ul>
      <li><b>Líneas muy separadas y abiertas</b> = tendencia fuerte, mucha velocidad. El mercado va con ganas.</li>
      <li><b>Líneas juntitas, casi pegadas</b> = tendencia débil o pausada. El mercado está dudando o descansando.</li>
    </ul>
    <p>Cuando las líneas se abren como abanico, la tendencia está acelerando y vas cómodo con ella. Cuando se juntan y se aplanan, el mercado pierde fuerza: momento de tener cuidado o de esperar el siguiente movimiento.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 220" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="200" x2="470" y2="200" stroke="var(--line)" stroke-width="1"/>
        <!-- juntas -->
        <path d="M50 150 L110 148 L150 145" fill="none" stroke="var(--up)" stroke-width="2"/>
        <path d="M50 158 L110 156 L150 152" fill="none" stroke="var(--dim)" stroke-width="2"/>
        <text x="100" y="180" fill="var(--dim)" font-size="9" text-anchor="middle">juntas: debil</text>
        <!-- abriendo -->
        <path d="M150 145 L230 110 L320 60" fill="none" stroke="var(--up)" stroke-width="2"/>
        <path d="M150 152 L230 135 L320 110" fill="none" stroke="var(--dim)" stroke-width="2"/>
        <text x="270" y="180" fill="var(--up)" font-size="9" text-anchor="middle">abriendo: fuerte</text>
        <path d="M330 55 L330 110" stroke="currentColor" stroke-width="1" fill="none"/>
        <path d="M336 82 L360 82" stroke="currentColor" stroke-width="0.8" fill="none"/>
        <text x="363" y="85" fill="currentColor" font-size="8">mas separacion = mas fuerza</text>
      </svg>
      <figcaption>Cuando las EMAs se abren como abanico, la tendencia acelera. Cuando se pegan, se está frenando.</figcaption>
    </figure>
    <div class="lec-ejemplo">
      <b>Ejemplo</b>
      <p>Abres el gráfico a media mañana. La EMA 14 va claramente arriba de la EMA 50, y la separación entre ambas viene creciendo vela a vela: el precio hace nuevos máximos y se mantiene por encima de la EMA 50. Lectura: tendencia alcista fuerte y sana. No es momento de buscar ventas; es momento de buscar oportunidades de compra a favor de esa corriente. Si más tarde las líneas se juntan y el precio empieza a cruzar la EMA 50 hacia abajo, la corriente está perdiendo fuerza y bajas la guardia.</p>
    </div>
  </section>

  <section class="lec-sec">
    <h2>Regla NorthPoint: opera SOLO a favor de las EMAs</h2>
    <p>Esta es la disciplina que cambia todo. El método no busca adivinar giros ni comprar en el fondo ni vender en la punta. Busca <b>subirse a la corriente que ya existe</b>. Y las EMAs te dicen cuál es esa corriente.</p>
    <ul>
      <li>Si las EMAs marcan alcista, <b>solo buscas compras</b>. Ignoras las señales de venta ese día.</li>
      <li>Si marcan bajista, <b>solo buscas ventas</b>. Ignoras las compras.</li>
      <li>Si están enredadas, <b>no fuerzas nada</b>. Esperas a que se ordenen.</li>
    </ul>
    <p>Esto es como remar a favor del río en lugar de contra la corriente. Todo lo demás que aprendas (ORB, estructura, setups) se filtra por esta regla: nada que vaya contra las EMAs.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 180" style="width:100%;height:auto;display:block" font-family="monospace">
        <!-- rio con flecha -->
        <path d="M40 90 L440 90" stroke="var(--up)" stroke-width="2" fill="none" marker-end="url(#flow5a)"/>
        <defs><marker id="flow5a" markerWidth="10" markerHeight="10" refX="7" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10" fill="var(--up)"/></marker></defs>
        <text x="240" y="80" fill="var(--up)" font-size="10" text-anchor="middle">CORRIENTE (lo que dicen las EMAs)</text>
        <!-- remador a favor -->
        <circle cx="150" cy="115" r="8" fill="none" stroke="var(--up)" stroke-width="1.5"/>
        <path d="M150 123 L150 140 M150 128 L165 132" stroke="var(--up)" stroke-width="1.5" fill="none"/>
        <text x="150" y="160" fill="var(--up)" font-size="9" text-anchor="middle">a favor: SI</text>
        <!-- remador en contra -->
        <circle cx="330" cy="115" r="8" fill="none" stroke="var(--down)" stroke-width="1.5"/>
        <path d="M330 123 L330 140 M330 128 L315 132" stroke="var(--down)" stroke-width="1.5" fill="none"/>
        <text x="330" y="160" fill="var(--down)" font-size="9" text-anchor="middle">en contra: NO</text>
      </svg>
      <figcaption>Rema a favor del río. Las EMAs marcan la corriente; el método solo opera en esa dirección.</figcaption>
    </figure>
  </section>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>Una <b>media móvil</b> promedia el precio y lo dibuja como línea suave; la <b>EMA</b> pesa más lo reciente.</li>
      <li><b>EMA 14</b> = rápida, pegada al precio. <b>EMA 50</b> = lenta, la tendencia de fondo (tu jefe).</li>
      <li><b>14 arriba de 50</b> = alcista; <b>14 abajo de 50</b> = bajista; enredadas = espera.</li>
      <li>La <b>separación</b> entre líneas mide la fuerza: abiertas = fuerte, juntas = débil.</li>
      <li>Regla NorthPoint: <b>opera solo a favor de las EMAs</b>, como remar a favor del río.</li>
    </ul>
  </div>
</div>`,

  // ============================================================
  // L5B — EMAs 14/50: El cruce y el pullback
  // ============================================================
  'l5b': `
<div class="lec">
  <h1 class="lec-h1">EMAs 14/50 — El cruce y el pullback</h1>
  <p class="lec-lede">Ya sabes leer el orden de las dos EMAs. Ahora vienen las dos señales de entrada que nacen de ellas: el <b>cruce</b> (cuando las líneas se cruzan y cambia la tendencia) y el <b>pullback</b> (cuando el precio regresa a tocar la EMA para tomar aire antes de seguir). Estas dos jugadas son el pan de cada día del método.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>El pullback es como un corredor de maratón que ya va a la cabeza. No corre a tope todo el tiempo: baja el ritmo unos metros para respirar, toma agua, y vuelve a acelerar. Ese respiro no significa que va a perder; es parte de correr bien. El precio hace lo mismo cuando regresa a la EMA: no se está dando la vuelta, solo está respirando antes de seguir. Y ese respiro es tu mejor momento para subirte con él.</p>
  </div>

  <section class="lec-sec">
    <h2>Señal 1: el cruce (crossover)</h2>
    <p>Un <b>cruce</b> pasa cuando la EMA 14 (la rápida) cruza a la EMA 50 (la lenta). Es el momento exacto en que la tendencia cambia de bando:</p>
    <ul>
      <li><b>Cruce alcista (golden cross):</b> la EMA 14 sube y cruza por encima de la EMA 50. Señal de que empieza tendencia alcista. Buscas compras.</li>
      <li><b>Cruce bajista (death cross):</b> la EMA 14 baja y cruza por debajo de la EMA 50. Señal de que empieza tendencia bajista. Buscas ventas.</li>
    </ul>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 240" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="210" x2="470" y2="210" stroke="var(--line)" stroke-width="1"/>
        <!-- cruce alcista -->
        <path d="M50 160 L110 155 L160 130 L220 90 L280 60" fill="none" stroke="var(--up)" stroke-width="2"/>
        <path d="M50 130 L110 140 L160 148 L220 140 L280 128" fill="none" stroke="var(--dim)" stroke-width="2"/>
        <circle cx="150" cy="141" r="9" fill="none" stroke="currentColor" stroke-width="1.4"/>
        <path d="M150 141 L150 195" stroke="currentColor" stroke-width="0.8" stroke-dasharray="3 3"/>
        <text x="150" y="228" fill="var(--up)" font-size="10" text-anchor="middle">CRUCE ALCISTA</text>
        <text x="285" y="60" fill="var(--up)" font-size="8">14</text>
        <text x="285" y="128" fill="var(--dim)" font-size="8">50</text>
        <text x="150" y="120" fill="currentColor" font-size="8" text-anchor="middle">14 cruza</text>
        <text x="150" y="110" fill="currentColor" font-size="8" text-anchor="middle">arriba</text>
        <line x1="330" y1="30" x2="330" y2="210" stroke="var(--line)" stroke-width="0.8" stroke-dasharray="3 3"/>
      </svg>
      <figcaption>El cruce alcista: la línea rápida (14) sube y cruza por encima de la lenta (50). El mercado cambió de rumbo hacia arriba.</figcaption>
    </figure>
    <div class="lec-callout">
      <b>Ojo</b>
      <p>El cruce solo llega TARDE por definición: para cuando las líneas se cruzan, buena parte del movimiento ya pasó. Por eso el cruce sirve más para confirmar la nueva tendencia que para entrar justo. La entrada fina casi siempre es el pullback (lo que sigue).</p>
    </div>
  </section>

  <section class="lec-sec">
    <h2>Señal 2: el pullback (la joya del método)</h2>
    <p>Un <b>pullback</b> (retroceso) es cuando, dentro de una tendencia que ya existe, el precio regresa hacia atrás un poquito antes de seguir en la misma dirección. En una tendencia alcista, el precio sube, se devuelve un cachito, y vuelve a subir. Ese "se devuelve un cachito" es el pullback.</p>
    <p>Lo hermoso es que el precio muchas veces regresa <b>justo hasta la EMA 14 o la EMA 50</b> y ahí rebota para seguir. Las EMAs actúan como trampolín. Eso te da un punto exacto para entrar: esperas el pullback a la EMA, ves que rebota, y te subes a favor de la tendencia.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 260" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="230" x2="470" y2="230" stroke="var(--line)" stroke-width="1"/>
        <!-- EMA 50 subiendo -->
        <path d="M50 200 L120 175 L200 148 L280 120 L360 92 L440 65" fill="none" stroke="var(--dim)" stroke-width="2"/>
        <text x="445" y="65" fill="var(--dim)" font-size="8">50</text>
        <!-- precio con pullbacks (linea) -->
        <path d="M50 190 L90 150 L120 170 L160 120 L200 145 L250 95 L290 120 L340 70 L380 95 L430 45"
              fill="none" stroke="currentColor" stroke-width="1.6"/>
        <!-- marcar puntos de pullback donde toca la EMA -->
        <circle cx="120" cy="170" r="6" fill="var(--up)"/>
        <circle cx="200" cy="145" r="6" fill="var(--up)"/>
        <circle cx="290" cy="120" r="6" fill="var(--up)"/>
        <circle cx="380" cy="95" r="6" fill="var(--up)"/>
        <text x="120" y="200" fill="var(--up)" font-size="8" text-anchor="middle">pullback</text>
        <text x="290" y="150" fill="var(--up)" font-size="8" text-anchor="middle">pullback</text>
        <text x="240" y="35" fill="var(--dim)" font-size="10" text-anchor="middle">el precio sube haciendo escaleras: sube, respira en la EMA, sube</text>
      </svg>
      <figcaption>En tendencia alcista, cada vez que el precio regresa a la EMA y rebota es un pullback: tu entrada a favor de la corriente.</figcaption>
    </figure>
  </section>

  <section class="lec-sec">
    <h2>Por qué el pullback es mejor que perseguir</h2>
    <p>Imagina dos formas de subirte a la tendencia alcista:</p>
    <ul>
      <li><b>Perseguir:</b> ver que el precio ya subió mucho y comprar arriba, con prisa, por miedo a quedarte fuera. Problema: entras caro y tu stop queda lejísimos. Si rebota justo ahí, te comió.</li>
      <li><b>Pullback:</b> esperar con paciencia a que el precio regrese a la EMA, comprar en el respiro. Ventaja: entras barato, tu stop queda cerquita (justo abajo de la EMA), y arriesgas poco para ganar mucho.</li>
    </ul>
    <p>El pullback te da la mejor relación entre lo que arriesgas y lo que puedes ganar. Es la diferencia entre comprar en oferta y comprar en la fila con pánico.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 230" style="width:100%;height:auto;display:block" font-family="monospace">
        <!-- perseguir -->
        <path d="M40 180 L80 120 L120 70" fill="none" stroke="currentColor" stroke-width="1.6"/>
        <circle cx="120" cy="70" r="6" fill="var(--down)"/>
        <text x="120" y="55" fill="var(--down)" font-size="9" text-anchor="middle">entrar aqui</text>
        <line x1="120" y1="70" x2="120" y2="160" stroke="var(--down)" stroke-width="1" stroke-dasharray="3 3"/>
        <text x="150" y="130" fill="var(--down)" font-size="8">stop LEJOS</text>
        <text x="90" y="210" fill="var(--down)" font-size="10" text-anchor="middle">PERSEGUIR (malo)</text>
        <line x1="240" y1="30" x2="240" y2="210" stroke="var(--line)" stroke-width="0.8" stroke-dasharray="3 3"/>
        <!-- pullback -->
        <path d="M270 180 L310 120 L340 150 L390 90" fill="none" stroke="currentColor" stroke-width="1.6"/>
        <path d="M270 190 L340 160 L410 120" fill="none" stroke="var(--dim)" stroke-width="1.6"/>
        <circle cx="340" cy="150" r="6" fill="var(--up)"/>
        <text x="340" y="135" fill="var(--up)" font-size="9" text-anchor="middle">entrar aqui</text>
        <line x1="340" y1="150" x2="340" y2="172" stroke="var(--up)" stroke-width="1" stroke-dasharray="3 3"/>
        <text x="362" y="168" fill="var(--up)" font-size="8">stop CERCA</text>
        <text x="350" y="210" fill="var(--up)" font-size="10" text-anchor="middle">PULLBACK (bueno)</text>
      </svg>
      <figcaption>Perseguir te deja el stop lejos y arriesgas mucho. El pullback te deja entrar barato con el stop pegado a la EMA.</figcaption>
    </figure>
  </section>

  <section class="lec-sec">
    <h2>Cómo operar un pullback, paso a paso</h2>
    <ul>
      <li><b>Paso 1.</b> Confirma la tendencia con las EMAs (14 arriba de 50 para alcista).</li>
      <li><b>Paso 2.</b> Espera a que el precio se aleje y luego <b>regrese hacia la EMA</b> (14 o 50).</li>
      <li><b>Paso 3.</b> Observa cómo reacciona al tocar la EMA. Quieres ver que <b>rebota</b>: una vela que rechaza el nivel y cierra a favor de la tendencia.</li>
      <li><b>Paso 4.</b> Entras cuando esa vela de rebote confirma. Tu stop va justo del otro lado de la EMA.</li>
      <li><b>Paso 5.</b> Tu meta es el máximo anterior o más allá, a favor de la corriente.</li>
    </ul>
    <div class="lec-callout">
      <b>Ojo</b>
      <p>Un pullback sano es tranquilo y ordenado: velas chiquitas que bajan de a poco hacia la EMA. Si el "pullback" viene con velas enormes y violentas rompiendo la EMA 50 de un golpe, eso no es respiro: es posible cambio de tendencia. Ahí no entras; esperas.</p>
    </div>
    <div class="lec-ejemplo">
      <b>Ejemplo</b>
      <p>Tendencia alcista clara, EMA 14 sobre EMA 50, precio en 20,080. El precio se devuelve suave hasta 20,050, justo donde va pasando la EMA 14. Ahí aparece una vela verde que rebota y cierra en 20,058. Entras en 20,059, pones el stop en 20,044 (unos puntos abajo de la EMA, por si acaso) y tu meta es el máximo previo en 20,090 o más. Arriesgaste 15 puntos para buscar 30 o más: el pullback te dio una entrada limpia y barata.</p>
    </div>
  </section>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>El <b>cruce</b> (14 cruza a 50) confirma un cambio de tendencia, pero llega tarde para entrar.</li>
      <li>El <b>pullback</b> es cuando el precio regresa a la EMA para respirar y luego sigue: la mejor entrada.</li>
      <li>Perseguir te deja el stop lejos; el <b>pullback</b> te deja entrar barato con el stop pegado a la EMA.</li>
      <li>Espera el rebote en la EMA, entra con la vela que confirma, stop del otro lado, meta a favor de la tendencia.</li>
      <li>Pullback sano = velas chiquitas y ordenadas. Velas violentas que rompen la EMA 50 = posible giro, no entres.</li>
    </ul>
  </div>
</div>`,

  // ============================================================
  // L6A — SMC: Estructura BOS y CHoCH
  // ============================================================
  'l6a': `
<div class="lec">
  <h1 class="lec-h1">SMC — Estructura: BOS y CHoCH</h1>
  <p class="lec-lede">SMC quiere decir <b>Smart Money Concepts</b>: la idea de leer el mercado como lo leen los grandes (bancos, fondos, el "dinero inteligente"). Todo empieza por la <b>estructura</b>: la forma en que el precio hace picos y valles. Con dos siglas, BOS y CHoCH, vas a saber si la tendencia sigue o si acaba de cambiar. Es más fácil de lo que suena.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Imagina a alguien subiendo una escalera: cada escalón que pisa es más alto que el anterior, y cuando descansa, descansa en un escalón más alto que el descanso pasado. Eso es una tendencia alcista: máximos más altos y mínimos más altos. El día que esa persona pisa un escalón MÁS BAJO que el descanso anterior, algo cambió: empezó a bajar la escalera. Leer estructura es solo ver si los escalones siguen subiendo o si de repente uno bajó.</p>
  </div>

  <section class="lec-sec">
    <h2>Máximos y mínimos: los ladrillos de la estructura</h2>
    <p>El precio nunca va en línea recta. Sube y baja formando <b>picos</b> (máximos) y <b>valles</b> (mínimos). La estructura es simplemente el patrón que forman esos picos y valles:</p>
    <ul>
      <li><b>Tendencia alcista:</b> cada pico es más alto que el anterior (máximos más altos) y cada valle es más alto que el anterior (mínimos más altos). Todo va escalando hacia arriba.</li>
      <li><b>Tendencia bajista:</b> cada pico es más bajo que el anterior (máximos más bajos) y cada valle es más bajo (mínimos más bajos). Todo va escalando hacia abajo.</li>
    </ul>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 250" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="230" x2="470" y2="230" stroke="var(--line)" stroke-width="1"/>
        <!-- alcista escalonado -->
        <path d="M50 190 L90 140 L120 170 L170 100 L200 130 L250 60" fill="none" stroke="var(--up)" stroke-width="1.8"/>
        <circle cx="90" cy="140" r="4" fill="var(--up)"/><text x="90" y="132" fill="var(--dim)" font-size="7" text-anchor="middle">max1</text>
        <circle cx="170" cy="100" r="4" fill="var(--up)"/><text x="170" y="92" fill="var(--dim)" font-size="7" text-anchor="middle">max2 mas alto</text>
        <circle cx="120" cy="170" r="4" fill="var(--up)"/><text x="120" y="188" fill="var(--dim)" font-size="7" text-anchor="middle">min1</text>
        <circle cx="200" cy="130" r="4" fill="var(--up)"/><text x="205" y="148" fill="var(--dim)" font-size="7">min2 mas alto</text>
        <text x="150" y="245" fill="var(--up)" font-size="10" text-anchor="middle">ALCISTA: todo escala arriba</text>
        <line x1="285" y1="30" x2="285" y2="230" stroke="var(--line)" stroke-width="0.8" stroke-dasharray="3 3"/>
        <!-- bajista -->
        <path d="M310 60 L350 110 L380 80 L420 150 L445 120 L465 180" fill="none" stroke="var(--down)" stroke-width="1.8"/>
        <circle cx="380" cy="80" r="4" fill="var(--down)"/>
        <circle cx="445" cy="120" r="4" fill="var(--down)"/>
        <text x="400" y="245" fill="var(--down)" font-size="10" text-anchor="middle">BAJISTA: todo escala abajo</text>
      </svg>
      <figcaption>Alcista = picos y valles cada vez más altos. Bajista = picos y valles cada vez más bajos. Ese escalonado ES la estructura.</figcaption>
    </figure>
  </section>

  <section class="lec-sec">
    <h2>BOS: Break of Structure (la tendencia continúa)</h2>
    <p><b>BOS</b> significa "ruptura de estructura" (Break of Structure). Suena a que algo se rompe mal, pero es al revés: un BOS <b>confirma que la tendencia sigue viva y con fuerza</b>.</p>
    <p>En una tendencia alcista, un BOS ocurre cuando el precio rompe por encima del <b>máximo anterior</b>. O sea: hizo un pico nuevo más alto que el pico pasado. Eso confirma que los compradores siguen mandando y la subida continúa. En bajista es al revés: el precio rompe por debajo del mínimo anterior, confirmando que la bajada sigue.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 240" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="220" x2="470" y2="220" stroke="var(--line)" stroke-width="1"/>
        <!-- estructura alcista con BOS -->
        <path d="M50 180 L110 110 L150 150 L230 110 L270 145 L360 70" fill="none" stroke="var(--up)" stroke-width="1.8"/>
        <!-- linea del maximo anterior -->
        <line x1="110" y1="110" x2="400" y2="110" stroke="var(--dim)" stroke-width="1" stroke-dasharray="5 4"/>
        <text x="405" y="113" fill="var(--dim)" font-size="9">max anterior</text>
        <circle cx="230" cy="110" r="5" fill="none" stroke="currentColor" stroke-width="1.4"/>
        <text x="230" y="95" fill="var(--up)" font-size="10" text-anchor="middle">BOS</text>
        <path d="M230 110 L230 130" stroke="currentColor" stroke-width="0.8"/>
        <text x="240" y="140" fill="currentColor" font-size="8">rompe arriba: sigue subiendo</text>
      </svg>
      <figcaption>BOS alcista: el precio rompe por encima del máximo anterior, confirmando que la tendencia alcista continúa.</figcaption>
    </figure>
    <div class="lec-callout">
      <b>Ojo</b>
      <p>BOS = tendencia CONTINÚA. Es tu luz verde para seguir operando a favor. Cada BOS es el mercado firmando que el rumbo se mantiene. No le tengas miedo a la palabra "ruptura": aquí es buena noticia si vas a favor.</p>
    </div>
  </section>

  <section class="lec-sec">
    <h2>CHoCH: Change of Character (la tendencia cambia)</h2>
    <p><b>CHoCH</b> (se lee "choch") significa "cambio de carácter" (Change of Character). Esta es la señal de alarma: la tendencia <b>puede estar cambiando de dirección</b>.</p>
    <p>En una tendencia alcista, todo iba haciendo mínimos más altos. El CHoCH ocurre cuando, por primera vez, el precio rompe por debajo del <b>mínimo anterior</b>. Ese escalón que bajó rompe el patrón: los compradores perdieron el control y quizá empieza una bajada. Es el primer aviso de que la fiesta alcista podría acabarse.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 250" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="230" x2="470" y2="230" stroke="var(--line)" stroke-width="1"/>
        <!-- subida y luego CHoCH -->
        <path d="M50 180 L100 120 L140 155 L200 90 L250 135 L300 105 L360 190" fill="none" stroke="currentColor" stroke-width="1.8"/>
        <!-- pintar tramo alcista verde y quiebre rojo -->
        <path d="M50 180 L100 120 L140 155 L200 90 L250 135" fill="none" stroke="var(--up)" stroke-width="1.8"/>
        <path d="M300 105 L360 190" fill="none" stroke="var(--down)" stroke-width="1.8"/>
        <!-- linea del minimo anterior -->
        <line x1="140" y1="155" x2="380" y2="155" stroke="var(--dim)" stroke-width="1" stroke-dasharray="5 4"/>
        <text x="385" y="158" fill="var(--dim)" font-size="9">min anterior</text>
        <circle cx="330" cy="155" r="6" fill="none" stroke="var(--down)" stroke-width="1.5"/>
        <text x="330" y="135" fill="var(--down)" font-size="10" text-anchor="middle">CHoCH</text>
        <path d="M330 155 L330 175" stroke="var(--down)" stroke-width="0.8"/>
        <text x="340" y="185" fill="var(--down)" font-size="8">rompe abajo: quiza gira</text>
      </svg>
      <figcaption>CHoCH alcista-a-bajista: por primera vez el precio rompe por debajo del mínimo anterior. Primera alarma de que la tendencia gira.</figcaption>
    </figure>
  </section>

  <section class="lec-sec">
    <h2>BOS vs CHoCH: la foto completa</h2>
    <p>La forma más fácil de tenerlo claro: mientras el precio siga rompiendo en la <b>dirección de la tendencia</b>, es BOS (continúa). Cuando el precio rompe <b>contra la tendencia</b> por primera vez, es CHoCH (cambia). Una tendencia normalmente hace varios BOS seguidos y un día termina con un CHoCH.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 240" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="220" x2="470" y2="220" stroke="var(--line)" stroke-width="1"/>
        <path d="M50 190 L90 140 L120 165 L170 110 L200 140 L250 80 L290 120 L340 100 L400 200"
              fill="none" stroke="currentColor" stroke-width="1.7"/>
        <!-- BOS marks -->
        <line x1="90" y1="140" x2="180" y2="140" stroke="var(--dim)" stroke-width="0.8" stroke-dasharray="4 3"/>
        <circle cx="170" cy="110" r="4" fill="var(--up)"/><text x="170" y="100" fill="var(--up)" font-size="8" text-anchor="middle">BOS</text>
        <line x1="170" y1="110" x2="260" y2="110" stroke="var(--dim)" stroke-width="0.8" stroke-dasharray="4 3"/>
        <circle cx="250" cy="80" r="4" fill="var(--up)"/><text x="250" y="70" fill="var(--up)" font-size="8" text-anchor="middle">BOS</text>
        <!-- CHoCH -->
        <line x1="290" y1="120" x2="380" y2="120" stroke="var(--dim)" stroke-width="0.8" stroke-dasharray="4 3"/>
        <circle cx="360" cy="120" r="5" fill="var(--down)"/><text x="368" y="118" fill="var(--down)" font-size="8">CHoCH</text>
        <text x="180" y="240" fill="var(--dim)" font-size="9" text-anchor="middle">varios BOS (sigue) ... hasta que un CHoCH avisa el giro</text>
      </svg>
      <figcaption>La vida de una tendencia: encadena BOS mientras sigue, y termina cuando aparece el primer CHoCH en contra.</figcaption>
    </figure>
    <div class="lec-ejemplo">
      <b>Ejemplo</b>
      <p>El precio sube: hace un máximo en 20,060, retrocede a 20,040, y luego rompe 20,060 llegando a 20,080. Eso es un BOS (rompió el máximo anterior, sigue alcista). Retrocede a 20,065 (mínimo más alto que el 20,040 anterior: sano). Sube de nuevo, otro BOS en 20,095. Pero luego cae y rompe 20,065 hacia abajo hasta 20,050: ese es un CHoCH, la primera vez que rompe un mínimo anterior. Ahí dejas de buscar compras y te pones alerta: la estructura avisó que el viento puede estar cambiando.</p>
    </div>
  </section>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>La <b>estructura</b> es el patrón de picos (máximos) y valles (mínimos) que dibuja el precio.</li>
      <li>Alcista = máximos y mínimos cada vez más altos. Bajista = cada vez más bajos.</li>
      <li><b>BOS</b> (Break of Structure): rompe a favor de la tendencia = la tendencia CONTINÚA. Luz verde.</li>
      <li><b>CHoCH</b> (Change of Character): rompe contra la tendencia por primera vez = puede estar GIRANDO. Alarma.</li>
      <li>Una tendencia encadena varios BOS y termina con un CHoCH.</li>
    </ul>
  </div>
</div>`,

  // ============================================================
  // L6B — SMC: Order blocks y FVG
  // ============================================================
  'l6b': `
<div class="lec">
  <h1 class="lec-h1">SMC — Order blocks y FVG (fair value gaps)</h1>
  <p class="lec-lede">Los grandes jugadores no compran todo de un jaló: dejan huellas. Dos de esas huellas son el <b>order block</b> (la última vela antes de un movimientazo) y el <b>FVG</b> o hueco de valor justo (un espacio que el precio dejó al moverse muy rápido). Aprende a ver esas huellas y sabrás a dónde suele regresar el precio a buscarte.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Cuando un camión pesado arranca de golpe, deja dos cosas en el asfalto: la marca de las llantas donde tomó impulso, y una nube de polvo en el hueco por donde pasó volando. El order block es la marca de las llantas (el punto exacto desde donde el precio tomó impulso) y el FVG es el hueco de polvo (el espacio que dejó por ir tan rápido). Y aquí está lo curioso: el precio suele regresar a pisar esas huellas antes de seguir su camino.</p>
  </div>

  <section class="lec-sec">
    <h2>Order block: la última vela antes del impulso</h2>
    <p>Un <b>order block</b> (bloque de órdenes) es la última vela en contra justo antes de un movimiento fuerte. En simple: si el precio venía bajando y de repente pega un subidón enorme, el order block es la <b>última vela roja</b> antes de ese subidón. ¿Por qué importa? Porque ahí fue donde los grandes cargaron sus compras. Dejaron órdenes sin llenar en esa zona.</p>
    <p>La idea clave: cuando el precio regrese a esa vela más adelante, es probable que <b>rebote</b> desde ahí, porque quedan órdenes de los grandes esperando. Un order block alcista (la última vela roja antes de una subida) funciona como una zona de compra. Un order block bajista (la última vela verde antes de una caída) funciona como zona de venta.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 250" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="230" x2="470" y2="230" stroke="var(--line)" stroke-width="1"/>
        <!-- velas bajando -->
        <g stroke-width="1.4">
          <line x1="70" y1="70" x2="70" y2="110" stroke="var(--down)"/><rect x="64" y="78" width="12" height="28" fill="var(--down)"/>
          <line x1="100" y1="90" x2="100" y2="135" stroke="var(--down)"/><rect x="94" y="98" width="12" height="32" fill="var(--down)"/>
          <!-- order block: ultima roja antes de subir -->
          <line x1="130" y1="120" x2="130" y2="165" stroke="var(--down)"/><rect x="124" y="128" width="12" height="32" fill="var(--down)"/>
        </g>
        <rect x="118" y="122" width="24" height="45" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="4 3"/>
        <text x="130" y="185" fill="currentColor" font-size="8" text-anchor="middle">ORDER</text>
        <text x="130" y="196" fill="currentColor" font-size="8" text-anchor="middle">BLOCK</text>
        <!-- subidon -->
        <g stroke-width="1.4">
          <line x1="165" y1="70" x2="165" y2="130" stroke="var(--up)"/><rect x="159" y="78" width="12" height="45" fill="var(--up)"/>
          <line x1="195" y1="45" x2="195" y2="95" stroke="var(--up)"/><rect x="189" y="52" width="12" height="40" fill="var(--up)"/>
          <line x1="225" y1="35" x2="225" y2="75" stroke="var(--up)"/><rect x="219" y="42" width="12" height="30" fill="var(--up)"/>
        </g>
        <path d="M150 100 L150 60" stroke="var(--up)" stroke-width="1.2" fill="none" marker-end="url(#up6b)"/>
        <defs><marker id="up6b" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto"><path d="M0 6 L4 0 L8 6" fill="var(--up)"/></marker></defs>
        <text x="250" y="55" fill="var(--up)" font-size="9">IMPULSO fuerte</text>
        <!-- regreso al block -->
        <path d="M280 60 L330 100 L370 140" fill="none" stroke="var(--dim)" stroke-width="1.4" stroke-dasharray="4 3"/>
        <line x1="118" y1="145" x2="400" y2="145" stroke="var(--dim)" stroke-width="0.8" stroke-dasharray="3 3"/>
        <text x="330" y="165" fill="var(--dim)" font-size="8">el precio regresa a la zona y rebota</text>
      </svg>
      <figcaption>El order block es la última vela roja antes del impulso alcista. Cuando el precio regresa a esa zona, suele rebotar: ahí quedaron órdenes de los grandes.</figcaption>
    </figure>
    <div class="lec-callout">
      <b>Ojo</b>
      <p>No cualquier vela es order block. Tiene que ser la última en contra ANTES de un movimiento que rompa estructura (un BOS de la lección pasada). Si no hubo movimiento fuerte después, no es order block, es una vela cualquiera.</p>
    </div>
  </section>

  <section class="lec-sec">
    <h2>FVG: el hueco de valor justo</h2>
    <p><b>FVG</b> significa Fair Value Gap: hueco de valor justo. Es un espacio vacío que el precio deja cuando se mueve tan rápido que "se salta" un rango de precios sin negociar bien ahí. Se ve como un hueco entre tres velas seguidas.</p>
    <p>La forma técnica de detectarlo: tomas tres velas seguidas. Si entre la <b>mecha de la primera</b> y la <b>mecha de la tercera</b> queda un espacio que la vela de en medio no llenó, eso es un FVG. Es como un escalón de aire en el gráfico.</p>
    <p>¿Por qué importa? Porque el mercado "odia" los huecos: tiende a <b>regresar a rellenarlos</b>. El precio suele volver al FVG, taparlo, y desde ahí continuar. Eso te da otra zona donde esperar al precio.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 250" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="230" x2="470" y2="230" stroke="var(--line)" stroke-width="1"/>
        <!-- tres velas con hueco -->
        <!-- vela 1 -->
        <line x1="90" y1="150" x2="90" y2="200" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="82" y="165" width="16" height="30" fill="var(--up)"/>
        <text x="90" y="218" fill="var(--dim)" font-size="8" text-anchor="middle">vela 1</text>
        <!-- vela 2 grande (el salto) -->
        <line x1="140" y1="70" x2="140" y2="160" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="132" y="85" width="16" height="60" fill="var(--up)"/>
        <text x="140" y="218" fill="var(--dim)" font-size="8" text-anchor="middle">vela 2 (salto)</text>
        <!-- vela 3 -->
        <line x1="190" y1="55" x2="190" y2="110" stroke="var(--up)" stroke-width="1.5"/>
        <rect x="182" y="70" width="16" height="30" fill="var(--up)"/>
        <text x="190" y="218" fill="var(--dim)" font-size="8" text-anchor="middle">vela 3</text>
        <!-- zona FVG: entre mecha de vela1 (150 arriba? tope 150) y mecha de vela3 (110 abajo) -->
        <rect x="60" y="110" width="150" height="40" fill="var(--dim)" opacity="0.20"/>
        <line x1="60" y1="110" x2="210" y2="110" stroke="currentColor" stroke-width="0.9" stroke-dasharray="3 3"/>
        <line x1="60" y1="150" x2="210" y2="150" stroke="currentColor" stroke-width="0.9" stroke-dasharray="3 3"/>
        <text x="135" y="135" fill="currentColor" font-size="10" text-anchor="middle">FVG (hueco)</text>
        <!-- regreso a rellenar -->
        <path d="M240 90 L290 120 L330 132" fill="none" stroke="var(--dim)" stroke-width="1.4" stroke-dasharray="4 3"/>
        <path d="M330 132 L360 100" fill="none" stroke="var(--up)" stroke-width="1.6"/>
        <text x="350" y="160" fill="var(--dim)" font-size="8" text-anchor="middle">regresa, rellena, sigue</text>
      </svg>
      <figcaption>El FVG es el hueco de aire entre la mecha de la primera vela y la de la tercera. El precio suele volver a rellenarlo antes de continuar.</figcaption>
    </figure>
  </section>

  <section class="lec-sec">
    <h2>La combinación poderosa: order block + FVG juntos</h2>
    <p>Cada uno por su cuenta ya es una zona útil. Pero cuando un <b>order block y un FVG coinciden en el mismo lugar</b>, tienes una zona doblemente fuerte. Es como dos testigos diciendo lo mismo: "aquí es donde el precio va a reaccionar". Cuando el precio regresa a una zona donde se apilan el order block y el FVG, la probabilidad de rebote sube mucho.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 230" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="210" x2="470" y2="210" stroke="var(--line)" stroke-width="1"/>
        <!-- zona combinada -->
        <rect x="60" y="120" width="360" height="45" fill="var(--dim)" opacity="0.18"/>
        <line x1="60" y1="120" x2="420" y2="120" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3"/>
        <line x1="60" y1="165" x2="420" y2="165" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3"/>
        <text x="240" y="147" fill="currentColor" font-size="11" text-anchor="middle">ZONA FUERTE: order block + FVG</text>
        <!-- precio baja, entra a la zona, rebota fuerte -->
        <path d="M90 60 L140 100 L180 140 L220 150" fill="none" stroke="var(--dim)" stroke-width="1.5"/>
        <path d="M220 150 L270 100 L320 55 L380 40" fill="none" stroke="var(--up)" stroke-width="1.8"/>
        <circle cx="220" cy="150" r="6" fill="var(--up)"/>
        <text x="220" y="185" fill="var(--up)" font-size="9" text-anchor="middle">rebote potente</text>
      </svg>
      <figcaption>Cuando order block y FVG se apilan en el mismo precio, la zona es doblemente confiable: el rebote suele ser más limpio.</figcaption>
    </figure>
    <div class="lec-ejemplo">
      <b>Ejemplo</b>
      <p>El precio pega un impulso alcista fuerte desde 20,030 hasta 20,090. La última vela roja antes del impulso (el order block) tiene su cuerpo entre 20,032 y 20,038. Y en el arranque quedó un FVG entre 20,040 y 20,048. Ambas zonas están casi pegadas, entre 20,032 y 20,048. Más tarde el precio retrocede y baja justo a 20,045: entra en la zona combinada. Ahí aparece una vela de rechazo y rebota. Entras la compra con el stop apenas debajo del order block (20,030), sabiendo que si de verdad rompe esa zona, la idea estaba mal y sales barato.</p>
    </div>
  </section>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li><b>Order block</b>: la última vela en contra antes de un movimiento fuerte (que rompe estructura). Zona donde cargaron los grandes.</li>
      <li>El precio suele <b>rebotar</b> al regresar a un order block, porque quedan órdenes ahí.</li>
      <li><b>FVG</b> (fair value gap): un hueco de aire entre la mecha de la vela 1 y la de la vela 3. El precio tiende a regresar a rellenarlo.</li>
      <li>Cuando <b>order block y FVG coinciden</b> en el mismo precio, la zona es doblemente fuerte.</li>
      <li>Estas zonas te dan puntos exactos para esperar al precio con el stop bien pegado.</li>
    </ul>
  </div>
</div>`,

  // ============================================================
  // L6C — SMC: Liquidez, dónde cazan tu stop
  // ============================================================
  'l6c': `
<div class="lec">
  <h1 class="lec-h1">SMC — Liquidez: dónde cazan tu stop</h1>
  <p class="lec-lede">Esta es quizá la lección más reveladora de todo el programa. Los grandes jugadores necesitan que alguien les venda cuando quieren comprar mucho. ¿Dónde encuentran a esos vendedores? En tu <b>stop</b> y en el de miles como tú. A esos puntos se les llama <b>liquidez</b>, y el mercado los va a cazar antes de irse a donde de verdad quería ir. Entiéndelo y dejarás de ser la presa.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Imagina que quieres comprar 500 boletos para un concierto, pero en la taquilla solo hay 20. Necesitas que mucha gente que YA tiene boletos los suelte de golpe. ¿Cómo los haces soltar? Corres el rumor de que el concierto se canceló. La gente asustada vende sus boletos baratísimos, y tú los compras todos. Cuando ya tienes tus 500, sale la verdad: el concierto sigue en pie y el precio se dispara. Eso hace el mercado con los stops: provoca el pánico justo para comprarte barato antes de subir.</p>
  </div>

  <section class="lec-sec">
    <h2>¿Qué es la liquidez?</h2>
    <p><b>Liquidez</b> es, simplemente, dónde hay muchas órdenes juntas esperando ejecutarse. Y el lugar más predecible donde se juntan las órdenes son los <b>stops</b> de los traders. Recuerda: un stop es la orden de seguridad que cierra tu operación si el precio va en tu contra, para no perder de más. Todo el mundo pone sus stops en lugares parecidos y obvios: justo debajo de un mínimo reciente, justo arriba de un máximo reciente.</p>
    <p>Eso crea <b>charcos de liquidez</b>: montones de stops apilados en los mismos niveles. Los grandes ven esos charcos como gasolina. Necesitan esas órdenes para llenar sus posiciones grandes, así que empujan el precio hasta ahí a propósito para activarlos.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 240" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="220" x2="470" y2="220" stroke="var(--line)" stroke-width="1"/>
        <!-- varios minimos alineados -->
        <path d="M50 90 L90 160 L130 100 L170 162 L210 95 L250 161 L300 100" fill="none" stroke="currentColor" stroke-width="1.6"/>
        <line x1="80" y1="163" x2="330" y2="163" stroke="var(--down)" stroke-width="1.2" stroke-dasharray="5 4"/>
        <text x="335" y="166" fill="var(--down)" font-size="9">nivel de stops</text>
        <!-- stops -->
        <text x="90" y="185" fill="var(--down)" font-size="9" text-anchor="middle">S</text>
        <text x="170" y="185" fill="var(--down)" font-size="9" text-anchor="middle">S</text>
        <text x="250" y="185" fill="var(--down)" font-size="9" text-anchor="middle">S</text>
        <text x="170" y="205" fill="var(--dim)" font-size="9" text-anchor="middle">charco de liquidez (stops apilados abajo)</text>
      </svg>
      <figcaption>Muchos mínimos al mismo nivel = muchos stops justo debajo = un charco de liquidez que los grandes querrán barrer.</figcaption>
    </figure>
  </section>

  <section class="lec-sec">
    <h2>La barrida de liquidez (liquidity sweep)</h2>
    <p>Una <b>barrida</b> (sweep, o "caza de stops") es cuando el precio pincha rápidamente ese nivel de stops, los activa todos, y <b>de inmediato se regresa</b>. Es un pico rápido y violento que perfora el mínimo, dispara los stops de los que estaban comprados, y regresa como si nada.</p>
    <p>Para el trader novato se ve como "el mercado rompió el soporte, hay que vender". Pero era una trampa: el precio solo bajó a recoger stops y ahora se va para arriba con fuerza. La barrida es el mercado <b>fingiendo debilidad para tomar impulso</b>.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 250" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="230" x2="470" y2="230" stroke="var(--line)" stroke-width="1"/>
        <line x1="60" y1="150" x2="440" y2="150" stroke="var(--down)" stroke-width="1.1" stroke-dasharray="5 4"/>
        <text x="60" y="143" fill="var(--down)" font-size="9">nivel con stops abajo</text>
        <!-- precio baja a barrer y rebota -->
        <path d="M70 100 L120 130 L160 148 L200 185" fill="none" stroke="var(--dim)" stroke-width="1.6"/>
        <!-- la mecha de barrida -->
        <line x1="210" y1="150" x2="210" y2="195" stroke="var(--down)" stroke-width="2"/>
        <rect x="204" y="150" width="12" height="18" fill="var(--up)"/>
        <circle cx="210" cy="190" r="12" fill="none" stroke="var(--down)" stroke-width="1.3" stroke-dasharray="3 2"/>
        <text x="235" y="200" fill="var(--down)" font-size="9">BARRIDA: pincha y regresa</text>
        <!-- rebote fuerte -->
        <path d="M210 165 L260 110 L320 70 L390 45" fill="none" stroke="var(--up)" stroke-width="1.9"/>
        <path d="M330 70 L350 60" stroke="var(--up)" stroke-width="1.2" fill="none" marker-end="url(#up6c)"/>
        <defs><marker id="up6c" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto"><path d="M0 6 L4 0 L8 6" fill="var(--up)"/></marker></defs>
        <text x="340" y="100" fill="var(--up)" font-size="9">a donde de verdad iba</text>
      </svg>
      <figcaption>La barrida: una mecha rápida perfora el nivel, activa los stops, y el precio se regresa con fuerza hacia el lado contrario. Trampa clásica.</figcaption>
    </figure>
    <div class="lec-callout">
      <b>Ojo</b>
      <p>La señal de una barrida es la VELOCIDAD y el rechazo: el precio va al nivel, lo pincha con una mecha larga, y cierra de vuelta del otro lado casi de inmediato. Si el precio rompe el nivel despacio y se QUEDA abajo, eso no es barrida, es una ruptura de verdad. La diferencia: la barrida no se queda; regresa.</p>
    </div>
  </section>

  <section class="lec-sec">
    <h2>Cómo NO ser la presa (y cómo aprovecharlo)</h2>
    <p>Dos lecciones prácticas salen de esto:</p>
    <ul>
      <li><b>No pongas tu stop en el lugar obvio.</b> Si todos ponen el stop justo debajo del mínimo, ese es exactamente el charco que van a barrer. Dale un poco de aire: colócalo un poco más lejos, del otro lado de la zona de barrida, no pegado al nivel evidente.</li>
      <li><b>Usa la barrida como señal de entrada.</b> En vez de asustarte cuando el precio pincha el nivel, espera. Si ves la barrida (pincha y regresa rápido), esa es una de las mejores señales para entrar a favor del rebote. El mercado ya recogió su gasolina; ahora se va a mover de verdad.</li>
    </ul>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 230" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="210" x2="470" y2="210" stroke="var(--line)" stroke-width="1"/>
        <line x1="60" y1="130" x2="440" y2="130" stroke="var(--down)" stroke-width="1" stroke-dasharray="5 4"/>
        <text x="60" y="123" fill="var(--dim)" font-size="9">minimo obvio</text>
        <!-- stop malo -->
        <text x="150" y="150" fill="var(--down)" font-size="9" text-anchor="middle">X stop pegado (te cazan)</text>
        <line x1="150" y1="135" x2="150" y2="145" stroke="var(--down)" stroke-width="1"/>
        <!-- stop bueno -->
        <line x1="330" y1="130" x2="330" y2="180" stroke="var(--up)" stroke-width="1" stroke-dasharray="3 3"/>
        <text x="360" y="178" fill="var(--up)" font-size="9">stop con aire (a salvo)</text>
        <!-- entrada tras barrida -->
        <path d="M60 80 L110 115 L150 165 L180 120 L230 75" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="150" cy="165" r="6" fill="var(--up)"/>
        <text x="150" y="195" fill="var(--up)" font-size="8" text-anchor="middle">entrar tras la barrida</text>
      </svg>
      <figcaption>El stop pegado al mínimo obvio es carnada. Dale aire, y usa la propia barrida como tu señal de entrada.</figcaption>
    </figure>
    <div class="lec-ejemplo">
      <b>Ejemplo</b>
      <p>El precio hizo tres mínimos alineados en 20,020: un charco de stops evidente justo debajo. A las 10:15, una vela cae rápido a 20,014, perfora el nivel, activa todos esos stops, y cierra de vuelta en 20,028: barrida clásica. El novato vendió en el rompimiento y quedó atrapado. Tú, que reconociste la barrida, entraste comprando en 20,030 con el stop en 20,008 (abajo de la mecha de barrida, no pegado al nivel). El precio se fue a 20,075. La trampa que cazó a otros fue tu mejor entrada del día.</p>
    </div>
  </section>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li><b>Liquidez</b> = dónde hay muchas órdenes juntas; los stops apilados son el charco más predecible.</li>
      <li>Todos ponen stops en lugares obvios (bajo mínimos, sobre máximos), creando charcos de liquidez.</li>
      <li>Una <b>barrida</b> (sweep) pincha ese nivel rápido, activa los stops y se regresa: es una trampa, no una ruptura real.</li>
      <li>Distingue barrida (pincha y regresa) de ruptura de verdad (rompe y se queda).</li>
      <li>No pongas el stop en el lugar obvio; dale aire. Y usa la barrida como <b>señal de entrada</b> a favor del rebote.</li>
    </ul>
  </div>
</div>`,

  // ============================================================
  // L7A — A+ Setups: La confluencia que hace un A+
  // ============================================================
  'l7a': `
<div class="lec">
  <h1 class="lec-h1">A+ Setups — La confluencia que hace un A+</h1>
  <p class="lec-lede">Ya tienes todas las piezas: ORB, EMAs, estructura, order blocks, liquidez. Un <b>A+ setup</b> es cuando varias de esas piezas apuntan al MISMO lugar y a la misma dirección al mismo tiempo. A eso se le llama <b>confluencia</b>, y es lo que separa una apuesta cualquiera de la mejor operación del día.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Un detective no manda a alguien a la cárcel por una sola pista. Junta varias: la huella, el testigo, el motivo, la cámara. Cuando cinco pruebas independientes apuntan al mismo sospechoso, ya no es una corazonada, es un caso sólido. Un A+ setup es tu caso sólido: no operas por una sola señal, operas cuando varias señales distintas coinciden en acusar al mismo movimiento.</p>
  </div>

  <section class="lec-sec">
    <h2>¿Qué es la confluencia?</h2>
    <p><b>Confluencia</b> significa que varias señales distintas coinciden apuntando a lo mismo. Cada herramienta que aprendiste da una "opinión" sobre el mercado. Cuando una sola opina, es débil. Cuando tres, cuatro o cinco opinan igual, la probabilidad de acertar sube muchísimo.</p>
    <p>Piénsalo como votos. Cada confluencia es un voto a favor de tu operación. Un trade con un solo voto es arriesgado. Un trade con cinco votos alineados es un A+.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 260" style="width:100%;height:auto;display:block" font-family="monospace">
        <!-- punto central objetivo -->
        <circle cx="240" cy="130" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
        <text x="240" y="165" fill="currentColor" font-size="9" text-anchor="middle">LA ENTRADA</text>
        <!-- flechas de senales convergiendo -->
        <path d="M60 40 L225 118" stroke="var(--up)" stroke-width="1.5" fill="none" marker-end="url(#c7a)"/>
        <text x="55" y="35" fill="var(--dim)" font-size="9">EMAs a favor</text>
        <path d="M420 40 L255 118" stroke="var(--up)" stroke-width="1.5" fill="none" marker-end="url(#c7a)"/>
        <text x="360" y="35" fill="var(--dim)" font-size="9">order block</text>
        <path d="M60 220 L225 142" stroke="var(--up)" stroke-width="1.5" fill="none" marker-end="url(#c7a)"/>
        <text x="55" y="235" fill="var(--dim)" font-size="9">break ORB</text>
        <path d="M420 220 L255 142" stroke="var(--up)" stroke-width="1.5" fill="none" marker-end="url(#c7a)"/>
        <text x="360" y="235" fill="var(--dim)" font-size="9">barrida de liquidez</text>
        <path d="M240 25 L240 115" stroke="var(--up)" stroke-width="1.5" fill="none" marker-end="url(#c7a)"/>
        <text x="240" y="18" fill="var(--dim)" font-size="9" text-anchor="middle">estructura BOS</text>
        <defs><marker id="c7a" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 Z" fill="var(--up)"/></marker></defs>
      </svg>
      <figcaption>Confluencia: varias señales independientes apuntando al mismo punto y a la misma dirección. Ahí nace un A+.</figcaption>
    </figure>
  </section>

  <section class="lec-sec">
    <h2>Las señales que suman votos</h2>
    <p>Estas son las confluencias del método NorthPoint. Cada una que se cumpla es un voto a favor:</p>
    <ul>
      <li><b>Voto 1 — Tendencia (EMAs):</b> el trade va a favor de las EMAs (14 y 50 alineadas en tu dirección). Sin este voto, ni sigas: es el filtro maestro.</li>
      <li><b>Voto 2 — Rango de apertura (ORB):</b> hay un break confirmado del ORH o ORL a tu favor, o el precio respeta una de esas líneas como rebote.</li>
      <li><b>Voto 3 — Estructura (BOS):</b> la estructura confirma tu dirección con un BOS reciente. Los picos y valles van a tu favor.</li>
      <li><b>Voto 4 — Zona (order block / FVG):</b> el precio está reaccionando desde un order block o rellenando un FVG en tu dirección.</li>
      <li><b>Voto 5 — Liquidez (barrida):</b> justo antes, hubo una barrida que cazó los stops del lado contrario. El combustible ya se recogió.</li>
    </ul>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 240" style="width:100%;height:auto;display:block" font-family="monospace">
        <!-- checklist visual -->
        <g font-size="11">
          <rect x="60" y="30" width="18" height="18" fill="none" stroke="var(--up)" stroke-width="1.6"/>
          <path d="M63 39 L68 45 L76 32" fill="none" stroke="var(--up)" stroke-width="2"/>
          <text x="90" y="44" fill="currentColor">EMAs a favor (tendencia)</text>
          <rect x="60" y="62" width="18" height="18" fill="none" stroke="var(--up)" stroke-width="1.6"/>
          <path d="M63 71 L68 77 L76 64" fill="none" stroke="var(--up)" stroke-width="2"/>
          <text x="90" y="76" fill="currentColor">break / rebote del ORB</text>
          <rect x="60" y="94" width="18" height="18" fill="none" stroke="var(--up)" stroke-width="1.6"/>
          <path d="M63 103 L68 109 L76 96" fill="none" stroke="var(--up)" stroke-width="2"/>
          <text x="90" y="108" fill="currentColor">BOS confirma la estructura</text>
          <rect x="60" y="126" width="18" height="18" fill="none" stroke="var(--up)" stroke-width="1.6"/>
          <path d="M63 135 L68 141 L76 128" fill="none" stroke="var(--up)" stroke-width="2"/>
          <text x="90" y="140" fill="currentColor">order block / FVG en la zona</text>
          <rect x="60" y="158" width="18" height="18" fill="none" stroke="var(--up)" stroke-width="1.6"/>
          <path d="M63 167 L68 173 L76 160" fill="none" stroke="var(--up)" stroke-width="2"/>
          <text x="90" y="172" fill="currentColor">barrida de liquidez previa</text>
        </g>
        <text x="240" y="210" fill="var(--up)" font-size="12" text-anchor="middle">5 de 5 = A+</text>
      </svg>
      <figcaption>La checklist de votos. Mientras más casillas marques, más alta la calidad del setup.</figcaption>
    </figure>
  </section>

  <section class="lec-sec">
    <h2>La escala de calidad: A+, B y C</h2>
    <p>No todos los setups son A+, y está bien. Aprende a ponerles nota:</p>
    <ul>
      <li><b>Setup A+ (4-5 votos):</b> muchas confluencias alineadas. Es el trade que quieres. Rara vez aparece, pero cuando lo hace, es de alta probabilidad.</li>
      <li><b>Setup B (2-3 votos):</b> algunas señales coinciden, pero faltan otras. Es aceptable, no emocionante. Con experiencia quizá lo tomes con tamaño reducido.</li>
      <li><b>Setup C (0-1 voto):</b> una sola señal suelta, o señales en conflicto. Esto NO se opera. Es una corazonada disfrazada.</li>
    </ul>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 200" style="width:100%;height:auto;display:block" font-family="monospace">
        <!-- barras de calidad -->
        <rect x="60" y="60" width="100" height="90" fill="var(--up)" opacity="0.25" stroke="var(--up)" stroke-width="1.5"/>
        <text x="110" y="110" fill="var(--up)" font-size="20" text-anchor="middle">A+</text>
        <text x="110" y="168" fill="var(--dim)" font-size="9" text-anchor="middle">4-5 votos: SI</text>
        <rect x="190" y="95" width="100" height="55" fill="var(--dim)" opacity="0.20" stroke="var(--dim)" stroke-width="1.5"/>
        <text x="240" y="130" fill="currentColor" font-size="18" text-anchor="middle">B</text>
        <text x="240" y="168" fill="var(--dim)" font-size="9" text-anchor="middle">2-3 votos: quiza</text>
        <rect x="320" y="120" width="100" height="30" fill="var(--down)" opacity="0.18" stroke="var(--down)" stroke-width="1.5"/>
        <text x="370" y="142" fill="var(--down)" font-size="16" text-anchor="middle">C</text>
        <text x="370" y="168" fill="var(--dim)" font-size="9" text-anchor="middle">0-1 voto: NO</text>
      </svg>
      <figcaption>Ponle nota a cada oportunidad. Solo los A+ (y a veces los B) merecen tu dinero. Los C se dejan pasar sin culpa.</figcaption>
    </figure>
    <div class="lec-callout">
      <b>Ojo</b>
      <p>El error número uno del principiante es convertir un C en A+ con la imaginación. Ves una señal, te emocionas, y "encuentras" confluencias que no están ahí para justificar entrar. La checklist existe para protegerte de ti mismo: si tienes que forzarla, no es A+.</p>
    </div>
  </section>

  <section class="lec-sec">
    <h2>Confluencia real vs. confluencia inventada</h2>
    <p>Ojo con una trampa: no toda coincidencia cuenta. Para que un voto sea válido, la señal tiene que ser <b>independiente</b> y <b>clara</b>. Dos señales que en realidad dicen lo mismo no son dos votos, son uno. Y una señal que tienes que entrecerrar los ojos para ver, no cuenta.</p>
    <div class="lec-ejemplo">
      <b>Ejemplo</b>
      <p>Confluencia REAL: las EMAs marcan alcista (voto 1), el precio barrió los stops debajo de un mínimo y regresó (voto 2), ese mínimo coincide con un order block alcista (voto 3), y al rebotar el precio rompió el máximo anterior haciendo un BOS (voto 4). Cuatro señales distintas, cada una de una herramienta diferente, todas gritando "compra". Eso es A+. Confluencia INVENTADA: "el precio está subiendo y se ve fuerte y creo que va a seguir". Eso es un solo sentimiento repetido tres veces con distintas palabras. Cero votos reales. Es un C disfrazado.</p>
    </div>
  </section>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li><b>Confluencia</b> = varias señales independientes apuntando al mismo lugar y dirección.</li>
      <li>Cada herramienta (EMAs, ORB, estructura, order block/FVG, liquidez) suma un <b>voto</b>.</li>
      <li><b>A+</b> = 4-5 votos (opéralo), <b>B</b> = 2-3 (quizá, con menos tamaño), <b>C</b> = 0-1 (déjalo pasar).</li>
      <li>El voto de las EMAs es obligatorio: sin tendencia a favor, no hay trade.</li>
      <li>No inventes confluencias para justificar la emoción; si tienes que forzarla, no es A+.</li>
    </ul>
  </div>
</div>`,

  // ============================================================
  // L7B — A+ Setups: Entry, stop y target
  // ============================================================
  'l7b': `
<div class="lec">
  <h1 class="lec-h1">A+ Setups — Entry al break, stop y target</h1>
  <p class="lec-lede">Encontraste el A+. Ahora hay que ejecutarlo bien. Tres decisiones definen cada operación: <b>dónde entras</b> (entry), <b>dónde te proteges</b> (stop) y <b>dónde cobras</b> (target). Bien puestas, estas tres cosas te dan la famosa relación <b>1:2</b>: arriesgar 1 para ganar 2. Con eso, hasta acertando menos de la mitad de las veces, ganas dinero.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Es como cruzar un río saltando de piedra en piedra. El entry es la piedra desde donde saltas: quieres una firme, no una resbalosa. El stop es la cuerda de seguridad amarrada a la orilla: si resbalas, te detiene antes de caer al agua profunda. El target es la piedra del otro lado a donde quieres llegar. Un buen salto tiene punto de partida firme, cuerda corta y meta clara. Nunca saltas sin la cuerda puesta.</p>
  </div>

  <section class="lec-sec">
    <h2>El entry: dónde entras exactamente</h2>
    <p>El <b>entry</b> (entrada) es el precio al que abres la operación. En el método NorthPoint entramos <b>al break confirmado</b>: cuando el precio rompe el nivel clave de tu setup (el ORH, el máximo de estructura, la salida del order block) y una vela lo <b>confirma cerrando por fuera</b>, como aprendiste en ORB.</p>
    <p>La disciplina es no adelantarse. No entras "porque ya va a romper"; entras cuando rompió y cerró. Ese pequeño acto de paciencia te ahorra la mayoría de las trampas.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 230" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="210" x2="470" y2="210" stroke="var(--line)" stroke-width="1"/>
        <line x1="40" y1="110" x2="470" y2="110" stroke="var(--up)" stroke-width="1.2"/>
        <text x="44" y="105" fill="var(--up)" font-size="9">nivel clave</text>
        <!-- velas subiendo al nivel -->
        <g stroke-width="1.4">
          <line x1="90" y1="150" x2="90" y2="185" stroke="var(--up)"/><rect x="84" y="158" width="12" height="24" fill="var(--up)"/>
          <line x1="130" y1="125" x2="130" y2="160" stroke="var(--up)"/><rect x="124" y="132" width="12" height="24" fill="var(--up)"/>
          <!-- vela que rompe y cierra arriba -->
          <line x1="170" y1="70" x2="170" y2="120" stroke="var(--up)"/><rect x="164" y="80" width="12" height="28" fill="var(--up)"/>
        </g>
        <circle cx="170" cy="94" r="14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3 2"/>
        <path d="M195 94 L235 94" stroke="currentColor" stroke-width="1" fill="none" marker-end="url(#e7b)"/>
        <defs><marker id="e7b" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8" fill="currentColor"/></marker></defs>
        <text x="240" y="90" fill="currentColor" font-size="10">ENTRY</text>
        <text x="240" y="104" fill="var(--dim)" font-size="8">al cierre por fuera</text>
      </svg>
      <figcaption>El entry ocurre cuando la vela rompe el nivel clave y CIERRA por fuera. No antes: nada de adelantarse a la ruptura.</figcaption>
    </figure>

  <figure class="lec-shots">
    <b>Lo que pas&oacute; de verdad</b>
    <div class="lec-shots-tira">
      <a href="assets/images/tr/np-tr-01.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-01.jpg" alt="Ejecuci&oacute;n real 1" decoding="async"></a>
      <a href="assets/images/tr/np-tr-02.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-02.jpg" alt="Ejecuci&oacute;n real 2" decoding="async"></a>
      <a href="assets/images/tr/np-tr-03.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-03.jpg" alt="Ejecuci&oacute;n real 3" decoding="async"></a>
      <a href="assets/images/tr/np-tr-04.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-04.jpg" alt="Ejecuci&oacute;n real 4" decoding="async"></a>
      <a href="assets/images/tr/np-tr-05.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-05.jpg" alt="Ejecuci&oacute;n real 5" decoding="async"></a>
      <a href="assets/images/tr/np-tr-06.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-06.jpg" alt="Ejecuci&oacute;n real 6" decoding="async"></a>
      <a href="assets/images/tr/np-tr-07.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-07.jpg" alt="Ejecuci&oacute;n real 7" decoding="async"></a>
      <a href="assets/images/tr/np-tr-08.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-08.jpg" alt="Ejecuci&oacute;n real 8" decoding="async"></a>
      <a href="assets/images/tr/np-tr-09.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-09.jpg" alt="Ejecuci&oacute;n real 9" decoding="async"></a>
      <a href="assets/images/tr/np-tr-10.jpg" target="_blank" rel="noopener"><img src="assets/images/tr/np-tr-10.jpg" alt="Ejecuci&oacute;n real 10" decoding="async"></a>
    </div>
    <figcaption>Diez ejecuciones reales en MNQ sobre el rango de apertura de Nueva York.
      No son ejemplos dibujados: son los fills que est&aacute;n en el log. P&iacute;cales para verlas en grande.</figcaption>
  </figure>

  </section>

  <section class="lec-sec">
    <h2>El stop: tu red de seguridad</h2>
    <p>El <b>stop</b> (o stop-loss) es la orden que cierra tu operación automáticamente si el precio va en tu contra, limitando cuánto puedes perder. Es lo más importante de todo: define tu riesgo antes de que las emociones aparezcan.</p>
    <p>¿Dónde va? En un lugar que, si el precio llega ahí, <b>tu idea ya está rota</b>. Para una compra al break, el stop va justo <b>debajo de la zona que sostiene el trade</b>: abajo del order block, abajo de la mecha de la barrida, o abajo del nivel que acabas de romper. Y con un poco de aire, recuerda, para que no te cacen en una barrida.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 240" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="220" x2="470" y2="220" stroke="var(--line)" stroke-width="1"/>
        <!-- entry -->
        <line x1="60" y1="90" x2="440" y2="90" stroke="currentColor" stroke-width="1.2" stroke-dasharray="6 4"/>
        <text x="445" y="93" fill="currentColor" font-size="9">ENTRY</text>
        <!-- stop abajo -->
        <line x1="60" y1="160" x2="440" y2="160" stroke="var(--down)" stroke-width="1.3"/>
        <text x="445" y="163" fill="var(--down)" font-size="9">STOP</text>
        <!-- zona de riesgo sombreada -->
        <rect x="60" y="90" width="200" height="70" fill="var(--down)" opacity="0.12"/>
        <text x="160" y="130" fill="var(--down)" font-size="9" text-anchor="middle">riesgo = 1</text>
        <!-- order block debajo -->
        <rect x="150" y="150" width="24" height="30" fill="var(--dim)" opacity="0.4" stroke="var(--dim)" stroke-width="1"/>
        <text x="200" y="185" fill="var(--dim)" font-size="8">stop debajo del order block, con aire</text>
      </svg>
      <figcaption>El stop va debajo de la zona que sostiene el trade, con un poco de aire. La distancia del entry al stop es tu "1" de riesgo.</figcaption>
    </figure>
    <div class="lec-callout">
      <b>Ojo</b>
      <p>El stop NO es opcional y NO se mueve en contra. Ponerlo y luego quitarlo "para darle chance" es la forma más rápida de volar una cuenta. Se define ANTES de entrar y se respeta. Es la única promesa que te salva de una mala racha.</p>
    </div>
  </section>

  <section class="lec-sec">
    <h2>El target y la relación 1:2</h2>
    <p>El <b>target</b> (meta) es donde cierras para cobrar la ganancia. La regla de oro de NorthPoint: tu target debe estar <b>al menos al doble de distancia</b> que tu stop. Eso es la relación <b>riesgo-beneficio 1:2</b>: si arriesgas 10 puntos al stop, tu target está a 20 puntos o más.</p>
    <p>¿Por qué es tan poderoso? Porque cambia las matemáticas a tu favor. Con 1:2, no necesitas acertar mucho para ganar:</p>
    <ul>
      <li>Si de cada 10 trades ganas solo 4 y pierdes 6: ganas 4 × 2 = 8, pierdes 6 × 1 = 6. <b>Saldo: +2.</b> Ganaste dinero acertando menos de la mitad.</li>
      <li>Por eso los profesionales insisten tanto: no se trata de tener la razón siempre, sino de ganar más cuando aciertas que lo que pierdes cuando fallas.</li>
    </ul>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 250" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="230" x2="470" y2="230" stroke="var(--line)" stroke-width="1"/>
        <!-- niveles -->
        <line x1="120" y1="170" x2="420" y2="170" stroke="var(--down)" stroke-width="1.3"/>
        <text x="425" y="173" fill="var(--down)" font-size="9">STOP</text>
        <line x1="120" y1="130" x2="420" y2="130" stroke="currentColor" stroke-width="1.2" stroke-dasharray="6 4"/>
        <text x="425" y="133" fill="currentColor" font-size="9">ENTRY</text>
        <line x1="120" y1="50" x2="420" y2="50" stroke="var(--up)" stroke-width="1.3"/>
        <text x="425" y="53" fill="var(--up)" font-size="9">TARGET</text>
        <!-- barras de riesgo/beneficio -->
        <rect x="140" y="130" width="30" height="40" fill="var(--down)" opacity="0.30"/>
        <text x="155" y="195" fill="var(--down)" font-size="10" text-anchor="middle">1</text>
        <text x="155" y="208" fill="var(--dim)" font-size="7" text-anchor="middle">riesgo</text>
        <rect x="200" y="50" width="30" height="80" fill="var(--up)" opacity="0.30"/>
        <text x="215" y="105" fill="var(--up)" font-size="10" text-anchor="middle">2</text>
        <text x="215" y="118" fill="var(--dim)" font-size="7" text-anchor="middle">premio</text>
        <!-- ilustrar la trayectoria -->
        <path d="M120 130 L180 150 L240 90 L320 60 L400 52" fill="none" stroke="var(--up)" stroke-width="1.6"/>
        <text x="300" y="150" fill="currentColor" font-size="10">arriesgas 1 para buscar 2</text>
      </svg>
      <figcaption>La relación 1:2: el target está al doble de distancia que el stop. Así ganas dinero incluso acertando menos de la mitad de las veces.</figcaption>
    </figure>
    <div class="lec-ejemplo">
      <b>Ejemplo</b>
      <p>A+ de compra confirmado. La vela rompe el nivel en 20,050 y ahí entras (entry). El order block que sostiene el trade está en 20,035, así que pones el stop en 20,032, con aire: arriesgas 18 puntos. Para respetar el 1:2, tu target va a mínimo 36 puntos arriba, en 20,086. Riesgo 18, premio 36. Si el precio llega al target, ganaste el doble de lo que arriesgaste. Si toca el stop, perdiste una unidad y ya estás listo para el siguiente A+ sin drama.</p>
    </div>
  </section>

  <section class="lec-sec">
    <h2>El orden correcto de decidir</h2>
    <p>Un detalle que cambia todo: decide en este orden, siempre.</p>
    <ul>
      <li><b>1. Entry:</b> el precio confirmó, aquí entro.</li>
      <li><b>2. Stop:</b> aquí va mi red, donde mi idea se rompe. Esto me dice cuánto arriesgo (mi "1").</li>
      <li><b>3. Target:</b> mínimo al doble de distancia. ¿El precio tiene espacio limpio para llegar ahí antes de un obstáculo grande?</li>
    </ul>
    <p>Si al llegar al paso 3 descubres que NO hay espacio para un 1:2 (por ejemplo, hay una resistencia enorme a mitad de camino), el A+ se cae solo. Mejor no tomarlo. La relación 1:2 no es adorno: es un filtro más que valida o descarta el trade.</p>
  </section>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li><b>Entry</b>: entras al break confirmado, cuando la vela cierra por fuera del nivel. Nada de adelantarse.</li>
      <li><b>Stop</b>: debajo de la zona que sostiene el trade, con aire. Se define antes y no se mueve en contra.</li>
      <li><b>Target</b>: al menos al doble de distancia que el stop. Esa es la relación <b>1:2</b>.</li>
      <li>Con 1:2, ganas dinero aun acertando menos de la mitad de las veces.</li>
      <li>Decide en orden entry → stop → target; si no cabe un 1:2 limpio, descarta el trade.</li>
    </ul>
  </div>
</div>`,

  // ============================================================
  // L7C — A+ Setups: Un trade al día
  // ============================================================
  'l7c': `
<div class="lec">
  <h1 class="lec-h1">A+ Setups — Un trade al día: A+ o nada</h1>
  <p class="lec-lede">La última pieza no es técnica, es de disciplina, y es la que más dinero salva: <b>un solo trade al día</b>, y solo si es A+. Suena a poco. Es justo lo que separa a los que sobreviven de los que queman su cuenta. Menos operaciones, mejor seleccionadas, es cómo se gana este juego a largo plazo.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Un francotirador no dispara a todo lo que se mueve: espera horas por el único tiro que importa, respira, y aprieta una sola vez. Un soldado nervioso que dispara a cada ruido se queda sin balas y revela su posición. En trading tus balas son tu dinero y tu claridad mental. El método NorthPoint te entrena para ser el francotirador: un tiro, el bueno, y a casa.</p>
  </div>

  <section class="lec-sec">
    <h2>Por qué un solo trade al día</h2>
    <p>Parece una limitación arbitraria, pero tiene tres razones poderosas:</p>
    <ul>
      <li><b>Calidad sobre cantidad.</b> Si sabes que solo tomarás UN trade, te vuelves exigente. Esperas el A+ de verdad en vez de saltar al primer coqueteo. La escasez te hace selectivo.</li>
      <li><b>Protege tu cuenta.</b> Un mal día no puede hacerte mucho daño si solo arriesgas una operación. El trader que opera diez veces al día puede perder diez veces en una mala racha.</li>
      <li><b>Protege tu mente.</b> El enemigo real no es el mercado, es el <b>tilt</b>: ese estado de frustración en que operas por venganza tras una pérdida. Un solo trade al día apaga el tilt de raíz: pasó tu trade, ganes o pierdas, se acabó el día.</li>
    </ul>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 230" style="width:100%;height:auto;display:block" font-family="monospace">
        <!-- overtrader -->
        <text x="115" y="30" fill="var(--down)" font-size="10" text-anchor="middle">OPERAR DE MAS</text>
        <line x1="40" y1="130" x2="200" y2="130" stroke="var(--line)" stroke-width="1"/>
        <path d="M50 120 L65 90 L80 140 L95 80 L110 150 L125 95 L140 165 L155 110 L170 180 L185 175"
              fill="none" stroke="var(--down)" stroke-width="1.5"/>
        <text x="115" y="205" fill="var(--dim)" font-size="8" text-anchor="middle">10 trades: sube, baja, tilt, se hunde</text>
        <line x1="240" y1="20" x2="240" y2="210" stroke="var(--line)" stroke-width="0.8" stroke-dasharray="3 3"/>
        <!-- sniper -->
        <text x="365" y="30" fill="var(--up)" font-size="10" text-anchor="middle">UN TRADE A+</text>
        <line x1="280" y1="130" x2="450" y2="130" stroke="var(--line)" stroke-width="1"/>
        <path d="M290 130 L290 130 L340 130 L360 90" fill="none" stroke="var(--up)" stroke-width="1.5"/>
        <circle cx="340" cy="130" r="4" fill="var(--up)"/>
        <text x="365" y="205" fill="var(--dim)" font-size="8" text-anchor="middle">espera, dispara una vez, a casa</text>
      </svg>
      <figcaption>El que opera de más se hunde en su propio ruido. El francotirador espera su A+, lo toma, y se retira. La curva de la derecha es la que dura años.</figcaption>
    </figure>
  </section>

  <section class="lec-sec">
    <h2>El enemigo invisible: el tilt</h2>
    <p><b>Tilt</b> es el término para cuando pierdes la cabeza y operas con emoción en vez de con plan. Casi siempre nace de una pérdida: te enojas, quieres "recuperar", y empiezas a tomar trades C con tamaño grande. Es la forma número uno en que la gente vuela su cuenta, y no tiene nada que ver con la estrategia; es puro descontrol emocional.</p>
    <p>La regla de un trade al día es una vacuna contra el tilt. Si tu único trade del día ya pasó, no hay siguiente. No importa si perdiste: cerraste la laptop. Mañana hay otro A+. El mercado abre todos los días; tu dinero no es infinito.</p>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 220" style="width:100%;height:auto;display:block" font-family="monospace">
        <!-- espiral del tilt -->
        <text x="240" y="25" fill="var(--down)" font-size="10" text-anchor="middle">LA ESPIRAL DEL TILT</text>
        <g font-size="9" fill="currentColor">
          <rect x="40" y="45" width="90" height="30" fill="none" stroke="var(--down)" stroke-width="1.2"/>
          <text x="85" y="64" text-anchor="middle">pierdes 1</text>
          <path d="M130 60 L165 60" stroke="var(--down)" stroke-width="1" marker-end="url(#t7c)"/>
          <rect x="170" y="45" width="90" height="30" fill="none" stroke="var(--down)" stroke-width="1.2"/>
          <text x="215" y="64" text-anchor="middle">te enojas</text>
          <path d="M260 60 L295 60" stroke="var(--down)" stroke-width="1" marker-end="url(#t7c)"/>
          <rect x="300" y="45" width="110" height="30" fill="none" stroke="var(--down)" stroke-width="1.2"/>
          <text x="355" y="64" text-anchor="middle">entras a un C</text>
          <path d="M355 75 L355 100" stroke="var(--down)" stroke-width="1" marker-end="url(#t7c)"/>
          <rect x="300" y="105" width="110" height="30" fill="none" stroke="var(--down)" stroke-width="1.2"/>
          <text x="355" y="124" text-anchor="middle">pierdes mas</text>
          <path d="M300 120 L200 120" stroke="var(--down)" stroke-width="1" marker-end="url(#t7c)"/>
          <rect x="90" y="105" width="110" height="30" fill="none" stroke="var(--down)" stroke-width="1.2"/>
          <text x="145" y="124" text-anchor="middle">doblas tamaño</text>
          <path d="M145 135 L145 160" stroke="var(--down)" stroke-width="1" marker-end="url(#t7c)"/>
          <rect x="90" y="165" width="300" height="30" fill="var(--down)" opacity="0.15" stroke="var(--down)" stroke-width="1.3"/>
          <text x="240" y="184" text-anchor="middle" fill="var(--down)">cuenta volada</text>
        </g>
        <defs><marker id="t7c" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8" fill="var(--down)"/></marker></defs>
      </svg>
      <figcaption>El tilt es una espiral: pérdida, enojo, trade malo, más pérdida, doblar. La regla de un trade al día corta la espiral en el primer paso.</figcaption>
    </figure>
    <div class="lec-callout">
      <b>Ojo</b>
      <p>El mercado siempre estará ahí mañana. Esta frase, dicha en voz alta cuando sientes la urgencia de "recuperar", ha salvado más cuentas que cualquier indicador. La urgencia es la mentira; la paciencia es el edge.</p>
    </div>
  </section>

  <section class="lec-sec">
    <h2>La rutina del día NorthPoint</h2>
    <p>Así se ve un día operado con disciplina, de principio a fin:</p>
    <ul>
      <li><b>Antes de abrir:</b> revisas el contexto, la tendencia grande. ¿Alcista o bajista según las EMAs?</li>
      <li><b>Primeros 15 minutos:</b> dibujas el ORB (ORH y ORL). No operas, observas.</li>
      <li><b>Cacería del A+:</b> esperas a que se alineen las confluencias (EMAs + break + estructura + zona + liquidez). Con paciencia de francotirador.</li>
      <li><b>Si aparece el A+:</b> ejecutas con entry, stop y target 1:2. Un solo trade.</li>
      <li><b>Después del trade:</b> ganes o pierdas, terminaste. Cierras la plataforma. Anotas el trade en tu bitácora.</li>
      <li><b>Si NO aparece un A+:</b> no operas. Un día sin trade es un día perfecto. Cero pérdidas es mejor que un trade forzado.</li>
    </ul>
    <figure class="lec-fig">
      <svg viewBox="0 0 480 160" style="width:100%;height:auto;display:block" font-family="monospace">
        <line x1="40" y1="90" x2="450" y2="90" stroke="var(--line)" stroke-width="1.5"/>
        <g font-size="8" fill="currentColor" text-anchor="middle">
          <circle cx="70" cy="90" r="6" fill="var(--dim)"/><text x="70" y="70">contexto</text><text x="70" y="115" fill="var(--dim)">EMAs</text>
          <circle cx="160" cy="90" r="6" fill="var(--dim)"/><text x="160" y="70">ORB</text><text x="160" y="115" fill="var(--dim)">15 min</text>
          <circle cx="250" cy="90" r="6" fill="var(--dim)"/><text x="250" y="70">esperar</text><text x="250" y="115" fill="var(--dim)">confluencia</text>
          <circle cx="340" cy="90" r="7" fill="var(--up)"/><text x="340" y="68" fill="var(--up)">A+ ejecuta</text><text x="340" y="115" fill="var(--dim)">1 trade</text>
          <circle cx="420" cy="90" r="6" fill="var(--dim)"/><text x="420" y="70">a casa</text><text x="420" y="115" fill="var(--dim)">bitacora</text>
        </g>
      </svg>
      <figcaption>La rutina completa: contexto, ORB, esperar, un solo A+, y a casa. Repetida cada día, esta es la máquina del método.</figcaption>
    </figure>
    <div class="lec-ejemplo">
      <b>Ejemplo</b>
      <p>Martes. EMAs alcistas, dibujas el ORB. Pasa la mañana y no se alinean las confluencias: los breaks se ven flojos, sin barrida, sin order block claro. Nunca aparece el A+. A mediodía cierras la laptop sin haber operado. ¿Perdiste? No: ganaste, porque no regalaste dinero en trades mediocres. Miércoles. EMAs alcistas, y a las 9:40 se alinea todo: barrida de liquidez, rebote en order block, BOS al alza, break del ORH. A+ perfecto. Entras uno, con 1:2, y llega al target. Un trade en dos días, positivo. Esa es la vida del método: aburrida, disciplinada, y rentable.</p>
    </div>
  </section>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li><b>Un trade al día, A+ o nada.</b> La escasez te hace selectivo y protege cuenta y mente.</li>
      <li>El enemigo real es el <b>tilt</b>: operar por venganza tras una pérdida. Un trade al día lo corta de raíz.</li>
      <li>Un día sin trade NO es un día perdido: cero pérdidas le gana a un trade forzado.</li>
      <li>Rutina: contexto (EMAs) → ORB → esperar el A+ → un trade con 1:2 → a casa y bitácora.</li>
      <li>El mercado abre mañana; tu dinero no es infinito. La paciencia es el verdadero edge.</li>
    </ul>
  </div>
</div>`

});
