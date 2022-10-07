var app = app || {};

var spBreak = 767;

app.init = function () {
  app.wowjs();
  app.mainMenu();
  app.buttonTop();
  app.smoothScroll();
  app.addOnChrome();
};

app.isMobile = function () {
  return window.matchMedia('(max-width: ' + spBreak + 'px)').matches;
};

app.addOnChrome = function () {
  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if (isChrome) {
    $('.g1-1').addClass('hide-on-big-screen');
    $('.g1-3').addClass('hide-on-big-screen');
    $('.g2-1').addClass('hide-on-big-screen');
    $('.g2-3').addClass('hide-on-big-screen');
    $('.g3-1').addClass('hide-on-big-screen');
    $('.g3-3').addClass('hide-on-big-screen');
  }
};

app.wowjs = function () {
  new WOW().init();
};

app.mainMenu = function () {
  var header = $('header');
  var buttonOpen = $('header .button-open');
  var buttonClose = $('header .button-close');
  var menu = $('header .header-wrapper');
  var offsetY = window.pageYOffset;
  buttonOpen.on('click', function () {
    menu.slideDown();
    header.addClass('is-active');
    offsetY = window.pageYOffset;
    $('body').css({
      position: 'fixed',
      top: -offsetY + 'px',
      width: '100%'
    });
  });
  buttonClose.on('click', function () {
    menu.slideUp();
    header.removeClass('is-active');
    $('body').css({
      position: 'static',
      top: 'auto',
      width: 'auto'
    });
    $(window).scrollTop(offsetY);
  });
};

app.buttonTop = function () {
  var buttonTop = $('.button-to-top');

  buttonTop.click(function () {
    $('html, body').animate({
        scrollTop: 0
      },
      500
    );
  });

  buttonTopFade();
  buttonTopFixed();

  $(window).on('load scroll resize', function () {
    buttonTopFade();
    buttonTopFixed();
  });

  function buttonTopFade() {
    if ($(window).scrollTop() > $(window).height() * 0.2) {
      if (!buttonTop.is(':visible')) {
        buttonTop.css('opacity', 0).show();
        buttonTop.animate({
            opacity: 1
          },
          400
        );
      }
    } else {
      if (buttonTop.is(':visible') && !buttonTop.is(':animated')) {
        buttonTop.animate({
            opacity: 0
          },
          400,
          function () {
            buttonTop.css('opacity', 1).hide();
          }
        );
      }
    }
  }

  function buttonTopFixed() {
    if ($(window).scrollTop() + window.innerHeight > $('footer').offset().top) {
      buttonTop.addClass('is-fixed');
    } else {
      buttonTop.removeClass('is-fixed');
    }
  }
};

app.smoothScroll = function () {
  if (window.location.hash) scroll(0, 0);
  setTimeout(function () {
    scroll(0, 0);
  }, 1);
  if (window.location.hash) {
    var replaceHash = window.location.hash.replace('#', '');
    if ($('#' + replaceHash).length) {
      setTimeout(function () {
        $('html, body').animate({
            scrollTop: $('#' + replaceHash).offset().top
          },
          500
        );
        $('#' + replaceHash).click();
      }, 800);
    }
  }
  $('.smooth').click(function () {
    var speed = 500,
      href = $(this)
      .attr('href')
      .split('#')[1],
      target = $(href == '' ? 'html' : '#' + href),
      position = target.offset().top;
    $('body,html').animate({
        scrollTop: position
      },
      speed,
      'swing'
    );
    return false;
  });
};

$(function () {
  app.init();
});