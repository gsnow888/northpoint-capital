/* ============================================================
   despacho.html — script 1 de 1
   Extraído del JavaScript inline original (1 bloque(s) <script>, línea 508 del HTML original).
   Se carga en el MISMO punto del documento donde estaba: el orden respecto
   al HTML importa (los scripts sólo ven los elementos que ya existen arriba).
   ============================================================ */


'use strict';
/* ════ EL DESPACHO · motor ════ */
var K='np_despacho_v1';
var SOCIOS={andre:'André',goyo:'Gregorio'};
var ETAPAS=[
  {k:'prospecto', n:'Prospecto',            c:'#10A87E'},
  {k:'sesion',    n:'Sesión de claridad',   c:'#3E93D6'},
  {k:'propuesta', n:'Propuesta',            c:'#8F63DE'},
  {k:'estructura',n:'Estructura en curso',  c:'#D97434'},
  {k:'activa',    n:'Activa',               c:'#DE4A8C'},
  {k:'fuera',     n:'No avanzó',            c:'#7a7a72'}
];
var ETAPA_BY={}; ETAPAS.forEach(function(e){ETAPA_BY[e.k]=e});
var ESTADOS=['pendiente','curso','hecho'];
var RUTA_INI={};

/* LA RUTA precargada: el roadmap real de la casa. Los estados son honestos. */
function rutaInicial(){
  function h(k,frente,txt,estado,op){ return {k:k,frente:frente,txt:txt,estado:estado||'pendiente',fecha:null,fechaAntes:null,op:op===true}; }
  return [
    h('reg-figura','REGULATORIO','Definir la figura: asesor en inversiones CNBV vs RIA ante la SEC'),
    h('reg-sociedad','REGULATORIO','Constituir la sociedad (con notario y contador)'),
    h('reg-registro','REGULATORIO','Presentar el registro ante el regulador elegido'),
    h('reg-custodio','REGULATORIO','Definir custodio institucional para clientes'),
    h('cert-amib-a','CERTIFICACIONES','Figura 3 AMIB · André'),
    h('cert-amib-g','CERTIFICACIONES','Figura 3 AMIB · Gregorio'),
    h('cert-sie','CERTIFICACIONES','SIE · FINRA — solo si eligen la ruta EE.UU. (RIA)',null,true),
    h('cert-s65','CERTIFICACIONES','Series 65 — solo si eligen la ruta EE.UU. (RIA)',null,true),
    h('cert-cfa','CERTIFICACIONES','CFA · Nivel I — opcional, sello técnico',null,true),
    h('com-sesion1','COMERCIAL','Primera familia en sesión de claridad'),
    h('com-activa1','COMERCIAL','Primera familia activa'),
    h('com-activa3','COMERCIAL','Tres familias activas'),
    h('prod-oficina','PRODUCTO','LA OFICINA v1 publicada','hecho'),
    h('prod-reporte','PRODUCTO','Estado de cuenta imprimible para familias'),
    h('prod-nube','PRODUCTO','Nube de socios (el respaldo deja de ser manual)'),
    h('aca-futuros','ACADEMIA','Futuros Intradía grabado','hecho'),
    h('aca-riesgo','ACADEMIA','Riesgo y Psicología grabado'),
    h('aca-inversiones','ACADEMIA','Inversiones de Largo Plazo grabado')
  ];
}
function fresh(){
  return {v:1,perfil:'andre',familias:[],tareas:[],acuerdos:[],ruta:rutaInicial(),ultimoExport:null};
}
function num(v,d){ v=(typeof v==='string')?parseFloat(v):v; return (typeof v==='number'&&isFinite(v))?v:d; }
function fechaOk(v){ v=String(v||''); if(!/^\d{4}-\d{2}-\d{2}$/.test(v)) return null;
  var m=+v.slice(5,7), d=+v.slice(8,10);
  return (m>=1&&m<=12&&d>=1&&d<=31)?v:null; }
