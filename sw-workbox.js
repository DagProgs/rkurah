importScripts('workbox-v4.3.1/workbox-sw.js');

// SETTINGS

// Path prefix to load modules locally
workbox.setConfig({
  modulePathPrefix: 'workbox-v4.3.1/'
});

// Turn on logging
workbox.setConfig({
  debug: true
});

// Updating SW lifecycle to update the app after user triggered refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// PRECACHING

// We inject manifest here using "workbox-build" in workbox-build-inject.js
workbox.precaching.precacheAndRoute([
  {
    "url": "favicon.ico",
    "revision": "646e4795859859204f87e131fefc05b7"
  },
  {
    "url": "index.html",
    "revision": "e9e81e0350a8f445c3b2a8a258d0816a"
  },
  {
    "url": "asset-manifest.json",
    "revision": "0b15fc9bac74fa36c150a3de7db07437"
  },
  {
    "url": "manifest.json",
    "revision": "cee6a9d455c94fb81116066ec8294fff"
  },
  {
    "url": "times_db.json",
    "revision": "e2b81d43e4d226df790af245d30f0091"
  },
  {
    "url": "logo192.png",
    "revision": "c5d401eb140c47f0d0a1b8880b5c8b49"
  },
  {
    "url": "logo512.png",
    "revision": "84f212482ada6ec3913a2a76d4b89c0d"
  },
  {
    "url": "css/style.css",
    "revision": "6a3a178d905ed86e3d7f91fd6e123ae7"
  },
  {
    "url": "main.js",
    "revision": "2f6470e2a31693d8c2c41ce46f527b2b"
  },
  {
    "url": "img/icons/icon-128x128.png",
    "revision": "25c8eb241d5e0c913da717f6007736b2"
  },
  {
    "url": "img/icons/icon-144x144.png",
    "revision": "6e606e6871ccc1fdc7222dee1d72d42e"
  },
  {
    "url": "img/icons/icon-152x152.png",
    "revision": "33b8202ee77c28c332a4fa3efee61d34"
  },
  {
    "url": "img/icons/icon-192x192.png",
    "revision": "c5d401eb140c47f0d0a1b8880b5c8b49"
  },
  {
    "url": "img/icons/icon-384x384.png",
    "revision": "47f069d621e0e363d1f0b560be4335dc"
  },
  {
    "url": "img/icons/icon-512x512.png",
    "revision": "84f212482ada6ec3913a2a76d4b89c0d"
  },
  {
    "url": "img/icons/icon-72x72.png",
    "revision": "9c82c0475577731db0e52b9fa62e8c05"
  },
  {
    "url": "img/icons/icon-96x96.png",
    "revision": "9815fb3c4b57df1e8cda23d01fc66078"
  },
  {
    "url": "img/svg/asr.svg",
    "revision": "3846925b742c58557aca26b8767949bd"
  },
  {
    "url": "img/svg/dhuhr.svg",
    "revision": "dabd6c8ae3693304a022ce4eb9babd8b"
  },
  {
    "url": "img/svg/fajr.svg",
    "revision": "38d9b75677492b00774b86813a622c6b"
  },
  {
    "url": "img/svg/isha.svg",
    "revision": "58098ef90128c1e040a909c2386bcccf"
  },
  {
    "url": "img/svg/magrib.svg",
    "revision": "647773c30b98f9a7f002602d6e54595b"
  },
  {
    "url": "img/svg/sunrise.svg",
    "revision": "22856041e45fb64976eb29f9697ce61b"
  },
  {
    "url": "static/css/main.591be45b.css",
    "revision": "70b96674d27f35d5ee27d65332b464ef"
  },
  {
    "url": "static/css/main.591be45b.css.map",
    "revision": "aeb74a8bd325bdd919f393efbbae2b12"
  },
  {
    "url": "static/js/453.7240d997.chunk.js",
    "revision": "574ba466fbef3962d14d14cdd67d2e23"
  },
  {
    "url": "static/js/453.7240d997.chunk.js.map",
    "revision": "cad9286f09302279362593856a291a6f"
  },
  {
    "url": "static/js/main.c656c62a.js",
    "revision": "22e86c57a15e6b1503305f7924ff86b8"
  },
  {
    "url": "static/js/main.c656c62a.js.LICENSE.txt",
    "revision": "cccfa45cda3f72c4ebb3fb2f4ba53a71"
  },
  {
    "url": "static/js/main.c656c62a.js.map",
    "revision": "7e9202b9daf4da88596092ba17608b6f"
  }
]);

// RUNTIME CACHING

// Google fonts
workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30
      })
    ]
  })
);

// API with network-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)timeline/,
  workbox.strategies.networkFirst()
)

// API with cache-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)favorites/,
  workbox.strategies.cacheFirst()
)

// OTHER EVENTS

// Receive push and show a notification
self.addEventListener('push', function(event) {
  console.log('[Service Worker]: Received push event', event);
});
