/* ============================================================
   app.html — script 2 de 2
   Extraído del JavaScript inline original (1 bloque(s) <script>, línea 31003 del HTML original).
   Se carga en el MISMO punto del documento donde estaba: el orden respecto
   al HTML importa (los scripts sólo ven los elementos que ya existen arriba).
   ============================================================ */


/* ── Abrir una lección con su contenido extenso ── */
let lecAbierta = null;
function lecInfo(id){
  for(const p of ACADEMIA) for(const m of p.mods){
    const l = m.les.find(x=>x[0]===id);
    if(l) return { titulo: bi(l[1][0], l[1][1]), modulo: bi(m.t[0], m.t[1]) };
  }
  return { titulo:'', modulo:'' };
}
function marcaLecBtn(id){
  const b = $('#lecMarca'); if(!b) return;
  const hecha = lesHecha(id);
  b.textContent = hecha ? bi('✓ Vista','✓ Done') : bi('Marcar como vista','Mark as done');
  b.classList.toggle('hecha', hecha);
}
function abreLeccion(id){
  lecAbierta = id;
  const info = lecInfo(id);
  $('#lecCual').textContent = info.modulo + ' · ' + info.titulo;
  const html = (window.LECCIONES_HTML || {})[id];
  const cuerpo = html || `<div class="lec-cargando">
    <b style="color:var(--txt);font-size:16px">${esc(info.titulo)}</b><br><br>
    ${bi('El contenido de esta lección se está preparando.','This lesson\'s content is being prepared.')}</div>`;
  /* el cuaderno vive al LADO: en compu, el documento a la izquierda y la libreta
     a la derecha (columna fija que sigue mientras lees); en móvil, debajo. */
  const notasHtml = `<aside class="lec-side"><div class="lec-libreta-inline" id="lecLibretaBox"></div>
    <div class="nb-draw" style="margin-top:12px"><canvas id="lecDibujo"></canvas></div>
    <div class="nb-draw-acc"><div class="nb-colors" id="nbColors"></div>
      <button type="button" class="btn xs" id="lecDibLimpia">${bi('Borrar boceto','Clear sketch')}</button></div>
    <div class="nb-imgs" id="lecImgs" style="margin-top:10px"></div>
    <p class="micro" style="color:var(--faint);margin:6px 0 0">${bi('Pega (Ctrl/⌘+V) una captura aquí mientras lees','Paste (Ctrl/⌘+V) a screenshot here while you read')}</p>
  </aside>`;
  $('#lecScroll').innerHTML = `<div class="lec-split"><div class="lec-doc">${cuerpo}</div>${notasHtml}</div>`;
  $('#lecScroll').scrollTop = 0;
  $('#lecMarca').style.display = '';
  marcaLecBtn(id);
  montaLibretaInline($('#lecLibretaBox'));
  initLecDibujo(id);
  renderLecImgs(id);
  $('#ovLeccion').classList.add('on');
  document.body.style.overflow = 'hidden';
}
/* ── DIBUJAR en la libreta ── */
let lecDibColor = '#e6e6e6';
function initLecDibujo(id){
  const cv = $('#lecDibujo'); if(!cv) return;
  const wrap = cv.parentElement, dpr = devicePixelRatio||1;
  const W = wrap.clientWidth || 300, H = 190;
  cv.width = W*dpr; cv.height = H*dpr;
  const ctx = cv.getContext('2d'); ctx.scale(dpr,dpr);
  ctx.lineCap='round'; ctx.lineJoin='round';
  /* cargar el boceto guardado */
  const prev = nbEstado().dibujos[id];
  if(prev){ const img=new Image(); img.onload=()=>ctx.drawImage(img,0,0,W,H); img.src=prev; }
  /* paleta de colores */
  const cont = $('#nbColors');
  if(cont){ cont.innerHTML=''; ['#e6e6e6','#30d158','#4da3ff','#ffd24a','#ff5a5a','#c88cff'].forEach(col=>{
    const b=document.createElement('button'); b.type='button'; b.className='nb-color'+(col===lecDibColor?' on':''); b.style.background=col;
    b.onclick=()=>{ lecDibColor=col; cont.querySelectorAll('.nb-color').forEach(x=>x.classList.toggle('on',x===b)); };
    cont.appendChild(b); }); }
  let dib=false,last=null;
  const pos=e=>{ const r=cv.getBoundingClientRect(); const p=e.touches?e.touches[0]:e; return [p.clientX-r.left,p.clientY-r.top]; };
  const start=e=>{ dib=true; last=pos(e); e.preventDefault(); };
  const move=e=>{ if(!dib) return; const p=pos(e); ctx.strokeStyle=lecDibColor; ctx.lineWidth=2.4; ctx.beginPath(); ctx.moveTo(last[0],last[1]); ctx.lineTo(p[0],p[1]); ctx.stroke(); last=p; e.preventDefault(); };
  const end=()=>{ if(dib){ dib=false; nbEstado().dibujos[id]=cv.toDataURL('image/png'); save(); } };
  cv.addEventListener('mousedown',start); cv.addEventListener('mousemove',move); window.addEventListener('mouseup',end);
  cv.addEventListener('touchstart',start,{passive:false}); cv.addEventListener('touchmove',move,{passive:false}); cv.addEventListener('touchend',end);
  $('#lecDibLimpia')?.addEventListener('click', ()=>{ ctx.clearRect(0,0,W,H); nbEstado().dibujos[id]=null; save(); });
}
/* ── CAPTURAS/imágenes en la libreta ── */
function agregaLecImg(id, file){
  const rd = new FileReader();
  rd.onload = () => { const nb=nbEstado(); nb.imgs[id]=nb.imgs[id]||[]; nb.imgs[id].push(rd.result); save(); renderLecImgs(id); };
  rd.readAsDataURL(file);
}
function renderLecImgs(id){
  const cont = $('#lecImgs'); if(!cont) return;
  const imgs = nbEstado().imgs[id] || [];
  cont.innerHTML = imgs.map((src,i)=>`<div class="nb-img"><img src="${src}" alt="" data-ver="${i}"><button type="button" class="nb-img-x" data-del="${i}" aria-label="Quitar">×</button></div>`).join('') || `<div class="nb-imgs-vacio">${bi('Sin capturas todavía','No screenshots yet')}</div>`;
  cont.querySelectorAll('[data-del]').forEach(b=> b.onclick=()=>{ const nb=nbEstado(); nb.imgs[id].splice(+b.dataset.del,1); save(); renderLecImgs(id); });
  cont.querySelectorAll('[data-ver]').forEach(im=> im.onclick=()=>{ window.open(imgs[+im.dataset.ver],'_blank'); });
}
/* pegar una captura con Ctrl/⌘+V mientras la lección está abierta */
document.addEventListener('paste', e => {
  if(!lecAbierta) return;
  const items = e.clipboardData && e.clipboardData.items; if(!items) return;
  for(const it of items){ if(it.type && it.type.indexOf('image')===0){ const f=it.getAsFile(); if(f){ agregaLecImg(lecAbierta, f); e.preventDefault(); return; } } }
});
function cierraLeccion(){
  $('#ovLeccion').classList.remove('on');
  document.body.style.overflow = '';
  lecAbierta = null;
  if($('#v-academia') && $('#v-academia').classList.contains('on')) renderAcademia();
}
/* Abrir una hoja de análisis del portafolio (o un modo de entrada) en el mismo
   visor de lecciones, pero sin el botón de "marcar como vista". */