function sanea(p){
  var s=fresh();
  if(!p||typeof p!=='object') return s;
  s.perfil= p.perfil==='goyo'?'goyo':'andre';
  s.ultimoExport=fechaOk(p.ultimoExport);
  if(Array.isArray(p.familias)){
    s.familias=p.familias.filter(function(x){return x&&typeof x==='object'}).slice(0,300).map(function(x){
      return {id:uid(),nombre:String(x.nombre||'Sin nombre').slice(0,60),
        contacto:String(x.contacto||'').slice(0,80),origen:String(x.origen||'').slice(0,40),
        rango:['<5M','5-20M','20-50M','>50M'].indexOf(x.rango)>=0?x.rango:'',
        etapa:ETAPA_BY[x.etapa]?String(x.etapa):'prospecto',
        resp:x.resp==='goyo'?'goyo':'andre',
        accion:String(x.accion||'').slice(0,90),fecha:fechaOk(x.fecha),
        nota:String(x.nota||'').slice(0,600),act:fechaOk(x.act)};
    });
  }
  if(Array.isArray(p.tareas)){
    s.tareas=p.tareas.filter(function(x){return x&&typeof x==='object'}).slice(0,500).map(function(x){
      return {id:uid(),txt:String(x.txt||'').slice(0,140),
        resp:x.resp==='goyo'?'goyo':'andre',
        fecha:fechaOk(x.fecha),hecha:x.hecha===true,creada:fechaOk(x.creada)};
    }).filter(function(x){return x.txt});
  }
  if(Array.isArray(p.acuerdos)){
    s.acuerdos=p.acuerdos.filter(function(x){return x&&typeof x==='object'}).slice(0,300).map(function(x){
      return {id:uid(),f:fechaOk(x.f)||hoyISO(),quien:x.quien==='goyo'?'goyo':'andre',
        txt:String(x.txt||'').slice(0,800)};
    }).filter(function(x){return x.txt});
  }
  if(Array.isArray(p.ruta)){
    /* la ruta importada se mapea sobre la ruta base por su clave — hitos
       nuevos del código aparecen; estados guardados se respetan */
    var base=rutaInicial(), by={};
    p.ruta.forEach(function(x){ if(x&&typeof x==='object'&&x.k) by[String(x.k)]=x; });
    s.ruta=base.map(function(h){
      var g=by[h.k];
      if(g){
        h.estado=ESTADOS.indexOf(g.estado)>=0?g.estado:h.estado;
        h.fecha=fechaOk(g.fecha);
        h.fechaAntes=fechaOk(g.fechaAntes);
      }
      return h;
    });
  }
  return s;
}
rutaInicial().forEach(function(x){RUTA_INI[x.k]=x.estado});
var S=fresh();
try{ var raw=localStorage.getItem(K); if(raw){ S=sanea(JSON.parse(raw)); save(); } }catch(e){}
var primerUso=!raw;

var saveFallo=false;
function save(){
  try{ localStorage.setItem(K,JSON.stringify(S)); saveFallo=false; }
  catch(e){ saveFallo=true; toast('⚠ NO PUDE GUARDAR — EXPORTA TU RESPALDO YA'); }
}
var uidN=0;
function uid(){ return Math.random().toString(36).slice(2,9)+(++uidN).toString(36); }
function hoyISO(){ var h=new Date(); return h.getFullYear()+'-'+String(h.getMonth()+1).padStart(2,'0')+'-'+String(h.getDate()).padStart(2,'0'); }
var MES_C=['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
function fCorta(iso){ if(!iso)return ''; var p=iso.split('-'); return parseInt(p[2],10)+' '+MES_C[parseInt(p[1],10)-1]; }
function esTarde(iso){ return iso && iso<hoyISO(); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(ch){
  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]; }); }
function $(id){ return document.getElementById(id); }

/* ── render ── */
var filtroEtapa='todas', filtroTarea='todas';

