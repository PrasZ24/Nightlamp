// sw.js

self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');
    e.waitUntil(
      caches.open('nightlamp-cache').then((cache) => {
        return cache.addAll([
          './index.html',
          './manifest.json',
          './image.png',
          './image2.png'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (e) => {
    console.log('Service Worker: Fetching');
    e.respondWith(
      caches.match(e.request).then((response) => {
        return response || fetch(e.request);
      })
    );
  });
  