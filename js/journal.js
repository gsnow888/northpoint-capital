/* ============================================================
   journal.html — script 1 de 1
   Extraído del JavaScript inline original (1 bloque(s) <script>, línea 459 del HTML original).
   Se carga en el MISMO punto del documento donde estaba: el orden respecto
   al HTML importa (los scripts sólo ven los elementos que ya existen arriba).
   ============================================================ */


/* ============================================================
   CONTRATO 30 DÍAS — datos exactos del PDF
   ============================================================ */
const FASES = {
  eval: {
    key:'eval', nombre:'EVAL 50K', color:'var(--eval)', cls:'d-eval',
    reglas:{contratos:4, ratio:'1:2', riesgo:500, objetivo:'+1,000'},
    target:53000, base:50000, targetLabel:'53K TARGET',
    ladder:[50000,51000,52000,53000]
  },
  buff: {
    key:'buff', nombre:'BUFFER', color:'var(--buff)', cls:'d-buff',
    reglas:{contratos:2, ratio:'1:1', riesgo:500, objetivo:'+500'},
    target:52500, base:50000, targetLabel:'52.5K TARGET',
    ladder:[50000,50500,51000,51500,52000,52500]
  },
  pay: {
    key:'pay', nombre:'DAILY PAYOUTS', color:'var(--pay)', cls:'d-pay',
    reglas:{contratos:1, ratio:'—', riesgo:250, objetivo:'+250 a +1,000'},
    target:null, base:0, targetLabel:'PAYOUT DIARIO',
    ladder:null
  }
};

/* Días de trading del contrato (calendario del PDF, sep 2026) */
const DIAS = [
  ['2026-08-31','eval'],['2026-09-01','eval'],['2026-09-02','eval'],
  ['2026-09-03','buff'],['2026-09-04','buff'],
  ['2026-09-07','buff'],['2026-09-08','buff'],['2026-09-09','buff'],['2026-09-10','buff'],['2026-09-11','buff'],
  ['2026-09-14','buff'],['2026-09-15','buff'],['2026-09-16','buff'],['2026-09-17','buff'],['2026-09-18','buff'],
  ['2026-09-21','pay'],['2026-09-22','pay'],['2026-09-23','pay'],['2026-09-24','pay'],['2026-09-25','pay'],
  ['2026-09-28','pay'],['2026-09-29','pay'],['2026-09-30','pay']
];
const FASE_DE = Object.fromEntries(DIAS);

const RUTINA = [
  ['premarket','Premarket','7:00 AM'],
  ['opening','Opening NY','7:30 AM'],
  ['orb','ORB + Entry','7:45 AM'],
  ['cierre','Cierre','9:00 AM']
];
const SETUP = [
  ['orbkz','ORB + Killzones'],
  ['emas','EMAs 14 / 50'],
  ['smc','SMC'],
  ['break','ENTRY al break']
];

