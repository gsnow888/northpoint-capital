/* ============================================================
   index.html — script 2 de 2
   Extraído del JavaScript inline original (2 bloque(s) <script>, línea 2567 del HTML original).
   Se carga en el MISMO punto del documento donde estaba: el orden respecto
   al HTML importa (los scripts sólo ven los elementos que ya existen arriba).
   ============================================================ */


/* ── bloque <script> 1 de 2 ── */

/* Si un retrato de fundador no carga, la tarjeta NO se rompe: la figura se marca
   y el CSS pinta el hueco con su leyenda. Vale para los tres — el que se agregue
   mañana también queda cubierto sin tocar nada.
   Se revisa `complete && naturalWidth===0` además del onerror porque una imagen
   que YA falló antes de que corra este script nunca dispara el evento. */
(function(){
  document.querySelectorAll('.fund-foto img').forEach(function(img){
    function falta(){
      var f = img.closest('.fund-foto');
      if(!f) return;
      f.classList.add('sin-foto');
      f.setAttribute('data-falta', 'RETRATO PENDIENTE');
    }
    if(img.complete && img.naturalWidth === 0) falta();
    img.addEventListener('error', falta);
  });
})();


/* ── bloque <script> 2 de 2 ── */

/* ══════════════ LA CINTA DE EJECUCIONES ══════════════ (André, 2-sep-2026)
   Las diez capturas van DOS veces en la pista y la animación corre hasta
   −50%: al llegar, la segunda copia está exactamente donde arrancó la
   primera, así que el bucle no tiene costura. Se arma por script para no
   escribir veinte <img> a mano. */
(function(){
  var pista = document.getElementById('xpPista'); if(!pista) return;
  var N = 10, html = '';
  for(var v = 0; v < 2; v++){
    for(var i = 1; i <= N; i++){
      var n = (i < 10 ? '0' : '') + i;
      html += '<span class="xp-c"><img src="assets/images/tr/np-tr-' + n + '.jpg" alt="'
            + (v ? '' : 'Ejecuci\u00f3n real ' + i)
            + '" loading="lazy" decoding="async"' + (v ? ' aria-hidden="true"' : '') + '></span>';
    }
  }
  pista.innerHTML = html;
})();

/* ══════════════ LOS DOS NINJAS, DÁNDOSE ══════════════ (André, 2-sep-2026)
   Portado de kuro.html. Arriba estaba la CAPTURA de la pelea; ahora la pelea
   se dibuja, y el golpe no es decorativo: lo manda el trade de abajo. Cuando
   uno mete profit, su ninja se lanza y le pega al otro — y si el trade salió
   perdedor, el golpe se lo lleva quien lo metió. El panel deja el aviso en
   window.__kuroGolpe y esta escena lo recoge, así que las dos cosas cuentan
   siempre lo mismo.
   Todo va dentro de un IIFE: `rnd` y `ninja` son de kuro.html y no tienen por
   qué existir en el resto de esta página. */
