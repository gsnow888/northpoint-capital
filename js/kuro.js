/* ============================================================
   kuro.html — script 1 de 1
   Extraído del JavaScript inline original (1 bloque(s) <script>, línea 561 del HTML original).
   Se carga en el MISMO punto del documento donde estaba: el orden respecto
   al HTML importa (los scripts sólo ven los elementos que ya existen arriba).
   ============================================================ */


/* ══════════════ LOS NUEVE ══════════════ */
var ACEROS = [
  {k:'白', n:'SHIRO',    c:'#EDEFF2', cin:'blanca',   don:'Paciencia del aprendiz',
   tit:'El primer objetivo',      tp:'$1,000',  dd:'$1,000', tr:'2', rg:'$500', se:'1 sesión'},
  {k:'黄', n:'KIIRO',    c:'#E7C24A', cin:'amarilla', don:'Ojo para la liquidez',
   tit:'El doble',                tp:'$2,000',  dd:'$1,000', tr:'2', rg:'$500', se:'1 sesión'},
  {k:'橙', n:'DAIDAI',   c:'#E0863C', cin:'naranja',  don:'Ruptura del rango',
   tit:'Pasar la cuenta',         tp:'$3,000',  dd:'$2,000', tr:'2', rg:'$500', se:'1 sesión'},
  {k:'緑', n:'MIDORI',   c:'#4FAE6A', cin:'verde',    don:'Gestión del riesgo',
   tit:'La cuenta y el colchón',  tp:'$5,100',  dd:'$2,000', tr:'2', rg:'$500', se:'5 sesiones'},
  {k:'青', n:'AO',       c:'#3E82C8', cin:'azul',     don:'Sangre fría',
   tit:'El primer pago',          tp:'$6,100',  dd:'$2,000', tr:'2', rg:'$500', se:'5 sesiones'},
  {k:'紫', n:'MURASAKI', c:'#8A5CC8', cin:'morada',   don:'Disciplina inquebrantable',
   tit:'Con menos riesgo',        tp:'$6,100',  dd:'$1,500', tr:'1', rg:'$250', se:'8 sesiones'},
  {k:'茶', n:'CHA',      c:'#7A5230', t:'#A98860', cin:'marrón', don:'Constancia',
   tit:'Dos pagos',               tp:'$12,200', dd:'$1,500', tr:'2', rg:'$250', se:'12 sesiones'},
  {k:'赤', n:'AKA',      c:'#C8443C', cin:'roja',     don:'Instinto del cazador',
   tit:'Tres pagos, a tiempo',    tp:'$18,300', dd:'$1,500', tr:'2', rg:'$250', se:'15 sesiones'},
  {k:'黒', n:'KURO',     c:'#23272E', t:'#9AA3B0', cin:'negra', don:'Maestría total',
   tit:'El maestro',              tp:'$25,000', dd:'$1,500', tr:'2', rg:'$250', se:'5 sesiones'}
];
var REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
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
/* ── LA KATANA, para las fichas ──
   Lienzo ancho y bajo: la hoja cruza casi todo y la empuñadura de su color
   remata a la derecha, con la guarda entre las dos. */
function katana(c, W, H, col){
  var y = H*0.56, pta = W*0.03, tsu = W*0.72, fin = W*0.97;
  var gr = Math.max(1.6, H*0.16);
  c.lineCap = 'round';
  /* la hoja, con su curvatura */
  c.strokeStyle = 'rgba(232,238,246,.92)'; c.lineWidth = gr;
  c.beginPath(); c.moveTo(pta, y + H*0.16);
  c.quadraticCurveTo(W*0.38, y - H*0.20, tsu, y - H*0.02); c.stroke();
  /* el filo: una línea más clara pegada al lomo */
  c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = Math.max(0.7, gr*0.24);
  c.beginPath(); c.moveTo(pta + W*0.01, y + H*0.10);
  c.quadraticCurveTo(W*0.38, y - H*0.26, tsu, y - H*0.08); c.stroke();
  /* la guarda */
  c.strokeStyle = col; c.lineWidth = gr*2.1;
  c.beginPath(); c.moveTo(tsu, y - H*0.02); c.lineTo(tsu + W*0.012, y - H*0.02); c.stroke();
  /* la empuñadura */
  c.strokeStyle = col; c.lineWidth = gr*1.25;
  c.beginPath(); c.moveTo(tsu + W*0.02, y - H*0.01); c.lineTo(fin, y + H*0.05); c.stroke();
}

/* ══════════════ EL HÉROE: LA MONTAÑA Y SU CIELO ══════════════
   Como la landing de PARFECT enseña un CLUB con su cielo —fairways, lago,
   banderas, palmeras—, aquí se enseña la MONTAÑA con el suyo: cielo de noche
   azul con luna y nubes cruzando, cordilleras nevadas que se pierden en la
   bruma, el mar de nubes a media ladera, bosque de pinos en la falda y el
   torii en el sendero. Un ENTORNO, no una silueta.
   Y la altura es el tema: los flancos se abren hacia el pie y se cierran hacia
   la cumbre, y el pico atraviesa las nubes. Eso es lo que dice «esto está
   altísimo» sin escribirlo. */
