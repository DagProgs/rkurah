// src/sw.js
importScripts('workbox-v4.3.1/workbox-sw.js');

if (workbox) {
  console.log('Workbox загружен');

  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  const { precacheAndRoute } = workbox.precaching;
  const { registerRoute } = workbox.routing;
  const { StaleWhileRevalidate, NetworkFirst } = workbox.strategies;

  // ЕДИНСТВЕННОЕ вхождение — НЕ ДОБАВЛЯЙ БОЛЬШЕ!
  precacheAndRoute(self.__WB_MANIFEST);

  registerRoute(
    /\.(?:css|js|png|jpg|jpeg|svg|webp|avif|ico|woff2?)$/,
    new StaleWhileRevalidate({ cacheName: 'static-resources' })
  );

  registerRoute(
    ({ request }) => request.mode === 'navigate',
    new NetworkFirst({ cacheName: 'pages' })
  );

  registerRoute(
    ({ url }) => url.origin === 'https://api.example.com',
    new NetworkFirst({ cacheName: 'api-data' })
  );
} else {
  console.error('Workbox не загружен');
}