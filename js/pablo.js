/* ============================================================
   pablo.html — script 1 de 1
   Extraído del JavaScript inline original (1 bloque(s) <script>, línea 255 del HTML original).
   Se carga en el MISMO punto del documento donde estaba: el orden respecto
   al HTML importa (los scripts sólo ven los elementos que ya existen arriba).
   ============================================================ */


/* El cielo: mismo campo de estrellas que la presentación, con semilla fija para
   que no cambie entre recargas. Se redibuja al girar el teléfono. */
(function(){
  var cv = document.getElementById('cielo'), cx = cv.getContext('2d');
  function pinta(){
    var dpr = Math.min(devicePixelRatio || 1, 2);
    var W = innerWidth, H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx.clearRect(0, 0, W, H);
    var s = 7, n = Math.round(W * H / 4200);
    function r(){ s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; }
    for(var i = 0; i < n; i++){
      var x = r()*W, y = r()*H, a = r()*.42 + .05, t = r()*1.25 + .3;
      cx.beginPath(); cx.arc(x, y, t, 0, 7);
      cx.fillStyle = 'rgba(255,255,255,' + a.toFixed(2) + ')'; cx.fill();
    }
  }
  pinta();
  var tmr; addEventListener('resize', function(){ clearTimeout(tmr); tmr = setTimeout(pinta, 160); });
})();

/* El retrato ya vive en el HTML: la foto existe y no hay nada que esperar. */
