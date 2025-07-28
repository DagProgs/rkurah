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
    "revision": "5e39953e3671bc6aff906f97173f85bf"
  },
  {
    "url": "manifest.json",
    "revision": "88d372446303fed9b7ca70f38b347603"
  },
  {
    "url": "asset-manifest.json",
    "revision": "c7b8c2d9bfecead8299c614e68903e38"
  },
  {
    "url": "times_db.json",
    "revision": "e2b81d43e4d226df790af245d30f0091"
  },
  {
    "url": "static/css/main.0ad65d1d.css",
    "revision": "ba1bbe621d15ffbff754cea488570d73"
  },
  {
    "url": "static/css/main.0ad65d1d.css.map",
    "revision": "44340f2906a7ab58e7d50c0a2a72a5d2"
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
    "url": "static/js/main.7984277d.js",
    "revision": "3ff40be7ce9df3b628c9bd2ffde5b5e2"
  },
  {
    "url": "static/js/main.7984277d.js.LICENSE.txt",
    "revision": "cccfa45cda3f72c4ebb3fb2f4ba53a71"
  },
  {
    "url": "static/js/main.7984277d.js.map",
    "revision": "02dde76ace7974bb0aa5d666408d142b"
  },
  {
    "url": "css/style.css",
    "revision": "6a3a178d905ed86e3d7f91fd6e123ae7"
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
