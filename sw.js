// ========================================
// LEXPOINT.IO SERVICE WORKER
// ========================================

const CACHE_NAME = 'lexpoint-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/brand-system.css',
  '/css/components.css',
  '/css/main.css',
  '/js/main.js',
  '/assets/brand/logos/accent/Logo-Square-Accent.svg',
  '/assets/brand/fonts/Poppins-Regular.ttf',
  '/assets/brand/fonts/Poppins-Bold.ttf'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 