/* ============================================================
   terminal.html — script 1 de 1
   Extraído del JavaScript inline original (1 bloque(s) <script>, línea 931 del HTML original).
   Se carga en el MISMO punto del documento donde estaba: el orden respecto
   al HTML importa (los scripts sólo ven los elementos que ya existen arriba).
   ============================================================ */


/* ── tema: misma llave que el índice, para que no cambie al navegar ── */
(function(){
  var btn = document.getElementById('themeBtn');
  function apply(t){
    if (t === 'light') document.documentElement.setAttribute('data-theme','light');
    else document.documentElement.removeAttribute('data-theme');
    if (btn) btn.textContent = t === 'light' ? '◐ OSCURO' : '◐ CLARO';
    try { localStorage.setItem('np_theme', t); } catch(e){}
  }
  var saved; try { saved = localStorage.getItem('np_theme') || 'light'; } catch(e){ saved = 'light'; }
  apply(saved);
  if (btn) btn.addEventListener('click', function(){
    apply(document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });
})();

/* ── revelado al entrar ── */
(function(){
  var els = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function(e){ e.classList.add('on'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (!en.isIntersecting) return;
      en.target.classList.add('on');
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
  els.forEach(function(e){ io.observe(e); });
})();

/* ── la barra de compra: entra pasado el primer scroll y se esconde cuando
      ya estás en el bloque de precio (ahí los botones grandes mandan) ── */
(function(){
  var bar = document.getElementById('sticky'), precio = document.getElementById('precio');
  function ver(){
    var pasoHero = window.scrollY > window.innerHeight * 1.1;
    var enPrecio = false;
    if (precio) {
      var r = precio.getBoundingClientRect();
      enPrecio = r.top < window.innerHeight * 0.6 && r.bottom > 0;
    }
    var fin = (window.innerHeight + window.scrollY) > (document.body.offsetHeight - 260);
    bar.classList.toggle('on', pasoHero && !enPrecio && !fin);
  }
  window.addEventListener('scroll', ver, { passive:true });
  window.addEventListener('resize', ver);
  ver();
})();

/* ── el cobro ──
   Las ligas viven en una sola constante: cuando existan las cuentas de Stripe y
   MercadoPago se pegan sus URLs y ya, sin tocar el HTML. Mientras estén vacías
   el botón NO se queda apuntando a "#" fingiendo que funciona: se desactiva y
   dice que abre en unos días. Un checkout que no cobra y no lo avisa es la peor
   primera impresión que puede dar una firma que pide $17,000. */
(function(){
  var PAGO = {
    stripeMensual: '',   // Stripe · SUSCRIPCIÓN mensual del Terminal $1,490
    stripeAnual:   '',   // Stripe · Terminal anual $11,900
    stripeVida:    ''    // Stripe · Terminal de por vida $17,000
  };
  document.querySelectorAll('[data-pago]').forEach(function(a){
    var url = PAGO[a.getAttribute('data-pago')];
    if (url) { a.href = url; a.setAttribute('rel','noopener'); return; }
    a.setAttribute('aria-disabled','true');
    a.setAttribute('title','El cobro abre en unos días');
    var s = a.querySelector('span');
    if (s) s.textContent = 'ABRE EN UNOS DÍAS';
    a.addEventListener('click', function(e){ e.preventDefault(); });
  });
})();