(function(){
  var cv = document.getElementById('heroCv'), c = cv.getContext('2d');
  var W = 0, H = 0, DPR = 1, prog = 0, mx = 0, my = 0;
  function medir(){
    DPR = Math.min(2, window.devicePixelRatio || 1);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = Math.round(W*DPR); cv.height = Math.round(H*DPR);
    c.setTransform(DPR,0,0,DPR,0,0);
  }
  /* CURVA QUE PASA POR TODOS LOS PUNTOS (Catmull-Rom → bézier).
     Con quadraticCurveTo cada punto era un CONTROL, no un punto de paso: la
     ladera se quedaba corta y la CUMBRE terminaba cien píxeles debajo de donde
     estaba parado Kuro. Se veía flotando en el aire. */
  function suave(pts){
    c.moveTo(pts[0][0], pts[0][1]);
    for(var i=0;i<pts.length-1;i++){
      var p0 = pts[i-1] || pts[i], p1 = pts[i], p2 = pts[i+1], p3 = pts[i+2] || p2;
      c.bezierCurveTo(p1[0] + (p2[0]-p0[0])/6, p1[1] + (p2[1]-p0[1])/6,
                      p2[0] - (p3[0]-p1[0])/6, p2[1] - (p3[1]-p1[1])/6,
                      p2[0], p2[1]);
    }
  }
  function masa(pts, col){
    c.fillStyle = col; c.beginPath(); suave(pts);
    c.lineTo(W*2, H+200); c.lineTo(-W, H+200); c.closePath(); c.fill();
  }
  /* una cordillera nevada, en curvas */
  function sierra(sem, yB, alto, ancho, roca, nieve){
    var pts = [[-80, yB]], cum = [], x = -80, i = 0;
    while(x < W+80){
      var w = ancho*(0.55 + rnd(sem*7.3+i)*1.2);
      var h = alto*(0.30 + rnd(sem*2.9+i)*1.05);
      cum.push([x + w*0.5, yB - h, h]);
      pts.push([x + w*0.5, yB - h]);
      pts.push([x + w, yB - alto*0.05]);
      x += w; i++;
    }
    masa(pts, roca);
    if(!nieve) return;
    for(var k=0;k<cum.length;k++){
      var q = cum[k]; if(q[2] < alto*0.5) continue;
      var a = q[2]*0.32, d = q[2]*0.30;
      c.fillStyle = nieve; c.beginPath();
      c.moveTo(q[0]-a, q[1]+d); c.lineTo(q[0], q[1]);
      c.lineTo(q[0]+a, q[1]+d); c.lineTo(q[0]+a*0.34, q[1]+d*0.60);
      c.lineTo(q[0], q[1]+d*0.92); c.lineTo(q[0]-a*0.42, q[1]+d*0.56);
      c.closePath(); c.fill();
    }
  }
  /* un pino: tres pisos y su nieve encima */
  function pino(x, base, s, col, nieve){
    c.fillStyle = '#0A0F1C';
    c.fillRect(x - 1.1*s, base - 5*s, 2.2*s, 5*s);
    c.fillStyle = col;
    var piso = function(cy, w, h){ c.beginPath(); c.moveTo(x, cy-h);
      c.lineTo(x + w, cy); c.lineTo(x - w, cy); c.closePath(); c.fill(); };
    piso(base - 4*s, 7.5*s, 11*s); piso(base - 11*s, 6*s, 10*s); piso(base - 17*s, 4.4*s, 9*s);
    if(nieve){
      c.fillStyle = nieve;
      c.beginPath(); c.moveTo(x, base - 26*s); c.lineTo(x + 2.6*s, base - 20*s);
      c.lineTo(x - 2.6*s, base - 20*s); c.closePath(); c.fill();
    }
  }
  /* UNA CASA: tejado a dos aguas, cuerpo oscuro y su ventana encendida.
     La ventana es el punto: una lucecita cálida a lo lejos es lo que le pone
     ESCALA a la montaña — sin ella no sabes si mide cien metros o cuatro mil. */
  function casa(x, base, s, luz, tipo){
    c.fillStyle = 'rgba(4,8,18,.45)';
    c.beginPath(); c.ellipse(x, base + 0.8*s, 7.4*s, 1.7*s, 0, 0, 7); c.fill();
    c.fillStyle = '#131E31';
    c.fillRect(x - 4.6*s, base - 6*s, 9.2*s, 6*s);
    c.fillStyle = '#0B1322';
    if(tipo > 0.62){
      /* tejado japonés: los aleros se curvan hacia arriba */
      c.beginPath(); c.moveTo(x - 7.4*s, base - 5.4*s);
      c.quadraticCurveTo(x, base - 12.4*s, x + 7.4*s, base - 5.4*s);
      c.lineTo(x + 5.6*s, base - 6.6*s); c.lineTo(x - 5.6*s, base - 6.6*s);
      c.closePath(); c.fill();
    } else {
      c.beginPath(); c.moveTo(x - 6.4*s, base - 5.6*s); c.lineTo(x, base - 11*s);
      c.lineTo(x + 6.4*s, base - 5.6*s); c.closePath(); c.fill();
    }
    if(luz){
      var h = c.createRadialGradient(x, base - 3.4*s, 0.4*s, x, base - 3.4*s, 10*s);
      h.addColorStop(0,'rgba(255,196,108,.44)'); h.addColorStop(1,'rgba(255,180,90,0)');
      c.fillStyle = h; c.beginPath(); c.arc(x, base - 3.4*s, 10*s, 0, 7); c.fill();
      /* la ventana partida en cuatro: a lo lejos es un punto, de cerca una casa */
      c.fillStyle = '#FFC46C';
      c.fillRect(x - 2.0*s, base - 4.6*s, 1.6*s, 1.5*s);
      c.fillRect(x + 0.4*s, base - 4.6*s, 1.6*s, 1.5*s);
      c.fillRect(x - 2.0*s, base - 2.8*s, 1.6*s, 1.3*s);
      c.fillRect(x + 0.4*s, base - 2.8*s, 1.6*s, 1.3*s);
      if(tipo > 0.5){ c.fillStyle = 'rgba(255,180,96,.75)';
        c.fillRect(x + 3.0*s, base - 3.4*s, 1.2*s, 3.4*s); }   /* la puerta */
    }
  }
  /* UN PUEBLO: unas casas juntas y el resplandor tibio que las delata desde
     lejos, cuando ya no se distingue una de otra. */
  function pueblo(x, base, s, n, sem, now){
    var g = c.createRadialGradient(x, base - 5*s, 1, x, base - 5*s, 42*s);
    g.addColorStop(0,'rgba(255,186,104,.22)'); g.addColorStop(.5,'rgba(255,176,92,.07)');
    g.addColorStop(1,'rgba(255,170,80,0)');
    c.fillStyle = g; c.beginPath(); c.arc(x, base - 5*s, 42*s, 0, 7); c.fill();
    /* las casas se ordenan por profundidad: las de atrás primero y más chicas */
    var casas = [];
    for(var i=0;i<n;i++){
      var prof = rnd(sem*7.7+i);
      casas.push({ x: x + (rnd(sem*3.1+i)-0.5)*34*s,
                   y: base + (prof-0.5)*5.2*s,
                   s: s*(0.62 + prof*0.72),
                   luz: rnd(sem*9.9+i) > 0.20,
                   tipo: rnd(sem*4.1+i) });
    }
    casas.sort(function(a,b){ return a.y - b.y; });
    /* la pagoda del pueblo, detrás de todo */
    if(n >= 7) pagoda(x + (rnd(sem)-0.5)*22*s, base - 2*s, s*0.9, '#0B1322');
    casas.forEach(function(k){ casa(k.x, k.y, k.s, k.luz, k.tipo); });
    /* dos chimeneas humeando: es lo que lo vuelve un pueblo vivo */
    if(now != null && n >= 6){
      humo(casas[0].x + 2*s, casas[0].y - 9*s, s*0.9, now, sem);
      humo(casas[casas.length-1].x - 2*s, casas[casas.length-1].y - 10*s, s*0.8, now, sem+7);
    }
  }
  /* un farol de piedra del sendero */
  function farol(x, base, s){
    c.fillStyle = '#1A2740';
    c.fillRect(x - 1*s, base - 7*s, 2*s, 7*s);
    c.fillRect(x - 3*s, base - 10.5*s, 6*s, 3.4*s);
    c.beginPath(); c.moveTo(x - 3.8*s, base - 10.5*s); c.lineTo(x, base - 13*s);
    c.lineTo(x + 3.8*s, base - 10.5*s); c.closePath(); c.fill();
    var g = c.createRadialGradient(x, base - 8.8*s, 0.3*s, x, base - 8.8*s, 11*s);
    g.addColorStop(0,'rgba(255,196,108,.36)'); g.addColorStop(1,'rgba(255,180,90,0)');
    c.fillStyle = g; c.beginPath(); c.arc(x, base - 8.8*s, 11*s, 0, 7); c.fill();
    c.fillStyle = '#FFCE84'; c.fillRect(x - 1.1*s, base - 9.8*s, 2.2*s, 2.4*s);
  }
  /* UNA PAGODA en la cresta de un pueblo: tres aleros y su aguja */
  function pagoda(x, base, s, col){
    c.fillStyle = col;
    var piso = function(cy, w, h){
      c.fillRect(x - w*0.34, cy - h, w*0.68, h);
      c.beginPath(); c.moveTo(x - w, cy - h + 1);
      c.quadraticCurveTo(x, cy - h - h*0.85, x + w, cy - h + 1);
      c.lineTo(x + w*0.66, cy - h - 1); c.lineTo(x - w*0.66, cy - h - 1);
      c.closePath(); c.fill();
    };
    piso(base, 9*s, 5*s); piso(base - 5.6*s, 7*s, 4.6*s); piso(base - 10.6*s, 5*s, 4.2*s);
    c.fillRect(x - 0.5*s, base - 18*s, 1*s, 3.6*s);
  }
  /* EL HUMO de una chimenea: lo que hace que un pueblo se vea habitado y no
     dibujado. Sube, se ensancha y se apaga. */
  function humo(x, base, s, now, sem){
    for(var i=0;i<5;i++){
      var u = ((now/(9000 + rnd(sem+i)*5000)) + i/5) % 1;
      var a = 0.16 * (1-u) * (1-u);
      if(a < 0.006) continue;
      c.fillStyle = 'rgba(196,210,236,'+a+')';
      c.beginPath();
      c.ellipse(x + Math.sin(u*4 + sem)*4.6*s, base - u*30*s,
                (1.6 + u*4.2)*s, (1.2 + u*3.0)*s, 0, 0, 7);
      c.fill();
    }
  }
  /* el torii del sendero */
  function torii(x, base, s){
    c.fillStyle = '#8E2E28';
    c.fillRect(x - 9*s, base - 20*s, 2.4*s, 20*s);
    c.fillRect(x + 6.6*s, base - 20*s, 2.4*s, 20*s);
    c.beginPath(); c.moveTo(x - 14*s, base - 20*s);
    c.quadraticCurveTo(x, base - 24.5*s, x + 14*s, base - 20*s);
    c.lineTo(x + 13*s, base - 18.2*s); c.lineTo(x - 13*s, base - 18.2*s); c.closePath(); c.fill();
    c.fillRect(x - 10*s, base - 15*s, 20*s, 1.8*s);
    c.fillStyle = 'rgba(6,10,20,.5)';
    c.beginPath(); c.ellipse(x, base + 1*s, 12*s, 2.2*s, 0, 0, 7); c.fill();
  }
  /* una nube alargada, con su vientre en sombra */
  function nube(x, y, w, h, a){
    c.fillStyle = 'rgba(196,214,244,'+a+')';
    c.beginPath();
    for(var i=0;i<7;i++){
      var t = i/6, lx = x - w/2 + t*w;
      var lh = h*(0.4 + Math.sin(t*Math.PI)*0.9);
      c.ellipse(lx, y - lh*0.16, w*0.19, lh, 0, 0, 7);
    }
    c.fill();
    c.fillStyle = 'rgba(46,72,118,'+(a*0.55)+')';
    c.beginPath(); c.ellipse(x, y + h*0.36, w*0.48, h*0.32, 0, 0, 7); c.fill();
  }

  function pinta(now){
    if(!W) medir();
    var p = prog;

    /* ── EL CIELO ── de noche, pero AZUL: un cielo, no un vacío ── */
    var g = c.createLinearGradient(0,0,0,H);
    g.addColorStop(0,'#070F28'); g.addColorStop(.30,'#122048');
    g.addColorStop(.58,'#223C70'); g.addColorStop(.80,'#3A5E96'); g.addColorStop(1,'#547CB4');
    c.fillStyle = g; c.fillRect(0,0,W,H);
    for(var st=0;st<210;st++){
      var sx = rnd(st*1.3)*W + mx*5, sy2 = rnd(st*2.7)*H*0.58 - p*30;
      var tw = 0.35 + 0.65*Math.abs(Math.sin(now/1500 + st));
      c.fillStyle = 'rgba(255,255,255,'+(0.10 + rnd(st*5.1)*0.6*tw)+')';
      c.fillRect(sx, sy2, 1.3, 1.3);
    }
    /* la luna, con su halo */
    var lx = W*0.79 + mx*6, ly = H*0.155 - p*24, lr = Math.min(W,H)*0.045;
    var lg = c.createRadialGradient(lx,ly,lr*0.4,lx,ly,lr*7);
    lg.addColorStop(0,'rgba(226,238,255,.30)'); lg.addColorStop(1,'rgba(226,238,255,0)');
    c.fillStyle = lg; c.beginPath(); c.arc(lx,ly,lr*7,0,7); c.fill();
    c.fillStyle='#F0F6FF'; c.beginPath(); c.arc(lx,ly,lr,0,7); c.fill();
    c.fillStyle='rgba(190,208,238,.55)';
    c.beginPath(); c.arc(lx-lr*0.3,ly-lr*0.22,lr*0.20,0,7); c.fill();
    c.beginPath(); c.arc(lx+lr*0.28,ly+lr*0.18,lr*0.14,0,7); c.fill();
    /* ══ LA ESTRELLA FUGAZ ══ una cada catorce segundos, con su cola. Si
       cruzaran todo el rato no sería un momento: hay que alcanzarla. */
    (function(){
      var ci = 14000, k = Math.floor(now/ci), u = (now % ci)/ci;
      if(u > 0.16) return;
      var v = u/0.16, r0 = rnd(k*3.7), r1 = rnd(k*8.1);
      var x0 = W*(0.10 + r0*0.55), y0 = H*(0.04 + r1*0.20);
      var lg = W*(0.16 + rnd(k*5.5)*0.16), ca = Math.PI*0.22 + rnd(k*2.2)*0.16;
      var x1 = x0 + Math.cos(ca)*lg*v, y1 = y0 + Math.sin(ca)*lg*v;
      var fade = Math.sin(v*Math.PI);
      var gf = c.createLinearGradient(x1 - Math.cos(ca)*lg*0.34, y1 - Math.sin(ca)*lg*0.34, x1, y1);
      gf.addColorStop(0,'rgba(226,240,255,0)');
      gf.addColorStop(1,'rgba(238,248,255,'+(0.85*fade)+')');
      c.strokeStyle = gf; c.lineWidth = 1.8; c.lineCap='round';
      c.beginPath(); c.moveTo(x1 - Math.cos(ca)*lg*0.34, y1 - Math.sin(ca)*lg*0.34);
      c.lineTo(x1, y1); c.stroke();
      var gh = c.createRadialGradient(x1,y1,0,x1,y1,9);
      gh.addColorStop(0,'rgba(255,255,255,'+(0.9*fade)+')'); gh.addColorStop(1,'rgba(255,255,255,0)');
      c.fillStyle = gh; c.beginPath(); c.arc(x1,y1,9,0,7); c.fill();
    })();
    /* nubes altas cruzando el cielo */
    for(var na=0;na<5;na++){
      var da = ((now/(110000 + rnd(na*2.2)*70000)) + rnd(na*6.1)) % 1.4 - 0.2;
      nube(da*W*1.35 - W*0.18 + mx*20, H*(0.10 + rnd(na*3.3)*0.18),
           W*(0.16 + rnd(na*5.5)*0.18), H*0.011, 0.10 + rnd(na*7.7)*0.09);
    }

    /* la cámara sube al bajar: la cumbre se acerca */
    var sy  = H*0.175 - p*H*0.09;
    var cx  = W*0.5 + mx*8;
    var pie = H*1.40;
    var mar = H*0.575 + p*H*0.10;

    /* ── LAS CORDILLERAS DEL FONDO ── se pierden en la bruma ── */
    /* SEIS CORDILLERAS, no tres: cada una más baja, más pálida y más lejos que
       la de enfrente. La profundidad no la da una capa grande sino MUCHAS
       pequeñas, cada una un poco más lavada por el aire que la anterior. */
    sierra(11, mar + H*0.115, H*0.230, W*0.52, 'rgba(122,152,198,.20)', 'rgba(222,236,254,.16)');
    sierra(5,  mar + H*0.098, H*0.196, W*0.44, 'rgba(108,140,190,.25)', 'rgba(218,232,252,.20)');
    sierra(2,  mar + H*0.078, H*0.162, W*0.36, 'rgba(92,124,176,.33)',  'rgba(214,230,252,.26)');
    sierra(9,  mar + H*0.060, H*0.132, W*0.30, 'rgba(82,114,166,.42)',  'rgba(210,228,250,.30)');
    sierra(3,  mar + H*0.045, H*0.108, W*0.24, 'rgba(70,102,154,.54)',  'rgba(204,222,250,.34)');
    sierra(7,  mar + H*0.030, H*0.082, W*0.17, 'rgba(50,78,126,.74)',   'rgba(196,216,246,.42)');
    /* LOS PUEBLOS DEL VALLE: apenas unas lucecitas debajo de las nubes.
       Son lo que te dice cuánto has subido. */
    var epue = Math.min(W,H)/900;
    pueblo(W*0.115, mar + H*0.052, epue*1.05, 9, 21, now);
    pueblo(W*0.395, mar + H*0.060, epue*0.80, 6, 82, now);
    pueblo(W*0.685, mar + H*0.044, epue*0.90, 7, 44, now);
    pueblo(W*0.895, mar + H*0.058, epue*1.15, 10, 63, now);
    var bh = c.createLinearGradient(0, mar - H*0.14, 0, mar + H*0.06);
    bh.addColorStop(0,'rgba(80,116,172,0)'); bh.addColorStop(1,'rgba(80,116,172,.42)');
    c.fillStyle = bh; c.fillRect(0, mar - H*0.14, W, H*0.20);

    /* EL MAR DE NUBES VA DETRÁS: pintado después, sus tres bandas cruzan de
       borde a borde y le pasaban una capa de luz por encima a media ladera —
       la roca acababa MÁS CLARA que el cielo, y eso se lee como vidrio. Ahora
       el pico sale DEL mar de nubes, que es lo que pasa de verdad. */
    /* ── EL MAR DE NUBES a media ladera ── */
    for(var b=0;b<3;b++){
      var yy = mar + b*H*0.05, al = 0.15 - b*0.04;
      var fg = c.createLinearGradient(0, yy - H*0.07, 0, yy + H*0.09);
      fg.addColorStop(0,'rgba(178,202,240,0)');
      fg.addColorStop(.55,'rgba(178,202,240,'+al+')');
      fg.addColorStop(1,'rgba(140,172,220,0)');
      c.fillStyle = fg; c.fillRect(0, yy - H*0.07, W, H*0.16);
    }
    for(var n2=0;n2<15;n2++){
      var d2 = ((now/(64000 + rnd(n2*3.3)*54000)) + rnd(n2*7.7)) % 1.4 - 0.2;
      nube(d2*W*1.3 - W*0.15 + mx*(10+rnd(n2)*16),
           mar + (rnd(n2*5.5)-0.35)*H*0.075,
           W*(0.17 + rnd(n2*2.2)*0.28), H*(0.013 + rnd(n2*9.1)*0.017),
           0.14 + rnd(n2*4.4)*0.20);
    }


    /* ── LA MONTAÑA ── */
    function flanco(dir, sem){
      var pts = [[cx, sy]], n = 10;
      for(var i=1;i<=n;i++){
        var t = i/n;
        pts.push([ cx + dir*(Math.pow(t,0.93)*W*0.78 + (rnd(sem*3.7+i)-0.5)*W*0.05),
                   sy + Math.pow(t,1.10)*(pie-sy) ]);
      }
      return pts;
    }
    var izq = flanco(-1, 11), der = flanco(1, 23);
    /* la roca tiene CUERPO: se oscurece hacia el pie, como una masa con peso,
       y así se despega del cielo en vez de fundirse con él */
    /* MÁS OSCURA QUE EL CIELO EN TODO SU ALTO: es lo único que hace que una
       silueta se lea como masa y no como cristal */
    var roca = c.createLinearGradient(0, sy, 0, H);
    roca.addColorStop(0,'#152744'); roca.addColorStop(.42,'#0C1A2E'); roca.addColorStop(1,'#050A14');
    masa(izq, roca); masa(der, roca);
    /* el filo de la silueta contra el cielo: una línea finísima de luz de luna
       que dice dónde acaba la montaña y empieza el aire */
    c.save(); c.strokeStyle = 'rgba(150,182,232,.20)'; c.lineWidth = 1.4;
    c.beginPath(); suave(izq); c.stroke();
    c.beginPath(); suave(der); c.stroke();
    c.restore();
    /* el filo de la cumbre: sin esto el pico es un domo y no se siente roca */
    c.fillStyle = '#22395C'; c.beginPath();
    c.moveTo(cx, sy); c.lineTo(cx + W*0.055, sy + (pie-sy)*0.115);
    c.lineTo(cx - W*0.048, sy + (pie-sy)*0.125); c.closePath(); c.fill();
    /* la cara que da a la luna */
    c.save();
    c.beginPath(); suave(der); c.lineTo(W*2,H+200); c.lineTo(-W,H+200); c.closePath(); c.clip();
    var cara = c.createLinearGradient(cx - W*0.10, 0, cx + W*0.62, 0);
    cara.addColorStop(0,'rgba(126,164,220,0)'); cara.addColorStop(.22,'rgba(126,164,220,.19)');
    cara.addColorStop(.70,'rgba(74,110,172,.07)'); cara.addColorStop(1,'rgba(44,70,118,0)');
    c.fillStyle = cara; c.fillRect(0,0,W,H);
    c.restore();
    /* aristas que bajan de la cumbre: es lo que le da volumen */
    c.save();
    c.beginPath(); suave(izq); c.lineTo(-W,H+200); c.lineTo(W*2,H+200); c.closePath(); c.clip();
    c.strokeStyle = 'rgba(150,182,232,.13)'; c.lineWidth = 1.6;
    for(var a2=0;a2<5;a2++){
      c.beginPath(); c.moveTo(cx-2, sy+5);
      c.quadraticCurveTo(cx - W*(0.09+a2*0.07), sy + (pie-sy)*0.40, cx - W*(0.19+a2*0.14), pie);
      c.stroke();
    }
    c.restore();
    /* vetas de roca siguiendo la pendiente: una ladera lisa se lee como papel */
    c.save();
    c.beginPath(); suave(izq); c.lineTo(-W,H+200); c.lineTo(W*2,H+200); c.closePath(); c.clip();
    for(var v=0;v<7;v++){
      var t0 = 0.16 + v*0.115;
      c.fillStyle = 'rgba(10,20,38,'+(0.20 - v*0.02)+')';
      c.beginPath();
      c.moveTo(cx, sy + (pie-sy)*t0);
      c.quadraticCurveTo(cx - W*(0.14 + v*0.06), sy + (pie-sy)*(t0+0.10),
                         cx - W*(0.30 + v*0.09), sy + (pie-sy)*(t0+0.30));
      c.lineTo(cx - W*(0.30 + v*0.09), sy + (pie-sy)*(t0+0.36));
      c.quadraticCurveTo(cx - W*(0.14 + v*0.06), sy + (pie-sy)*(t0+0.15),
                         cx, sy + (pie-sy)*(t0+0.05));
      c.closePath(); c.fill();
    }
    c.restore();
    /* ══ LA TEXTURA DE LA LADERA ══
       Dos intentos fallidos antes de éste: los canales de nieve eran cuñas
       anchas y RECTAS —se leían como haces de luz, no como nieve— y la roca
       eran rombos sueltos flotando encima. Lo que hace que una ladera parezca
       roca es que todo siga LA MISMA caída: cada veta nace arriba, se abre
       hacia afuera al bajar y se afila. Aquí todo se traza sobre esa línea. */
    c.save();
    c.beginPath(); suave(izq); c.lineTo(-W,H+200); c.lineTo(W*2,H+200); c.closePath(); c.clip();
    c.beginPath(); suave(der); c.lineTo(W*2,H+200); c.lineTo(-W,H+200); c.closePath(); c.clip();
    /* la línea de caída de la ladera, para que todo la siga */
    function caida(t0, lado, sesgo){
      return { x: cx + lado*(Math.pow(t0,0.93)*W*0.78*sesgo),
               y: sy + Math.pow(t0,1.10)*(pie-sy) };
    }
    /* costillas de roca: nacen finas arriba y se abren al bajar */
    for(var rk=0; rk<16; rk++){
      var ld = rk % 2 ? 1 : -1;
      var ses = 0.10 + rnd(rk*7.7)*0.80;
      var t0 = 0.05 + rnd(rk*4.4)*0.34;
      var t1 = t0 + 0.10 + rnd(rk*2.7)*0.26;
      var a = caida(t0, ld, ses), b2 = caida(t1, ld, ses*1.06);
      var an = W*(0.004 + rnd(rk*9.9)*0.012);
      var gr2 = c.createLinearGradient(a.x, a.y, b2.x, b2.y);
      var op = 0.16 + rnd(rk*3.3)*0.24;
      gr2.addColorStop(0,'rgba(9,18,36,0)');
      gr2.addColorStop(.35,'rgba(9,18,36,'+op+')');
      gr2.addColorStop(1,'rgba(9,18,36,0)');
      c.fillStyle = gr2;
      c.beginPath(); c.moveTo(a.x, a.y);
      c.quadraticCurveTo((a.x+b2.x)/2 + ld*an*2, (a.y+b2.y)/2, b2.x, b2.y);
      c.lineTo(b2.x + an*2.4, b2.y + an*0.6);
      c.quadraticCurveTo((a.x+b2.x)/2 + ld*an*2 + an*1.4, (a.y+b2.y)/2, a.x + an*0.5, a.y);
      c.closePath(); c.fill();
    }
    /* NADA DE CANALES DE NIEVE: eran vetas pálidas largas bajando por la
       ladera y, contra una roca oscura, no se leían como nieve sino como HACES
       DE LUZ atravesándola. Eso era la transparencia. Las costillas de roca sí
       se quedan — ésas OSCURECEN, y oscurecer es lo que hace bulto. */
    c.restore();
    /* el campo de nieve de la cumbre */
    c.save();
    c.beginPath(); suave(izq.slice(0,6).slice().reverse().concat(der.slice(1,6)));
    c.lineTo(der[5][0], der[5][1] + H*0.03); c.closePath(); c.clip();
    var lim = sy + (pie-sy)*0.155;
    var nv = c.createLinearGradient(0, sy, 0, lim);
    nv.addColorStop(0,'#F2F8FF'); nv.addColorStop(.55,'rgba(222,235,255,.9)');
    nv.addColorStop(1,'rgba(200,220,250,0)');
    c.fillStyle = nv; c.beginPath(); c.moveTo(-W, sy - H*0.12);
    for(var q=-W;q<=W*2;q+=W*0.045){
      c.lineTo(q, lim - Math.sin(q/(W*0.085))*H*0.020 - rnd(q)*H*0.010);
    }
    c.lineTo(W*2, sy - H*0.12); c.closePath(); c.fill();
    c.restore();

    /* ── LA FALDA: bosque, sendero y torii ── */
    var fy = H*0.815 + p*H*0.05;
    var fpt = [[-60, fy + H*0.05]];
    for(var f=0;f<=10;f++){
      fpt.push([ -60 + f*(W+120)/10,
                 fy - Math.sin(f*0.75 + 1.2)*H*0.035 - rnd(f*4.4)*H*0.018 ]);
    }
    masa(fpt, '#0B1626');
    /* EL PUEBLO DE LA FALDA: el último antes de que empiece la subida */
    var ep = Math.min(W,H)/300;
    pueblo(W*0.150, fy + H*0.054, ep*0.62, 12, 12, now);
    pueblo(W*0.735, fy + H*0.072, ep*0.74, 14, 33, now);
    pueblo(W*0.905, fy + H*0.040, ep*0.52, 8,  55, now);
    pueblo(W*0.480, fy + H*0.092, ep*0.56, 7,  71, now);
    /* los pinos, más chicos y pálidos hacia el fondo */
    for(var t2=0;t2<46;t2++){
      var px = rnd(t2*1.7)*W*1.06 - W*0.03 + mx*10;
      var prof = rnd(t2*8.8);
      var py = fy + H*(0.012 + prof*0.14) - Math.sin((px/W)*7.5 + 1.2)*H*0.035;
      var ps = Math.min(W,H)/560 * (0.55 + prof*1.25);
      pino(px, py, ps, prof > 0.55 ? '#0A1220' : '#101E33',
           prof > 0.35 ? 'rgba(226,238,255,.55)' : null);
    }
    /* una pagoda lejana en la cresta de la derecha */
    pagoda(W*0.845, fy - H*0.012, Math.min(W,H)/430, '#0A1424');

    /* ══ LA CUMBRE: KURO ══
       EL AURA SE PASÓ DE MANO (André, 31-ago-2026): un disco de tinta con su
       aro frío convertía la cumbre en un eclipse y se comía la montaña — la
       escena era el aura, no la montaña. Lo que queda es lo justo: la nieve se
       APAGA alrededor de él, un poco, y esa sombra baja pegada a la ladera
       como si la arrastrara. Sin aro, sin rayos, sin columna. Se siente antes
       de verse, que es como debe sentirse. */
    var esc = Math.min(W,H)/300 * (1 + p*0.55);
    var ay = sy + 4*esc;
    var R  = Math.min(26*esc, sy*0.5);
    /* EL AURA: un resplandor frío que se cuela entre la nevada, para que la
       cumbre no sea sólo una silueta chiquita en el cielo. Va con 'lighter'
       para que la nieve que le cruza por delante se encienda al pasar. */
    c.save(); c.globalCompositeOperation = 'lighter';
    var halo = c.createRadialGradient(cx, ay, 2, cx, ay, R*3.1);
    halo.addColorStop(0,  'rgba(168,226,206,'+(0.26 + p*0.12)+')');
    halo.addColorStop(.22,'rgba(136,200,190,'+(0.13 + p*0.06)+')');
    halo.addColorStop(.58,'rgba(104,164,168,.045)');
    halo.addColorStop(1,  'rgba(88,146,150,0)');
    c.fillStyle = halo; c.beginPath(); c.arc(cx, ay, R*3.1, 0, 7); c.fill();
    /* y unos rayos larguísimos, girando tan despacio que casi no se ven mover */
    c.translate(cx, ay); c.rotate(REDUCE?0:now/24000);
    for(var ry=0; ry<16; ry++){
      c.rotate(Math.PI*2/16);
      var lgo = (30 + rnd(ry*9.1)*46) * esc * (1 + p*0.5);
      var gry = c.createLinearGradient(0,0,0,-lgo);
      gry.addColorStop(0,'rgba(176,232,212,'+(0.085+p*0.04)+')');
      gry.addColorStop(.45,'rgba(176,232,212,.022)');
      gry.addColorStop(1,'rgba(176,232,212,0)');
      c.fillStyle = gry; c.beginPath();
      c.moveTo(-1.4*esc,0); c.lineTo(1.4*esc,0); c.lineTo(0,-lgo); c.closePath(); c.fill();
    }
    c.restore();
    var tinta = c.createRadialGradient(cx, ay, 1, cx, ay, R);
    tinta.addColorStop(0,  'rgba(4,7,14,'+(0.62 + p*0.10)+')');
    tinta.addColorStop(.45,'rgba(6,10,20,'+(0.30 + p*0.06)+')');
    tinta.addColorStop(1,  'rgba(8,14,28,0)');
    c.fillStyle = tinta; c.beginPath(); c.arc(cx, ay, R, 0, 7); c.fill();
    /* la sombra que escurre por la nieve hacia abajo */
    var esc2 = c.createLinearGradient(0, ay, 0, ay + R*2.2);
    esc2.addColorStop(0,'rgba(5,9,18,'+(0.26 + p*0.06)+')');
    esc2.addColorStop(1,'rgba(8,14,28,0)');
    c.fillStyle = esc2; c.beginPath();
    c.moveTo(cx - R*0.52, ay); c.lineTo(cx + R*0.52, ay);
    c.lineTo(cx + R*1.05, ay + R*2.2); c.lineTo(cx - R*1.05, ay + R*2.2);
    c.closePath(); c.fill();
    /* unas pocas motas oscuras subiendo: se ven porque la nieve es blanca */
    for(var e=0;e<16;e++){
      var ph = rnd(e*3.7), sp = 7000 + rnd(e*8.2)*7000;
      var u = ((now/sp) + ph) % 1;
      c.fillStyle = 'rgba(5,9,18,'+(0.34*(1-u)*(1-u))+')';
      c.beginPath();
      c.arc(cx + (rnd(e*1.9)-0.5)*26*esc*(0.4+u), sy + 2*esc - u*44*esc,
            (0.35+rnd(e*4.4)*0.4)*esc, 0, 7);
      c.fill();
    }
    /* él: negro, con la katana a la espalda. El filo de luna lo despega del
       cielo — sin él era negro sobre negro. */
    ninja(c, cx + 1.0, sy + 2*esc, esc*0.46, '#54637A',
          false, { espalda:true, cuerpo:'#54637A', casco:'#54637A',
                   filo:'#54637A', mango:'#54637A', ojos:'rgba(0,0,0,0)' });
    ninja(c, cx, sy + 2*esc, esc*0.46, '#0A0D14', false,
          { espalda:true, cuerpo:'#05070C', casco:'#05070C',
            filo:'#2B3444', mango:'#05070C',
            ojos:'#F2FEFF', mirada:'rgba(226,252,255,.95)' });

    /* ══ LA TORMENTA DE NIEVE ══
       Va DELANTE de todo, y a propósito son partículas y no una capa de color:
       un velo translúcido sobre la roca sólo la aclara —y eso se lee como
       vidrio, que es justo lo que costó quitar—. Un copo que se mueve sí dice
       que hay algo entre tú y la montaña. */
    var viento = Math.sin(now/5200)*0.45 + 0.85;
    for(var nv=0; nv<220; nv++){
      var prof2 = rnd(nv*3.3);                       /* 0 lejos, 1 cerca */
      var vel2 = 0.16 + prof2*0.62;
      var yy2 = ((rnd(nv*1.7)*H*1.3 + now*vel2*0.09) % (H*1.3)) - H*0.15;
      var xx2 = ((rnd(nv*5.5)*W*1.3 + now*vel2*viento*0.052 + Math.sin(now/1400 + nv)*22*prof2)
                 % (W*1.3)) - W*0.15;
      c.fillStyle = 'rgba(236,244,255,'+(0.16 + prof2*0.62)+')';
      c.beginPath(); c.arc(xx2, yy2, 0.5 + prof2*2.0, 0, 7); c.fill();
    }
    /* la ráfaga cercana: unas pocas grandes y borrosas, cruzando rápido */
    for(var rg=0; rg<14; rg++){
      var u3 = ((now/(2600 + rnd(rg*4.4)*2400)) + rnd(rg*8.8)) % 1;
      c.save(); c.globalAlpha = 0.16*Math.sin(u3*Math.PI);
      c.fillStyle = '#EFF5FF';
      c.beginPath();
      c.ellipse(u3*W*1.3 - W*0.15, rnd(rg*2.2)*H, 9 + rnd(rg)*13, 2.2, -0.22, 0, 7);
      c.fill(); c.restore();
    }
    /* viñeta suave: el cielo no se apaga, sólo se recoge en los bordes */
    var vg = c.createRadialGradient(W/2,H*0.46,H*0.34,W/2,H*0.46,H*1.02);
    vg.addColorStop(0,'rgba(5,10,24,0)'); vg.addColorStop(1,'rgba(5,10,24,.62)');
    c.fillStyle = vg; c.fillRect(0,0,W,H);
  }
  var raf = 0;
  function loop(t){ pinta(t||0); raf = requestAnimationFrame(loop); }
  function alScroll(){
    var h = document.querySelector('.hero');
    var alto = h.offsetHeight - window.innerHeight;
    prog = Math.max(0, Math.min(1, window.scrollY / (alto||1)));
    var v = document.getElementById('velo');
    v.style.opacity = Math.max(0, Math.min(1, (window.scrollY - alto*0.72) / (window.innerHeight*0.5)));
  }
  addEventListener('resize', medir, {passive:true});
  addEventListener('scroll', alScroll, {passive:true});
  if(!REDUCE) addEventListener('mousemove', function(e){
    mx = (e.clientX/window.innerWidth - 0.5); my = (e.clientY/window.innerHeight - 0.5);
  }, {passive:true});
  medir(); alScroll(); loop(0);
})();