function render(){
  /* perfil */
  document.querySelectorAll('.perfil button').forEach(function(b){
    b.classList.toggle('on',b.getAttribute('data-p')===S.perfil);
  });
  $('acFirma').textContent='Se registra a nombre de: '+SOCIOS[S.perfil]+' — cámbialo en el menú si no eres tú.';
  renderTablero(); renderFamilias(); renderTareas(); renderRuta(); renderAcuerdos();
  /* chip respaldo */
  var cr=$('chipResp');
  var rutaTocada=S.ruta.some(function(x){return x.estado!==(RUTA_INI[x.k]||'pendiente')});
  var hayDatos=S.familias.length||S.tareas.length||S.acuerdos.length||rutaTocada;
  if(saveFallo){
    cr.style.display='block'; cr.style.color='var(--rojo)'; cr.style.borderColor='var(--rojo)';
    cr.textContent='NO SE PUDO GUARDAR — EXPORTA YA';
  } else if(hayDatos && !S.ultimoExport){
    cr.style.display='block'; cr.style.color='var(--rojo)'; cr.style.borderColor='var(--rojo)';
    cr.textContent='SIN RESPALDO — EXPORTAR';
  } else if(hayDatos && S.ultimoExport && diasDesde(S.ultimoExport)>14){
    cr.style.display='block'; cr.style.color='var(--dim)'; cr.style.borderColor='var(--borde)';
    cr.textContent='RESPALDO: HACE '+diasDesde(S.ultimoExport)+' DÍAS';
  } else cr.style.display='none';
  $('ultExp').textContent= S.ultimoExport? 'Último respaldo: '+fCorta(S.ultimoExport)+' '+S.ultimoExport.slice(0,4) : 'Nunca has exportado.';
}
function diasDesde(iso){ if(!iso)return null; return Math.round((new Date(hoyISO())-new Date(iso))/864e5); }

function renderTablero(){
  var enPipe=S.familias.filter(function(f){return f.etapa!=='fuera'&&f.etapa!=='activa'}).length;
  var activas=S.familias.filter(function(f){return f.etapa==='activa'}).length;
  var abiertas=S.tareas.filter(function(t){return !t.hecha}).length;
  var oblig=S.ruta.filter(function(h){return !h.op});
  var hechosR=oblig.filter(function(h){return h.estado==='hecho'}).length;
  var pct=oblig.length?Math.round(hechosR/oblig.length*100):0;
  $('kFam').textContent=enPipe; $('kActivas').textContent=activas;
  $('kTareas').textContent=abiertas; $('kRuta').textContent=pct+'%';
  /* embudo */
  var max=1; ETAPAS.forEach(function(e){ max=Math.max(max,S.familias.filter(function(f){return f.etapa===e.k}).length); });
  $('funnel').innerHTML= S.familias.length? ETAPAS.map(function(e){
    var n=S.familias.filter(function(f){return f.etapa===e.k}).length;
    return '<div class="fun-row" style="--c:'+e.c+'"><span class="eti">'+e.n+'</span>'
      +'<span class="bar"><i style="width:'+(n/max*100)+'%"></i></span>'
      +'<span class="num">'+n+'</span></div>';
  }).join('') : '<div class="vacio">Registra la primera familia y el embudo cobra vida.</div>';
  /* próximas acciones */
  var conAccion=S.familias.filter(function(f){return f.accion&&f.etapa!=='fuera'})
    .sort(function(a,b){ return (a.fecha||'9999')<(b.fecha||'9999')?-1:1; }).slice(0,8);
  $('proxAcciones').innerHTML= conAccion.length? conAccion.map(function(f){
    var e=ETAPA_BY[f.etapa];
    return '<div class="prox-row"><u style="background:'+e.c+'"></u>'
      +'<span>'+esc(f.accion)+'<small>'+esc(f.nombre).toUpperCase()+' · '+SOCIOS[f.resp].toUpperCase()+'</small></span>'
      +'<span class="f'+(esTarde(f.fecha)?' tarde':'')+'">'+(f.fecha?fCorta(f.fecha):'SIN FECHA')+'</span></div>';
  }).join('') : '<div class="vacio">Sin próximas acciones — cada familia debería tener una.</div>';
  /* tareas del tablero */
  var abiertasL=S.tareas.filter(function(t){return !t.hecha})
    .sort(function(a,b){ return (a.fecha||'9999')<(b.fecha||'9999')?-1:1; }).slice(0,8);
  $('tabTareas').innerHTML= abiertasL.length? abiertasL.map(function(t){
    return '<div class="prox-row"><u style="background:var(--azul)"></u>'
      +'<span>'+esc(t.txt)+'<small>'+SOCIOS[t.resp].toUpperCase()+'</small></span>'
      +'<span class="f'+(esTarde(t.fecha)?' tarde':'')+'">'+(t.fecha?fCorta(t.fecha):'')+'</span></div>';
  }).join('') : '<div class="vacio">Cero pendientes. O son muy buenos, o falta capturar.</div>';
}

