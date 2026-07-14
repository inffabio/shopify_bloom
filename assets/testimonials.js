document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('[data-testimonials-carousel]');
  if (!carousel) return;

  let currentIndex = 0;
  const slides = carousel.querySelectorAll('[data-testimonial-slide]');
  const totalSlides = slides.length;
  const prevBtn = carousel.querySelector('[data-carousel-prev]');
  const nextBtn = carousel.querySelector('[data-carousel-next]');
  const dots = carousel.querySelectorAll('[data-carousel-dot]');

  function showSlide(n) {
    currentIndex = (n + totalSlides) % totalSlides;
    slides.forEach((slide, i) => {
      slide.classList.toggle('hidden', i !== currentIndex);
    });
    dots.forEach((dot, i) => {
      const isActive = i === currentIndex;
      dot.querySelector('span').classList.toggle('bg-atelier-mocha', isActive);
      dot.querySelector('span').classList.toggle('bg-atelier-mocha/30', !isActive);
      dot.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });

  showSlide(0);
});