/* ══════════════ LOS NUEVE, 3×3 ══════════════ */
(function(){
  var host = document.getElementById('nueve'); if(!host) return;
  ACEROS.forEach(function(a){
    var d = document.createElement('div'); d.className = 'nj';
    var cv = document.createElement('canvas'); cv.width = 200; cv.height = 190;
    var c = cv.getContext('2d');
    var g = c.createRadialGradient(100,110,4,100,110,92);
    g.addColorStop(0, a.c + '2E'); g.addColorStop(1, a.c + '00');
    c.fillStyle = g; c.beginPath(); c.ellipse(100,112,92,58,0,0,7); c.fill();
    /* todos con la katana envainada a la espalda; Kuro además va de negro */
    ninja(c, 100, 158, 2.0, a.c, false, a.n === 'KURO'
      ? { espalda:true, cuerpo:'#0A0D14', casco:'#0A0D14', filo:'#39414F',
          mango:'#0A0D14', ojos:'rgba(214,228,255,.9)' }
      : { espalda:true });
    d.appendChild(cv);
    var s = document.createElement('span'); s.textContent = a.n; s.style.color = a.t || a.c;
    d.appendChild(s); host.appendChild(d);
  });
})();

/* ══════════════ LAS NUEVE FICHAS ══════════════
   La tabla decía lo mismo en nueve renglones iguales y no se veía ni una
   espada. La ficha alargada es la forma de la katana: el acero cruzado de lado
   a lado, y encima su kanji, su nombre y lo que da. */
