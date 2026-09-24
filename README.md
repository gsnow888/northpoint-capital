# northpointcapital.io — proyecto local editable

Reconstrucción fiel del sitio público **https://northpointcapital.io/** (estado del 23 de septiembre de 2026) como proyecto estático local: HTML5 + CSS3 + JavaScript vanilla, sin frameworks, sin build y sin dependencias del sitio original.

Cada página del sitio vivo era un solo archivo con todo el CSS y el JS inline. Aquí cada página conserva **exactamente** su HTML, su contenido, su orden y su lógica, pero el CSS vive en `css/`, el JS en `js/`, los assets en `assets/` y las fuentes se sirven desde el propio proyecto (antes venían de Google Fonts y Fontshare).

Documentos que acompañan al proyecto:

- `INVENTARIO.md` — auditoría completa del sitio original (páginas, secciones, componentes, assets, tokens, breakpoints, interacciones, enlaces, formularios).
- `VERIFICACION.md` — resultado de la comparación vivo vs. local (alturas, elementos, tipografía, colores, píxeles) en 1440, 1920, 768, 390 y 430 px.

---

## 1. Estructura

> **Cambios posteriores a la reconstrucción (23-sep-2026, por Gregorio):** el índice de la portada pasó a cinco entradas (Family Office /0.1 · Socios /0.2 · Memos /0.3 · Newsletter /0.4 · Terminal /0.5); se crearon `socios.html`, `memos.html` y `newsletter.html` con la piel de la portada; el primer memo vive en `memos/memo-btc-sep-2026.html`; el bloque invisible "Las otras puertas" se retiró de la portada; el subtítulo de marca, el title y el Open Graph de la portada dicen ahora "Family Office · Terminal". `INVENTARIO.md` y `VERIFICACION.md` documentan el sitio **original**; estos cambios se describen en este README (§1, §3 y §7).

```
northpointcapital-site/
├── index.html                 ← portada: índice de cinco entradas
├── family-office.html         ← Family Office (índice /0.1)
├── socios.html                ← Socios (índice /0.2) · piel de la portada
├── memos.html                 ← Memos de mercado (índice /0.3) · lista de memos
├── memos/                     ← un archivo por memo (memo-btc-sep-2026.html)
├── newsletter.html            ← Newsletter (índice /0.4) · formulario
├── northpoint-app.html        ← landing del Terminal (índice /0.5)
├── oficina.html               ← "La oficina" del family office
├── kuro.html                  ← Kuro, el trading game
├── terminal.html              ← planes y precios del Terminal
├── app.html                   ← EL TERMINAL (la aplicación, para miembros)
├── perfil.html · pablo.html   ← fundadores
├── gracias.html               ← página de éxito tras el pago
├── 404.html                   ← página de error (GitHub Pages la sirve sola)
├── despacho · programa · respaldo · dossier · invitacion · journal · reporte
│   reiniciar · centro · bootcamp · battles-aesthetics .html
│                              ← páginas sin enlace desde la navegación (accesibles por URL)
├── legal/
│   ├── terminos.html · privacidad.html · riesgo.html
├── css/
│   ├── <página>.css           ← una hoja por página (fuentes locales al inicio + CSS original íntegro)
│   ├── index.css              ← además de la portada, es la PIEL compartida de socios/memos/newsletter
│   ├── socios.css · memos.css · newsletter.css · memo-btc-sep-2026.css ← lo propio de cada página nueva
│   └── legal.css              ← compartida por legal/*.html y 404.html
├── js/
│   ├── <página>.js            ← el JS de cada página, en el mismo punto del documento donde estaba
│   ├── <página>-2.js          ← segundo grupo de scripts cuando la página tenía scripts en dos puntos distintos
│   ├── portada.js             ← reveal + tema + nav para socios/memos/newsletter (la lógica de index.js sin las escenas)
│   ├── newsletter.js · memo-btc-sep-2026.js
│   └── academia/              ← módulos de la academia que carga app.html (prog1-4.js, portfolio.js)
├── assets/
│   ├── images/                ← og.png, tr/ (ejecuciones), marca/ (retratos, capturas), kuro-*.jpg, np-como.jpg, amr-chart.jpg
│   ├── icons/favicon.svg
│   ├── fonts/                 ← 126 archivos woff2 (Inter, IBM Plex Mono, Archivo, General Sans, Shippori Mincho B1, …)
│   ├── docs/                  ← NORTHPOINT-Andre.pdf (lo enlaza reporte.html)
│   ├── svg/ · videos/         ← vacías: el sitio no tiene SVG sueltos ni videos (todo es SVG inline o canvas)
├── data/mercado.json          ← datos de mercado que lee app.html (instantánea del 23-sep-2026)
├── scripts/mercado.py         ← el script que regenera data/mercado.json (lo corre el GitHub Action)
├── .github/workflows/mercado.yml ← Action: actualiza data/mercado.json cada 20 min (sólo funciona en GitHub)
├── tools/serve.js             ← servidor local sin dependencias (node tools/serve.js)
├── CNAME · .nojekyll · robots.txt · sitemap.xml ← archivos de hosting (GitHub Pages)
├── INVENTARIO.md · VERIFICACION.md · README.md
```