function renderFamilias(){
  /* filtros */
  var chips='<button class="et-chip'+(filtroEtapa==='todas'?' on':'')+'" data-fe="todas">TODAS ('+S.familias.length+')</button>';
  ETAPAS.forEach(function(e){
    var n=S.familias.filter(function(f){return f.etapa===e.k}).length;
    chips+='<button class="et-chip'+(filtroEtapa===e.k?' on':'')+'" data-fe="'+e.k+'" style="--c:'+e.c+'"><u></u>'+e.n.toUpperCase()+' ('+n+')</button>';
  });
  $('etFiltros').innerHTML=chips;
  $('etFiltros').querySelectorAll('[data-fe]').forEach(function(b){
    b.addEventListener('click',function(){ filtroEtapa=b.getAttribute('data-fe'); renderFamilias(); });
  });
  /* lista */
  var lista=S.familias.filter(function(f){return filtroEtapa==='todas'||f.etapa===filtroEtapa})
    .slice().sort(function(a,b){ return (a.fecha||'9999')<(b.fecha||'9999')?-1:1; });
  $('listaFamilias').innerHTML= lista.length? lista.map(function(f){
    var e=ETAPA_BY[f.etapa], ix=ETAPAS.findIndex(function(x){return x.k===f.etapa});
    var sig= ix>=0&&ix<4? ETAPAS[ix+1] : null;
    return '<div class="fam"><div class="fam-cab">'
      +'<b>'+esc(f.nombre)+'</b>'
      +'<span class="fam-et" style="--c:'+e.c+';background:'+e.c+'">'+e.n.toUpperCase()+'</span>'
      +'<span class="fam-resp">'+SOCIOS[f.resp].toUpperCase()+(f.rango?' · '+esc(f.rango):'')+(f.act?' · MOV '+fCorta(f.act):'')+'</span></div>'
      +(f.nota||f.contacto||f.origen?'<div class="fam-det">'+esc(f.nota)
        +(f.contacto?'<br><small>'+esc(f.contacto)+(f.origen?' · VÍA '+esc(f.origen).toUpperCase():'')+'</small>':'')+'</div>':'')
      +'<div class="fam-acc">'
      +(f.accion?'<span class="fam-prox'+(esTarde(f.fecha)?' tarde':'')+'">→ '+esc(f.accion)+(f.fecha?' · '+fCorta(f.fecha):'')+'</span>':'<span class="fam-prox" style="color:var(--tenue)">SIN PRÓXIMA ACCIÓN</span>')
      +(sig?'<button class="op" data-avanza="'+esc(f.id)+'">AVANZAR → '+sig.n.toUpperCase()+'</button>':'')
      +(f.etapa!=='fuera'&&f.etapa!=='activa'?'<button class="op" data-fuera="'+esc(f.id)+'">NO AVANZÓ</button>':'')
      +'<button class="op" data-edf="'+esc(f.id)+'">EDITAR</button>'
      +'<button class="op rojo" data-delf="'+esc(f.id)+'" aria-label="Eliminar '+esc(f.nombre)+'">×</button>'
      +'</div></div>';
  }).join('') : '<div class="vacio">'+(S.familias.length?'Ninguna familia en esta etapa.':'Registra la primera familia con «+ Familia».')+'</div>';
  /* handlers */
  var lf=$('listaFamilias');
  lf.querySelectorAll('[data-avanza]').forEach(function(b){b.addEventListener('click',function(){
    var f=S.familias.find(function(x){return x.id===b.getAttribute('data-avanza')}); if(!f)return;
    var ix=ETAPAS.findIndex(function(x){return x.k===f.etapa});
    if(ix>=0&&ix<4){ f.etapa=ETAPAS[ix+1].k; f.act=hoyISO(); save(); render(); toast(f.nombre+' → '+ETAPAS[ix+1].n); }
  })});
  lf.querySelectorAll('[data-fuera]').forEach(function(b){b.addEventListener('click',function(){
    var f=S.familias.find(function(x){return x.id===b.getAttribute('data-fuera')}); if(!f)return;
    if(!confirm('¿Marcar a «'+f.nombre+'» como no avanzó?'))return;
    f.etapa='fuera'; f.act=hoyISO(); save(); render(); toast('Marcada como no avanzó');
  })});
  lf.querySelectorAll('[data-edf]').forEach(function(b){b.addEventListener('click',function(){
    abrirFamilia(S.familias.find(function(x){return x.id===b.getAttribute('data-edf')}));
  })});
  lf.querySelectorAll('[data-delf]').forEach(function(b){b.addEventListener('click',function(){
    var f=S.familias.find(function(x){return x.id===b.getAttribute('data-delf')}); if(!f)return;
    if(!confirm('¿Eliminar a «'+f.nombre+'» del pipeline? Si solo no avanzó, usa «NO AVANZÓ».'))return;
    S.familias=S.familias.filter(function(x){return x!==f}); cerrarFormas(); save(); render();
    toast('Familia eliminada');
  })});
}

