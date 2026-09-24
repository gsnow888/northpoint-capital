/* ============================================================
   respaldo.html — script 1 de 1
   Extraído del JavaScript inline original (1 bloque(s) <script>, línea 746 del HTML original).
   Se carga en el MISMO punto del documento donde estaba: el orden respecto
   al HTML importa (los scripts sólo ven los elementos que ya existen arriba).
   ============================================================ */


/* ── nav scrolled ── */
var hdr=document.getElementById('hdr');
addEventListener('scroll',function(){hdr.classList.toggle('scrolled',scrollY>10)},{passive:true});

/* ── ticker: duplicar pista para loop continuo ── */
var tk=document.getElementById('tkTrack');
tk.innerHTML+=tk.innerHTML;

/* ── reveals ── */
var io=new IntersectionObserver(function(es){
  es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
},{threshold:.15});
document.querySelectorAll('.rv,#ciclo').forEach(function(el){io.observe(el)});

/* ── acordeones (método + faq) ── */
function acordeon(sel,itemSel){
  document.querySelectorAll(sel+' '+itemSel).forEach(function(it){
    var btn=it.querySelector('button');
    btn.addEventListener('click',function(){
      var abierto=it.classList.contains('open');
      document.querySelectorAll(sel+' '+itemSel+'.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('button').setAttribute('aria-expanded','false');
        o.querySelector('.tog').textContent='+';
      });
      if(!abierto){
        it.classList.add('open');
        btn.setAttribute('aria-expanded','true');
        it.querySelector('.tog').textContent='−';
      }
    });
  });
}
acordeon('#pasos','.paso');
acordeon('#faqList','.faq-item');

/* ── calendario mockup ── */
(function(){
  var cal=document.getElementById('mkCal');if(!cal)return;
  var pat='..u.d.u u.u..d. .uu.u.. u.d.uu. ..u.u..'.replace(/ /g,'');
  for(var i=0;i<35;i++){
    var s=document.createElement('i');
    if(pat[i]==='u')s.className='up';else if(pat[i]==='d')s.className='dn';
    cal.appendChild(s);
  }
})();

/* ── calculadora ── */
(function(){
  var rPay=document.getElementById('rPay'),rMes=document.getElementById('rMes');
  var vPay=document.getElementById('vPay'),vMes=document.getElementById('vMes');
  var capRes=document.getElementById('capRes'),numRes=document.getElementById('numRes');
  var cv=document.getElementById('cvCalc'),ctx=cv.getContext('2d');
  function fmt(n){return '$'+n.toLocaleString('en-US')}
  function draw(){
    var p=+rPay.value,m=+rMes.value,total=p*m;
    vPay.textContent=fmt(p);
    vMes.textContent=m+' meses';
    capRes.textContent='Acumulado a '+m+' meses, con el payout que elegiste ('+fmt(p)+')';
    numRes.textContent=fmt(total);
    var dpr=devicePixelRatio||1,W=cv.clientWidth,H=cv.clientHeight;
    cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,W,H);
    var pad=10,padB=26,bx=(W-pad*2),by=(H-pad-padB);
    ctx.strokeStyle='rgba(9,10,7,.12)';ctx.lineWidth=1;
    for(var g=0;g<4;g++){var gy=pad+by*g/3;ctx.beginPath();ctx.moveTo(pad,gy);ctx.lineTo(W-pad,gy);ctx.stroke()}
    ctx.beginPath();
    for(var i=0;i<=m;i++){
      var x=pad+bx*i/m, y=(pad+by)-by*(i/m);
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle='#090A07';ctx.lineWidth=2.5;ctx.lineJoin='round';ctx.stroke();
    ctx.lineTo(pad+bx,pad+by);ctx.lineTo(pad,pad+by);ctx.closePath();
    ctx.fillStyle='rgba(201,168,76,.18)';ctx.fill();
    var ex=pad+bx,ey=pad;
    ctx.beginPath();ctx.arc(ex,ey,5,0,7);ctx.fillStyle='#C9A84C';ctx.fill();
    ctx.font='11px "IBM Plex Mono",monospace';ctx.fillStyle='#878D86';
    ctx.fillText('Hoy',pad,H-8);
    var lbl=m+' meses';ctx.fillText(lbl,W-pad-ctx.measureText(lbl).width,H-8);
  }
  rPay.addEventListener('input',draw);
  rMes.addEventListener('input',draw);
  addEventListener('resize',draw);
  requestAnimationFrame(draw);
})();