No hay un `responsive.css` separado: cada página tenía sus `@media` mezclados con el resto de su CSS y separarlos cambiaría el orden de la cascada. Los breakpoints de cada página están listados en `INVENTARIO.md` (§2) y se buscan con `@media` dentro de `css/<página>.css`.

Las páginas se quedaron **en la raíz** (no en `pages/`) a propósito: las URLs públicas (`/terminal.html`, `/legal/riesgo.html`, `/app.html`…) están en el sitemap, en las etiquetas canonical/Open Graph, en enlaces absolutos de `404.html` y `kuro.html`, y en los enlaces que la marca ya repartió (Instagram, Discord). Moverlas rompería todo eso al volver a subir el sitio.

---

## 2. Abrir el proyecto

**Doble clic en `index.html`** funciona para casi todo el sitio (todas las rutas son relativas).

Para que funcione el **100 %** hace falta un servidor local, por dos cosas: `app.html` carga `data/mercado.json` con `fetch` (los navegadores bloquean fetch sobre `file://`) y la página `404.html` sólo aparece si un servidor la sirve.

```bash
# opción A (Node, sin instalar nada)
node tools/serve.js . 8080        # → http://localhost:8080

# opción B (Python)
python3 -m http.server 8080       # → http://localhost:8080  (no sirve 404.html en errores)
```

---

## 3. Dónde modificar cada cosa

