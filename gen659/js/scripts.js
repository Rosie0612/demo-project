var app = app || {};

var spBreak = 767;

app.init = function () {
  app.spMenu();
  app.keyvisual();
  app.slider();
  app.accordion();
  app.smoothScroll();
  app.modal();
  app.modalCustom();
};

app.isMobile = function () {
  return window.matchMedia('(max-width: ' + spBreak + 'px)').matches;
};

app.spMenu = function () {
  var btnMenu = $('.js-button-menu');
  var spNav = $('.header-nav');
  var offsetY = window.pageYOffset;
  var header = $('header');
  btnMenu.click(function () {
    header.stop().toggleClass('is-active');

    if (header.hasClass('is-active')) {
      offsetY = window.pageYOffset;
      $('body').css({
        position: 'fixed',
        top: -offsetY + 'px',
        width: '100%'
      });
      spNav.fadeIn(300);
    } else {
      $('body').css({
        position: 'static',
        top: 'auto'
      });
      $(window).scrollTop(offsetY);
      spNav.fadeOut(300);
    }
    return false;
  });
};

app.keyvisual = function () {
  var rtime;
  var timeout = false;
  var delta = 200;

  var initWidth;
  initWidth = $(window).width();
  screenWidth = screen.width;

  function resizeEnd () {
    if (new Date() - rtime < delta) {
      setTimeout(resizeEnd, delta);
    } else {
      timeout = false;
      if ($('.slick-initialized').length) {
        $('.js-slick.slick-initialized').slick('destroy');
      }
      $('.js-slick').slick(slickSettings);
    }
  }

  if ($('.js-slick').length) {
    $(window).on('resize', function () {
      if (initWidth === $(window).width() && screenWidth === screen.width) {
        return;
      }
      initWidth = $(window).width();
      screenWidth = screen.width;
      rtime = new Date();
      if (timeout === false) {
        timeout = true;
        setTimeout(resizeEnd, delta);
      }
    });

    var useCSS = true;
    if (/Edge\/\d./i.test(navigator.userAgent)) {
      useCSS = false;
    }

    var slickSettings = {
      dots: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 0,
      pauseOnHover: false,
      pauseOnFocus: false,
      variableWidth: true,
      cssEase: 'linear',
      speed: 12000,
      touchMove: false,
      useCSS: useCSS,
      initialSlide: 1
    };

    if ($('.slick-initialized').length) {
      $('.js-slick.slick-initialized').slick('destroy');
    }

    $('.js-slick').slick(slickSettings);

    // Re-init on orientation changes
    $(window).on('resize', function () {
      if (
        (initWidth > 767 && $(window).width() <= 767) ||
        (initWidth <= 767 && $(window).width() > 767)
      ) {
        initWidth = $(window).width();
        if ($('.slick-initialized').length) {
          $('.js-slick.slick-initialized').slick('destroy');
        }
        setTimeout(function () {
          $('.js-slick').slick(slickSettings);
        }, 100);
      }
    });

    $(window).on('orientationchange', function () {
      if ($('.slick-initialized').length) {
        $('.js-slick.slick-initialized').slick('destroy');
      }
      $('.js-slick').slick(slickSettings);
    });
  }
};

app.slider = function () {
  if ($('.js-rental-list').length) {
    $('.js-rental-list').slick({
      dots: false,
      arrows: true,
      infinite: true,
      slidesToShow: 3,
      initialSlide: 1,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 2200,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            slidesToScroll: 1
          }
        }
      ]
    });
  }
  if ($('.js-hair-list').length) {
    $('.js-hair-list').slick({
      dots: false,
      arrows: true,
      infinite: true,
      slidesToShow: 3,
      initialSlide: 1,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 2500,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            centerMode: true,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }
  if ($('.js-detail-slider').length) {
    $('.js-detail-slider').slick({
      dots: true,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
    });
  }
};

app.accordion = function () {
  if ($('.js-accordion').length) {
    $('.js-accordion')
      .find('.accordion-title')
      .click(function () {
        $(this)
          .parent()
          .toggleClass('is-active');
        $(this)
          .parent()
          .find('.accordion-content')
          .eq(0)
          .slideToggle(300);
      });
  }
};

app.smoothScroll = function () {
  var anchorElement = $('.js-scroll'),
    speed = 500;

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
          speed
        );
      }, 800);
    }
  }

  anchorElement.click(function () {
    var href = $(this)
        .attr('href')
        .split('#')[1],
      target = $(href == '' ? 'html' : '#' + href);
    if ($('#' + href).length) {
      var position = target.offset().top;
      $('body,html').animate(
        {
          scrollTop: position
        },
        speed,
        'swing'
      );
      return false;
    }
  });
};

app.modal = function () {
  var offsetY = window.pageYOffset;
  if ($('.lightbox-popup').length) {
    var lightbox = $('.lightbox-popup');
    var btn = $('.js-open-lightbox');
    var scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    var modalInit = function () {
      btn.click(function () {
        var lightboxID = $(this).attr('data-lightbox');
        modalOpen(lightboxID);
      });

      lightbox.find('.js-popup-close').click(function () {
        var lightBox = $(this).parents('.lightbox-popup');
        modalClose(lightBox);
      });
    };

    var modalOpen = function (lightboxID) {
      $('.lightbox-popup[data-lightbox="' + lightboxID + '"]').fadeIn();
      offsetY = window.pageYOffset;
      $('body').addClass('no-scroll');
      $('body').css({
        position: 'fixed',
        top: -offsetY + 'px',
        width: '100%',
        paddingRight: scrollBarWidth + 'px'
      });
      $(document).on('touchmove', function (e) {
        if ($(e.target).parents('.lightbox-window').length == 0) return false;
      });
    };

    var modalClose = function (lightBox) {
      $('body').removeClass('no-scroll');
      $('body').css({
        position: 'static',
        top: 'auto',
        paddingRight: 0
      });
      $(window).scrollTop(offsetY);
      lightBox.fadeOut('fast');
      $(document).off('touchmove');
    };
    modalInit();
  }
};