function renderTareas(){
  document.querySelectorAll('[data-tf]').forEach(function(b){
    b.classList.toggle('on',b.getAttribute('data-tf')===filtroTarea);
  });
  var lista=S.tareas.filter(function(t){
    if(filtroTarea==='hechas') return t.hecha;
    if(filtroTarea==='andre'||filtroTarea==='goyo') return !t.hecha&&t.resp===filtroTarea;
    return !t.hecha;
  }).sort(function(a,b){ return (a.fecha||'9999')<(b.fecha||'9999')?-1:1; });
  $('listaTareas').innerHTML= lista.length? lista.map(function(t){
    return '<div class="ta-row'+(t.hecha?' hecha':'')+'">'
      +'<button class="ta-check'+(t.hecha?' ok':'')+'" data-tk="'+esc(t.id)+'" aria-label="Marcar tarea">'+(t.hecha?'✓':'')+'</button>'
      +'<span class="ta-txt">'+esc(t.txt)+'</span>'
      +'<span class="ta-meta'+(!t.hecha&&esTarde(t.fecha)?' tarde':'')+'">'+(t.fecha?fCorta(t.fecha):'')+'</span>'
      +'<span style="display:flex;gap:6px;align-items:center"><span class="ta-quien">'+SOCIOS[t.resp].toUpperCase()+'</span>'
      +(!t.hecha?'<button class="op" data-edt="'+esc(t.id)+'">EDITAR</button>':'')
      +'<button class="op rojo" data-delt="'+esc(t.id)+'" aria-label="Eliminar tarea">×</button></span>'
      +'</div>';
  }).join('') : '<div class="vacio">'+(filtroTarea==='hechas'?'Nada terminado todavía.':'Sin tareas aquí. Agrega la primera arriba.')+'</div>';
  var lt=$('listaTareas');
  lt.querySelectorAll('[data-edt]').forEach(function(b){b.addEventListener('click',function(){
    abrirTarea(S.tareas.find(function(x){return x.id===b.getAttribute('data-edt')}));
  })});
  lt.querySelectorAll('[data-tk]').forEach(function(b){b.addEventListener('click',function(){
    var t=S.tareas.find(function(x){return x.id===b.getAttribute('data-tk')}); if(!t)return;
    t.hecha=!t.hecha; save(); render();
  })});
  lt.querySelectorAll('[data-delt]').forEach(function(b){b.addEventListener('click',function(){
    var t=S.tareas.find(function(x){return x.id===b.getAttribute('data-delt')}); if(!t)return;
    if(!confirm('¿Eliminar la tarea «'+t.txt.slice(0,50)+'»?'))return;
    S.tareas=S.tareas.filter(function(x){return x!==t}); save(); render(); toast('Tarea eliminada');
  })});
}

