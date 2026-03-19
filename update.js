import { Workbox } from 'workbox-v4.3.1/workbox-window.prod.mjs';

if ('serviceWorker' in navigator) {
    const wb = new Workbox('sw-workbox.js');

    // 1. Автоматическая перезагрузка при обновлении версии приложения
    wb.addEventListener('installed', event => {
        if (event.isUpdate) {
            // Показываем пользователю уведомление или просто обновляем страницу
            window.location.reload();
        }
    });

    // 2. Регистрация Service Worker
    wb.register().then(registration => {
        console.log('SW зарегистрирован успешно');
        
        // 3. Запрос прав на уведомления при первом запуске
        // Важно: в современных браузерах это лучше вызывать по клику на кнопку
        if (Notification.permission === 'default') {
            // Можно вызвать функцию уведомления позже по клику пользователя
            console.log('Нужно запросить разрешение на уведомления');
        }
    });

    // 4. Синхронизация с Service Worker при каждой загрузке страницы
    // Это «разбудит» воркер и заставит его проверить время по вашему times.json
    navigator.serviceWorker.ready.then(registration => {
        if (registration.active) {
            registration.active.postMessage({ type: 'CHECK_PRAYER' });
        }
    });
}

/**
 * Функция для кнопки "Включить азан" в вашем интерфейсе
 */
async function enableAzanNotifications() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        console.log('Уведомления разрешены');
    } else {
        alert('Пожалуйста, разрешите уведомления в настройках браузера, чтобы слышать азан.');
    }
}

// Экспортируем, если нужно использовать в других модулях
export { enableAzanNotifications };
