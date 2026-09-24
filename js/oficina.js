/* ============================================================
   oficina.html — script 1 de 1
   Extraído del JavaScript inline original (1 bloque(s) <script>, línea 810 del HTML original).
   Se carga en el MISMO punto del documento donde estaba: el orden respecto
   al HTML importa (los scripts sólo ven los elementos que ya existen arriba).
   ============================================================ */


'use strict';
/* ════ LA OFICINA · motor ════ */
var K='np_oficina_v1';
var K_REAL='np_oficina_real_v1';   /* aquí se apartan los datos reales mientras corre el demo */
/* colores de DATOS validados (CVD-safe sobre #EDEAE2, seis checks en verde) —
   los pasteles de marca quedan para acentos de UI, nunca para codificar datos */
var CAPAS=[
  {k:'liquidez', n:'Liquidez',        s:'CAPA 01 · EFECTIVO Y EQUIVALENTES', c:'#4A90D9', cD:'#10A87E', meta:10},
  {k:'retiro',   n:'Retiro',          s:'CAPA 02 · CUENTAS DE RETIRO',       c:'#B8862B', cD:'#8F63DE', meta:15},
  {k:'pasivos',  n:'Ingresos pasivos',s:'CAPA 03 · INMUEBLES Y FLUJO',       c:'#128A52', cD:'#D97434', meta:20},
  {k:'acciones', n:'Acciones',        s:'CAPA 04 · RENTA VARIABLE',          c:'#5D3FD3', cD:'#3E93D6', meta:45},
  {k:'alt',      n:'Alternativos',    s:'CAPA 05 · PRIVADOS Y REALES',       c:'#B04A6F', cD:'#DE4A8C', meta:10}
];
var CAPA_BY={}; CAPAS.forEach(function(c){CAPA_BY[c.k]=c});
/* cada tema con su paleta validada: heritage sobre crema, viva sobre negro */
function esNegro(){ return typeof S!=='undefined' && S && S.tema!=='blanco'; }
function capaCol(c){ return esNegro()? (c.cD||c.c) : c.c; }
function cInk(a){ return esNegro()? 'rgba(239,236,231,'+a+')' : 'rgba(18,19,12,'+a+')'; }
function cGlass(a){ return esNegro()? 'rgba(255,255,255,'+a+')' : 'rgba(16,17,10,'+a+')'; }
function cAnillo(){ return esNegro()? '#0E0F0C' : '#FBFAF6'; }

function fresh(){
  var metas={}; CAPAS.forEach(function(c){metas[c.k]=c.meta});
  return {v:1,demo:false,fx:17,fxFecha:null,gasto:0,ultimoExport:null,
          aporta:10000,ingreso:100000,tasa:4,tema:'negro',temaElegido:false,
          metas:metas,activos:[],deudas:[],cortes:[],chat:[]};
}
/* saneador: TODO lo que entra de fuera (localStorage o un archivo importado)
   pasa por aquí — tipos forzados, ids regenerados, listas acotadas. Sin esto,
   un respaldo malicioso podía inyectar HTML o brickear la app al recargar. */
function num(v,d){ v=(typeof v==='string')?parseFloat(v):v; return (typeof v==='number'&&isFinite(v))?v:d; }
function fechaOk(v){ v=String(v||''); return /^\d{4}-\d{2}-\d{2}$/.test(v)?v:null; }
function sanea(p){
  var s=fresh();
  if(!p||typeof p!=='object') return s;
  s.demo=p.demo===true;
  s.fx=Math.max(1,num(p.fx,17));
  s.aporta=Math.max(0,num(p.aporta,10000));
  s.ingreso=Math.max(0,num(p.ingreso,100000));
  s.tasa=Math.min(15,Math.max(0,num(p.tasa,4)));
  s.gasto=Math.max(0,num(p.gasto,0));
  s.fxFecha=fechaOk(p.fxFecha);
  s.ultimoExport=fechaOk(p.ultimoExport);
  s.temaElegido= p.temaElegido===true;
  /* el blanco guardado solo vale si el cliente lo ELIGIÓ en Personalizar;
     el default viejo guardado en localStorage se migra a negro */
  s.tema= (s.temaElegido && p.tema==='blanco')? 'blanco':'negro';
  if(Array.isArray(p.chat)) s.chat=p.chat.filter(function(m){return m&&typeof m.txt==='string';}).slice(-80)
    .map(function(m){return {f:fechaOk(m.f)||hoyISO(), de:m.de==='analista'?'analista':'cliente', txt:String(m.txt).slice(0,600)};});
  if(p.metas&&typeof p.metas==='object'){
    CAPAS.forEach(function(c){ s.metas[c.k]=Math.min(100,Math.max(0,num(p.metas[c.k],c.meta))); });
  }
  if(Array.isArray(p.activos)){
    s.activos=p.activos.filter(function(x){return x&&typeof x==='object'}).slice(0,500).map(function(x){
      return {id:uid(),nombre:String(x.nombre||'Sin nombre').slice(0,60),
        inst:String(x.inst||'').slice(0,60),
        capa:CAPA_BY[x.capa]?String(x.capa):CAPAS[0].k,
        moneda:x.moneda==='USD'?'USD':'MXN',valor:Math.max(0,num(x.valor,0)),
        lib:x.lib!==false, act:fechaOk(x.act),
        titular:String(x.titular||'').slice(0,40),
        veh:['directo','copropiedad','empresa','fideicomiso'].indexOf(x.veh)>=0?x.veh:'directo',
        benef:['si','no','na'].indexOf(x.benef)>=0?x.benef:'',
        benefNombre:String(x.benefNombre||'').slice(0,40),
        doc:String(x.doc||'').slice(0,60),
        hist:Array.isArray(x.hist)? x.hist.filter(function(h){return h&&fechaOk(h.f)&&isFinite(num(h.v,NaN));})
          .slice(-36).map(function(h){return {f:h.f, v:Math.max(0,num(h.v,0))};}):[]};
    });
  }
  if(Array.isArray(p.deudas)){
    s.deudas=p.deudas.filter(function(x){return x&&typeof x==='object'}).slice(0,200).map(function(x){
      return {id:uid(),nombre:String(x.nombre||'Sin nombre').slice(0,60),
        moneda:x.moneda==='USD'?'USD':'MXN',valor:Math.max(0,num(x.valor,0)),
        tasa:Math.min(200,Math.max(0,num(x.tasa,0))),pago:Math.max(0,num(x.pago,0)),
        act:fechaOk(x.act),titular:String(x.titular||'').slice(0,40)};
    });
  }
  if(Array.isArray(p.cortes)){
    s.cortes=p.cortes.filter(function(c){
      return c&&typeof c==='object'&&/^\d{4}-\d{2}-\d{2}$/.test(String(c.f))&&isFinite(num(c.v,NaN));
    }).slice(-240).map(function(c){
      var o={f:String(c.f),v:num(c.v,0)};
      if(isFinite(num(c.act,NaN))) o.act=num(c.act,0);
      if(isFinite(num(c.deu,NaN))) o.deu=num(c.deu,0);
      if(isFinite(num(c.fx,NaN))) o.fx=num(c.fx,0);
      if(c.capas&&typeof c.capas==='object'){
        o.capas={}; CAPAS.forEach(function(k){ if(isFinite(num(c.capas[k.k],NaN))) o.capas[k.k]=num(c.capas[k.k],0); });
      }
      return o;
    });
    s.cortes.sort(function(a,b){return a.f<b.f?-1:1});
  }
  return s;
}
var S=fresh();
try{ var raw=localStorage.getItem(K); if(raw){ S=sanea(JSON.parse(raw)); save(); } }catch(e){}