/* ── partículas del hero: estrella polar en oro y tinta ── */
(function(){
  var cv=document.getElementById('cvHero');if(!cv)return;
  var ctx=cv.getContext('2d'),pts=[],W,H;
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function targets(n){
    /* estrella de 4 puntas (la brújula NORTHPOINT), muestreada por rechazo */
    var out=[],cx=.5,cy=.5,R=.42;
    while(out.length<n){
      var x=Math.random(),y=Math.random();
      var dx=Math.abs(x-cx)/R,dy=Math.abs(y-cy)/R;
      var d=Math.pow(dx,.55)+Math.pow(dy,.55);   /* astroide: |x|^p+|y|^p */
      if(d>.86&&d<1.06)out.push([x,y]);
    }
    return out;
  }
  function size(){
    var dpr=devicePixelRatio||1;
    W=cv.clientWidth;H=cv.clientHeight;
    cv.width=W*dpr;cv.height=H*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  function init(){
    size();
    var tg=targets(420);
    pts=tg.map(function(t){
      return{
        tx:t[0]*W,ty:t[1]*H,
        x:Math.random()*W,y:Math.random()*H,
        j:Math.random()*6.28, s:.4+Math.random()*1.4,
        gold:Math.random()<.14
      };
    });
  }
  var t0=null;
  function frame(ts){
    if(t0===null)t0=ts;
    var k=Math.min(1,(ts-t0)/2600);       /* convergencia inicial */
    var e=1-Math.pow(1-k,3);
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<pts.length;i++){
      var p=pts[i];
      var wob=reduce?0:Math.sin(ts/1400+p.j)*2.2;
      var x=p.x+(p.tx-p.x)*e+wob, y=p.y+(p.ty-p.y)*e+Math.cos(ts/1600+p.j)*(reduce?0:2.2);
      ctx.beginPath();ctx.arc(x,y,p.s,0,7);
      ctx.fillStyle=p.gold?'#C9A84C':'rgba(9,10,7,.78)';
      ctx.fill();
    }
    if(!reduce||k<1)requestAnimationFrame(frame);
  }
  init();
  addEventListener('resize',init);
  requestAnimationFrame(frame);
})();

/* ── comunidad: constelación de puntos conectados ── */
(function(){
  var cv=document.getElementById('cvCom');if(!cv)return;
  var ctx=cv.getContext('2d'),W,H,pts=[];
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function init(){
    var dpr=devicePixelRatio||1;
    W=cv.clientWidth;H=cv.clientHeight;
    cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    pts=[];
    for(var i=0;i<26;i++)pts.push({
      x:Math.random()*W,y:Math.random()*H,
      vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,
      gold:Math.random()<.2
    });
  }
  function frame(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<pts.length;i++){
      var p=pts[i];
      if(!reduce){p.x+=p.vx;p.y+=p.vy;
        if(p.x<0||p.x>W)p.vx*=-1;
        if(p.y<0||p.y>H)p.vy*=-1;}
      for(var j=i+1;j<pts.length;j++){
        var q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=dx*dx+dy*dy;
        if(d<9000){
          ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
          ctx.strokeStyle='rgba(239,236,231,'+(0.16*(1-d/9000)).toFixed(3)+')';
          ctx.lineWidth=1;ctx.stroke();
        }
      }
    }
    for(var i2=0;i2<pts.length;i2++){
      var p2=pts[i2];
      ctx.beginPath();ctx.arc(p2.x,p2.y,p2.gold?2.4:1.6,0,7);
      ctx.fillStyle=p2.gold?'#C9A84C':'rgba(239,236,231,.7)';
      ctx.fill();
    }
    if(!reduce)requestAnimationFrame(frame);
  }
  init();
  addEventListener('resize',init);
  requestAnimationFrame(frame);
})();
