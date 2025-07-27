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
    "revision": "f598d1010b39d8b48cf5c770986f5126"
  },
  {
    "url": "manifest.json",
    "revision": "60167ce42e10f7a3947fa30f7cb6443d"
  },
  {
    "url": "asset-manifest.json",
    "revision": "d36b2cd004778ff3b36500b337b6461e"
  },
  {
    "url": "times_db.json",
    "revision": "e2b81d43e4d226df790af245d30f0091"
  },
  {
    "url": "css/style.css",
    "revision": "6a3a178d905ed86e3d7f91fd6e123ae7"
  },
  {
    "url": "static/css/main.349bb4e3.css",
    "revision": "451f2c99f3efff01e14d858e767c4dcb"
  },
  {
    "url": "static/css/main.349bb4e3.css.map",
    "revision": "957af6ee962fed9143fc408cf450cac9"
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
    "url": "static/js/main.71b248a6.js",
    "revision": "67b91c55c569941ff3147458f85f8d24"
  },
  {
    "url": "static/js/main.71b248a6.js.LICENSE.txt",
    "revision": "cccfa45cda3f72c4ebb3fb2f4ba53a71"
  },
  {
    "url": "static/js/main.71b248a6.js.map",
    "revision": "d898b3fb071b8961d127a5ae3115e6e0"
  },
  {
    "url": "pwacompat.min.js",
    "revision": "038770ef3eb91f3e8a50a3916cb7cf28"
  },
  {
    "url": "update.js",
    "revision": "2e37a1e61c0f6c88bddbb61150536944"
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
    "revision": "f1adbf63958fa18479356f65b0a36dc9"
  },
  {
    "url": "img/svg/dhuhr.svg",
    "revision": "7601c712e2ca774eb824aabdede428f9"
  },
  {
    "url": "img/svg/fajr.svg",
    "revision": "ff919ba3e36b904aa6c8b4b923e1c08e"
  },
  {
    "url": "img/svg/isha.svg",
    "revision": "eb4c8a91ecc2855fbcfb71e2ea6de086"
  },
  {
    "url": "img/svg/magrib.svg",
    "revision": "8746e210455b0951d83677e27e38812e"
  },
  {
    "url": "img/svg/sunrise.svg",
    "revision": "930c2dae2f8aef81ecb620da39144b79"
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
