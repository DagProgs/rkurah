// update.js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw-workbox.js').then(reg => {
            console.log('SW Registered');

            // Будим воркер для проверки времени каждые 60 сек
            setInterval(() => {
                if (reg.active) reg.active.postMessage({ type: 'TICK' });
            }, 60000);
        });
    });
}

// Функция для кнопки
window.enableNotifications = async () => {
    const res = await Notification.requestPermission();
    if (res === 'granted') alert('Уведомления включены');
};
