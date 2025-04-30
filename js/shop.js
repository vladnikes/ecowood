if (!location.hash) {
  location.replace(location.href + "#home");
}

document.addEventListener('DOMContentLoaded', () => {
  // Слайдери для карток
  document.querySelectorAll('.tree-card').forEach((card) => {
    const slides = card.querySelector('.card-slides');
    const images = slides.querySelectorAll('img');
    let currentIndex = 0;

    const updateSlider = () => {
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    card.querySelector('.card-next').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlider();
    });

    card.querySelector('.card-prev').addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateSlider();
    });

    // Відкриття модального вікна
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('card-prev') || e.target.classList.contains('card-next')) return;
      const modal = document.getElementById('tree-modal');
      const modalSlides = modal.querySelector('.modal-slides');
      const modalTitle = modal.querySelector('.modal-title');
      const modalDescription = modal.querySelector('.modal-description');
      const modalPrice = modal.querySelector('.modal-price');

      // Заповнення модального вікна з даних картки
      modalSlides.innerHTML = Array.from(card.querySelectorAll('.card-slides img'))
        .map(img => `<img src="${img.src}" alt="${card.dataset.title}">`).join('');
      modalTitle.textContent = card.dataset.title;
      modalDescription.textContent = card.dataset.fullDescription;
      modalPrice.textContent = card.dataset.price;

      modal.style.display = 'flex';

      // Слайдер у модальному вікні
      let modalIndex = 0;
      const modalImages = modalSlides.querySelectorAll('img');
      const updateModalSlider = () => {
        modalSlides.style.transform = `translateX(-${modalIndex * 100}%)`;
      };

      modal.querySelector('.modal-next').addEventListener('click', () => {
        modalIndex = (modalIndex + 1) % modalImages.length;
        updateModalSlider();
      });

      modal.querySelector('.modal-prev').addEventListener('click', () => {
        modalIndex = (modalIndex - 1 + modalImages.length) % modalImages.length;
        updateModalSlider();
      });

      updateModalSlider();
    });
  });

  // Закриття модального вікна
  document.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('tree-modal').style.display = 'none';
  });

  // Закриття при кліку поза контентом
  document.getElementById('tree-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.style.display = 'none';
    }
  });
});