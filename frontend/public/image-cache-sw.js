// Image Cache Service Worker
// This worker caches images for faster subsequent loads

const CACHE_NAME = 'raze-images-v1';
const IMAGE_CACHE_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days

// URLs to cache
const IMAGE_DOMAINS = [
  'customer-assets.emergentagent.com',
  'images.unsplash.com'
];

// Install event - setup cache
self.addEventListener('install', (event) => {
  console.log('[SW] Installing image cache service worker');
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating image cache service worker');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('raze-images-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - cache images
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only cache image requests from our domains
  const isImage = event.request.destination === 'image' || 
                  /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url.pathname);
  
  const isFromImageDomain = IMAGE_DOMAINS.some(domain => url.hostname.includes(domain));
  
  if (!isImage || !isFromImageDomain) {
    return; // Let other requests pass through
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        // If we have a cached response, check if it's still fresh
        if (cachedResponse) {
          const cachedDate = new Date(cachedResponse.headers.get('sw-cached-date'));
          const now = new Date();
          
          // If cache is fresh, return it
          if (now - cachedDate < IMAGE_CACHE_TIME) {
            console.log('[SW] Serving from cache:', url.pathname);
            return cachedResponse;
          }
        }

        // Otherwise, fetch from network
        console.log('[SW] Fetching from network:', url.pathname);
        return fetch(event.request)
          .then((response) => {
            // Don't cache if not successful
            if (!response || response.status !== 200) {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();
            
            // Add custom header for cache date
            const headers = new Headers(responseToCache.headers);
            headers.set('sw-cached-date', new Date().toISOString());
            
            const cachedResponse = new Response(responseToCache.body, {
              status: responseToCache.status,
              statusText: responseToCache.statusText,
              headers: headers
            });

            // Cache the response
            cache.put(event.request, cachedResponse);
            
            return response;
          })
          .catch(() => {
            // If network fails and we have a cached version (even if stale), use it
            if (cachedResponse) {
              console.log('[SW] Network failed, serving stale cache:', url.pathname);
              return cachedResponse;
            }
            throw new Error('Image not available');
          });
      });
    })
  );
});

// Message event - for manual cache management
self.addEventListener('message', (event) => {
  if (event.data.type === 'CLEAR_IMAGE_CACHE') {
    event.waitUntil(
      caches.delete(CACHE_NAME).then(() => {
        console.log('[SW] Image cache cleared');
        event.ports[0].postMessage({ success: true });
      })
    );
  }
  
  if (event.data.type === 'CACHE_IMAGE') {
    const imageUrl = event.data.url;
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(imageUrl).then((response) => {
          if (response && response.status === 200) {
            cache.put(imageUrl, response);
            console.log('[SW] Cached image:', imageUrl);
          }
        });
      })
    );
  }
});
