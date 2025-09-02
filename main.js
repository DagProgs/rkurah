console.log('✅ main.js загружен и работает!');

document.addEventListener('DOMContentLoaded', () => {
  const h1 = document.querySelector('h1');
  if (h1) {
    h1.textContent = 'PWA работает! 🎉';
    h1.style.color = '#4CAF50';
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(() => {
      console.log('✅ Service Worker активен');
    });
  }
});