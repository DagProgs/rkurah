document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.nav-btn');
    const cards = document.querySelectorAll('.glass-card');
    const body = document.getElementById('body');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            const bg = btn.getAttribute('data-bg');
            const accent = btn.getAttribute('data-accent');

            // 1. Меняем фон и акцентный цвет в CSS
            body.style.background = bg;
            document.documentElement.style.setProperty('--current-accent', accent);

            // 2. Обновляем активную кнопку
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 3. Переключаем карточки
            cards.forEach(card => {
                card.classList.toggle('active', card.id === tabId);
            });

            // 4. Легкая вибрация для мобильных устройств
            if (window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(15);
            }
        });
    });
});
