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
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [staticCacheName];

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
  event.respondWith(
    fetch(event.req).catch(function () {
      return caches.match(event.req);
    })
  );
});
