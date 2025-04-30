// sw.js

self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
  e.waitUntil(
    caches.open('nightlamp-cache').then((cache) => {
      return cache.addAll([
        '/index.html',
        '/manifest.json',
        '/image.png',
        '/image2.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Fetching', e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response) {
        return response; // ambil dari cache
      }
      // fetch dari internet dan fallback jika offline
      return fetch(e.request).catch(() => {
        if (e.request.destination === 'document') {
          return caches.match('/index.html');
        }
        return new Response('Offline', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      });
    })
  );
});