(function(){
  var host = document.getElementById('fichas'); if(!host) return;
  ACEROS.forEach(function(a){
    var d = document.createElement('div');
    d.className = 'ficha'; d.style.setProperty('--c', a.t || a.c);
    d.innerHTML = '<span class="fi-kan">' + a.k + '</span>' +
      '<span class="fi-nom">' + a.n + '<em>cinta ' + a.cin + '</em></span>' +
      '<span class="fi-hoja"></span>';
    var cv = document.createElement('canvas'); cv.width = 900; cv.height = 74;
    katana(cv.getContext('2d'), 900, 74, a.c);
    d.querySelector('.fi-hoja').appendChild(cv);
    host.appendChild(d);
  });
})();

/* ══════════════ LAS DOS RAMAS, VIVAS ══════════════ (André, 31-ago-2026)
   Dos tarjetas de puro texto, aunque el texto sea bueno, se leen como dos
   columnas de un documento. Cada una lleva ahora su propio dibujo, y el dibujo
   dice lo mismo que las cuatro líneas pero de un golpe: la escalera de las
   nueve katanas encendiéndose una tras otra, y las dos curvas corriendo con su
   marcador. Canvas y no GIF: pesan cero y se apagan fuera de cuadro. */
(function(){
  var UP = '#57C79B', TIN = 'rgba(237,239,242,.85)', DIM = 'rgba(237,239,242,.20)';
  var CIN = ['#EDEFF2','#E7C24A','#E0863C','#4FAE6A','#3E82C8','#8A5CC8','#7A5230','#C8443C','#8E96A4'];
  var lz = [].slice.call(document.querySelectorAll('.ra-vis canvas'));
  if(!lz.length) return;
  function escalera(c, W, H, t){
    /* nueve peldaños que suben, encendiéndose uno tras otro */
    var n = 9, gap = 6, bw = (W - gap*(n-1))/n;
    var ciclo = (t % 9000)/9000;
    for(var i=0;i<n;i++){
      var alt = H*(0.16 + (i/(n-1))*0.80);
      var x = i*(bw+gap), y = H - alt;
      var on = ciclo*n - i;
      c.fillStyle = 'rgba(237,239,242,.055)';
      c.fillRect(x, y, bw, alt);
      if(on > 0){
        var u = Math.min(1, on);
        c.fillStyle = CIN[i];
        c.globalAlpha = 0.20 + 0.55*Math.min(1, on/1.4);
        c.fillRect(x, H - alt*u, bw, alt*u);
        c.globalAlpha = 1;
        /* la hoja de la katana, cruzando el peldaño */
        if(on > 0.7){
          c.strokeStyle = 'rgba(240,246,255,'+(0.30 + 0.5*Math.min(1,(on-0.7)/1.2))+')';
          c.lineWidth = 1.6; c.lineCap='round';
          c.beginPath(); c.moveTo(x + bw*0.12, y + 7); c.lineTo(x + bw*0.88, y + 3); c.stroke();
        }
      }
    }
  }
  function duelo(c, W, H, t){
    /* dos curvas corriendo y su marcador */
    var ciclo = (t % 8000)/8000, av = Math.min(1, ciclo*1.30);
    [[UP, 0.0, 1.00, 'TÚ'], [TIN, 1.9, 0.66, 'RIVAL']].forEach(function(q, k){
      c.strokeStyle = q[0]; c.lineWidth = 2; c.lineJoin='round';
      c.globalAlpha = k ? .5 : 1;
      c.beginPath();
      var lx = 0, ly = 0;
      for(var i2=0;i2<=52;i2++){
        var u = i2/52; if(u > av) break;
        var yy = H*0.86 - (Math.sin(u*7.4 + q[1])*0.14 + u*q[2]*0.70 + 0.06)*H;
        lx = u*W*0.86; ly = yy;
        if(i2===0) c.moveTo(0, yy); else c.lineTo(lx, yy);
      }
      c.stroke();
      c.globalAlpha = 1;
      c.fillStyle = q[0];
      c.beginPath(); c.arc(lx, ly, k ? 2.4 : 3.2, 0, 7); c.fill();
      c.font = '600 8px "IBM Plex Mono", monospace'; c.textAlign='left';
      c.globalAlpha = k ? .55 : 1;
      c.fillText(q[3], lx + 7, ly + 3); c.globalAlpha = 1;
    });
    c.strokeStyle = DIM; c.lineWidth = 1; c.setLineDash([3,4]);
    c.beginPath(); c.moveTo(0, H*0.86); c.lineTo(W, H*0.86); c.stroke(); c.setLineDash([]);
  }
  function loop5(t){
    lz.forEach(function(cv, i){
      var r = cv.getBoundingClientRect();
      if(r.bottom < -80 || r.top > (innerHeight||800)+80) return;
      var D = Math.min(2, devicePixelRatio||1), W = cv.offsetWidth, H = cv.offsetHeight;
      if(!W || !H) return;
      if(cv.width !== W*D){ cv.width = W*D; cv.height = H*D; }
      var c = cv.getContext('2d'); c.setTransform(D,0,0,D,0,0); c.clearRect(0,0,W,H);
      if(i === 0) escalera(c, W, H, t||0); else duelo(c, W, H, t||0);
    });
    requestAnimationFrame(loop5);
  }
  if(REDUCE) loop5(4200); else loop5(0);
})();

