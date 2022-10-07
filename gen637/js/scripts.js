var app = app || {};

var spBreak = 767;

app.init = function () {
  app.jsForm();
  app.keyvisual();
  app.customScrollBar();
  app.switchTab();
  app.matchHeight();
  app.slider();
  app.buttonTop();
  app.mainNav();
  app.smoothScroll();
  app.smoothAnimation();
  app.initAccordion();
  app.wowjs();
  app.showAll();
  app.detectOsBrowser();
  app.googleMap();
  app.backgroundBlur();
};

app.jsForm = function () {
  if ($('.js-select').length) {
    var select = $('.js-select select');
    var items = $('.inquiry-wrapper');

    select.on('change', function () {
      var value = select.children('option:selected').attr('value');
      var currentTarget = $('#' + value);

      currentTarget.show();
      items.not(currentTarget).hide();
    });

    select.triggerHandler('change');
  }

  var getInquiryType = function () {
    var urlString = window.location.href;
    var getUrlParam = function (name) {
      var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(urlString);
      if (results == null) {
        return 0;
      }
      return results[1] || 0;
    };

    var inquiryType = getUrlParam('inquiryType');
    if (inquiryType !== undefined && inquiryType !== null) {
      if ($('select[name="inquiry-type"]').length) {
        $('option[value="inquiry-' + inquiryType + '"]').prop('selected', true);
      }
    }
  };

  getInquiryType();
};

app.keyvisual = function () {
  if ($('.top-keyvisual.top').length) {
    var flashImage = new FlashAppear('.top-keyvisual');
    flashImage.init(function () {
      $('main').removeClass('loading');
    });
  }
};

app.customScrollBar = function () {
  if ($('.js-custom-scrollbar').length && !app.isMobile()) {
    $('.js-custom-scrollbar').mCustomScrollbar();
  }
};

app.switchTab = function () {
  if ($('.js-tab-wrapper').length) {
    var activeTab = function (tab) {
      var wrapper = $(tab).parents('.js-tab-wrapper');
      var switchTab = $(tab).parents('.js-switch-tab');
      switchTab.find('a').removeClass('is-active');
      $(tab).addClass('is-active');
      var currentTab = $(tab).attr('href');
      wrapper.find('.tab-content-item').hide();
      $(currentTab).show();
    };

    $('.js-switch-tab a').click(function () {
      activeTab(this);
      return false;
    });
    $('.js-tab-wrapper li:first-child a').triggerHandler('click');
  }
};

app.isMobile = function () {
  return window.matchMedia('(max-width: ' + spBreak + 'px)').matches;
};