var saveFallo=false;
function save(){
  try{ localStorage.setItem(K,JSON.stringify(S)); }
  catch(e){
    saveFallo=true;
    toast('⚠ NO PUDE GUARDAR EN ESTE NAVEGADOR — EXPORTA TU RESPALDO YA');
  }
}
function uid(){ return Math.random().toString(36).slice(2,9); }
function mxn(v){
  var n=Math.round(v);
  var abs=Math.abs(n).toLocaleString('en-US');
  return (n<0?'−$':'$')+abs;
}
function enMXN(x){ return x.moneda==='USD' ? x.valor*S.fx : x.valor; }
function hoyISO(){ var h=new Date(); return h.getFullYear()+'-'+String(h.getMonth()+1).padStart(2,'0')+'-'+String(h.getDate()).padStart(2,'0'); }
var MES_C=['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
function fCorta(iso){ if(!iso)return ''; var p=iso.split('-'); return parseInt(p[2],10)+' '+MES_C[parseInt(p[1],10)-1]; }
function diasDesde(iso){ if(!iso)return null; return Math.round((new Date(hoyISO())-new Date(iso))/864e5); }
function invertibleLib(){ return S.activos.reduce(function(a,x){return a+(x.lib!==false?enMXN(x):0)},0)-totalDeudas(); }
function totalActivos(){ return S.activos.reduce(function(a,x){return a+enMXN(x)},0); }
function totalDeudas(){ return S.deudas.reduce(function(a,x){return a+enMXN(x)},0); }
function porCapa(){
  var m={}; CAPAS.forEach(function(c){m[c.k]=0});
  S.activos.forEach(function(x){ if(m[x.capa]==null)m[x.capa]=0; m[x.capa]+=enMXN(x); });
  return m;
}

/* ── render ── */
function $(id){return document.getElementById(id)}

function render(){
  autoFotoMensual();
  var act=totalActivos(), deu=totalDeudas(), neto=act-deu;
  document.body.classList.toggle('vacia', S.activos.length===0 && S.deudas.length===0 && !S.demo);
  document.body.classList.toggle('demo', !!S.demo);
  $('btnDemo').textContent = S.demo ? 'Salir del demo' : 'Modo demo';

  $('netoBig').innerHTML=mxn(neto)+'<small>MXN</small>';
  $('netoSub').innerHTML='Tienes <b>'+mxn(act)+'</b> · Debes <i>'+mxn(deu)+'</i>';

  /* líneas informativas del resumen */
  $('netoExtra').innerHTML='';

  /* chip de respaldo en el sidebar */
  var cr=$('chipResp');
  if(saveFallo){
    cr.style.display='block'; cr.style.color='var(--rojo)'; cr.style.borderColor='var(--rojo)';
    cr.textContent='NO SE PUDO GUARDAR — EXPORTA YA';
  } else if(!S.demo && S.activos.length){
    var de=S.ultimoExport?diasDesde(S.ultimoExport):null;
    if(de===null){ cr.style.display='block'; cr.style.color='var(--rojo)'; cr.style.borderColor='var(--rojo)'; cr.textContent='SIN RESPALDO — EXPORTAR AHORA'; }
    else if(de>30){ cr.style.display='block'; cr.style.color='var(--dim)'; cr.style.borderColor='var(--borde)'; cr.textContent='RESPALDO: HACE '+de+' DÍAS'; }
    else cr.style.display='none';
  } else cr.style.display='none';
  $('ultExp').textContent= S.ultimoExport? 'Último respaldo: '+fCorta(S.ultimoExport)+' '+S.ultimoExport.slice(0,4) : 'Nunca has exportado un respaldo.';
  $('fxNota').textContent= S.fxFecha? 'Fijado el '+fCorta(S.fxFecha)+'. Referencia: el FIX de Banxico.' : 'Tecléalo tú — referencia: el FIX de Banxico.';

  sysDatos(); sysLeyendaR();
  renderSeg(); renderPlan(); renderLibertad(); renderListas(); renderCortes(); renderSpark(); renderChat(); aplicaTema();
  $('sistemaCard').style.display= S.activos.length? 'block':'none';
  if(REDUCIDO){ dibujaSistema(0); dibujaFlujo(0); }
}

function renderSeg(){
  $('mareasTot').textContent=mxn(totalActivos());
  dibujaMareas(REDUCIDO?0:performance.now()/1000);
}

/* ── concentración: tres números propios, sin juicios ── */
/* ── historial de cortes ── *//* ── historial de cortes ── */
function renderCortes(){
  var card=$('histCortes'), el=$('listaCortes');
  if(!S.cortes.length){ card.style.display='none'; return; }
  card.style.display='block';
  var filas=S.cortes.slice().reverse().map(function(c,idx,arr){
    var prev=arr[idx+1];
    var delta= prev? c.v-prev.v : null;
    var dTxt= delta===null? '' : '<small class="'+(delta>=0?'mintTxt':'rojoTxt')+'">'+(delta>=0?'+':'')+mxn(delta)+' VS TU FOTO ANTERIOR</small>';
    return '<div class="item" style="grid-template-columns:14px 1fr auto auto"><u style="background:'+cGlass(0.4)+'"></u>'
      +'<span class="nom"><b>'+fCorta(c.f)+' '+c.f.slice(0,4)+'</b>'+dTxt+'</span>'
      +'<span class="val">'+mxn(c.v)+'</span>'
      +'<span class="ops"><button class="op rojo" data-delc="'+esc(c.f)+'" aria-label="Eliminar foto">×</button></span></div>';
  }).join('');
  el.innerHTML=filas;
  el.querySelectorAll('[data-delc]').forEach(function(b){b.addEventListener('click',function(){
    var f=b.getAttribute('data-delc');
    if(!confirm('¿Eliminar la foto del '+f+'?'))return;
    S.cortes=S.cortes.filter(function(c){return c.f!==f}); save(); render();
    toast('Foto eliminada');
  })});
}

function renderPlan(){
  var M=Math.max(0,S.aporta||0);
  var m=porCapa(), act=totalActivos(), futuro=act+M;
  var sumaMetas=CAPAS.reduce(function(a,c){return a+(S.metas[c.k]||0)},0);
  if(sumaMetas<=0 || (!act && !M)){
    $('planRows').innerHTML='<div class="vacio">Tu asesor NORTHPOINT está preparando tu plan.</div>';
    $('planSeg').innerHTML='<i style="flex:1;background:'+cGlass(0.08)+'"></i>';
    flujoDatos(0,[0,0,0,0,0]);
    return;
  }
  /* la misma aritmética de siempre: brecha de cada capa contra su referencia */
  var brechas=CAPAS.map(function(c){
    var objetivo=futuro*(S.metas[c.k]||0)/sumaMetas;
    return Math.max(0, objetivo-(m[c.k]||0));
  });
  var tb=brechas.reduce(function(a,b){return a+b},0);
  var asig=CAPAS.map(function(c,i){
    if(M===0) return 0;
    if(tb>0.005) return M*brechas[i]/tb;
    return M*(S.metas[c.k]||0)/sumaMetas;
  });
  var red=asig.map(function(v){return Math.floor(v)});
  var resto=Math.round(M-red.reduce(function(a,b){return a+b},0));
  if(resto>0){ var mx=0; asig.forEach(function(v,i){ if(v>asig[mx])mx=i }); red[mx]+=resto; }
  var maxA=Math.max.apply(null,red.concat([1]));
  $('planSeg').innerHTML= M>0
    ? CAPAS.map(function(c,i){ return red[i]>0?'<i data-tip="'+c.n+' — '+mxn(red[i])+'" style="flex:'+red[i]+';background:'+capaCol(c)+'"></i>':'' }).join('')
      ||'<i style="flex:1;background:'+cGlass(0.08)+'"></i>'
    : '<i style="flex:1;background:'+cGlass(0.08)+'"></i>';
  flujoDatos(M,red);
  if(document.body.getAttribute('data-v')==='plan') dibujaFlujo(0);
  $('planRows').innerHTML=CAPAS.map(function(c,i){
    return '<div class="plan-row"><u style="background:'+capaCol(c)+'"></u>'
      +'<span>'+c.n+'<span class="bar"><i style="width:'+(red[i]/maxA*100)+'%;background:'+capaCol(c)+'"></i></span></span>'
      +'<span class="monto">'+mxn(red[i])+'</span></div>';
  }).join('');
}

function renderLibertad(){
  var base=Math.max(0, invertibleLib());   /* solo activos marcados «cuenta para libertad» */
  var M=Math.max(0,S.aporta||0);
  $('tasaVal').textContent=S.tasa.toFixed(1)+'%';
  if(base<=0 && M<=0){
    $('libIntro').innerHTML='<span class="num-de">Registra tus activos o escribe tu aportación arriba — y aquí ves a dónde te lleva el plan.</span>';
    $('camino').innerHTML=''; $('libHitos').innerHTML='';
    return;
  }
  /* proyección mensual: la misma aportación del plan, a la tasa real elegida */
  var r=Math.pow(1+S.tasa/100,1/12)-1, serie=[], v=base;
  for(var mes=0; mes<=240; mes++){ if(mes>0) v=v*(1+r)+M; if(mes%3===0) serie.push({m:mes, v:v}); }
  $('libIntro').innerHTML='Hoy tienes <b>'+mxn(base)+'</b> invertibles. Siguiendo el plan — <b>'+mxn(M)+' al mes</b> — así crecería:';
  dibujaCamino(serie);
  var hz=[5,10,20].map(function(a){ var p=serie[a*4]; return {a:a, v:p.v, ret:p.v*0.04/12}; });
  $('libHitos').innerHTML=hz.map(function(h){
    return '<div class="hz"><span class="hz-a">En '+h.a+' años</span>'
      +'<span class="hz-det"><b>'+esc(mxnC(h.v))+'</b><small>alcanzaría para retirar ≈ '+esc(mxn(Math.round(h.ret/1000)*1000))+' al mes — regla del 4%</small></span></div>';
  }).join('');
}
/* el camino: una ruta con tus hitos y tu posición */
function dibujaCamino(serie){
  var host=$('camino'); if(!host) return;
  if(document.body.getAttribute('data-v')!=='plan'){ return; }
  if(!serie || serie.length<2){ host.innerHTML=''; return; }
  var W=Math.round(host.clientWidth||host.getBoundingClientRect().width);
  if(!W){ requestAnimationFrame(function(){ dibujaCamino(serie); }); return; }
  var H=200, padL=8, padR=16, top=18, baseY=H-30;
  var vals=serie.map(function(p){return p.v;});
  var mn=Math.min.apply(null,vals), mx=Math.max.apply(null,vals); if(mx===mn) mx+=1;
  var mTot=serie[serie.length-1].m;
  function X(i){ return padL+(serie[i].m/mTot)*(W-padL-padR); }
  function Y(v){ return top+(1-(v-mn)/(mx-mn))*(baseY-top); }
  var d='M'+X(0).toFixed(1)+' '+Y(vals[0]).toFixed(1);
  for(var i=0;i<serie.length-1;i++){
    var x0=X(Math.max(0,i-1)), y0=Y(vals[Math.max(0,i-1)]);
    var x1=X(i), y1=Y(vals[i]), x2=X(i+1), y2=Y(vals[i+1]);
    var x3=X(Math.min(serie.length-1,i+2)), y3=Y(vals[Math.min(serie.length-1,i+2)]);
    d+=' C'+(x1+(x2-x0)/6).toFixed(1)+' '+(y1+(y2-y0)/6).toFixed(1)+' '+(x2-(x3-x1)/6).toFixed(1)+' '+(y2-(y3-y1)/6).toFixed(1)+' '+x2.toFixed(1)+' '+y2.toFixed(1);
  }
  var area=d+' L'+X(serie.length-1).toFixed(1)+' '+baseY+' L'+X(0).toFixed(1)+' '+baseY+' Z';
  var s='<svg viewBox="0 0 '+W+' '+H+'" width="100%" height="'+H+'" class="camino-svg" role="img" aria-label="Proyección hipotética de tu patrimonio si sigues el plan">';
  s+='<defs><linearGradient id="camG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5546F0" stop-opacity="0.22"/><stop offset="1" stop-color="#5546F0" stop-opacity="0"/></linearGradient></defs>';
  s+='<line x1="'+padL+'" y1="'+baseY+'" x2="'+(W-padR)+'" y2="'+baseY+'" stroke="rgba(18,19,12,.14)"/>';
  s+='<path d="'+area+'" fill="url(#camG)"/>';
  s+='<path d="'+d+'" fill="none" stroke="#5546F0" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
  /* hoy + los tres horizontes, anclados en la curva */
  [[0,'HOY'],[20,'5 AÑOS'],[40,'10 AÑOS'],[80,'20 AÑOS']].forEach(function(hh){
    var i2=hh[0], px=X(i2), py=Y(vals[i2]);
    s+='<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="'+(i2===0?5:6)+'" fill="#5546F0" stroke="#FFFFFF" stroke-width="2"><title>'+esc(hh[1]+' — '+mxn(vals[i2]))+'</title></circle>';
    s+='<text x="'+px.toFixed(1)+'" y="'+(H-8)+'" text-anchor="'+(i2===0?'start':(i2===80?'end':'middle'))+'" class="ev-mes">'+hh[1]+'</text>';
  });
  s+='</svg>';
  host.innerHTML=s;
}

function renderListas(){
  var la=$('listaActivos');
  la.innerHTML= S.activos.length===0
    ? '<div class="vacio">Tu asesor NORTHPOINT está preparando tu portafolio. Aquí verás cada activo con su detalle.</div>'
    : S.activos.map(function(x){
        var c=CAPA_BY[x.capa]||CAPAS[0];
        var linea2=esc(x.inst||'')+(x.inst?' · ':'')+c.n.toUpperCase()
          +(x.titular?' · '+esc(x.titular).toUpperCase():'')
          +(x.lib===false?' · FUERA DE LIBERTAD':'');
        var fresc='';
        if(x.act){
          var dv=diasDesde(x.act);
          fresc= dv>365
            ? '<small class="rosaTxt">VALOR DE HACE '+Math.round(dv/30.44)+' MESES</small>'
            : '<small>ACT. '+fCorta(x.act)+'</small>';
        }
        return '<div class="item"><u style="background:'+capaCol(c)+'"></u>'
          +'<span class="nom"><b>'+esc(x.nombre)+'</b><small>'+linea2+'</small>'+fresc+'</span>'
          +'<span class="val">'+mxn(enMXN(x))+(x.moneda==='USD'?'<small>US$'+x.valor.toLocaleString('en-US')+'</small>':'')+'</span></div>';
      }).join('');
  $('totActivos').textContent=mxn(totalActivos());
}

function mxnC(v){
  var a=Math.abs(v);
  if(a>=1e6) return (v<0?'\u2212$':'$')+(a/1e6).toFixed(2)+'M';
  if(a>=1e3) return (v<0?'\u2212$':'$')+Math.round(a/1e3)+'K';
  return mxn(v);
}
function fMesA(iso){ var p=iso.split('-'); return MES_C[parseInt(p[1],10)-1]+' '+p[0]; }
function renderSpark(){
  var host=$('spark'); if(!host) return;
  var pts=S.cortes.slice(-24);
  if(pts.length>=2){
    var pa=pts[0].v, pb=pts[pts.length-1].v;
    var pc= pa!==0? (pb-pa)/Math.abs(pa)*100 : 0;
    $('sparkRango').textContent=mxnC(pa)+' → '+mxnC(pb);
    var ch=$('sparkChip'); ch.hidden=false;
    ch.textContent=(pc>=0?'▲ +':'▼ ')+pc.toFixed(1)+'%';
    ch.classList.toggle('baja',pc<0);
    $('fotoHint').hidden=true;
  } else {
    $('sparkRango').textContent='—'; $('sparkChip').hidden=true;
    $('fotoHint').hidden=false;
  }
  if(pts.length<2){
    host.innerHTML='<div class="spark-vacio">'+(pts.length?'Una foto más y aparece tu curva.':'La curva nace con dos fotos.')+'</div>';
    return;
  }
  var W=Math.round(host.clientWidth||host.getBoundingClientRect().width);
  if(!W){ if(document.body.getAttribute('data-v')==='resumen') requestAnimationFrame(renderSpark); return; }
  var H=160, padL=10, padR=14, top=30, base=H-26;
  var vals=pts.map(function(p){return p.v;});
  var mn=Math.min.apply(null,vals), mx=Math.max.apply(null,vals); if(mx===mn) mx+=1;
  function X(i){ return padL+i/(pts.length-1)*(W-padL-padR); }
  function Y(v){ return top+(1-(v-mn)/(mx-mn))*(base-top); }
  /* curva suave (catmull-rom → bezier) */
  var d='M'+X(0).toFixed(1)+' '+Y(vals[0]).toFixed(1);
  for(var i=0;i<pts.length-1;i++){
    var x0=X(Math.max(0,i-1)), y0=Y(vals[Math.max(0,i-1)]);
    var x1=X(i), y1=Y(vals[i]);
    var x2=X(i+1), y2=Y(vals[i+1]);
    var x3=X(Math.min(pts.length-1,i+2)), y3=Y(vals[Math.min(pts.length-1,i+2)]);
    var c1x=x1+(x2-x0)/6, c1y=y1+(y2-y0)/6, c2x=x2-(x3-x1)/6, c2y=y2-(y3-y1)/6;
    d+=' C'+c1x.toFixed(1)+' '+c1y.toFixed(1)+' '+c2x.toFixed(1)+' '+c2y.toFixed(1)+' '+x2.toFixed(1)+' '+y2.toFixed(1);
  }
  var area=d+' L'+X(pts.length-1).toFixed(1)+' '+base+' L'+X(0).toFixed(1)+' '+base+' Z';
  var s='<svg viewBox="0 0 '+W+' '+H+'" width="100%" height="'+H+'" class="ev-svg" role="img" aria-label="Evolución de tu patrimonio neto, foto a foto">';
  s+='<defs><linearGradient id="evG" x1="0" y1="0" x2="0" y2="1">'
    +'<stop offset="0" stop-color="#5546F0" stop-opacity="0.22"/><stop offset="1" stop-color="#5546F0" stop-opacity="0"/></linearGradient></defs>';
  s+='<line x1="'+padL+'" y1="'+base+'" x2="'+(W-padR)+'" y2="'+base+'" stroke="rgba(18,19,12,.14)"/>';
  s+='<path d="'+area+'" fill="url(#evG)"/>';
  s+='<path d="'+d+'" fill="none" stroke="#5546F0" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
  pts.forEach(function(p,i){
    s+='<circle cx="'+X(i).toFixed(1)+'" cy="'+Y(p.v).toFixed(1)+'" r="'+(i===pts.length-1?5:2.6)+'" fill="#5546F0" stroke="#FFFFFF" stroke-width="'+(i===pts.length-1?2:1.2)+'">'
      +'<title>'+esc(fMesA(p.f)+' — '+mxn(p.v))+'</title></circle>';
  });
  /* chip del último valor */
  var lx=X(pts.length-1), ly=Y(vals[vals.length-1]);
  var txt=mxnC(vals[vals.length-1]), cw=txt.length*7.5+16, cxp=Math.min(W-padR-cw, Math.max(padL, lx-cw+8));
  s+='<rect x="'+cxp.toFixed(1)+'" y="'+(ly-30).toFixed(1)+'" width="'+cw.toFixed(1)+'" height="20" rx="10" fill="#101109"/>';
  s+='<text x="'+(cxp+cw/2).toFixed(1)+'" y="'+(ly-16).toFixed(1)+'" text-anchor="middle" class="ev-chip">'+esc(txt)+'</text>';
  /* meses en el eje */
  var mIdx=[0, Math.floor((pts.length-1)/2), pts.length-1];
  mIdx.forEach(function(i,k){
    var anchor= k===0?'start': k===2?'end':'middle';
    s+='<text x="'+X(i).toFixed(1)+'" y="'+(H-8)+'" text-anchor="'+anchor+'" class="ev-mes">'+esc(fMesA(pts[i].f))+'</text>';
  });
  s+='</svg>';
  host.innerHTML=s;
}

function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(ch){
  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]; }); }

