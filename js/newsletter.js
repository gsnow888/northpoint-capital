/* ============================================================
   newsletter.html — el formulario de suscripción.
   Mismo mecanismo que family-office.html: no hay proveedor de correo
   todavía, así que al enviar se abre el cliente de correo del visitante
   con la solicitud ya escrita. Cuando haya proveedor, sustituye este
   manejador por el formulario/embed del proveedor.
   ============================================================ */
(function(){
  var form = document.getElementById('nlForm');
  if (!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var mail = form.email.value;
    location.href = 'mailto:andremacouzetruiz@gmail.com?subject=Newsletter%20NORTHPOINT&body=' +
      encodeURIComponent('Quiero recibir la lectura semanal del Norte.\n\nMi correo: ' + mail);
    var ok = document.getElementById('nlOk');
    if (ok) ok.hidden = false;
  });
})();