app.isTrueMobileDevice = function () {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

app.matchHeight = function () {
  if ($('.js-matchheight').length) {
    $('.js-matchheight').matchHeight();
  }
};

app.slider = function () {
  if ($('.js-topic-slider').length) {
    $('.js-topic-slider').slick({
      dots: true,
      speed: 400,
      autoplay: true,
      autoplaySpeed: 3000,
      variableWidth: true,
      slidesToScroll: 1,
      infinite: true,
      easing: 'swing',
      centerMode: true,
      centerPadding: 0,
      arrows: false,
      initialSlide: 1
    });
  }
};

app.buttonTop = function () {
  var buttonTop = $('.js-button-to-top');

  buttonTop.click(function () {
    $('html, body').animate(
      {
        scrollTop: 0
      },
      500
    );
  });

  buttonTopFade();

  $(window).on('load scroll resize', function () {
    buttonTopFade();
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
};

app.mainNav = function () {
  var body = $('body');
  var buttonMenu = $('.js-button-hamburger');
  var overlay = $('.js-overlay');

  if (app.isTrueMobileDevice()) {
    var offsetY = window.pageYOffset;
    buttonMenu.on('click', function () {
      body.toggleClass('nav-opened');
      if (body.hasClass('nav-opened')) {
        offsetY = window.pageYOffset;
        body.addClass('open-menu');
        body.css({
          position: 'fixed',
          width: '100%',
          top: '-' + offsetY + 'px'
        });
        body.addClass('open-menu');
      } else {
        body.css({
          position: 'static',
          width: 'auto',
          top: 'auto'
        });
        $(window).scrollTop(offsetY);
      }
    });

    overlay.on('click', function () {
      body.removeClass('nav-opened');
      body.css({
        position: 'static',
        width: 'auto',
        top: 'auto'
      });
      $(window).scrollTop(offsetY);
    });
  } else {
    buttonMenu.on('click', function () {
      body.toggleClass('nav-opened');
    });
    overlay.on('click', function () {
      body.removeClass('nav-opened');
    });
  }
};

app.smoothScroll = function () {
  //to top right away
  if (window.location.hash) scroll(0, 0);
  // void some browsers issue
  setTimeout(function () {
    scroll(0, 0);
  }, 1);
  // if we have anchor on the url
  if (window.location.hash) {
    var replaceHash = window.location.hash.replace('#', '');
    headerHeight = $('header').outerHeight();
    if ($('#' + replaceHash).length) {
      setTimeout(function () {
        $('html, body').animate(
          {
            // smooth scroll to the anchor id
            scrollTop: $('#' + replaceHash).offset().top - headerHeight
          },
          500
        );
        $('#' + replaceHash).click();
      }, 800);
    }
  }
  $('.js-smooth').click(function () {
    var speed = 500,
      href = $(this)
        .attr('href')
        .split('#')[1], // can work with url within relative path
      headerHeight = $('header').outerHeight(), // use this when header fixed
      target = $(href == '' ? 'html' : '#' + href),
      position = target.offset().top - headerHeight - 10;
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

app.smoothAnimation = function () {
  if (!app.isTrueMobileDevice()) {
    luxy.init({
      wrapper: '#js-luxy',
      wrapperSpeed: 0.08
    });
  }
};

app.initAccordion = function () {
  var accordion = $('.js-accordion');

  if (accordion.length) {
    accordion.off('click').on('click', function () {
      $(this).toggleClass('is-active');
      $(this)
        .next()
        .stop()
        .slideToggle(300);
    });
  }
};

app.wowjs = function () {
  new WOW().init();
};

app.showAll = function () {
  var element = $('.js-show-all');

  if (element.length) {
    var button = element.find('.text-show-all');
    button.on('click', function (e) {
      var content = $(e.currentTarget)
        .parents('.js-show-all')
        .find('.content-show');
      content.toggleClass('is-active');
      $(e.currentTarget).toggleClass('is-active');
    });
  }
};

app.detectOsBrowser = function () {
  var body = $('body');
  if (navigator.platform.toLowerCase().indexOf('mac') >= 0) {
    body.addClass('is-mac');
  }
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('safari') != -1) {
    if (userAgent.indexOf('chrome') > -1) {
      body.addClass('is-chrome');
    } else {
      body.addClass('is-safari');
    }
  }
  if (userAgent.indexOf('android') > -1) {
    body.addClass('is-android');
  }
};

app.googleMap = function () {
  if ($('#maps-wrapper').length) {
    var map = new google.maps.Map(document.getElementById('maps-wrapper'), {
      zoom: 17,
      center: {
        lat: 35.662174,
        lng: 139.736391
      }
    });

    new google.maps.Marker({
      position: {
        lat: 35.662174,
        lng: 139.736391
      },
      map: map
    });
  }
};

app.backgroundBlur = function () {
  if ($('.js-bg-blur').length) {
    $('.js-bg-blur').each(function () {
      var imgUrl = $(this).data('src');
      $(this).backgroundBlur({
        imageURL: imgUrl,
        blurAmount: 50,
        imageClass: 'bg-blur'
      });
    });
  }
};

$(function () {
  app.init();
});
