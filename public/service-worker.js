// service-worker.js

/* eslint-disable no-restricted-globals */
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Cache first for same-origin requests
    if (request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(request);
            })
        );
    }
});

// Push Notifications
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        console.log('[Service Worker] Push notification received:', data);

        const title = data.title || 'Notification';
        const options = {
            body: data.body || 'This is a push notification.',
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-192x192.png',
        };

        event.waitUntil(self.registration.showNotification(title, options));
    }
});

self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Notification click received.');

    event.notification.close();

    event.waitUntil(
        clients.openWindow('https://www.example.com/')
    );
});