function renderRuta(){
  var obligR=S.ruta.filter(function(h){return !h.op});
  var hechos=obligR.filter(function(h){return h.estado==='hecho'}).length;
  var pct=obligR.length?hechos/obligR.length*100:0;
  $('rutaPct').textContent=Math.round(pct)+'%';
  $('rutaProg').style.strokeDashoffset=(326.7*(1-pct/100)).toFixed(1);
  var frentes=[]; S.ruta.forEach(function(h){ if(frentes.indexOf(h.frente)<0)frentes.push(h.frente); });
  $('listaRuta').innerHTML=frentes.map(function(fr){
    var hs=S.ruta.filter(function(h){return h.frente===fr});
    var obligF=hs.filter(function(h){return !h.op});
    var done=obligF.filter(function(h){return h.estado==='hecho'}).length;
    var cond=hs.length-obligF.length;
    return '<div class="frente"><div class="frente-cab"><span>'+fr+'</span><span>'+done+' / '+obligF.length+(cond?' · +'+cond+' COND':'')+'</span></div>'
      +hs.map(function(h){
        var cls= h.estado==='hecho'?'hecho':(h.estado==='curso'?'curso':'');
        var eti= h.estado==='hecho'?'HECHO':(h.estado==='curso'?'EN CURSO':'PENDIENTE');
        return '<div class="hito-row'+(h.estado==='hecho'?' hecho':'')+'">'
          +'<button class="hito-est '+cls+'" data-hito="'+esc(h.k)+'">'+eti+'</button>'
          +'<span class="hito-txt">'+esc(h.txt)+'</span>'
          +'<span class="hito-f">'+(h.fecha?fCorta(h.fecha)+' '+h.fecha.slice(0,4):'')+'</span></div>';
      }).join('')+'</div>';
  }).join('');
  $('listaRuta').querySelectorAll('[data-hito]').forEach(function(b){b.addEventListener('click',function(){
    var h=S.ruta.find(function(x){return x.k===b.getAttribute('data-hito')}); if(!h)return;
    if(h.estado==='hecho'){
      if(!confirm('¿Regresar «'+h.txt+'» a pendiente?\nSu fecha de término se conserva por si lo vuelves a marcar.'))return;
      h.fechaAntes=h.fecha;
    }
    var ix=(ESTADOS.indexOf(h.estado)+1)%3;
    h.estado=ESTADOS[ix];
    h.fecha= h.estado==='hecho'? (h.fechaAntes||hoyISO()) : null;
    if(h.estado==='hecho') h.fechaAntes=null;
    save(); render();
    if(h.estado==='hecho') toast('✓ '+h.txt.slice(0,50));
  })});
}

function renderAcuerdos(){
  $('listaAcuerdos').innerHTML= S.acuerdos.length? S.acuerdos.slice().reverse().map(function(a){
    return '<div class="ac-row"><div class="ac-meta"><span>'+fCorta(a.f)+' '+a.f.slice(0,4)+'</span>'
      +'<span class="ta-quien">'+SOCIOS[a.quien].toUpperCase()+'</span>'
      +'<button class="op rojo" data-dela="'+esc(a.id)+'" style="margin-left:auto" aria-label="Eliminar acuerdo">×</button></div>'
      +'<p class="ac-txt">'+esc(a.txt)+'</p></div>';
  }).join('') : '<div class="vacio">La bitácora está en blanco. El primer acuerdo la estrena.</div>';
  $('listaAcuerdos').querySelectorAll('[data-dela]').forEach(function(b){b.addEventListener('click',function(){
    var a=S.acuerdos.find(function(x){return x.id===b.getAttribute('data-dela')}); if(!a)return;
    if(!confirm('¿Eliminar este acuerdo de la bitácora? Lo firmado, firmado — bórralo solo si fue un error.'))return;
    S.acuerdos=S.acuerdos.filter(function(x){return x!==a}); save(); render(); toast('Acuerdo eliminado');
  })});
}

/* ── formas ── */
var editando=null, editandoT=null, otraMas=false;
function cerrarFormas(){
  $('formFamilia').classList.remove('abierto');
  editando=null; otraMas=false;
  editandoT=null;
  $('tareaFormTitulo').textContent='Nueva tarea';
  $('tareaSubmit').textContent='Agregar';
}
function abrirFamilia(item){
  cerrarFormas();
  editando=item||null;
  var f=$('formFamilia');
  f.classList.add('abierto');
  f.etapa.innerHTML=ETAPAS.map(function(e){return '<option value="'+e.k+'">'+e.n+'</option>'}).join('');
  f.nombre.value=item?item.nombre:''; f.contacto.value=item?item.contacto:'';
  f.origen.value=item?item.origen:''; f.rango.value=item?item.rango:'';
  f.etapa.value=item?item.etapa:'prospecto';
  f.resp.value=item?item.resp:S.perfil;
  f.accion.value=item?item.accion:''; f.fecha.value=item?(item.fecha||''):'';
  f.nota.value=item?item.nota:'';
  $('famFormTitulo').textContent= item? 'Editar — '+item.nombre : 'Nueva familia';
  $('famSubmit').textContent= item? 'Guardar cambios' : 'Agregar familia';
  $('btnGuardarOtra').style.display= item? 'none' : '';
  f.scrollIntoView({block:'center',behavior:'smooth'}); f.nombre.focus();
}
function abrirTarea(item){
  if(!item)return;
  editandoT=item;
  var f=$('formTarea');
  f.txt.value=item.txt; f.resp.value=item.resp; f.fecha.value=item.fecha||'';
  $('tareaFormTitulo').textContent='Editar tarea';
  $('tareaSubmit').textContent='Guardar cambios';
  f.scrollIntoView({block:'center',behavior:'smooth'}); f.txt.focus();
}
document.querySelectorAll('[data-cerrar]').forEach(function(b){ b.addEventListener('click',cerrarFormas); });

