// Получаем все ссылки внутри тега <nav>
const links = document.querySelectorAll("nav a");

// Функция для установки активной ссылки в меню
function setActiveLink() {
  links.forEach(link => {
    // Удаляем класс "active" у всех ссылок
    link.classList.remove("active");

    // Если href ссылки соответствует текущему хешу в URL, делаем её активной
    if (window.location.hash === link.getAttribute("href")) {
      link.classList.add("active");
    }
  });
}

// Обновляем активную ссылку при изменении хеша (например, при переходе по якорной ссылке)
window.addEventListener("hashchange", setActiveLink);

// Обновляем активную ссылку при первоначальной загрузке страницы
window.addEventListener("load", setActiveLink);

// Объект с заголовками страниц, соответствующими разным якорям (hash)
const titles = {
  home: "EcoWood - Головна",
  about: "EcoWood - Про дерева",
  gallery: "EcoWood - Галерея",
  contact: "EcoWood - Контакти"
};

// Функция для обновления заголовка документа в зависимости от хеша
function updateTitle() {
  // Удаляем символ "#" из начала хеша
  const hash = window.location.hash.substring(1);

  // Устанавливаем заголовок страницы на основе хеша, либо используем значение по умолчанию
  document.title = titles[hash] || "Мой сайт";
}

// Обновляем заголовок при загрузке страницы
window.addEventListener("load", updateTitle);

// Обновляем заголовок при изменении хеша
window.addEventListener("hashchange", updateTitle);
