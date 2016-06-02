var __getrev = function () {
  'use strict';
  var rev = document.getElementById('requirejs').getAttribute('data-rev');
  return rev || (new Date()).getTime();
};

// Optimizer builds outside of a browser context, so document doesn't exist.
// https://github.com/jrburke/r.js/issues/270#issuecomment-13112859
requirejs.config({
  paths: {
    'jquery': 'vendor/jquery-global',
    'jquery-ui': 'vendor/jquery-ui.min',
    'jquery-touch-punch': 'vendor/jquery.ui.touch-punch.min',
    'jquery-cookie': '../bower_modules/jquery.cookie/jquery.cookie',
    'jquery.fancybox': 'vendor/jquery.fancybox',
    'viewportsize': 'vendor/viewportSize-min',
    'modernizr': 'vendor/modernizr.custom',
    'intention': '../bower_modules/intentionjs/intention',
    'underscore': '../bower_modules/underscore/underscore-min',
    'jquery.uniform': '../bower_modules/jquery.uniform/jquery.uniform',
    'footer': 'modules/footer',
    'header': 'modules/header',
    'sidebar': 'modules/sidebar',
    'intentcontext': 'modules/intentcontext',
    'nwtel-location': 'modules/nwtel-location',
    'slick': 'vendor/slick-min',
    'heroslider': 'modules/heroslider',
    'accordion-block': 'modules/accordion-block',
    'jquery-scrolllock': 'vendor/jquery.scrollLock',
    'usage-estimator': 'modules/usage-estimator',
    'usage-report': 'modules/usage-report',
    'tooltip': 'modules/tooltip',
    'bundles-and-promos': 'modules/bundles-and-promos',
    'content-slider': 'modules/content-slider',
    'equal-height': 'modules/package-equal-height-block',
    'directory-art': 'modules/directory-art',
    'google-site-search': 'modules/google-site-search',
    'plans-rates': 'modules/plans-rates',
    'marketing-silder': 'modules/marketingslider'

  },

  shim: {
    'slick': ['jquery'],
    'jquery.uniform': ['jquery'],
    'jquery-scrolllock': ['jquery'],
    'jquery.fancybox': ['jquery'],
    'jquery-touch-punch': ['jquery','jquery-ui'],
    'usage-estimator' : ['jquery-touch-punch'],
    'modernizr': {
      exports: 'Modernizr'
    }
  },

  map: {
    '*': {
      'css': '../bower_modules/require-css/css.js'
    }
  }
});

requirejs.config({
  urlArgs: 'rev=' + __getrev()
});

