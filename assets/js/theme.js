const statusBar = document.getElementById('status-bar-color');

// Функция, которая только применяет визуальные изменения
function updateThemeUI(isDark) {
    // 1. Переключаем класс у body
    if (isDark) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    // 2. Меняем цвет системной панели (Status Bar)
    const themeColor = isDark ? '#121212' : '#ffffff';
    statusBar.setAttribute('content', themeColor);
}

// Функция, которую мы вызываем при клике на кнопку
function toggleTheme() {
    // Проверяем, есть ли сейчас темный режим
    const isDark = !document.body.classList.contains('dark-mode');
    
    // Сохраняем выбор (true/false) в память
    localStorage.setItem('isDarkMode', isDark);
    
    // Применяем изменения
    updateThemeUI(isDark);
}

// При загрузке страницы восстанавливаем состояние
window.addEventListener('DOMContentLoaded', () => {
    // Достаем значение из памяти. Если там пусто, по умолчанию будет false (светлая)
    const savedTheme = localStorage.getItem('isDarkMode') === 'true';
    
    // Применяем сохраненную тему
    updateThemeUI(savedTheme);
});