/* ══════════════ LA CINTA ══════════════
   Una lista de nombres no enseña una herramienta. Estas son las pantallas de
   VERDAD de la terminal, capturadas del programa corriendo, desfilando sin fin
   en dos filas que van en sentidos contrarios — así el ojo no encuentra el
   principio ni el final y se queda mirando.
   La pista se duplica para que el bucle no tenga costura, y se detiene al
   pasar el cursor: si algo te interesó, tienes que poder leerlo. */
var MESA = [
  ['BACKTESTING','assets/images/kuro-c-backtest.jpg','Prueba la idea sin tocar tu cuenta. La curva, el win rate y el profit factor salen solos.'],
  ['LOG TRADE','assets/images/kuro-c-log.jpg','Cantas dirección y P&L. Tu curva del día, tu peor caída desde el pico y cuántas veces entraste, en vivo.'],
  ['JOURNAL','assets/images/kuro-c-journal.jpg','El día completo: cada trade con su captura y su nota, para revisarlo cuando ya no duele.'],
  ['TRADES','assets/images/kuro-c-trades.jpg','Todo tu historial en una lista, por cuenta y por día.'],
  ['EL PLAN','assets/images/kuro-c-plan.jpg','Cada cuenta con su balance, cuánto te queda al drawdown y cuánto te falta al objetivo.'],
  ['EL MAPA','assets/images/kuro-c-campana.jpg','Los nueve mundos, los ocho maestros y dónde vas.'],
  ['EL DUELO','assets/images/kuro-c-duelo.jpg','La misma killzone, el mismo reloj, dos curvas.']
];
(function(){
  var A = document.getElementById('cintaA'), B = document.getElementById('cintaB');
  if(!A || !B) return;
  function tarjeta(m, copia){
    var d = document.createElement('article'); d.className = 'ct';
    /* la copia del bucle sí puede esperar; la primera pasada no, porque con
       lazy la tarjeta entra en cuadro ya moviéndose y la imagen aparece tarde */
    d.innerHTML = '<span class="ct-img"><img src="' + m[1] + '" alt="' + m[0] + '"' +
      (copia ? ' loading="lazy"' : '') + '></span>' +
      '<span class="ct-t">' + m[0] + '</span>' +
      '<span class="ct-p">' + m[2] + '</span>';
    if(copia) d.setAttribute('aria-hidden','true');
    return d;
  }
  function llena(host, orden){
    /* dos pasadas: el bucle se cierra sin costura porque la pista mide el
       doble y la animación se detiene justo a la mitad */
    for(var v=0; v<2; v++)
      orden.forEach(function(i){ host.appendChild(tarjeta(MESA[i], v > 0)); });
  }
  llena(A, [0,1,2,3,4,5,6]);
  llena(B, [4,6,1,5,3,0,2]);
})();

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
  var t = 0, cuadros = 0;
  function loop6(ts){ cuadros++; t = ts || 0; pinta(t); requestAnimationFrame(loop6); }
  pinta(0);
  if(!REDUCE){
    requestAnimationFrame(loop6);
    setTimeout(function(){
      if(cuadros < 3) setInterval(function(){ t += 33; pinta(t); }, 33);
    }, 500);
  }
  addEventListener('resize', function(){ pinta(t); }, {passive:true});
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