/* ── formas ── */
var editando=null, editTipo=null;
function cerrarFormas(){
  $('formActivo').classList.remove('abierto');
  var fd=$('formDeuda'); if(fd) fd.classList.remove('abierto');
  editando=null; editTipo=null;
}
function abrirForma(tipo, item){
  cerrarFormas();
  editando=item||null; editTipo=tipo;
  var f= tipo==='activo'? $('formActivo') : $('formDeuda');
  f.classList.add('abierto');
  if(tipo==='activo'){
    f.nombre.value=item?item.nombre:''; f.inst.value=item?(item.inst||''):'';
    f.capa.value=item?item.capa:CAPAS[0].k; f.moneda.value=item?item.moneda:'MXN';
    f.valor.value=item?item.valor:'';
    f.titular.value=item?(item.titular||''):''; f.veh.value=item?(item.veh||'directo'):'directo';
    f.benef.value=item?(item.benef||''):''; f.benefNombre.value=item?(item.benefNombre||''):'';
    f.doc.value=item?(item.doc||''):''; f.lib.checked= item? item.lib!==false : true;
    $('faFam').open= !!(item && ((item.titular||'')||(item.benef||'')||(item.benefNombre||'')||(item.doc||'')||(item.veh&&item.veh!=='directo')));
  }else{
    f.nombre.value=item?item.nombre:''; f.moneda.value=item?item.moneda:'MXN';
    f.valor.value=item?item.valor:'';
    f.tasa.value=item&&item.tasa?item.tasa:''; f.pago.value=item&&item.pago?item.pago:'';
    f.titular.value=item?(item.titular||''):'';
  }
  f.scrollIntoView({block:'center',behavior:'smooth'}); f.nombre.focus();
}
document.querySelectorAll('[data-cerrar]').forEach(function(b){
  b.addEventListener('click',cerrarFormas);
});
$('formActivo').capa.innerHTML=CAPAS.map(function(c){return '<option value="'+c.k+'">'+c.n+'</option>'}).join('');
$('formActivo').addEventListener('submit',function(e){
  e.preventDefault(); var f=e.target;
  var v=parseFloat(f.valor.value);
  if(!(v>=0)){ toast('Ponle un valor al activo'); f.valor.focus(); return; }
  var d={nombre:f.nombre.value.trim(),inst:f.inst.value.trim(),capa:f.capa.value,moneda:f.moneda.value,valor:v,
    titular:f.titular.value.trim(),veh:f.veh.value,benef:f.benef.value,
    benefNombre:f.benefNombre.value.trim(),doc:f.doc.value.trim(),lib:f.lib.checked};
  if(!d.nombre){ toast('Ponle nombre al activo'); f.nombre.focus(); return; }
  /* la fecha del valor se estampa cuando el valor cambia — nunca se inventa */
  d.act=(!editando||v!==editando.valor)?hoyISO():(editando.act||null);
  if(editando && editTipo==='activo' && S.activos.indexOf(editando)!==-1){
    Object.assign(editando,d); histRegistra(editando); toast('Activo actualizado');
  } else { d.id=uid(); S.activos.push(d); histRegistra(d); toast('Activo agregado'); }
  cerrarFormas(); save(); render();
});

