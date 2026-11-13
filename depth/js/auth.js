/* Cuentas LOCALES de este equipo (localStorage, contraseña con SHA-256 + sal).
   Sirve para separar perfiles e historial; no es un servidor de cuentas. */
(function () {
  'use strict';
  const get = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
  const put = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  async function hash(salt, pw) {
    const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + ':' + pw));
    return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join('');
  }
  window.NPAuth = {
    session: () => get('npd.ses', null),
    logout() { try { localStorage.removeItem('npd.ses'); } catch (e) {} },
    async register(name, email, pw) {
      email = email.trim().toLowerCase(); const u = get('npd.users', {});
      if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email)) throw new Error('Escribe tu nombre y un correo válido.');
      if (pw.length < 8) throw new Error('La contraseña necesita al menos 8 caracteres.');
      if (u[email]) throw new Error('Ya existe una cuenta con ese correo.');
      const salt = Array.from(crypto.getRandomValues(new Uint8Array(12))).map(x => x.toString(16)).join('');
      u[email] = { name: name.trim(), salt, h: await hash(salt, pw) }; put('npd.users', u);
      put('npd.ses', { email, name: name.trim(), t: Date.now() });
    },
    async login(email, pw) {
      email = email.trim().toLowerCase(); const r = get('npd.users', {})[email];
      if (!r || r.h !== await hash(r.salt, pw)) throw new Error('Correo o contraseña incorrectos.');
      put('npd.ses', { email, name: r.name, t: Date.now() });
    }
  };
})();
