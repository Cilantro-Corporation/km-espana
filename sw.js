/* Dirección antigua de km. España (ahora SOSpk): este service worker sustituye al antiguo, borra su caché de la app
   (las provincias y los favoritos guardados se conservan: son del mismo dominio y los usa la dirección nueva) y lleva
   a la dirección nueva. */
'use strict';
var NEW_URL = 'https://cilantro-corporation.github.io/SOSpk/';
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return /^kmes-app-/.test(k); }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.registration.unregister(); }).then(function () {
    return self.clients.matchAll({ type: 'window' });
  }).then(function (clients) {
    clients.forEach(function (c) { try { c.navigate(NEW_URL); } catch (err) { /* */ } });
  }));
});
self.addEventListener('fetch', function () { /* sin caché: siempre la red */ });