/* ── controles ── */
function renderChat(){
  var h=$('chatHilo'); if(!h) return;
  S.chat=S.chat||[];
  h.innerHTML= S.chat.length? S.chat.map(function(msg,i){
    if(msg.de==='analista'){
      return '<div class="burbuja analista"><em>NORTHPOINT · TU ANALISTA</em><p>'+esc(msg.txt)+'</p><small>'+esc(fCorta(msg.f))+'</small></div>';
    }
    var nota=(i===S.chat.length-1)?' · enviada — tu analista te contesta aquí mismo':'';
    return '<div class="burbuja cliente"><p>'+esc(msg.txt)+'</p><small>'+esc(fCorta(msg.f))+nota+'</small>'
      +'<span class="burbuja-ops"><button class="op rojo" data-delmsg="'+i+'" aria-label="Borrar mensaje">×</button></span></div>';
  }).join('') : '<div class="vacio">Sin mensajes todavía. Escribe tu primera duda abajo.</div>';
  h.querySelectorAll('[data-delmsg]').forEach(function(b){ b.addEventListener('click',function(){
    S.chat.splice(+b.getAttribute('data-delmsg'),1); save(); renderChat();
  }); });
  h.scrollTop=h.scrollHeight;
}
$('chatEnviar').addEventListener('click',function(){
  var tx=$('chatTxt').value.trim(); if(!tx){ toast('Escribe tu duda primero'); return; }
  S.chat=S.chat||[]; S.chat.push({f:hoyISO(), de:'cliente', txt:tx}); if(S.chat.length>80) S.chat.shift();
  $('chatTxt').value=''; save(); renderChat(); toast('Enviada — tu analista te contesta aquí mismo');
});
function aplicaTema(){
  var neg=S.tema==='negro';
  document.body.classList.toggle('tema-negro',neg);
  var b=$('temaBlanco'), g=$('temaNegro');
  if(b){ b.setAttribute('aria-pressed',String(!neg)); g.setAttribute('aria-pressed',String(neg)); }
}
$('temaBlanco').addEventListener('click',function(){ S.tema='blanco'; S.temaElegido=true; save(); aplicaTema(); render(); });
$('temaNegro').addEventListener('click',function(){ S.tema='negro'; S.temaElegido=true; save(); aplicaTema(); render(); });
/* foto mensual automática: una por mes, silenciosa e idempotente */
function histRegistra(x){
  x.hist=x.hist||[];
  var f=hoyISO(), mes=f.slice(0,7);
  var ya=x.hist.find(function(h){return String(h.f).slice(0,7)===mes;});
  if(ya){ ya.f=f; ya.v=enMXN(x); }
  else { x.hist.push({f:f, v:enMXN(x)}); if(x.hist.length>36) x.hist.shift(); }
}
function autoFotoMensual(){
  if(S.demo || !S.activos.length) return;
  var f=hoyISO(), mes=f.slice(0,7);
  if(S.cortes.some(function(c){return String(c.f).slice(0,7)===mes;})) return;
  var act=totalActivos(), deu=totalDeudas();
  S.activos.forEach(histRegistra);
  S.cortes.push({f:f,v:act-deu,act:act,deu:deu,capas:porCapa(),fx:S.fx});
  save(); toast('Foto de '+fMesA(f)+' guardada — automática, una por mes');
}
$('inAporta').addEventListener('input',function(){ S.aporta=Math.max(0,parseFloat(this.value)||0); save(); renderPlan(); renderLibertad(); destello(); });
$('inTasa').addEventListener('input',function(){ S.tasa=parseFloat(this.value)||0; save(); renderLibertad(); renderPlan(); destello(); });
function destello(){ ['libIntro','camino','libHitos'].forEach(function(id){ var el=$(id); if(!el)return; el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); }); }
$('inFx').addEventListener('change',function(){ S.fx=Math.max(1,parseFloat(this.value)||17); S.fxFecha=hoyISO(); this.value=S.fx; save(); render(); });
$('inGasto').addEventListener('change',function(){ S.gasto=Math.max(0,parseFloat(this.value)||0); this.value=S.gasto; save(); render(); });
$('inAporta').addEventListener('change',function(){ this.value=S.aporta; });

