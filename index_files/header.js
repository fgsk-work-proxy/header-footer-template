/**
 * Header Module
 * Controls the 'expandable' functionality and such
 * @requires jquery, intentcontext
 */
define([
  'jquery',
  'intentcontext',
  'jquery-scrolllock'
], function ($, IntentContext) {
  'use strict';

  /**
   * Gets the element 
   */
  var Header = function (elm) {

    this.$elm = $(elm);
    this.parentBlock = '';
    this.headernav = '';
    this.headernav_firstTier = '';
    this.headernav_all_li = '';
    this.curLayout = IntentContext.horizontal_axis.respond().axes.width.current;
    this.menuwrap = '';
    this.menucontainer = '';
    this.firstlevelmenu = '';
    this.firstlevelmenubusiness = '';
    this.firstlevelmenulink = $('.region-navigation li.menu__item.expanded > a');
    this.firstlevelmenulinkbusiness = $('li.menu__item.expanded_special > a');
    this.setup_mobile_nav = false;
    this.init_tablet = false;
    this.checkForChildren();
    this.bindContexts();
    this.hoverstage();
    this.linkclick();
    this.linkclickbusiness();
    $('.header__right__bottom--search').off('click').on('click', function (e) {
      if($(e.target).hasClass('header__right__bottom--search')) {
        $('.region-header-search').slideToggle('fast');
        $(this).toggleClass('active');
      }
    });

  };
Header.prototype.linkclick = function () {
    
if ('ontouchstart' in document.documentElement){
  if (this.curLayout === 'tablet' || this.curLayout === 'tabletlandscape' || this.init_tablet) {

        this.firstlevelmenulink.off('click').on('click', function (e){
          e.preventDefault();
       if($(this).closest('li').find('.menu').hasClass('ready')){
        window.location.href = $(this).attr('href');
      }
      
      if($(this).closest('li').find('.menu').hasClass('hover')){
       
        $(this).closest('li').find('.menu').addClass('ready');
      }
    });
 }
 this.init_tablet = true;
}
};
Header.prototype.removemobilemenu = function(){
   var
      that = this,
      $headerNav = $('.header__mobile');
      $headerNav.removeClass('appear');
      $.scrollLock( false );
}
Header.prototype.mobilemenuheight = function() {
  var
      that = this,
      $headerNav = $('.header__mobile'),
      $mobileactive = $('#mobileactive'),
      menuheight = 0;
      menuheight = Math.round($(window).height()*0.85-70);
      $headerNav.height(menuheight);
      $mobileactive.appendTo( $headerNav ); 
};
Header.prototype.linkclickbusiness = function () {
    
if ('ontouchstart' in document.documentElement){
  if (this.curLayout !== 'desktop') {

        this.firstlevelmenulinkbusiness.off('click').on('click', function (e){
          e.preventDefault();
       if($(this).closest('li').find('.menu').hasClass('ready')){
        window.location.href = $(this).attr('href');
      }
      
      if($(this).closest('li').find('.menu').hasClass('hover')){
       
        $(this).closest('li').find('.menu').addClass('ready');
      }
    });
 }
 }
};
Header.prototype.offlinkclick = function (){
  this.firstlevelmenulink.off('click');
  this.init_tablet = true;
};
Header.prototype.offlinkclickbusiness = function (){
  this.firstlevelmenulinkbusiness.off('click');
};
Header.prototype.hoverstage = function () {
    this.firstlevelmenu = $('li.menu__item.expanded');
    this.firstlevelmenubusiness = $('li.menu__item.expanded_special');

   
    this.firstlevelmenu.on('mouseenter', function (e){
      $(this).find('ul').addClass('hover');

    });
    this.firstlevelmenu.on('mouseleave', function (e){
      $(this).find('ul').removeClass('hover ready');

    });
    this.firstlevelmenubusiness.on('mouseenter', function (e){
      $(this).find('ul').addClass('hover');

    });
    this.firstlevelmenubusiness.on('mouseleave', function (e){
      $(this).find('ul').removeClass('hover ready');

    });
};


  /**
   * Check for children, add classes
   */
  Header.prototype.checkForChildren = function () {

    if (this.curLayout === 'mobile' || this.curLayout === 'mobilelandscape') {
      if (this.setup_mobile_nav === false) {

        //this.parentBlock = this.$elm.find('.header__mobile').find('.header__right__bottom--primary-nav');
        this.parentBlock = $('.header__mobile').find('.header__right__bottom--primary-nav');
        this.headernav = this.parentBlock.find('.menu-block-wrapper');
        this.headernav_firstTier = this.headernav.find('ul.menu > li');
        this.headernav_all_li = this.headernav.find('ul.menu > li');

        // id item has 'expanded' class, add button, so as to use as button
        this.headernav_firstTier.each(function() {
          if ($(this).hasClass('expanded')) {
            $(this).prepend('<button></button>');
          }
        });

        /*
         * wrap a div around the internal part of the li, except for the child UL
         * for better styling
         */
        this.headernav_all_li.each(function() {
          $(this).children().not('ul').wrapAll('<div />');
        });

        this.bindListeners();
        this.setup_mobile_nav = true;
      }
    }
  };


  /**
   * Add dropdown functionality
   */
  Header.prototype.bindListeners = function () {
    var
      that = this,
      headerNav = $('.header__mobile');

    // main menu drop down button
    //console.log('mobile button');
    $('.menu-mobile-btn').off('click').on('click', function (e) {
      //console.log('btn fire');
      if(headerNav.hasClass('appear')){
        $.scrollLock( false );
      }else{
         $.scrollLock( true );
         that.mobilemenuheight();
      }

     
    headerNav.toggleClass('appear');

    });

    /*
     * all expandable/collapsible functionality to menu items
     */
    that.headernav.find('button').off('click').on('click', function() {
      $(this).parents('li.expanded').find('ul.menu').slideToggle('fast');
      $(this).toggleClass('open');
    });
  };


  /**
   * Context behaviors for layout switching
   */
  Header.prototype.bindContexts = function () {
    var
      that = this,
      headerNav = $('.header__mobile');

    IntentContext.intent.on('desktop', function () {
      that.offlinkclick();
      that.offlinkclickbusiness();
      if (that.curLayout === 'mobile' || that.curLayout === 'mobilelandscape') {
        that.removeStyles();
         $.scrollLock( false );
      }
      that.curLayout = IntentContext.horizontal_axis.respond().axes.width.current;
    });

    IntentContext.intent.on('tabletlandscape', function () {
      that.linkclick();
      that.linkclickbusiness();
      if (that.curLayout === 'mobile' || that.curLayout === 'mobilelandscape') {
        that.removeStyles();
         $.scrollLock( false );
      }
      that.curLayout = IntentContext.horizontal_axis.respond().axes.width.current;
    });

    IntentContext.intent.on('tablet', function () {
      that.linkclick();
      that.linkclickbusiness();
      if (that.curLayout === 'mobile' || that.curLayout === 'mobilelandscape') {
        that.removeStyles();
         $.scrollLock( false );
      }
      that.curLayout = IntentContext.horizontal_axis.respond().axes.width.current;
    });

    IntentContext.intent.on('mobilelandscape', function () {
      that.removemobilemenu();
      that.offlinkclick();
      that.linkclickbusiness();
      if(headerNav.hasClass('appear')){
        $(window).scrollTop(0);
        $.scrollLock( true );
      }
      that.curLayout = IntentContext.horizontal_axis.respond().axes.width.current;
      if (that.setup_mobile_nav === false) {
        that.checkForChildren();
      }
      
    });

    IntentContext.intent.on('mobile', function () {
      that.removemobilemenu();
      that.offlinkclick();
      that.linkclickbusiness();
       if(headerNav.hasClass('appear')){
        $(window).scrollTop(0);
        $.scrollLock( true );
      }
      that.curLayout = IntentContext.horizontal_axis.respond().axes.width.current;
      if (that.setup_mobile_nav === false) {
        that.checkForChildren();
      }
      
    });
  };


  /**
   * remove any left over styles from mobile activity
   */
  Header.prototype.removeStyles = function () {
    var
      that = this;

      that.headernav.find('ul.menu').attr('style', '');
      that.headernav.find('button').removeClass('open');
  };

  /**
   * DOM Ready
   */
  $(function () {
    var header ,
    $menuwrap = $('.header__right__top--per-biz'),
    switchitem1 ='',
    switchitem2 ='',
    $menucontainer = $('.header__right__top--per-biz .leaf.first').addClass('expanded_special');
    
    if($('body').hasClass('section-medium-large-business')){
      switchitem1 = $menuwrap.find('.leaf:eq(0)').html();
      switchitem2 = $menuwrap.find('.leaf:eq(2)').html();
      $menuwrap.find('.leaf:eq(0)').html(switchitem2);
      $menuwrap.find('.leaf:eq(2)').html(switchitem1);
      
    }else if ($('body').hasClass('section-small-business')){
      switchitem1 = $menuwrap.find('.leaf:eq(0)').html();
      switchitem2 = $menuwrap.find('.leaf:eq(1)').html();
      $menuwrap.find('.leaf:eq(0)').html(switchitem2);
      $menuwrap.find('.leaf:eq(1)').html(switchitem1);
    }
    $menuwrap.find('.leaf:eq(1)').appendTo($menucontainer);
    $menuwrap.find('.leaf:eq(2)').appendTo($menucontainer);
    $menucontainer.find('.leaf').wrapAll('<ul class="menu"></ul>');
    $menuwrap.fadeTo(0,1);
    header= new Header($('header'));
  });
});