/* ══════════════ LOS MODOS ══════════════
   La lista de campos del formulario («a quién», «formato», «killzone»…) contaba
   cómo se llena una pantalla, no qué se puede hacer. Esto dice lo segundo. */
(function(){
  var host = document.getElementById('modos'); if(!host) return;
  var MODOS = [
    ['RETOS',    'Retas a quien quieras: uno, varios o todos a la vez. Escoges la killzone, el día, con cuánto salen y cuánto pone cada quien. El mayor profit se lleva el bote.'],
    ['SESIÓN',   'Una killzone entera. Asia a las 20:00, Londres a las 02:00, Nueva York a las 09:30. El reloj arranca cuando abre el mercado, no cuando aceptan.'],
    ['SPRINT',   'Corto y de una sentada. Se decide en la primera hora.'],
    ['MARATÓN',  'Varios días seguidos. Aquí no gana el que pega más fuerte: gana el que aguanta.'],
    ['PARTY',    'Todos contra todos en la misma ventana, con la tabla viva y el primero coronado.'],
    ['EVENTOS',  'Un rival por killzone, ya puesto. La semana decide quién y cambia sola cada lunes. Ahí se paga doble.'],
    ['TORNEO',   'Uno a la semana. Viernes, ocho horas, dieciséis lugares. Entrada $5,000, bolsa $25,000. Uno se la lleva.']
  ];
  var lienzos = [];
  MODOS.forEach(function(m, i){
    var d = document.createElement('div'); d.className = 'modo rev';
    /* el séptimo cierra la rejilla: siete tarjetas en dos columnas dejaban una
       celda vacía al final, y ese hueco se leía como un error de maquetado */
    if(i === MODOS.length - 1) d.classList.add('ancho');
    d.style.transitionDelay = (i*80) + 'ms';
    d.innerHTML = '<span class="mo-n">' + String(i+1).padStart(2,'0') + '</span>' +
      '<span class="mo-t">' + m[0] + '</span>' +
      '<span class="mo-p">' + m[1] + '</span>' +
      '<span class="mo-vis"><canvas></canvas></span>' +
      '<i class="mo-linea"></i>';
    host.appendChild(d);
    lienzos.push({ cv: d.querySelector('canvas'), i: i, caja: d });
  });

  /* ══ UN DIBUJO VIVO POR MODO ══ (André, 31-ago-2026)
     Siete párrafos seguidos se leen como un contrato. Cada modo tiene ahora su
     propia animación —las dos curvas del reto, el reloj de la killzone, la
     tabla de la party, el cuadro del torneo— que dice en dos segundos lo que
     el párrafo tarda en explicar. Van en canvas y no en GIF: pesan cero, se ven
     nítidas en cualquier pantalla y se apagan solas cuando no están en cuadro. */
  var UP = '#57C79B', DIM = 'rgba(237,239,242,.24)', TIN = 'rgba(237,239,242,.85)';
  function pintaModo(c, W, H, i, t){
    c.clearRect(0,0,W,H);
    var M = 14, w = W - M*2, h = H - M*2, y0 = M, x0 = M;
    var ciclo = (t % 7000) / 7000;
    if(i === 0){                       /* RETOS · dos curvas compitiendo */
      [[UP, 0, 1], [TIN, 1.7, 0.62]].forEach(function(q, k){
        c.strokeStyle = q[0]; c.lineWidth = 2; c.lineJoin='round';
        c.globalAlpha = k ? .55 : 1;
        c.beginPath();
        for(var p2=0; p2<=48; p2++){
          var u = p2/48, av = Math.min(1, ciclo*1.35);
          if(u > av) break;
          var yy = y0 + h - (Math.sin(u*7 + q[1])*0.16 + u*q[2]*0.78 + 0.10)*h;
          if(p2===0) c.moveTo(x0, yy); else c.lineTo(x0 + u*w, yy);
        }
        c.stroke(); c.globalAlpha = 1;
      });
    } else if(i === 1){                /* SESIÓN · el día y sus tres killzones */
      var kz = [['ASIA',0,.34],['LONDRES',.34,.66],['NY',.66,1]];
      var act = Math.floor(ciclo*3) % 3;
      kz.forEach(function(z, k){
        var a = x0 + z[1]*w, b = x0 + z[2]*w;
        c.fillStyle = k === act ? 'rgba(87,199,155,.16)' : 'rgba(237,239,242,.05)';
        c.fillRect(a, y0 + h*0.34, b-a-3, h*0.30);
        c.fillStyle = k === act ? UP : DIM;
        c.font = '600 8px "IBM Plex Mono", monospace'; c.textAlign='left';
        c.fillText(z[0], a, y0 + h*0.24);
        if(k === act){
          var uu = (ciclo*3) % 1;
          c.fillStyle = UP; c.fillRect(a, y0 + h*0.34, (b-a-3)*uu, h*0.30);
          c.fillStyle = TIN; c.fillRect(a + (b-a-3)*uu - 1, y0 + h*0.22, 2, h*0.56);
        }
      });
    } else if(i === 2){                /* SPRINT · una barra que se llena rápido */
      var u2 = Math.min(1, ((t % 2600)/2600) * 1.25);
      c.fillStyle = 'rgba(237,239,242,.06)'; c.fillRect(x0, y0+h*0.42, w, h*0.16);
      c.fillStyle = UP; c.fillRect(x0, y0+h*0.42, w*u2, h*0.16);
      c.fillStyle = TIN; c.fillRect(x0 + w*u2 - 1, y0+h*0.30, 2, h*0.40);
      c.font = '600 8px "IBM Plex Mono", monospace'; c.textAlign='right';
      c.fillStyle = DIM; c.fillText('1 h', x0+w, y0+h*0.86);
    } else if(i === 3){                /* MARATÓN · varios días seguidos */
      var n2 = 5, gap = 8, bw = (w - gap*(n2-1))/n2;
      for(var d2=0; d2<n2; d2++){
        var uu2 = Math.max(0, Math.min(1, ciclo*n2 - d2));
        c.fillStyle = 'rgba(237,239,242,.06)';
        c.fillRect(x0 + d2*(bw+gap), y0+h*0.30, bw, h*0.40);
        c.fillStyle = d2 % 2 ? 'rgba(87,199,155,.55)' : UP;
        c.fillRect(x0 + d2*(bw+gap), y0 + h*0.70 - h*0.40*uu2, bw, h*0.40*uu2);
      }
    } else if(i === 4){                /* PARTY · la tabla viva */
      var filas = [0,1,2,3].map(function(k){
        return { k:k, v: 0.35 + (Math.sin(t/900 + k*2.1)*0.5+0.5)*0.6 }; });
      var orden = filas.slice().sort(function(a,b){ return b.v - a.v; });
      orden.forEach(function(f, k){
        var yy = y0 + k*(h/4), bh = h/4 - 7;
        c.fillStyle = k === 0 ? UP : 'rgba(237,239,242,.20)';
        c.fillRect(x0 + 16, yy, (w-16)*f.v, bh);
        c.fillStyle = k === 0 ? UP : DIM;
        c.font = '600 8px "IBM Plex Mono", monospace'; c.textAlign='left';
        c.fillText(k === 0 ? '1' : String(k+1), x0, yy + bh*0.8);
      });
    } else if(i === 5){                /* EVENTOS · la semana rota el rival */
      var dia = Math.floor(ciclo*7) % 7, r2 = Math.min(h,w)/2;
      for(var k2=0; k2<7; k2++){
        var cx2 = x0 + (k2+0.5)*(w/7), cy2 = y0 + h*0.46;
        c.beginPath(); c.arc(cx2, cy2, k2 === dia ? 7 : 4, 0, 7);
        c.fillStyle = k2 === dia ? UP : 'rgba(237,239,242,.16)'; c.fill();
        if(k2 === 0){ c.font='600 8px "IBM Plex Mono", monospace'; c.textAlign='center';
          c.fillStyle = DIM; c.fillText('LUN', cx2, y0 + h*0.92); }
      }
      c.strokeStyle = 'rgba(237,239,242,.10)'; c.lineWidth = 1;
      c.beginPath(); c.moveTo(x0, y0+h*0.46); c.lineTo(x0+w, y0+h*0.46); c.stroke();
    } else {                           /* TORNEO · el cuadro que se cierra */
      var rondas = [8,4,2,1], enc = Math.floor(ciclo*4.2);
      rondas.forEach(function(n3, r3){
        var colx = x0 + r3*(w/4), bh2 = h/n3;
        for(var q2=0; q2<n3; q2++){
          var yy2 = y0 + q2*bh2 + bh2*0.5;
          c.fillStyle = r3 <= enc ? (r3===3 ? UP : 'rgba(87,199,155,.5)') : 'rgba(237,239,242,.13)';
          c.fillRect(colx, yy2 - 2, w/4 - 14, 4);
          if(r3 < 3 && r3 <= enc){
            c.strokeStyle = 'rgba(87,199,155,.30)'; c.lineWidth = 1;
            c.beginPath(); c.moveTo(colx + w/4 - 14, yy2);
            c.lineTo(colx + w/4 - 8, yy2);
            c.lineTo(colx + w/4 - 8, y0 + (Math.floor(q2/2))*bh2*2 + bh2);
            c.stroke();
          }
        }
      });
    }
  }
  var raf2 = 0;
  function loop2(t){
    lienzos.forEach(function(L){
      var r = L.caja.getBoundingClientRect();
      if(r.bottom < -80 || r.top > (innerHeight||800) + 80) return;
      var cv = L.cv, D = Math.min(2, devicePixelRatio||1);
      var W = cv.offsetWidth, H = cv.offsetHeight;
      if(!W || !H) return;
      if(cv.width !== W*D){ cv.width = W*D; cv.height = H*D; }
      var c = cv.getContext('2d'); c.setTransform(D,0,0,D,0,0);
      pintaModo(c, W, H, L.i, t||0);
    });
    raf2 = requestAnimationFrame(loop2);
  }
  if(!REDUCE) loop2(0); else loop2(3000);
})();