function exporta(){
  document.body.classList.remove('menuAbierto');
  var f=hoyISO();
  var blob=new Blob([JSON.stringify(S,null,2)],{type:'application/json'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='northpoint-oficina-'+f+'.json';
  a.click(); URL.revokeObjectURL(a.href);
  S.ultimoExport=f; save();
  toast('Respaldo exportado'); render();
}
$('btnExporta').addEventListener('click',exporta);
$('chipResp').addEventListener('click',exporta);
$('btnImporta').addEventListener('click',function(){ $('fileImporta').click(); });
$('fileImporta').addEventListener('change',function(){
  var file=this.files[0]; if(!file)return;
  var rd=new FileReader();
  rd.onload=function(){
    try{
      var p=JSON.parse(rd.result);
      if(!p||typeof p!=='object'||p.v!==1) throw 0;
      if((S.activos.length||S.deudas.length||S.cortes.length)
        && !confirm('Importar REEMPLAZA todos tus datos actuales por los del archivo. ¿Continuar?')) return;
      cerrarFormas();
      S=sanea(p); save(); sync(); render(); toast('Respaldo importado');
    }catch(e){ toast('Ese archivo no es un respaldo válido'); }
  };
  rd.readAsText(file); this.value='';
});
$('btnBorrar').addEventListener('click',function(){
  if(!confirm('¿Borrar TODO? Tus datos solo viven aquí — si no exportaste respaldo, no hay vuelta.'))return;
  cerrarFormas();
  try{ localStorage.removeItem(K_REAL); }catch(e){}
  S=fresh(); save(); sync(); render(); toast('Oficina en cero');
});

function cargarDemo(){
  cerrarFormas();
  document.body.classList.remove('menuAbierto');
  /* apartar los datos reales antes de pisarlos — regresan al salir del demo */
  if(!S.demo && (S.activos.length||S.deudas.length||S.cortes.length)){
    try{ localStorage.setItem(K_REAL, JSON.stringify(S)); }catch(e){}
  }
  S=fresh(); S.demo=true;
  var hoyD=hoyISO();
  function hace(dias){ var d=new Date(); d.setDate(d.getDate()-dias);
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
  S.activos=[
    {id:uid(),nombre:'Cetes directo',inst:'CETES',capa:'liquidez',moneda:'MXN',valor:420000,lib:true,act:hace(6),titular:'Papá',veh:'directo',benef:'si',benefNombre:'Mamá',doc:'Portal cetesdirecto'},
    {id:uid(),nombre:'Cuenta eje',inst:'BBVA',capa:'liquidez',moneda:'MXN',valor:185000,lib:true,act:hace(3),titular:'Papá',veh:'directo',benef:'si',benefNombre:'Mamá',doc:'Designación en sucursal'},
    {id:uid(),nombre:'Afore',inst:'XXI Banorte',capa:'retiro',moneda:'MXN',valor:680000,lib:false,act:hace(28),titular:'Papá',veh:'directo',benef:'si',benefNombre:'Mamá',doc:'Estado de cuenta Afore'},
    {id:uid(),nombre:'PPR',inst:'Allianz',capa:'retiro',moneda:'MXN',valor:520000,lib:true,act:hace(45),titular:'Mamá',veh:'directo',benef:'si',benefNombre:'Hijos',doc:'Póliza en caja fuerte'},
    {id:uid(),nombre:'Depto en renta · Roma Norte',inst:'Escriturado',capa:'pasivos',moneda:'MXN',valor:3850000,lib:true,act:hace(150),titular:'Copropiedad',veh:'copropiedad',benef:'si',benefNombre:'Hijos',doc:'Escritura · Notaría 12'},
    {id:uid(),nombre:'Local comercial · Centro',inst:'Escriturado',capa:'pasivos',moneda:'MXN',valor:2400000,lib:true,act:hace(150),titular:'Papá',veh:'directo',benef:'si',benefNombre:'Mamá',doc:'Escritura · Notaría 4'},
    {id:uid(),nombre:'ETF S&P 500',inst:'GBM+',capa:'acciones',moneda:'USD',valor:38500,lib:true,act:hace(1),titular:'Papá',veh:'directo',benef:'si',benefNombre:'Mamá',doc:'Designación en GBM+'},
    {id:uid(),nombre:'ETF Nasdaq 100',inst:'GBM+',capa:'acciones',moneda:'USD',valor:12200,lib:true,act:hace(1),titular:'Mamá',veh:'directo',benef:'si',benefNombre:'Papá',doc:'Designación en GBM+'},
    {id:uid(),nombre:'Fondo global',inst:'GBM+',capa:'acciones',moneda:'MXN',valor:350000,lib:true,act:hace(1),titular:'Papá',veh:'directo',benef:'si',benefNombre:'Mamá',doc:'Designación en GBM+'},
    {id:uid(),nombre:'Negocio familiar',inst:'SAPI',capa:'alt',moneda:'MXN',valor:1800000,lib:false,act:hace(90),titular:'SAPI familiar',veh:'empresa',benef:'na',benefNombre:'',doc:'Acta constitutiva · Notaría 4'}
  ];
  S.activos.forEach(function(x,i){
    var v=enMXN(x); x.hist=[];
    for(var m=7;m>=0;m--){
      var factor=1-0.09*(m/7)+Math.sin(i*2.7+m)*0.018;
      x.hist.push({f:hace(m*30+2), v:Math.round(v*factor)});
    }
    x.hist[x.hist.length-1]={f:hace(2), v:Math.round(v)};
  });
  S.deudas=[
    {id:uid(),nombre:'Hipoteca del depto',moneda:'MXN',valor:1680000,tasa:10.2,pago:19800,titular:'Copropiedad',act:hace(6)},
    {id:uid(),nombre:'Crédito del auto',moneda:'MXN',valor:180000,tasa:12.9,pago:8400,titular:'Mamá',act:hace(6)},
    {id:uid(),nombre:'Tarjeta de crédito',moneda:'MXN',valor:22000,tasa:61,pago:4000,titular:'Papá',act:hace(2)}
  ];
  S.aporta=40000; S.ingreso=150000; S.tasa=4; S.gasto=85000; S.fxFecha=hoyD;
  /* cortes de ejemplo: ocho meses subiendo con respiración natural */
  var hoy=new Date(); S.cortes=[];
  var base=[7420000,7610000,7545000,7780000,8080000,8360000,8690000,9060000];
  var deuDemo=1882000;
  for(var i=8;i>=1;i--){
    var d=new Date(hoy.getFullYear(),hoy.getMonth()-i,1);
    var f=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-01';
    var vC=base[8-i], actC=vC+deuDemo, t=(8-i)/7;
    /* la mezcla deriva: acciones crece, pasivos afloja — como una familia real */
    var w={liquidez:.075-.02*t, retiro:.115-.007*t, pasivos:.64-.075*t,
           acciones:.055+.087*t, alt:.115+.015*t};
    var capasC={}; CAPAS.forEach(function(c){ capasC[c.k]=Math.round(actC*w[c.k]); });
    S.cortes.push({f:f,v:vC,act:actC,deu:deuDemo,capas:capasC,fx:S.fx});
  }
  S.chat=[
    {f:hace(9), de:'cliente',  txt:'¿Por qué bajó mi capa de acciones este mes?'},
    {f:hace(8), de:'analista', txt:'Buena pregunta. El ETF de S&P 500 corrigió ~3% tras el dato de inflación en EE.UU.; como tu capa de acciones pesa 11% del total, el efecto en tu patrimonio fue menor al 0.4%. El plan no cambia: la aportación de este mes entra igual a acciones — compras más barato.'},
    {f:hace(3), de:'cliente',  txt:'¿Conviene adelantar la aportación de septiembre?'},
    {f:hace(2), de:'analista', txt:'No hace falta. Tu fondo de emergencia está completo y el calendario mensual ya captura estos movimientos. Lo revisamos con calma en tu sesión del día 5.'}
  ];
  save(); sync(); render(); toast('Modo demo — datos de ejemplo');
}
function toggleDemo(){
  document.body.classList.remove('menuAbierto');
  if(S.demo){
    var hayReal=false; try{ hayReal=!!localStorage.getItem(K_REAL); }catch(e){}
    if(!confirm('Salir del demo descarta TODO lo hecho en el demo — incluyendo lo que hayas capturado tú aquí adentro'
      +(hayReal?' — y restaura tus datos reales.':'.')+'\n¿Continuar?'))return;
    cerrarFormas();
    var raw=null; try{ raw=localStorage.getItem(K_REAL); }catch(e){}
    if(raw){
      try{ S=sanea(JSON.parse(raw)); }catch(e){ S=fresh(); }
      try{ localStorage.removeItem(K_REAL); }catch(e){}
      save(); sync(); render(); toast('Demo cerrado — tus datos reales están de vuelta');
    } else {
      S=fresh(); save(); sync(); render(); toast('Demo cerrado — oficina en cero');
    }
  }else{
    if((S.activos.length||S.deudas.length)
      && !confirm('El demo APARTA tus datos actuales y te los devuelve al salir.\n¿Continuar?'))return;
    cargarDemo();
  }
}
$('btnDemo').addEventListener('click',toggleDemo);
$('chipDemo').addEventListener('click',toggleDemo);
$('chipDemoM').addEventListener('click',toggleDemo);
$('obDemo').addEventListener('click',cargarDemo);
$('obImporta').addEventListener('click',function(){ $('fileImporta').click(); });

function sync(){
  $('inAporta').value=S.aporta;
  $('inTasa').value=S.tasa; $('inFx').value=S.fx; $('inGasto').value=S.gasto;
}

var toastT=null;
function toast(msg){
  var t=$('toast'); t.textContent=msg; t.classList.add('ver');
  clearTimeout(toastT); toastT=setTimeout(function(){t.classList.remove('ver')},2400);
}

/* ════ VISUALIZACIONES · EL SISTEMA / EVOLUCIÓN POR CAPAS / EL FLUJO ════
   Reglas de la casa gráfica: paleta categórica VALIDADA en orden fijo de capa,
   un solo eje, tooltips al hover, texto siempre en tinta — nunca del color de
   la serie — y el movimiento se apaga con prefers-reduced-motion. */
var REDUCIDO=matchMedia('(prefers-reduced-motion: reduce)').matches;
var tip=$('tipviz');
function tipVer(x,y,html){
  tip.innerHTML=html; tip.style.display='block';
  var W=innerWidth, tw=tip.offsetWidth, th=tip.offsetHeight;
  tip.style.left=Math.min(W-tw-12,x+14)+'px';
  tip.style.top=Math.min(innerHeight-th-8,Math.max(8,y-10))+'px';
}
function tipFuera(){ tip.style.display='none'; }
function lienzo(cv,hCss){
  var r=cv.getBoundingClientRect(), dpr=Math.min(2,devicePixelRatio||1);
  if(r.width<10) return null;
  var ctx=cv.getContext('2d');
  /* realocar el backing store solo cuando el tamaño cambió — hacerlo cada
     frame destruye y recrea un bitmap de megapíxeles 60 veces por segundo */
  if(cv.__w!==r.width||cv.__dpr!==dpr||cv.__h!==hCss){
    cv.__w=r.width; cv.__dpr=dpr; cv.__h=hCss;
    cv.width=r.width*dpr; cv.height=hCss*dpr;
  }
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,r.width,hCss);
  return {ctx:ctx,w:r.width,h:hCss};
}
function leyendaCapas(id){
  $(id).innerHTML=CAPAS.map(function(c){
    return '<span class="cap-chip"><u style="background:'+c.c+'"></u>'+c.n+'</span>';
  }).join('');
}


/* ── MATRIZ DE ASIGNACIÓN · treemap: el tamaño es el valor ($), el color es la desviación vs meta ── */
/* treemap squarificado (Bruls/Huizing/van Wijk): mosaicos lo más cuadrados posible */
function squarify(items, X, Y, W, H){
  items = items.filter(function(d){return d.value>0}).slice().sort(function(a,b){return b.value-a.value});
  var total=items.reduce(function(s,d){return s+d.value},0); if(total<=0||W<=0||H<=0) return [];
  var escala=(W*H)/total, out=[], i=0;
  function peor(row,len){
    var s=0,mx=0,mn=Infinity;
    for(var k=0;k<row.length;k++){ s+=row[k]; if(row[k]>mx)mx=row[k]; if(row[k]<mn)mn=row[k]; }
    return Math.max((len*len*mx)/(s*s),(s*s)/(len*len*mn));
  }
  while(i<items.length){
    var len=Math.min(W,H), start=i, row=[];
    while(i<items.length){
      var a=items[i].value*escala;
      if(row.length && peor(row.concat(a),len)>peor(row,len)) break;
      row.push(a); i++;
    }
    var suma=0,k; for(k=0;k<row.length;k++) suma+=row[k];
    var grosor=suma/len;
    if(W>=H){ var yy=Y; for(k=0;k<row.length;k++){ var hh=row[k]/grosor; out.push({d:items[start+k],x:X,y:yy,w:grosor,h:hh}); yy+=hh; } X+=grosor; W-=grosor; }
    else     { var xx=X; for(k=0;k<row.length;k++){ var ww=row[k]/grosor; out.push({d:items[start+k],x:xx,y:Y,w:ww,h:grosor}); xx+=ww; } Y+=grosor; H-=grosor; }
  }
  return out;
}
/* color por desviación (puntos porcentuales) vs meta: en banda → menta; de más → coral; de menos → acero */
/* texto legible sobre un color sólido */
function txtSobre(hex){
  var r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
  var L=(0.2126*r+0.7152*g+0.0722*b)/255;
  return L>0.62? '#12130C':'#FFFFFF';
}
/* ── dona (pastel) circular por capa · compartida por Portafolio y El sistema ── */
/* ── helpers de geometría/color ── */
function arcoA(cx,cy,r1,r2,a0,a1){
  var large=(a1-a0)>Math.PI?1:0;
  var x0o=cx+r2*Math.cos(a0),y0o=cy+r2*Math.sin(a0),x1o=cx+r2*Math.cos(a1),y1o=cy+r2*Math.sin(a1);
  var x0i=cx+r1*Math.cos(a1),y0i=cy+r1*Math.sin(a1),x1i=cx+r1*Math.cos(a0),y1i=cy+r1*Math.sin(a0);
  return 'M'+x0o.toFixed(1)+' '+y0o.toFixed(1)+' A'+r2.toFixed(1)+' '+r2.toFixed(1)+' 0 '+large+' 1 '+x1o.toFixed(1)+' '+y1o.toFixed(1)
    +' L'+x0i.toFixed(1)+' '+y0i.toFixed(1)+' A'+r1.toFixed(1)+' '+r1.toFixed(1)+' 0 '+large+' 0 '+x1i.toFixed(1)+' '+y1i.toFixed(1)+' Z';
}
function aclara(hex,f){
  var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  r=Math.round(r+(255-r)*f); g=Math.round(g+(255-g)*f); b=Math.round(b+(255-b)*f);
  return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
}
/* ── PORTAFOLIO · sunburst: capas adentro, cada activo afuera; pícale y entras ── */
/* ── lienzo canvas con DPR (realocar solo cuando cambia el tamaño) ── */
function lienzo(cv,hCss){
  var r=cv.getBoundingClientRect(), dpr=Math.min(2,devicePixelRatio||1);
  if(r.width<10) return null;
  var ctx=cv.getContext('2d');
  if(cv.__w!==r.width||cv.__dpr!==dpr||cv.__h!==hCss){
    cv.__w=r.width; cv.__dpr=dpr; cv.__h=hCss;
    cv.width=r.width*dpr; cv.height=hCss*dpr;
  }
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,r.width,hCss);
  return {ctx:ctx,w:r.width,h:hCss};
}

/* ── PORTAFOLIO · la rueda: capas adentro, cada activo afuera; pícale y entras ── */
function dibujaMareas(){
  var host=$('mareas'); if(!host || document.body.getAttribute('data-v')!=='portafolio') return;
  var m=porCapa(), act=totalActivos();
  if(!act){ host.innerHTML='<div class="tm-vacio">Tu asesor NORTHPOINT está preparando tu portafolio.</div>'; return; }
  var W=Math.round(host.clientWidth||host.getBoundingClientRect().width);
  if(!W){ requestAnimationFrame(dibujaMareas); return; }
  var neg=esNegro(), gapCol= neg? '#101109':'#F6F4EE';
  var size=Math.min(580, Math.max(350, W*0.6)), H=size+8, cx=W/2, cy=H/2;
  var rHueco=size*0.165, r1=size*0.30, r2=size*0.475;
  var GAP=0.018, a0=-Math.PI/2;
  var grupos=CAPAS.map(function(c){
    var items=S.activos.filter(function(x){return x.capa===c.k;}).map(function(x){return {x:x,v:enMXN(x)};})
      .filter(function(d){return d.v>0;}).sort(function(a,b){return b.v-a.v;});
    return {c:c, v:items.reduce(function(s,d){return s+d.v;},0), items:items};
  }).filter(function(g){return g.v>0;});
  var s='<svg viewBox="0 0 '+W+' '+H+'" width="100%" height="'+H+'" class="sb-svg" role="img" aria-label="Tu portafolio: capas adentro, cada activo afuera">';
  grupos.forEach(function(g){
    var col=capaCol(g.c);
    var frac=g.v/act, a1=a0+frac*2*Math.PI;
    var b0=a0+GAP/2, b1=Math.max(b0+0.02, a1-GAP/2);
    s+='<path d="'+arcoA(cx,cy,rHueco,r1,b0,b1)+'" fill="'+col+'" stroke="'+gapCol+'" stroke-width="3" stroke-linejoin="round"><title>'
      +esc(g.c.n+' — '+mxn(g.v)+' · '+(frac*100).toFixed(1)+'%')+'</title></path>';
    if(frac>=0.07){
      var mid=(b0+b1)/2, lr=(rHueco+r1)/2;
      s+='<text x="'+(cx+Math.cos(mid)*lr).toFixed(1)+'" y="'+(cy+Math.sin(mid)*lr+5).toFixed(1)+'" text-anchor="middle" class="sb-capa" fill="#FFFFFF">'
        +(frac*100).toFixed(1)+'%</text>';
    }
    var aa=b0;
    g.items.forEach(function(d,i){
      var f2=(d.v/g.v)*(b1-b0), e0=aa, e1=aa+f2; aa=e1;
      var col2=aclara(col, i%2? 0.34:0.12);
      s+='<g class="fruta" data-fruta="'+esc(d.x.id)+'" tabindex="0" role="button" aria-label="'+esc(d.x.nombre+', '+mxn(d.v))+'">';
      s+='<title>'+esc(d.x.nombre+' — '+mxn(d.v)+' · '+(d.v/act*100).toFixed(1)+'% · pícale para entrar')+'</title>';
      s+='<path class="fruta-c" d="'+arcoA(cx,cy,r1+6,r2,e0+0.006,Math.max(e0+0.014,e1-0.006))+'" fill="'+col2+'" stroke="'+gapCol+'" stroke-width="3" stroke-linejoin="round"/>';
      s+='</g>';
    });
    a0=a1;
  });
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(rHueco-8).toFixed(1)+'" fill="'+(neg?'#0E0F0C':'#FFFFFF')+'" fill-opacity="'+(neg?'0.85':'0.65')+'"/>';
  s+='<text x="'+cx+'" y="'+(cy-10)+'" text-anchor="middle" class="sb-tot">'+esc(mxnC(act))+'</text>';
  s+='<text x="'+cx+'" y="'+(cy+8)+'" text-anchor="middle" class="sb-sub">TOTAL EN ACTIVOS</text>';
  s+='<text x="'+cx+'" y="'+(cy+24)+'" text-anchor="middle" class="sb-n">'+S.activos.length+' ACTIVOS</text>';
  s+='</svg>';
  s+='<p class="jardin-hint">Pícale a un activo (anillo de afuera) para ver su detalle y su historia.</p>';
  var segs=grupos.slice().sort(function(a,b){return b.v-a.v;});
  s+='<div class="ley2">';
  segs.forEach(function(g){
    s+='<div class="ley2-row"><u style="background:'+capaCol(g.c)+'"></u>'
      +'<span class="ley2-nom">'+esc(g.c.n)+'<small>'+g.items.length+' activo'+(g.items.length===1?'':'s')
      +(g.items.length?' · mayor: '+esc(g.items[0].x.nombre):'')+'</small></span>'
      +'<span class="ley2-pct">'+(g.v/act*100).toFixed(1)+'%</span>'
      +'<b class="ley2-v">'+esc(mxn(g.v))+'</b></div>';
  });
  s+='</div>';
  host.innerHTML=s;
}
(function(){
  var h=$('mareas'); if(!h) return;
  h.addEventListener('click',function(e){ var g=e.target.closest&&e.target.closest('[data-fruta]'); if(g) abrirFruta(g.getAttribute('data-fruta')); });
  h.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ var g=e.target.closest&&e.target.closest('[data-fruta]'); if(g){ e.preventDefault(); abrirFruta(g.getAttribute('data-fruta')); } } });
})();

