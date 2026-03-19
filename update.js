import { Workbox } from './workbox-v4.3.1/workbox-window.prod.mjs';

if ('serviceWorker' in navigator) {
    const wb = new Workbox('sw-workbox.js');

    // 1. Авто-обновление при изменении версии
    wb.addEventListener('installed', event => {
        if (event.isUpdate) {
            window.location.reload();
        }
    });

    // 2. Регистрация
    wb.register().then(reg => {
        console.log('Service Worker успешно зарегистрирован');

        // 3. ТАЙМЕР ПРОВЕРКИ (каждую минуту)
        // Это замена setInterval внутри воркера, который засыпает.
        // Пока вкладка открыта, это будет будить воркер для проверки времени.
        setInterval(() => {
            wb.messageSW({ type: 'TICK' });
        }, 60000);

        // Проверить один раз сразу при загрузке
        wb.messageSW({ type: 'TICK' });
    });
}

/**
 * Эту функцию вызовите по клику на кнопку "Включить уведомления" в HTML
 * <button onclick="enableAzan()">Включить уведомления</button>
 */
window.enableAzan = async function() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        alert('Уведомления включены!');
    } else {
        alert('Доступ к уведомлениям заблокирован в браузере.');
    }
};
