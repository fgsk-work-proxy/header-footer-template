/**
 * Footer Module
 * Controls the 'expandable' functionality and such
 * @requires jquery
 */
define([
  'jquery',
  'intentcontext'
], function ($, IntentContext) {
  'use strict';

  /**
   * Gets the element 
   */
  var Footer = function (elm) {
    this.$elm = $(elm);
    this.curLayout = IntentContext.horizontal_axis.respond().axes.width.current;
    this.checkForChildren();
    this.bindListeners();
  };

  /**
   * Check for children, add classes
   */
  Footer.prototype.checkForChildren = function () {
    var ftNav = this.$elm.find('.footer__sub--block');

    ftNav.each(function () {
      $(this).has('ul').addClass('hasChildren');
    });
  };


  /**
   * Add dropdown functionality
   */
  Footer.prototype.bindListeners = function () {
    var nav = $('.hasChildren');
if (this.curLayout === 'mobile' || this.curLayout === 'mobilelandscape') {
    nav.on('click', function () {
      $(this).find('ul').slideToggle('fast');
      $(this).toggleClass('open');
    });
     nav.find('ul').each(function () {
        $(this).hide();
      });
}
    IntentContext.intent.on('desktop', function () {
      //console.log('Layout: Desktop');
      nav.off('click');
      nav.find('ul').each(function () {
        $(this).show();
      });
    });

    IntentContext.intent.on('tabletlandscape', function () {
      //console.log('Layout: Tablet - Landscape');
      nav.off('click');
      nav.find('ul').each(function () {
        $(this).show();
      });
    });

    IntentContext.intent.on('tablet', function () {
      //console.log('Layout: Tablet - Portrait');
      nav.off('click');
      nav.find('ul').each(function () {
        $(this).show();
      });
    });

    IntentContext.intent.on('mobilelandscape', function () {
      //console.log('Layout: Mobile - Landscape');
      nav.off('click').on('click', function () {
      $(this).find('ul').slideToggle('fast');
      $(this).toggleClass('open');
    });
      nav.find('ul').each(function () {
        $(this).hide();
        nav.removeClass('open');
      });
    });

    IntentContext.intent.on('mobile', function () {
      //console.log('Layout: Mobile - Portrait');
       nav.off('click').on('click', function () {
      $(this).find('ul').slideToggle('fast');
      $(this).toggleClass('open');
    });
      nav.find('ul').each(function () {
        $(this).hide();
         nav.removeClass('open');
      });
    });
  };


  /**
   * DOM Ready
   */
  $(function () {
    var footer = new Footer($('footer'));
  });
});
