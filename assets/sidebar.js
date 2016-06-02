/**
 * Sidebar Module
 * Controls the 'expandable' functionality and such
 * @requires jquery, intentcontext
 */
define([
  'jquery',
  'intentcontext'
], function ($, IntentContext) {
  'use strict';

  /**
   * Gets the element 
   */
  var Sidebar = function (elm) {
    this.$elm = $(elm);
    this.parentBlock = this.$elm.find('.block-menu-block');
    this.sidenav = this.parentBlock.find('.menu-block-wrapper');
    this.sidenav_firstTier = this.sidenav.find('ul.menu:first > li');
    this.sidenav_all_li = this.sidenav.find('ul.menu > li');
    this.curLayout = IntentContext.horizontal_axis.respond().axes.width.current;
    this.headerItem = this.parentBlock.find('h2:first');
    this.headerItem.each(function() {
      $(this).append('<button />');
    });
    this.navToggle = this.headerItem.find('button');
    this.checkForChildren();
    this.makeMobileMenu();
    this.bindListeners();
  };

  /**
   * Turn the Top Header for the Menu, into a menu item itself
   * it will trigger then, the rest of the menu
   */
  Sidebar.prototype.makeMobileMenu = function () {
    var
      that = this;
    that.navToggle.off('click').on('click', function() {
      that.sidenav.slideToggle('fast');
      $(this).toggleClass('open');
    });
  };


  /**
   * Check for children, add classes
   * also add a button for mobile functionality, so user can expand/collapse menu
   */
  Sidebar.prototype.checkForChildren = function () {
    // id item has 'expanded' class, add button, so as to use as button
    var that = this;
    this.sidenav_firstTier.each(function() {
      if ($(this).hasClass('expanded')) {
        if($(this).hasClass('is-active-trail')){
          if (that.curLayout !== 'mobile' || that.curLayout !== 'mobilelandscape') {
          $(this).prepend('<button class="open"></button>');
        }
        else{
          $(this).prepend('<button></button>');
        }
        }
        else{
          $(this).prepend('<button></button>');
        }
        
      }

    });

    /*
     * wrap a div around the internal part of the li, except for the child UL
     * for better styling
     */
    this.sidenav_all_li.each(function() {
      $(this).children().not('ul').wrapAll('<div />');
    });
  };


  /**
   * Add dropdown functionality
   */
  Sidebar.prototype.bindListeners = function () {
    var
      that = this;

    /*
     * all expandable/collapsible functionality to menu items
     */
    that.sidenav.find('button').off('click').on('click', function() {
      $(this).parents('li.expanded').find('ul.menu:eq(0)').slideToggle('fast');
      $(this).toggleClass('open');
    });
   
    /**
     * intended functinoality:
     * - when switching between layouts, we always just close whatever is open
     * - if though, the layout is tablet or bigger, than we auto expand whatever menu is currently active
     */
    IntentContext.intent.on('desktop', function () {
   
      that.curLayout = IntentContext.horizontal_axis.respond().axes.width.current;
      that.sidenav.show();
    });

    IntentContext.intent.on('tabletlandscape', function () {

      that.curLayout = IntentContext.horizontal_axis.respond().axes.width.current;
      that.sidenav.show();
    });

    IntentContext.intent.on('tablet', function () {
    
      that.curLayout = IntentContext.horizontal_axis.respond().axes.width.current;
      that.sidenav.show();
    });

    IntentContext.intent.on('mobilelandscape', function () {
      if (that.curLayout === 'tablet' || that.curLayout === 'tabletlandscape') {
      that.sidenav.hide();
      that.navToggle.removeClass('open');
      }
      that.curLayout = IntentContext.horizontal_axis.respond().axes.width.current;
      
    });

    IntentContext.intent.on('mobile', function () {
       if (that.curLayout === 'tablet' || that.curLayout === 'tabletlandscape') {
      that.sidenav.hide();
      that.navToggle.removeClass('open');
      }
      that.curLayout = IntentContext.horizontal_axis.respond().axes.width.current;
      
    });
  };


  /**
   * DOM Ready
   */
  $(function () {
    var sidebar = new Sidebar($('.sidebar'));
  });
});
