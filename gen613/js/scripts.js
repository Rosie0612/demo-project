var app = app || {};

app.init = function () {
  app.slider();
  app.wowjs();
  app.mainMenu();
  app.buttonTop();
  app.smoothScroll();
  app.createBackground();
  app.toggleRadioBox();
  app.chooseFile();
};

app.slider = function () {
  if ($('.js-keyvisual-slider').length) {
    $('.js-keyvisual-slider').slick({
      arrows: false,
      fade: true,
      dots: true,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 2000,
      cssEase: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
      pauseOnFocus: false,
      pauseOnHover: false,
      swipe: false
    });
    $('.js-keyvisual-slider').on('beforeChange', function (
      event,
      slick,
      currentSlide,
      nextSlide
    ) {
      slick.$slides.eq(nextSlide).addClass('slick-animated');
      setTimeout(function () {
        $('.js-keyvisual-slider')
          .find('.slick-slide:not(.slick-current)')
          .removeClass('slick-animated');
      }, 3000);
    });
  }

  var slickMobile = false;
  function sliderMobile () {
    if ($(window).width() <= 767) {
      if (!slickMobile) {
        $('.js-member-slider').slick({
          autoplay: true,
          centerMode: true,
          arrows: false,
          dots: false,
          infinite: true,
          speed: 300,
          slidesToShow: 1
        });
        slickMobile = true;
      }
    } else if ($(window).width() > 767) {
      if (slickMobile) {
        $('.js-member-slider').slick('unslick');
        slickMobile = false;
      }
    }
  }
  if ($('.js-member-slider').length) {
    sliderMobile();
    $(window).on('load resize', function () {
      sliderMobile();
    });
  }
};

app.wowjs = function () {
  new WOW().init();
};

app.mainMenu = function () {
  var header = $('header');
  var overlay = $('.overlay');
  var buttonOpen = $('header .button-open');
  var buttonClose = $('header .button-close');
  var offsetY = window.pageYOffset;
  buttonOpen.on('click', function () {
    menuOpen();
  });
  buttonClose.on('click', function () {
    menuClose();
  });
  overlay.on('click', function () {
    menuClose();
  });

  menuOpen = function () {
    overlay.addClass('is-active');
    header.addClass('is-active');
    offsetY = window.pageYOffset;
    $('body').css({
      position: 'fixed',
      top: -offsetY + 'px',
      width: '100%'
    });
  };
  menuClose = function () {
    overlay.removeClass('is-active');
    header.removeClass('is-active');
    $('body').css({
      position: 'static',
      top: 'auto',
      width: 'auto'
    });
    $(window).scrollTop(offsetY);
  };
};

app.buttonTop = function () {
  var buttonTop = $('.button-to-top');

  buttonTop.on('click touchstart', function () {
    $('html, body').animate(
      {
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

  function buttonTopFade () {
    if ($(window).scrollTop() > $(window).height() * 0.2) {
      if (!buttonTop.is(':visible')) {
        buttonTop.css('opacity', 0).show();
        buttonTop.animate(
          {
            opacity: 1
          },
          400
        );
      }
    } else {
      if (buttonTop.is(':visible') && !buttonTop.is(':animated')) {
        buttonTop.animate(
          {
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

  function buttonTopFixed () {
    if (
      $(window).scrollTop() + window.innerHeight >
      $('.footer-top').offset().top
    ) {
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
        $('html, body').animate(
          {
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
    $('body,html').animate(
      {
        scrollTop: position
      },
      speed,
      'swing'
    );
    return false;
  });
};

app.createBackground = function () {
  if ($('.img-background').length) {
    $('.img-background').each(function () {
      var $container = $(this),
        imgUrl = $container.prop('src');
      if (imgUrl) {
        $container
          .parent()
          .find('.is-background')
          .css('backgroundImage', 'url(' + imgUrl + ')');
      }
    });
  }
};

app.toggleRadioBox = function () {
  if ($('.js-radio-open').length) {
    $('.js-radio-open').each(function () {
      $('.js-radio-open').change(function () {
        var dataId = $(this).attr('data-id');
        var checked = $(this).is(':checked');
        $('.js-box-show').removeClass('is-show');
        if (checked) {
          $('#' + dataId).addClass('is-show');
        }
      });
    });
  }
};

app.chooseFile = function () {
  $('#choose-file').bind('change', function () {
    var fileName = $('#choose-file').val();
    var trueFileName = fileName.replace('C:\\fakepath\\', '');
    $('#name-file').val(trueFileName);
  });
};

$(function () {
  app.init();
});
