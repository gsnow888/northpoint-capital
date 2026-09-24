/* ============================================================
   family-office.html — script 1 de 1
   Extraído del JavaScript inline original (1 bloque(s) <script>, línea 831 del HTML original).
   Se carga en el MISMO punto del documento donde estaba: el orden respecto
   al HTML importa (los scripts sólo ven los elementos que ya existen arriba).
   ============================================================ */


/* ── NAV ── */
const nav=document.getElementById('nav');
addEventListener('scroll',()=>{nav.classList.toggle('nav-scrolled',scrollY>8)},{passive:true});
const ham=document.getElementById('ham'),navUl=document.getElementById('navUl');
ham.addEventListener('click',()=>{const open=navUl.classList.toggle('open');ham.setAttribute('aria-expanded',open)});

/* ── REVEAL ── */
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting)return;
  if(e.target.hasAttribute('data-stagger')){[...e.target.children].forEach((c,i)=>setTimeout(()=>c.classList.add('in'),i*90))}
  else e.target.classList.add('in');
  io.unobserve(e.target)})},{threshold:.12});
document.querySelectorAll('[data-reveal],[data-stagger]').forEach(el=>io.observe(el));

/* ── ESTRELLA DE PARTÍCULAS (reemplaza al toro) ── */
(function(){
  const cv=document.getElementById('starCanvas');if(!cv)return;
  const ctx=cv.getContext('2d');
  let W,H,parts=[],raf;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

  function starTargets(w,h){
    const off=document.createElement('canvas');off.width=w;off.height=h;
    const o=off.getContext('2d');
    const cx=w/2,cy=h/2,R=Math.min(w,h)*.46;
    function drawStar(r,rot){
      o.beginPath();
      for(let i=0;i<8;i++){
        const big=i%2===0, rad=big?r:r*.20, a=rot+i*Math.PI/4;
        const x=cx+Math.cos(a)*rad, y=cy+Math.sin(a)*rad;
        i?o.lineTo(x,y):o.moveTo(x,y);
      }
      o.closePath();o.fill();
    }
    o.fillStyle='#000';
    drawStar(R,-Math.PI/2);          // estrella principal N-S-E-O
    drawStar(R*.52,-Math.PI/2+Math.PI/4); // puntas diagonales cortas (rosa de los vientos)
    const img=o.getImageData(0,0,w,h).data, pts=[];
    const step=Math.max(3,Math.round(Math.min(w,h)/170));
    for(let y=0;y<h;y+=step)for(let x=0;x<w;x+=step){
      if(img[(y*w+x)*4+3]>120) pts.push([x+ (Math.random()-.5)*step, y+(Math.random()-.5)*step]);
    }
    return pts;
  }

  function build(){
    const r=cv.parentElement.getBoundingClientRect();
    const dpr=Math.min(2,devicePixelRatio||1);
    W=Math.round(r.width);H=Math.round(r.height);
    cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    const targets=starTargets(W,H);
    parts=targets.map(([tx,ty],i)=>({
      x:W/2+(Math.random()-.5)*W*1.15,
      y:H/2+(Math.random()-.5)*H*1.15,
      tx,ty,
      d:Math.random()*.55,                       // delay individual
      s:.9+Math.random()*1.5,                    // tamaño
      gold:Math.random()<.085,                   // flecos dorados
      ph:Math.random()*Math.PI*2,                // fase de vaivén
      sp:.5+Math.random()*.9,
      ox:0,oy:0                                  // empuje del cursor (con resorte)
    }));
  }

  /* el cursor aparta las partículas; al irse, regresan solas */
  let mx=-9999,my=-9999;
  cv.addEventListener('pointermove',e=>{
    const r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;
  });
  cv.addEventListener('pointerleave',()=>{mx=-9999;my=-9999});
  cv.addEventListener('touchend',()=>{mx=-9999;my=-9999});

  let t0=null;
  function frame(ts){
    if(t0===null)t0=ts;
    const t=(ts-t0)/1000;
    ctx.clearRect(0,0,W,H);
    for(const p of parts){
      const k=Math.min(1,Math.max(0,(t-p.d)/2.2));
      const e=1-Math.pow(1-k,3); // easeOutCubic
      const wob=reduced?0:1.6;
      const x=p.x+(p.tx-p.x)*e+Math.sin(t*p.sp+p.ph)*wob;
      const y=p.y+(p.ty-p.y)*e+Math.cos(t*p.sp*0.9+p.ph)*wob;
      if(!reduced){
        const dx=x+p.ox-mx, dy=y+p.oy-my, d2=dx*dx+dy*dy, R=110;
        if(d2<R*R){
          const d=Math.sqrt(d2)||1, f=(R-d)/R*5.5;
          p.ox+=dx/d*f; p.oy+=dy/d*f;
        }
        p.ox*=.88; p.oy*=.88;   // resorte de regreso
      }
      ctx.fillStyle=p.gold?'#C9A84C':'#090A07';
      ctx.globalAlpha=p.gold?.9:.82;
      ctx.beginPath();ctx.arc(x+p.ox,y+p.oy,p.s,0,7);ctx.fill();
    }
    ctx.globalAlpha=1;
    raf=requestAnimationFrame(frame);
  }
  function start(){cancelAnimationFrame(raf);t0=null;build();raf=requestAnimationFrame(frame)}
  start();
  let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(start,180)});
})();