/* ── EL SISTEMA · el patrimonio como sistema orbital ── */
var sysOrbes=[], sysHover=-1, sysMouse=null;
function sysDatos(){
  sysHover=-1;
  var vmax=1; S.activos.forEach(function(x){ vmax=Math.max(vmax,enMXN(x)); });
  sysOrbes=S.activos.map(function(x,i){
    var ci=CAPAS.findIndex(function(c){return c.k===x.capa}); if(ci<0)ci=0;
    return {x:x, ci:ci, v:enMXN(x),
      r:5+13*Math.sqrt(enMXN(x)/vmax),
      a0:(i*2.399963)%(Math.PI*2),          /* ángulo áureo: se reparten solos */
      vel:(0.16-ci*0.022)*(i%2?1:-1),
      jit:((i*7919)%23-11)};
  });
}
function sysLeyendaR(){
  var el=$('sysLeyenda'); if(!el)return;
  var m=porCapa();
  el.innerHTML=CAPAS.map(function(c){
    return '<span class="cap-chip"><u style="background:'+capaCol(c)+'"></u>'+c.n+' <b>'+mxnC(m[c.k]||0)+'</b></span>';
  }).join('');
}
function dibujaSistema(t){
  t=t||0;
  var cv=$('sys'); if(!cv||document.body.getAttribute('data-v')!=='resumen')return;
  var L=lienzo(cv,320); if(!L)return;
  var ctx=L.ctx, w=L.w, h=320, cx=w/2, cy=h/2;
  var rMax=Math.min(w/2,h/2)-24, paso=rMax/5;
  /* anillos de capa */
  CAPAS.forEach(function(c,i){
    ctx.beginPath(); ctx.arc(cx,cy,paso*(i+0.8),0,7);
    ctx.strokeStyle=cGlass(sysHover>=0&&sysOrbes[sysHover]&&sysOrbes[sysHover].ci===i?0.22:0.06);
    ctx.lineWidth=1; ctx.stroke();
  });
  /* núcleo: la estrella de la casa, latiendo apenas */
  var lat=REDUCIDO?1:(1+Math.sin(t*1.4)*0.12);
  ctx.save(); ctx.translate(cx,cy); ctx.scale(lat,lat);
  ctx.fillStyle=cInk(0.9);
  ctx.beginPath();
  ctx.moveTo(0,-7);ctx.lineTo(1.6,-1.6);ctx.lineTo(7,0);ctx.lineTo(1.6,1.6);
  ctx.lineTo(0,7);ctx.lineTo(-1.6,1.6);ctx.lineTo(-7,0);ctx.lineTo(-1.6,-1.6);
  ctx.closePath(); ctx.fill(); ctx.restore();
  /* las esferas — posiciones primero, luego el hit-test del frame */
  sysOrbes.forEach(function(o){
    var rad=paso*(o.ci+0.8)+o.jit*0.35;
    var ang=o.a0+(REDUCIDO?0:t*o.vel);
    o.px=cx+Math.cos(ang)*rad; o.py=cy+Math.sin(ang)*rad;
  });
  if(sysMouse){
    var best=-1,bd=1e9;
    sysOrbes.forEach(function(o,i){
      var d=Math.hypot(sysMouse.x-o.px,sysMouse.y-o.py);
      if(d<o.r+8&&d<bd){bd=d;best=i}
    });
    sysHover=best;
    if(best>=0){ var ob=sysOrbes[best];
      tipVer(sysMouse.cx,sysMouse.cy,'<b>'+esc(ob.x.nombre)+'</b><br>'+mxn(ob.v)+' · '+CAPAS[ob.ci].n.toUpperCase()+'<br>PÍCALE PARA EL DETALLE');
      cv.style.cursor='pointer';
    } else { tipFuera(); cv.style.cursor='default'; }
  }
  sysOrbes.forEach(function(o,i){
    var col=capaCol(CAPAS[o.ci]);
    ctx.save();
    ctx.shadowColor=col; ctx.shadowBlur= i===sysHover?26:14;
    ctx.fillStyle=col; ctx.globalAlpha= sysHover>=0&&i!==sysHover?0.45:1;
    ctx.beginPath(); ctx.arc(o.px,o.py,o.r,0,7); ctx.fill();
    /* anillo de superficie: separa esferas encimadas */
    ctx.shadowBlur=0; ctx.globalAlpha=1;
    ctx.strokeStyle=cAnillo(); ctx.lineWidth=2;
    ctx.beginPath(); ctx.arc(o.px,o.py,o.r,0,7); ctx.stroke();
    ctx.restore();
  });
}
(function(){
  var cv=$('sys'); if(!cv)return;
  cv.addEventListener('mousemove',function(e){
    var r=cv.getBoundingClientRect();
    sysMouse={x:e.clientX-r.left,y:e.clientY-r.top,cx:e.clientX,cy:e.clientY};
    if(REDUCIDO) dibujaSistema(0);
  });
  cv.addEventListener('mouseleave',function(){ sysMouse=null; sysHover=-1; tipFuera(); cv.style.cursor='default'; if(REDUCIDO)dibujaSistema(0); });
  cv.addEventListener('click',function(){
    if(sysHover>=0&&sysOrbes[sysHover]) abrirFruta(sysOrbes[sysHover].x.id);
  });
})();

