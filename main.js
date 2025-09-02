console.log('✅ main.js загружен и работает!');

document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(() => {
      console.log('✅ Service Worker активен');
    });
  }
});