/* ── CALCULADORA ── */
(function(){
  const cap=document.getElementById('cap-slider'),rate=document.getElementById('rate-slider');
  const capD=document.getElementById('capDisplay'),rateD=document.getElementById('rateDisplay');
  const line=document.getElementById('calcLine'),dot=document.getElementById('calcDot');
  const crVal=document.getElementById('crVal'),crLabel=document.getElementById('crLabel');
  function fmt(v){
    if(v>=1e6){const m=v/1e6;return '$'+(m>=10?m.toFixed(1):m.toFixed(2))+'M'}
    return '$'+Math.round(v/1e3)+'K';
  }
  function upd(){
    const C=+cap.value,r=+rate.value/100;
    capD.textContent=fmt(C)+' USD';
    rateD.textContent=(+rate.value).toFixed(1)+'%';
    const vals=[];for(let y=0;y<=20;y++)vals.push(C*Math.pow(1+r,y));
    const max=vals[20],min=vals[0];
    const pts=vals.map((v,i)=>{
      const x=12+i*(516/20);
      const y=150-((v-min)/(max-min||1))*126;
      return x.toFixed(1)+','+y.toFixed(1);
    });
    line.setAttribute('points',pts.join(' '));
    const last=pts[20].split(',');
    dot.setAttribute('cx',last[0]);dot.setAttribute('cy',last[1]);
    crVal.textContent=fmt(vals[20]);
    crLabel.textContent='A 20 años, con la tasa que elegiste ('+(+rate.value).toFixed(1)+'%)';
  }
  cap.addEventListener('input',upd);rate.addEventListener('input',upd);upd();
})();

/* ── CAPAS ── */
document.querySelectorAll('.lcard').forEach(c=>{
  const toggle=()=>{const on=c.classList.toggle('lcard-active');c.setAttribute('aria-expanded',on)};
  c.addEventListener('click',toggle);
  c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}});
});

/* ── FAQ ── */
document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const aw=q.nextElementSibling,open=aw.classList.toggle('open');
    q.setAttribute('aria-expanded',open);
    q.querySelector('.chevron').classList.toggle('open',open);
  });
});

/* ── LAPTOP TILT ── */
(function(){
  const obj=document.getElementById('tiltObj');if(!obj)return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  addEventListener('scroll',()=>{
    const r=obj.getBoundingClientRect();
    const vh=innerHeight,c=(r.top+r.height/2-vh/2)/vh; // -0.5..0.5 aprox
    obj.style.transform='rotateX('+(c*10).toFixed(2)+'deg) translateY('+(c*-14).toFixed(1)+'px)';
  },{passive:true});
})();

/* ── NEWSLETTER (mailto, sin backend) ── */
document.getElementById('nlForm').addEventListener('submit',e=>{
  e.preventDefault();
  const mail=e.target.email.value;
  location.href='mailto:andremacouzetruiz@gmail.com?subject=Newsletter%20NORTHPOINT&body='+encodeURIComponent('Quiero recibir la lectura semanal del Norte.\n\nMi correo: '+mail);
  document.getElementById('nlOk').hidden=false;
});
