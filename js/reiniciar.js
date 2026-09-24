/* ============================================================
   reiniciar.html — script 1 de 1
   Extraído del JavaScript inline original (1 bloque(s) <script>, línea 102 del HTML original).
   Se carga en el MISMO punto del documento donde estaba: el orden respecto
   al HTML importa (los scripts sólo ven los elementos que ya existen arriba).
   ============================================================ */


/* ══ REINICIO ══ (André, 31-ago-2026)
   Las cinco cuentas están copiadas de su Cockpit tal como se muestran ahí:
   los tres PA de Apex ya fondeados y los dos de FundedNext en evaluación, cada
   uno con SU balance real, que en los evals está por debajo de los $50,000.
   Los tamaños se dejan en 50,000 porque es lo que dice el balance de las
   fondeadas; si alguno es de otro tamaño, se corrige en Ajustes → Cuentas. */
const CUENTAS = [
  { alias:'PAAPEX3654310000013',      firma:'Apex',        fase:'payout', size:50000, bal:50000.00,   lider:true },
  { alias:'PAAPEX3654310000014',      firma:'Apex',        fase:'payout', size:50000, bal:50000.00 },
  { alias:'PAAPEX3654310000015',      firma:'Apex',        fase:'payout', size:50000, bal:50000.00 },
  { alias:'FNFTCHANDREMACOUZET42086', firma:'FundedNext',  fase:'eval',   size:50000, bal:48870.50 },
  { alias:'FNFTCHANDREMACOUZET34430', firma:'FundedNext',  fase:'eval',   size:50000, bal:48960.40 },
];
const $ = s => document.querySelector(s);
const money = n => '$' + n.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
$('#tabla').innerHTML = CUENTAS.map(c=>`<tr>
  <td>${c.alias}${c.lider?' <span style="color:#e9cf46">·</span>':''}</td>
  <td>${c.firma}</td>
  <td>${c.fase==='eval'?'evaluación':'fondeada'}</td>
  <td class="r">${money(c.bal)}</td></tr>`).join('');

const log = (t, cls) => { const d=document.createElement('div');
  if(cls) d.className=cls; d.textContent=t; $('#log').appendChild(d); };
/* LA CLAVE SE BUSCA POR CONTENIDO, NO POR NOMBRE (André, 31-ago-2026): el
   estado real se llama 'northpoint_terminal_v3' y un filtro por prefijo 'np_'
   no lo encontraba — habría agarrado 'np_theme' y borrado el tema en vez de la
   cuenta. Se busca el objeto que de verdad parece el estado: el que trae
   session y accounts. */
const claveEstado = () => {
  let mejor = null, may = -1;
  for(let i = 0; i < localStorage.length; i++){
    const k = localStorage.key(i); const v = localStorage.getItem(k) || '';
    if(v.length < 40 || v[0] !== '{') continue;
    let o; try{ o = JSON.parse(v); }catch(e){ continue; }
    if(!o || typeof o !== 'object') continue;
    const parece = ('accounts' in o) || ('session' in o && 'trades' in o);
    if(parece && v.length > may){ may = v.length; mejor = k; }
  }
  return mejor;
};

/* el desplegable de cuentas se llena con las que tengas dadas de alta: sin
   saber a cuál pertenece el trade, la cuenta no lo cuenta y el camino a payout
   quedaría mintiendo. */
(()=>{ const k = claveEstado(); const sel = $('#lgCta2');
  let ctas = [];
  try{ ctas = (JSON.parse(localStorage.getItem(k)) || {}).accounts || []; }catch(e){}
  const act = ctas.filter(a=>a && a.estado==='activa');
  /* «TODAS» es la opción por defecto porque así opera: un trade, la misma
     decisión, ejecutada en las cinco cuentas a la vez. Cada cuenta se lo apunta
     completo — que es justo lo que hace su tablero. */
  sel.innerHTML = `<option value="*">todas las activas (${act.length})</option>` +
    act.map(a=>`<option value="${a.id}">${a.alias}</option>`).join('') +
    '<option value="">— ninguna —</option>';
})();

