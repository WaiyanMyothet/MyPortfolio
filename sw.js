const filesToCache = [
  "/",
  "css/style.css",
  "image/utycc.webp",
  "image/waiyan.jpg",
  "image/yammobots.png",
  "image/favicon.ico",
  "index.html",
];

const staticCacheName = "cache-v1";

self.addEventListener("install", (event) => {
  console.log('installing');
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [staticCacheName];
  console.log('activating');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log(event.request);
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request);
    })
  );
});
