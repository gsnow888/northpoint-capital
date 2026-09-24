/* ============================================================
   reporte.html — script 1 de 1
   Extraído del JavaScript inline original (1 bloque(s) <script>, línea 431 del HTML original).
   Se carga en el MISMO punto del documento donde estaba: el orden respecto
   al HTML importa (los scripts sólo ven los elementos que ya existen arriba).
   ============================================================ */


// Conteos finales — 6 frentes de auditoría cerrados
const counts = { crit: 6, high: 4, med: 10, low: 4, ok: 8 };
const score = 38; // % listo para vender como producto multi-cliente
document.getElementById('cCrit').textContent = counts.crit;
document.getElementById('cHigh').textContent = counts.high;
document.getElementById('cMed').textContent = counts.med;
document.getElementById('cLow').textContent = counts.low;
document.getElementById('cOk').textContent = counts.ok;
document.getElementById('scoreNum').textContent = score + '%';
const gbar = document.getElementById('gbar');
gbar.innerHTML = '<i style="width:'+score+'%;background:linear-gradient(90deg,var(--high),var(--ok))"></i>'
  + '<i style="width:'+(100-score)+'%;background:rgba(255,255,255,.06)"></i>';
