(function ($) {
  function initCarousel($carousel) {
    var $track = $carousel.find('[data-bloom-track]');
    var $slides = $carousel.find('[data-bloom-slide]');
    var $dots = $carousel.find('[data-bloom-dot]');

    if ($track.length === 0 || $slides.length === 0 || $dots.length === 0) {
      return;
    }

    var current = 0;
    var timer = null;

    function paintDots(active) {
      $dots.css('background-color', 'rgba(255,255,255,0.4)');
      $dots.eq(active).css('background-color', '#2d6a4f');
    }

    function goTo(index) {
      current = index;
      $track.css('transform', 'translateX(-' + (index * 100) + '%)');
      paintDots(current);
    }

    function next() {
      goTo((current + 1) % $slides.length);
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

    $track.css('transform', 'translateX(0%)');
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
