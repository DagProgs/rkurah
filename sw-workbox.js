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
    "revision": "e855c8047775a0678f7d0124777acc1f"
  },
  {
    "url": "manifest.json",
    "revision": "682fce570395672cac21aa8288181b0a"
  },
  {
    "url": "main.js",
    "revision": "80846bb3403b82a07c7f84658f186b23"
  },
  {
    "url": "polyfills.js",
    "revision": "56f34b0f4d3a42d45bfdb1782adaa173"
  },
  {
    "url": "pwacompat.min.js",
    "revision": "038770ef3eb91f3e8a50a3916cb7cf28"
  },
  {
    "url": "runtime.js",
    "revision": "cd1ce3e306bf57f272364d1cc0249d6e"
  },
  {
    "url": "update.js",
    "revision": "480b238fd3de4af93586d44d32dc8530"
  },
  {
    "url": "assets/css/style.css",
    "revision": "814b8e7282be1cac4198e42b9f780941"
  },
  {
    "url": "assets/db/times_db.json",
    "revision": "1ce3a6a1c42ffc51e273f7cdca350ef2"
  },
  {
    "url": "assets/icons/icon-128x128.png",
    "revision": "25c8eb241d5e0c913da717f6007736b2"
  },
  {
    "url": "assets/icons/icon-144x144.png",
    "revision": "6e606e6871ccc1fdc7222dee1d72d42e"
  },
  {
    "url": "assets/icons/icon-152x152.png",
    "revision": "33b8202ee77c28c332a4fa3efee61d34"
  },
  {
    "url": "assets/icons/icon-192x192.png",
    "revision": "c5d401eb140c47f0d0a1b8880b5c8b49"
  },
  {
    "url": "assets/icons/icon-384x384.png",
    "revision": "47f069d621e0e363d1f0b560be4335dc"
  },
  {
    "url": "assets/icons/icon-512x512.png",
    "revision": "84f212482ada6ec3913a2a76d4b89c0d"
  },
  {
    "url": "assets/icons/icon-72x72.png",
    "revision": "9c82c0475577731db0e52b9fa62e8c05"
  },
  {
    "url": "assets/icons/icon-96x96.png",
    "revision": "9815fb3c4b57df1e8cda23d01fc66078"
  },
  {
    "url": "assets/img/1.png",
    "revision": "ebd6b3b3e70a8b2a01f3485fdf0199c3"
  },
  {
    "url": "assets/img/2.png",
    "revision": "ff1df813b153209ed897de30e864fd04"
  },
  {
    "url": "assets/img/3.png",
    "revision": "4ac907fe83fffa296a0a82b2834fb5e1"
  },
  {
    "url": "assets/img/4.png",
    "revision": "ccd010eed14e86ef1756e5a4a7ece29d"
  },
  {
    "url": "assets/img/5.png",
    "revision": "dc0036db39b2bf3b0091e24101479a41"
  },
  {
    "url": "assets/img/6.png",
    "revision": "5f2e42090570ec258281610c1d6f0933"
  },
  {
    "url": "assets/img/7.png",
    "revision": "8a3ea791bd4ece4448adb13df9bcfc78"
  },
  {
    "url": "assets/js/jquery.min.js",
    "revision": "b61aa6e2d68d21b3546b5b418bf0e9c3"
  },
  {
    "url": "assets/js/script.js",
    "revision": "1e430d7d5431a693ccf0a505a5eefa90"
  },
  {
    "url": "assets/js/theme.js",
    "revision": "d8770a864f98242490bdf29913b97ca3"
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
