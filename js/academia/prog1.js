/* ══════════════════════════════════════════════════════════════════════
   NORTHPOINT · ACADEMIA · PROGRAMA 1 — FUNDAMENTOS
   Contenido educativo de las 9 lecciones del Programa 1.
   Estilo "para dummies": extenso, muy visual, español de México.
   Todo el apoyo visual es SVG inline dibujado a mano (sin imágenes).
   Colores: currentColor para trazos/texto; var(--up) alcista (verde),
   var(--down) bajista (rojo), var(--dim), var(--line), fondos var(--w02).
   ════════════════════════════════════════════════════════════════════ */
window.LECCIONES_HTML = Object.assign(window.LECCIONES_HTML || {}, {

/* ─────────────────────────────────────────────────────────────────────
   l1a · El contrato de futuros
   ───────────────────────────────────────────────────────────────────── */
'l1a': `
<div class="lec">
  <h1 class="lec-h1">El contrato de futuros</h1>
  <p class="lec-lede">Antes de apretar un solo botón, necesitas entender qué compras y qué vendes. Spoiler: no compras acciones, no compras dólares. Compras un <b>acuerdo</b>. Vamos por partes, sin prisa.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Imagina que hoy le prometes a un ranchero: "en tres meses te compro 100 kilos de aguacate a 50 pesos el kilo, pase lo que pase con el precio". Firman un papel. Ese papel es un <b>contrato a futuro</b>: fijan HOY el precio de algo que se entrega DESPUÉS. Si el aguacate sube a 80, tú ganaste (lo compras barato). Si baja a 30, perdiste (lo pagas caro). No tienes el aguacate todavía, pero ya tienes una posición sobre su precio.</p>
  </div>

  <section class="lec-sec">
    <h2>1. Qué es, en una frase</h2>
    <p>Un <b>contrato de futuros</b> es un acuerdo estandarizado para comprar o vender "algo" (llamado el <b>subyacente</b>) a un precio pactado hoy, con entrega en una fecha futura. Ese "algo" puede ser petróleo, oro, maíz… o —lo que a nosotros nos importa— un <b>índice bursátil</b> como el Nasdaq-100 o el S&P 500.</p>
    <p>La palabra clave es <b>estandarizado</b>: no negocias los términos con nadie. La bolsa (en nuestro caso, la CME, la bolsa de Chicago) ya definió el tamaño, la calidad y la fecha. Tú solo decides una cosa: <b>si crees que va a subir o a bajar</b>.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 220" style="width:100%;height:auto;max-width:640px" font-family="monospace">
      <text x="320" y="24" text-anchor="middle" fill="currentColor" font-size="14" font-weight="bold">EL ACUERDO, VISTO DE ARRIBA</text>
      <!-- comprador -->
      <rect x="30" y="60" width="150" height="80" rx="10" fill="var(--w02)" stroke="var(--up)" stroke-width="2"/>
      <text x="105" y="92" text-anchor="middle" fill="var(--up)" font-size="13" font-weight="bold">COMPRADOR</text>
      <text x="105" y="112" text-anchor="middle" fill="currentColor" font-size="11">(va LARGO)</text>
      <text x="105" y="128" text-anchor="middle" fill="var(--dim)" font-size="10">cree que sube</text>
      <!-- vendedor -->
      <rect x="460" y="60" width="150" height="80" rx="10" fill="var(--w02)" stroke="var(--down)" stroke-width="2"/>
      <text x="535" y="92" text-anchor="middle" fill="var(--down)" font-size="13" font-weight="bold">VENDEDOR</text>
      <text x="535" y="112" text-anchor="middle" fill="currentColor" font-size="11">(va CORTO)</text>
      <text x="535" y="128" text-anchor="middle" fill="var(--dim)" font-size="10">cree que baja</text>
      <!-- centro: contrato -->
      <rect x="250" y="70" width="140" height="60" rx="8" fill="var(--w02)" stroke="currentColor" stroke-width="1.5"/>
      <text x="320" y="95" text-anchor="middle" fill="currentColor" font-size="11" font-weight="bold">CONTRATO</text>
      <text x="320" y="112" text-anchor="middle" fill="var(--dim)" font-size="9">precio + fecha</text>
      <text x="320" y="124" text-anchor="middle" fill="var(--dim)" font-size="9">fijados hoy</text>
      <!-- flechas -->
      <line x1="180" y1="100" x2="248" y2="100" stroke="currentColor" stroke-width="1.5" marker-end="url(#a1a)"/>
      <line x1="460" y1="100" x2="392" y2="100" stroke="currentColor" stroke-width="1.5" marker-end="url(#a1a)"/>
      <text x="320" y="175" text-anchor="middle" fill="currentColor" font-size="11">Para que exista tu trade, alguien piensa lo contrario que tú.</text>
      <text x="320" y="194" text-anchor="middle" fill="var(--dim)" font-size="10">Uno gana, el otro pierde. El mercado es un espejo.</text>
      <defs>
        <marker id="a1a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="currentColor"/>
        </marker>
      </defs>
    </svg>
    <figcaption>Todo contrato tiene dos lados: quien lo compra (largo) y quien lo vende (corto). El precio se fija hoy; el resultado se ve después.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>2. "Largo" y "corto": las dos únicas apuestas</h2>
    <p>En futuros solo hay dos jugadas, y esto es lo primero que te va a sonar raro: <b>puedes ganar cuando el precio baja</b>. En la bolsa de acciones normal, la mayoría solo compra y espera a que suba. En futuros no.</p>
    <ul>
      <li><b>Ir largo (long)</b> = compras primero. Ganas si el precio <b>sube</b>. Es la apuesta "de toda la vida".</li>
      <li><b>Ir corto (short)</b> = vendes primero (aunque no lo tengas), para recomprar más barato después. Ganas si el precio <b>baja</b>.</li>
    </ul>
    <p>¿Cómo vendes algo que no tienes? Porque es un contrato, no el objeto físico. Firmas la promesa de vender; luego la cierras comprando la promesa opuesta. Nunca tocas un solo aguacate ni una sola acción.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 260" style="width:100%;height:auto;max-width:640px" font-family="monospace">
      <text x="320" y="22" text-anchor="middle" fill="currentColor" font-size="14" font-weight="bold">LARGO vs CORTO</text>
      <!-- eje -->
      <line x1="60" y1="130" x2="600" y2="130" stroke="var(--line)" stroke-width="1"/>
      <!-- LARGO panel -->
      <text x="180" y="52" text-anchor="middle" fill="var(--up)" font-size="12" font-weight="bold">LARGO · compras a 100</text>
      <polyline points="90,120 150,100 210,80 270,64" fill="none" stroke="var(--up)" stroke-width="2.5"/>
      <circle cx="90" cy="120" r="4" fill="var(--up)"/>
      <text x="90" y="112" text-anchor="middle" fill="currentColor" font-size="9">entra 100</text>
      <text x="270" y="56" text-anchor="middle" fill="var(--up)" font-size="10">sube → +ganas</text>
      <!-- CORTO panel -->
      <text x="470" y="52" text-anchor="middle" fill="var(--down)" font-size="12" font-weight="bold">CORTO · vendes a 100</text>
      <polyline points="380,80 440,100 500,120 560,140" fill="none" stroke="var(--down)" stroke-width="2.5"/>
      <circle cx="380" cy="80" r="4" fill="var(--down)"/>
      <text x="380" y="72" text-anchor="middle" fill="currentColor" font-size="9">entra 100</text>
      <text x="560" y="158" text-anchor="middle" fill="var(--down)" font-size="10">baja → +ganas</text>
      <text x="320" y="210" text-anchor="middle" fill="currentColor" font-size="11">La ganancia es siempre la DIFERENCIA entre donde entras y donde sales.</text>
      <text x="320" y="232" text-anchor="middle" fill="var(--dim)" font-size="10">Largo: sales más arriba. Corto: sales más abajo.</text>
    </svg>
    <figcaption>Ir largo gana con la subida; ir corto gana con la bajada. En ambos, tu resultado es la distancia entre tu entrada y tu salida.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>3. La vela japonesa: cómo se ve el precio</h2>
    <p>El precio no es una línea; en trading lo dibujamos con <b>velas japonesas</b>. Cada vela cuenta la historia de un pedazo de tiempo (un minuto, cinco minutos, una hora…). Aprende a leer una vela y ya sabes leer el 80% de una gráfica.</p>
    <p>Una vela tiene <b>cuerpo</b> (la parte gorda) y <b>mechas</b> (los palitos de arriba y abajo). El cuerpo va de donde <b>abrió</b> a donde <b>cerró</b> ese periodo. Las mechas marcan el punto <b>más alto</b> y <b>más bajo</b> que tocó.</p>
    <ul>
      <li>Vela <b style="color:var(--up)">verde</b> (alcista): cerró más arriba de donde abrió. Ganaron los compradores.</li>
      <li>Vela <b style="color:var(--down)">roja</b> (bajista): cerró más abajo de donde abrió. Ganaron los vendedores.</li>
    </ul>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 300" style="width:100%;height:auto;max-width:560px" font-family="monospace">
      <text x="310" y="24" text-anchor="middle" fill="currentColor" font-size="14" font-weight="bold">ANATOMÍA DE UNA VELA</text>
      <!-- vela alcista -->
      <line x1="180" y1="60" x2="180" y2="240" stroke="var(--up)" stroke-width="2"/>
      <rect x="158" y="110" width="44" height="90" rx="3" fill="var(--up)" opacity="0.9"/>
      <text x="240" y="66" fill="currentColor" font-size="10">máximo (mecha superior)</text>
      <line x1="205" y1="60" x2="236" y2="62" stroke="var(--dim)" stroke-width="0.8"/>
      <text x="240" y="116" fill="currentColor" font-size="10">cierre</text>
      <line x1="205" y1="112" x2="236" y2="113" stroke="var(--dim)" stroke-width="0.8"/>
      <text x="240" y="204" fill="currentColor" font-size="10">apertura</text>
      <line x1="205" y1="200" x2="236" y2="201" stroke="var(--dim)" stroke-width="0.8"/>
      <text x="240" y="244" fill="currentColor" font-size="10">mínimo (mecha inferior)</text>
      <line x1="205" y1="240" x2="236" y2="240" stroke="var(--dim)" stroke-width="0.8"/>
      <text x="180" y="270" text-anchor="middle" fill="var(--up)" font-size="12" font-weight="bold">ALCISTA</text>
      <text x="180" y="286" text-anchor="middle" fill="var(--dim)" font-size="9">cierra arriba de abrir</text>
      <!-- vela bajista -->
      <line x1="470" y1="70" x2="470" y2="250" stroke="var(--down)" stroke-width="2"/>
      <rect x="448" y="110" width="44" height="90" rx="3" fill="var(--down)" opacity="0.9"/>
      <text x="392" y="116" text-anchor="end" fill="currentColor" font-size="10">apertura</text>
      <text x="392" y="204" text-anchor="end" fill="currentColor" font-size="10">cierre</text>
      <text x="470" y="280" text-anchor="middle" fill="var(--down)" font-size="12" font-weight="bold">BAJISTA</text>
      <text x="470" y="296" text-anchor="middle" fill="var(--dim)" font-size="9">cierra abajo de abrir</text>
    </svg>
    <figcaption>En la vela alcista el cuerpo va de apertura (abajo) a cierre (arriba). En la bajista es al revés. Las mechas son los extremos que tocó el precio.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>4. La fecha de vencimiento (y por qué casi nunca te importa)</h2>
    <p>Como todo contrato tiene una fecha de entrega, los futuros <b>vencen</b>. Los de índices vencen cada tres meses: marzo, junio, septiembre y diciembre. A cada vencimiento le corresponde un contrato distinto.</p>
    <p>Buenas noticias para ti como <b>day trader</b> (alguien que abre y cierra el mismo día): <b>nunca llegas al vencimiento</b>. Cierras tu posición en minutos u horas, mucho antes de que nadie tenga que "entregar" nada. La fecha existe, pero para ti es un dato de fondo, no algo que te vaya a caer encima.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 160" style="width:100%;height:auto;max-width:640px" font-family="monospace">
      <text x="320" y="24" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">LOS VENCIMIENTOS DEL AÑO</text>
      <line x1="50" y1="80" x2="600" y2="80" stroke="var(--line)" stroke-width="2"/>
      <g fill="currentColor" font-size="11" text-anchor="middle">
        <circle cx="120" cy="80" r="6" fill="var(--dim)"/><text x="120" y="60">MAR</text>
        <circle cx="270" cy="80" r="6" fill="var(--dim)"/><text x="270" y="60">JUN</text>
        <circle cx="420" cy="80" r="6" fill="var(--dim)"/><text x="420" y="60">SEP</text>
        <circle cx="560" cy="80" r="6" fill="var(--dim)"/><text x="560" y="60">DIC</text>
      </g>
      <rect x="60" y="98" width="360" height="26" rx="6" fill="var(--w02)" stroke="var(--up)" stroke-width="1.5"/>
      <text x="240" y="115" text-anchor="middle" fill="var(--up)" font-size="10">tú operas AQUÍ: entras y sales el mismo día</text>
      <text x="320" y="148" text-anchor="middle" fill="var(--dim)" font-size="10">El day trader cierra antes del vencimiento. La fecha nunca te alcanza.</text>
    </svg>
    <figcaption>Los futuros de índice vencen 4 veces al año. Como day trader cierras en el día, así que el vencimiento es solo un dato de calendario.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>Un contrato de futuros <b>no es una acción</b>. No eres dueño de nada de una empresa, no cobras dividendos, no votas en nada. Estás apostando a una dirección de precio con un instrumento apalancado. Eso lo hace potente y peligroso a la vez: el mismo movimiento que te da mucho, te quita mucho. Por eso el resto del programa es, sobre todo, gestión de riesgo.</p>
  </div>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>Crees que el Nasdaq va a subir en la mañana. Vas <b>largo</b> comprando 1 contrato a 20,000 puntos. Media hora después el precio está en 20,050. Cierras (vendes) ahí. Ganaste la diferencia: <b>50 puntos</b>. Nunca tuviste que esperar meses ni recibir "entrega" de nada: entraste, el precio se movió a tu favor, saliste. Cuánto vale cada punto en dinero lo veremos en las siguientes dos lecciones.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>Un futuro es un <b>acuerdo</b> para comprar/vender algo a un precio fijado hoy, entregado después. Nosotros operamos futuros de <b>índices</b>.</li>
      <li>Solo hay dos jugadas: <b>largo</b> (ganas si sube) y <b>corto</b> (ganas si baja). En ambas, tu resultado es la diferencia entre entrada y salida.</li>
      <li>El precio se lee con <b>velas</b>: cuerpo (apertura→cierre) y mechas (máximo/mínimo). Verde = subió, rojo = bajó.</li>
      <li>Los contratos <b>vencen</b> cada 3 meses, pero como cierras el mismo día, la fecha no te afecta.</li>
      <li>No es una acción: es apalancado. Potente y riesgoso. La disciplina es todo.</li>
    </ul>
  </div>
</div>`,

/* ─────────────────────────────────────────────────────────────────────
   l1b · MNQ, NQ, MES, ES y sus multiplicadores
   ───────────────────────────────────────────────────────────────────── */
'l1b': `
<div class="lec">
  <h1 class="lec-h1">MNQ, NQ, MES, ES y sus multiplicadores</h1>
  <p class="lec-lede">Cuatro nombres raros que vas a escribir todos los días. Son cuatro contratos que rastrean solo dos índices, en dos tamaños: el chico (micro) y el grande (mini). Cuando termines esta lección, esas letras te van a sonar tan normales como tu propio nombre.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Es como el refresco: el mismo sabor viene en lata chica y en botella grande. Mismo contenido, distinto tamaño… y distinto precio por trago. <b>MNQ</b> y <b>NQ</b> son el mismo "sabor" (el Nasdaq-100), uno en versión micro y otro en versión mini. Igual <b>MES</b> y <b>ES</b> con el sabor "S&P 500". Elegir el tamaño correcto es elegir cuánto arriesgas por cada movimiento.</p>
  </div>

  <section class="lec-sec">
    <h2>1. Dos índices, dos tamaños</h2>
    <p>Primero, los dos "sabores" (los índices que vas a operar):</p>
    <ul>
      <li><b>Nasdaq-100</b>: las 100 empresas tecnológicas más grandes de EE.UU. (Apple, Nvidia, Microsoft…). Se mueve <b>rápido</b>, con rangos amplios. Los contratos que lo siguen son <b>NQ</b> (mini) y <b>MNQ</b> (micro).</li>
      <li><b>S&P 500</b>: las 500 empresas más grandes de EE.UU., más variado y un poco más tranquilo. Sus contratos son <b>ES</b> (mini) y <b>MES</b> (micro).</li>
    </ul>
    <p>La letra <b>M</b> al inicio siempre significa <b>Micro</b>: la versión chiquita, que vale la décima parte. Es la que vas a usar mientras aprendes, porque arriesga 10 veces menos.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 280" style="width:100%;height:auto;max-width:640px" font-family="monospace">
      <text x="320" y="24" text-anchor="middle" fill="currentColor" font-size="14" font-weight="bold">EL ÁRBOL DE LOS CONTRATOS</text>
      <!-- Nasdaq rama -->
      <rect x="60" y="50" width="200" height="40" rx="8" fill="var(--w02)" stroke="currentColor" stroke-width="1.5"/>
      <text x="160" y="68" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">NASDAQ-100</text>
      <text x="160" y="83" text-anchor="middle" fill="var(--dim)" font-size="9">tech · rápido</text>
      <line x1="120" y1="90" x2="120" y2="130" stroke="var(--line)" stroke-width="1.5"/>
      <line x1="200" y1="90" x2="200" y2="130" stroke="var(--line)" stroke-width="1.5"/>
      <rect x="70" y="130" width="100" height="56" rx="8" fill="var(--w02)" stroke="var(--up)" stroke-width="2"/>
      <text x="120" y="152" text-anchor="middle" fill="var(--up)" font-size="15" font-weight="bold">NQ</text>
      <text x="120" y="170" text-anchor="middle" fill="currentColor" font-size="9">MINI (grande)</text>
      <text x="120" y="181" text-anchor="middle" fill="var(--dim)" font-size="9">x20 / punto</text>
      <rect x="150" y="200" width="100" height="56" rx="8" fill="var(--w02)" stroke="currentColor" stroke-width="2"/>
      <text x="200" y="222" text-anchor="middle" fill="currentColor" font-size="15" font-weight="bold">MNQ</text>
      <text x="200" y="240" text-anchor="middle" fill="currentColor" font-size="9">MICRO (chico)</text>
      <text x="200" y="251" text-anchor="middle" fill="var(--dim)" font-size="9">x2 / punto</text>
      <line x1="200" y1="130" x2="200" y2="200" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="3 3"/>
      <!-- S&P rama -->
      <rect x="380" y="50" width="200" height="40" rx="8" fill="var(--w02)" stroke="currentColor" stroke-width="1.5"/>
      <text x="480" y="68" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">S&P 500</text>
      <text x="480" y="83" text-anchor="middle" fill="var(--dim)" font-size="9">amplio · estable</text>
      <rect x="390" y="130" width="100" height="56" rx="8" fill="var(--w02)" stroke="var(--up)" stroke-width="2"/>
      <text x="440" y="152" text-anchor="middle" fill="var(--up)" font-size="15" font-weight="bold">ES</text>
      <text x="440" y="170" text-anchor="middle" fill="currentColor" font-size="9">MINI (grande)</text>
      <text x="440" y="181" text-anchor="middle" fill="var(--dim)" font-size="9">x50 / punto</text>
      <rect x="470" y="200" width="100" height="56" rx="8" fill="var(--w02)" stroke="currentColor" stroke-width="2"/>
      <text x="520" y="222" text-anchor="middle" fill="currentColor" font-size="15" font-weight="bold">MES</text>
      <text x="520" y="240" text-anchor="middle" fill="currentColor" font-size="9">MICRO (chico)</text>
      <text x="520" y="251" text-anchor="middle" fill="var(--dim)" font-size="9">x5 / punto</text>
      <line x1="440" y1="90" x2="440" y2="130" stroke="var(--line)" stroke-width="1.5"/>
      <line x1="520" y1="90" x2="520" y2="200" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="3 3"/>
    </svg>
    <figcaption>Dos índices (Nasdaq-100 y S&P 500), cada uno en versión mini (grande) y micro (chica). La M siempre es "micro".</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>2. El multiplicador: cuánto vale cada punto</h2>
    <p>Aquí está el corazón de la lección. Cada contrato tiene un <b>multiplicador</b>: cuántos dólares te dan (o te quitan) por cada <b>punto</b> que se mueve el índice. Es la regla que convierte "el precio se movió" en "gané/perdí tanto dinero".</p>
    <p>La cuenta es de kínder: <b>puntos movidos × multiplicador = dólares</b>. Memoriza estos cuatro números y ya sabes cuánto pesa cada instrumento:</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 250" style="width:100%;height:auto;max-width:640px" font-family="monospace">
      <text x="320" y="24" text-anchor="middle" fill="currentColor" font-size="14" font-weight="bold">TABLA DE MULTIPLICADORES</text>
      <!-- header -->
      <line x1="40" y1="42" x2="600" y2="42" stroke="var(--line)"/>
      <text x="90" y="60" fill="var(--dim)" font-size="11" font-weight="bold">CONTRATO</text>
      <text x="260" y="60" fill="var(--dim)" font-size="11" font-weight="bold">ÍNDICE</text>
      <text x="420" y="60" fill="var(--dim)" font-size="11" font-weight="bold">$ / PUNTO</text>
      <text x="540" y="60" fill="var(--dim)" font-size="11" font-weight="bold">TAMAÑO</text>
      <line x1="40" y1="70" x2="600" y2="70" stroke="var(--line)"/>
      <!-- rows -->
      <g font-size="13">
        <text x="90" y="98" fill="currentColor" font-weight="bold">MNQ</text>
        <text x="260" y="98" fill="currentColor">Nasdaq</text>
        <text x="420" y="98" fill="var(--up)" font-weight="bold">$2</text>
        <text x="540" y="98" fill="var(--dim)">micro</text>
      </g>
      <line x1="40" y1="112" x2="600" y2="112" stroke="var(--line)" opacity="0.4"/>
      <g font-size="13">
        <text x="90" y="140" fill="currentColor" font-weight="bold">NQ</text>
        <text x="260" y="140" fill="currentColor">Nasdaq</text>
        <text x="420" y="140" fill="var(--up)" font-weight="bold">$20</text>
        <text x="540" y="140" fill="var(--dim)">mini</text>
      </g>
      <line x1="40" y1="154" x2="600" y2="154" stroke="var(--line)" opacity="0.4"/>
      <g font-size="13">
        <text x="90" y="182" fill="currentColor" font-weight="bold">MES</text>
        <text x="260" y="182" fill="currentColor">S&P 500</text>
        <text x="420" y="182" fill="var(--up)" font-weight="bold">$5</text>
        <text x="540" y="182" fill="var(--dim)">micro</text>
      </g>
      <line x1="40" y1="196" x2="600" y2="196" stroke="var(--line)" opacity="0.4"/>
      <g font-size="13">
        <text x="90" y="224" fill="currentColor" font-weight="bold">ES</text>
        <text x="260" y="224" fill="currentColor">S&P 500</text>
        <text x="420" y="224" fill="var(--up)" font-weight="bold">$50</text>
        <text x="540" y="224" fill="var(--dim)">mini</text>
      </g>
      <line x1="40" y1="236" x2="600" y2="236" stroke="var(--line)"/>
    </svg>
    <figcaption>Los cuatro números que debes memorizar. El mini vale 10 veces el micro del mismo índice.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>3. El mini vale 10 micros</h2>
    <p>Fíjate en el patrón: <b>NQ ($20) es exactamente 10 veces MNQ ($2)</b>. Y <b>ES ($50) es 10 veces MES ($5)</b>. Por eso operar 1 mini es como operar 10 micros a la vez: gana o pierde diez veces más rápido.</p>
    <p>Esto te da un control fino del riesgo. ¿Quieres arriesgar más? Sumas micros de uno en uno (1, 2, 3 MNQ…). ¿Quieres dar un salto grande? Pasas al mini. Mientras aprendes, <b>siempre micro</b>. El micro es tu tienda de campaña; el mini es la casa. Primero aprende a armar la tienda.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 200" style="width:100%;height:auto;max-width:600px" font-family="monospace">
      <text x="310" y="24" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">1 MINI = 10 MICROS</text>
      <!-- 1 NQ block grande -->
      <rect x="50" y="60" width="70" height="100" rx="8" fill="var(--up)" opacity="0.85"/>
      <text x="85" y="115" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">NQ</text>
      <text x="85" y="180" text-anchor="middle" fill="currentColor" font-size="10">1 mini</text>
      <text x="160" y="115" text-anchor="middle" fill="currentColor" font-size="18">=</text>
      <!-- 10 MNQ chicos -->
      <g fill="currentColor" opacity="0.85">
        <rect x="200" y="120" width="30" height="40" rx="3"/>
        <rect x="238" y="120" width="30" height="40" rx="3"/>
        <rect x="276" y="120" width="30" height="40" rx="3"/>
        <rect x="314" y="120" width="30" height="40" rx="3"/>
        <rect x="352" y="120" width="30" height="40" rx="3"/>
        <rect x="200" y="72" width="30" height="40" rx="3"/>
        <rect x="238" y="72" width="30" height="40" rx="3"/>
        <rect x="276" y="72" width="30" height="40" rx="3"/>
        <rect x="314" y="72" width="30" height="40" rx="3"/>
        <rect x="352" y="72" width="30" height="40" rx="3"/>
      </g>
      <text x="291" y="180" text-anchor="middle" fill="currentColor" font-size="10">10 micros (MNQ)</text>
      <text x="500" y="100" text-anchor="middle" fill="var(--dim)" font-size="10">Sumar micros de</text>
      <text x="500" y="116" text-anchor="middle" fill="var(--dim)" font-size="10">uno en uno = subir</text>
      <text x="500" y="132" text-anchor="middle" fill="var(--dim)" font-size="10">el riesgo a pasitos.</text>
    </svg>
    <figcaption>Un contrato mini equivale a diez micros. Los micros te dejan ajustar el riesgo poco a poco; el mini es un salto grande de golpe.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>4. Nasdaq vs S&P: ¿cuál elijo?</h2>
    <p>El <b>Nasdaq (NQ/MNQ)</b> se mueve más: más puntos por hora, más volatilidad, más emoción y más riesgo. El <b>S&P (ES/MES)</b> es más pausado. Muchos empiezan en el S&P micro (MES) porque perdona más los errores, y el método NorthPoint suele centrarse en el <b>Nasdaq</b> por sus rangos limpios en la apertura. Lo importante hoy: entiende que cada uno tiene su ritmo y su multiplicador, y que <b>nunca</b> operes uno sin saber cuánto vale su punto.</p>
  </section>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>El error clásico del novato: abrir <b>NQ</b> creyendo que abrió <b>MNQ</b>. Mismo botón, mismo gráfico… pero cada punto vale <b>$20 en vez de $2</b>. Un movimiento de 30 puntos que "debía" costar $60 de golpe te cuesta $600. Antes de cada trade, revisa dos veces qué contrato tienes seleccionado. Es la revisión más barata de tu carrera.</p>
  </div>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>El Nasdaq se mueve <b>40 puntos</b> a tu favor. Veamos qué ganaste según el contrato:</p>
    <ul>
      <li>Con <b>1 MNQ</b>: 40 × $2 = <b>$80</b>.</li>
      <li>Con <b>1 NQ</b>: 40 × $20 = <b>$800</b>.</li>
      <li>Con <b>3 MNQ</b>: 40 × $2 × 3 = <b>$240</b>.</li>
    </ul>
    <p>Mismo movimiento del mercado, resultados muy distintos. El multiplicador y cuántos contratos usas deciden todo.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>Dos índices: <b>Nasdaq-100</b> (NQ/MNQ, rápido) y <b>S&P 500</b> (ES/MES, más calmado).</li>
      <li>La <b>M</b> significa micro: la versión chica, 10 veces más barata. Empieza siempre en micro.</li>
      <li>Multiplicadores a memorizar: <b>MNQ $2 · NQ $20 · MES $5 · ES $50</b> por punto.</li>
      <li>Cuenta base: <b>puntos × multiplicador × contratos = dólares</b>.</li>
      <li>1 mini = 10 micros. Antes de cada trade, verifica que el contrato seleccionado es el que crees.</li>
    </ul>
  </div>
</div>`,

/* ─────────────────────────────────────────────────────────────────────
   l1c · Apalancamiento, margen y tick value
   ───────────────────────────────────────────────────────────────────── */
'l1c': `
<div class="lec">
  <h1 class="lec-h1">Apalancamiento, margen y tick value</h1>
  <p class="lec-lede">Estas tres palabras son las que hacen que los futuros sean emocionantes… y las que quiebran cuentas. Son la palanca, el depósito y la unidad mínima de movimiento. Si las entiendes bien, entiendes por qué se gana y se pierde tan rápido.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Comprar una casa de 2 millones con un enganche de 200 mil: controlas un bien enorme con poco dinero tuyo. Eso es <b>apalancamiento</b>. El enganche que el banco te exige guardar es el <b>margen</b>. Y el "escaloncito" mínimo con el que sube o baja el precio de la casa en el mercado sería el <b>tick</b>. La palanca multiplica lo bueno y lo malo por igual: si la casa sube 10%, ganas muchísimo sobre tu enganche; si baja 10%, también.</p>
  </div>

  <section class="lec-sec">
    <h2>1. El tick: el escalón mínimo del precio</h2>
    <p>El precio no se mueve de uno en uno. Se mueve en <b>ticks</b>: el mínimo saltito permitido. En el Nasdaq (NQ/MNQ), un tick vale <b>0.25 puntos</b>. O sea, el precio va 20000.00 → 20000.25 → 20000.50 → 20000.75 → 20001.00. Nunca verás 20000.10; ese número no existe para este contrato.</p>
    <p>Como <b>4 ticks hacen 1 punto</b> (0.25 × 4 = 1), el <b>tick value</b> (lo que vale cada tick en dinero) es el multiplicador dividido entre 4:</p>
    <ul>
      <li><b>MNQ</b>: $2 por punto ÷ 4 = <b>$0.50 por tick</b>.</li>
      <li><b>NQ</b>: $20 por punto ÷ 4 = <b>$5 por tick</b>.</li>
      <li><b>MES</b>: $5 por punto ÷ 4 = <b>$1.25 por tick</b>.</li>
      <li><b>ES</b>: $50 por punto ÷ 4 = <b>$12.50 por tick</b>.</li>
    </ul>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 600 260" style="width:100%;height:auto;max-width:520px" font-family="monospace">
      <text x="300" y="24" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">LA ESCALERA DE TICKS (NQ / MNQ)</text>
      <!-- escalones -->
      <g stroke="var(--line)" stroke-width="1.5" fill="none">
        <path d="M120,220 H240 V180 H360 V140 H480 V100"/>
      </g>
      <g font-size="11" fill="currentColor" text-anchor="middle">
        <circle cx="120" cy="220" r="4" fill="var(--dim)"/><text x="120" y="240">20000.00</text>
        <circle cx="240" cy="180" r="4" fill="var(--dim)"/><text x="240" y="172">20000.25</text>
        <circle cx="360" cy="140" r="4" fill="var(--dim)"/><text x="360" y="132">20000.50</text>
        <circle cx="480" cy="100" r="4" fill="var(--up)"/><text x="480" y="92">20001.00</text>
      </g>
      <text x="180" y="205" text-anchor="middle" fill="var(--up)" font-size="10">1 tick</text>
      <text x="300" y="165" text-anchor="middle" fill="var(--up)" font-size="10">1 tick</text>
      <text x="300" y="255" text-anchor="middle" fill="var(--dim)" font-size="10">1 tick = 0.25 puntos = $0.50 (MNQ) · 4 ticks = 1 punto</text>
    </svg>
    <figcaption>El precio del Nasdaq sube y baja de 0.25 en 0.25. Cada escaloncito es un tick; cuatro ticks completan un punto.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>2. El margen: el depósito de garantía</h2>
    <p>Para abrir un contrato no pagas su valor completo (que serían cientos de miles de dólares). Solo pones un <b>depósito de garantía</b> llamado <b>margen</b>. El bróker lo congela mientras tu posición está abierta, como aval de que puedes cubrir pérdidas. Cuando cierras, te lo libera.</p>
    <p>Hay dos tipos que oirás:</p>
    <ul>
      <li><b>Margen inicial</b>: lo que necesitas para abrir la posición.</li>
      <li><b>Margen intradía (day-trade margin)</b>: mucho más chico, aplica si abres y cierras el mismo día. Aquí es donde 1 MNQ puede pedir tan poco como $50–$100 de margen para controlar decenas de miles de dólares de índice.</li>
    </ul>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 240" style="width:100%;height:auto;max-width:600px" font-family="monospace">
      <text x="310" y="24" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">MARGEN vs VALOR CONTROLADO (MNQ)</text>
      <!-- barra grande valor -->
      <rect x="60" y="50" width="480" height="60" rx="8" fill="var(--w02)" stroke="currentColor" stroke-width="1.5"/>
      <text x="300" y="86" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">~$40,000 de índice controlado</text>
      <text x="300" y="128" text-anchor="middle" fill="var(--dim)" font-size="10">(20000 puntos × $2)</text>
      <!-- barrita margen -->
      <rect x="60" y="155" width="24" height="50" rx="5" fill="var(--up)" opacity="0.9"/>
      <text x="150" y="175" fill="var(--up)" font-size="12" font-weight="bold">~$50–100</text>
      <text x="150" y="192" fill="currentColor" font-size="10">margen intradía</text>
      <text x="150" y="206" fill="var(--dim)" font-size="9">lo único que "pones"</text>
      <line x1="72" y1="150" x2="72" y2="120" stroke="var(--up)" stroke-width="1" stroke-dasharray="2 2"/>
      <text x="420" y="185" fill="currentColor" font-size="10">Con muy poco dinero mueves</text>
      <text x="420" y="200" fill="currentColor" font-size="10">una posición enorme. Eso</text>
      <text x="420" y="215" fill="var(--down)" font-size="10">es apalancamiento puro.</text>
    </svg>
    <figcaption>Con un margen de decenas de dólares controlas decenas de miles en índice. La barra chica es tu depósito; la grande, lo que realmente mueves.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>3. Apalancamiento: la palanca que multiplica todo</h2>
    <p>El apalancamiento es la consecuencia de lo anterior: como controlas mucho poniendo poco, tus ganancias y pérdidas se calculan sobre <b>el valor grande</b>, no sobre tu depósito chico. Es una <b>palanca</b>: aplicas poca fuerza (poco dinero) y mueves algo pesado (mucho índice).</p>
    <p>El truco mental que debe quedarte grabado: <b>el apalancamiento no distingue entre ganar y perder</b>. La misma palanca que convierte $50 de margen en $200 de ganancia, convierte ese margen en $200 de pérdida con la misma facilidad. Por eso en futuros la pregunta correcta nunca es "¿cuánto puedo ganar?", sino <b>"¿cuánto puedo perder y lo aguanto?"</b>.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 220" style="width:100%;height:auto;max-width:600px" font-family="monospace">
      <text x="310" y="24" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">LA PALANCA CORTA PARA LOS DOS LADOS</text>
      <!-- fulcro -->
      <polygon points="310,150 290,185 330,185" fill="var(--dim)"/>
      <!-- barra palanca inclinada -->
      <line x1="120" y1="120" x2="500" y2="180" stroke="currentColor" stroke-width="3"/>
      <!-- input pequeño -->
      <circle cx="130" cy="122" r="10" fill="var(--dim)"/>
      <text x="130" y="105" text-anchor="middle" fill="currentColor" font-size="10">$50 margen</text>
      <!-- output grande arriba (ganancia) -->
      <rect x="470" y="120" width="80" height="26" rx="5" fill="var(--up)" opacity="0.85"/>
      <text x="510" y="138" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">+$200</text>
      <!-- output grande abajo (perdida) -->
      <rect x="470" y="184" width="80" height="26" rx="5" fill="var(--down)" opacity="0.85"/>
      <text x="510" y="202" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">-$200</text>
      <text x="250" y="205" fill="var(--dim)" font-size="10">Mismo esfuerzo, resultado grande… en ambas direcciones.</text>
    </svg>
    <figcaption>El apalancamiento amplifica por igual la ganancia y la pérdida. Un movimiento pequeño del índice se vuelve grande sobre tu depósito.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>4. Cómo se calcula tu P&L (ganancia/pérdida)</h2>
    <p>P&L significa <i>Profit and Loss</i>: tu resultado. La fórmula que usarás mil veces:</p>
    <p style="text-align:center"><b>P&L = (ticks a favor − ticks en contra) × tick value × número de contratos</b></p>
    <p>O, si lo piensas en puntos: <b>puntos × multiplicador × contratos</b>. Es la misma cuenta, solo cambias la unidad. Con esto puedes saber, ANTES de entrar, cuánto arriesgas si el precio va contra ti hasta tu stop, y cuánto ganas si llega a tu objetivo. Ese cálculo previo es lo que separa al trader del apostador.</p>
  </section>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>El margen intradía barato es una <b>trampa psicológica</b>. Ver que 1 MNQ "solo cuesta $50 de margen" te tienta a abrir 5, 10, 20 contratos. Pero el margen no es tu riesgo: tu riesgo es cuánto se puede mover el precio en contra. Con 10 contratos, un movimiento de 20 puntos son $400 en segundos. <b>El margen te dice si PUEDES abrir; tu stop te dice cuánto DEBES arriesgar.</b> No confundas ambos.</p>
  </div>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>Vas largo con <b>2 MNQ</b>. Pones el stop 15 puntos abajo (por si te equivocas) y el objetivo 30 puntos arriba.</p>
    <ul>
      <li>Riesgo si toca el stop: 15 pts × $2 × 2 = <b>−$60</b>.</li>
      <li>Ganancia si toca el objetivo: 30 pts × $2 × 2 = <b>+$120</b>.</li>
      <li>Relación riesgo-beneficio: arriesgas $60 para ganar $120 → <b>1:2</b>. Buen trade en el papel.</li>
    </ul>
    <p>Fíjate: hiciste toda esta cuenta <b>antes</b> de entrar. Sabías exactamente qué te podía pasar. Eso es operar con plan.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li><b>Tick</b> = escalón mínimo del precio. En Nasdaq = 0.25 puntos = 4 ticks por punto.</li>
      <li><b>Tick value</b> = multiplicador ÷ 4. MNQ $0.50 · NQ $5 · MES $1.25 · ES $12.50.</li>
      <li><b>Margen</b> = depósito de garantía para abrir; el intradía es muy chico. Te dice si puedes abrir, no cuánto arriesgar.</li>
      <li><b>Apalancamiento</b> = controlas mucho con poco; multiplica ganancias Y pérdidas por igual.</li>
      <li>Calcula tu P&L <b>antes</b> de entrar: puntos × multiplicador × contratos. Siempre.</li>
    </ul>
  </div>
</div>`,

/* ─────────────────────────────────────────────────────────────────────
   l2a · TradingView y la herramienta de posición
   ───────────────────────────────────────────────────────────────────── */
'l2a': `
<div class="lec">
  <h1 class="lec-h1">TradingView y la herramienta de posición</h1>
  <p class="lec-lede">TradingView es la pantalla donde vas a vivir. Es tu tablero de control: el gráfico, las herramientas de dibujo y —la joya de la corona— la <b>herramienta de posición</b>, que te dibuja el trade completo (entrada, stop y objetivo) antes de arriesgar un solo dólar.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Un piloto no despega mirando por la ventanilla y ya. Tiene un <b>tablero</b>: altímetro, combustible, rumbo. TradingView es ese tablero para el mercado. Y la herramienta de posición es como el plan de vuelo dibujado sobre el mapa: "despego aquí, si algo sale mal aterrizo acá, y mi destino es este otro punto". Todo marcado antes de encender motores.</p>
  </div>

  <section class="lec-sec">
    <h2>1. Las cuatro zonas de la pantalla</h2>
    <p>Al abrir TradingView vas a ver mucho, pero en realidad solo importan cuatro zonas. Ubícalas y el resto es ruido:</p>
    <ul>
      <li><b>El gráfico (centro)</b>: las velas del precio. Es el 90% de la pantalla y donde miras casi siempre.</li>
      <li><b>Barra de arriba</b>: eliges el símbolo (MNQ, MES…) y la <b>temporalidad</b> (1m, 5m, 15m: cuánto tiempo representa cada vela).</li>
      <li><b>Barra izquierda</b>: las herramientas de dibujo (líneas, rectángulos y la herramienta de posición).</li>
      <li><b>Panel derecho / abajo</b>: tu lista de símbolos y, si operas conectado, el panel de órdenes.</li>
    </ul>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 300" style="width:100%;height:auto;max-width:640px" font-family="monospace">
      <text x="320" y="20" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">MAPA DE LA PANTALLA</text>
      <!-- marco -->
      <rect x="30" y="34" width="580" height="240" rx="8" fill="var(--w02)" stroke="var(--line)" stroke-width="1.5"/>
      <!-- barra superior -->
      <rect x="30" y="34" width="580" height="30" fill="var(--w02)" stroke="var(--line)"/>
      <text x="55" y="54" fill="currentColor" font-size="11" font-weight="bold">MNQ</text>
      <text x="120" y="54" fill="var(--dim)" font-size="10">| 5m 15m 1H |</text>
      <text x="480" y="54" fill="var(--dim)" font-size="10">barra: símbolo + temporalidad</text>
      <!-- barra izquierda -->
      <rect x="30" y="64" width="34" height="210" fill="var(--w02)" stroke="var(--line)"/>
      <g fill="var(--dim)" font-size="12" text-anchor="middle">
        <text x="47" y="90">/</text><text x="47" y="115">▭</text><text x="47" y="140">⌸</text>
      </g>
      <text x="47" y="265" text-anchor="middle" fill="var(--dim)" font-size="8">tools</text>
      <!-- grafico centro con velas -->
      <g>
        <line x1="120" y1="120" x2="120" y2="200" stroke="var(--up)" stroke-width="1.5"/><rect x="114" y="140" width="12" height="45" fill="var(--up)"/>
        <line x1="160" y1="110" x2="160" y2="190" stroke="var(--up)" stroke-width="1.5"/><rect x="154" y="125" width="12" height="45" fill="var(--up)"/>
        <line x1="200" y1="120" x2="200" y2="210" stroke="var(--down)" stroke-width="1.5"/><rect x="194" y="135" width="12" height="45" fill="var(--down)"/>
        <line x1="240" y1="100" x2="240" y2="180" stroke="var(--up)" stroke-width="1.5"/><rect x="234" y="115" width="12" height="45" fill="var(--up)"/>
        <line x1="280" y1="115" x2="280" y2="200" stroke="var(--down)" stroke-width="1.5"/><rect x="274" y="130" width="12" height="50" fill="var(--down)"/>
        <line x1="320" y1="95" x2="320" y2="175" stroke="var(--up)" stroke-width="1.5"/><rect x="314" y="110" width="12" height="45" fill="var(--up)"/>
      </g>
      <text x="400" y="150" fill="var(--dim)" font-size="11">EL GRÁFICO (las velas)</text>
      <text x="400" y="168" fill="var(--dim)" font-size="9">aquí vive tu atención</text>
      <!-- panel derecho -->
      <rect x="540" y="64" width="70" height="210" fill="var(--w02)" stroke="var(--line)"/>
      <text x="575" y="90" text-anchor="middle" fill="var(--dim)" font-size="8">watchlist</text>
      <text x="575" y="200" text-anchor="middle" fill="var(--dim)" font-size="8">órdenes</text>
    </svg>
    <figcaption>Solo cuatro zonas importan: gráfico al centro, símbolo/temporalidad arriba, herramientas a la izquierda, listas y órdenes a la derecha.</figcaption>
  </figure>

  <figure class="lec-shot">
    <img src="assets/images/np-como.jpg" alt="Las dos pantallas de trabajo" decoding="async">
    <figcaption>La mesa de verdad, no un diagrama. IZQUIERDA: 5 minutos con NP A+ y NP ESTRUCTURA
      encendidos a la vez &mdash; ah&iacute; se arma el plan. DERECHA: 1 minuto con NP A+ solo &mdash;
      ah&iacute; se ejecuta. Nunca al rev&eacute;s.</figcaption>
  </figure>


  <section class="lec-sec">
    <h2>2. La temporalidad: cuánto dura cada vela</h2>
    <p>Arriba eliges la <b>temporalidad</b> (o "timeframe"): cuánto tiempo representa cada vela. En "5m", cada vela es 5 minutos. En "1m", un minuto. No es que el mercado cambie; cambia tu <b>lente</b>: 1m es un microscopio (mucho detalle, mucho ruido); 15m o 1H es una vista de dron (menos detalle, más contexto).</p>
    <p>En el método vas a saltar entre temporalidades: una amplia para ver "hacia dónde va el día" y una fina para afinar la entrada. Por ahora, quédate con que el mismo precio se ve distinto según el lente que elijas.</p>
  </section>

  <section class="lec-sec">
    <h2>3. La herramienta de posición: tu plan dibujado</h2>
    <p>Esta es la herramienta más importante de toda la lección. La <b>herramienta de posición larga</b> (Long Position) y su gemela <b>corta</b> (Short Position) te dejan dibujar sobre el gráfico las <b>tres líneas de todo trade</b>:</p>
    <ul>
      <li><b>Entrada</b>: el precio donde piensas entrar (la línea de en medio).</li>
      <li><b>Stop loss</b>: el precio donde aceptas que te equivocaste y sales con pérdida controlada (la zona <b style="color:var(--down)">roja</b>).</li>
      <li><b>Target / objetivo</b>: el precio donde tomas la ganancia (la zona <b style="color:var(--up)">verde</b>).</li>
    </ul>
    <p>Lo mágico: TradingView te muestra al instante la <b>relación riesgo-beneficio</b> (por ejemplo "1:2") y cuántos puntos hay a cada lado. Ves el trade completo <b>antes</b> de tocarlo.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 320" style="width:100%;height:auto;max-width:600px" font-family="monospace">
      <text x="310" y="22" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">HERRAMIENTA DE POSICIÓN LARGA</text>
      <!-- zona verde target -->
      <rect x="120" y="50" width="380" height="80" fill="var(--up)" opacity="0.14"/>
      <line x1="120" y1="50" x2="500" y2="50" stroke="var(--up)" stroke-width="2"/>
      <text x="510" y="55" fill="var(--up)" font-size="11" font-weight="bold">TARGET 20120</text>
      <text x="130" y="95" fill="var(--up)" font-size="11">GANANCIA (+60 pts)</text>
      <!-- linea entrada -->
      <line x1="120" y1="130" x2="500" y2="130" stroke="currentColor" stroke-width="2" stroke-dasharray="5 3"/>
      <text x="510" y="135" fill="currentColor" font-size="11" font-weight="bold">ENTRADA 20060</text>
      <!-- zona roja stop -->
      <rect x="120" y="130" width="380" height="50" fill="var(--down)" opacity="0.14"/>
      <line x1="120" y1="180" x2="500" y2="180" stroke="var(--down)" stroke-width="2"/>
      <text x="510" y="185" fill="var(--down)" font-size="11" font-weight="bold">STOP 20030</text>
      <text x="130" y="162" fill="var(--down)" font-size="11">RIESGO (−30 pts)</text>
      <!-- etiqueta RR -->
      <rect x="200" y="215" width="220" height="42" rx="8" fill="var(--w02)" stroke="var(--line)"/>
      <text x="310" y="235" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">Riesgo : Beneficio = 1 : 2</text>
      <text x="310" y="250" text-anchor="middle" fill="var(--dim)" font-size="9">arriesgas 30 pts para ganar 60</text>
      <text x="310" y="290" text-anchor="middle" fill="var(--dim)" font-size="10">Todo el trade dibujado ANTES de entrar. Sin sorpresas.</text>
    </svg>
    <figcaption>La herramienta de posición pinta las tres líneas del trade y calcula sola la relación riesgo-beneficio. Verde arriba (ganas), rojo abajo (pierdes controlado).</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>4. Larga vs corta: la misma idea, volteada</h2>
    <p>Si esperas subida, usas la <b>posición larga</b>: entrada abajo, target arriba (verde), stop más abajo (rojo). Si esperas bajada, usas la <b>posición corta</b>: todo se voltea, el target queda <b>abajo</b> (verde, porque ganas cuando baja) y el stop <b>arriba</b> (rojo). Es exactamente el mismo concepto de la lección l1a (largo/corto), ahora dibujado.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 240" style="width:100%;height:auto;max-width:600px" font-family="monospace">
      <text x="310" y="20" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">LARGA vs CORTA, DIBUJADAS</text>
      <!-- larga -->
      <text x="160" y="42" text-anchor="middle" fill="var(--up)" font-size="11" font-weight="bold">LARGA (esperas subida)</text>
      <rect x="70" y="55" width="180" height="30" fill="var(--up)" opacity="0.16"/><text x="160" y="74" text-anchor="middle" fill="var(--up)" font-size="9">TARGET (arriba)</text>
      <line x1="70" y1="110" x2="250" y2="110" stroke="currentColor" stroke-dasharray="4 3"/><text x="160" y="105" text-anchor="middle" fill="currentColor" font-size="9">entrada</text>
      <rect x="70" y="110" width="180" height="26" fill="var(--down)" opacity="0.16"/><text x="160" y="128" text-anchor="middle" fill="var(--down)" font-size="9">STOP (abajo)</text>
      <!-- corta -->
      <text x="460" y="42" text-anchor="middle" fill="var(--down)" font-size="11" font-weight="bold">CORTA (esperas bajada)</text>
      <rect x="370" y="55" width="180" height="26" fill="var(--down)" opacity="0.16"/><text x="460" y="72" text-anchor="middle" fill="var(--down)" font-size="9">STOP (arriba)</text>
      <line x1="370" y1="100" x2="550" y2="100" stroke="currentColor" stroke-dasharray="4 3"/><text x="460" y="95" text-anchor="middle" fill="currentColor" font-size="9">entrada</text>
      <rect x="370" y="100" width="180" height="34" fill="var(--up)" opacity="0.16"/><text x="460" y="122" text-anchor="middle" fill="var(--up)" font-size="9">TARGET (abajo)</text>
      <text x="310" y="185" text-anchor="middle" fill="var(--dim)" font-size="10">En la corta, ganar es que BAJE: por eso el verde queda abajo.</text>
      <text x="310" y="205" text-anchor="middle" fill="var(--dim)" font-size="10">El verde SIEMPRE es tu ganancia; el rojo SIEMPRE tu riesgo.</text>
    </svg>
    <figcaption>La posición corta es la larga volteada: el objetivo verde queda abajo porque ganas cuando el precio baja. Verde = ganancia, rojo = riesgo, siempre.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>La herramienta de posición <b>no manda la orden</b>: es un dibujo, un plan. Dibujar un trade hermoso no te mete al mercado. Sirve para <b>pensar</b> antes de actuar: ¿me gusta esta relación riesgo-beneficio? ¿el stop está en un lugar lógico? Si el dibujo no te convence, no hay trade. La ejecución real (mandar la orden) viene en la siguiente lección.</p>
  </div>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>MNQ cotiza en 20060. Crees que sube. Dibujas una posición larga: entrada 20060, stop en 20030 (30 pts de riesgo), target en 20120 (60 pts de ganancia). TradingView te marca "1:2" arriba. Con 1 MNQ eso es arriesgar $60 para ganar $120. Te gusta el plan. Ahora sí, en la próxima lección, aprendes a convertir ese dibujo en una orden real.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>TradingView tiene cuatro zonas: gráfico (centro), símbolo/temporalidad (arriba), herramientas (izquierda), listas/órdenes (derecha).</li>
      <li>La <b>temporalidad</b> es tu lente: cada vela dura ese tiempo. Fina = detalle/ruido; amplia = contexto.</li>
      <li>La <b>herramienta de posición</b> dibuja entrada + stop (rojo) + target (verde) y te da la relación riesgo-beneficio al instante.</li>
      <li>Larga para subidas, corta para bajadas: es la misma idea volteada. Verde siempre es ganancia, rojo siempre es riesgo.</li>
      <li>Es un plan, no una orden: primero convénceme el dibujo, después se ejecuta.</li>
    </ul>
  </div>
</div>`,

/* ─────────────────────────────────────────────────────────────────────
   l2b · Órdenes: market, límite, stop
   ───────────────────────────────────────────────────────────────────── */
'l2b': `
<div class="lec">
  <h1 class="lec-h1">Órdenes: market, límite, stop</h1>
  <p class="lec-lede">Una orden es la instrucción que le das al mercado: "cómprame", "véndeme", "sácame si esto sale mal". Solo hay tres tipos básicos, y con ellos armas absolutamente todo. Confundirlos es de los errores más caros del principiante, así que vamos despacio.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Estás en una subasta de tacos:</p>
    <ul>
      <li><b>Orden a mercado</b>: "¡me lo llevo YA, al precio que sea!" — rápido, seguro que te lo dan, pero no eliges el precio exacto.</li>
      <li><b>Orden límite</b>: "solo lo compro si baja a 15 pesos, ni un peso más" — eliges el precio, pero quizá nunca baje y te quedes sin taco.</li>
      <li><b>Orden stop</b>: "si esto se pone feo y sube a 30, sácame automáticamente" — es tu red de seguridad, se dispara sola.</li>
    </ul>
  </div>

  <section class="lec-sec">
    <h2>1. Orden a mercado (market): ya, al precio que haya</h2>
    <p>La <b>orden a mercado</b> se ejecuta <b>de inmediato</b> al mejor precio disponible en ese instante. Ventaja: es segura, entras o sales seguro. Desventaja: no controlas el precio exacto; pagas lo que haya. En mercados líquidos como MNQ, la diferencia suele ser de uno o dos ticks, casi nada. La usas cuando lo importante es <b>estar dentro o fuera YA</b>, no el centavo exacto.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 200" style="width:100%;height:auto;max-width:600px" font-family="monospace">
      <text x="310" y="22" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">ORDEN A MERCADO</text>
      <line x1="60" y1="120" x2="560" y2="120" stroke="var(--line)"/>
      <text x="60" y="140" fill="var(--dim)" font-size="10">precio ahora: 20060</text>
      <circle cx="300" cy="120" r="8" fill="currentColor"/>
      <text x="300" y="100" text-anchor="middle" fill="currentColor" font-size="10">tú aprietas COMPRAR</text>
      <path d="M300,120 L330,120" stroke="var(--up)" stroke-width="3" marker-end="url(#mk1)"/>
      <text x="410" y="124" fill="var(--up)" font-size="11" font-weight="bold">ejecutado al instante</text>
      <text x="310" y="175" text-anchor="middle" fill="var(--dim)" font-size="10">Rápido y seguro. No eliges el precio exacto, pagas el de ese momento.</text>
      <defs><marker id="mk1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--up)"/></marker></defs>
    </svg>
    <figcaption>La orden a mercado te mete o te saca de inmediato al mejor precio disponible. Priorizas velocidad sobre precio exacto.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>2. Orden límite (limit): tu precio o nada</h2>
    <p>La <b>orden límite</b> le dice al mercado: "solo ejecuta a este precio o mejor". Si compras, pones el límite <b>por debajo</b> del precio actual y esperas a que baje hasta ahí. Ventaja: controlas el precio exacto, entras "barato". Desventaja: si el precio nunca llega, <b>tu orden nunca se ejecuta</b> y te quedas fuera. Es la orden del que espera con paciencia el precio que quiere.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 220" style="width:100%;height:auto;max-width:600px" font-family="monospace">
      <text x="310" y="22" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">ORDEN LÍMITE (comprar barato)</text>
      <!-- precio actual -->
      <line x1="60" y1="60" x2="560" y2="60" stroke="currentColor" stroke-width="1.5"/>
      <text x="565" y="64" fill="currentColor" font-size="10">precio 20060</text>
      <!-- linea limite -->
      <line x1="60" y1="150" x2="560" y2="150" stroke="var(--up)" stroke-width="2" stroke-dasharray="6 4"/>
      <text x="565" y="154" fill="var(--up)" font-size="10">límite 20030</text>
      <!-- precio bajando -->
      <polyline points="90,60 160,80 230,110 300,150" fill="none" stroke="var(--dim)" stroke-width="2"/>
      <circle cx="300" cy="150" r="7" fill="var(--up)"/>
      <text x="300" y="175" text-anchor="middle" fill="var(--up)" font-size="10">baja hasta aquí → SE EJECUTA</text>
      <text x="430" y="110" fill="var(--dim)" font-size="9">si nunca baja,</text>
      <text x="430" y="124" fill="var(--dim)" font-size="9">nunca entras</text>
      <text x="310" y="205" text-anchor="middle" fill="var(--dim)" font-size="10">Eliges el precio; el riesgo es quedarte esperando fuera del mercado.</text>
    </svg>
    <figcaption>La orden límite espera pacientemente tu precio. Se ejecuta solo si el mercado llega; si no, no entras.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>3. Orden stop: tu red de seguridad automática</h2>
    <p>La <b>orden stop</b> es la más importante para sobrevivir. Es una orden que <b>duerme</b> hasta que el precio toca un nivel; ahí se <b>despierta</b> y se convierte en orden a mercado para sacarte. Su uso estrella es el <b>stop loss</b>: la pones donde aceptas que te equivocaste, y si el precio llega, te saca <b>sola</b>, sin que tengas que estar mirando ni decidir en caliente.</p>
    <p>El stop es lo que convierte una pérdida pequeña y planeada en algo que no crece sin control. Sin stop, una operación mala puede comerse la cuenta entera mientras tú "esperas a que se recupere". <b>Nunca operes sin stop.</b> Es la regla que más dinero salva.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 230" style="width:100%;height:auto;max-width:600px" font-family="monospace">
      <text x="310" y="22" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">STOP LOSS (te saca solo)</text>
      <!-- entrada -->
      <line x1="60" y1="80" x2="560" y2="80" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="565" y="84" fill="currentColor" font-size="10">entraste 20060</text>
      <!-- stop -->
      <line x1="60" y1="170" x2="560" y2="170" stroke="var(--down)" stroke-width="2"/>
      <text x="565" y="174" fill="var(--down)" font-size="10">stop 20030</text>
      <!-- precio cayendo hasta stop -->
      <polyline points="90,80 150,95 210,90 270,120 330,150 380,170" fill="none" stroke="var(--down)" stroke-width="2.5"/>
      <circle cx="380" cy="170" r="7" fill="var(--down)"/>
      <text x="380" y="195" text-anchor="middle" fill="var(--down)" font-size="10">toca stop → te SACA automático</text>
      <rect x="70" y="55" width="150" height="20" rx="4" fill="var(--up)" opacity="0.14"/>
      <text x="145" y="69" text-anchor="middle" fill="var(--up)" font-size="9">pérdida máxima planeada</text>
      <text x="310" y="218" text-anchor="middle" fill="var(--dim)" font-size="10">Sin stop, la pérdida crece sin límite. Con stop, ya sabías cuánto podías perder.</text>
    </svg>
    <figcaption>El stop loss vigila por ti: si el precio cae al nivel que fijaste, te saca automáticamente con una pérdida ya planeada.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>4. Cómo se combinan en un trade real</h2>
    <p>Un trade bien armado casi siempre usa las tres ideas juntas. Un ejemplo típico de entrada agresiva:</p>
    <ul>
      <li><b>Entrada</b> con orden a mercado (o límite si esperas un mejor precio).</li>
      <li><b>Stop loss</b> justo abajo (si eres largo), como red de seguridad.</li>
      <li><b>Target</b> con una orden límite arriba, para tomar ganancia sola cuando llegue.</li>
    </ul>
    <p>Muchas plataformas empaquetan esto como un <b>bracket</b> (orden con corchetes): entras y automáticamente quedan colocados tu stop y tu target al mismo tiempo. Así el trade se cuida solo mientras tú respiras.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 240" style="width:100%;height:auto;max-width:600px" font-family="monospace">
      <text x="310" y="22" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">EL TRADE COMPLETO (bracket)</text>
      <!-- target limit -->
      <line x1="80" y1="55" x2="540" y2="55" stroke="var(--up)" stroke-width="2"/>
      <text x="90" y="48" fill="var(--up)" font-size="10">TARGET · orden límite (toma ganancia)</text>
      <!-- entrada -->
      <line x1="80" y1="130" x2="540" y2="130" stroke="currentColor" stroke-width="2" stroke-dasharray="5 3"/>
      <text x="90" y="123" fill="currentColor" font-size="10">ENTRADA · a mercado (entras ya)</text>
      <!-- stop -->
      <line x1="80" y1="195" x2="540" y2="195" stroke="var(--down)" stroke-width="2"/>
      <text x="90" y="212" fill="var(--down)" font-size="10">STOP · orden stop (red de seguridad)</text>
      <!-- llaves -->
      <path d="M556,55 Q568,55 568,92 Q568,130 580,130" fill="none" stroke="var(--dim)" stroke-width="1"/>
      <path d="M556,195 Q568,195 568,162 Q568,130 580,130" fill="none" stroke="var(--dim)" stroke-width="1"/>
      <text x="588" y="134" fill="var(--dim)" font-size="9">se colocan</text>
      <text x="588" y="146" fill="var(--dim)" font-size="9">juntos</text>
    </svg>
    <figcaption>Un bracket combina las tres órdenes: entras a mercado y quedan puestos de golpe el stop (abajo) y el target (arriba). El trade se administra solo.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>El error más caro de novato: <b>confundir "límite" con "stop"</b> al colocar tu salida de emergencia. Si querías protegerte y pusiste una orden límite en el lugar equivocado, tu red de seguridad puede <b>nunca dispararse</b>, y una pérdida pequeña se vuelve enorme. Regla práctica: para <b>cortar pérdidas</b> se usa <b>stop</b>; para <b>tomar ganancias</b> se usa <b>límite</b>. Revisa siempre el tipo de orden antes de confirmar.</p>
  </div>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>Vas largo en MNQ. Entras a mercado en 20060. Al instante colocas: stop en 20030 (riesgo de 30 pts = $60 con 1 MNQ) y target límite en 20120 (ganancia de 60 pts = $120). Te vas a preparar un café. Pase lo que pase, el trade tiene solo dos finales posibles: te saca el stop (−$60) o te llena el target (+$120). Ningún escenario te toma por sorpresa. Eso es control.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li><b>Market</b>: ejecuta ya, al precio que haya. Rápido y seguro, sin control del precio exacto.</li>
      <li><b>Límite</b>: solo ejecuta a tu precio o mejor. Controlas el precio, pero puede que nunca entres.</li>
      <li><b>Stop</b>: duerme hasta que el precio toca un nivel y ahí se dispara. Es tu red de seguridad (stop loss).</li>
      <li>Un trade completo combina las tres en un <b>bracket</b>: entrada + stop + target colocados juntos.</li>
      <li>Para <b>cortar pérdidas</b> usas stop; para <b>tomar ganancias</b> usas límite. Nunca los confundas. Nunca operes sin stop.</li>
    </ul>
  </div>
</div>`,

/* ─────────────────────────────────────────────────────────────────────
   l2c · La copiadora y varias cuentas
   ───────────────────────────────────────────────────────────────────── */
'l2c': `
<div class="lec">
  <h1 class="lec-h1">La copiadora y varias cuentas</h1>
  <p class="lec-lede">Cuando dominas un setup, la pregunta natural es: "¿y si en vez de una cuenta opero cinco a la vez con el mismo clic?". Eso hace una <b>copiadora</b>. Es la herramienta que multiplica tu ejecución en el mundo del fondeo, y también donde más gente se apura y se lastima. Vamos a entenderla bien.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Imagina un maestro de baile frente a un espejo, y detrás de él veinte alumnos. Cada movimiento que hace el maestro, todos lo repiten al mismo tiempo. La <b>copiadora</b> es ese espejo: tú operas en una cuenta <b>maestra</b>, y el software repite exactamente esa orden en todas las cuentas <b>seguidoras</b> conectadas. Un solo clic tuyo, veinte trades idénticos.</p>
  </div>

  <section class="lec-sec">
    <h2>1. Por qué existen "varias cuentas"</h2>
    <p>En el negocio del <b>fondeo</b> (que verás a fondo en el Programa 4), no operas tu propio dinero: operas cuentas de una empresa que te evalúa. Como cada cuenta pasada te da acceso a un payout (un cobro), tener <b>varias cuentas</b> pequeñas puede rendir más que una sola grande. Pero operar 5 o 10 cuentas <b>a mano</b>, una por una, es imposible sin cometer errores. Ahí entra la copiadora.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 300" style="width:100%;height:auto;max-width:640px" font-family="monospace">
      <text x="320" y="24" text-anchor="middle" fill="currentColor" font-size="14" font-weight="bold">LA COPIADORA (1 clic → N cuentas)</text>
      <!-- maestra -->
      <rect x="250" y="45" width="140" height="56" rx="10" fill="var(--w02)" stroke="currentColor" stroke-width="2"/>
      <text x="320" y="70" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">CUENTA MAESTRA</text>
      <text x="320" y="88" text-anchor="middle" fill="var(--dim)" font-size="10">tú operas aquí (1 clic)</text>
      <!-- lineas a seguidoras -->
      <g stroke="var(--up)" stroke-width="1.5" fill="none">
        <path d="M320,101 L110,160" marker-end="url(#cp1)"/>
        <path d="M320,101 L235,160" marker-end="url(#cp1)"/>
        <path d="M320,101 L405,160" marker-end="url(#cp1)"/>
        <path d="M320,101 L530,160" marker-end="url(#cp1)"/>
      </g>
      <!-- seguidoras -->
      <g>
        <rect x="60" y="165" width="110" height="48" rx="8" fill="var(--w02)" stroke="var(--up)" stroke-width="1.5"/>
        <text x="115" y="185" text-anchor="middle" fill="var(--up)" font-size="11" font-weight="bold">Cuenta A</text>
        <text x="115" y="202" text-anchor="middle" fill="var(--dim)" font-size="9">copia idéntica</text>
        <rect x="185" y="165" width="110" height="48" rx="8" fill="var(--w02)" stroke="var(--up)" stroke-width="1.5"/>
        <text x="240" y="185" text-anchor="middle" fill="var(--up)" font-size="11" font-weight="bold">Cuenta B</text>
        <text x="240" y="202" text-anchor="middle" fill="var(--dim)" font-size="9">copia idéntica</text>
        <rect x="350" y="165" width="110" height="48" rx="8" fill="var(--w02)" stroke="var(--up)" stroke-width="1.5"/>
        <text x="405" y="185" text-anchor="middle" fill="var(--up)" font-size="11" font-weight="bold">Cuenta C</text>
        <text x="405" y="202" text-anchor="middle" fill="var(--dim)" font-size="9">copia idéntica</text>
        <rect x="475" y="165" width="110" height="48" rx="8" fill="var(--w02)" stroke="var(--up)" stroke-width="1.5"/>
        <text x="530" y="185" text-anchor="middle" fill="var(--up)" font-size="11" font-weight="bold">Cuenta D</text>
        <text x="530" y="202" text-anchor="middle" fill="var(--dim)" font-size="9">copia idéntica</text>
      </g>
      <text x="320" y="250" text-anchor="middle" fill="currentColor" font-size="11">Entras, mueves stop, cierras: TODO se replica al instante en cada cuenta.</text>
      <text x="320" y="272" text-anchor="middle" fill="var(--dim)" font-size="10">Multiplicas tu ejecución sin multiplicar tu trabajo… ni tus decisiones.</text>
      <defs><marker id="cp1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--up)"/></marker></defs>
    </svg>
    <figcaption>La copiadora replica cada acción de la cuenta maestra en todas las seguidoras. Un solo trade tuyo se convierte en muchos idénticos.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>2. Maestra y seguidoras: quién manda</h2>
    <p>El montaje es simple de nombrar: hay una cuenta <b>maestra</b> (donde tú operas de verdad) y varias <b>seguidoras</b> (que solo obedecen). Tú <b>nunca</b> tocas las seguidoras a mano; si lo haces, rompes la sincronía. Toda tu atención va a la maestra. La copiadora se encarga del resto: abrir, mover el stop, cerrar. Lo que pasa en la maestra, pasa en todas.</p>
  </section>

  <section class="lec-sec">
    <h2>3. El escalado por proporción: no todas copian igual</h2>
    <p>Las copiadoras buenas dejan poner un <b>factor de proporción</b>: cuántos contratos copia cada seguidora respecto a la maestra. Si la maestra opera 1 contrato, una seguidora puede copiar 1, otra 2, otra 0.5 (según su tamaño). Así ajustas el riesgo a cada cuenta sin cambiar tu forma de operar. Regla de oro mientras aprendes: <b>proporción conservadora</b>. Es tentador poner factores altos para "ganar más rápido", pero eso también multiplica la pérdida cuando el trade sale mal.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 210" style="width:100%;height:auto;max-width:600px" font-family="monospace">
      <text x="310" y="22" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">FACTOR DE PROPORCIÓN</text>
      <!-- maestra 1x -->
      <rect x="60" y="60" width="90" height="40" rx="6" fill="var(--w02)" stroke="currentColor" stroke-width="1.5"/>
      <text x="105" y="78" text-anchor="middle" fill="currentColor" font-size="10" font-weight="bold">MAESTRA</text>
      <text x="105" y="93" text-anchor="middle" fill="var(--dim)" font-size="9">1 contrato</text>
      <line x1="150" y1="80" x2="200" y2="80" stroke="var(--line)" marker-end="url(#pr1)"/>
      <!-- seguidoras con factores -->
      <g font-size="9">
        <rect x="210" y="40" width="120" height="30" rx="5" fill="var(--w02)" stroke="var(--up)"/><text x="270" y="59" text-anchor="middle" fill="var(--up)">A · x1 → 1 contrato</text>
        <rect x="210" y="80" width="120" height="30" rx="5" fill="var(--w02)" stroke="var(--up)"/><text x="270" y="99" text-anchor="middle" fill="var(--up)">B · x2 → 2 contratos</text>
        <rect x="210" y="120" width="120" height="30" rx="5" fill="var(--w02)" stroke="var(--dim)"/><text x="270" y="139" text-anchor="middle" fill="var(--dim)">C · x0.5 → media</text>
      </g>
      <text x="450" y="70" fill="currentColor" font-size="10">Cada cuenta copia</text>
      <text x="450" y="86" fill="currentColor" font-size="10">según su tamaño.</text>
      <text x="450" y="110" fill="var(--down)" font-size="10">Factor alto = ganas</text>
      <text x="450" y="126" fill="var(--down)" font-size="10">y pierdes más rápido.</text>
      <defs><marker id="pr1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--line)"/></marker></defs>
    </svg>
    <figcaption>El factor de proporción decide cuántos contratos copia cada seguidora. Ajusta el riesgo por cuenta; un factor alto amplifica todo, para bien y para mal.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>4. El arma de doble filo</h2>
    <p>La copiadora <b>no distingue trades buenos de malos</b>: copia lo que le des. Si haces un trade excelente, lo multiplica. Si haces una tontería (operar sin señal, revancha, romper tu regla), <b>también la multiplica</b>, en todas las cuentas, al mismo tiempo. Un mal día sin copiadora daña una cuenta; con copiadora mal usada, daña diez de golpe.</p>
    <p>Por eso la copiadora es un <b>amplificador de disciplina</b>: hace más grande lo que ya eres. No se la das a alguien que todavía no domina un solo trade limpio. Primero: consistencia en una cuenta. Después: multiplicar esa consistencia.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 200" style="width:100%;height:auto;max-width:600px" font-family="monospace">
      <text x="310" y="22" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">AMPLIFICA LO QUE YA ERES</text>
      <!-- buen trade -->
      <text x="160" y="52" text-anchor="middle" fill="var(--up)" font-size="11" font-weight="bold">Trade disciplinado</text>
      <g fill="var(--up)" opacity="0.85">
        <rect x="90" y="70" width="20" height="30" rx="2"/><rect x="120" y="70" width="20" height="30" rx="2"/>
        <rect x="150" y="70" width="20" height="30" rx="2"/><rect x="180" y="70" width="20" height="30" rx="2"/>
        <rect x="210" y="70" width="20" height="30" rx="2"/>
      </g>
      <text x="160" y="120" text-anchor="middle" fill="var(--up)" font-size="10">×5 ganancias buenas</text>
      <!-- mal trade -->
      <text x="460" y="52" text-anchor="middle" fill="var(--down)" font-size="11" font-weight="bold">Trade impulsivo</text>
      <g fill="var(--down)" opacity="0.85">
        <rect x="390" y="70" width="20" height="30" rx="2"/><rect x="420" y="70" width="20" height="30" rx="2"/>
        <rect x="450" y="70" width="20" height="30" rx="2"/><rect x="480" y="70" width="20" height="30" rx="2"/>
        <rect x="510" y="70" width="20" height="30" rx="2"/>
      </g>
      <text x="460" y="120" text-anchor="middle" fill="var(--down)" font-size="10">×5 pérdidas de golpe</text>
      <text x="310" y="165" text-anchor="middle" fill="var(--dim)" font-size="10">La copiadora no te hace mejor trader: multiplica al trader que ya eres.</text>
    </svg>
    <figcaption>La copiadora amplifica igual las buenas y las malas decisiones. Solo se activa cuando ya hay disciplina que valga la pena multiplicar.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>No enciendas la copiadora hasta que tengas <b>un trade consistente en UNA sola cuenta</b>. Multiplicar por diez a alguien que todavía pierde solo hace que pierda diez veces más rápido. La copiadora es del Programa 4 (fondeo) por una razón: primero método y disciplina, después escala. La memoria del método lo dice fuerte: <b>nada de correr antes de caminar.</b></p>
  </div>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>Tienes 4 cuentas de evaluación conectadas a una copiadora, todas con factor x1. Ves tu setup A+, entras 1 MNQ en la maestra. Al instante hay 4 posiciones idénticas de 1 MNQ. El trade gana 40 puntos ($80 por cuenta). Resultado total: 4 × $80 = <b>$320</b> con el mismo esfuerzo de un solo trade. Pero si ese trade hubiera sido un impulso perdedor de −$80, habrías perdido <b>$320</b> igual de rápido. El clic es uno; las consecuencias, cuatro.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>La <b>copiadora</b> replica cada acción de una cuenta <b>maestra</b> en varias <b>seguidoras</b> con un solo clic.</li>
      <li>Solo operas la maestra; nunca tocas las seguidoras a mano.</li>
      <li>El <b>factor de proporción</b> ajusta cuántos contratos copia cada cuenta según su tamaño. Sé conservador al aprender.</li>
      <li>Multiplica por igual aciertos y errores: es un amplificador de la disciplina que ya tienes.</li>
      <li>Enciéndela solo cuando ya seas consistente en una cuenta. Primero método, después escala.</li>
    </ul>
  </div>
</div>`,

/* ─────────────────────────────────────────────────────────────────────
   l3a · Horario de NY y el premarket
   ───────────────────────────────────────────────────────────────────── */
'l3a': `
<div class="lec">
  <h1 class="lec-h1">Horario de NY y el premarket</h1>
  <p class="lec-lede">El mercado tiene horario de oficina, y no todas las horas valen lo mismo. Entender el reloj de Nueva York es entender <b>cuándo</b> vale la pena estar frente a la pantalla y cuándo lo mejor es no hacer nada. En trading, el "cuándo" pesa tanto como el "qué".</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Un restaurante abre a las 8 pero la hora pico es a las 2. Antes de esa hora hay pocos comensales, el ambiente está tibio. A las 2 se llena, todo se mueve, ahí es donde el negocio realmente pasa. El mercado es igual: abre "temprano" (premarket) con poca gente, y explota de actividad justo en la <b>apertura de Nueva York</b>. Ahí es la hora pico. Trades a deshoras son como cocinar para un comedor vacío.</p>
  </div>

  <section class="lec-sec">
    <h2>1. El horario que manda: Nueva York</h2>
    <p>Aunque los futuros se operan casi 24 horas, el corazón del día es la sesión de acciones de EE.UU., que abre a las <b>9:30 a.m. hora de Nueva York</b> (ET) y cierra a las <b>4:00 p.m. ET</b>. Ese bloque se llama <b>RTH</b> (Regular Trading Hours). Es cuando llegan los grandes jugadores (bancos, fondos), cuando hay más <b>volumen</b> (cantidad de operaciones) y cuando el precio se mueve con intención en lugar de vagar sin rumbo.</p>
    <p>La estrella es la <b>apertura (9:30 ET)</b>: se destapa toda la energía que se acumuló durante la noche. Los primeros 30–60 minutos suelen traer los movimientos más grandes y limpios del día. Casi todo el método NorthPoint vive alrededor de esa apertura.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 660 200" style="width:100%;height:auto;max-width:660px" font-family="monospace">
      <text x="330" y="24" text-anchor="middle" fill="currentColor" font-size="14" font-weight="bold">EL DÍA EN HORA DE NUEVA YORK</text>
      <line x1="40" y1="110" x2="630" y2="110" stroke="var(--line)" stroke-width="2"/>
      <!-- premarket -->
      <rect x="40" y="95" width="230" height="30" fill="var(--dim)" opacity="0.18"/>
      <text x="155" y="90" text-anchor="middle" fill="var(--dim)" font-size="10">PREMARKET (4:00–9:30)</text>
      <text x="155" y="150" text-anchor="middle" fill="var(--dim)" font-size="9">poco volumen, tanteo</text>
      <!-- RTH -->
      <rect x="270" y="90" width="300" height="40" fill="var(--up)" opacity="0.2"/>
      <text x="420" y="83" text-anchor="middle" fill="var(--up)" font-size="10" font-weight="bold">RTH · SESIÓN REGULAR (9:30–16:00)</text>
      <text x="420" y="150" text-anchor="middle" fill="var(--up)" font-size="9">volumen real, movimiento con intención</text>
      <!-- apertura marca -->
      <line x1="270" y1="70" x2="270" y2="135" stroke="var(--up)" stroke-width="2"/>
      <circle cx="270" cy="110" r="5" fill="var(--up)"/>
      <text x="270" y="180" text-anchor="middle" fill="var(--up)" font-size="10" font-weight="bold">9:30 APERTURA</text>
      <!-- cierre -->
      <line x1="570" y1="95" x2="570" y2="125" stroke="var(--dim)" stroke-width="1.5"/>
      <text x="600" y="114" text-anchor="middle" fill="var(--dim)" font-size="9">16:00</text>
    </svg>
    <figcaption>El premarket es el calentamiento; la sesión regular (RTH) es el partido. La apertura de las 9:30 es el pitido inicial y trae los movimientos más fuertes.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>2. El premarket: el calentamiento</h2>
    <p>El <b>premarket</b> es el tiempo antes de la apertura oficial (desde la madrugada hasta 9:30 ET). El mercado ya cotiza, pero con <b>poca gente y poco volumen</b>. Es un tanteo: reacciona a noticias de la noche, a datos económicos, a lo que pasó en Europa y Asia. Sirve para <b>observar</b> (¿el día viene alcista o bajista?, ¿dónde están los niveles importantes?), pero es un terreno traicionero para operar: con poco volumen, el precio da brincos falsos que barren stops y luego se voltean.</p>
    <p>Regla para principiantes: el premarket es para <b>mirar y preparar</b>, no para pelear. Ves cómo llega el día, marcas tus niveles, y esperas a que abra la sesión de verdad.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 220" style="width:100%;height:auto;max-width:600px" font-family="monospace">
      <text x="310" y="22" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">VOLUMEN: PREMARKET vs APERTURA</text>
      <!-- eje -->
      <line x1="60" y1="180" x2="580" y2="180" stroke="var(--line)"/>
      <!-- barras premarket bajas -->
      <g fill="var(--dim)" opacity="0.6">
        <rect x="80" y="165" width="24" height="15"/><rect x="115" y="160" width="24" height="20"/>
        <rect x="150" y="168" width="24" height="12"/><rect x="185" y="158" width="24" height="22"/>
        <rect x="220" y="163" width="24" height="17"/>
      </g>
      <text x="160" y="205" text-anchor="middle" fill="var(--dim)" font-size="9">premarket (bajo)</text>
      <!-- barra gigante apertura -->
      <line x1="300" y1="180" x2="300" y2="60" stroke="var(--up)" stroke-width="1" stroke-dasharray="3 3"/>
      <g fill="var(--up)" opacity="0.85">
        <rect x="320" y="70" width="30" height="110"/><rect x="360" y="90" width="30" height="90"/>
        <rect x="400" y="80" width="30" height="100"/><rect x="440" y="110" width="30" height="70"/>
        <rect x="480" y="120" width="30" height="60"/>
      </g>
      <text x="400" y="205" text-anchor="middle" fill="var(--up)" font-size="9">apertura RTH (alto)</text>
      <text x="300" y="52" text-anchor="middle" fill="var(--up)" font-size="10" font-weight="bold">9:30</text>
      <text x="90" y="45" fill="currentColor" font-size="9">volumen</text>
    </svg>
    <figcaption>El volumen se dispara justo en la apertura. Poco volumen (premarket) = movimientos poco fiables; mucho volumen (apertura) = movimientos con sustento.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>3. El problema de la zona horaria (para ti, en México)</h2>
    <p>Aquí un detalle práctico enorme: tú vives en México, no en Nueva York. Necesitas traducir el horario. La Ciudad de México suele ir <b>2 horas atrás</b> de Nueva York (por ejemplo, cuando NY tiene horario de verano). Entonces:</p>
    <ul>
      <li>Apertura de NY <b>9:30 ET</b> ≈ <b>7:30 a.m. en CDMX</b>.</li>
      <li>El bloque caliente de NY 9:30–11:00 ET ≈ <b>7:30–9:00 en CDMX</b>.</li>
    </ul>
    <p><b>Cuidado:</b> el desfase no siempre es 2 horas exactas, porque EE.UU. y México cambian de horario en fechas distintas. Por eso la regla infalible no es memorizar un número, sino <b>anclarte a la hora de NY</b> en tu plataforma y confirmar cada día a qué hora local te toca. Nunca asumas: verifica el reloj.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 200" style="width:100%;height:auto;max-width:600px" font-family="monospace">
      <text x="310" y="24" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">TRADUCE EL RELOJ: NY → CDMX</text>
      <!-- NY -->
      <circle cx="170" cy="105" r="55" fill="var(--w02)" stroke="currentColor" stroke-width="1.5"/>
      <text x="170" y="60" text-anchor="middle" fill="currentColor" font-size="11" font-weight="bold">NUEVA YORK</text>
      <line x1="170" y1="105" x2="170" y2="70" stroke="var(--up)" stroke-width="2"/>
      <line x1="170" y1="105" x2="196" y2="105" stroke="var(--up)" stroke-width="2"/>
      <text x="170" y="140" text-anchor="middle" fill="var(--up)" font-size="12" font-weight="bold">9:30</text>
      <text x="170" y="175" text-anchor="middle" fill="var(--dim)" font-size="9">apertura</text>
      <!-- flecha -->
      <path d="M245,105 L375,105" stroke="var(--line)" stroke-width="2" marker-end="url(#tz1)"/>
      <text x="310" y="96" text-anchor="middle" fill="var(--dim)" font-size="10">−2 h (aprox)</text>
      <!-- CDMX -->
      <circle cx="450" cy="105" r="55" fill="var(--w02)" stroke="currentColor" stroke-width="1.5"/>
      <text x="450" y="60" text-anchor="middle" fill="currentColor" font-size="11" font-weight="bold">CDMX</text>
      <line x1="450" y1="105" x2="435" y2="75" stroke="var(--up)" stroke-width="2"/>
      <line x1="450" y1="105" x2="476" y2="105" stroke="var(--up)" stroke-width="2"/>
      <text x="450" y="140" text-anchor="middle" fill="var(--up)" font-size="12" font-weight="bold">7:30</text>
      <text x="450" y="175" text-anchor="middle" fill="var(--dim)" font-size="9">tu hora local</text>
      <defs><marker id="tz1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--line)"/></marker></defs>
    </svg>
    <figcaption>La apertura de NY (9:30 ET) cae alrededor de las 7:30 en CDMX. El desfase varía; ancla tu plataforma a hora de NY y confirma tu hora local cada día.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>4. Por qué las primeras horas son las mejores</h2>
    <p>Las primeras 1–2 horas tras la apertura concentran la mayor parte del movimiento del día. Razón simple: durante la noche se acumulan órdenes, noticias y expectativas, y todo eso se descarga de golpe cuando abre la sesión con volumen real. Después del mediodía neoyorquino el mercado suele entrar en un <b>letargo</b> (la "hora de la comida"), con movimientos chiquitos y trampas. Tu método NorthPoint aprovecha justo la ventana de máxima energía y te aleja del letargo. En la próxima lección le ponemos nombre a esas franjas doradas: las <b>killzones</b>.</p>
  </section>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>No confundas "el mercado está abierto" con "es buen momento para operar". Los futuros cotizan casi 24 horas, pero operar a las 3 de la tarde de NY, o de madrugada, es pelear en un mercado dormido y sin volumen: ahí es donde te barren el stop movimientos sin sentido. <b>Calidad de horario &gt; cantidad de horas.</b> Menos tiempo frente a la pantalla, en la franja correcta, gana casi siempre.</p>
  </div>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>Son las 6:45 a.m. en CDMX. Abres la gráfica: el precio da brincos raros, sube y baja sin dirección. Es premarket, hay poca gente. En vez de forzar un trade, marcas tus niveles y esperas. A las 7:30 (apertura de NY) el volumen entra de golpe, el precio elige dirección y aparece tu setup con claridad. Operaste 45 minutos después, pero en el momento correcto. Esa paciencia es, literalmente, parte de la estrategia.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>La sesión que manda es la de NY: <b>9:30–16:00 ET (RTH)</b>. La <b>apertura de las 9:30</b> trae los movimientos más grandes.</li>
      <li>El <b>premarket</b> (antes de 9:30) tiene poco volumen: es para <b>observar y preparar</b>, no para pelear.</li>
      <li>El <b>volumen</b> se dispara en la apertura; con volumen los movimientos son fiables, sin él son trampas.</li>
      <li>Desde México, 9:30 ET ≈ 7:30 CDMX, pero el desfase varía: <b>ancla tu plataforma a hora de NY</b> y verifica cada día.</li>
      <li>Las primeras 1–2 horas valen más que el resto del día. Calidad de horario por encima de cantidad de horas.</li>
    </ul>
  </div>
</div>`,

/* ─────────────────────────────────────────────────────────────────────
   l3b · Killzones: dónde se mueve el dinero
   ───────────────────────────────────────────────────────────────────── */
'l3b': `
<div class="lec">
  <h1 class="lec-h1">Killzones: dónde se mueve el dinero</h1>
  <p class="lec-lede">No todas las horas del día tienen la misma "electricidad". Hay franjas concretas donde el dinero institucional se mueve de verdad, y fuera de ellas el mercado apenas respira. A esas franjas se les llama <b>killzones</b>, y saber cuáles son es como tener el horario secreto de cuándo pasa lo bueno.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Piensa en las olas del mar para un surfista. No se mete al agua a cualquier hora: sabe que hay ciertos momentos del día donde entran las mejores olas. El resto del tiempo el mar está plano y remar es cansado e inútil. Las <b>killzones</b> son esas horas de buenas olas del mercado. Un buen trader, como un buen surfista, no está todo el día en el agua: <b>llega justo cuando entran las olas</b>.</p>
  </div>

  <section class="lec-sec">
    <h2>1. Qué es una killzone</h2>
    <p>Una <b>killzone</b> (zona de caza) es una franja horaria específica donde históricamente se concentra la mayor actividad y los movimientos más limpios. El nombre viene de que ahí es donde los grandes jugadores "cazan": mueven precio, buscan liquidez, dejan los movimientos con los que se gana dinero. Coincide con la apertura de los grandes centros financieros del mundo (Londres y Nueva York), porque es cuando entran los volúmenes más grandes.</p>
    <p>La idea central: <b>concentra tu atención en las killzones y apágate fuera de ellas</b>. Operar dentro de una killzone es surfear con olas; operar fuera es remar en agua plana.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 660 210" style="width:100%;height:auto;max-width:660px" font-family="monospace">
      <text x="330" y="22" text-anchor="middle" fill="currentColor" font-size="14" font-weight="bold">LAS KILLZONES DEL DÍA (hora de NY)</text>
      <line x1="40" y1="120" x2="630" y2="120" stroke="var(--line)" stroke-width="2"/>
      <!-- marcas horarias -->
      <g fill="var(--dim)" font-size="9" text-anchor="middle">
        <text x="120" y="150">7:00</text><text x="250" y="150">9:30</text>
        <text x="400" y="150">11:00</text><text x="520" y="150">13:30</text>
      </g>
      <!-- London KZ -->
      <rect x="90" y="100" width="90" height="40" fill="var(--up)" opacity="0.22"/>
      <text x="135" y="90" text-anchor="middle" fill="var(--up)" font-size="9" font-weight="bold">LONDRES</text>
      <text x="135" y="185" text-anchor="middle" fill="var(--dim)" font-size="8">2–5 AM ET</text>
      <!-- NY AM KZ -->
      <rect x="235" y="90" width="175" height="55" fill="var(--up)" opacity="0.3"/>
      <text x="322" y="80" text-anchor="middle" fill="var(--up)" font-size="10" font-weight="bold">NY AM ★</text>
      <text x="322" y="185" text-anchor="middle" fill="var(--up)" font-size="8">la más importante</text>
      <line x1="250" y1="72" x2="250" y2="145" stroke="var(--up)" stroke-width="1.5"/>
      <!-- lunch dead zone -->
      <rect x="410" y="108" width="100" height="24" fill="var(--dim)" opacity="0.15"/>
      <text x="460" y="103" text-anchor="middle" fill="var(--dim)" font-size="8">LETARGO comida</text>
      <!-- NY PM KZ -->
      <rect x="510" y="102" width="80" height="36" fill="var(--up)" opacity="0.2"/>
      <text x="550" y="92" text-anchor="middle" fill="var(--up)" font-size="9" font-weight="bold">NY PM</text>
    </svg>
    <figcaption>Las killzones (verde) coinciden con las aperturas de Londres y Nueva York. La NY AM es la reina. Entre ellas, el letargo de la comida: mejor no operar.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>2. Las tres killzones principales</h2>
    <ul>
      <li><b>Killzone de Londres</b> (aprox. 2:00–5:00 a.m. ET): abre Europa, entra el primer gran volumen del día. Da buenos movimientos, pero es de madrugada para NY y para México.</li>
      <li><b>Killzone de Nueva York AM</b> (aprox. 9:30–11:00 a.m. ET): <b>la reina</b>. Coincide con la apertura de EE.UU. Es la de mayor volumen, los movimientos más limpios y el pan de cada día del método NorthPoint.</li>
      <li><b>Killzone de Nueva York PM</b> (aprox. 1:30–3:00 p.m. ET): un segundo aire por la tarde, después del letargo de la comida. Menos consistente que la de la mañana.</li>
    </ul>
    <p>Entre la killzone de la mañana y la de la tarde hay una <b>zona muerta</b> (la comida en NY, cerca del mediodía): movimientos chiquitos, aburridos y tramposos. Ahí el mercado "duerme la siesta" y lo mejor es no molestarlo.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 230" style="width:100%;height:auto;max-width:600px" font-family="monospace">
      <text x="310" y="22" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">ENERGÍA DEL MERCADO POR HORA</text>
      <line x1="60" y1="190" x2="580" y2="190" stroke="var(--line)"/>
      <text x="70" y="55" fill="currentColor" font-size="9">actividad</text>
      <!-- curva tipo montañas -->
      <path d="M60,175 L110,140 L150,120 L120,150 L60,175" fill="var(--up)" opacity="0.25" stroke="var(--up)" stroke-width="1.5"/>
      <!-- pico NY AM -->
      <path d="M230,190 L260,80 L300,70 L340,110 L360,150 L230,190 Z" fill="var(--up)" opacity="0.35" stroke="var(--up)" stroke-width="1.5"/>
      <text x="295" y="60" text-anchor="middle" fill="var(--up)" font-size="10" font-weight="bold">NY AM (pico)</text>
      <!-- valle comida -->
      <path d="M360,150 L410,178 L460,180 L500,160 L360,150" fill="var(--dim)" opacity="0.15"/>
      <text x="435" y="172" text-anchor="middle" fill="var(--dim)" font-size="8">comida</text>
      <!-- NY PM colina -->
      <path d="M500,160 L530,130 L560,145 L580,175 L500,160" fill="var(--up)" opacity="0.22" stroke="var(--up)" stroke-width="1.2"/>
      <text x="545" y="122" text-anchor="middle" fill="var(--up)" font-size="8">NY PM</text>
      <text x="135" y="105" text-anchor="middle" fill="var(--up)" font-size="8">Londres</text>
      <text x="310" y="215" text-anchor="middle" fill="var(--dim)" font-size="10">El día es una cordillera: dos picos (Londres, NY) y un valle (comida).</text>
    </svg>
    <figcaption>La actividad sube en Londres, hace su pico máximo en la NY AM, cae en la comida y repunta un poco en la NY PM. Opera en los picos, descansa en el valle.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>3. Por qué funcionan: el dinero grande tiene horario</h2>
    <p>Las killzones no son magia ni superstición. Funcionan por una razón muy terrenal: los <b>grandes participantes</b> (bancos, fondos, instituciones) trabajan en horarios de oficina y ejecutan sus operaciones más grandes al abrir sus mercados. Cuando entra ese volumen enorme, el precio se mueve con <b>fuerza y dirección</b>. Fuera de esas horas, quienes quedan son jugadores chicos y algoritmos aburridos, y el precio flota sin convicción.</p>
    <p>Traducido a tu ventaja: cuando operas dentro de una killzone, <b>te subes al movimiento del dinero grande</b> en lugar de pelear contra un mercado dormido. No adivinas: te posicionas donde ya hay corriente.</p>
  </section>

  <section class="lec-sec">
    <h2>4. La killzone no es una señal, es un permiso</h2>
    <p>Cuidado con un malentendido común: estar dentro de una killzone <b>no significa "compra ya"</b>. La killzone solo te dice <b>cuándo</b> mirar con atención, no <b>qué</b> hacer. Es el permiso para cazar, no la presa. Dentro de la killzone todavía necesitas tu setup del método (ORB, estructura, confluencias) para decidir el trade. Piénsalo así: la killzone abre la puerta; el setup es lo que decides hacer una vez adentro.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 180" style="width:100%;height:auto;max-width:600px" font-family="monospace">
      <text x="310" y="24" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">KILLZONE = CUÁNDO · SETUP = QUÉ</text>
      <rect x="60" y="55" width="170" height="70" rx="10" fill="var(--w02)" stroke="var(--up)" stroke-width="2"/>
      <text x="145" y="82" text-anchor="middle" fill="var(--up)" font-size="12" font-weight="bold">KILLZONE</text>
      <text x="145" y="102" text-anchor="middle" fill="currentColor" font-size="10">te da el CUÁNDO</text>
      <text x="145" y="116" text-anchor="middle" fill="var(--dim)" font-size="9">(abre la puerta)</text>
      <text x="310" y="95" text-anchor="middle" fill="currentColor" font-size="18">+</text>
      <rect x="390" y="55" width="170" height="70" rx="10" fill="var(--w02)" stroke="currentColor" stroke-width="2"/>
      <text x="475" y="82" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">SETUP</text>
      <text x="475" y="102" text-anchor="middle" fill="currentColor" font-size="10">te da el QUÉ</text>
      <text x="475" y="116" text-anchor="middle" fill="var(--dim)" font-size="9">(la decisión)</text>
      <text x="310" y="160" text-anchor="middle" fill="var(--dim)" font-size="10">Solo cuando coinciden los dos hay trade. Killzone sin setup = esperar.</text>
    </svg>
    <figcaption>La killzone te dice cuándo prestar atención; el setup te dice qué hacer. Necesitas ambos: el momento correcto Y una señal válida.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>Estar en una killzone tienta a operar "porque es la hora". Pero si no aparece tu setup, la respuesta correcta sigue siendo <b>no hacer nada</b>. Hay días en que la mejor operación dentro de la killzone es <b>cero operaciones</b>. La killzone reduce las horas en que buscas, no te obliga a disparar. Forzar un trade solo porque "es buen horario" es una de las formas más comunes de perder.</p>
  </div>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>Son las 8:00 a.m. en CDMX: estás en plena killzone de NY AM. Perfecto para buscar. Pero el precio está pegado, sin dirección, sin tu setup. Aunque es "la hora buena", esperas. A las 8:20 aparece tu patrón limpio: ahí entras. Otro día, la killzone entera pasa sin un solo setup válido y no operas nada. Ambos días hiciste lo correcto: la killzone te dijo cuándo mirar; tu disciplina decidió si disparar.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>Las <b>killzones</b> son franjas horarias con la mayor actividad; coinciden con las aperturas de Londres y Nueva York.</li>
      <li>Las tres principales: <b>Londres</b> (2–5 AM ET), <b>NY AM</b> (9:30–11:00 ET, la reina) y <b>NY PM</b> (1:30–3:00 PM ET).</li>
      <li>Entre la mañana y la tarde hay una <b>zona muerta</b> (la comida en NY): mejor no operar.</li>
      <li>Funcionan porque el <b>dinero institucional</b> mueve sus grandes volúmenes al abrir sus mercados.</li>
      <li>La killzone es el <b>cuándo</b>, no el <b>qué</b>: aún necesitas tu setup. Y si no hay setup, no operas, aunque sea la hora buena.</li>
    </ul>
  </div>
</div>`,

/* ─────────────────────────────────────────────────────────────────────
   l3c · Tu ventana de trading: 7:45–9:00
   ───────────────────────────────────────────────────────────────────── */
'l3c': `
<div class="lec">
  <h1 class="lec-h1">Tu ventana de trading: 7:45–9:00</h1>
  <p class="lec-lede">De todas las killzones, tú vas a especializarte en una sola franja pequeña, la de mayor calidad para el método NorthPoint. Poco más de una hora al día. Suena a poco; en realidad es tu mayor ventaja. Este es el corazón práctico de todo el Programa 1.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Un pescador experto no echa la red todo el día. Sabe que hay un momento —cuando sube la marea, temprano— en que los peces pican. Llega justo a esa hora, pesca concentrado, y se va a casa mientras los demás siguen ahí, cansados, sin pescar nada. Tu <b>ventana de 7:45 a 9:00</b> (hora de CDMX) es esa marea alta. Llegas, cazas tu trade, y cierras la laptop. La disciplina de irte es parte del arte.</p>
  </div>

  <section class="lec-sec">
    <h2>1. Qué es esta ventana y de dónde sale</h2>
    <p>Tu ventana operativa es de <b>7:45 a 9:00 a.m., hora de la Ciudad de México</b>. Sale directamente de la killzone de Nueva York AM que viste en la lección anterior. Recuerda la traducción: la apertura de NY (9:30 ET) cae alrededor de las 7:30 en CDMX. Entonces:</p>
    <ul>
      <li><b>7:30 CDMX</b> (9:30 ET): abre NY. Nace el <b>rango de apertura</b> (los primeros minutos que el método usa para el ORB, que estudiarás en el Programa 2).</li>
      <li><b>7:45 CDMX</b>: pasaron los primeros minutos más caóticos; el precio ya mostró su rango inicial. <b>Aquí empiezas a operar.</b></li>
      <li><b>9:00 CDMX</b> (11:00 ET): se acaba la parte más limpia de la killzone AM. <b>Aquí cierras el día.</b></li>
    </ul>
    <p>En esa hora y cuarto ocurre lo mejor: máximo volumen, movimientos limpios y tu setup en su terreno ideal.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 660 210" style="width:100%;height:auto;max-width:660px" font-family="monospace">
      <text x="330" y="22" text-anchor="middle" fill="currentColor" font-size="14" font-weight="bold">TU VENTANA (hora CDMX)</text>
      <line x1="40" y1="120" x2="630" y2="120" stroke="var(--line)" stroke-width="2"/>
      <g fill="var(--dim)" font-size="9" text-anchor="middle">
        <text x="90" y="150">7:00</text><text x="200" y="150">7:30</text>
        <text x="270" y="150">7:45</text><text x="470" y="150">9:00</text><text x="590" y="150">10:00</text>
      </g>
      <!-- premarket antes -->
      <rect x="40" y="108" width="160" height="24" fill="var(--dim)" opacity="0.15"/>
      <text x="120" y="102" text-anchor="middle" fill="var(--dim)" font-size="8">antes: observar</text>
      <!-- apertura marca -->
      <line x1="200" y1="95" x2="200" y2="135" stroke="var(--up)" stroke-width="1.5" stroke-dasharray="3 3"/>
      <text x="200" y="185" text-anchor="middle" fill="var(--up)" font-size="8">7:30 abre NY</text>
      <!-- ventana operativa -->
      <rect x="270" y="90" width="200" height="60" fill="var(--up)" opacity="0.3"/>
      <text x="370" y="80" text-anchor="middle" fill="var(--up)" font-size="11" font-weight="bold">VENTANA 7:45–9:00 ★</text>
      <text x="370" y="180" text-anchor="middle" fill="var(--up)" font-size="9">aquí OPERAS</text>
      <!-- despues -->
      <rect x="470" y="108" width="160" height="24" fill="var(--dim)" opacity="0.15"/>
      <text x="550" y="102" text-anchor="middle" fill="var(--dim)" font-size="8">después: cerrar laptop</text>
    </svg>
    <figcaption>Antes de 7:45 observas; de 7:45 a 9:00 operas; después de las 9:00 cierras. Poco más de una hora, la de mayor calidad del día.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>2. La rutina de tres tiempos</h2>
    <p>Tu día de trading tiene tres momentos, y ninguno es "estar pegado a la pantalla todo el día":</p>
    <ul>
      <li><b>Antes (7:00–7:45)</b>: preparación. Marcas niveles clave, ves cómo llega el día (alcista/bajista), dejas listo el gráfico. <b>No operas.</b> Es leer el terreno.</li>
      <li><b>Durante (7:45–9:00)</b>: ejecución. Buscas tu setup. Si aparece un A+, lo tomas con su stop y su target. Si no, esperas. Máxima concentración.</li>
      <li><b>Después (desde 9:00)</b>: cierre. Registras el trade en tu journal (lo verás en el Programa 3), cierras la plataforma y sigues con tu vida. <b>Se acabó.</b></li>
    </ul>
    <p>Esta estructura te protege del peor enemigo del novato: el <b>sobre-trading</b> (operar de más). Con una ventana definida, no hay "un trade más" a las 11 de la mañana por aburrimiento.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 200" style="width:100%;height:auto;max-width:640px" font-family="monospace">
      <text x="320" y="24" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">LA RUTINA DE 3 TIEMPOS</text>
      <!-- antes -->
      <rect x="40" y="50" width="170" height="90" rx="10" fill="var(--w02)" stroke="var(--dim)" stroke-width="1.5"/>
      <text x="125" y="74" text-anchor="middle" fill="currentColor" font-size="11" font-weight="bold">1 · ANTES</text>
      <text x="125" y="92" text-anchor="middle" fill="var(--dim)" font-size="9">7:00–7:45</text>
      <text x="125" y="112" text-anchor="middle" fill="currentColor" font-size="9">marcar niveles</text>
      <text x="125" y="126" text-anchor="middle" fill="currentColor" font-size="9">leer el día</text>
      <!-- durante -->
      <rect x="235" y="50" width="170" height="90" rx="10" fill="var(--up)" opacity="0.12" stroke="var(--up)" stroke-width="2"/>
      <text x="320" y="74" text-anchor="middle" fill="var(--up)" font-size="11" font-weight="bold">2 · DURANTE</text>
      <text x="320" y="92" text-anchor="middle" fill="var(--up)" font-size="9">7:45–9:00</text>
      <text x="320" y="112" text-anchor="middle" fill="currentColor" font-size="9">buscar setup</text>
      <text x="320" y="126" text-anchor="middle" fill="currentColor" font-size="9">ejecutar A+</text>
      <!-- despues -->
      <rect x="430" y="50" width="170" height="90" rx="10" fill="var(--w02)" stroke="var(--dim)" stroke-width="1.5"/>
      <text x="515" y="74" text-anchor="middle" fill="currentColor" font-size="11" font-weight="bold">3 · DESPUÉS</text>
      <text x="515" y="92" text-anchor="middle" fill="var(--dim)" font-size="9">desde 9:00</text>
      <text x="515" y="112" text-anchor="middle" fill="currentColor" font-size="9">registrar</text>
      <text x="515" y="126" text-anchor="middle" fill="currentColor" font-size="9">cerrar laptop</text>
      <!-- flechas -->
      <path d="M210,95 L233,95" stroke="var(--line)" stroke-width="1.5" marker-end="url(#rt1)"/>
      <path d="M405,95 L428,95" stroke="var(--line)" stroke-width="1.5" marker-end="url(#rt1)"/>
      <defs><marker id="rt1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--line)"/></marker></defs>
    </svg>
    <figcaption>Solo el bloque del centro es operar. Preparar y cerrar son los otros dos tiempos. Fuera de la ventana, la plataforma se apaga.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>3. Un trade al día: A+ o nada</h2>
    <p>El principio que ata todo el Programa 1: dentro de tu ventana buscas <b>un solo trade de alta calidad</b> (un "A+"), no diez trades mediocres. La ventana corta te <b>obliga</b> a ser selectivo: si solo tienes hora y cuarto, no vas a malgastarla en cualquier movimiento. Esperas al setup limpio, lo tomas, y si sale bien, muchas veces ya terminaste tu día.</p>
    <p>Esto va contra el instinto del principiante, que cree que "más trades = más dinero". La verdad es al revés: <b>más trades = más comisiones, más errores, más estrés</b>. La ventana de 7:45–9:00 no es una limitación; es un filtro de calidad disfrazado de horario.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 620 200" style="width:100%;height:auto;max-width:600px" font-family="monospace">
      <text x="310" y="22" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">1 TRADE A+ vs 8 TRADES MEDIOCRES</text>
      <!-- lado bueno -->
      <text x="155" y="48" text-anchor="middle" fill="var(--up)" font-size="11" font-weight="bold">Selectivo</text>
      <rect x="110" y="60" width="90" height="70" rx="8" fill="var(--up)" opacity="0.25" stroke="var(--up)" stroke-width="2"/>
      <text x="155" y="100" text-anchor="middle" fill="var(--up)" font-size="20" font-weight="bold">1</text>
      <text x="155" y="150" text-anchor="middle" fill="currentColor" font-size="9">trade limpio</text>
      <text x="155" y="164" text-anchor="middle" fill="var(--up)" font-size="9">resultado: +</text>
      <!-- lado malo -->
      <text x="450" y="48" text-anchor="middle" fill="var(--down)" font-size="11" font-weight="bold">Ansioso</text>
      <g fill="var(--down)" opacity="0.5">
        <rect x="380" y="70" width="24" height="24" rx="3"/><rect x="412" y="70" width="24" height="24" rx="3"/>
        <rect x="444" y="70" width="24" height="24" rx="3"/><rect x="476" y="70" width="24" height="24" rx="3"/>
        <rect x="380" y="102" width="24" height="24" rx="3"/><rect x="412" y="102" width="24" height="24" rx="3"/>
        <rect x="444" y="102" width="24" height="24" rx="3"/><rect x="476" y="102" width="24" height="24" rx="3"/>
      </g>
      <text x="440" y="150" text-anchor="middle" fill="currentColor" font-size="9">8 trades forzados</text>
      <text x="440" y="164" text-anchor="middle" fill="var(--down)" font-size="9">comisiones + errores</text>
      <text x="310" y="190" text-anchor="middle" fill="var(--dim)" font-size="10">Menos, pero mejor. La ventana corta te obliga a elegir solo lo bueno.</text>
    </svg>
    <figcaption>Un trade de alta calidad supera a un montón de trades forzados. La ventana breve trabaja a tu favor: te fuerza a ser selectivo.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>4. Ajusta la ventana a TU reloj</h2>
    <p>El "7:45–9:00" es la referencia en hora de CDMX cuando el desfase con NY es de 2 horas. Pero como viste en la lección anterior, ese desfase <b>cambia</b> según los cambios de horario de EE.UU. y México. Lo que <b>nunca</b> cambia es el ancla: tu ventana empieza <b>~15 minutos después de la apertura de NY</b> (9:30 ET) y dura hasta <b>~90 minutos después</b> (11:00 ET). Cada temporada, confirma a qué hora local te toca y ajusta tu alarma. La franja se mueve en tu reloj; su lógica no.</p>
  </section>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>La tentación número uno será <b>quedarte después de las 9:00</b>, sobre todo si el trade de la mañana salió mal y quieres "recuperar". Ese es exactamente el momento de cerrar la laptop. Fuera de la ventana el mercado empeora (menos volumen, más trampas) y tú estás peor (frustrado, con prisa por recuperar). Salir de la ventana perdiendo es doloroso, pero quedarte es la forma más rápida de convertir un mal día en un desastre. <b>La campana suena a las 9:00. Se acabó.</b></p>
  </div>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>7:30 CDMX: abre NY, marcas el rango inicial. 7:45: empiezas a buscar. 7:52: aparece tu setup A+, entras 1 MNQ con stop de 15 pts y target de 30. 8:10: el precio toca tu target, +30 pts (+$60). Cierras la posición… y cierras el día. Son las 8:10 de la mañana y ya ganaste, con disciplina y sin drama. El resto del día es tuyo. Eso es el método NorthPoint funcionando: poco tiempo, alta calidad, vida completa fuera de la pantalla.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>Tu ventana es <b>7:45–9:00 CDMX</b>, salida directa de la killzone de NY AM.</li>
      <li>Rutina de tres tiempos: <b>antes</b> preparas, <b>durante</b> operas, <b>después</b> registras y cierras. Solo el centro es operar.</li>
      <li>Busca <b>un trade A+</b>, no muchos mediocres. La ventana corta es un filtro de calidad, no un castigo.</li>
      <li>El ancla real: empieza ~15 min tras la apertura de NY (9:30 ET) y termina ~90 min después (11:00 ET). Ajusta la hora local cada temporada.</li>
      <li>A las 9:00 se cierra la laptop, ganes o pierdas. Quedarte a "recuperar" es la trampa más cara.</li>
    </ul>
  </div>
</div>`

});