| Quiero cambiar… | Dónde |
|---|---|
| **Textos** | En el HTML de cada página. Los textos están tal cual, con sus mayúsculas, saltos y símbolos. Los textos que genera JavaScript (pestañas, demos, mensajes como «ABRE EN UNOS DÍAS», toda la interfaz del Terminal) están en `js/<página>.js`. |
| **Imágenes** | `assets/images/`. Sustituye el archivo por otro con el mismo nombre, o cambia la ruta en el HTML (`<img src="assets/images/…">`) o en el JS donde se arma por código (por ejemplo `js/index-2.js` arma la cinta `assets/images/tr/np-tr-01…10.jpg`; `js/kuro.js` lista `kuro-c-*.jpg`). |
| **Colores** | Al principio de `css/<página>.css`, en `:root{ --bg… --txt… }`. La portada tiene dos temas: `:root` (oscuro) y `[data-theme="light"]` (claro). El JS arranca en **claro** si el visitante no ha elegido tema (`js/index.js`, función `applyTheme`, guarda la elección en `localStorage` como `np_theme`). |
| **Tipografías** | (1) Las declaraciones `@font-face` están al inicio de `css/<página>.css` y apuntan a `assets/fonts/`. (2) Qué fuente usa cada cosa lo deciden las variables `--sans`, `--mono`, `--kanji`, `--serif`… del mismo archivo. Para cambiar de familia: añade sus `.woff2` a `assets/fonts/`, declara los `@font-face` y cambia la variable. |
| **Navegación** | Portada: el índice son los cinco `<a class="ix">` dentro de `<section id="indice">` (el número `/0.N` va en el `<span class="fr">`); el botón «Terminal →» y el conmutador de tema están en `<div class="deck">` (barra fija inferior); la marca de arriba en `<nav class="nav">`. Pie legal: `<footer class="pie-legal">`. Cada página interior tiene su propia nav (busca `<nav` en el HTML). |
| **Socios** | `socios.html`: un `<article class="fund">` por socio (foto 3:4 en `assets/images/marca/fotos/`, nombre, rol, párrafos `.fund-bio`, credenciales `.fund-cred`, etiquetas `.fund-tags`, enlace `.fund-liga`). Los estilos `.fund-*` viven en `css/index.css`; los retratos se muestran en blanco y negro por `css/socios.css`. |
| **Memos** | Lista: `memos.html`, un `<a class="ix memo">` por memo, el más reciente arriba. Cada memo es un archivo en `memos/` con su CSS y JS en `css/` y `js/`. Para publicar uno nuevo autocontenido (CSS/JS inline, foto en base64) usa `_reconstruccion/integrar-memo.js`, que lo desempaqueta e integra al proyecto; después agrega su fila en `memos.html` y su URL en `sitemap.xml`. Los tres huecos "GRÁFICA" del memo de Bitcoin están comentados en su HTML, listos para un `<figure class="fig">`. |
| **Newsletter** | `newsletter.html` (copy y puntos "qué recibes") y `js/newsletter.js` (el envío abre el correo del visitante hacia `andremacouzetruiz@gmail.com`, igual que el formulario del family office). Cuando exista proveedor, su formulario sustituye a ese manejador. |
| **Metadatos / SEO** | `<head>` de cada página: title, description, canonical, Open Graph, Twitter. `sitemap.xml` y `robots.txt` en la raíz. |
| **Precios y botones de pago** | `terminal.html` (los planes) y `js/terminal.js` → constante `PAGO` con las URLs de Stripe/MercadoPago. En el original están **vacías**: por eso los botones dicen «ABRE EN UNOS DÍAS». Pega ahí las URLs de cobro. `gracias.html` es la URL de éxito que hay que dar a Stripe/MercadoPago. |
| **Redes** | `js/index.js` → objeto `REDES` (Kick, YouTube, Discord). El enlace de Discord (`discord.gg/eEp8Tv9tr`) aparece también en `404.html`, `perfil.html`, `pablo.html`, `dossier.html`, `invitacion.html` y `respaldo.html`. Las invitaciones de Discord caducan a los 30 días salvo que se generen como «nunca». |

### Añadir una página

1. Copia la página que más se le parezca (por ejemplo `pablo.html`) con otro nombre.
2. Crea `css/nueva.css` y `js/nueva.js` (o copia los de la página origen) y ajusta los `<link>` y `<script src>`.
3. Enlázala desde donde toque (índice de la portada, pie, nav) y añádela a `sitemap.xml`.
4. Si va en una subcarpeta (como `legal/`), las rutas suben un nivel: `../css/`, `../assets/`.

---

## 4. Volver a subirlo a un hosting

**GitHub Pages (el hosting actual).** El proyecto está listo tal cual: sube todo el contenido de esta carpeta a la raíz de la rama `main` del repo `studioamr/northpoint-capital`. Incluye `CNAME` (dominio), `.nojekyll`, `404.html` y el workflow `.github/workflows/mercado.yml`, que seguirá actualizando `data/mercado.json` cada 20 minutos (necesita en el repo: *Settings → Actions → Workflow permissions → Read and write*).

**Cualquier otro hosting estático (Netlify, Vercel, cPanel, S3…).** Sube la carpeta completa. Todo es relativo, así que funciona en la raíz del dominio. Ten en cuenta:

- Configura `404.html` como página de error en el panel del hosting.
- `data/mercado.json` dejará de actualizarse solo: corre `python3 scripts/mercado.py` en un cron del servidor (o deja el repo en GitHub sólo para eso).
- Las etiquetas `canonical` / `og:url` / `og:image` y `sitemap.xml` llevan el dominio `northpointcapital.io` escrito. Si cambias de dominio, búscalo y reemplázalo.
- `404.html` y `kuro.html` usan enlaces absolutos (`/app.html`, `/legal/…`): sólo funcionan si el sitio vive en la raíz del dominio, igual que hoy.

---

## 5. Lo que hay que saber del sitio original (tal cual está)

