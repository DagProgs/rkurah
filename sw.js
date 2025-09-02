// src/sw.js
importScripts('workbox-v4.3.1/workbox-sw.js');

if (workbox) {
  console.log('Workbox загружен');

  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  const { precacheAndRoute } = workbox.precaching;
  const { registerRoute } = workbox.routing;
  const { StaleWhileRevalidate, NetworkFirst } = workbox.strategies;

  // ЕДИНСТВЕННОЕ вхождение precacheAndRoute
  precacheAndRoute([{"revision":"0b15fc9bac74fa36c150a3de7db07437","url":"asset-manifest.json"},{"revision":"6a3a178d905ed86e3d7f91fd6e123ae7","url":"css/style.css"},{"revision":"646e4795859859204f87e131fefc05b7","url":"favicon.ico"},{"revision":"25c8eb241d5e0c913da717f6007736b2","url":"img/icons/icon-128x128.png"},{"revision":"6e606e6871ccc1fdc7222dee1d72d42e","url":"img/icons/icon-144x144.png"},{"revision":"33b8202ee77c28c332a4fa3efee61d34","url":"img/icons/icon-152x152.png"},{"revision":"c5d401eb140c47f0d0a1b8880b5c8b49","url":"img/icons/icon-192x192.png"},{"revision":"47f069d621e0e363d1f0b560be4335dc","url":"img/icons/icon-384x384.png"},{"revision":"84f212482ada6ec3913a2a76d4b89c0d","url":"img/icons/icon-512x512.png"},{"revision":"9c82c0475577731db0e52b9fa62e8c05","url":"img/icons/icon-72x72.png"},{"revision":"9815fb3c4b57df1e8cda23d01fc66078","url":"img/icons/icon-96x96.png"},{"revision":"3846925b742c58557aca26b8767949bd","url":"img/svg/asr.svg"},{"revision":"dabd6c8ae3693304a022ce4eb9babd8b","url":"img/svg/dhuhr.svg"},{"revision":"38d9b75677492b00774b86813a622c6b","url":"img/svg/fajr.svg"},{"revision":"58098ef90128c1e040a909c2386bcccf","url":"img/svg/isha.svg"},{"revision":"647773c30b98f9a7f002602d6e54595b","url":"img/svg/magrib.svg"},{"revision":"22856041e45fb64976eb29f9697ce61b","url":"img/svg/sunrise.svg"},{"revision":"eaeb91e0c2ac153c475cb8abaf050e58","url":"index.html"},{"revision":"c5d401eb140c47f0d0a1b8880b5c8b49","url":"logo192.png"},{"revision":"84f212482ada6ec3913a2a76d4b89c0d","url":"logo512.png"},{"revision":"2f6470e2a31693d8c2c41ce46f527b2b","url":"main.js"},{"revision":"6b2e5e0c3be6f28bc21208fc581333dd","url":"manifest.json"},{"revision":"70b96674d27f35d5ee27d65332b464ef","url":"static/css/main.591be45b.css"},{"revision":"574ba466fbef3962d14d14cdd67d2e23","url":"static/js/453.7240d997.chunk.js"},{"revision":"22e86c57a15e6b1503305f7924ff86b8","url":"static/js/main.c656c62a.js"},{"revision":"e2b81d43e4d226df790af245d30f0091","url":"times_db.json"},{"revision":"5990ac1b98b758ae48bbb4a176487480","url":"vercel.json"},{"revision":"edf25979d5d95c54e61428c552da0d2e","url":"workbox-v4.3.1/workbox-sw.js"}]);

  // Статические ресурсы — кэш, но обновлять в фоне
  registerRoute(
    /\.(?:css|js|png|jpg|jpeg|svg|webp|avif|ico|woff2?)$/i,
    new StaleWhileRevalidate({ cacheName: 'static-resources' })
  );

  // Навигация — сеть первым делом, fallback на кэш
  registerRoute(
    ({ request }) => request.mode === 'navigate',
    new NetworkFirst({ cacheName: 'pages' })
  );

  // API — сеть с кэшем
  registerRoute(
    ({ url }) => url.origin === 'https://api.example.com',
    new NetworkFirst({ cacheName: 'api-data' })
  );
} else {
  console.error('Workbox не загружен');
}