const LS_KEY = 'np_journal_contrato30';
let db = {};
try { db = JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch(e){ db = {}; }
function persist(){ try{ localStorage.setItem(LS_KEY, JSON.stringify(db)); }catch(e){} }

const $ = id => document.getElementById(id);
const fmt = n => (n<0?'-':'') + '$' + Math.abs(n).toLocaleString('en-US',{maximumFractionDigits:0});
const fmtSign = n => (n>=0?'+':'-') + '$' + Math.abs(n).toLocaleString('en-US',{maximumFractionDigits:0});

/* ============================================================
   CALENDARIO — 30 ago (dom) a 10 oct para cuadrar semanas
   ============================================================ */
const DOW = ['dom','lun','mar','mié','jue','vie','sáb'];
function buildCal(){
  const grid = $('calGrid');
  grid.innerHTML = '';
  DOW.forEach(d=>{
    const el = document.createElement('div');
    el.className='cal-dow'; el.textContent=d;
    grid.appendChild(el);
  });
  const start = new Date(2026,7,30); // dom 30 ago
  const hoy = todayStr();
  for(let i=0;i<35;i++){
    const d = new Date(start); d.setDate(start.getDate()+i);
    const iso = d.toISOString().slice(0,10);
    const fase = FASE_DE[iso];
    const cell = document.createElement('div');
    cell.className = 'day';
    const n = document.createElement('div'); n.className='n';
    n.textContent = d.getDate() + (d.getDate()===1 ? ' '+['ago','sep','oct'][d.getMonth()-7] : (iso==='2026-08-31'?' ago':''));
    cell.appendChild(n);
    if(!fase){ cell.classList.add('off'); }
    else{
      const f = FASES[fase];
      cell.classList.add('trading', f.cls);
      const ph = document.createElement('div'); ph.className='ph';
      ph.textContent = fase==='eval'?'EVAL':fase==='buff'?'BUFF':'PAYOUT';
      cell.appendChild(ph);
      const e = db[iso];
      if(e && e.sellado){
        const res = document.createElement('div');
        const r = parseFloat(e.resultado);
        if(e.dir==='none' || isNaN(r)){ res.className='res flat'; res.textContent='—'; }
        else if(r>=0){ res.className='res win'; res.textContent='✓'; }
        else { res.className='res loss'; res.textContent='✕'; }
        cell.appendChild(res);
        if(!isNaN(r) && e.dir!=='none'){
          const amt=document.createElement('div'); amt.className='amt';
          amt.textContent=fmtSign(r); cell.appendChild(amt);
        }
      }
      if(iso===hoy) cell.classList.add('today');
      cell.addEventListener('click',()=>openDay(iso));
    }
    grid.appendChild(cell);
  }
}
function todayStr(){
  const t = new Date();
  return t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');
}

/* ============================================================
   STATS
   ============================================================ */
function faseActual(){
  const hoy = todayStr();
  if(hoy < '2026-08-31') return 'eval';
  let ultima = 'eval';
  for(const [iso,f] of DIAS){ if(iso <= hoy) ultima = f; }
  return ultima;
}
function refreshStats(){
  const fk = faseActual();
  const f = FASES[fk];
  $('faseV').textContent = fk==='eval'?'EVAL':fk==='buff'?'BUFFER':'PAYOUTS';
  $('faseV').style.color = f.color;
  $('faseS').textContent = f.targetLabel;
  const st = $('statFase');
  st.className = 'stat ' + (fk==='eval'?'ph-eval':fk==='buff'?'ph-buff':'ph-pay');

  // balance de fase (eval y buffer arrancan en 50k cada una)
  let sum = 0, dias = 0, payouts = 0, racha = 0;
  for(const [iso,fase] of DIAS){
    const e = db[iso];
    if(!(e && e.sellado)) { continue; }
    dias++;
    const r = parseFloat(e.resultado);
    if(fase===fk && !isNaN(r) && fk!=='pay') sum += r;
    if(fase==='pay' && !isNaN(r) && r>0) payouts += r;
  }
  // racha lock in: días sellados consecutivos desde el último día operable pasado
  const hoy = todayStr();
  const pasados = DIAS.filter(([iso])=>iso<=hoy);
  for(let i=pasados.length-1;i>=0;i--){
    const e = db[pasados[i][0]];
    if(e && e.sellado) racha++; else break;
  }

  if(fk==='pay'){
    $('balV').textContent = fmt(payouts);
    $('balS').textContent = 'cobrado en fase payouts';
  } else {
    $('balV').textContent = fmt(f.base + sum);
    $('balS').textContent = 'target ' + fmt(f.target);
  }
  $('payV').textContent = fmt(payouts);
  $('diasV').textContent = dias + ' / ' + DIAS.length;
  $('rachaS').textContent = 'racha lock in: ' + racha;

  // progreso
  const bar = $('progBar');
  bar.style.background = f.color;
  if(f.target){
    const bal = f.base + sum;
    const pct = Math.max(0, Math.min(100, (bal - f.base) / (f.target - f.base) * 100));
    bar.style.width = pct + '%';
    $('progPct').textContent = Math.round(pct) + '%';
    $('progLabel').textContent = 'Fase ' + (fk==='eval'?'1 · EVAL → 53K':'2 · BUFFER → 52.5K');
    $('progLadder').innerHTML = f.ladder.map(v=>'<span>'+(v/1000)+'K</span>').join('');
  } else {
    const diasPay = DIAS.filter(([,x])=>x==='pay').length;
    const hechos = DIAS.filter(([iso,x])=>x==='pay' && db[iso] && db[iso].sellado).length;
    const pct = Math.round(hechos/diasPay*100);
    bar.style.width = pct + '%';
    $('progPct').textContent = pct + '%';
    $('progLabel').textContent = 'Fase 3 · Daily Payouts';
    $('progLadder').innerHTML = '<span>21 SEP</span><span>PAYOUT DIARIO</span><span>30 SEP</span>';
  }
}

/* ============================================================
   PANEL DE DÍA
   ============================================================ */
let diaAbierto = null;
const MESES = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

function entry(iso){
  if(!db[iso]) db[iso] = {rutina:{},setup:{},dir:'',cts:'',resultado:'',riesgoOk:'',notas:'',sellado:false};
  return db[iso];
}

function openDay(iso){
  diaAbierto = iso;
  const fase = FASE_DE[iso];
  const f = FASES[fase];
  const e = entry(iso);
  const d = new Date(iso+'T12:00:00');

  const panel = $('panel');
  panel.className = 'panel ' + f.cls;
  $('pTag').textContent = (fase==='eval'?'FASE 1 · EVAL 50K':fase==='buff'?'FASE 2 · BUFFER · REDPILL':'FASE 3 · DAILY PAYOUTS');
  $('pTitle').textContent = DOW[d.getDay()] + ' ' + d.getDate() + ' ' + MESES[d.getMonth()];

  $('pRules').innerHTML = [
    '<span class="chip"><b>'+f.reglas.contratos+' mini</b> máx</span>',
    '<span class="chip"><b>1 trade</b> único</span>',
    f.reglas.ratio!=='—' ? '<span class="chip">ratio <b>'+f.reglas.ratio+'</b></span>' : '',
    '<span class="chip">riesgo <b>$('+f.reglas.riesgo+')</b></span>',
    '<span class="chip">objetivo <b>'+f.reglas.objetivo+'</b></span>'
  ].join('');

  // rutina
  $('rutinaChecks').innerHTML = '';
  RUTINA.forEach(([k,t,h])=>{
    const lab = document.createElement('label');
    lab.className = 'chk' + (e.rutina[k]?' done':'');
    lab.innerHTML = '<input type="checkbox" '+(e.rutina[k]?'checked':'')+'><span class="t">'+t+'</span><span class="hora">'+h+'</span>';
    lab.querySelector('input').addEventListener('change',ev=>{
      e.rutina[k]=ev.target.checked; lab.classList.toggle('done',ev.target.checked); persist();
    });
    $('rutinaChecks').appendChild(lab);
  });

  // setup A+
  $('setupChecks').innerHTML = '';
  SETUP.forEach(([k,t])=>{
    const lab = document.createElement('label');
    lab.className = 'chk' + (e.setup[k]?' done':'');
    lab.innerHTML = '<input type="checkbox" '+(e.setup[k]?'checked':'')+'><span class="t">'+t+'</span>';
    lab.querySelector('input').addEventListener('change',ev=>{
      e.setup[k]=ev.target.checked; lab.classList.toggle('done',ev.target.checked); persist();
    });
    $('setupChecks').appendChild(lab);
  });

  // form
  $('ctsLabel').textContent = 'Contratos (máx ' + f.reglas.contratos + ' mini)';
  $('cts').value = e.cts; $('cts').max = f.reglas.contratos;
  $('resultado').value = e.resultado;
  $('riesgoOk').value = e.riesgoOk;
  $('notas').value = e.notas;
  paintDir(e.dir);
  validar();

  $('savedFlash').classList.remove('show');
  $('overlay').classList.add('open');
  document.body.style.overflow='hidden';
}

function paintDir(dir){
  document.querySelectorAll('#dirSeg button').forEach(b=>{
    b.className='';
    if(b.dataset.dir===dir){
      b.className = dir==='long'?'on-long':dir==='short'?'on-short':'on-none';
    }
  });
}

function validar(){
  if(!diaAbierto) return;
  const f = FASES[FASE_DE[diaAbierto]];
  const e = entry(diaAbierto);
  const msgs = [];
  const cts = parseInt($('cts').value);
  if(!isNaN(cts) && cts > f.reglas.contratos) msgs.push('⚠ Máximo '+f.reglas.contratos+' mini en esta fase.');
  const r = parseFloat($('resultado').value);
  if(!isNaN(r) && r < -f.reglas.riesgo) msgs.push('⚠ Pérdida mayor al riesgo máximo $('+f.reglas.riesgo+').');
  if($('riesgoOk').value==='no') msgs.push('⚠ Día fuera de reglas. El contrato es LOCK IN.');
  const w = $('warnBox');
  if(msgs.length){ w.innerHTML = msgs.join('<br>'); w.classList.add('show'); }
  else w.classList.remove('show');
}

function closePanel(){
  $('overlay').classList.remove('open');
  document.body.style.overflow='';
  diaAbierto = null;
  buildCal(); refreshStats();
}

$('closeBtn').addEventListener('click',closePanel);
$('overlay').addEventListener('click',ev=>{ if(ev.target===$('overlay')) closePanel(); });
document.addEventListener('keydown',ev=>{ if(ev.key==='Escape' && diaAbierto) closePanel(); });

document.querySelectorAll('#dirSeg button').forEach(b=>{
  b.addEventListener('click',()=>{
    if(!diaAbierto) return;
    entry(diaAbierto).dir = b.dataset.dir;
    paintDir(b.dataset.dir); persist();
  });
});
['cts','resultado','riesgoOk','notas'].forEach(id=>{
  $(id).addEventListener('input',()=>{
    if(!diaAbierto) return;
    const e = entry(diaAbierto);
    e.cts = $('cts').value;
    e.resultado = $('resultado').value;
    e.riesgoOk = $('riesgoOk').value;
    e.notas = $('notas').value;
    persist(); validar();
  });
});

$('saveBtn').addEventListener('click',()=>{
  if(!diaAbierto) return;
  entry(diaAbierto).sellado = true;
  persist();
  $('savedFlash').classList.add('show');
  setTimeout(closePanel, 650);
});
$('clearBtn').addEventListener('click',()=>{
  if(!diaAbierto) return;
  delete db[diaAbierto];
  persist();
  openDay(diaAbierto);
});

buildCal();
refreshStats();
