// Gallery expansion logic
// function expand(element) {
//   if (element.classList.contains('expanded')) {
//     element.classList.remove('expanded');
//     document.querySelector('.gallery-item').style.height = '25em';
//     document.querySelector('.gallery-item').style.width = '25em';
//   } else {
//     element.classList.add('expanded');
//     document.querySelector('.gallery-item').style.height = 'auto';
//     document.querySelector('.gallery-item').style.width = 'auto';
//   }
//   if (window.innerWidth <= 980) {
//     element.scrollIntoView({ block: 'start', behavior: 'smooth' });
//   } else {
//     element.scrollIntoView({ block: 'center' });
//   }
// }

function expand(img) {
  let parentDiv = img.parentElement;
  parentDiv.classList.toggle('expanded');
  let overlay = document.querySelector('.overlay');
  if (parentDiv.classList.contains('expanded')) {
    overlay.style.visibility = 'visible';
  } else {
    overlay.style.visibility = 'hidden';
  }
  if (window.innerWidth <= 980) {
    parentDiv.scrollIntoView({ block: 'start', behavior: 'smooth' });
  } else {
    parentDiv.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
}

(function ($) {
  var $window = $(window),
    $body = $('body'),
    $nav = $('#nav');

  // Breakpoints.
  breakpoints({
    xlarge: ['1281px', '1680px'],
    large: ['981px', '1280px'],
    medium: ['737px', '980px'],
    small: ['361px', '736px'],
    xsmall: [null, '360px'],
  });

  // Play initial animations on page load.
  $window.on('load', function () {
    window.setTimeout(function () {
      $body.removeClass('is-preload');
    }, 100);
  });

  // Dropdowns.
  $('#nav > ul').dropotron({
    mode: 'fade',
    noOpenerFade: true,
    speed: 300,
    alignment: 'center',
  });

  // Scrolly
  $('.scrolly').scrolly({
    speed: 1000,
    offset: function () {
      return $nav.height() + 15;
    },
  });

  //   Scrolly function if coming from another page
  $(document).ready(function () {
    if (window.location.hash) {
      var $target = $(window.location.hash);
      if ($target.length) {
        $('html, body').animate(
          {
            scrollTop: $target.offset().top - ($nav.height() + 15),
          },
          1000
        );
      }
    }
  });

  // Nav.

  // Title Bar.
  $(
    '<div id="titleBar">' +
      '<a href="#navPanel" class="toggle"></a>' +
      '<span class="title">' +
      $('#logo').html() +
      '</span>' +
      '</div>'
  ).appendTo($body);

  // Panel.
  $('<div id="navPanel">' + '<nav>' + $('#nav').navList() + '</nav>' + '</div>')
    .appendTo($body)
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: 'left',
      target: $body,
      visibleClass: 'navPanel-visible',
    });
})(jQuery);
