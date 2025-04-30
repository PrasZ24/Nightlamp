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
    console.log('Service Worker: Fetching');
    e.respondWith(
      caches.match(e.request).then((response) => {
        return response || fetch(e.request);
      })
    );
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service Worker registered!', reg))
        .catch(err => console.log('Service Worker registration failed:', err));
    });
  }
  
  