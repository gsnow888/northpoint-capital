/* ============================================================
   js/portada.js — comportamiento compartido de las páginas-documento
   de la portada (socios.html, memos.html, newsletter.html).
   Es la misma lógica que js/index.js (reveal al hacer scroll, tema
   claro/oscuro guardado en localStorage como `np_theme`, nav con estado
   de scroll) sin las escenas ni los demos de la portada. Se carga al
   FINAL del <body>, así que todos los .rv ya existen cuando se observan.
   ============================================================ */
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

  /* ---------- Tema claro / oscuro (misma clave que la portada) ---------- */
  function applyTheme(t){
    if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
    var tb = document.getElementById('themeBtn');
    if (tb) tb.textContent = t === 'light' ? '◐ OSCURO' : '◐ CLARO';
    try { localStorage.setItem('np_theme', t); } catch(e){}
  }
  var savedTheme = 'light';
  try { savedTheme = localStorage.getItem('np_theme') || 'light'; } catch(e){}  /* por defecto CLARO, como la portada */
  applyTheme(savedTheme);
  var tb = document.getElementById('themeBtn');
  if (tb) tb.addEventListener('click', function(){
    applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });

  /* ---------- Nav con estado de scroll ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var setNav = function(){ nav.classList.toggle('scrolled', window.scrollY > 24); };
    window.addEventListener('scroll', setNav, { passive: true });
    setNav();
  }
})();
