// Calcolatore Gas - Service Worker v3
// With auto-update checking when online
const CACHE_NAME = 'calcologas-v3';

// Files to cache for offline use
const ASSETS_TO_CACHE = [
    '/calcologas/',
    '/calcologas/index.html',
    '/calcologas/manifest.json',
    '/calcologas/icon-192.png',
    '/calcologas/icon-512.png'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker v3...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching app shell');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                console.log('[SW] Install complete - activating immediately');
                return self.skipWaiting(); // Activate new SW immediately
            })
    );
});

// Activate event - clean old caches and take control
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker v3...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => {
            console.log('[SW] Claiming all clients');
            return self.clients.claim(); // Take control of all pages immediately
        })
    );
});

// Fetch event - STALE WHILE REVALIDATE strategy
// Serve from cache immediately, but fetch update in background
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip external requests (fonts, CDN, etc)
    if (!event.request.url.startsWith(self.location.origin)) return;

    // For HTML pages - use network-first with cache fallback
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Got network response - cache it and return
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    // Network failed - serve from cache
                    return caches.match(event.request)
                        .then((cached) => cached || caches.match('/calcologas/index.html'));
                })
        );
        return;
    }

    // For other assets - stale while revalidate
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Start network fetch in background regardless
            const fetchPromise = fetch(event.request)
                .then((networkResponse) => {
                    // Update cache with fresh response
                    if (networkResponse && networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return networkResponse;
                })
                .catch(() => null); // Network failed, ignore

            // Return cached immediately if available, otherwise wait for network
            return cachedResponse || fetchPromise;
        })
    );
});

// Listen for messages from the app
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