(function(){
  var REDUCE = false;
  try{ REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
function rnd(i){ var x = Math.sin(i*127.1)*43758.5453; return x - Math.floor(x); }

/* ── el ninja: cuerpo negro, cinta de su color, katana al frente ── */
function ninja(c, x, base, s, col, aura, op){
  op = op || {};
  var cuerpo = op.cuerpo || '#141821';
  var casco  = op.casco  || '#0C0F16';
  var filo   = op.filo   || '#D6DBE2';
  var mango  = op.mango  || col;
  var ojos   = op.ojos   || 'rgba(255,255,255,.85)';
  if(aura){
    var g = c.createRadialGradient(x, base-30*s, 2*s, x, base-30*s, 66*s);
    g.addColorStop(0,'rgba(155,232,196,.30)'); g.addColorStop(1,'rgba(155,232,196,0)');
    c.fillStyle = g; c.beginPath(); c.arc(x, base-30*s, 66*s, 0, 7); c.fill();
  }
  c.save(); c.translate(x, base);
  c.lineCap = 'round';
  if(op.espalda){
    /* LA KATANA A LA ESPALDA: envainada en diagonal, de la cadera izquierda al
       hombro derecho. Va antes que el torso para quedar DETRÁS de él. */
    c.strokeStyle = filo; c.lineWidth = 2.6*s;
    c.beginPath(); c.moveTo(-7*s, -16*s); c.lineTo(11*s, -44*s); c.stroke();
    c.strokeStyle = mango; c.lineWidth = 3.6*s;
    c.beginPath(); c.moveTo(-13*s, -7*s); c.lineTo(-7.5*s, -15*s); c.stroke();
  } else {
    /* katana al frente, en guardia */
    c.strokeStyle = filo; c.lineWidth = 2.4*s;
    c.beginPath(); c.moveTo(4*s, -28*s); c.lineTo(30*s, -40*s); c.stroke();
    c.strokeStyle = mango; c.lineWidth = 3.4*s;
    c.beginPath(); c.moveTo(-8*s, -24*s); c.lineTo(3*s, -28*s); c.stroke();
  }
  /* cuerpo */
  c.fillStyle = cuerpo;
  c.fillRect(-8*s, -34*s, 16*s, 22*s);
  c.fillRect(-7*s, -13*s, 5.5*s, 13*s);
  c.fillRect(1.5*s, -13*s, 5.5*s, 13*s);
  /* cabeza y cinta */
  c.fillStyle = casco; c.fillRect(-6.5*s, -46*s, 13*s, 12*s);
  c.fillStyle = col; c.fillRect(-7.5*s, -43*s, 15*s, 4*s);
  c.beginPath(); c.moveTo(-7.5*s,-42*s); c.lineTo(-19*s,-36*s); c.lineTo(-7.5*s,-38*s); c.closePath(); c.fill();
  /* LOS OJOS (André, 31-ago-2026): eran dos rayitas del mismo gris que el
     traje. En una silueta negra, los ojos son lo ÚNICO que puede decir que
     adentro hay alguien — así que arden: su halo primero, el trazo encima. */
  if(op.mirada){
    c.save(); c.globalCompositeOperation = 'lighter';
    [-2.5, 2.5].forEach(function(dx){
      var g2 = c.createRadialGradient(dx*s, -37.7*s, 0.2*s, dx*s, -37.7*s, 7*s);
      g2.addColorStop(0, op.mirada); g2.addColorStop(.35,'rgba(190,240,255,.22)');
      g2.addColorStop(1,'rgba(150,210,255,0)');
      c.fillStyle = g2; c.beginPath(); c.arc(dx*s, -37.7*s, 7*s, 0, 7); c.fill();
    });
    c.restore();
  }
  c.fillStyle = ojos;
  c.fillRect(-4*s, -38.5*s, 3*s, 1.6*s); c.fillRect(1*s, -38.5*s, 3*s, 1.6*s);
  c.restore();
}
/* ══════════════ CARLOS Y DAVID, PELEANDO ══════════════ (André, 31-ago-2026)
   Antes ahí había una foto genérica del duelo en Asia con «SANGRE CONTRA
   SANGRE» encima: una imagen bonita de dos desconocidos. Esto son ELLOS, los
   dos de los que habla el panel de abajo — Carlos con la cinta blanca, David
   con la amarilla —, y cada tantos segundos se lanzan y cruzan los aceros. */
(function(){
  var cv = document.getElementById('duCv'); if(!cv) return;
  var c = cv.getContext('2d'), W = 0, H = 0;
  var golpe = null, ultimo = -1;
  /* las tres killzones donde se pelea de verdad */
  var ARENAS = [
    { nom:'TOKIO · ASIA',        hora:'20:00 · 6 h',
      cielo:['#1B1436','#3D2C55','#6E5A78'], suelo:['#3E3252','#231B33'],
      nube:'rgba(206,196,230,ALFA)' },
    { nom:'LONDRES',             hora:'02:00 · 6 h 30',
      cielo:['#0C1424','#1D2A44','#3B4C6E'], suelo:['#2A3450','#161E30'],
      nube:'rgba(178,194,222,ALFA)' },
    { nom:'NUEVA YORK',          hora:'09:30 · 6 h 30',
      cielo:['#070C1C','#101A34','#22304E'], suelo:['#1A2238','#0C1220'],
      nube:'rgba(150,168,206,ALFA)' }
  ];
  var BLANCO = '#EDEFF2', AMARILLO = '#E7C24A';
  function medir(){
    var D = Math.min(2, devicePixelRatio||1);
    W = cv.offsetWidth; H = cv.offsetHeight;
    if(!W || !H) return false;
    if(cv.width !== Math.round(W*D)){ cv.width = Math.round(W*D); cv.height = Math.round(H*D); }
    c.setTransform(D,0,0,D,0,0); return true;
  }
  function pinta(now){
    if(!medir()) return;
    /* la arena que toca y el corte entre una y otra */
    var CIC_A = 11000, pa = (now % (CIC_A*ARENAS.length)) / CIC_A;
    var ari = Math.floor(pa) % ARENAS.length, dentro = pa - Math.floor(pa);
    var fund = dentro > 0.94 ? (dentro-0.94)/0.06*0.9
             : dentro < 0.06 ? (1-dentro/0.06)*0.9 : 0;
    /* ── LAS TRES ARENAS, EN RUEDA ── (André, 31-ago-2026)
       Los duelos se pelean en las tres killzones —Tokio, Londres y Nueva York—
       y la escena enseñaba sólo una. Ahora van rotando, con su corte a negro
       entre una y otra, y su rótulo: quien mire treinta segundos las ve todas
       sin tener que entrar. */
    var ARENA = ARENAS[ari], sy = H*0.78;
    /* el cielo de la arena */
    var g = c.createLinearGradient(0,0,0,H);
    g.addColorStop(0,ARENA.cielo[0]); g.addColorStop(.46,ARENA.cielo[1]); g.addColorStop(1,ARENA.cielo[2]);
    c.fillStyle = g; c.fillRect(0,0,W,H);
    if(ari === 2){
      /* NUEVA YORK: no hay luna, hay ciudad — y las estrellas se las come */
      for(var es=0;es<70;es++){
        c.fillStyle = 'rgba(255,255,255,'+(0.08+rnd(es*4.1)*0.22)+')';
        c.fillRect(rnd(es*1.9)*W, rnd(es*3.7)*H*0.42, 1.2, 1.2);
      }
    } else {
      var lx = W*(ari===1?0.22:0.50), ly = H*0.26, lr = Math.min(W,H)*0.075;
      var lg = c.createRadialGradient(lx,ly,lr*0.5,lx,ly,lr*4.2);
      lg.addColorStop(0, ari===1 ? 'rgba(214,226,246,.24)' : 'rgba(255,246,214,.30)');
      lg.addColorStop(1,'rgba(255,246,214,0)');
      c.fillStyle = lg; c.beginPath(); c.arc(lx,ly,lr*4.2,0,7); c.fill();
      c.fillStyle = ari===1 ? '#E4ECFA' : '#FFF6D8';
      c.beginPath(); c.arc(lx,ly,lr,0,7); c.fill();
    }
    for(var nb=0;nb<4;nb++){
      var dx = ((now/(90000+rnd(nb*3.1)*60000)) + rnd(nb*7.7)) % 1.3 - 0.15;
      c.fillStyle = ARENA.nube.replace('ALFA', (0.16+rnd(nb)*0.12).toFixed(2));
      c.beginPath();
      for(var lb=0;lb<5;lb++)
        c.ellipse(dx*W*1.3 - W*0.15 + lb*W*0.035, H*(0.13+rnd(nb*2.2)*0.14),
                  W*0.035, H*(0.020+rnd(nb*5.5)*0.012), 0,0,7);
      c.fill();
    }
    if(ari === 0){
      /* TOKIO · montes y el árbol de sakura */
      [[H*0.62,'rgba(58,42,74,.85)',W*0.26,H*0.26],[H*0.68,'rgba(44,32,58,.95)',W*0.19,H*0.18]]
        .forEach(function(L,li){
        c.fillStyle = L[1]; c.beginPath(); c.moveTo(-30,H);
        var x=-30,i=0;
        while(x<W+30){ var w2=L[2]*(0.6+rnd(li*9+i)*0.9), h2=L[3]*(0.45+rnd(li*4+i)*1.0);
          c.lineTo(x+w2*0.5, L[0]-h2); x+=w2; i++; c.lineTo(x, L[0]-h2*0.12); }
        c.lineTo(W+30,H); c.closePath(); c.fill();
      });
      c.fillStyle = '#4A3324';
      c.fillRect(W*0.5-W*0.006, sy-H*0.20, W*0.012, H*0.20);
      c.fillStyle = 'rgba(243,185,206,.92)';
      [[0,-0.255,0.075],[-0.045,-0.235,0.055],[0.045,-0.235,0.055],[0,-0.205,0.05]]
        .forEach(function(o){ c.beginPath();
          c.ellipse(W*0.5+W*o[0], sy+H*o[1], W*o[2], H*(o[2]*1.5), 0,0,7); c.fill(); });
    } else if(ari === 1){
      /* LONDRES · el río, el puente y el Big Ben */
      c.fillStyle = 'rgba(28,36,54,.9)'; c.beginPath(); c.moveTo(-30,H);
      var xl=-30, il=0;
      while(xl<W+30){ var wl=W*0.10*(0.6+rnd(il*5.5)*1.0), hl=H*(0.06+rnd(il*2.7)*0.14);
        c.fillRect(xl, H*0.66-hl, wl*0.86, hl); xl+=wl; il++; }
      /* el Big Ben */
      var bx = W*0.72, bb = H*0.66;
      c.fillStyle = '#26304A';
      c.fillRect(bx-W*0.020, bb-H*0.40, W*0.040, H*0.40);
      c.fillStyle = '#2E3A58';
      c.beginPath(); c.moveTo(bx-W*0.026, bb-H*0.40);
      c.lineTo(bx, bb-H*0.50); c.lineTo(bx+W*0.026, bb-H*0.40); c.closePath(); c.fill();
      c.fillStyle = '#F0E3B6';
      c.beginPath(); c.arc(bx, bb-H*0.355, W*0.014, 0, 7); c.fill();
      c.strokeStyle = '#26304A'; c.lineWidth = 1.6;
      c.beginPath(); c.moveTo(bx,bb-H*0.355); c.lineTo(bx+W*0.008, bb-H*0.362); c.stroke();
      /* el río y su reflejo */
      c.fillStyle = 'rgba(38,52,84,.85)'; c.fillRect(0, H*0.66, W, sy-H*0.66);
      for(var rf=0;rf<26;rf++){
        c.fillStyle = 'rgba(196,214,246,'+(0.06+rnd(rf*3.3)*0.12)+')';
        c.fillRect(rnd(rf*7.1)*W, H*0.67+rnd(rf*2.2)*(sy-H*0.67), W*(0.02+rnd(rf)*0.05), 1.3);
      }
    } else {
      /* NUEVA YORK · el skyline con sus ventanas y el Empire */
      for(var cp=0;cp<2;cp++){
        var alt = cp ? 0.30 : 0.42, tono = cp ? '#1A2440' : '#131B33';
        var xn = -20, jn = 0;
        while(xn < W+20){
          var wn = W*(0.03+rnd((cp*31+jn)*4.4)*0.045);
          var hn = H*alt*(0.30+rnd((cp*17+jn)*2.9)*0.95);
          c.fillStyle = tono; c.fillRect(xn, sy-hn, wn*0.92, hn);
          if(!cp) for(var vn=0; vn<Math.floor(hn/(H*0.022)); vn++)
            for(var hh=0; hh<2; hh++){
              if(rnd(jn*13+vn*7+hh) < 0.45) continue;
              c.fillStyle = 'rgba(255,214,142,'+(0.30+rnd(jn+vn+hh)*0.5)+')';
              c.fillRect(xn+wn*(0.18+hh*0.42), sy-hn+H*0.012+vn*H*0.022, wn*0.20, H*0.010);
            }
          xn += wn; jn++;
        }
      }
      var ex = W*0.30, eb = sy;
      c.fillStyle = '#1E2A4A'; c.fillRect(ex-W*0.022, eb-H*0.56, W*0.044, H*0.56);
      c.fillRect(ex-W*0.032, eb-H*0.44, W*0.064, H*0.44);
      c.fillStyle = '#2A3A62';
      c.beginPath(); c.moveTo(ex-W*0.014, eb-H*0.56);
      c.lineTo(ex, eb-H*0.64); c.lineTo(ex+W*0.014, eb-H*0.56); c.closePath(); c.fill();
      c.fillStyle = 'rgba(255,220,150,.9)'; c.fillRect(ex-W*0.001, eb-H*0.665, W*0.002, H*0.026);
    }
    /* el suelo */
    var gs = c.createLinearGradient(0,sy,0,H);
    gs.addColorStop(0,ARENA.suelo[0]); gs.addColorStop(1,ARENA.suelo[1]);
    c.fillStyle = gs; c.fillRect(0,sy,W,H-sy);
    if(ari === 0){
      c.strokeStyle = 'rgba(160,150,190,.30)'; c.lineWidth = 1;
      for(var pz=0;pz<150;pz++){
        var px2 = rnd(pz*1.7)*W, ph = H*(0.03+rnd(pz*5.3)*0.05);
        c.beginPath(); c.moveTo(px2, sy+H*0.02);
        c.lineTo(px2 + Math.sin(now/2600+pz)*3, sy+H*0.02-ph); c.stroke();
      }
    } else {
      /* asfalto y adoquín: su brillo, no pasto */
      for(var br=0;br<40;br++){
        c.fillStyle = 'rgba(210,224,255,'+(0.03+rnd(br*5.9)*0.06)+')';
        c.fillRect(rnd(br*2.3)*W, sy+H*(0.02+rnd(br*8.8)*0.16), W*(0.02+rnd(br)*0.06), 1.2);
      }
    }
    /* ── EL GOLPE ── lo dispara el trade de abajo: pega el que ganó, y si el
       trade fue perdedor el golpe se lo lleva quien lo metió. */
    var G = window.__kuroGolpe;
    if(G && G.sello !== ultimo){ ultimo = G.sello; golpe = { atk:G.atk, ini:now }; }
    var s2 = Math.min(W,H)/210;
    var xC = W*0.30, xD = W*0.70, emb = 0, choque = false, corte = 0, retro = 0, atk = null;
    if(golpe){
      var u = (now - golpe.ini)/1150;
      if(u >= 1){ golpe = null; }
      else {
        atk = golpe.atk;
        /* 0-.34 se lanza · .34-.52 corta · .52-.72 el otro encaja · .72-1 vuelven */
        emb   = u < 0.34 ? u/0.34 : u < 0.62 ? 1 : 1 - (u-0.62)/0.38;
        choque = u >= 0.32 && u < 0.52;
        corte  = choque ? (u-0.32)/0.20 : 0;
        retro  = u >= 0.44 && u < 0.80 ? Math.sin((u-0.44)/0.36*Math.PI) : 0;
        var av = emb*W*0.135, re = retro*W*0.055;
        if(atk === 'C'){ xC = W*0.30 + av; xD = W*0.70 + re; }
        else           { xD = W*0.70 - av; xC = W*0.30 - re; }
      }
    }
    /* sombras */
    [[xC],[xD]].forEach(function(o){
      c.fillStyle = 'rgba(20,14,32,.45)';
      c.beginPath(); c.ellipse(o[0], sy+3*s2, 17*s2, 3.4*s2, 0,0,7); c.fill();
    });
    /* el que encaja se ladea; el que pega va derecho */
    var incC = (atk === 'D' ? retro*0.28 : 0), incD = (atk === 'C' ? retro*0.28 : 0);
    c.save(); c.translate(xC, sy); c.rotate(incC); c.translate(-xC, -sy);
    ninja(c, xC, sy, s2, BLANCO, false,
      { filo:'#F2F7FF', mango:BLANCO, cuerpo:'#141821' });
    c.restore();
    c.save(); c.translate(xD*2, 0); c.scale(-1,1);
    c.translate(xD, sy); c.rotate(-incD); c.translate(-xD, -sy);
    ninja(c, xD, sy, s2, AMARILLO, false,
      { filo:'#F2F7FF', mango:AMARILLO, cuerpo:'#141821' });
    c.restore();
    /* el destello del cruce */
    if(choque){
      /* el destello nace donde ESTÁ el que encaja, no en medio */
      var mx2 = atk === 'C' ? xD - 16*s2 : xC + 16*s2;
      var my2 = sy - 30*s2, f = Math.sin(corte*Math.PI);
      c.save(); c.globalCompositeOperation = 'lighter';
      var fg = c.createRadialGradient(mx2,my2,1,mx2,my2,34*s2);
      fg.addColorStop(0,'rgba(255,250,230,'+(0.85*f)+')');
      fg.addColorStop(1,'rgba(255,240,190,0)');
      c.fillStyle = fg; c.beginPath(); c.arc(mx2,my2,34*s2,0,7); c.fill();
      c.strokeStyle = 'rgba(255,252,240,'+(0.75*f)+')'; c.lineWidth = 1.6*s2;
      for(var ch=0; ch<5; ch++){
        var an = ch/5*6.283 + corte*2;
        c.beginPath(); c.moveTo(mx2, my2);
        c.lineTo(mx2+Math.cos(an)*30*s2*f, my2+Math.sin(an)*30*s2*f); c.stroke();
      }
      c.restore();
    }
    /* sus nombres */
    c.font = '600 ' + Math.max(9, Math.round(Math.min(W,H)*0.030)) + 'px "IBM Plex Mono", monospace';
    c.textAlign = 'center';
    c.fillStyle = BLANCO;   c.fillText('CARLOS', xC, sy + H*0.115);
    c.fillStyle = AMARILLO; c.fillText('DAVID',  xD, sy + H*0.115);
    /* el clima de cada arena */
    if(ari === 0){
      for(var pe=0; pe<26; pe++){
        var uu = ((now/(11000+rnd(pe*4.4)*9000)) + rnd(pe*8.1)) % 1;
        c.save(); c.globalAlpha = 0.35 + rnd(pe*2.9)*0.4;
        c.translate(((rnd(pe*1.3)*W) + Math.sin(now/2400+pe)*26) % W, uu*H*1.1 - H*0.05);
        c.rotate(now/900 + pe); c.fillStyle = '#F3B9CE';
        c.beginPath(); c.ellipse(0,0,3.4,2.0,0,0,7); c.fill(); c.restore();
      }
    } else if(ari === 1){
      /* Londres: llovizna fina y niebla baja */
      c.strokeStyle = 'rgba(196,214,246,.20)'; c.lineWidth = 1;
      for(var ll=0; ll<70; ll++){
        var uy = ((now*0.5*(0.4+rnd(ll*3.3)) + rnd(ll*1.7)*H*2) % (H*1.2)) - H*0.1;
        var ux = (rnd(ll*5.5)*W + uy*0.16) % W;
        c.beginPath(); c.moveTo(ux, uy); c.lineTo(ux-2, uy+9); c.stroke();
      }
      var nbl = c.createLinearGradient(0, H*0.58, 0, H*0.82);
      nbl.addColorStop(0,'rgba(176,192,220,0)'); nbl.addColorStop(1,'rgba(176,192,220,.20)');
      c.fillStyle = nbl; c.fillRect(0, H*0.58, W, H*0.26);
    } else {
      /* Nueva York: el vapor de las rejillas */
      for(var vp=0; vp<5; vp++){
        var uv = ((now/(7000+rnd(vp*4.7)*5000)) + rnd(vp*9.3)) % 1;
        c.fillStyle = 'rgba(206,220,246,'+(0.10*(1-uv))+')';
        c.beginPath();
        c.ellipse(W*(0.12+rnd(vp*2.1)*0.76), sy+H*0.04-uv*H*0.22,
                  W*(0.02+uv*0.05), H*(0.012+uv*0.035), 0,0,7);
        c.fill();
      }
    }
    /* el rótulo de la arena */
    c.save();
    c.globalAlpha = 0.72;
    c.font = '600 ' + Math.max(9, Math.round(Math.min(W,H)*0.028)) + 'px "IBM Plex Mono", monospace';
    c.textAlign = 'left'; c.fillStyle = 'rgba(255,255,255,.9)';
    c.fillText(ARENA.nom, W*0.035, H*0.11);
    c.globalAlpha = 0.42;
    c.font = '600 ' + Math.max(8, Math.round(Math.min(W,H)*0.022)) + 'px "IBM Plex Mono", monospace';
    c.fillText(ARENA.hora, W*0.035, H*0.165);
    c.restore();
    /* el corte a negro entre arena y arena */
    if(fund > 0){ c.fillStyle = 'rgba(6,8,16,'+fund+')'; c.fillRect(0,0,W,H); }
  }
  /* ── SUAVE, NO A TIRONES ── (André, 31-ago-2026)
     Iba con setInterval a 90 ms: once cuadros por segundo, y el choque se veía
     TRABADO. Una animación de movimiento pide requestAnimationFrame. Pero hay
     contextos donde rAF no corre nunca y la escena se quedaría congelada, así
     que si no llega ni un cuadro en medio segundo, cae solo a un intervalo. */
  /* EL RESPALDO CUENTA CUADROS, NO UNO SOLO (André, 2-sep-2026): decía
     `if(!vino)`, y hay contextos donde requestAnimationFrame entrega UN cuadro
     y nunca más. Ese único cuadro marcaba `vino = true`, el respaldo no
     arrancaba y la pelea se quedaba clavada: los dos ninjas en guardia y
     ningún golpe, aunque abajo los trades siguieran cayendo. Medio segundo de
     animación real trae ~30 cuadros; con menos de tres, esto no está
     corriendo y entra el intervalo. */
  /* FUERA DE CUADRO NO SE PINTA (André, 2-sep-2026): en kuro.html esta escena
     era la página entera; aquí vive dentro de un documento largo, y sin esta
     puerta seguiría dibujando treinta veces por segundo mientras alguien lee
     los planes. Se mide con un rect, igual que el panel de abajo. */
  var zona6 = cv.closest ? (cv.closest('section') || cv) : cv;
  function enCuadro6(){
    var r = zona6.getBoundingClientRect(), h = window.innerHeight || 800;
    return r.bottom > 0 && r.top < h;
  }
  var t = 0, cuadros = 0;
  function loop6(ts){ cuadros++; t = ts || 0; if(enCuadro6()) pinta(t); requestAnimationFrame(loop6); }
  pinta(0);
  if(!REDUCE){
    requestAnimationFrame(loop6);
    setTimeout(function(){
      if(cuadros < 3) setInterval(function(){ t += 33; if(enCuadro6()) pinta(t); }, 33);
    }, 500);
  }
  addEventListener('resize', function(){ pinta(t); }, {passive:true});
})();
})();

/* ══════════════ LA PELEA EN VIVO ══════════════ (André, 31-ago-2026)
   Contar que dos amigos se retan no es lo mismo que ENSEÑARLO. Aquí corre una
   pelea de verdad, en bucle: Carlos y David meten sus trades uno por uno, la
   tabla se reordena cuando uno pasa al otro, las curvas crecen con cada golpe
   y el registro va cayendo abajo. Es la misma pantalla de la terminal, con los
   mismos elementos, hecha para verse sin entrar.
   Los trades están escritos a mano —no son aleatorios— para que la pelea tenga
   forma: David va arriba media pelea y Carlos lo pasa al final. Una secuencia
   al azar casi siempre cuenta una historia aburrida. */
(function(){
  var host = document.getElementById('pelea'); if(!host) return;
  /* REDUCE era global en kuro.html; aquí el módulo se lo calcula solo */
  var REDUCE = false;
  try{ REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
  var elTabla = document.getElementById('plTabla'), elLog = document.getElementById('plLog'),
      elReloj = document.getElementById('plReloj'), cv = document.getElementById('plCv');
  var c = cv.getContext('2d');
  var GUION = [
    {q:'C', h:'20:14', d:'L', p: 420},
    {q:'D', h:'20:31', d:'S', p: 680},
    {q:'C', h:'21:02', d:'S', p:-260},
    {q:'D', h:'21:40', d:'L', p: 510},
    {q:'C', h:'22:18', d:'L', p: 940},
    {q:'D', h:'22:55', d:'S', p:-380},
    {q:'C', h:'23:30', d:'L', p: 620},
    {q:'D', h:'00:12', d:'L', p: 240},
    {q:'C', h:'00:48', d:'S', p: 780}
  ];
  var J = { C:{ nom:'CARLOS', col:'#57C79B' }, D:{ nom:'DAVID', col:'#8FA6C4' } };
  var n = 0, t0 = 0, PASO = 1900, PAUSA = 3400;

  function fmt(v){ return (v<0?'−$':'+$') + Math.abs(v).toLocaleString('en-US'); }
  function acum(q, hasta){
    var a = [0], s2 = 0;
    for(var i=0;i<hasta;i++) if(GUION[i].q === q){ s2 += GUION[i].p; a.push(s2); }
    return a;
  }
  /* ══ EL PARPADEO ══ (André, 31-ago-2026)
     El registro se rehacía COMPLETO en cada tic: los cuatro renglones se
     borraban y volvían a nacer, y como .pl-linea trae `animation:plCae`, los
     cuatro corrían el fundido a la vez cada 1.9 segundos. Eso era el parpadeo
     —y también pasaba al redimensionar la ventana, porque pinta() corre ahí—.
     Ahora sólo ENTRA el renglón nuevo, que es el único que tiene por qué
     animarse, y el más viejo se va por abajo. Los otros tres ni se enteran. */
  var filaDe = {};
  ['C','D'].forEach(function(k){
    var d = document.createElement('div');
    d.className = 'pl-fila';
    d.innerHTML = '<span class="pl-pos"></span>' +
      '<span class="pl-nom">' + J[k].nom + '<em></em></span>' +
      '<span class="pl-barra"><i></i></span>' +
      '<span class="pl-pnl"></span>';
    filaDe[k] = d; elTabla.appendChild(d);
  });
  var puestas = 0;
  function registro(){
    if(n < puestas){ elLog.innerHTML = ''; puestas = 0; }   /* la pelea reinició */
    while(puestas < n){
      var g = GUION[puestas], d = document.createElement('div');
      d.className = 'pl-linea';
      d.innerHTML = '<b>' + J[g.q].nom + '</b>' +
        '<span class="pl-dir ' + g.d + '">' + (g.d==='L'?'LONG':'SHORT') + '</span>' +
        '<span>' + g.h + '</span>' +
        '<span class="m ' + (g.p>=0?'up':'down') + '">' + fmt(g.p) + '</span>';
      elLog.appendChild(d);   /* column-reverse: entra arriba */
      puestas++;
      while(elLog.children.length > 4) elLog.removeChild(elLog.firstChild);
    }
  }
  function pinta(){
    var C = acum('C', n), D = acum('D', n);
    var pc = C[C.length-1], pd = D[D.length-1];
    /* la tabla, reordenada por quien va arriba */
    var filas = [{k:'C',p:pc},{k:'D',p:pd}].sort(function(a,b){ return b.p - a.p; });
    var tope = Math.max(1, Math.abs(pc), Math.abs(pd));
    /* SE ACTUALIZA, NO SE REHACE (André, 31-ago-2026): antes esto reemplazaba
       el innerHTML entero en cada tic. Como el tic cae cada 1.9 s, los nodos
       morían y volvían a nacer, y con ellos se perdían las dos transiciones que
       esta tabla tiene escritas —la de .pl-fila y la de la barra—: la barra
       SALTABA a su ancho en vez de correr. Ahora las filas viven y sólo cambian
       de valor; el reordenamiento va por `order`, que en un grid también manda. */
    filas.forEach(function(f, i){
      var d = filaDe[f.k], lider = (i===0 && f.p>0);
      d.style.order = i;
      d.classList.toggle('lider', lider);
      d.querySelector('.pl-pos').innerHTML = lider ? '&#9819;' : (i+1);
      d.querySelector('.pl-nom em').textContent =
        GUION.slice(0,n).filter(function(g){ return g.q===f.k; }).length + ' trades';
      d.querySelector('.pl-barra i').style.width = Math.max(0, f.p/tope*100) + '%';
      var pnl = d.querySelector('.pl-pnl');
      pnl.textContent = fmt(f.p);
      pnl.className = 'pl-pnl ' + (f.p>=0 ? 'up' : 'down');
    });
    /* las curvas */
    var D2 = Math.min(2, devicePixelRatio||1), W = cv.offsetWidth, H = cv.offsetHeight;
    if(!W || !H) return;
    if(cv.width !== W*D2){ cv.width = W*D2; cv.height = H*D2; }
    c.setTransform(D2,0,0,D2,0,0); c.clearRect(0,0,W,H);
    var todos = C.concat(D), lo = Math.min(0, Math.min.apply(null, todos)),
        hi = Math.max(600, Math.max.apply(null, todos));
    var pad = (hi-lo)*0.18 || 200, min = lo-pad, max = hi+pad, span = (max-min)||1;
    var pasos = GUION.length;
    var X = function(i){ return 14 + i*(W-28)/pasos; };
    var Y = function(v){ return 14 + (H-28)*(1-(v-min)/span); };
    c.strokeStyle = 'rgba(237,239,242,.10)'; c.lineWidth = 1; c.setLineDash([3,4]);
    c.beginPath(); c.moveTo(0, Y(0)); c.lineTo(W, Y(0)); c.stroke(); c.setLineDash([]);
    [['C',C],['D',D]].forEach(function(par){
      var col = J[par[0]].col, a = par[1];
      c.strokeStyle = col; c.lineWidth = 2.2; c.lineJoin='round'; c.lineCap='round';
      c.globalAlpha = par[0]==='C' ? 1 : .68;
      c.beginPath();
      a.forEach(function(v, i){ if(i===0) c.moveTo(X(0), Y(v)); else c.lineTo(X(i), Y(v)); });
      c.stroke();
      if(a.length > 1){
        c.fillStyle = col;
        c.beginPath(); c.arc(X(a.length-1), Y(a[a.length-1]), 3.2, 0, 7); c.fill();
        c.font = '600 9px "IBM Plex Mono", monospace'; c.textAlign='left';
        c.fillText(J[par[0]].nom, X(a.length-1)+7, Y(a[a.length-1])+3);
      }
      c.globalAlpha = 1;
    });
    registro();
  }
  function reloj(){
    /* la cuenta regresiva de la sesión, sólo para que se sienta viva */
    var seg = Math.max(0, 6*3600 - n*PASO/1000*760);
    var h = Math.floor(seg/3600), m = Math.floor(seg%3600/60), s2 = Math.floor(seg%60);
    var dd = function(v){ return ('0'+v).slice(-2); };
    elReloj.textContent = dd(h)+':'+dd(m)+':'+dd(s2);
  }
  /* UN TEMPORIZADOR, NO requestAnimationFrame (André, 31-ago-2026):
     la pelea avanza UN trade cada 1.9 s, no sesenta veces por segundo — pedirle
     un cuadro al navegador para mirar el reloj es la herramienta equivocada, y
     además hay contextos donde rAF sencillamente no corre y la pelea se queda
     congelada en el minuto cero, pareciendo rota. Un intervalo no depende de
     que nadie pinte.
     Y SE MIDE, NO SE OBSERVA: con IntersectionObserver solo pasaba lo mismo, así
     que la visibilidad se calcula con un rect, que cuesta nada. */
  var zona = host.closest ? (host.closest('section') || host) : host;
  function enCuadro(){
    /* la sección entera, no sólo el panel: la escena de la pelea está ARRIBA
       de él, y mirándola el panel puede quedar fuera de cuadro — el reloj se
       pararía justo cuando el visitante está mirando */
    var r = zona.getBoundingClientRect(), h = window.innerHeight || 800;
    return r.bottom > 0 && r.top < h;
  }
  var espera = 0;
  function tic(){
    if(!enCuadro()) return;              /* fuera de cuadro no gasta nada */
    if(n >= GUION.length){
      espera++;
      if(espera * PASO >= PAUSA){ n = 0; espera = 0; pinta(); reloj(); }
      return;
    }
    n++; pinta(); reloj();
    /* EL GOLPE LO MANDA EL TRADE (André, 31-ago-2026): antes los dos se
       lanzaban cada cinco segundos por su cuenta, sin relación con lo que
       pasaba abajo. Ahora pega el que GANÓ; si el trade fue perdedor, el golpe
       se lo lleva quien lo metió. Una pelea que no responde a los números es
       un adorno; ésta cuenta lo mismo que la tabla. */
    var g = GUION[n-1];
    if(g) window.__kuroGolpe = { atk: g.p > 0 ? g.q : (g.q === 'C' ? 'D' : 'C'),
                                 sello: n };
  }
  pinta(); reloj();
  if(REDUCE){ n = GUION.length; pinta(); reloj(); }
  else setInterval(tic, PASO);
  addEventListener('resize', pinta, {passive:true});
})();
