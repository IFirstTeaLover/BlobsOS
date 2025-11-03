self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("blobsOs-cache").then((cache) =>
      cache.addAll([
        "/BlobsOS/",
        "/BlobsOS/index.html",
        "/BlobsOS/main.js",
        "/BlobsOS/manifest.json",
        "/BlobsOS/icon-192.png",
        "/BlobsOS/icon-512.png"
      ])
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