app.modalCustom = function () {
  var buttonTrigger = $('.js-open-modal'),
    modal = $('.popup-staff'),
    container = $('.modal-container'),
    btnPrev = $('.modal-prev'),
    btnNext = $('.modal-next'),
    offsetY = window.pageYOffset,
    scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

  var initModal = function () {
    buttonTrigger.on('click', function () {
      var catagoryModal = $(this)
        .parents('.category')
        .data('category');
      var target = $(this).data('modal');
      openModal(catagoryModal, target);
    });

    container.on('click', function (e) {
      if ($(e.target).parents('.popup-staff').length == 0) {
        closeModal();
      }
    });

    btnPrev.on('click', function (e) {
      e.stopPropagation();
      previous();
      return false;
    });
    btnNext.on('click', function (e) {
      e.stopPropagation();
      next();
      return false;
    });

    modal.on('swiperight', previous);
    modal.on('swipeleft', next);

    $(window).on('resize', refreshModal);

    //Fix scroll swipe event
    modal.on('movestart', function (e) {
      if (
        (e.distX > e.distY && e.distX < -e.distY) ||
        (e.distX < e.distY && e.distX > -e.distY)
      ) {
        e.preventDefault();
      }
    });
  };

  var openModal = function (catagoryModal, mod) {
    var category = $('.popup-staff[data-category="' + catagoryModal + '"]');
    var modal = $(
      '.popup-staff[data-category="' +
        catagoryModal +
        '"][data-modal="' +
        mod +
        '"]'
    );
    var currentIndex = category.index(modal);

    modal.show().addClass('is-active');
    checkControls(currentIndex);
    container.fadeIn();
    refreshModal();
    offsetY = window.pageYOffset;
    $('body').css({
      position: 'fixed',
      top: -offsetY + 'px',
      width: '100%',
      'padding-right': scrollBarWidth + 'px'
    });
  };

  var closeModal = function () {
    var active = $('.popup-staff.is-active');
    active.removeClass('is-active');

    container.fadeOut(500, function () {
      active.hide();

      $('body').css({
        position: 'static',
        top: 'auto',
        'padding-right': 0
      });
      $(window).scrollTop(offsetY);
    });
  };

  var refreshModal = function () {
    var winW = $(window).width();
    var winH = $(window).height();
    var modal = $('.popup-staff.is-active');

    modal.css({
      left: winW / 2 - modal.outerWidth() / 2
    });

    var modLeft = parseInt(modal.css('left'));

    btnPrev.css({
      left: 20,
      top: winH / 2 - btnPrev.height() / 2
    });
    btnNext.css({
      left: 'auto',
      right: 20,
      top: winH / 2 - btnNext.height() / 2
    });

    if (window.innerWidth <= 1300) {
      btnPrev.css({
        left: modLeft
      });
      btnNext.css({
        left: modLeft + modal.outerWidth() - btnNext.width(),
        right: 'auto'
      });
    }
  };

  var previous = function () {
    var modal = $('.popup-staff.is-active');
    var catagoryModal = modal.data('category');
    var category = $('.popup-staff[data-category="' + catagoryModal + '"]');
    var currentIndex = category.index(modal);
    var newIndex = currentIndex - 1;

    if (newIndex >= 0) {
      var prev = category.eq(newIndex);
      modal.removeClass('is-active').addClass('hideRight');
      prev
        .show()
        .addClass('is-active')
        .addClass('showRight');
      refreshModal();
      checkControls(newIndex);

      setTimeout(function () {
        prev.removeClass('showRight');
        modal.hide().removeClass('hideRight');
      }, 500);
    }
  };

  var next = function () {
    var modal = $('.popup-staff.is-active');
    var catagoryModal = modal.data('category');
    var category = $('.popup-staff[data-category="' + catagoryModal + '"]');
    var currentIndex = category.index(modal);
    var newIndex = currentIndex + 1;

    if (newIndex < category.length) {
      var next = category.eq(newIndex);
      modal.removeClass('is-active').addClass('hideLeft');
      next
        .show()
        .addClass('is-active')
        .addClass('showLeft');
      refreshModal();
      checkControls(newIndex);

      setTimeout(function () {
        next.removeClass('showLeft');
        modal.hide().removeClass('hideLeft');
      }, 500);
    }
  };

  var checkControls = function (currentIndex) {
    var modal = $('.popup-staff.is-active');
    var catagoryModal = modal.data('category');
    var category = $('.popup-staff[data-category="' + catagoryModal + '"]');
    currentIndex = category.index(modal);

    if (currentIndex == 0) {
      btnPrev.addClass('disabled');
      btnPrev.prop('disabled', true);
    } else {
      btnPrev.removeClass('disabled');
      btnPrev.prop('disabled', false);
    }

    if (currentIndex == category.length - 1) {
      btnNext.addClass('disabled');
      btnNext.prop('disabled', true);
    } else {
      btnNext.removeClass('disabled');
      btnNext.prop('disabled', false);
    }
  };

  initModal();
};

$(function () {
  app.init();
});