$('formFamilia').addEventListener('submit',function(e){
  e.preventDefault(); var f=e.target;
  var d={nombre:f.nombre.value.trim(),contacto:f.contacto.value.trim(),origen:f.origen.value.trim(),
    rango:f.rango.value,etapa:f.etapa.value,resp:f.resp.value,
    accion:f.accion.value.trim(),fecha:fechaOk(f.fecha.value),nota:f.nota.value.trim(),act:hoyISO()};
  if(!d.nombre){ otraMas=false; toast('Ponle nombre a la familia'); f.nombre.focus(); return; }
  if(editando && S.familias.indexOf(editando)!==-1){ Object.assign(editando,d); toast('Familia actualizada'); }
  else { d.id=uid(); S.familias.push(d); toast('Familia registrada'); }
  var sigue=otraMas;
  cerrarFormas(); save(); render();
  if(sigue) abrirFamilia();
});
$('btnFamilia').addEventListener('click',function(){ abrirFamilia(); });
$('btnGuardarOtra').addEventListener('click',function(){
  otraMas=true;
  $('formFamilia').requestSubmit();
});

$('formTarea').addEventListener('submit',function(e){
  e.preventDefault(); var f=e.target;
  var txt=f.txt.value.trim();
  if(!txt){ toast('Escribe la tarea'); f.txt.focus(); return; }
  if(editandoT && S.tareas.indexOf(editandoT)!==-1){
    Object.assign(editandoT,{txt:txt,resp:f.resp.value,fecha:fechaOk(f.fecha.value)});
    toast('Tarea actualizada');
  } else {
    S.tareas.push({id:uid(),txt:txt,resp:f.resp.value,fecha:fechaOk(f.fecha.value),hecha:false,creada:hoyISO()});
    toast('Tarea agregada');
  }
  editandoT=null;
  $('tareaFormTitulo').textContent='Nueva tarea';
  $('tareaSubmit').textContent='Agregar';
  f.txt.value=''; f.fecha.value='';
  save(); render();
});

$('formAcuerdo').addEventListener('submit',function(e){
  e.preventDefault(); var f=e.target;
  var txt=f.txt.value.trim();
  if(!txt){ toast('Escribe el acuerdo'); f.txt.focus(); return; }
  S.acuerdos.push({id:uid(),f:hoyISO(),quien:S.perfil,txt:txt});
  f.txt.value='';
  save(); render(); toast('Acuerdo guardado — quedó escrito');
});

/* filtros de tareas */
document.querySelectorAll('[data-tf]').forEach(function(b){
  b.addEventListener('click',function(){ filtroTarea=b.getAttribute('data-tf'); renderTareas(); });
});

/* perfil */
document.querySelectorAll('.perfil button').forEach(function(b){
  b.addEventListener('click',function(){
    S.perfil=b.getAttribute('data-p'); save(); render();
    toast('Sesión de '+SOCIOS[S.perfil]);
  });
});