Estas cosas se conservaron **sin cambios** porque así están en el sitio vivo. Se listan para que no sorprendan:

1. **"Las otras puertas" era invisible en la portada del sitio vivo.** El bloque `<div id="casas">` (tarjetas NorthPoint App / Family Office / Kuro) existía y ocupaba ~480 px, pero nunca se mostraba: sus elementos llevaban la clase `rv` (revelar al hacer scroll) y el `IntersectionObserver` que los revela se crea en `js/index.js`, que corre **antes** de que ese bloque exista en el DOM. **Ya no está**: se retiró el 23-sep-2026 al ampliar el índice a cinco entradas (repetía la Family Office y el Terminal). Si algún día agregas contenido con clase `rv` después de `<script src="js/index.js">`, ten en cuenta ese orden: o lo pones antes del script, o mueves el script al final del `<body>`.
2. **Los botones de pago no cobran** (`PAGO` vacío en `js/terminal.js`) y dicen «ABRE EN UNOS DÍAS».
3. **`js/index.js` arrastra código de secciones que ya no existen** (escenas del leopardo, del skyline, del journal, demo del Terminal, cinta de reseñas…). Cada módulo comprueba si su elemento existe y, si no, no hace nada. Es peso muerto (~90 KB) pero se conservó para no alterar la página; puedes borrarlo cuando quieras.
4. **La portada arranca en tema claro** aunque el CSS declare el oscuro como base. Hay un parpadeo oscuro→claro de unos milisegundos en la primera carga (así ocurre en el sitio vivo).
5. **El navegador pide `/favicon.ico` y recibe 404** en todas las páginas (el sitio sólo tiene `favicon.svg`). Es inofensivo; si molesta, añade un `favicon.ico` en la raíz.
6. **El Terminal (`app.html`) funciona sin conexión en "modo local"** (guarda en `localStorage`). Sólo la sincronización/login (Supabase) y el asistente (API de Anthropic, con la llave que escriba el usuario) requieren internet. Ambas URLs están en `js/app.js` (`CLOUD`, `api.anthropic.com`).
7. **Fuentes en las páginas legales.** `legal/*.html` y `404.html` no cargaban Google Fonts en el original: usan "Helvetica Neue"/Inter y IBM Plex Mono sólo si están instaladas en el equipo del visitante. Se dejó igual.

---

## 6. Lo que NO se pudo replicar de forma idéntica

```
[NO REPLICADO]
Elemento:   Actualización automática de data/mercado.json cada 20 minutos
Razón:      La hace un GitHub Action en los servidores de GitHub, no la página
Alternativa: Se incluyen el workflow y scripts/mercado.py. En local queda la instantánea
             del 23-sep-2026; en GitHub Pages vuelve a actualizarse sola.

[NO REPLICADO]
Elemento:   Página 404 automática
Razón:      La sirve el hosting, no el HTML
Alternativa: tools/serve.js la sirve en local; en otro hosting hay que configurarla.

[NO REPLICADO]
Elemento:   Subconjuntos completos de las fuentes japonesas (Shippori Mincho B1 en kuro.html,
            DotGothic16 en battles-aesthetics.html)
Razón:      Google Fonts sirve esas familias en ~120 fragmentos por peso (varios MB). 
Alternativa: Se descargaron sólo los fragmentos que cubren los caracteres que esas páginas
             usan de verdad (黒 九 白 赤 青 黄 緑 紫 橙 茶 決 y latín). Si añades kanji
             nuevos a kuro.html, agrega su fragmento en css/kuro.css (o vuelve al <link>
             de Google Fonts original, que está anotado en un comentario).

[NO REPLICADO]
Elemento:   Login, sincronización en la nube y asistente IA del Terminal
Razón:      Son servicios externos (Supabase, API de Anthropic)
Alternativa: Se conservan las llamadas tal cual; funcionan igual que en el sitio vivo
             cuando hay internet. Sin internet, el Terminal trabaja en modo local.
```

Todo lo demás —textos, estructura, tipografía, colores, espaciados, animaciones CSS y canvas, hover, focus, reveals, tema claro/oscuro, formularios, iframes, acordeones, barras fijas, comportamiento responsive— está replicado con el código original.
