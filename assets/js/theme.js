let darkModeState = false;
const themeColorMeta = document.getElementById("theme-color");

// Функция для переключения темной темы
function toggleDarkMode(state) {
  document.documentElement.classList.toggle("dark-mode", state);
  darkModeState = state;
  
  // Обновление цвета темы
  if (state) {
    themeColorMeta.setAttribute("content", "#0f172a"); // Темная тема
  } else {
    themeColorMeta.setAttribute("content", "#f8fafc"); // Светлая тема
  }
}