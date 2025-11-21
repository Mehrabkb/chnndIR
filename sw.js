// self.addEventListener("install", event => {
//   event.waitUntil(
//     caches.open("chnnd-cache").then(cache => {
//       return cache.addAll([
//         "/",
//         "/index.html",
//         "/styles.css",
//         "/script.js"
//       ]);
//     })
//   );
// });

const urlsToCache = [
  "/",
  "index.html",
  "manifest.json",
  "styles.css",
  "script.js"
];


self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("message", event => {
  const data = event.data;
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "icons/icon-192.png"
  });
});