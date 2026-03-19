if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw-workbox.js')
            .then(reg => {
                console.log('Service Worker зарегистрирован');
                
                // Проверяем время сразу при загрузке
                if (reg.active) reg.active.postMessage({ type: 'TICK' });

                // Запускаем проверку каждую минуту, пока открыта вкладка
                setInterval(() => {
                    navigator.serviceWorker.ready.then(readyReg => {
                        if (readyReg.active) {
                            readyReg.active.postMessage({ type: 'TICK' });
                        }
                    });
                }, 60000);
            })
            .catch(err => console.log('Ошибка SW:', err));
    });
}

// Функция для вызова по кнопке в HTML
async function enableNotifications() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        alert('Уведомления для Азана включены!');
    } else {
        alert('Пожалуйста, разрешите уведомления в настройках браузера.');
    }
}