/* ══════════════ LOS NUEVE RETOS ══════════════ */
(function(){
  var host = document.getElementById('retos'); if(!host) return;
  ACEROS.forEach(function(a, i){
    var d = document.createElement('div');
    d.className = 'reto'; d.style.setProperty('--c', a.t || a.c);
    d.innerHTML =
      '<span class="re-kan">' + a.k + '</span>' +
      '<span class="re-nom">' + a.n + '<em>' + a.tit + '</em></span>' +
      '<span class="re-c"><em>OBJETIVO</em><b class="up">' + a.tp + '</b></span>' +
      '<span class="re-c"><em>DRAWDOWN</em><b class="dn">−' + a.dd + '</b></span>' +
      '<span class="re-c"><em>TRADES</em><b>' + a.tr + '</b></span>' +
      '<span class="re-c"><em>RIESGO</em><b>' + a.rg + '</b></span>' +
      '<span class="re-c"><em>VENTANA</em><b>' + a.se + '</b></span>';
    host.appendChild(d);
  });
})();

/* ══════════════ EL ARSENAL ══════════════ */
(function(){
  var host = document.getElementById('kats'); if(!host) return;
  ACEROS.forEach(function(a){
    var d = document.createElement('div'); d.className = 'kat';
    d.style.setProperty('--c', a.t || a.c);
    var cv = document.createElement('canvas'); cv.width = 240; cv.height = 76;
    katana(cv.getContext('2d'), 240, 76, a.c);
    d.appendChild(cv);
    var s = document.createElement('span'); s.textContent = a.n;
    d.appendChild(s); host.appendChild(d);
  });
})();