/* respaldo */
function exporta(){
  document.body.classList.remove('menuAbierto');
  var f=hoyISO();
  S.ultimoExport=f; save();
  var blob=new Blob([JSON.stringify(S,null,2)],{type:'application/json'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='northpoint-despacho-'+f+'.json';
  a.click(); URL.revokeObjectURL(a.href);
  toast('Respaldo exportado — compártelo con tu socio'); render();
}
$('btnExporta').addEventListener('click',exporta);
$('chipResp').addEventListener('click',function(){
  if(saveFallo||!S.ultimoExport||diasDesde(S.ultimoExport)>14) exporta();
});
$('btnImporta').addEventListener('click',function(){ $('fileImporta').click(); });
$('fileImporta').addEventListener('change',function(){
  var file=this.files[0]; if(!file)return;
  var rd=new FileReader();
  rd.onload=function(){
    try{
      var p=JSON.parse(rd.result);
      if(!p||typeof p!=='object'||p.v!==1) throw 0;
      var nF=Array.isArray(p.familias)?p.familias.length:0;
      var nT=Array.isArray(p.tareas)?p.tareas.length:0;
      var nA=Array.isArray(p.acuerdos)?p.acuerdos.length:0;
      var fArch=fechaOk(p.ultimoExport);
      if((S.familias.length||S.tareas.length||S.acuerdos.length)
        && !confirm('Importar REEMPLAZA lo de este dispositivo ('
          +S.familias.length+' familias, '+S.tareas.length+' tareas, '+S.acuerdos.length+' acuerdos)'
          +' por lo del archivo ('+nF+' familias, '+nT+' tareas, '+nA+' acuerdos'
          +(fArch?', exportado el '+fCorta(fArch)+' '+fArch.slice(0,4):'')+').'
          +'\nLo de aquí que no esté en el archivo se pierde. ¿Continuar?')) return;
      cerrarFormas();
      /* quién soy y mi historial de respaldo son de ESTE dispositivo, no del archivo */
      var perfilLocal=S.perfil, expLocal=S.ultimoExport;
      S=sanea(p); S.perfil=perfilLocal; S.ultimoExport=expLocal;
      save(); render(); toast('Respaldo importado');
    }catch(e){ toast('Ese archivo no es un respaldo válido'); }
  };
  rd.readAsText(file); this.value='';
});
$('btnBorrar').addEventListener('click',function(){
  if(!confirm('¿Borrar TODO el despacho? Familias, tareas y acuerdos se van; la ruta vuelve a su estado inicial.'))return;
  cerrarFormas();
  var perfilLocal=S.perfil;
  S=fresh(); S.perfil=perfilLocal;
  save(); render(); toast('Despacho en cero');
});

var toastT=null;
function toast(msg){
  var t=$('toast'); t.textContent=msg; t.classList.add('ver');
  clearTimeout(toastT); toastT=setTimeout(function(){t.classList.remove('ver')},2600);
}

/* ── enrutador ── */
var VISTAS={tablero:'Tablero',familias:'Familias',tareas:'Tareas',ruta:'La ruta',acuerdos:'Acuerdos',ajustes:'Ajustes'};
var SUBS={tablero:'La operación completa, de un vistazo.',
  familias:'El pipeline: de la primera llamada a la familia activa.',
  tareas:'Lo que cada socio debe, con fecha.',
  ruta:'Del plan al registro — todo lo que falta para operar en forma.',
  acuerdos:'Lo que se decide se escribe. O no existió.',
  ajustes:'Respaldo, sincronía entre socios y datos.'};
function verVista(v,primerCarga,desdeHistorial){
  if(!VISTAS[v]) v='tablero';
  document.body.setAttribute('data-v',v);
  document.querySelectorAll('.mn').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-v')===v)});
  $('cabTitulo').textContent=VISTAS[v];
  $('cabSub').textContent=SUBS[v]||'';
  document.body.classList.remove('menuAbierto');
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
addEventListener('storage',function(e){
  if(e.key!==K||!e.newValue)return;
  try{ S=sanea(JSON.parse(e.newValue)); }catch(err){ return; }
  cerrarFormas(); render(); toast('Actualizado desde otra pestaña');
});
document.querySelectorAll('[data-obp]').forEach(function(b){
  b.addEventListener('click',function(){
    S.perfil=b.getAttribute('data-obp'); save(); render();
    $('obPerfil').hidden=true;
    toast('Sesión de '+SOCIOS[S.perfil]);
  });
});
render();
if(primerUso) $('obPerfil').hidden=false;
verVista((location.hash||'#/tablero').replace('#/',''), true);
