function FlashAppear (selector) {

  var that = this;
  this.selector = selector;
  this.$wrapper = $(this.selector);
  this.$canvas = this.$wrapper.find('canvas');
  this.canvas = this.$canvas[0];
  this.ctx = this.canvas.getContext('2d');
  this.srcPC = this.$wrapper.attr('data-src-pc');
  this.srcSP = this.$wrapper.attr('data-src-sp');
  this.duration = parseFloat(this.$wrapper.attr('data-duration')) * 1000;
  this.inc = (1/this.duration) * 10;
  this.imagePC = new Image();
  this.imageSP = new Image();
  this.imagePC.src = this.srcPC;
  this.imageSP.src = this.srcSP;
  this.image = null;
  this.device = null;
  this.loop = null;
  this.brightness = 1;
  this.animationEnd = false;

  this.init = function (callback) {
    this.sizing();
    this.imagePC.onload = function () {
      if (this.device === 'PC') {
        this.run();
        callback();
      }
    }.bind(this);
    this.imageSP.onload = function () {
      if (this.device === 'SP') {
        this.run();
        callback();
      }
    }.bind(this);
    this.imagePC.onerror = function () {
      callback();
    };
    this.imageSP.onerror = function () {
      callback();
    };
  };

  this.run = function () {
    this.draw();
    setTimeout(function () {
      that.$canvas.addClass('animate');
      that.loop();
    }, 1000);
  };

  this.loop = function () {
    if (!that.animationEnd) {
      that.draw();
      that.update();
    }
    else {
      that.onAnimationEnd();
    }
    window.requestAnimationFrame(that.loop);
  };

  this.onAnimationEnd = function () {
    window.cancelAnimationFrame(that.loop);
    $(window).on('resize', function () {
      this.draw();
    }.bind(this));
  };

  this.sizing = function () {
    this.device = (window.innerWidth < 1024) ? 'SP' : 'PC';
    this.canvas.width = this.$wrapper.width();
    this.canvas.height = this.$wrapper.height();
  };

  this.draw = function () {
    this.sizing();
    this.image = (this.device === 'PC') ? this.imagePC : this.imageSP;
    this.coverWithImage();
    this.ctx.globalCompositeOperation = 'lighten';
    this.coverWithImage();
    this.ctx.globalAlpha = this.brightness;
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  this.update = function () {
    this.brightness -= this.inc;
    this.brightness = Math.round(this.brightness * 1000) / 1000;
    if (this.brightness < 0) {
      this.brightness = 0;
      this.animationEnd = true;
    }
  };

  this.coverWithImage = function () {
    var canvasW = this.ctx.canvas.width;
    var canvasH = this.ctx.canvas.height;
    var offsetX = 0.5;
    var offsetY = 0.5;
    
    var imageW = this.image.width;
    var imageH = this.image.height;
    var ratio = Math.min(canvasW / imageW, canvasH / imageH);
    var newW = imageW * ratio;
    var newH = imageH * ratio;
    var cx, cy, cw, ch, ar = 1;
    
    if (newW < canvasW) ar = canvasW / newW;                             
    if (Math.abs(ar - 1) < 1e-14 && newH < canvasH) ar = canvasH / newH;
    newW *= ar;
    newH *= ar;
    
    cw = imageW / (newW / canvasW);
    ch = imageH / (newH / canvasH);
    
    cx = (imageW - cw) * offsetX;
    cy = (imageH - ch) * offsetY;
    
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > imageW) cw = imageW;
    if (ch > imageH) ch = imageH;
    
    this.ctx.drawImage(this.image, cx, cy, cw, ch,  0, 0, canvasW, canvasH);
  };

}