/* ── EL FLUJO · la aportación viajando a sus capas, con partículas de luz ── */
var fluDatos=null, fluHover=-1, fluParts=[];
function flujoDatos(M,red){
  fluDatos= M>0? {M:M,red:red} : null;
  fluParts=[];
  if(fluDatos){
    CAPAS.forEach(function(c,i){
      var n=Math.round((red[i]/M)*16);
      for(var k=0;k<n;k++) fluParts.push({ci:i,ph:Math.random(),vel:0.10+Math.random()*0.08,os:(Math.random()-0.5)});
    });
  }
}
function fluGeom(w,h){
  var x0=86, x1=w-150, ys=h/2;
  var yT=CAPAS.map(function(c,i){ return 26+i*((h-52)/4); });
  return {x0:x0,x1:x1,ys:ys,yT:yT};
}
function fluPunto(g,ci,tt){
  var y1=g.yT[ci], mx=(g.x0+g.x1)/2;
  var x=Math.pow(1-tt,3)*g.x0+3*Math.pow(1-tt,2)*tt*mx+3*(1-tt)*tt*tt*mx+Math.pow(tt,3)*g.x1;
  var y=Math.pow(1-tt,3)*g.ys+3*Math.pow(1-tt,2)*tt*g.ys+3*(1-tt)*tt*tt*y1+Math.pow(tt,3)*y1;
  return [x,y];
}
var fluDt=0.016;
function dibujaFlujo(t){
  t=t||0;
  var cv=$('flujo'); if(!cv||document.body.getAttribute('data-v')!=='plan')return;
  var L=lienzo(cv,200); if(!L)return;
  var ctx=L.ctx, w=L.w, h=200, g=fluGeom(w,h);
  if(!fluDatos){
    ctx.fillStyle=cInk(0.35); ctx.font='9px ui-monospace,monospace'; ctx.textAlign='center';
    ctx.fillText('DEFINE UNA APORTACIÓN Y EL FLUJO SE ENCIENDE',w/2,h/2); return;
  }
  var M=fluDatos.M, red=fluDatos.red, maxV=Math.max.apply(null,red.concat([1]));
  /* bandas */
  CAPAS.forEach(function(c,i){
    if(red[i]<=0)return;
    var esp=2+16*(red[i]/maxV), col=capaCol(c);
    ctx.beginPath();
    for(var s=0;s<=24;s++){ var p=fluPunto(g,i,s/24); s?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]); }
    ctx.strokeStyle= i===fluHover? col : col+'59';
    ctx.lineWidth=esp; ctx.lineCap='round'; ctx.stroke();
  });
  /* partículas de luz recorriendo su banda */
  if(!REDUCIDO){
    fluParts.forEach(function(p){
      p.ph=(p.ph+p.vel*fluDt)%1;
      var pt=fluPunto(g,p.ci,p.ph);
      ctx.save();
      ctx.shadowColor=capaCol(CAPAS[p.ci]); ctx.shadowBlur=10;
      ctx.fillStyle='rgba(255,255,255,.95)';
      ctx.beginPath(); ctx.arc(pt[0],pt[1]+p.os*3,1.6,0,7); ctx.fill();
      ctx.restore();
    });
  }
  /* nodo fuente */
  ctx.fillStyle=cInk(0.95);
  ctx.beginPath(); ctx.arc(g.x0,g.ys,7,0,7); ctx.fill();
  ctx.fillStyle=cInk(0.55); ctx.font='8px ui-monospace,monospace'; ctx.textAlign='center';
  ctx.fillText('APORTACIÓN',g.x0,g.ys-20);
  ctx.fillStyle=cInk(0.9); ctx.font='10px ui-monospace,monospace';
  ctx.fillText(mxn(M),g.x0,g.ys+27);
  /* nodos destino con etiqueta directa */
  ctx.textAlign='left';
  CAPAS.forEach(function(c,i){
    ctx.fillStyle=capaCol(c);
    ctx.beginPath(); ctx.arc(g.x1,g.yT[i],4.5,0,7); ctx.fill();
    ctx.strokeStyle=cAnillo(); ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle=cInk(red[i]>0?0.85:0.35);
    ctx.font='8.5px ui-monospace,monospace';
    ctx.fillText(c.n.toUpperCase()+'  '+mxn(red[i]),g.x1+12,g.yT[i]+3);
  });
}
(function(){
  var cv=$('flujo'); if(!cv)return;
  cv.addEventListener('mousemove',function(e){
    if(!fluDatos){tipFuera();return}
    var r=cv.getBoundingClientRect(), mx=e.clientX-r.left, my=e.clientY-r.top;
    var g=fluGeom(r.width,200), best=-1, bd=14;
    CAPAS.forEach(function(c,i){
      if(fluDatos.red[i]<=0)return;
      for(var s=0;s<=24;s++){ var p=fluPunto(g,i,s/24);
        var d=Math.hypot(mx-p[0],my-p[1]); if(d<bd){bd=d;best=i} }
    });
    fluHover=best;
    if(best>=0) tipVer(e.clientX,e.clientY,'<b>'+CAPAS[best].n+'</b><br>'+mxn(fluDatos.red[best])+' DE '+mxn(fluDatos.M)+' ESTE MES');
    else tipFuera();
    if(REDUCIDO) dibujaFlujo(0);
  });
  cv.addEventListener('mouseleave',function(){ fluHover=-1; tipFuera(); if(REDUCIDO)dibujaFlujo(0); });
})();

