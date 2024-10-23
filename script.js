document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Theme toggle logic
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
        }
    });

    // Carousel logic
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    showSlide(currentSlide);
    setInterval(nextSlide, 3000); // Change image every 3 seconds

    const sections = ['#games', '#scenarios', '#movies', '#books', '#newsarticles'];

  sections.forEach(section => {
    const scrollWrapper = document.querySelector(`${section} .scroll-wrapper`);
    const scrollContainer = scrollWrapper.querySelector('.scroll-container');
    const leftBtn = scrollWrapper.querySelector('.left-btn');
    const rightBtn = scrollWrapper.querySelector('.right-btn');

    function updateScrollButtons() {
      if (scrollContainer.scrollLeft <= 0) {
        leftBtn.style.display = 'none';
      } else {
        leftBtn.style.display = 'flex';
      }

      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
        rightBtn.style.display = 'none';
      } else {
        rightBtn.style.display = 'flex';
      }
    }

    leftBtn.addEventListener('click', () => {
      scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
      scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });

    scrollContainer.addEventListener('scroll', updateScrollButtons);

    // Initial update to set correct button visibility
    updateScrollButtons();
  });
});




