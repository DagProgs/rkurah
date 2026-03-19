// 1. Импортируем Firebase 8.10.1 и Workbox
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
importScripts('workbox-v4.3.1/workbox-sw.js');

// 2. Инициализация из параметров URL (переданных из .env)
const urlParams = new URLSearchParams(self.location.search);
const fbConfigJson = urlParams.get('fbConfig');

if (fbConfigJson) {
  const firebaseConfig = JSON.parse(decodeURIComponent(fbConfigJson));
  
  // Инициализируем приложение Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Инициализируем Messaging
  const messaging = firebase.messaging();

  // Обработчик фоновых уведомлений
  messaging.onBackgroundMessage((payload) => {
    console.log('[SW]: Получено фоновое сообщение', payload);

    const notificationTitle = payload.notification.title || 'Новое сообщение';
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/icon-192x192.png', // путь к твоей иконке
      badge: '/badge.png',        // маленькая иконка в статус-баре
      data: payload.data
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}

// --- НАСТРОЙКИ WORKBOX ---

workbox.setConfig({
  modulePathPrefix: 'workbox-v4.3.1/',
  debug: true
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

// Прекешинг (заполняется автоматически через workbox-build)
workbox.precaching.precacheAndRoute([
  {
    "url": "favicon.ico",
    "revision": "646e4795859859204f87e131fefc05b7"
  },
  {
    "url": "index.html",
    "revision": "696321a62d0f67bc5c5c1ff770b7727d"
  },
  {
    "url": "manifest.json",
    "revision": "417d3be3996b43b563498d15e2e1509b"
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

// Кеширование шрифтов Google
workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.Plugin({ maxEntries: 30 })
    ]
  })
);

// API: Timeline (Network First)
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)timeline/,
  workbox.strategies.networkFirst()
);

// API: Favorites (Cache First)
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)favorites/,
  workbox.strategies.cacheFirst()
);

// Клик по уведомлению
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/') 
  );
});
