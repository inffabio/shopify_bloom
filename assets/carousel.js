(function ($) {
  function initCarousel($carousel) {
    if ($carousel.data('bloomCarouselReady') === true) {
      return;
    }

    var $track = $carousel.find('[data-bloom-track]');
    var $slides = $carousel.find('[data-bloom-slide]');
    var $dots = $carousel.find('[data-bloom-dot]');

    if ($track.length === 0 || $slides.length === 0 || $dots.length === 0) {
      return;
    }

    $carousel.data('bloomCarouselReady', true);

    var totalSlides = $slides.length;
    var transitionMs = 500;
    var originalTransition = $track[0].style.transition || 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    var current = 0;
    var visualIndex = 0;
    var isTransitioning = false;
    var timer = null;

    if (totalSlides > 1) {
      var $firstClone = $slides.first().clone();
      $firstClone.attr('data-bloom-slide-clone', 'true');
      $track.append($firstClone);
    }

    function paintDots(active) {
      $dots.css('background-color', 'rgba(255,255,255,0.4)');
      $dots.eq(active).css('background-color', '#2d6a4f');
    }

    function setPosition(index, useTransition) {
      $track.css('transition', useTransition ? originalTransition : 'none');
      $track.css('transform', 'translateX(-' + (index * 100) + '%)');
    }

    function goTo(index) {
      if (index < 0 || index >= totalSlides || isTransitioning) {
        return;
      }

      current = index;
      visualIndex = index;
      setPosition(visualIndex, true);
      paintDots(current);
    }

    function next() {
      if (isTransitioning || totalSlides <= 1) {
        return;
      }

      if (current === totalSlides - 1) {
        isTransitioning = true;
        visualIndex = totalSlides;
        setPosition(visualIndex, true);
        paintDots(0);

        window.setTimeout(function () {
          current = 0;
          visualIndex = 0;
          setPosition(visualIndex, false);

          window.requestAnimationFrame(function () {
            $track[0].offsetHeight;
            $track.css('transition', originalTransition);
            isTransitioning = false;
          });
        }, transitionMs);

        return;
      }

      goTo(current + 1);
    }

    function start() {
      stop();
      timer = setInterval(next, 5000);
    }

    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    setPosition(0, false);
    $track.css('transition', originalTransition);
    paintDots(0);

    $dots.on('click', function () {
      var index = $dots.index(this);
      goTo(index);
      start();
    });

    $carousel.on('mouseenter', stop);
    $carousel.on('mouseleave', start);

    start();
  }

  $(function () {
    $('[data-bloom-carousel]').each(function () {
      initCarousel($(this));
    });
  });
})(jQuery);