/* ══════════════ EL EDÉN ══════════════
   Enseñar una caja negra con tres cifras para hablar del JARDÍN era describir
   un cielo despejado sobre fondo negro. Aquí se dibuja el ecosistema: sol,
   nubes, montes verdes, pasto, florecitas rosas, la casa de madera y el ninja
   con su bokken. Es lo que ves cuando entras. */
(function(){
  var cv = document.getElementById('edenCv'); if(!cv) return;
  var c = cv.getContext('2d'), W = cv.width, H = cv.height;
  var cielo = c.createLinearGradient(0,0,0,H*0.72);
  cielo.addColorStop(0,'#2E6FA8'); cielo.addColorStop(.55,'#6BAEDC'); cielo.addColorStop(1,'#BFE0F2');
  c.fillStyle = cielo; c.fillRect(0,0,W,H);
  /* el sol y su halo */
  var sx = W*0.80, sy = H*0.20, sr = H*0.085;
  var hl = c.createRadialGradient(sx,sy,sr*0.6,sx,sy,sr*3.4);
  hl.addColorStop(0,'rgba(255,252,224,.55)'); hl.addColorStop(1,'rgba(255,252,224,0)');
  c.fillStyle = hl; c.beginPath(); c.arc(sx,sy,sr*3.4,0,7); c.fill();
  c.fillStyle = '#FFFBE0'; c.beginPath(); c.arc(sx,sy,sr,0,7); c.fill();
  /* nubes blancas de lóbulos */
  function nub(x,y,e){
    c.fillStyle = 'rgba(255,255,255,.94)';
    [[0,0,1.0],[-1.05,.24,.72],[1.05,.20,.78],[-.5,-.34,.66],[.55,-.30,.62]]
      .forEach(function(o){ c.beginPath();
        c.ellipse(x+o[0]*38*e, y+o[1]*30*e, 40*e*o[2], 25*e*o[2], 0,0,7); c.fill(); });
  }
  nub(W*0.16, H*0.16, 1.15); nub(W*0.44, H*0.11, 0.85);
  nub(W*0.66, H*0.22, 0.72); nub(W*0.90, H*0.13, 0.62);
  /* montes verdes, tres capas */
  [[H*0.60,'#2E6B3E',W*0.20,H*0.30],[H*0.66,'#3C8049',W*0.16,H*0.24],
   [H*0.71,'#4C954F',W*0.13,H*0.17]].forEach(function(L,li){
    c.fillStyle = L[1]; c.beginPath(); c.moveTo(-20,H);
    var x=-20,i=0;
    while(x<W+20){ var w=L[2]*(0.7+rnd(li*9+i)*0.9), h=L[3]*(0.45+rnd(li*4+i)*1.0);
      c.lineTo(x+w*0.5, L[0]-h); x+=w; i++; c.lineTo(x, L[0]-h*0.10); }
    c.lineTo(W+20,H); c.closePath(); c.fill();
  });
  /* el pasto */
  var pasto = c.createLinearGradient(0,H*0.74,0,H);
  pasto.addColorStop(0,'#4E9A50'); pasto.addColorStop(1,'#2B6134');
  c.fillStyle = pasto; c.fillRect(0,H*0.74,W,H*0.26);
  c.fillStyle = 'rgba(255,255,255,.10)'; c.fillRect(0,H*0.74,W,2);
  /* muchas florecitas rosas */
  for(var f=0;f<190;f++){
    var fx = rnd(f*1.7)*W, ft = rnd(f*5.3);
    var fy = H*0.755 + ft*H*0.235, fs = 1.4 + ft*2.6;
    c.fillStyle = ['rgba(244,166,196,.95)','rgba(232,140,178,.95)','rgba(255,200,220,.95)'][f%3];
    for(var q=0;q<5;q++){ var an=q/5*6.283;
      c.beginPath(); c.arc(fx+Math.cos(an)*fs*0.8, fy+Math.sin(an)*fs*0.8, fs*0.55,0,7); c.fill(); }
    c.fillStyle='rgba(255,240,170,.95)'; c.beginPath(); c.arc(fx,fy,fs*0.42,0,7); c.fill();
  }
  /* la casa de madera con su techo de paja */
  (function(){
    var hx = W*0.20, hb = H*0.795, e = H/210;
    c.fillStyle='rgba(20,50,26,.35)';
    c.beginPath(); c.ellipse(hx, hb+2*e, 22*e, 4*e, 0,0,7); c.fill();
    c.fillStyle='#8A6238'; c.fillRect(hx-14*e, hb-16*e, 28*e, 16*e);
    c.fillStyle='#6B4A28'; c.fillRect(hx-14*e, hb-16*e, 28*e, 2.4*e);
    c.fillStyle='#5E4630';
    c.beginPath(); c.moveTo(hx-20*e, hb-15*e); c.quadraticCurveTo(hx, hb-33*e, hx+20*e, hb-15*e);
    c.lineTo(hx+17*e, hb-13*e); c.lineTo(hx-17*e, hb-13*e); c.closePath(); c.fill();
    c.fillStyle='#3A2A1A'; c.fillRect(hx-4*e, hb-9*e, 8*e, 9*e);
    c.fillStyle='#F2D68A'; c.fillRect(hx+6*e, hb-11*e, 5*e, 5*e);
  })();
  /* el ninja con su espada de madera */
  ninja(c, W*0.42, H*0.815, H/190, '#EDEFF2', false,
        { espalda:true, filo:'#B98A4E', mango:'#8A6238' });
  /* pétalos en el aire */
  for(var pe=0;pe<26;pe++){
    c.fillStyle='rgba(244,166,196,'+(0.35+rnd(pe*3.3)*0.45)+')';
    c.save(); c.translate(rnd(pe*2.1)*W, rnd(pe*7.7)*H*0.8); c.rotate(rnd(pe)*3);
    c.beginPath(); c.ellipse(0,0,3.4,2.0,0,0,7); c.fill(); c.restore();
  }
})();

/* ══════════════ EL CIERRE: la cima, ya lejos ══════════════ */
(function(){
  var cv = document.getElementById('cierreCv'); if(!cv) return;
  var c = cv.getContext('2d');
  function pinta(){
    var W = cv.offsetWidth, H = cv.offsetHeight, D = Math.min(2, devicePixelRatio||1);
    cv.width = W*D; cv.height = H*D; c.setTransform(D,0,0,D,0,0);
    for(var k=0;k<10;k++){
      var t = k/9, yB = H*0.42 + Math.pow(t,1.5)*H*0.66;
      var lum = 1-t, R = Math.round(8+lum*26), G = Math.round(12+lum*38), B = Math.round(24+lum*60);
      c.fillStyle = 'rgb('+R+','+G+','+B+')'; c.beginPath(); c.moveTo(-40,H+10);
      var x=-40, j=0;
      while(x<W+40){
        var w = W*0.06 + t*W*0.13, h = (H*0.03 + t*H*0.16)*(0.5+rnd(k*4+j)*1.1);
        c.lineTo(x+w/2, yB-h); x+=w; j++; c.lineTo(x, yB-4);
      }
      c.lineTo(W+40,H+10); c.closePath(); c.fill();
    }
    var g = c.createRadialGradient(W*0.5,H*0.36,2,W*0.5,H*0.36,W*0.34);
    g.addColorStop(0,'rgba(155,232,196,.22)'); g.addColorStop(1,'rgba(155,232,196,0)');
    c.fillStyle = g; c.beginPath(); c.arc(W*0.5,H*0.36,W*0.34,0,7); c.fill();
    ninja(c, W*0.5, H*0.42, Math.min(W,H)/900, '#EDEFF2', false);
  }
  pinta(); addEventListener('resize', pinta, {passive:true});
})();

/* ══════════════ APARICIONES ══════════════ */
(function(){
  var todos = [].slice.call(document.querySelectorAll('.rev'));
  todos.forEach(function(el, i){ el.style.transitionDelay = (Math.min(i%5,4)*70) + 'ms'; });
  /* RED DE SEGURIDAD (André, 31-ago-2026): con IntersectionObserver solo, si
     el observador no dispara —salto de scroll, restauración de posición, un
     navegador raro— la sección se queda en opacity:0 y el visitante ve un
     hueco negro donde había contenido. Un repaso barato al hacer scroll lo
     cubre: es la diferencia entre una animación y una página en blanco. */
  function revisa(){
    var alto = innerHeight || 800, quedan = false;
    todos.forEach(function(el){
      if(el.classList.contains('on')) return;
      var r = el.getBoundingClientRect();
      if(r.top < alto*0.92 && r.bottom > 0) el.classList.add('on'); else quedan = true;
    });
    return quedan;
  }
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('on'); });
    }, {rootMargin:'0px 0px -8% 0px', threshold:.05});
    todos.forEach(function(el){ io.observe(el); });
  }
  /* sin requestAnimationFrame de por medio: son treinta y tres medidas, cuesta
     nada, y meter un rAF sólo añade otra cosa que puede no dispararse. Y un
     latido corto los primeros segundos, por si el scroll llega antes que el
     listener (posición restaurada, un ancla en la URL, bfcache). */
  addEventListener('scroll', revisa, {passive:true});
  addEventListener('load', revisa);
  var latido = setInterval(function(){ if(!revisa()) clearInterval(latido); }, 250);
  setTimeout(function(){ clearInterval(latido); }, 12000);
  revisa();
})();
