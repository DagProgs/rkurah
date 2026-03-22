// 1. Находим мета-тег в документе
const statusBar = document.getElementById('status-bar-color');

// 2. Функция для обновления интерфейса темы
function updateThemeUI(isDark) {
    // Меняем цвет мета-тега theme-color
    // Если тема темная — ставим #121212, если светлая — #f8f9fa
    const themeColor = isDark ? '#121212' : '#f8f9fa';
    statusBar.setAttribute('content', themeColor);
    
    // Дополнительно: меняем иконку (опционально)
    console.log("Цвет панели изменен на: " + themeColor);
}

// 3. Основная функция переключения
function toggleTheme() {
    // Переключаем класс dark-mode у body
    const isDark = document.body.classList.toggle('dark-mode');
    
    // Сохраняем выбор в память браузера
    localStorage.setItem('mavlid_theme', isDark ? 'dark' : 'light');
    
    // Обновляем цвет статус-бара
    updateThemeUI(isDark);
}

// При загрузке страницы проверяем сохраненную тему
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('mavlid_theme') === 'dark';
    if (savedTheme) {
        document.body.classList.add('dark-mode');
    }
    updateThemeUI(savedTheme);
});
