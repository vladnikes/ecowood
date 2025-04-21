
  const slides = document.querySelector('.slides');
  const slideItems = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const toggleBtn = document.getElementById('toggle-auto-slide');
  let index = 0;

  function showSlide(i) {
    index = (i + slideItems.length) % slideItems.length;
    slides.style.transform = `translateX(-${index * 100}%)`;

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

  prevBtn.addEventListener('click', () => {
    showSlide(index - 1);
  });

  nextBtn.addEventListener('click', () => {
    showSlide(index + 1);
  });

  showSlide(0);