$('#soloUno').onclick = () => {
  const k = claveEstado();
  if(!k){ log('No encuentro el estado en este navegador.', 'no'); return; }
  let S; try{ S = JSON.parse(localStorage.getItem(k)); }catch(e){ log('No se pudo leer: '+e.message,'no'); return; }
  const pnl = parseFloat($('#lgPnl2').value);
  if(!isFinite(pnl)){ log('Ese P&L no es un número.','no'); return; }
  const cta = $('#lgCta2').value;
  const n = Math.max(1, Math.min(20, parseInt($('#lgN2').value, 10) || 1));
  const activas = (S.accounts || []).filter(a=>a && a.estado==='activa').map(a=>a.id);
  const accts = cta === '*' ? activas : (cta ? [cta] : []);
  const cuantos = (S.trades || []).length;
  if(!confirm('Se borran ' + cuantos + ' trades y quedan ' + n + ' de ' + money(pnl) +
              (accts.length ? ' en ' + accts.length + ' cuenta' + (accts.length>1?'s':'') : ' sin cuenta') +
              '. ¿Seguro?')) return;
  const hoy = new Date();
  const iso = hoy.getFullYear()+'-'+String(hoy.getMonth()+1).padStart(2,'0')+'-'+String(hoy.getDate()).padStart(2,'0');
  /* SE ENTIERRAN LOS VIEJOS: la fusión con la nube es una unión, y sin lápida
     el servidor los devuelve en el siguiente sync. */
  S.borrados = S.borrados || {};
  (S.trades || []).forEach(t => { const k = t && t.id != null ? 'id:'+t.id : 'sin:'+JSON.stringify(t);
    if(t && t.id != null) S.borrados[String(t.id)] = Date.now();
    S.borrados[k] = Date.now(); });
  S.trades = Array.from({length:n}, (_,i) => ({
    id: 't_' + Math.random().toString(36).slice(2,10) + i,
    date: iso, dir: $('#lgDir2').value, pnl,
    accts: accts.slice(), ts: Date.now() + i, upd: Date.now() + i,
  }));
  S.seqTrade = n;
  try{ localStorage.setItem(k, JSON.stringify(S)); }catch(e){ log('No se pudo guardar: '+e.message,'no'); return; }
  log('Listo: se fueron ' + cuantos + ' trades y quedaron ' + n + ' de ' + money(pnl) +
      (accts.length ? ' en ' + accts.length + ' cuenta' + (accts.length>1?'s':'') : ' sin cuenta asignada') + '.', 'ok');
  if(accts.length) log('Cada cuenta se apunta ' + money(pnl*n) + ' del día.');
  $('#ir').style.display = 'block';
};

$('#bkp').onclick = () => {
  const k = claveEstado();
  if(!k){ log('No encuentro el estado en este navegador. ¿Abriste antes la app aquí?', 'no'); return; }
  const dump = {};
  Object.keys(localStorage).forEach(x=>{ dump[x] = localStorage.getItem(x); });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(dump,null,1)], {type:'application/json'}));
  a.download = 'northpoint-respaldo-' + new Date().toISOString().slice(0,19).replace(/[:T]/g,'-') + '.json';
  a.click();
  log('Respaldo descargado (' + Object.keys(dump).length + ' llaves, clave del estado: ' + k + ').', 'ok');
  log('Guárdalo antes de seguir. Ya puedes borrar.');
  $('#go').disabled = false;
};

$('#go').onclick = () => {
  if(!confirm('Se borran trades, caja, journal y todo el avance de Kuro. ¿Ya guardaste el respaldo?')) return;
  const k = claveEstado();
  if(!k){ log('No encuentro el estado.', 'no'); return; }
  let S;
  try{ S = JSON.parse(localStorage.getItem(k)); }catch(e){ log('El estado no se pudo leer: '+e.message,'no'); return; }
  if(!S || typeof S !== 'object'){ log('El estado no es un objeto.','no'); return; }
  const yo = (S.session && S.session.user) || 'andre.np';
  const hoy = new Date().toISOString().slice(0,10);
  const uid = () => Math.random().toString(36).slice(2,10);

  /* ── lo que se borra ── */
  S.trades = []; S.caja = []; S.journal = []; S.posiciones = []; S.notas = [];
  S.seqTrade = 0; S.lgSesion = {}; S.lgPreset = null;
  /* ── KURO desde cero, PERO TU MONITO SE QUEDA ──
     No se tocan: S.monitos (tu cara), S.batNinja (tu ninja de Kuro), S.mesa,
     S.profile, S.contrato, S.correos, S.claves ni S.bienvenida. Antes borraba
     batNinja porque la apertura sólo se disparaba al canjear el kit, y para
     eso había que quedarse sin ninja: había que destruir tu monito para volver
     a ver la animación. Ahora se pide con una marca. */
  S.bossWin = {}; S.batKatanas = {}; S.batEquipada = {};
  S.batKit = {}; S.batStack = {}; S.batPico = {}; S.batStats = {}; S.batGanado = {};
  S.batHistorial = []; S.batTorneosInsc = {}; S.batTorneosPagado = {}; S.batChFin = {};
  S.challenge = null; S.batKatanasLimpio = 2;
  S.batVerAlta = true;        /* la apertura se ve una vez, sin borrar nada */
  /* ── las cinco cuentas, ya dadas de alta ── */
  S.accounts = CUENTAS.map((c,i)=>({
    id:'ac_'+uid(), alias:c.alias, orden:i+1, desde:hoy,
    estado:'activa', owner:yo, tipo:'prop',
    size:c.size, start:c.bal, fase:c.fase, firma:c.firma,
    upd: Date.now(),
  }));
  try{ localStorage.setItem(k, JSON.stringify(S)); }catch(e){ log('No se pudo guardar: '+e.message,'no'); return; }
  log('Listo. ' + S.accounts.length + ' cuentas dadas de alta, Kuro desde cero.', 'ok');
  log('Trades, caja y journal en cero. La nube se sincroniza al abrir el terminal.');
  log('Al entrar a Kuro verás la apertura completa: la pared, la feria y el Edén.');
  $('#go').disabled = true;
  $('#ir').style.display = 'block';
};
$('#ir').onclick = () => location.href = 'app.html';
