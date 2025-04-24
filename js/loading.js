// Добавляем обработчик события на загрузку страницы
window.addEventListener('load', function () {
  // Скрываем элемент с классом "loader-overlay" после того, как страница полностью загружена
  document.querySelector('.loader-overlay').style.display = 'none';
});
