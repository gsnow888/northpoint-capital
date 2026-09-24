/* ============================================================
   memos/memo-btc-sep-2026.html — script (tema claro/oscuro, nav y barra de progreso)
   Extraído del JS inline original del memo.
   ============================================================ */

(function(){
  var root = document.documentElement;
  var btn  = document.getElementById('theme-btn');
  var KEY  = 'np_theme';   /* misma clave que la portada: el tema viaja entre páginas */

  /* Tema: mismo mecanismo que el sitio (data-theme="light" en <html>).
     localStorage puede fallar en ventana privada: todo va en try/catch. */
  function apply(theme){
    if (theme === 'light') root.setAttribute('data-theme','light');
    else root.removeAttribute('data-theme');
    btn.textContent = (theme === 'light') ? 'Oscuro' : 'Claro';
  }
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch(e){}
  apply(saved === 'dark' ? 'dark' : 'light');   /* por defecto CLARO, como la portada */
  btn.addEventListener('click', function(){
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    apply(next);
    try { localStorage.setItem(KEY, next); } catch(e){}
  });

  /* Nav + barra de progreso de lectura */
  var nav = document.getElementById('nav');
  var bar = document.getElementById('progress');
  var ticking = false;
  function onScroll(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function(){
      var y = window.scrollY || document.documentElement.scrollTop;
      nav.classList.toggle('scrolled', y > 12);
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, y / h) : 0) + ')';
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
