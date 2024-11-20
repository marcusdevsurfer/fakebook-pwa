// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open('pwa-cache').then(cache => {
//       return cache.addAll([
//         '/',
//         '/css/styles.css',
//         '/js/main.js',
//         '/images/splash.png',
//         '/manifest.json'
//       ]);
//     })
//   );
// });

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request).then(response => {
//       return response || fetch(event.request);
//     })
//   );
// });


self.addEventListener('push', event => {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/images/icon.png',
        badge: '/images/badge.png'
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});