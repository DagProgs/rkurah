importScripts('workbox-v4.3.1/workbox-sw.js');

// 1. НАСТРОЙКИ
workbox.setConfig({
  modulePathPrefix: 'workbox-v4.3.1/',
  debug: false // Поменял на false, чтобы консоль не засорялась
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

// 2. ПРЕКЕШИНГ
// Сюда ваш сборщик (если есть) вставит манифест. Если правите вручную — оставьте пустой массив.
workbox.precaching.precacheAndRoute([
  {
    "url": "favicon.ico",
    "revision": "646e4795859859204f87e131fefc05b7"
  },
  {
    "url": "index.html",
    "revision": "aa5e45592a0f6223179ee0e30d01dde8"
  },
  {
    "url": "manifest.json",
    "revision": "c8e63575a0a2029e9f4b58cf876a57a9"
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
    "revision": "a62c56d17a57fb4b0de070b5b5d9e437"
  },
  {
    "url": "widgets/data.json",
    "revision": "a1fd6092bb8b0df9b607a15c0c4508d1"
  },
  {
    "url": "widgets/template.json",
    "revision": "0d9b333e6e18211b65399713cd9ea42c"
  },
  {
    "url": "assets/css/style.css",
    "revision": "6b3b13fba08f2a61674053b635b7f161"
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
    "revision": "ddda6e61c9393d8715c942b00bc79b50"
  },
  {
    "url": "assets/js/theme.js",
    "revision": "d8770a864f98242490bdf29913b97ca3"
  },
  {
    "url": "assets/screenshots/screen-mobile.png",
    "revision": "6db64c78e742f352e3118dcdb3140c54"
  }
]);

// 3. КЕШИРОВАНИЕ РЕСУРСОВ
workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'googleapis'
  })
);

// Кешируем JSON с временами намаза
workbox.routing.registerRoute(
  /times_db\.json/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'ruznama-data'
  })
);

// --- ЛОГИКА АЗАНА ---

const AZAN_VIBRATION = [500, 200, 500, 200, 800];
let lastNotifiedTime = ""; // Защита от двойных уведомлений в одну минуту

async function checkPrayerTimes() {
  try {
    // ИСПРАВЛЕНО: Прямые слеши для путей в вебе
    const response = await fetch('./assets/db/times_db.json'); 
    if (!response.ok) return;
    
    const allTimes = await response.json();

    const now = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    
    const currentMonth = monthNames[now.getMonth()];
    const currentDay = String(now.getDate()).padStart(2, '0');
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Если в эту минуту уже уведомляли — выходим
    if (lastNotifiedTime === currentTime) return;

    const today = allTimes[currentMonth][currentDay];
    if (!today) return;

    const prayers = {
      "Фаджр": today.Fajr,
      "Зухр": today.Dhuhr,
      "Аср": today.Asr,
      "Магриб": today.Maghrib,
      "Иша": today.Isha
    };

    for (const [name, time] of Object.entries(prayers)) {
      if (currentTime === time) {
        lastNotifiedTime = currentTime; // Запоминаем, что уведомили

        self.registration.showNotification(`Время намаза: ${name}`, {
          body: `Пришло время молитвы ${name} (${time})`,
          icon: 'assets/icons/icon-192x192.png',
          vibrate: AZAN_VIBRATION,
          tag: `azan-${name}`, // Тэг позволяет обновлять уведомление, а не плодить новые
          renotify: true,
          data: { url: 'index.html' }
        });
      }
    }
  } catch (e) {
    console.error("Ошибка проверки времени:", e);
  }
}

// Запуск проверки (работает, пока SW активен)
setInterval(checkPrayerTimes, 60000);

// --- ОБРАБОТКА СОБЫТИЙ ---

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      // Если сайт уже открыт — просто переключаемся на него
      for (const client of clientList) {
        if (client.url.includes('index.html') && 'focus' in client) {
          return client.focus();
        }
      }
      // Если закрыт — открываем заново
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});

// Слушаем сообщения (например, от интервала в основном окне для надежности)
self.addEventListener('message', (event) => {
  if (event.data.type === 'CHECK_PRAYER' || event.data.type === 'TICK') {
    event.waitUntil(checkPrayerTimes());
  }
});
