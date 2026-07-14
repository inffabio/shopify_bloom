(function ($) {
  function initProductCarousel($carousel) {
    var $track = $carousel.find('[data-product-carousel-track]');
    var $pages = $carousel.find('[data-product-carousel-page]');
    var $dots = $carousel.find('[data-product-carousel-dot]');

    if ($track.length === 0 || $pages.length <= 1) {
      return;
    }

    var current = 0;
  var timer = null;
  var autoplayDelayMs = 4500;

    function paintDots(active) {
      $dots.each(function (index) {
        $(this).attr('aria-pressed', index === active ? 'true' : 'false');
        $(this).find('span').css('background-color', index === active ? 'var(--color-forest-accent)' : '#A8C9C7');
      });
    }

    function goTo(index) {
      if (index < 0) {
        index = $pages.length - 1;
      }

      if (index >= $pages.length) {
        index = 0;
      }

      current = index;
      $track.css('transform', 'translateX(-' + (current * 100) + '%)');
      paintDots(current);
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      stop();
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, autoplayDelayMs);
    }

    $dots.on('click', function () {
      var index = $dots.index(this);
      goTo(index);
      start();
    });

    $carousel.on('mouseenter', stop);
    $carousel.on('mouseleave', start);

    goTo(0);
    start();
  }

  $(function () {
    $('[data-product-carousel]').each(function () {
      initProductCarousel($(this));
    });
  });
})(jQuery);
