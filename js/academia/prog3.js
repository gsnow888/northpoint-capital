/* ══════════════════════════════════════════════════════════════════════════
   NorthPoint · Academia · Programa 3 — Riesgo y disciplina
   Contenido educativo de las 9 lecciones (módulos 8, 9 y 10).
   Estilo "para dummies": extenso, muy visual, español de México.
   Cada lección es HTML con las clases lec / lec-h1 / lec-lede / lec-analogia /
   lec-sec / lec-fig / lec-callout / lec-ejemplo / lec-key.
   Todos los apoyos visuales son SVG inline (nada de <img>), responsive,
   con colores currentColor y var(--up), var(--down), var(--dim), var(--line).
   ══════════════════════════════════════════════════════════════════════════ */
window.LECCIONES_HTML = Object.assign(window.LECCIONES_HTML || {}, {

/* ─────────────────────────────────────────────────────────────────────────
   L8A · Gestión de riesgo — 1% por trade, nunca más
   ───────────────────────────────────────────────────────────────────────── */
'l8a': `
<div class="lec">
  <h1 class="lec-h1">1% por trade, nunca más</h1>
  <p class="lec-lede">La regla más importante de todo el método NorthPoint no es un setup, ni un indicador, ni una hora del día. Es un número chiquito: <b>1%</b>. Es cuánto de tu cuenta puedes perder en un solo trade. Si aprendes a respetar ese 1%, sobrevives lo suficiente para volverte bueno. Si no lo respetas, no importa qué tan bueno seas: tarde o temprano una racha mala te borra.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Imagina que tu cuenta es el tanque de oxígeno de un buzo. Cada trade que pierdes gasta un poco de aire. Si respiras tranquilo (1% por trade), el tanque te dura horas y puedes esperar a que pase la marea. Si te pones ansioso y respiras a bocanadas (10% por trade), el mismo tanque se vacía en minutos y te ahogas antes de ver el tesoro. El trading no lo gana quien respira más fuerte, lo gana quien no se queda sin aire.</p>
  </div>

  <section class="lec-sec">
    <h2>¿Qué significa "arriesgar 1%"?</h2>
    <p>Arriesgar 1% quiere decir que, <b>antes de entrar</b>, ya sabes exactamente cuánto dinero vas a perder si el trade sale mal y tu stop loss se ejecuta. Ese monto no puede ser mayor al 1% del tamaño de tu cuenta. Ni un peso más.</p>
    <p>Si tu cuenta es de $50,000 dólares, el 1% son $500. Eso significa que el peor día posible de ese trade te cuesta $500. No $600, no $1,200 "porque estaba seguro". Quinientos. La cifra se decide con la cabeza fría, no en el calor del momento.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 150" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="24" fill="currentColor" font-size="15" font-weight="bold">Tu cuenta: $50,000 — dividida en 100 partes iguales</text>
      <!-- 100 celditas: la primera es el 1% -->
      <g stroke="var(--line)" stroke-width="1">
        <!-- fila generada visualmente: 50 columnas x 2 filas -->
      </g>
      <g>
        <!-- primera celda = 1% en rojo -->
        <rect x="12" y="44" width="11.4" height="24" fill="var(--down)" opacity="0.85"/>
        <rect x="24" y="44" width="11.4" height="24" fill="none" stroke="var(--line)"/>
        <rect x="36" y="44" width="11.4" height="24" fill="none" stroke="var(--line)"/>
        <rect x="48" y="44" width="11.4" height="24" fill="none" stroke="var(--line)"/>
        <rect x="60" y="44" width="11.4" height="24" fill="none" stroke="var(--line)"/>
        <rect x="72" y="44" width="540" height="24" fill="var(--up)" opacity="0.10"/>
        <rect x="72" y="44" width="540" height="24" fill="none" stroke="var(--line)"/>
      </g>
      <text x="12" y="90" fill="var(--down)" font-size="13" font-weight="bold">■ 1% = $500</text>
      <text x="120" y="90" fill="currentColor" font-size="13">esto es TODO lo que puede perder un trade</text>
      <text x="12" y="112" fill="var(--up)" font-size="13" font-weight="bold">■ 99% = $49,500</text>
      <text x="150" y="112" fill="var(--dim)" font-size="13">sigue intacto, listo para el siguiente</text>
      <text x="12" y="138" fill="var(--dim)" font-size="12">Un solo error nunca debe tocar más que esa rebanada roja.</text>
    </svg>
    <figcaption>Visualiza tu cuenta en 100 rebanadas. El 1% es una sola rebanada. Perderla no te mata; perder 20 de golpe, sí.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>El poder de sobrevivir rachas de pérdidas</h2>
    <p>Aquí está la magia del 1%: te vuelve casi imposible de quebrar. Todo trader —hasta los mejores del mundo— pierde varios trades seguidos de vez en cuando. Se llama <b>racha de pérdidas</b> (o <i>drawdown</i>), y no es opcional: le pasa a todos.</p>
    <p>La pregunta no es "¿me va a pasar?", sino "¿cuántas pérdidas seguidas aguanta mi cuenta antes de morir?". Y eso depende 100% de cuánto arriesgas por trade. Mira la diferencia:</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 320" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="22" fill="currentColor" font-size="15" font-weight="bold">Cuánto queda de una cuenta de $50,000 tras 10 pérdidas seguidas</text>
      <!-- ejes -->
      <line x1="60" y1="250" x2="620" y2="250" stroke="var(--line)" stroke-width="1.5"/>
      <line x1="60" y1="60" x2="60" y2="250" stroke="var(--line)" stroke-width="1.5"/>
      <text x="30" y="66" fill="var(--dim)" font-size="11">100%</text>
      <text x="30" y="160" fill="var(--dim)" font-size="11">50%</text>
      <text x="38" y="252" fill="var(--dim)" font-size="11">0%</text>
      <text x="300" y="285" fill="var(--dim)" font-size="12" text-anchor="middle">número de pérdidas seguidas  →</text>
      <!-- curva 1% (verde, apenas baja) -->
      <polyline fill="none" stroke="var(--up)" stroke-width="2.5"
        points="60,60 116,62 172,64 228,66 284,68 340,70 396,71 452,73 508,75 564,77 620,79"/>
      <text x="628" y="82" fill="var(--up)" font-size="11" font-weight="bold" text-anchor="end">1% → queda 90%</text>
      <!-- curva 5% (naranja/dim, baja notorio) -->
      <polyline fill="none" stroke="var(--dim)" stroke-width="2.5" stroke-dasharray="5 4"
        points="60,60 116,70 172,80 228,91 284,102 340,113 396,124 452,135 508,146 564,157 620,168"/>
      <text x="628" y="171" fill="var(--dim)" font-size="11" font-weight="bold" text-anchor="end">5% → queda 60%</text>
      <!-- curva 10% (roja, se desploma) -->
      <polyline fill="none" stroke="var(--down)" stroke-width="2.5"
        points="60,60 116,79 172,98 228,117 284,136 340,155 396,174 452,193 508,212 564,231 620,244"/>
      <text x="628" y="242" fill="var(--down)" font-size="11" font-weight="bold" text-anchor="end">10% → queda 35%</text>
      <text x="60" y="308" fill="currentColor" font-size="12">Misma racha mala. La única diferencia es cuánto arriesgaste por trade.</text>
    </svg>
    <figcaption>Con 1% por trade, 10 pérdidas seguidas apenas te rasguñan (sigues con ~90%). Con 10%, la misma racha te deja hecho pedazos.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>Perder duele "en porcentaje al revés". Si pierdes el 50% de tu cuenta, NO necesitas ganar 50% para recuperarte: necesitas ganar <b>100%</b> (el doble de lo que te queda) solo para volver a donde estabas. Por eso las pérdidas grandes son una trampa: cada vez es más difícil salir del hoyo. El 1% evita que caigas en ese pozo.</p>
  </div>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 210" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="22" fill="currentColor" font-size="15" font-weight="bold">La matemática cruel de recuperarse</text>
      <!-- filas -->
      <g font-size="13">
        <text x="12" y="58" fill="currentColor">Si pierdes...</text>
        <text x="330" y="58" fill="currentColor">...tienes que ganar para volver:</text>

        <rect x="12" y="70" width="120" height="22" fill="var(--down)" opacity="0.25"/>
        <text x="18" y="86" fill="currentColor">-10%</text>
        <rect x="330" y="70" width="60" height="22" fill="var(--up)" opacity="0.30"/>
        <text x="396" y="86" fill="var(--up)">+11%  (casi igual, fácil)</text>

        <rect x="12" y="100" width="180" height="22" fill="var(--down)" opacity="0.35"/>
        <text x="18" y="116" fill="currentColor">-25%</text>
        <rect x="330" y="100" width="110" height="22" fill="var(--up)" opacity="0.30"/>
        <text x="446" y="116" fill="var(--up)">+33%</text>

        <rect x="12" y="130" width="240" height="22" fill="var(--down)" opacity="0.5"/>
        <text x="18" y="146" fill="currentColor">-50%</text>
        <rect x="330" y="130" width="200" height="22" fill="var(--up)" opacity="0.30"/>
        <text x="536" y="146" fill="var(--up)">+100%</text>

        <rect x="12" y="160" width="300" height="22" fill="var(--down)" opacity="0.7"/>
        <text x="18" y="176" fill="#fff">-75%</text>
        <rect x="330" y="160" width="280" height="22" fill="var(--up)" opacity="0.35"/>
        <text x="470" y="176" fill="var(--up)">+300% (casi imposible)</text>
      </g>
      <text x="12" y="202" fill="var(--dim)" font-size="12">Mientras más caes, más empinada es la subida de regreso. No caigas.</text>
    </svg>
    <figcaption>Perder es barato de sufrir pero carísimo de recuperar. El 1% te mantiene en la zona "fácil de recuperar" siempre.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>Cómo calcular tu 1% en 3 pasos</h2>
    <p>No necesitas ser matemático. Es una resta y una división:</p>
    <p><b>Paso 1.</b> Toma el tamaño de tu cuenta. Ejemplo: $50,000.<br>
    <b>Paso 2.</b> Multiplícalo por 0.01 (eso es "el 1%"). $50,000 × 0.01 = $500. Ese es tu <b>riesgo máximo por trade</b>.<br>
    <b>Paso 3.</b> Antes de entrar, mira dónde va tu stop loss. Si el trade, con el tamaño que piensas usar, puede perder más de $500, entonces usas <b>menos contratos</b> hasta que la pérdida máxima quede en $500 o menos.</p>
    <p>El tamaño de la posición se ajusta al riesgo, nunca al revés. (Eso lo vemos a detalle en la lección l8c.)</p>
  </section>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>Cuenta de $50,000. Tu 1% = $500. Ves un setup A+ en el MNQ. Tu stop está a 40 puntos de tu entrada. En el MNQ, cada punto por contrato vale $2. Entonces 1 contrato arriesga 40 × $2 = $80. Con $500 de presupuesto podrías poner hasta 6 contratos (6 × $80 = $480, que aún cabe en $500). El trade se va en tu contra, pega tu stop: pierdes $480. Duele un ratito... y sigues con $49,520. Al día siguiente vuelves como si nada. <b>Eso es sobrevivir.</b></p>
  </div>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>El 1% no es "poco". Es aburrido a propósito. El trading rentable se ve aburrido: perder chiquito muchas veces y ganar mediano otras tantas. El que busca emoción arriesga 10% y siente adrenalina... hasta que la cuenta desaparece. Aburrido y vivo le gana a emocionante y quebrado, siempre.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>Arriesga máximo <b>1%</b> de tu cuenta en cada trade. Es la regla que te mantiene vivo.</li>
      <li>El 1% se calcula <b>antes</b> de entrar: cuenta × 0.01 = tu pérdida máxima permitida.</li>
      <li>Con 1% por trade, aguantas rachas largas de pérdidas casi sin despeinarte.</li>
      <li>Las pérdidas grandes son una trampa: recuperar un -50% exige ganar +100%.</li>
      <li>Ajustas el número de contratos al riesgo, no el riesgo a tus ganas.</li>
      <li>Aburrido y vivo > emocionante y quebrado.</li>
    </ul>
  </div>
</div>
`,

/* ─────────────────────────────────────────────────────────────────────────
   L8B · Gestión de riesgo — Riesgo-beneficio 1:2 y 1:1
   ───────────────────────────────────────────────────────────────────────── */
'l8b': `
<div class="lec">
  <h1 class="lec-h1">Riesgo-beneficio 1:2 y 1:1</h1>
  <p class="lec-lede">Ganar en trading no depende de acertar mucho. Depende de que, cuando ganas, ganes <b>más</b> de lo que pierdes cuando pierdes. A esa proporción se le llama <b>riesgo-beneficio</b> (R:R). Si arriesgas $1 para ganar $2, tu R:R es 1:2. Domina este concepto y podrás ser rentable acertando menos de la mitad de las veces.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Imagina una máquina de apuestas rara: cada vez que juegas, pagas $100. Si pierdes, se queda tu billete. Si ganas, te devuelve $300 (tus $100 más $200 de premio). Aunque solo ganaras 4 de cada 10 veces, saldrías adelante: pierdes 6 × $100 = $600, pero ganas 4 × $200 = $800. Terminas +$200 habiendo fallado la mayoría de las veces. Eso es un R:R de 1:2 trabajando a tu favor.</p>
  </div>

  <section class="lec-sec">
    <h2>Las tres piezas de todo trade</h2>
    <p>Cada trade tiene tres precios que defines <b>antes</b> de entrar:</p>
    <p><b>Entrada (entry):</b> el precio al que abres la posición.<br>
    <b>Stop loss:</b> el precio donde admites que te equivocaste y sales con una pérdida controlada.<br>
    <b>Take profit (target):</b> el precio donde recoges la ganancia.</p>
    <p>La distancia de la entrada al stop es tu <b>riesgo (1R)</b>. La distancia de la entrada al target es tu <b>beneficio</b>. El R:R compara las dos.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 300" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="22" fill="currentColor" font-size="15" font-weight="bold">Un trade de compra con riesgo-beneficio 1:2</text>
      <!-- escalera de precio -->
      <line x1="200" y1="50" x2="200" y2="270" stroke="var(--line)" stroke-width="2"/>
      <!-- target -->
      <line x1="150" y1="70" x2="470" y2="70" stroke="var(--up)" stroke-width="2"/>
      <text x="480" y="74" fill="var(--up)" font-size="13" font-weight="bold">TARGET  17,400</text>
      <!-- entry -->
      <line x1="150" y1="170" x2="470" y2="170" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/>
      <text x="480" y="174" fill="currentColor" font-size="13" font-weight="bold">ENTRADA 17,300</text>
      <!-- stop -->
      <line x1="150" y1="220" x2="470" y2="220" stroke="var(--down)" stroke-width="2"/>
      <text x="480" y="224" fill="var(--down)" font-size="13" font-weight="bold">STOP    17,250</text>
      <!-- barra beneficio (2R) -->
      <rect x="90" y="70" width="26" height="100" fill="var(--up)" opacity="0.35"/>
      <text x="103" y="125" fill="var(--up)" font-size="13" font-weight="bold" text-anchor="middle" transform="rotate(-90 103 125)">GANO 2R = +100 pts</text>
      <!-- barra riesgo (1R) -->
      <rect x="90" y="170" width="26" height="50" fill="var(--down)" opacity="0.35"/>
      <text x="103" y="195" fill="var(--down)" font-size="11" font-weight="bold" text-anchor="middle" transform="rotate(-90 103 195)">RIESGO 1R</text>
      <!-- flechas -->
      <text x="300" y="130" fill="var(--up)" font-size="12">↑ si sube, cobro el doble de lo que arriesgué</text>
      <text x="300" y="205" fill="var(--down)" font-size="12">↓ si baja, salgo con una pérdida chica</text>
      <text x="12" y="295" fill="var(--dim)" font-size="12">Arriesgo 50 puntos para ganar 100. Relación 1:2.</text>
    </svg>
    <figcaption>El stop define tu 1R (lo que arriesgas). El target a 2R está al doble de distancia. Ganas dos veces lo que puedes perder.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>La tabla mágica: qué win rate necesitas</h2>
    <p>Aquí viene lo que casi nadie entiende cuando empieza. Tu <b>win rate</b> (porcentaje de trades ganados) que necesitas para no perder dinero <b>cambia según tu R:R</b>. Mientras mejor sea tu R:R, menos necesitas acertar:</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 250" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="22" fill="currentColor" font-size="15" font-weight="bold">Win rate mínimo para empatar (break-even)</text>
      <!-- fila 1:1 -->
      <text x="12" y="70" fill="currentColor" font-size="13" font-weight="bold">R:R 1:1</text>
      <rect x="120" y="55" width="250" height="24" fill="var(--dim)" opacity="0.3"/>
      <rect x="120" y="55" width="250" height="24" fill="none" stroke="var(--line)"/>
      <text x="245" y="72" fill="currentColor" font-size="13" text-anchor="middle" font-weight="bold">necesitas ganar 50%</text>
      <text x="380" y="72" fill="var(--dim)" font-size="12">(1 de cada 2)</text>
      <!-- fila 1:2 -->
      <text x="12" y="130" fill="currentColor" font-size="13" font-weight="bold">R:R 1:2</text>
      <rect x="120" y="115" width="167" height="24" fill="var(--up)" opacity="0.3"/>
      <rect x="120" y="115" width="250" height="24" fill="none" stroke="var(--line)"/>
      <text x="203" y="132" fill="currentColor" font-size="13" text-anchor="middle" font-weight="bold">solo 34%</text>
      <text x="380" y="132" fill="var(--up)" font-size="12">(1 de cada 3 y sales bien)</text>
      <!-- fila 1:3 -->
      <text x="12" y="190" fill="currentColor" font-size="13" font-weight="bold">R:R 1:3</text>
      <rect x="120" y="175" width="125" height="24" fill="var(--up)" opacity="0.45"/>
      <rect x="120" y="175" width="250" height="24" fill="none" stroke="var(--line)"/>
      <text x="182" y="192" fill="currentColor" font-size="13" text-anchor="middle" font-weight="bold">solo 25%</text>
      <text x="380" y="192" fill="var(--up)" font-size="12">(1 de cada 4 basta)</text>
      <text x="12" y="235" fill="var(--dim)" font-size="12">Mientras más grande el premio vs el riesgo, menos necesitas acertar.</text>
    </svg>
    <figcaption>Con 1:2, fallar 2 de cada 3 trades todavía te deja empatado. Todo lo que aciertes de más, es ganancia limpia.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>Esto rompe la intuición del principiante, que cree que "para ganar hay que acertar mucho". Falso. Un trader con 40% de aciertos y R:R 1:2 gana dinero a montones. Un trader con 70% de aciertos y R:R 1:0.5 (arriesga $2 para ganar $1) <b>pierde</b> dinero. El R:R manda sobre el ego de acertar.</p>
  </div>

  <section class="lec-sec">
    <h2>¿Y el 1:1? ¿Para qué sirve?</h2>
    <p>El 1:2 es el objetivo estrella del método NorthPoint, pero el <b>1:1</b> también tiene su lugar. Un 1:1 significa que arriesgas lo mismo que buscas ganar. Es útil cuando:</p>
    <p>• El mercado está <b>rangeando</b> (moviéndose de lado, sin tendencia clara) y no da espacio para targets lejanos.<br>
    • Quieres una <b>toma parcial rápida</b>: cierras la mitad en 1:1 para asegurar algo, y dejas correr la otra mitad hacia 1:2 o más.<br>
    • Estás aprendiendo y prefieres ganancias más frecuentes para construir confianza.</p>
    <p>La contra: con 1:1 necesitas acertar más del 50% para ganar dinero, y eso es más exigente. Por eso el 1:2 es el default y el 1:1 es la excepción con razón.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 200" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="22" fill="currentColor" font-size="15" font-weight="bold">1:1 vs 1:2, lado a lado</text>
      <!-- 1:1 -->
      <text x="90" y="50" fill="currentColor" font-size="13" font-weight="bold" text-anchor="middle">1:1</text>
      <rect x="60" y="60" width="60" height="45" fill="var(--up)" opacity="0.35"/>
      <text x="90" y="88" fill="var(--up)" font-size="12" text-anchor="middle">gano 1R</text>
      <rect x="60" y="105" width="60" height="45" fill="var(--down)" opacity="0.35"/>
      <text x="90" y="133" fill="var(--down)" font-size="12" text-anchor="middle">riesgo 1R</text>
      <text x="90" y="175" fill="var(--dim)" font-size="11" text-anchor="middle">necesito 50%+</text>
      <!-- 1:2 -->
      <text x="290" y="50" fill="currentColor" font-size="13" font-weight="bold" text-anchor="middle">1:2</text>
      <rect x="260" y="15" width="60" height="90" fill="var(--up)" opacity="0.35"/>
      <text x="290" y="65" fill="var(--up)" font-size="12" text-anchor="middle">gano 2R</text>
      <rect x="260" y="105" width="60" height="45" fill="var(--down)" opacity="0.35"/>
      <text x="290" y="133" fill="var(--down)" font-size="12" text-anchor="middle">riesgo 1R</text>
      <text x="290" y="175" fill="var(--up)" font-size="11" text-anchor="middle">me basta 34%</text>
      <!-- nota -->
      <text x="380" y="80" fill="currentColor" font-size="13">El premio del 1:2 es del doble</text>
      <text x="380" y="102" fill="currentColor" font-size="13">de alto, mismo riesgo abajo.</text>
      <text x="380" y="130" fill="var(--dim)" font-size="12">Por eso perdona más errores.</text>
    </svg>
    <figcaption>Mismo riesgo abajo (1R rojo). La diferencia está arriba: el 1:2 te paga el doble por acertar.</figcaption>
  </figure>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>Haces 10 trades, arriesgando $100 en cada uno (tu 1R = $100). Aciertas solo 4 y fallas 6. Con R:R 1:2, cada acierto paga $200 y cada fallo cuesta $100. Cuentas: ganancias = 4 × $200 = $800. Pérdidas = 6 × $100 = $600. Resultado: <b>+$200</b>, y eso que fallaste la mayoría. Ahora imagina el mismo 40% de aciertos pero con R:R 1:1: ganas 4 × $100 = $400 y pierdes 6 × $100 = $600. Resultado: <b>-$200</b>. Mismo acierto, resultado opuesto. Todo por el R:R.</p>
  </div>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>Nunca muevas tu stop más lejos "para darle chance al trade". Eso rompe tu R:R sin avisar: de repente ese 1:2 planeado se volvió un 1:1 o peor, y tu matemática deja de cerrar. El stop se define antes y no se toca. Mover el target hacia ti para asegurar (trailing) sí es válido; alejar el stop, jamás.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>Riesgo-beneficio (R:R) compara lo que arriesgas (1R, entrada a stop) con lo que buscas ganar (entrada a target).</li>
      <li>El <b>1:2</b> es el default NorthPoint: arriesgas 1 para ganar 2. Te basta acertar ~34% para empatar.</li>
      <li>El <b>1:1</b> es la excepción: úsalo en rangos o para tomas parciales rápidas; exige acertar más del 50%.</li>
      <li>Un buen R:R te hace rentable aunque falles la mayoría de tus trades.</li>
      <li>Define entrada, stop y target <b>antes</b> de entrar. Nunca alejes el stop.</li>
    </ul>
  </div>
</div>
`,

/* ─────────────────────────────────────────────────────────────────────────
   L8C · Gestión de riesgo — Tamaño de posición por cuenta
   ───────────────────────────────────────────────────────────────────────── */
'l8c': `
<div class="lec">
  <h1 class="lec-h1">Tamaño de posición por cuenta</h1>
  <p class="lec-lede">Ya sabes que arriesgas 1% por trade. Ya sabes buscar 1:2. Ahora falta la pieza que une todo: <b>¿cuántos contratos compro?</b> La respuesta no es "los que quepan" ni "los que me den ganas". Es una cuenta exacta que sale de tu riesgo, tu stop y el valor del instrumento. Se llama <b>tamaño de posición</b> (position sizing), y es lo que convierte la teoría del 1% en un número real de contratos.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Es como servir agua en vasos de distinto tamaño sin que se derrame. Tu "presupuesto de agua" es fijo (el 1%). Si el vaso es angosto (stop cercano), caben más chorros; si el vaso es ancho (stop lejano), caben menos. No cambias cuánta agua tienes: cambias cuántos vasos llenas según qué tan anchos sean. El tamaño de posición es medir el vaso antes de servir.</p>
  </div>

  <section class="lec-sec">
    <h2>La fórmula, sin miedo</h2>
    <p>Solo necesitas tres números y una división:</p>
    <p><b>1.</b> Tu riesgo en dólares = 1% de la cuenta.<br>
    <b>2.</b> La distancia de tu stop, en puntos o ticks.<br>
    <b>3.</b> Cuánto vale cada punto/tick en ese instrumento.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 180" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="24" fill="currentColor" font-size="15" font-weight="bold">La fórmula del tamaño de posición</text>
      <!-- fraccion -->
      <text x="60" y="100" fill="currentColor" font-size="16" font-weight="bold">Contratos =</text>
      <line x1="230" y1="90" x2="560" y2="90" stroke="currentColor" stroke-width="2"/>
      <text x="395" y="78" fill="var(--up)" font-size="15" text-anchor="middle" font-weight="bold">riesgo en $ (tu 1%)</text>
      <text x="395" y="118" fill="var(--down)" font-size="15" text-anchor="middle" font-weight="bold">puntos de stop × valor por punto</text>
      <text x="60" y="155" fill="var(--dim)" font-size="12">Arriba: lo que puedes perder. Abajo: lo que pierdes por cada contrato si pega el stop.</text>
      <text x="60" y="173" fill="var(--dim)" font-size="12">Divides una entre la otra y redondeas hacia ABAJO. Nunca hacia arriba.</text>
    </svg>
    <figcaption>Arriba tu presupuesto de pérdida; abajo lo que cuesta un contrato si sale mal. La división te dice cuántos contratos caben.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>Conoce tu instrumento: MNQ vs NQ</h2>
    <p>Cada contrato de futuros tiene su propio "valor por punto". Confundirlos es un error caro. Los dos más usados en NorthPoint son el Nasdaq:</p>
    <p>• <b>MNQ</b> (Micro Nasdaq): cada punto vale <b>$2</b> por contrato. Es el chiquito, ideal para arriesgar poco y afinar el tamaño con precisión.<br>
    • <b>NQ</b> (Nasdaq E-mini): cada punto vale <b>$20</b> por contrato. Es 10 veces más grande. Un solo NQ mueve lo mismo que 10 MNQ.</p>
    <p>La regla práctica: empieza en MNQ. Te deja ajustar el tamaño fino y errar barato mientras aprendes.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 210" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="24" fill="currentColor" font-size="15" font-weight="bold">Un movimiento de 40 puntos, ¿cuánto pesa?</text>
      <!-- MNQ -->
      <text x="20" y="66" fill="currentColor" font-size="14" font-weight="bold">MNQ (micro)</text>
      <rect x="20" y="76" width="60" height="40" fill="var(--up)" opacity="0.35"/>
      <rect x="20" y="76" width="60" height="40" fill="none" stroke="var(--line)"/>
      <text x="95" y="102" fill="currentColor" font-size="14">1 contrato × 40 pts × $2 = <tspan font-weight="bold">$80</tspan></text>
      <!-- NQ -->
      <text x="20" y="150" fill="currentColor" font-size="14" font-weight="bold">NQ (e-mini)</text>
      <rect x="20" y="160" width="360" height="40" fill="var(--down)" opacity="0.35"/>
      <rect x="20" y="160" width="360" height="40" fill="none" stroke="var(--line)"/>
      <text x="392" y="186" fill="currentColor" font-size="14">1 contrato × 40 pts × $20 = <tspan font-weight="bold">$800</tspan></text>
      <text x="20" y="204" fill="var(--dim)" font-size="0"> </text>
    </svg>
    <figcaption>El mismo movimiento de 40 puntos vale $80 en MNQ y $800 en NQ. Mismo mercado, riesgo 10× distinto. Sabe cuál estás operando.</figcaption>
  </figure>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>Cuenta de $50,000 → tu 1% = $500. Setup en MNQ, stop a 25 puntos de tu entrada. Valor por punto del MNQ = $2. Entonces cada contrato arriesga 25 × $2 = $50. Aplicas la fórmula: $500 ÷ $50 = <b>10 contratos</b>. Pones 10 MNQ, tu stop en su lugar, y si el trade falla pierdes exactamente $500 (tu 1%). Si aciertas con target a 1:2 (50 puntos), ganas 10 × 50 × $2 = $1,000. Riesgo controlado, premio del doble.</p>
  </div>

  <section class="lec-sec">
    <h2>El stop decide el tamaño, no al revés</h2>
    <p>Este es el error número uno del principiante: decide primero "voy con 10 contratos" y después pone el stop donde sea. Al revés. <b>Primero</b> el setup te dice dónde va el stop (debajo del soporte, arriba del order block, etc.). <b>Luego</b> la fórmula te dice cuántos contratos caben en tu 1%. El tamaño es la consecuencia, no la decisión.</p>
    <p>Consecuencia práctica muy útil: si un trade tiene el stop <b>muy lejos</b>, vas a poder poner pocos contratos. Si el stop está <b>cerca</b>, caben más. Así, sin pensarlo, arriesgas lo mismo en todos tus trades aunque sean muy distintos. La cuenta se autorregula.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 230" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="24" fill="currentColor" font-size="15" font-weight="bold">Mismo riesgo ($500), distinto stop → distinto tamaño</text>
      <!-- caso A: stop cerca -->
      <text x="20" y="60" fill="currentColor" font-size="13" font-weight="bold">Stop cerca (20 pts) → caben más contratos</text>
      <g>
        <rect x="20" y="70" width="26" height="26" fill="var(--up)" opacity="0.4"/>
        <rect x="50" y="70" width="26" height="26" fill="var(--up)" opacity="0.4"/>
        <rect x="80" y="70" width="26" height="26" fill="var(--up)" opacity="0.4"/>
        <rect x="110" y="70" width="26" height="26" fill="var(--up)" opacity="0.4"/>
        <rect x="140" y="70" width="26" height="26" fill="var(--up)" opacity="0.4"/>
        <rect x="170" y="70" width="26" height="26" fill="var(--up)" opacity="0.4"/>
        <rect x="200" y="70" width="26" height="26" fill="var(--up)" opacity="0.4"/>
        <rect x="230" y="70" width="26" height="26" fill="var(--up)" opacity="0.4"/>
        <rect x="260" y="70" width="26" height="26" fill="var(--up)" opacity="0.4"/>
        <rect x="290" y="70" width="26" height="26" fill="var(--up)" opacity="0.4"/>
        <rect x="320" y="70" width="26" height="26" fill="var(--up)" opacity="0.4"/>
        <rect x="350" y="70" width="26" height="26" fill="var(--up)" opacity="0.4"/>
      </g>
      <text x="390" y="88" fill="currentColor" font-size="13" font-weight="bold">12 contratos MNQ</text>
      <!-- caso B: stop lejos -->
      <text x="20" y="140" fill="currentColor" font-size="13" font-weight="bold">Stop lejos (60 pts) → caben menos contratos</text>
      <g>
        <rect x="20" y="150" width="26" height="26" fill="var(--down)" opacity="0.4"/>
        <rect x="50" y="150" width="26" height="26" fill="var(--down)" opacity="0.4"/>
        <rect x="80" y="150" width="26" height="26" fill="var(--down)" opacity="0.4"/>
        <rect x="110" y="150" width="26" height="26" fill="var(--down)" opacity="0.4"/>
      </g>
      <text x="160" y="168" fill="currentColor" font-size="13" font-weight="bold">4 contratos MNQ</text>
      <text x="20" y="212" fill="var(--dim)" font-size="12">En ambos casos pierdes $500 si el trade falla. El tamaño se ajustó solo al stop.</text>
    </svg>
    <figcaption>Stop cerca = muchos contratos. Stop lejos = pocos. La fórmula iguala el riesgo en dólares sin que tú lo pienses.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>En cuentas de fondeo (prop firms) hay un límite extra: el <b>drawdown máximo</b>. Aunque tu 1% te "permita" cierto tamaño, nunca pongas una posición tan grande que un solo mal trade te acerque peligrosamente al límite de pérdida diaria o total de la cuenta. Cuando el 1% y la regla de la firma no coinciden, gana <b>el más chico de los dos</b>. Sobrevivir al contrato es parte del tamaño.</p>
  </div>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 210" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="24" fill="currentColor" font-size="15" font-weight="bold">Tabla rápida (MNQ, valor punto $2)</text>
      <line x1="12" y1="40" x2="628" y2="40" stroke="var(--line)"/>
      <g font-size="13">
        <text x="20" y="58" fill="var(--dim)" font-weight="bold">Cuenta</text>
        <text x="170" y="58" fill="var(--dim)" font-weight="bold">1% riesgo</text>
        <text x="330" y="58" fill="var(--dim)" font-weight="bold">Stop</text>
        <text x="450" y="58" fill="var(--dim)" font-weight="bold">Contratos</text>
      </g>
      <line x1="12" y1="66" x2="628" y2="66" stroke="var(--line)"/>
      <g font-size="13" fill="currentColor">
        <text x="20" y="88">$25,000</text><text x="170" y="88" fill="var(--up)">$250</text><text x="330" y="88">25 pts</text><text x="450" y="88" font-weight="bold">5 contratos</text>
        <text x="20" y="116">$50,000</text><text x="170" y="116" fill="var(--up)">$500</text><text x="330" y="116">25 pts</text><text x="450" y="116" font-weight="bold">10 contratos</text>
        <text x="20" y="144">$50,000</text><text x="170" y="144" fill="var(--up)">$500</text><text x="330" y="144">50 pts</text><text x="450" y="144" font-weight="bold">5 contratos</text>
        <text x="20" y="172">$100,000</text><text x="170" y="172" fill="var(--up)">$1,000</text><text x="330" y="172">40 pts</text><text x="450" y="172" font-weight="bold">12 contratos</text>
      </g>
      <line x1="12" y1="186" x2="628" y2="186" stroke="var(--line)"/>
      <text x="20" y="204" fill="var(--dim)" font-size="12">Redondea siempre hacia abajo: mejor arriesgar un poco menos del 1% que un poco más.</text>
    </svg>
    <figcaption>La misma fórmula aplicada a varias cuentas y stops. Nota cómo al alejar el stop (fila 3) el tamaño baja para mantener el mismo $500.</figcaption>
  </figure>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>Tamaño de posición = (riesgo en $ ÷ (puntos de stop × valor por punto)), redondeado hacia abajo.</li>
      <li>Conoce tu instrumento: MNQ = $2 por punto; NQ = $20 por punto (10× más grande).</li>
      <li>El <b>stop decide el tamaño</b>, nunca al revés. Stop cerca = más contratos; stop lejos = menos.</li>
      <li>Así, todos tus trades arriesgan el mismo 1% aunque sean muy diferentes.</li>
      <li>En fondeo, respeta también el drawdown de la firma: gana el límite más chico.</li>
      <li>Empieza en MNQ para afinar el tamaño y equivocarte barato.</li>
    </ul>
  </div>
</div>
`,

/* ─────────────────────────────────────────────────────────────────────────
   L9A · Psicología — Ganaste: cierra la gráfica
   ───────────────────────────────────────────────────────────────────────── */
'l9a': `
<div class="lec">
  <h1 class="lec-h1">Ganaste: cierra la gráfica</h1>
  <p class="lec-lede">Suena raro, pero uno de los hábitos más rentables que existen es <b>irte cuando vas ganando</b>. La mayoría de los traders no se quiebran perdiendo: se quiebran <b>devolviendo</b> lo que ya habían ganado. Ganaste tu objetivo del día, sentiste que "estabas caliente", entraste a un trade más... y otro... y para la noche entregaste todo. La disciplina de cerrar la laptop cuando ganas es una habilidad, y en NorthPoint se entrena.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>El mercado es un casino donde tú puedes ser la casa... pero solo si te levantas de la mesa. El casino gana porque la gente que va ganando se queda "por un ratito más" hasta que el promedio la alcanza. Cuando ganaste tu meta y cierras la gráfica, te conviertes en el único jugador que sí se levanta con las fichas. El que se queda "porque está en racha" es el que le regala su ventaja de vuelta a la casa.</p>
  </div>

  <section class="lec-sec">
    <h2>Por qué después de ganar somos más peligrosos</h2>
    <p>Ganar te sube la <b>dopamina</b> y con ella baja tu prudencia. El cerebro registra el subidón y quiere más YA. En ese estado pasan tres cosas malas a la vez:</p>
    <p>• Bajas el estándar: entras a setups B o C que en frío nunca tocarías.<br>
    • Subes el tamaño: "ya voy ganando, puedo arriesgar más" (justo al revés de lo prudente).<br>
    • Dejas de ver riesgo: te sientes invencible, ignoras señales de que el mercado cambió.</p>
    <p>Es la tormenta perfecta para devolver todo. La solución no es tener más fuerza de voluntad en ese momento (ya vas drogado de dopamina): la solución es tener una <b>regla fría</b> decidida de antemano que te saque de ahí.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 300" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="22" fill="currentColor" font-size="15" font-weight="bold">Dos versiones del mismo día ganador</text>
      <!-- ejes -->
      <line x1="55" y1="60" x2="55" y2="250" stroke="var(--line)"/>
      <line x1="55" y1="155" x2="620" y2="155" stroke="var(--line)" stroke-dasharray="3 3"/>
      <text x="16" y="70" fill="var(--dim)" font-size="11">+meta</text>
      <text x="16" y="159" fill="var(--dim)" font-size="11">$0</text>
      <text x="560" y="285" fill="var(--dim)" font-size="12">hora del día →</text>
      <!-- meta alcanzada punto -->
      <circle cx="250" cy="80" r="5" fill="var(--up)"/>
      <text x="170" y="60" fill="var(--up)" font-size="12" font-weight="bold">meta del día ✓</text>
      <!-- curva disciplina (cierra y se queda plano) -->
      <polyline fill="none" stroke="var(--up)" stroke-width="2.5"
        points="55,155 110,140 165,120 210,95 250,80 620,80"/>
      <text x="470" y="72" fill="var(--up)" font-size="12" font-weight="bold">cerró la gráfica: conserva todo</text>
      <!-- curva codicia (sigue y devuelve) -->
      <polyline fill="none" stroke="var(--down)" stroke-width="2.5" stroke-dasharray="6 4"
        points="250,80 300,70 340,110 380,95 420,140 460,175 500,160 540,205 580,235 615,225"/>
      <text x="360" y="255" fill="var(--down)" font-size="12" font-weight="bold">siguió "en racha": devolvió y terminó en rojo</text>
      <!-- flecha decisión -->
      <text x="250" y="290" fill="currentColor" font-size="12" text-anchor="middle">↑ el mismo punto de decisión: aquí se parten los dos caminos</text>
    </svg>
    <figcaption>El punto verde es idéntico en ambos: llegaste a tu meta. Lo único que cambia es si cerraste o seguiste. Un camino conserva, el otro devuelve.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>La meta diaria es un techo, no un piso</h2>
    <p>En NorthPoint defines una <b>meta diaria</b> (por ejemplo, +2R o cierta cantidad en dólares). El error mental es tratarla como un piso ("ya gané mi meta, ahora a ver cuánto más saco"). Trátala como un <b>techo</b>: cuando la tocas, terminó tu día de trading. Ganar hoy no es "ganar todo lo posible", es "ganar lo planeado y proteger". Mañana el mercado sigue ahí.</p>
    <p>Lo mismo aplica a los trades ganadores individuales: cuando tu trade toca su target, sales. No lo "dejas correr un poquito más a ojo" ni le quitas el target porque "se ve fuerte". El plan se ejecuta como estaba escrito.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 190" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="24" fill="currentColor" font-size="15" font-weight="bold">La meta diaria: ¿techo o piso?</text>
      <!-- techo (bien) -->
      <text x="30" y="56" fill="var(--up)" font-size="13" font-weight="bold">✓ Como TECHO (correcto)</text>
      <line x1="30" y1="70" x2="300" y2="70" stroke="var(--up)" stroke-width="3"/>
      <text x="30" y="66" fill="var(--dim)" font-size="11">meta</text>
      <path d="M120,120 L120,78" stroke="var(--up)" stroke-width="2"/>
      <path d="M112,86 L120,74 L128,86 Z" fill="var(--up)"/>
      <text x="140" y="110" fill="currentColor" font-size="12">llego a la meta,</text>
      <text x="140" y="126" fill="currentColor" font-size="12">toco el techo y</text>
      <text x="140" y="142" fill="var(--up)" font-size="12" font-weight="bold">me detengo. Fin.</text>
      <!-- piso (mal) -->
      <text x="350" y="56" fill="var(--down)" font-size="13" font-weight="bold">✗ Como PISO (error)</text>
      <line x1="350" y1="70" x2="610" y2="70" stroke="var(--down)" stroke-width="2" stroke-dasharray="4 3"/>
      <text x="350" y="66" fill="var(--dim)" font-size="11">meta</text>
      <path d="M440,74 L440,120" stroke="var(--down)" stroke-width="2"/>
      <path d="M432,112 L440,124 L448,112 Z" fill="var(--down)"/>
      <text x="460" y="110" fill="currentColor" font-size="12">"ya la pasé,</text>
      <text x="460" y="126" fill="currentColor" font-size="12">a ver cuánto</text>
      <text x="460" y="142" fill="var(--down)" font-size="12" font-weight="bold">más saco"→ caes</text>
      <text x="30" y="180" fill="var(--dim)" font-size="12">Trata la meta como un techo que te detiene, no como un piso desde el cual seguir cavando.</text>
    </svg>
    <figcaption>La misma línea, dos mentalidades. Como techo, te frena y proteges. Como piso, te invita a seguir hasta devolverlo todo.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>"Cierra la gráfica" es literal. No la dejes abierta "solo mirando". Mirar el precio moverse después de ganar es la puerta de entrada a un trade que no debías tomar. Baja la tapa de la laptop, cierra la plataforma, vete a caminar. Lo que no ves, no lo operas.</p>
  </div>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>André tiene meta diaria de +$600. A las 9:40 am cierra un trade limpio: +$620. Ya está. En vez de buscar "uno más", registra el trade en su journal, cierra la plataforma y se va al gimnasio. Su cuenta termina el día en +$620. Su versión del día anterior, sin la regla, había ganado +$580 a las 9:30... y luego tomó cuatro trades de venganza tratando de "redondear a mil" hasta terminar en -$340. Mismo talento, dos resultados. La única diferencia fue cerrar la gráfica.</p>
  </div>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 170" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="24" fill="currentColor" font-size="15" font-weight="bold">Ritual de cierre en 4 pasos</text>
      <!-- pasos como cadena -->
      <g font-size="12">
        <rect x="20" y="50" width="130" height="60" rx="8" fill="var(--up)" opacity="0.15" stroke="var(--line)"/>
        <text x="85" y="76" fill="currentColor" text-anchor="middle" font-weight="bold">1. Tocaste</text>
        <text x="85" y="94" fill="currentColor" text-anchor="middle">tu meta ✓</text>

        <text x="160" y="86" fill="var(--dim)" font-size="18">→</text>

        <rect x="182" y="50" width="130" height="60" rx="8" fill="var(--up)" opacity="0.15" stroke="var(--line)"/>
        <text x="247" y="76" fill="currentColor" text-anchor="middle" font-weight="bold">2. Registra</text>
        <text x="247" y="94" fill="currentColor" text-anchor="middle">en el journal</text>

        <text x="322" y="86" fill="var(--dim)" font-size="18">→</text>

        <rect x="344" y="50" width="130" height="60" rx="8" fill="var(--up)" opacity="0.15" stroke="var(--line)"/>
        <text x="409" y="76" fill="currentColor" text-anchor="middle" font-weight="bold">3. Cierra la</text>
        <text x="409" y="94" fill="currentColor" text-anchor="middle">plataforma</text>

        <text x="484" y="86" fill="var(--dim)" font-size="18">→</text>

        <rect x="506" y="50" width="120" height="60" rx="8" fill="var(--up)" opacity="0.15" stroke="var(--line)"/>
        <text x="566" y="76" fill="currentColor" text-anchor="middle" font-weight="bold">4. Vete</text>
        <text x="566" y="94" fill="currentColor" text-anchor="middle">del asiento</text>
      </g>
      <text x="20" y="145" fill="var(--dim)" font-size="12">Un ritual repetible le quita la decisión a tu yo emocionado. La regla decide, no tú.</text>
    </svg>
    <figcaption>Convierte el cierre en un ritual mecánico. Cuando ya está automatizado, la codicia no tiene por dónde entrar.</figcaption>
  </figure>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>La mayoría no se quiebra perdiendo, se quiebra <b>devolviendo</b> lo ganado.</li>
      <li>Ganar sube la dopamina y baja tu prudencia: bajas estándar, subes tamaño, ignoras riesgo.</li>
      <li>La meta diaria es un <b>techo</b>, no un piso. La tocas y terminó tu día.</li>
      <li>"Cierra la gráfica" es literal: lo que no ves, no lo operas.</li>
      <li>Ten un <b>ritual de cierre</b> mecánico para que la regla decida, no tu emoción.</li>
    </ul>
  </div>
</div>
`,

/* ─────────────────────────────────────────────────────────────────────────
   L9B · Psicología — Nada de revancha (revenge trading)
   ───────────────────────────────────────────────────────────────────────── */
'l9b': `
<div class="lec">
  <h1 class="lec-h1">Nada de revancha</h1>
  <p class="lec-lede">El <b>revenge trading</b> (trading de venganza) es cuando pierdes un trade y, en vez de aceptarlo, entras de inmediato a otro para "recuperar lo perdido" o "darle una lección al mercado". Es, sin exagerar, la forma más rápida de vaciar una cuenta. No es una técnica mala: es una emoción disfrazada de decisión. Y hoy aprendes a cortarla de raíz.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Imagina que se te cae una copa y se rompe. La venganza sería enojarte tanto que empiezas a aventar los demás vasos al piso "para desquitarte". El vaso roto ya estaba roto: lo único que lograste fue quedarte sin vajilla. El mercado no sabe que existes, no te tiene rencor y no te debe nada. Pelearte con él es aventar tu propia vajilla. La pérdida ya pasó; la venganza solo agrega pérdidas nuevas.</p>
  </div>

  <section class="lec-sec">
    <h2>La espiral: cómo un trade se vuelve diez</h2>
    <p>La venganza casi nunca es un solo trade. Es una <b>espiral</b> que se alimenta a sí misma. Pierdes → te enojas → entras más grande y peor → pierdes más → te enojas más → entras aún más grande... Cada vuelta el tamaño crece y la calidad del setup cae. En pocos minutos puedes perder días enteros de ganancias.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 340" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="22" fill="currentColor" font-size="15" font-weight="bold">La espiral del revenge trading</text>
      <!-- espiral de flechas circulares que se agrandan -->
      <g fill="none" stroke="var(--down)" stroke-width="2.5">
        <path d="M330,180 m0,-40 a40,40 0 1 1 -1,0" />
        <path d="M330,180 m0,-75 a75,75 0 1 1 -1,0" opacity="0.85"/>
        <path d="M330,180 m0,-115 a115,115 0 1 1 -1,0" opacity="0.7"/>
      </g>
      <!-- flechas de dirección -->
      <path d="M368,148 l14,-6 l-2,14 z" fill="var(--down)"/>
      <path d="M405,113 l15,-4 l-4,15 z" fill="var(--down)"/>
      <path d="M445,72 l15,-3 l-5,15 z" fill="var(--down)"/>
      <!-- etiquetas -->
      <text x="330" y="185" fill="currentColor" font-size="12" text-anchor="middle" font-weight="bold">pierdes</text>
      <text x="330" y="70" fill="var(--down)" font-size="12" text-anchor="middle">1. te enojas</text>
      <text x="470" y="185" fill="var(--down)" font-size="12">2. entras</text>
      <text x="470" y="200" fill="var(--down)" font-size="12">más grande</text>
      <text x="240" y="290" fill="var(--down)" font-size="12" text-anchor="end">3. pierdes más</text>
      <text x="150" y="185" fill="var(--down)" font-size="12" text-anchor="middle">4. más rabia</text>
      <!-- explosión al final -->
      <text x="500" y="55" fill="var(--down)" font-size="14" font-weight="bold">💥 cuenta vacía</text>
      <text x="20" y="325" fill="var(--dim)" font-size="12">Cada vuelta el tamaño crece y el criterio se apaga. La espiral no se detiene sola: la detienes TÚ, cerrando.</text>
    </svg>
    <figcaption>Cada giro de la espiral es más grande y más ciego que el anterior. No se frena con voluntad: se frena apagando la pantalla en la primera vuelta.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>Cómo se ve en la curva de tu cuenta</h2>
    <p>Un trader disciplinado que pierde un trade tiene una curva con un escaloncito hacia abajo... y luego sigue tranquilo. Un trader en venganza tiene un acantilado: una caída vertical en cuestión de minutos. La misma pérdida inicial, resultados incomparables.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 280" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="22" fill="currentColor" font-size="15" font-weight="bold">Misma primera pérdida, dos reacciones</text>
      <line x1="55" y1="45" x2="55" y2="235" stroke="var(--line)"/>
      <line x1="55" y1="140" x2="620" y2="140" stroke="var(--line)" stroke-dasharray="3 3"/>
      <text x="16" y="145" fill="var(--dim)" font-size="11">$0</text>
      <!-- punto comun de la primera perdida -->
      <circle cx="200" cy="120" r="5" fill="var(--down)"/>
      <text x="120" y="105" fill="var(--down)" font-size="12" font-weight="bold">-1 trade (a todos les pasa)</text>
      <!-- disciplinado: baja poquito y sigue plano/sube -->
      <polyline fill="none" stroke="var(--up)" stroke-width="2.5"
        points="55,110 130,100 200,120 280,115 360,105 440,110 520,95 620,90"/>
      <text x="500" y="80" fill="var(--up)" font-size="12" font-weight="bold">acepta y sigue su plan</text>
      <!-- venganza: acantilado -->
      <polyline fill="none" stroke="var(--down)" stroke-width="2.5" stroke-dasharray="6 4"
        points="200,120 230,150 250,145 275,185 295,180 315,215 335,210 360,232"/>
      <text x="370" y="228" fill="var(--down)" font-size="12" font-weight="bold">venganza: acantilado en minutos</text>
      <text x="20" y="268" fill="var(--dim)" font-size="12">La pérdida grande casi nunca es un mal trade. Es la reacción al mal trade.</text>
    </svg>
    <figcaption>El punto rojo (la primera pérdida) es normal e inevitable. La diferencia entre un buen mes y un desastre está en lo que haces en los 5 minutos siguientes.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>Señales de que estás por entrar en venganza (apréndelas de memoria): el corazón acelerado, la frase "voy a recuperarlo YA", la mano yendo al doble de tamaño, la urgencia de entrar sin checar si es un A+, sentir que el mercado "te la debe". Si notas <b>una sola</b> de estas, ya no estás operando: estás sintiendo. Levántate.</p>
  </div>

  <section class="lec-sec">
    <h2>El cortacircuitos: reglas frías contra emociones calientes</h2>
    <p>No puedes ganarle a la emoción con más emoción. Le ganas con <b>reglas mecánicas</b> decididas antes, cuando estabas tranquilo. Estas tres son el estándar NorthPoint:</p>
    <p><b>1. Límite de pérdida diaria.</b> Defines un tope (por ejemplo -2R o cierta cantidad). Si lo tocas, se acabó el día. Sin excepciones, sin "un último intento".<br>
    <b>2. Pausa obligatoria tras perder.</b> Después de cualquier pérdida, te levantas mínimo 10 minutos. Agua, respirar, caminar. Volver solo cuando estés frío.<br>
    <b>3. Máximo de trades al día.</b> Un tope de operaciones (por ejemplo, 3). Cuando se acaban, se acabaron. Esto solito mata la espiral: no puedes dar diez vueltas si solo tienes tres balas.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 200" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="24" fill="currentColor" font-size="15" font-weight="bold">Tres cortacircuitos que apagan la espiral</text>
      <!-- 3 cajas -->
      <g font-size="12">
        <rect x="20" y="45" width="190" height="120" rx="10" fill="var(--up)" opacity="0.12" stroke="var(--line)"/>
        <text x="115" y="72" fill="currentColor" text-anchor="middle" font-size="14" font-weight="bold">Límite diario</text>
        <text x="115" y="100" fill="currentColor" text-anchor="middle">tocas tu tope</text>
        <text x="115" y="120" fill="currentColor" text-anchor="middle">de pérdida →</text>
        <text x="115" y="142" fill="var(--down)" text-anchor="middle" font-weight="bold">se acabó el día</text>

        <rect x="225" y="45" width="190" height="120" rx="10" fill="var(--up)" opacity="0.12" stroke="var(--line)"/>
        <text x="320" y="72" fill="currentColor" text-anchor="middle" font-size="14" font-weight="bold">Pausa de 10 min</text>
        <text x="320" y="100" fill="currentColor" text-anchor="middle">tras perder,</text>
        <text x="320" y="120" fill="currentColor" text-anchor="middle">te levantas →</text>
        <text x="320" y="142" fill="var(--up)" text-anchor="middle" font-weight="bold">vuelves en frío</text>

        <rect x="430" y="45" width="190" height="120" rx="10" fill="var(--up)" opacity="0.12" stroke="var(--line)"/>
        <text x="525" y="72" fill="currentColor" text-anchor="middle" font-size="14" font-weight="bold">Máx. 3 trades</text>
        <text x="525" y="100" fill="currentColor" text-anchor="middle">solo 3 balas</text>
        <text x="525" y="120" fill="currentColor" text-anchor="middle">al día →</text>
        <text x="525" y="142" fill="var(--up)" text-anchor="middle" font-weight="bold">no hay 10 vueltas</text>
      </g>
      <text x="20" y="190" fill="var(--dim)" font-size="12">Decides estas reglas en frío. En caliente, solo las obedeces.</text>
    </svg>
    <figcaption>Reglas mecánicas puestas de antemano. No dependen de tu fuerza de voluntad en el momento malo; ya están decididas.</figcaption>
  </figure>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>Pierdes tu primer trade del día: -$150. Sientes el impulso de "recuperarlo ya". Pero tu regla dice: pausa de 10 minutos. Te levantas, tomas agua, respiras. A los 10 minutos regresas frío y revisas: no hay ningún setup A+ ahora mismo. Así que no operas. Tu día cierra en -$150, una pérdida chica y normal. Tu versión sin regla habría entrado a tres trades de venganza y cerrado en -$900. La pausa de 10 minutos valió $750.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>El revenge trading es una <b>emoción disfrazada de decisión</b>: entras para "recuperar", no porque haya setup.</li>
      <li>No es un trade, es una <b>espiral</b>: cada vuelta más grande y más ciega.</li>
      <li>La pérdida grande casi nunca es el mal trade; es tu <b>reacción</b> al mal trade.</li>
      <li>No le ganas a la emoción con voluntad. Le ganas con reglas frías: límite diario, pausa de 10 min, máximo de trades.</li>
      <li>Aprende las señales físicas (corazón acelerado, "me la debe", mano al doble tamaño) y, ante una sola, levántate.</li>
    </ul>
  </div>
</div>
`,

/* ─────────────────────────────────────────────────────────────────────────
   L9C · Psicología — La racha: lock in 30 días
   ───────────────────────────────────────────────────────────────────────── */
'l9c': `
<div class="lec">
  <h1 class="lec-h1">La racha: lock in 30 días</h1>
  <p class="lec-lede">La disciplina no se construye en un día heroico: se construye en <b>días normales, repetidos</b>. El reto de los <b>30 días</b> es sencillo y brutal a la vez: sigue tu plan sin romper reglas, un día tras otro, durante un mes. No se mide por cuánto ganas. Se mide por <b>no romper la cadena</b>. Es la herramienta que convierte las reglas que ya aprendiste en algo automático.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Es como ir al gimnasio. Un día de pesas no te pone fuerte; te deja adolorido. Lo que te transforma es aparecer 30 días seguidos aunque no tengas ganas. Y hay algo curioso: cuando ya llevas 20 días seguidos, faltar duele más que ir, porque no quieres tirar la racha. Esa presión sana —"no quiero romper la cadena"— es tu mejor entrenador. El reto de 30 días es un gimnasio para tu disciplina.</p>
  </div>

  <section class="lec-sec">
    <h2>Qué cuenta como día "verde"</h2>
    <p>Ojo con esto, porque es lo que hace diferente a este reto: un día verde <b>no</b> es un día en que ganaste dinero. Es un día en que <b>seguiste el proceso</b>. Ganes o pierdas, el día es verde si:</p>
    <p>• Solo tomaste setups A+ (calidad, no cantidad).<br>
    • Respetaste tu riesgo de 1% por trade.<br>
    • No hiciste revenge trading.<br>
    • Cerraste al tocar tu meta o tu límite.<br>
    • Registraste tus trades en el journal.</p>
    <p>Puedes tener un día verde <b>perdiendo dinero</b>, si perdiste siguiendo el plan. Y puedes tener un día rojo <b>ganando dinero</b>, si ganaste rompiendo reglas (tuviste suerte). El reto premia el proceso, no la suerte. Porque el proceso es lo que se repite; la suerte, no.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 260" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="22" fill="currentColor" font-size="15" font-weight="bold">Tu cadena de 30 días (verde = seguiste el proceso)</text>
      <!-- grid 6 columnas x 5 filas -->
      <!-- generamos manualmente 30 celdas -->
      <g font-size="0">
        <!-- fila 1 -->
        <rect x="30" y="45" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="130" y="45" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="230" y="45" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="330" y="45" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="430" y="45" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="530" y="45" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <!-- fila 2 -->
        <rect x="30" y="85" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="130" y="85" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="230" y="85" width="80" height="34" rx="5" fill="var(--down)" opacity="0.5" stroke="var(--line)"/>
        <rect x="330" y="85" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="430" y="85" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="530" y="85" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <!-- fila 3 -->
        <rect x="30" y="125" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="130" y="125" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="230" y="125" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="330" y="125" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="430" y="125" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="530" y="125" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <!-- fila 4 -->
        <rect x="30" y="165" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="130" y="165" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="230" y="165" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="330" y="165" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="430" y="165" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="530" y="165" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <!-- fila 5 -->
        <rect x="30" y="205" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="130" y="205" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="230" y="205" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="330" y="205" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="430" y="205" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <rect x="530" y="205" width="80" height="34" rx="5" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
      </g>
      <text x="270" y="107" fill="#fff" font-size="12" font-weight="bold">día rojo</text>
      <text x="255" y="255" fill="var(--dim)" font-size="12">1 día rojo (perdió dinero pero... ¿siguió el plan? entonces cuenta como verde igual)</text>
    </svg>
    <figcaption>Una cadena de 30 casillas. La meta es pintarlas todas de verde: no por ganar, sino por seguir el proceso cada día.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>Por qué 30 días y no 3</h2>
    <p>Un buen día cualquiera lo tiene. Hasta un principiante con suerte gana un martes. Lo que separa a un trader real de un apostador es la <b>consistencia sostenida</b>: hacer lo correcto cuando estás cansado, cuando el mercado está feo, cuando ya vas ganando y quieres más, cuando vas perdiendo y quieres venganza. Treinta días te obligan a pasar por todos esos estados de ánimo y salir bien de cada uno. Ahí es donde el hábito se vuelve tuyo.</p>
    <p>Además, la constancia <b>compone</b>. No es que el día 30 valga lo mismo que el día 1. Cada día de disciplina hace más fácil el siguiente, tu criterio se afina, tu confianza deja de depender de la suerte. La curva de tu habilidad sube sola.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 250" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="22" fill="currentColor" font-size="15" font-weight="bold">La disciplina compone: cada día hace más fácil el siguiente</text>
      <line x1="55" y1="50" x2="55" y2="210" stroke="var(--line)"/>
      <line x1="55" y1="210" x2="620" y2="210" stroke="var(--line)"/>
      <text x="10" y="130" fill="var(--dim)" font-size="11" transform="rotate(-90 20 130)">habilidad / confianza</text>
      <text x="300" y="238" fill="var(--dim)" font-size="12">día 1  →  día 30</text>
      <!-- curva que acelera hacia arriba -->
      <polyline fill="none" stroke="var(--up)" stroke-width="3"
        points="55,200 130,196 200,188 270,175 330,155 390,128 450,98 510,68 570,50"/>
      <!-- puntos hitos -->
      <circle cx="130" cy="196" r="4" fill="var(--up)"/>
      <text x="120" y="188" fill="var(--dim)" font-size="10">día 3: "cuesta"</text>
      <circle cx="330" cy="155" r="4" fill="var(--up)"/>
      <text x="300" y="147" fill="var(--dim)" font-size="10">día 15: "ya es rutina"</text>
      <circle cx="570" cy="50" r="5" fill="var(--up)"/>
      <text x="470" y="45" fill="var(--up)" font-size="11" font-weight="bold">día 30: automático</text>
    </svg>
    <figcaption>Los primeros días cuestan y la curva sube despacio. Pero se acelera: para el día 30 seguir el plan ya no requiere esfuerzo, es quien eres.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>La regla dura del reto: si rompes una regla grande (te saltas el 1%, haces revenge, ignoras tu límite diario), el contador <b>se reinicia a cero</b>. Suena cruel, pero es el punto. Ese miedo a volver a empezar es justo lo que te frena la mano en el momento de tentación. La cadena solo tiene poder si de verdad se puede romper.</p>
  </div>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 200" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="24" fill="currentColor" font-size="15" font-weight="bold">Una regla rota reinicia toda la cadena</text>
      <!-- cadena de eslabones (dias) -->
      <g>
        <circle cx="70" cy="80" r="18" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <text x="70" y="85" fill="currentColor" font-size="11" text-anchor="middle">d1</text>
        <circle cx="130" cy="80" r="18" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <text x="130" y="85" fill="currentColor" font-size="11" text-anchor="middle">d2</text>
        <circle cx="190" cy="80" r="18" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <text x="190" y="85" fill="currentColor" font-size="11" text-anchor="middle">...</text>
        <circle cx="250" cy="80" r="18" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
        <text x="250" y="85" fill="currentColor" font-size="11" text-anchor="middle">d11</text>
        <!-- eslabon roto -->
        <circle cx="312" cy="80" r="18" fill="var(--down)" opacity="0.5" stroke="var(--down)" stroke-width="2"/>
        <text x="312" y="85" fill="#fff" font-size="11" text-anchor="middle">✗</text>
        <!-- lineas de conexion -->
        <line x1="88" y1="80" x2="112" y2="80" stroke="var(--line)" stroke-width="2"/>
        <line x1="148" y1="80" x2="172" y2="80" stroke="var(--line)" stroke-width="2"/>
        <line x1="208" y1="80" x2="232" y2="80" stroke="var(--line)" stroke-width="2"/>
        <line x1="268" y1="80" x2="294" y2="80" stroke="var(--down)" stroke-width="2" stroke-dasharray="3 2"/>
      </g>
      <text x="312" y="45" fill="var(--down)" font-size="12" text-anchor="middle" font-weight="bold">rompiste una regla</text>
      <!-- flecha reinicio -->
      <path d="M330,110 C420,150 480,150 560,110" fill="none" stroke="var(--down)" stroke-width="2" stroke-dasharray="5 4"/>
      <path d="M556,118 L566,106 L570,120 Z" fill="var(--down)"/>
      <text x="445" y="165" fill="var(--down)" font-size="12" text-anchor="middle" font-weight="bold">todo vuelve a CERO</text>
      <!-- cadena reiniciada -->
      <circle cx="590" cy="80" r="18" fill="none" stroke="var(--dim)" stroke-width="2" stroke-dasharray="3 3"/>
      <text x="590" y="85" fill="var(--dim)" font-size="11" text-anchor="middle">d1</text>
      <text x="20" y="192" fill="var(--dim)" font-size="12">11 días de disciplina se borran de un solo trade impulsivo. Por eso el miedo a romperla te protege.</text>
    </svg>
    <figcaption>La cadena solo tiene poder porque se puede romper. Perder 11 eslabones por un trade duele tanto que te frena la mano. Ese es el diseño.</figcaption>
  </figure>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>André arranca su reto de 30 días. Día 12: pierde su primer trade y siente el clásico impulso de venganza. Pero piensa: "si entro ahora, reinicio a cero y pierdo 12 días de cadena". Ese pensamiento pesa más que el enojo. Cierra la plataforma. El día 12 queda verde (perdió dinero, pero siguió el plan). Sin la cadena, habría entrado a la venganza. La racha de 12 días le dio algo que la fuerza de voluntad sola no le daba: <b>una razón para no romperla</b>.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>El reto de 30 días mide <b>proceso, no dinero</b>: un día verde es un día en que seguiste el plan, ganes o pierdas.</li>
      <li>Se puede tener día verde perdiendo, y día rojo ganando (con suerte, rompiendo reglas).</li>
      <li>30 días te hacen pasar por todos los estados de ánimo y salir bien de cada uno: ahí nace el hábito.</li>
      <li>La disciplina <b>compone</b>: cada día hace más fácil el siguiente hasta volverse automática.</li>
      <li>Romper una regla grande <b>reinicia la cadena a cero</b>. Ese miedo sano es lo que te frena en la tentación.</li>
    </ul>
  </div>
</div>
`,

/* ─────────────────────────────────────────────────────────────────────────
   L10A · Journaling — Registrar cada trade
   ───────────────────────────────────────────────────────────────────────── */
'l10a': `
<div class="lec">
  <h1 class="lec-h1">Registrar cada trade</h1>
  <p class="lec-lede">Si no lo mides, no lo puedes mejorar. El <b>journal de trading</b> (bitácora) es donde anotas cada operación que haces: qué, cuándo, por qué, cuánto y cómo te sentiste. Suena tedioso, pero es literalmente lo que separa a quien mejora de quien repite los mismos errores para siempre. Tu journal es el espejo honesto que tu memoria nunca será.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Un piloto de avión lleva una <b>caja negra</b> que registra todo el vuelo. Cuando algo sale mal, no confía en su memoria ni en "yo creo que fue esto": revisa los datos exactos y aprende. Tu journal es tu caja negra. Sin él, cada pérdida es un misterio y cada racha ganadora es "suerte inexplicable". Con él, todo deja huella y todo se puede estudiar. Los pilotos no vuelan de memoria; los traders tampoco deberían operar de memoria.</p>
  </div>

  <section class="lec-sec">
    <h2>Por qué tu memoria te miente</h2>
    <p>El cerebro humano es pésimo llevando registro de sus propias decisiones. Recordamos con emoción, no con exactitud. Después de una semana, "juras" que casi siempre ganas con cierto setup... cuando en realidad perdiste 6 de 10. Recuerdas vívidamente el trade ganador enorme y olvidas convenientemente los cinco chiquitos que lo devolvieron. Esto tiene nombre: <b>sesgo de memoria</b>. El journal existe justo para ganarle a esa mentira. Los números no tienen ego.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 200" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="24" fill="currentColor" font-size="15" font-weight="bold">Lo que crees vs lo que pasó (mismo setup, 10 trades)</text>
      <!-- memoria -->
      <text x="20" y="66" fill="currentColor" font-size="13" font-weight="bold">Tu memoria dice:</text>
      <rect x="200" y="52" width="340" height="22" fill="var(--up)" opacity="0.4" stroke="var(--line)"/>
      <text x="370" y="68" fill="currentColor" font-size="12" text-anchor="middle">"casi siempre gano con esto" (~80%)</text>
      <!-- journal -->
      <text x="20" y="126" fill="currentColor" font-size="13" font-weight="bold">Tu journal dice:</text>
      <rect x="200" y="112" width="136" height="22" fill="var(--up)" opacity="0.4" stroke="var(--line)"/>
      <rect x="336" y="112" width="204" height="22" fill="var(--down)" opacity="0.4" stroke="var(--line)"/>
      <text x="268" y="128" fill="currentColor" font-size="12" text-anchor="middle">40% gana</text>
      <text x="438" y="128" fill="#fff" font-size="12" text-anchor="middle">60% pierde</text>
      <text x="20" y="180" fill="var(--dim)" font-size="12">La memoria infla lo que quieres creer. El dato te dice la verdad para que puedas arreglarlo.</text>
    </svg>
    <figcaption>La memoria recuerda con ganas de tener razón. El journal recuerda con exactitud. Solo con el dato real puedes decidir si ese setup sirve.</figcaption>
  </figure>

  <figure class="lec-shot">
    <img src="assets/images/kuro-c-log.jpg" alt="La pantalla Log trade de la terminal" decoding="async">
    <figcaption>As&iacute; se ve de verdad: <b>Log trade</b>. Eliges cuenta, marcas LONG o SHORT, escribes el P&amp;L y Enter. La curva y el registro de abajo se arman solos con lo que vas metiendo.<br>
      <span style="opacity:.72">Captura de la terminal. Los n&uacute;meros de la imagen son de una cuenta
      de pr&aacute;ctica, no un resultado prometido.</span></figcaption>
  </figure>


  <section class="lec-sec">
    <h2>Qué anotar en cada trade</h2>
    <p>No necesitas una novela. Necesitas los campos que después te dejen buscar patrones. El estándar NorthPoint:</p>
    <p>• <b>Fecha y hora:</b> ¿operas mejor en la apertura o más tarde?<br>
    • <b>Instrumento:</b> MNQ, NQ, etc.<br>
    • <b>Dirección:</b> compra (long) o venta (short).<br>
    • <b>Setup:</b> qué patrón viste (ORB, EMA cross, order block...).<br>
    • <b>Entrada, stop y target:</b> los tres precios que definiste.<br>
    • <b>Tamaño:</b> cuántos contratos.<br>
    • <b>Resultado en R:</b> ¿ganaste +2R, perdiste -1R? (mejor que en dólares, porque compara parejo).<br>
    • <b>¿Fue A+?:</b> sí/no. Honesto.<br>
    • <b>Emoción:</b> ¿tranquilo, ansioso, con FOMO, en venganza?<br>
    • <b>Nota:</b> una línea de qué aprendiste.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 320" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="24" fill="currentColor" font-size="15" font-weight="bold">Anatomía de una entrada del journal</text>
      <rect x="20" y="40" width="600" height="220" rx="10" fill="none" stroke="var(--line)" stroke-width="1.5"/>
      <!-- campos con lineas guia -->
      <g font-size="13">
        <text x="40" y="72" fill="var(--dim)">Fecha/hora</text><text x="200" y="72" fill="currentColor" font-weight="bold">28-ago 9:34 am</text>
        <line x1="30" y1="82" x2="610" y2="82" stroke="var(--line)" stroke-dasharray="2 3"/>
        <text x="40" y="104" fill="var(--dim)">Instrumento / dir</text><text x="200" y="104" fill="currentColor" font-weight="bold">MNQ · LONG (compra)</text>
        <line x1="30" y1="114" x2="610" y2="114" stroke="var(--line)" stroke-dasharray="2 3"/>
        <text x="40" y="136" fill="var(--dim)">Setup</text><text x="200" y="136" fill="currentColor" font-weight="bold">ORB break + retest</text>
        <line x1="30" y1="146" x2="610" y2="146" stroke="var(--line)" stroke-dasharray="2 3"/>
        <text x="40" y="168" fill="var(--dim)">Entry / Stop / Target</text><text x="200" y="168" fill="currentColor" font-weight="bold">17,300 / 17,275 / 17,350</text>
        <line x1="30" y1="178" x2="610" y2="178" stroke="var(--line)" stroke-dasharray="2 3"/>
        <text x="40" y="200" fill="var(--dim)">Tamaño / Resultado</text><text x="200" y="200" fill="var(--up)" font-weight="bold">10 MNQ · +2R (+$1,000)</text>
        <line x1="30" y1="210" x2="610" y2="210" stroke="var(--line)" stroke-dasharray="2 3"/>
        <text x="40" y="232" fill="var(--dim)">¿A+? / Emoción</text><text x="200" y="232" fill="currentColor" font-weight="bold">Sí · tranquilo</text>
        <line x1="30" y1="242" x2="610" y2="242" stroke="var(--line)" stroke-dasharray="2 3"/>
        <text x="40" y="256" fill="var(--dim)">Nota</text><text x="120" y="256" fill="currentColor">esperé el retest, no perseguí. Repetir.</text>
      </g>
      <text x="20" y="298" fill="var(--dim)" font-size="12">Cada campo es una futura pregunta: ¿gano más en las mañanas? ¿mis A+ ganan más que mis B?</text>
      <text x="20" y="314" fill="var(--dim)" font-size="12">Sin registrar, esas preguntas no tienen respuesta.</text>
    </svg>
    <figcaption>Una entrada completa toma 60 segundos. Cada campo se convierte, semanas después, en una pregunta que tus datos podrán responder.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>Registra <b>todos</b> los trades, en especial los que te dan pena. El trade impulsivo, el de venganza, el que rompió tus reglas: <b>esos</b> son los más valiosos de anotar, porque son los que te están costando dinero. Un journal que solo tiene tus trades bonitos es un álbum de fotos, no una herramienta. La honestidad brutal es el punto.</p>
  </div>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>Después de un mes registrando, André ordena su journal y descubre algo que su memoria jamás le habría dicho: todos sus trades marcados "emoción: FOMO" suman -$1,400, mientras que sus trades "emoción: tranquilo" suman +$3,200. El patrón salta a la vista. Regla nueva, nacida del dato: si siente FOMO, no entra. Sin journal, ese patrón habría seguido invisible y caro para siempre. El journal no le dijo qué hacer; le mostró la verdad para que él decidiera.</p>
  </div>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 220" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="24" fill="currentColor" font-size="15" font-weight="bold">El patrón que solo el journal revela (resultado por emoción)</text>
      <!-- eje cero -->
      <line x1="60" y1="120" x2="620" y2="120" stroke="var(--line)" stroke-width="1.5"/>
      <text x="30" y="124" fill="var(--dim)" font-size="11">$0</text>
      <!-- barra tranquilo (arriba, verde) -->
      <rect x="120" y="55" width="90" height="65" fill="var(--up)" opacity="0.5" stroke="var(--line)"/>
      <text x="165" y="48" fill="var(--up)" font-size="13" text-anchor="middle" font-weight="bold">+$3,200</text>
      <text x="165" y="140" fill="currentColor" font-size="12" text-anchor="middle">tranquilo</text>
      <!-- barra A+ (arriba, verde) -->
      <rect x="250" y="72" width="90" height="48" fill="var(--up)" opacity="0.4" stroke="var(--line)"/>
      <text x="295" y="65" fill="var(--up)" font-size="13" text-anchor="middle" font-weight="bold">+$1,900</text>
      <text x="295" y="140" fill="currentColor" font-size="12" text-anchor="middle">setup A+</text>
      <!-- barra venganza (abajo, rojo) -->
      <rect x="380" y="120" width="90" height="42" fill="var(--down)" opacity="0.4" stroke="var(--line)"/>
      <text x="425" y="178" fill="var(--down)" font-size="13" text-anchor="middle" font-weight="bold">-$900</text>
      <text x="425" y="200" fill="currentColor" font-size="12" text-anchor="middle">venganza</text>
      <!-- barra FOMO (abajo, rojo) -->
      <rect x="510" y="120" width="90" height="58" fill="var(--down)" opacity="0.5" stroke="var(--line)"/>
      <text x="555" y="194" fill="var(--down)" font-size="13" text-anchor="middle" font-weight="bold">-$1,400</text>
      <text x="555" y="216" fill="currentColor" font-size="12" text-anchor="middle">FOMO</text>
      <text x="60" y="216" fill="var(--dim)" font-size="11">Regla que nace del dato: si siento FOMO o venganza, no entro. Imposible verlo sin registrar.</text>
    </svg>
    <figcaption>Al agrupar por emoción, el journal revela dónde ganas y dónde te sangras. Estos patrones son invisibles para la memoria y valen miles de dólares.</figcaption>
  </figure>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li>El journal es tu <b>caja negra</b>: registra cada trade porque tu memoria miente (sesgo de memoria).</li>
      <li>Anota fecha, instrumento, dirección, setup, entry/stop/target, tamaño, resultado en R, si fue A+, emoción y una nota.</li>
      <li>Mide el resultado en <b>R</b> (no solo en dólares) para comparar trades de distinto tamaño parejo.</li>
      <li>Registra sobre todo los trades que te dan pena: ahí está el dinero que estás perdiendo.</li>
      <li>Cada campo es una pregunta futura que solo el dato podrá responder.</li>
    </ul>
  </div>
</div>
`,

/* ─────────────────────────────────────────────────────────────────────────
   L10B · Journaling — Win rate, profit factor y expectativa
   ───────────────────────────────────────────────────────────────────────── */
'l10b': `
<div class="lec">
  <h1 class="lec-h1">Win rate, profit factor y expectativa</h1>
  <p class="lec-lede">Ya registras tus trades. Ahora toca leer los números para saber si de verdad tienes una ventaja o solo estás teniendo suerte. Tres métricas te lo dicen todo: el <b>win rate</b> (qué tan seguido ganas), el <b>profit factor</b> (cuánto ganas por cada dólar que pierdes) y la <b>expectativa</b> (cuánto esperas ganar, en promedio, por trade). Con estas tres sabes si tu sistema es una máquina de hacer dinero o una máquina de perderlo lento.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Imagina que tienes un puesto de limonada. El <b>win rate</b> es cuántos clientes de cada 10 te compran. El <b>profit factor</b> es cuánto dinero entra por cada peso que gastas en limones. La <b>expectativa</b> es cuánto ganas en promedio por cada persona que se para en tu puesto, compre o no. Podrías vender a pocos (win rate bajo) pero cobrar carísimo (profit factor alto) y aun así ser un negociazo. Los tres números juntos te dicen si el puesto vale la pena. En trading es idéntico.</p>
  </div>

  <section class="lec-sec">
    <h2>1. Win rate: qué tan seguido ganas</h2>
    <p>Es el más fácil y el más malentendido. Win rate = trades ganados ÷ trades totales, en porcentaje. Si de 20 trades ganaste 8, tu win rate es 8÷20 = 40%.</p>
    <p>El error del principiante es creer que win rate alto = buen trader. <b>Falso.</b> Como viste en la lección l8b, con buen R:R puedes ganar dinero con 40% de aciertos, y con mal R:R puedes perder con 70%. El win rate solo, sin el R:R, no te dice nada. Es una pieza del rompecabezas, no el rompecabezas.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 150" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="24" fill="currentColor" font-size="15" font-weight="bold">Win rate 40%: 8 ganados de 20 trades</text>
      <!-- 20 cuadritos -->
      <g>
        <rect x="20" y="45" width="26" height="26" fill="var(--up)" opacity="0.6" stroke="var(--line)"/>
        <rect x="52" y="45" width="26" height="26" fill="var(--up)" opacity="0.6" stroke="var(--line)"/>
        <rect x="84" y="45" width="26" height="26" fill="var(--up)" opacity="0.6" stroke="var(--line)"/>
        <rect x="116" y="45" width="26" height="26" fill="var(--up)" opacity="0.6" stroke="var(--line)"/>
        <rect x="148" y="45" width="26" height="26" fill="var(--up)" opacity="0.6" stroke="var(--line)"/>
        <rect x="180" y="45" width="26" height="26" fill="var(--up)" opacity="0.6" stroke="var(--line)"/>
        <rect x="212" y="45" width="26" height="26" fill="var(--up)" opacity="0.6" stroke="var(--line)"/>
        <rect x="244" y="45" width="26" height="26" fill="var(--up)" opacity="0.6" stroke="var(--line)"/>
        <rect x="276" y="45" width="26" height="26" fill="var(--down)" opacity="0.6" stroke="var(--line)"/>
        <rect x="308" y="45" width="26" height="26" fill="var(--down)" opacity="0.6" stroke="var(--line)"/>
        <rect x="340" y="45" width="26" height="26" fill="var(--down)" opacity="0.6" stroke="var(--line)"/>
        <rect x="372" y="45" width="26" height="26" fill="var(--down)" opacity="0.6" stroke="var(--line)"/>
        <rect x="404" y="45" width="26" height="26" fill="var(--down)" opacity="0.6" stroke="var(--line)"/>
        <rect x="436" y="45" width="26" height="26" fill="var(--down)" opacity="0.6" stroke="var(--line)"/>
        <rect x="468" y="45" width="26" height="26" fill="var(--down)" opacity="0.6" stroke="var(--line)"/>
        <rect x="500" y="45" width="26" height="26" fill="var(--down)" opacity="0.6" stroke="var(--line)"/>
        <rect x="532" y="45" width="26" height="26" fill="var(--down)" opacity="0.6" stroke="var(--line)"/>
        <rect x="564" y="45" width="26" height="26" fill="var(--down)" opacity="0.6" stroke="var(--line)"/>
      </g>
      <text x="20" y="98" fill="var(--up)" font-size="13" font-weight="bold">■ 8 verdes = ganados</text>
      <text x="220" y="98" fill="var(--down)" font-size="13" font-weight="bold">■ 12 rojos = perdidos</text>
      <text x="20" y="128" fill="currentColor" font-size="13">Win rate = 8 / 20 = <tspan font-weight="bold">40%</tspan>. ¿Es bueno? Depende del R:R. Por sí solo, no dice nada.</text>
    </svg>
    <figcaption>40% de aciertos suena mal, pero con R:R 1:2 este trader gana dinero. El win rate necesita al R:R para significar algo.</figcaption>
  </figure>

  <figure class="lec-shot">
    <img src="assets/images/kuro-c-journal.jpg" alt="La pantalla Mi desempe&ntilde;o de la terminal" decoding="async">
    <figcaption>As&iacute; se ve de verdad: <b>Mi desempe&ntilde;o</b>. Win rate, d&iacute;as ganadores, promedio gana/pierde y long vs short. No los calculas t&uacute;: salen de los trades que registraste.<br>
      <span style="opacity:.72">Captura de la terminal. Los n&uacute;meros de la imagen son de una cuenta
      de pr&aacute;ctica, no un resultado prometido.</span></figcaption>
  </figure>


  <section class="lec-sec">
    <h2>2. Profit factor: cuánto ganas por cada dólar que pierdes</h2>
    <p>Aquí está la métrica que sí junta todo. Profit factor (PF) = total ganado ÷ total perdido. Es una división simplísima con un significado enorme:</p>
    <p>• PF = 1.0 → ganas exactamente lo que pierdes. Empatas (y en realidad pierdes por comisiones).<br>
    • PF menor a 1.0 → pierdes dinero. Tu sistema está roto.<br>
    • PF mayor a 1.0 → ganas dinero. Mientras más alto, mejor.</p>
    <p>Referencia práctica NorthPoint: un PF <b>arriba de 1.3</b> empieza a ser un sistema de verdad. Debajo de eso, es más señal que sistema: no aguanta comisiones, deslizamiento ni un mal día. Un PF de 1.5–2.0 es sólido. Arriba de 2.0 es excelente.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 230" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="24" fill="currentColor" font-size="15" font-weight="bold">Profit Factor = ganado ÷ perdido</text>
      <!-- barra escala PF -->
      <line x1="40" y1="80" x2="600" y2="80" stroke="var(--line)" stroke-width="2"/>
      <!-- zonas -->
      <rect x="40" y="70" width="180" height="20" fill="var(--down)" opacity="0.25"/>
      <rect x="220" y="70" width="90" height="20" fill="var(--dim)" opacity="0.25"/>
      <rect x="310" y="70" width="290" height="20" fill="var(--up)" opacity="0.25"/>
      <text x="130" y="110" fill="var(--down)" font-size="12" text-anchor="middle" font-weight="bold">menor a 1.0</text>
      <text x="130" y="126" fill="var(--down)" font-size="11" text-anchor="middle">PIERDES</text>
      <text x="265" y="110" fill="var(--dim)" font-size="12" text-anchor="middle" font-weight="bold">1.0 – 1.3</text>
      <text x="265" y="126" fill="var(--dim)" font-size="11" text-anchor="middle">frágil</text>
      <text x="450" y="110" fill="var(--up)" font-size="12" text-anchor="middle" font-weight="bold">1.3 en adelante</text>
      <text x="450" y="126" fill="var(--up)" font-size="11" text-anchor="middle">sistema real</text>
      <!-- marca 1.0 -->
      <line x1="220" y1="62" x2="220" y2="98" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2"/>
      <text x="220" y="56" fill="currentColor" font-size="11" text-anchor="middle">1.0</text>
      <!-- ejemplo calculo -->
      <text x="40" y="170" fill="currentColor" font-size="13">Ejemplo: ganaste $3,000, perdiste $2,000.</text>
      <text x="40" y="195" fill="currentColor" font-size="14" font-weight="bold">PF = 3,000 / 2,000 = <tspan fill="var(--up)">1.5</tspan>  → sólido</text>
      <text x="40" y="220" fill="var(--dim)" font-size="12">Significa: por cada $1 que pierdes, ganas $1.50. Vives de esa diferencia.</text>
    </svg>
    <figcaption>El profit factor resume tu sistema en un solo número. Debajo de 1.3 es frágil; de 1.5 para arriba, sólido. Es la métrica reina del journal.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>3. Expectativa: cuánto ganas, en promedio, por trade</h2>
    <p>La expectativa te dice qué esperar de cada trade en promedio, mezclando el win rate y el tamaño de tus ganancias y pérdidas. Es la métrica que responde: "si repito este sistema 1,000 veces, ¿cuánto gano por operación?".</p>
    <p>La fórmula, contada simple:</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 220" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="24" fill="currentColor" font-size="15" font-weight="bold">La fórmula de la expectativa</text>
      <!-- formula visual -->
      <g font-size="13">
        <rect x="30" y="45" width="270" height="46" rx="6" fill="var(--up)" opacity="0.15" stroke="var(--line)"/>
        <text x="165" y="68" fill="var(--up)" text-anchor="middle" font-weight="bold">(% que ganas × ganancia media)</text>
        <text x="165" y="84" fill="var(--dim)" text-anchor="middle" font-size="11">lo bueno que te llega</text>

        <text x="315" y="75" fill="currentColor" font-size="20" font-weight="bold">−</text>

        <rect x="340" y="45" width="270" height="46" rx="6" fill="var(--down)" opacity="0.15" stroke="var(--line)"/>
        <text x="475" y="68" fill="var(--down)" text-anchor="middle" font-weight="bold">(% que pierdes × pérdida media)</text>
        <text x="475" y="84" fill="var(--dim)" text-anchor="middle" font-size="11">lo malo que te llega</text>
      </g>
      <text x="320" y="120" fill="currentColor" font-size="14" text-anchor="middle" font-weight="bold">= expectativa por trade</text>
      <!-- ejemplo numerico -->
      <line x1="30" y1="135" x2="610" y2="135" stroke="var(--line)"/>
      <text x="30" y="160" fill="currentColor" font-size="13">Ejemplo: ganas 40% de las veces, +$200 en promedio; pierdes 60%, -$100.</text>
      <text x="30" y="184" fill="currentColor" font-size="14" font-weight="bold">(0.40 × 200) − (0.60 × 100) = 80 − 60 = <tspan fill="var(--up)">+$20</tspan> por trade</text>
      <text x="30" y="210" fill="var(--dim)" font-size="12">Cada vez que aprietas el botón, en promedio ganas $20. Hazlo 100 veces bien = +$2,000.</text>
    </svg>
    <figcaption>Expectativa = lo bueno que esperas menos lo malo que esperas. Si sale positiva, cada trade suma en promedio. Si sale negativa, mejor no operar ese sistema.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>Una expectativa positiva chiquita (+$20 por trade) parece poco, pero es oro: significa que tienes una <b>ventaja real</b>. El trabajo entonces es repetir muchas veces con disciplina y dejar que la matemática haga lo suyo. El error es despreciar el +$20 y buscar el trade "grande" que rompe el sistema. La riqueza está en repetir la ventaja pequeña, no en cazar el jonrón.</p>
  </div>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 200" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="24" fill="currentColor" font-size="15" font-weight="bold">Tabla rápida: ¿tu sistema sirve?</text>
      <line x1="12" y1="38" x2="628" y2="38" stroke="var(--line)"/>
      <g font-size="12">
        <text x="20" y="56" fill="var(--dim)" font-weight="bold">Win rate</text>
        <text x="130" y="56" fill="var(--dim)" font-weight="bold">R:R</text>
        <text x="230" y="56" fill="var(--dim)" font-weight="bold">Profit Factor</text>
        <text x="400" y="56" fill="var(--dim)" font-weight="bold">Expectativa</text>
        <text x="530" y="56" fill="var(--dim)" font-weight="bold">Veredicto</text>
      </g>
      <line x1="12" y1="64" x2="628" y2="64" stroke="var(--line)"/>
      <g font-size="12" fill="currentColor">
        <text x="20" y="86">40%</text><text x="130" y="86">1:2</text><text x="230" y="86" fill="var(--up)">1.33</text><text x="400" y="86" fill="var(--up)">+$20</text><text x="530" y="86" fill="var(--up)" font-weight="bold">sirve</text>
        <text x="20" y="112">50%</text><text x="130" y="112">1:2</text><text x="230" y="112" fill="var(--up)">2.0</text><text x="400" y="112" fill="var(--up)">+$50</text><text x="530" y="112" fill="var(--up)" font-weight="bold">excelente</text>
        <text x="20" y="138">70%</text><text x="130" y="138">1:0.5</text><text x="230" y="138" fill="var(--down)">1.16</text><text x="400" y="138" fill="var(--dim)">+$5</text><text x="530" y="138" fill="var(--dim)" font-weight="bold">frágil</text>
        <text x="20" y="164">40%</text><text x="130" y="164">1:1</text><text x="230" y="164" fill="var(--down)">0.66</text><text x="400" y="164" fill="var(--down)">-$20</text><text x="530" y="164" fill="var(--down)" font-weight="bold">roto</text>
      </g>
      <line x1="12" y1="176" x2="628" y2="176" stroke="var(--line)"/>
      <text x="20" y="194" fill="var(--dim)" font-size="11">Fíjate en la fila 3: 70% de aciertos y aun así apenas sobrevive. El win rate solo engaña.</text>
    </svg>
    <figcaption>Las tres métricas juntas cuentan la historia completa. Nota cómo el 70% de aciertos (fila 3) resulta peor que el 40% de la fila 1. Sin R:R, el win rate miente.</figcaption>
  </figure>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>André saca las cuentas de su último mes: 50 trades, ganó 22 (win rate 44%). Sumó $6,600 en ganadores y perdió $4,400 en perdedores. Profit factor = 6,600 ÷ 4,400 = <b>1.5</b> (sólido). Expectativa = 6,600 − 4,400 = +$2,200 en 50 trades = <b>+$44 por trade</b>. Conclusión con datos, no con sensaciones: tiene una ventaja real. Su tarea no es "acertar más", es <b>repetir</b> este mismo proceso con disciplina. El journal convirtió una corazonada en una certeza medida.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li><b>Win rate</b> = ganados ÷ totales. Por sí solo no dice nada: necesita el R:R.</li>
      <li><b>Profit factor</b> = ganado ÷ perdido. Debajo de 1.0 pierdes; arriba de 1.3 es sistema real; 1.5+ es sólido.</li>
      <li><b>Expectativa</b> = (%gana × ganancia media) − (%pierde × pérdida media). Es cuánto ganas por trade en promedio.</li>
      <li>Una expectativa positiva chiquita es oro: es ventaja real. Se explota <b>repitiendo</b>, no cazando el jonrón.</li>
      <li>Un win rate alto puede esconder un sistema perdedor. Mira siempre las tres métricas juntas.</li>
    </ul>
  </div>
</div>
`,

/* ─────────────────────────────────────────────────────────────────────────
   L10C · Journaling — Backtesting: mide antes de arriesgar
   ───────────────────────────────────────────────────────────────────────── */
'l10c': `
<div class="lec">
  <h1 class="lec-h1">Backtesting: mide antes de arriesgar</h1>
  <p class="lec-lede">Antes de arriesgar un solo peso real con una estrategia nueva, pruébala en el pasado. Eso es <b>backtesting</b>: agarrar tu setup y aplicarlo a cientos de casos históricos para ver si de verdad habría ganado dinero. Es la diferencia entre "creo que esto funciona" y "medí esto en 200 trades y funciona". El backtesting te deja equivocarte gratis, con datos viejos, en lugar de caro, con tu cuenta.</p>

  <div class="lec-analogia">
    <b>Piénsalo así</b>
    <p>Un chef no estrena un platillo nuevo cobrándolo en la noche más llena del restaurante. Lo prueba antes: lo cocina 20 veces, ajusta la sal, mide los tiempos, ve qué falla. Cuando por fin lo pone en el menú, ya sabe que funciona. El backtesting es tu cocina de pruebas: ensayas la estrategia con el mercado del pasado hasta que sabes si sirve, y solo entonces la cobras con dinero real. Nadie que se respete estrena a ciegas.</p>
  </div>

  <section class="lec-sec">
    <h2>El proceso en 4 pasos</h2>
    <p>Backtesting no es adivinar viendo una gráfica. Es un método:</p>
    <p><b>1. Define la regla exacta.</b> Sin ambigüedad. "Compro cuando el precio rompe el rango de apertura y hace retest, stop debajo del rango, target a 2R." Si no la puedes escribir en una frase clara, no la puedes medir.<br>
    <b>2. Búscala en el pasado.</b> Recorre gráficas históricas y encuentra cada vez que apareció tu setup. Anota qué habría pasado: ganó o perdió, cuántos R.<br>
    <b>3. Junta muchos casos.</b> Mientras más, mejor (llegamos a esto abajo).<br>
    <b>4. Saca las métricas.</b> Win rate, profit factor, expectativa (justo las de la lección l10b). Los números te dicen si la estrategia tiene ventaja o no.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 160" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="24" fill="currentColor" font-size="15" font-weight="bold">El ciclo del backtesting</text>
      <g font-size="12">
        <rect x="20" y="55" width="120" height="55" rx="8" fill="var(--up)" opacity="0.12" stroke="var(--line)"/>
        <text x="80" y="78" fill="currentColor" text-anchor="middle" font-weight="bold">1. Regla</text>
        <text x="80" y="96" fill="currentColor" text-anchor="middle">exacta</text>
        <text x="150" y="87" fill="var(--dim)" font-size="16">→</text>
        <rect x="170" y="55" width="120" height="55" rx="8" fill="var(--up)" opacity="0.12" stroke="var(--line)"/>
        <text x="230" y="78" fill="currentColor" text-anchor="middle" font-weight="bold">2. Búscala</text>
        <text x="230" y="96" fill="currentColor" text-anchor="middle">en el pasado</text>
        <text x="300" y="87" fill="var(--dim)" font-size="16">→</text>
        <rect x="320" y="55" width="120" height="55" rx="8" fill="var(--up)" opacity="0.12" stroke="var(--line)"/>
        <text x="380" y="78" fill="currentColor" text-anchor="middle" font-weight="bold">3. Junta</text>
        <text x="380" y="96" fill="currentColor" text-anchor="middle">muchos casos</text>
        <text x="450" y="87" fill="var(--dim)" font-size="16">→</text>
        <rect x="470" y="55" width="120" height="55" rx="8" fill="var(--up)" opacity="0.12" stroke="var(--line)"/>
        <text x="530" y="78" fill="currentColor" text-anchor="middle" font-weight="bold">4. Mide</text>
        <text x="530" y="96" fill="currentColor" text-anchor="middle">las métricas</text>
      </g>
      <path d="M530,115 C530,145 80,145 80,118" fill="none" stroke="var(--dim)" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="305" y="152" fill="var(--dim)" font-size="11" text-anchor="middle">si no sirve, ajusta la regla y repite</text>
    </svg>
    <figcaption>Un ciclo repetible: define, busca, junta datos, mide. Si los números no dan, ajustas la regla y vuelves a medir. Todo antes de arriesgar real.</figcaption>
  </figure>

  <figure class="lec-shot">
    <img src="assets/images/kuro-c-backtest.jpg" alt="La pantalla Backtesting de la terminal" decoding="async">
    <figcaption>As&iacute; se ve de verdad: <b>Backtesting</b>. Es la misma pantalla que Log trade pero con una cuenta aparte &mdash; mides una idea sin tocar tu historial real.<br>
      <span style="opacity:.72">Captura de la terminal. Los n&uacute;meros de la imagen son de una cuenta
      de pr&aacute;ctica, no un resultado prometido.</span></figcaption>
  </figure>


  <section class="lec-sec">
    <h2>El tamaño de muestra: por qué 5 trades no prueban nada</h2>
    <p>Este es el error más peligroso del backtesting casero. Pruebas tu idea en 5 trades, ganas 4, y gritas "¡funciona!". No. Cinco trades no prueban nada: pudo ser pura suerte. Es como lanzar una moneda 5 veces, que caiga cara 4, y concluir que la moneda está cargada. Necesitas <b>muchos</b> lanzamientos para que la suerte se promedie y aparezca la verdad.</p>
    <p>Regla práctica: apunta a <b>mínimo 100 casos</b>, e idealmente más. Con muestras chicas, tus métricas bailan como locas de un día a otro. Con muestras grandes, se estabilizan y empiezas a confiar en ellas.</p>
  </section>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 250" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="22" fill="currentColor" font-size="15" font-weight="bold">Con pocos trades, el win rate salta; con muchos, se asienta</text>
      <line x1="55" y1="45" x2="55" y2="200" stroke="var(--line)"/>
      <line x1="55" y1="200" x2="620" y2="200" stroke="var(--line)"/>
      <line x1="55" y1="122" x2="620" y2="122" stroke="var(--up)" stroke-width="1.5" stroke-dasharray="4 4"/>
      <text x="625" y="126" fill="var(--up)" font-size="11" text-anchor="end">verdad real 45%</text>
      <text x="16" y="60" fill="var(--dim)" font-size="11">80%</text>
      <text x="16" y="126" fill="var(--dim)" font-size="11">45%</text>
      <text x="16" y="196" fill="var(--dim)" font-size="11">10%</text>
      <text x="300" y="235" fill="var(--dim)" font-size="12">número de trades en la muestra  →</text>
      <!-- curva que oscila mucho al principio y se calma -->
      <polyline fill="none" stroke="currentColor" stroke-width="2.5"
        points="70,70 95,185 120,90 150,175 185,105 225,150 270,110 320,138 380,118 440,128 510,124 590,122"/>
      <!-- zonas -->
      <rect x="55" y="45" width="150" height="155" fill="var(--down)" opacity="0.06"/>
      <text x="130" y="220" fill="var(--down)" font-size="11" text-anchor="middle">pocos: no confíes</text>
      <rect x="420" y="45" width="200" height="155" fill="var(--up)" opacity="0.06"/>
      <text x="520" y="220" fill="var(--up)" font-size="11" text-anchor="middle">muchos: confiable</text>
    </svg>
    <figcaption>Con pocos trades el win rate brinca entre 10% y 80% por pura suerte. Solo con muchos casos se acerca a la verdad (aquí, 45%). Mide grande o no midas.</figcaption>
  </figure>

  <div class="lec-callout">
    <b>Ojo</b>
    <p>Cuidado con engañarte a ti mismo. Es facilísimo mirar una gráfica del pasado y "ver" que tu setup ganó, porque ya sabes cómo terminó. Se llama <b>sesgo retrospectivo</b>. Para evitarlo: define la regla <b>antes</b> de mirar, y sé estricto. Si dudas de si el setup apareció o no, cuéntalo como que no. Un backtest honesto es feo a veces; un backtest tramposo siempre se ve hermoso... y te cuesta dinero real después.</p>
  </div>

  <figure class="lec-fig">
    <svg viewBox="0 0 640 240" style="width:100%;height:auto" font-family="monospace">
      <text x="12" y="22" fill="currentColor" font-size="15" font-weight="bold">Curva de equity de un backtest de 100 trades</text>
      <line x1="55" y1="40" x2="55" y2="195" stroke="var(--line)"/>
      <line x1="55" y1="195" x2="620" y2="195" stroke="var(--line)"/>
      <text x="16" y="55" fill="var(--dim)" font-size="11">+$</text>
      <text x="30" y="150" fill="var(--dim)" font-size="11">$0</text>
      <text x="300" y="228" fill="var(--dim)" font-size="12">trade 1  →  trade 100</text>
      <!-- linea $0 -->
      <line x1="55" y1="145" x2="620" y2="145" stroke="var(--line)" stroke-dasharray="3 3"/>
      <!-- curva ascendente con dientes (drawdowns) -->
      <polyline fill="none" stroke="var(--up)" stroke-width="2.5"
        points="55,145 90,132 115,150 150,120 185,138 220,105 255,122 300,92 340,110 385,78 430,95 480,62 530,80 590,55"/>
      <!-- marcar un drawdown -->
      <line x1="220" y1="105" x2="255" y2="122" stroke="var(--down)" stroke-width="3"/>
      <text x="240" y="98" fill="var(--down)" font-size="11">racha mala (normal)</text>
      <circle cx="590" cy="55" r="5" fill="var(--up)"/>
      <text x="500" y="45" fill="var(--up)" font-size="12" font-weight="bold">sube en el largo plazo</text>
      <text x="55" y="225" fill="var(--dim)" font-size="0"> </text>
    </svg>
    <figcaption>Una buena curva de backtest sube en general, pero con bajones (drawdowns) en el camino. Si tu backtest no tiene ningún bajón, probablemente hiciste trampa: el mercado real siempre tiene rachas malas.</figcaption>
  </figure>

  <section class="lec-sec">
    <h2>Del backtest al mercado real: con cuidado</h2>
    <p>Que un backtest dé buenos números es una señal verde, no una garantía. El pasado no se repite idéntico. Por eso, después de un backtest sólido, el siguiente paso <b>no</b> es meter tu cuenta completa. Es probar en pequeño: primero en <b>simulador</b> (cuenta demo, dinero de mentira, mercado en vivo) y luego en real con tamaño mínimo. Así confirmas que la estrategia sobrevive al mundo real —con sus comisiones, su deslizamiento y tus nervios— antes de subirle.</p>
    <p>El backtesting responde "¿esto tiene ventaja histórica?". El sim y el tamaño chico responden "¿yo puedo ejecutarlo bien en vivo?". Necesitas las dos respuestas en verde antes de arriesgar en serio.</p>
  </section>

  <div class="lec-ejemplo">
    <b>Ejemplo</b>
    <p>André tiene una idea nueva de setup en la apertura. En vez de estrenarla con dinero real, dedica dos tardes a backtestear: recorre 3 meses de gráficas y encuentra 120 casos de su setup. Anota cada uno con honestidad. Resultado: win rate 47%, profit factor 1.4, expectativa +$18 por trade. Números sólidos y muestra grande (120 > 100). Pero no se lanza aún: pasa dos semanas ejecutándolo en simulador para ver si puede hacerlo bien en vivo. Solo cuando el sim también sale verde, empieza en real con tamaño mínimo. Midió antes de arriesgar, en cada paso.</p>
  </div>

  <div class="lec-key">
    <h3>En resumen</h3>
    <ul>
      <li><b>Backtesting</b> = probar tu estrategia en el pasado antes de arriesgar dinero real. Te deja equivocarte gratis.</li>
      <li>Método en 4 pasos: define la regla exacta, búscala en el pasado, junta muchos casos, mide las métricas.</li>
      <li><b>Tamaño de muestra:</b> 5 trades no prueban nada. Apunta a mínimo 100 casos para que la suerte se promedie.</li>
      <li>Cuidado con el <b>sesgo retrospectivo</b>: define la regla antes de mirar y sé estricto. Un backtest sin ningún drawdown es sospechoso.</li>
      <li>Backtest verde no es garantía: después valida en <b>simulador</b> y luego en real con tamaño mínimo antes de subirle.</li>
    </ul>
  </div>
</div>
`

});