function abrePortDoc(sub, nombre, html){
  $('#lecCual').textContent = sub;
  const conTitulo = html.replace('<div class="lec">', `<div class="lec"><h1 class="lec-h1">${esc(nombre)}</h1>`);
  $('#lecScroll').innerHTML = conTitulo;
  $('#lecScroll').scrollTop = 0;
  $('#lecMarca').style.display = 'none';
  lecAbierta = null;
  $('#ovLeccion').classList.add('on');
  document.body.style.overflow = 'hidden';
}
function abreClase(id){
  const P = window.PORTFOLIO_ANALISIS; if(!P) return;
  const c = P.clases.find(x => x.id === id); if(!c) return;
  abrePortDoc(bi('Portafolio · por qué la recomendamos','Portfolio · why we recommend it'), c.nombre, c.html);
}
function abreEntrada(id){
  const P = window.PORTFOLIO_ANALISIS; if(!P) return;
  const e = P.entradas.find(x => x.id === id); if(!e) return;
  abrePortDoc(bi('Cómo entrar al mercado','How to enter the market'), e.nombre, e.html);
}
$('#lecVolver').addEventListener('click', cierraLeccion);
$('#lecMarca').addEventListener('click', () => {
  if(!lecAbierta) return;
  acadEstado().hechas[lecAbierta] = !acadEstado().hechas[lecAbierta];
  save(); marcaLecBtn(lecAbierta);
});
document.addEventListener('keydown', e => { if(e.key==='Escape' && lecAbierta) cierraLeccion(); });
