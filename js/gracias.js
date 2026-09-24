/* ============================================================
   gracias.html — script 1 de 1
   Extraído del JavaScript inline original (1 bloque(s) <script>, línea 157 del HTML original).
   Se carga en el MISMO punto del documento donde estaba: el orden respecto
   al HTML importa (los scripts sólo ven los elementos que ya existen arriba).
   ============================================================ */


/* El Discord vive en UN solo lugar por archivo para que no se desincronice.
   Éste tiene que ser el MISMO valor que `REDES.discord` en index.html — si un
   día cambia, cambia en los dos y en ningún otro lado.

   ⚠️ CADUCA el 14-sep-2026. Discord pone 30 días por defecto y nadie se entera
   hasta que alguien ve «Invitación no válida». Cómo hacerlo permanente en
   treinta segundos: el comentario de `REDES` en index.html lo explica paso a
   paso. Hay que cambiarlo en los DOS archivos. */
var DISCORD = 'https://discord.gg/eEp8Tv9tr';

document.getElementById('discord').href = DISCORD;
