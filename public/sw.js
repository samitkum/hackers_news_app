const self = this;
let cacheName = "version-1";
let cacheData = ["index.html"];
self.addEventListener("install", (e) => {
  console.log("Installing the service worker and cache static assets");
  e.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(cacheData)));
});
self.addEventListener("fetch", (e) => {
  console.log(`fetch event for ${e.request.url}`);
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
self.addEventListener("activate", (e) => {
  const cahceWhitelist = [];
  cahceWhitelist.push(cacheName);
  e.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cahceWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
