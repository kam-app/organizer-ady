// Organizer Ady — Service Worker v1
// Plik musi być w tym samym katalogu co index.html na GitHub Pages

const CACHE_NAME = 'organizer-ady-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
  // Usuń stare cache
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  // App jest online-first — przekazujemy żądania dalej
  // Fallback do cache jeśli offline
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