/* un solo reloj para todo lo que se mueve */
(function(){
  var prev=null;
  function marco(ts){
    var t=ts/1000;
    fluDt= prev===null? 0.016 : Math.min(0.05,(ts-prev)/1000);
    prev=ts;
    dibujaSistema(t); dibujaFlujo(t);
    requestAnimationFrame(marco);
  }
  if(REDUCIDO){ setTimeout(function(){dibujaSistema(0);dibujaFlujo(0)},80); }
  else requestAnimationFrame(marco);
})();
function grafHist(x, col){
  var h=(x.hist||[]).slice(-24);
  if(h.length<2) return '<p class="fruta-nota">Su historia empieza hoy — cada mes le tomamos una foto y aquí verás su curva.</p>';
  var W=380, H=120, padL=6, padR=10, top=12, base=H-22;
  var vals=h.map(function(p){return p.v;});
  var mn=Math.min.apply(null,vals), mx=Math.max.apply(null,vals); if(mx===mn) mx+=1;
  function X(i){ return padL+i/(h.length-1)*(W-padL-padR); }
  function Y(v){ return top+(1-(v-mn)/(mx-mn))*(base-top); }
  var d='M'+X(0).toFixed(1)+' '+Y(vals[0]).toFixed(1);
  for(var i=0;i<h.length-1;i++){
    var x0=X(Math.max(0,i-1)), y0=Y(vals[Math.max(0,i-1)]);
    var x1=X(i), y1=Y(vals[i]), x2=X(i+1), y2=Y(vals[i+1]);
    var x3=X(Math.min(h.length-1,i+2)), y3=Y(vals[Math.min(h.length-1,i+2)]);
    d+=' C'+(x1+(x2-x0)/6).toFixed(1)+' '+(y1+(y2-y0)/6).toFixed(1)+' '+(x2-(x3-x1)/6).toFixed(1)+' '+(y2-(y3-y1)/6).toFixed(1)+' '+x2.toFixed(1)+' '+y2.toFixed(1);
  }
  var area=d+' L'+X(h.length-1).toFixed(1)+' '+base+' L'+X(0).toFixed(1)+' '+base+' Z';
  var del=vals[vals.length-1]-vals[0], pc= vals[0]!==0? del/Math.abs(vals[0])*100:0;
  var gid='fg'+String(x.id).replace(/[^a-z0-9]/gi,'');
  var s='<p class="fruta-delta '+(del>=0?'sube':'baja')+'">'+(del>=0?'▲ +':'▼ −')+mxn(Math.abs(del))+' ('+(del>=0?'+':'−')+Math.abs(pc).toFixed(1)+'%) desde '+esc(fMesA(h[0].f))+'</p>';
  s+='<svg viewBox="0 0 '+W+' '+H+'" width="100%" height="'+H+'" class="fruta-svg" role="img" aria-label="Valor del activo, foto a foto">';
  s+='<defs><linearGradient id="'+gid+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+col+'" stop-opacity="0.24"/><stop offset="1" stop-color="'+col+'" stop-opacity="0"/></linearGradient></defs>';
  s+='<line x1="'+padL+'" y1="'+base+'" x2="'+(W-padR)+'" y2="'+base+'" stroke="rgba(18,19,12,.14)"/>';
  s+='<path d="'+area+'" fill="url(#'+gid+')"/>';
  s+='<path d="'+d+'" fill="none" stroke="'+col+'" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>';
  h.forEach(function(p,i){
    s+='<circle cx="'+X(i).toFixed(1)+'" cy="'+Y(p.v).toFixed(1)+'" r="'+(i===h.length-1?4.5:2.2)+'" fill="'+col+'" stroke="#FFFFFF" stroke-width="'+(i===h.length-1?1.8:1)+'"><title>'+esc(fMesA(p.f)+' — '+mxn(p.v))+'</title></circle>';
  });
  s+='<text x="'+padL+'" y="'+(H-6)+'" class="ev-mes">'+esc(fMesA(h[0].f))+'</text>';
  s+='<text x="'+(W-padR)+'" y="'+(H-6)+'" text-anchor="end" class="ev-mes">'+esc(fMesA(h[h.length-1].f))+'</text>';
  s+='</svg><p class="fruta-nota">Valor que tú registras, foto a foto — no es cotización de mercado.</p>';
  return s;
}
function abrirFruta(id){
  var x=S.activos.find(function(a){return a.id===id}); if(!x) return;
  var c=CAPA_BY[x.capa]||CAPAS[0], v=enMXN(x), act=totalActivos(), pr=act>0? v/act*100:0;
  var vel=$('frutaVelo');
  if(!vel){
    vel=document.createElement('div'); vel.id='frutaVelo'; vel.className='fruta-velo'; vel.hidden=true;
    document.body.appendChild(vel);
    vel.addEventListener('click',function(e){ if(e.target===vel) cerrarFruta(); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') cerrarFruta(); });
  }
  var VEH={copropiedad:'Copropiedad',empresa:'A través de una empresa',fideicomiso:'En fideicomiso'};
  var filas=[
    ['Capa', c.n],
    ['Del total de activos', pr.toFixed(1)+'%'],
    x.inst?['Institución',x.inst]:null,
    x.moneda==='USD'?['Moneda','USD · '+Number(x.valor).toLocaleString('en-US')+' USD']:null,
    x.titular?['Titular',x.titular]:null,
    (x.veh&&x.veh!=='directo')?['Cómo lo tienes',VEH[x.veh]||x.veh]:null,
    x.benef?['¿Quién lo hereda?', x.benef==='si'?(x.benefNombre||'Ya está definido'): x.benef==='no'?'Aún sin definir':'No aplica']:null,
    x.doc?['Documento',x.doc]:null
  ].filter(Boolean);
  vel.innerHTML='<div class="fruta-card" style="border-top-color:'+capaCol(c)+'">'
    +'<span class="fruta-icono" style="background:'+capaCol(c)+'"></span>'
    +'<h2>'+esc(x.nombre)+'</h2>'
    +'<p class="fruta-monto">'+esc(mxn(v))+'</p>'
    +grafHist(x, capaCol(c))
    +filas.map(function(f){ return '<div class="fruta-fila"><span>'+esc(f[0])+'</span><b>'+esc(f[1])+'</b></div>'; }).join('')
    +'<div class="fruta-acciones"><button class="btn btn-g" id="frutaCerrar">Cerrar</button></div></div>';
  vel.hidden=false;
  $('frutaCerrar').addEventListener('click',cerrarFruta);
}
function cerrarFruta(){ var v=$('frutaVelo'); if(v) v.hidden=true; }
(function(){
  var h=$('mareas'); if(!h) return;
  h.addEventListener('click',function(e){ var g=e.target.closest&&e.target.closest('[data-fruta]'); if(g) abrirFruta(g.getAttribute('data-fruta')); });
  h.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ var g=e.target.closest&&e.target.closest('[data-fruta]'); if(g){ e.preventDefault(); abrirFruta(g.getAttribute('data-fruta')); } } });
})();

/* ── RESUMEN · Sankey del flujo patrimonial: capas → activos → neto (y lo que se lleva la deuda) ── */
addEventListener('resize', function(){ var v=document.body.getAttribute('data-v'); if(v==='portafolio')dibujaMareas(0); else if(v==='resumen')dibujaSistema(0); else if(v==='plan'){dibujaFlujo(0);renderLibertad();} });


/* ── enrutador del menú lateral ── */
var VISTAS={resumen:'Resumen',portafolio:'Portafolio',plan:'El plan',
  chat:'Chat',ajustes:'Personalizar'};
var SUBS={resumen:'La fotografía de hoy — y cómo has llegado hasta aquí.',
  portafolio:'Cómo se reparte tu patrimonio entre tus 5 capas.',
  plan:'Cuánto ahorras cada mes, a dónde va — y a dónde te lleva.',
  chat:'Tu analista NORTHPOINT te contesta aquí mismo.',
  ajustes:'Elige cómo quieres ver tu oficina.'};
function animarNeto(){
  var el=$('netoBig'), neto=totalActivos()-totalDeudas();
  if(!isFinite(neto)) return;
  var t0=null, dur=650, from=neto*0.55;
  function paso(t){
    if(t0===null)t0=t;
    var k=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-k,3);
    el.innerHTML=mxn(from+(neto-from)*e)+'<small>MXN</small>';
    if(k<1)requestAnimationFrame(paso);
  }
  requestAnimationFrame(paso);
}
function verVista(v,primerCarga,desdeHistorial){
  if(!VISTAS[v]) v='resumen';
  document.body.setAttribute('data-v',v);
  document.querySelectorAll('.mn').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-v')===v)});
  $('cabTitulo').textContent=VISTAS[v];
  $('cabSub').textContent=SUBS[v]||'';
  document.body.classList.remove('menuAbierto');
  if(v==='resumen'){ setTimeout(function(){renderSpark();dibujaSistema(0)},40); if(!primerCarga) animarNeto(); }
  if(v==='plan') setTimeout(renderLibertad,40);
  if(v==='portafolio') setTimeout(function(){dibujaMareas(performance.now()/1000)},40);
  if(location.hash!=='#/'+v){
    try{
      if(primerCarga||desdeHistorial) history.replaceState(null,'','#/'+v);
      else history.pushState(null,'','#/'+v);
    }catch(e){}
  }
  window.scrollTo(0,0);
}
document.querySelectorAll('.mn').forEach(function(b){
  b.addEventListener('click',function(){verVista(b.getAttribute('data-v'))});
});
$('burger').addEventListener('click',function(){document.body.classList.toggle('menuAbierto')});
$('velo').addEventListener('click',function(){document.body.classList.remove('menuAbierto')});
addEventListener('hashchange',function(){verVista(location.hash.replace('#/',''),false,true)});
addEventListener('resize',function(){
  renderSpark();
  if(REDUCIDO){ dibujaMareas(0); }
});
/* ?demo=1 abre directo en modo demo — solo si la oficina está en cero,
   nunca pisa datos reales sin preguntar */
if(/[?&]demo=1/.test(location.search) && !S.demo
  && !S.activos.length && !S.deudas.length && !S.cortes.length){ cargarDemo(); }
sync(); render();
verVista((location.hash||'#/resumen').replace('#/',''), true);
