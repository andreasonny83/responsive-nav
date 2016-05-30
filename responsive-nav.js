'use strict';

function ResponsiveNav() {
  this.startX = 0;
  this.currentX = 0;
  var self = this;

  this.showButtonEl =
    document.querySelector('.js-menu-show');

  this.hideButtonEl =
    document.querySelector('.js-menu-hide');

  this.responsiveNavEl =
    document.querySelector('.js-responsive-nav');

  this.responsiveNavContainer =
    document.querySelector('.js-responsive-nav-container');

  this.showButtonEl
    .addEventListener('click', this.showResponsiveNav.bind(this));

  this.hideButtonEl
    .addEventListener('click', this.hideResponsiveNav.bind(this));

  this.responsiveNavEl
    .addEventListener('click', this.hideResponsiveNav.bind(this));

  this.responsiveNavContainer
    .addEventListener('click', this.ignoreHide);

  this.responsiveNavEl
    .addEventListener('touchstart', this.onTouchStart.bind(this));

  this.responsiveNavEl
    .addEventListener('touchmove', this.onTouchMove.bind(this));

  this.responsiveNavEl
    .addEventListener('touchend', this.onTouchEnd.bind(this));

  this.onTransitionEnd = function() {
    self.responsiveNavContainer
      .classList.remove('responsive-nav__container--animatable');

    self.responsiveNavContainer
      .removeEventListener('transitionend', self.onTransitionEnd);
  };
}

ResponsiveNav.prototype.showResponsiveNav = function() {
  this.responsiveNavEl
    .classList.add('responsive-nav--visible');

  this.responsiveNavEl
    .classList.add('responsive-nav--animatable');

  this.responsiveNavEl
    .addEventListener('transitionend', this.onTransitionEnd);
};

ResponsiveNav.prototype.hideResponsiveNav = function() {
  this.responsiveNavEl
    .classList.remove('responsive-nav--visible');

  this.responsiveNavEl
    .classList.add('responsive-nav--animatable');

  this.responsiveNavEl
    .addEventListener('transitionend', this.onTransitionEnd);
};

ResponsiveNav.prototype.ignoreHide = function(evt) {
  evt.stopPropagation();
};

ResponsiveNav.prototype.update = function() {
  console.log(this);

  if(!this.touchingSideNav) {
    return;
  }

  var translateX = Math.min(0, this.currentX - this.startX);

  this.responsiveNavContainer.style.transform =
    'translateX(' + translateX + 'px)';

  requestAnimationFrame(this.update.bind(this));
};

ResponsiveNav.prototype.onTouchStart = function(evt) {
  if (!this.responsiveNavEl.classList.contains('responsive-nav--visible')) {
    return;
  }

  this.startX = evt.touches[0].pageX;
  this.currentX = this.startX;

  this.touchingSideNav = true;
  requestAnimationFrame(this.update.bind(this));
};

ResponsiveNav.prototype.onTouchMove = function(evt) {
  if (!this.touchingSideNav) {
    return;
  }

  this.currentX = evt.touches[0].pageX;

  evt.preventDefault();
};

ResponsiveNav.prototype.onTouchEnd = function(evt) {
  if (!this.touchingSideNav) {
    return;
  }

  this.touchingSideNav = false;

  var translateX = Math.min(0, this.currentX - this.startX);
  this.responsiveNavContainer.style = '';

  if (translateX < -60) {
    this.hideResponsiveNav();
  }
};

new ResponsiveNav();
