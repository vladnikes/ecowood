const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const indicatorsContainer = document.querySelector('.indicators');

let index = 0;

// Создание индикаторов
slideItems.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('indicator');
  dot.addEventListener('click', () => showSlide(i));
  indicatorsContainer.appendChild(dot);
});

const indicators = document.querySelectorAll('.indicator');

function showSlide(i) {
  index = (i + slideItems.length) % slideItems.length;
  slides.style.transform = `translateX(-${index * 100}%)`;

  // Обновляем индикаторы
  indicators.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });

  // Управление видео
  slideItems.forEach((slide, idx) => {
    const video = slide.querySelector('video');
    if (video) {
      if (idx === index) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  });
}

prevBtn.addEventListener('click', () => showSlide(index - 1));
nextBtn.addEventListener('click', () => showSlide(index + 1));

// Показываем первый слайд
showSlide(0);

let startX = 0;
let endX = 0;

// Обработчики касания
slides.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

slides.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX;
});

slides.addEventListener('touchend', () => {
  const diff = startX - endX;
  if (Math.abs(diff) > 50) { // Свайп влево/вправо
    if (diff > 0) {
      showSlide(index + 1); // Свайп влево
    } else {
      showSlide(index - 1); // Свайп вправо
    }
  }
});