// Common module
require([
  'jquery',
  'viewportsize',
  'modernizr',
  'intentcontext',
  'jquery.uniform',
  'jquery.fancybox',
  'jquery-scrolllock'
  ], function ($, viewportsize, Modernizr, IntentContext) {
  'use strict';

  // DOM ready
  $(function() {
    // init the DOM elements with intentionJS
    IntentContext.intent.elements(document);

    if ($('header').length > 0) {
      require(['header']);
    }
    if ($('footer').length > 0) {
      require(['footer']);
    }

    if($('.google-search-results').length > 0) {
      require(['google-site-search']);
    }

    // load 'location' module only if drupal module is enabled
    if ($('#nwtel-location-selector').length > 0) {
      require(['nwtel-location']);
    }
    require(['slick','marketing-silder']);

    if ($('body').hasClass('front')) {
      require(['slick','heroslider']);
    }

    // load sidebar module, if page has 'sidebar' class
    if ($('aside').hasClass('sidebar')) {
      require(['sidebar']);
    }

    // load accordion-block module, if page has 'accordion-section' class
    if ($('.accordion-section').length > 0) {
      require(['accordion-block']);
    }
    // load 'uniform' if a form is on the page
    if ($('form').length > 0) {
      // require(['jquery.uniform']);
      $('form select').uniform({
        selectClass: 'form-select-container',
        selectAutoWidth: false
      });
      $('form input[type="checkbox"]').uniform({
        checkboxClass: 'form-checkbox',
        checkedClass: 'icon-check'
      });
      $('form input[type="radio"]').uniform({
        checkboxClass: 'form-radio',
        checkedClass: 'icon-radio checked'
      });
      require(['jquery-ui', 'tooltip']);

    }

    // load usage-report module, if page has 'accordion' class
    if ($('div').hasClass('usage-report--internetTypeSelect')) {
      require(['usage-report']);
    }

    // load jQuery ui and the usage estimator module only on usage estimator page
    if ($('.block').hasClass('block-nwtel-usage-estimate')) {
      require(['jquery-ui', 'jquery-touch-punch', 'usage-estimator']);
    }

    // load bundles and promos if bundles and promo block exists
    if ($('.block').hasClass('nwtel_bundles_and_promos')) {
      require(['bundles-and-promos']);
    }

    // make product landing cta blocks clickable
    $('.view-subpage-list .views-row').on('click', function() {
      window.location = $(this).find('a').attr('href');
      return false;
    });

    if($('.block-slider').length > 0){
      require(['slick','content-slider']);
    }
    if($('.packages-container').length > 0){
      require(['equal-height']);
    }

    if($('.fancybox , .modals').length > 0) {
      require(['jquery.fancybox']);
      $('.fancybox').fancybox({
        afterLoad : function() {
           this.title = $('.artwork-details-fancybox').eq(this.index).html();
        },
        helpers : {
          title: {
            type: 'inside'
          },
        },
        beforeLoad : function() {this.width  = parseInt(this.element.data('fancybox-width')); this.height = parseInt(this.element.data('fancybox-height'));
        },
        nextEffect: 'fade',
        prevEffect: 'fade'
      });
      $('.modals').fancybox({
        closeBtn: true,
      wrapCSS : 'modal-wrap',
      padding     : [30, 10, 10, 10],
      helpers : {
          title: {
            type: 'inside',
            position: 'top'
          },
        },
        afterLoad: function(){
    var $button = $('<div class="ModalCloseButton_container"><button  class="ModalCloseButton" type="button">Close</button></div>');
    
     $button.appendTo( '.fancybox-skin' );
      

     $button.on('click',function (e){
      $.fancybox.close();
     });
    
},
        beforeClose: function(){
    $('.ModalCloseButton').remove();    
},
        beforeLoad: function() {
            this.title = $(this.element).attr('caption');
            var modalWidth = this.element.data('modals-width'),
            modalHeight =  this.element.data('modals-height');
            if(modalWidth !== undefined){
              this.width  = parseInt(modalWidth);
            }
            else{
              this.width = '90%';
            }
             if(modalHeight !== undefined){
              this.height = parseInt(modalHeight);
             }
             else{
              this.height = '95%';
             }
            
        }
        
      });

    }

    if($('.directory-art-gallery').length > 0) {
      require(['directory-art']);
    }
    if($('.nwt-phone--hardware').length > 0){
      require(['phone-sets']);
    }
    /* that is reponsive wrapper for youtube video  */
    if($('iframe').length > 0){
      $('iframe').each(function (e){
        if($(this).attr('src').search('youtube')>0){
        if(!$(this).parent().hasClass('video_wrapper')){
        $(this).wrap( '<div class="video_wrapper"></div>' );
      }
      
    }
      });
    }
    $('a').each(function() {
       var a = new RegExp('/' + window.location.host + '/');
       var domains = ['nwtel.dev.', 'nwtel.fcvhost.com', 'nwtel.ca'];
       if (!a.test(this.href) && !domains.indexOf(this.href)) {
          $(this).attr("target","_blank");
       }
    });
    if($('.internet_packages').length > 0){
      require(['plans-rates']);
    }
    // Force PDF Files to open in new window
    $('a[href$=".pdf"]').attr('target', '_blank');
  });
});
