/* ============================================================
   northpoint-app.html — script 1 de 1
   Extraído del JavaScript inline original (1 bloque(s) <script>, línea 739 del HTML original).
   Se carga en el MISMO punto del documento donde estaba: el orden respecto
   al HTML importa (los scripts sólo ven los elementos que ya existen arriba).
   ============================================================ */


/* ── el tema: se recuerda, y arranca en el del sistema ── */
(function(){
  var K = 'np_tema';
  var g = null;
  try{ g = localStorage.getItem(K); }catch(e){}
  if(g) document.documentElement.setAttribute('data-theme', g);
  var b = document.getElementById('btTema');
  if(b) b.addEventListener('click', function(){
    var claro = document.documentElement.getAttribute('data-theme') === 'light';
    var n = claro ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', n);
    try{ localStorage.setItem(K, n); }catch(e){}
  });
})();

/* ── aparecen al hacer scroll. Si el navegador no trae IntersectionObserver
     se encienden todas de una vez: nunca se queda nada invisible. ── */
(function(){
  if(!('IntersectionObserver' in window)) return;   /* sin observer, todo queda visible */
  var raiz = document.documentElement;
  raiz.classList.add('anim');
  var el = [].slice.call(document.querySelectorAll('.rv'));
  var todo = function(){ for(var i=0;i<el.length;i++) el[i].classList.add('on'); };
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target); } });
  }, { rootMargin:'0px 0px -8% 0px', threshold:.06 });
  el.forEach(function(e){ io.observe(e); });
  /* red de seguridad: si a los 3 s el observer no encendió NADA —pasa en
     algunos navegadores incrustados y en captura headless— se enciende todo
     a mano. Una landing invisible no vende. */
  setTimeout(function(){ if(!document.querySelector('.rv.on')) todo(); }, 3000);
})();

/* ── LA VITRINA: escalar el Terminal para que quepa ──
   El iframe mide 1280×800 lógicos SIEMPRE; lo que cambia es la escala. Así la
   app se dibuja con su layout de escritorio aunque el marco mida 340 px de
   ancho en un teléfono. Se recalcula al redimensionar. */
(function(){
  var mac = document.getElementById('mac');
  var fr  = document.getElementById('vitrina');
  if(!mac || !fr) return;
  function ajusta(){
    var vp = mac.querySelector('.mac-vp'); if(!vp) return;
    /* en el teléfono NO se escala: ahí el iframe va a su ancho real para que
       la app use su propio diseño móvil, que sí se lee */
    if(innerWidth <= 760){ fr.style.transform = ''; return; }
    var w = vp.clientWidth; if(!w) return;
    fr.style.transform = 'scale(' + (w / 1280) + ')';
  }
  ajusta();
  addEventListener('resize', ajusta, { passive:true });
  /* el aspect-ratio de la tapa puede resolverse un frame después de la fuente */
  setTimeout(ajusta, 300); setTimeout(ajusta, 1200);

  /* el tema viaja al iframe: la portada manda, la vitrina obedece */
  function tema(){
    var t = document.documentElement.getAttribute('data-theme')
         || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    try{ fr.contentWindow.postMessage({ np:'tema', v:t }, location.origin); }catch(e){}
  }
  fr.addEventListener('load', tema);
  var bt = document.getElementById('btTema');
  if(bt) bt.addEventListener('click', function(){ setTimeout(tema, 30); });
})();

/* ── LA CINTA DE EJECUCIONES ──
   Las diez capturas van DOS veces en la pista y la animación corre hasta
   −50%: al llegar, la segunda copia está exactamente donde arrancó la
   primera, así que el bucle no tiene costura. */
(function(){
  var pista = document.getElementById('pista'); if(!pista) return;
  var html = '';
  for(var v = 0; v < 2; v++){
    for(var i = 1; i <= 10; i++){
      var n = (i < 10 ? '0' : '') + i, u = 'assets/images/tr/np-tr-' + n + '.jpg';
      html += '<a href="' + u + '" target="_blank" rel="noopener"' + (v ? ' aria-hidden="true" tabindex="-1"' : '') + '>'
            + '<img src="' + u + '" alt="' + (v ? '' : 'Ejecución real ' + i) + '" decoding="async"></a>';
    }
  }
  pista.innerHTML = html;
})();
