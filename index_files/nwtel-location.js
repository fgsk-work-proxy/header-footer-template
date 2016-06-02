/**
 * Location Module
 * Controls the location cookie and dropdown / popup functionality on the interface
 * @requires jquery, jquery.cookie
 */
define([
  'jquery',
  'intentcontext',
  'jquery-cookie'
], function ($, IntentContext) {
  'use strict';

  /**
   * object constructor
   */
  var NWTLocation = function(cName, cExp) {
    this.cookieName = cName;
    this.cookieValue = '';
    this.cookieExp = cExp;
    this.cookiePath = '/';
    this.init();
  };

  /**
   * get the location from the cookie
   */
  NWTLocation.prototype.getCookie = function() {
    return $.cookie(this.cookieName);
  };


  /**
   * set the location, and call setCookie to set the cookie to it
   */
  NWTLocation.prototype.setLocation = function() {
    var
      d,
      expires;

    d = new Date();
    d.setTime(d.getTime() + (this.cookieExp * 24 * 60 * 60 * 1000));
    expires = 'expires=' + d.toUTCString();

    $.get('/nwtel/location/set/' + this.cookieValue, function(data){
      if (data.success) {
        $('.provinces').val(0);//reset dropdown box for firefox
        $('.cities').val('');//reset dropdown box for firefox
        location.reload();
      }
    });
  };
/**
   * set the location, and call setCookie to set the cookie to it
   */
  NWTLocation.prototype.setCookie = function() {
    var
      d,
      expires;

    d = new Date();
    d.setTime(d.getTime() + (this.cookieExp * 24 * 60 * 60 * 1000));
    expires = 'expires=' + d.toUTCString();
    $.get('/nwtel/location/set/' + this.cookieValue, function(data){
    });
  };

  /**
   * get the location from the cookie
   * In Drupal we set the following Drupal.settings.nwtel_location
   * This is basically Object {id: "194", name: "Behchoko-Rae"}
   * If PHP can't find a cookie, or cookie == null, i will set this to default to Whitehorse.
   DEPRECATED
  NWTLocation.prototype.getLocation = function() {
    var
      locationID = this.getCookie(),
      cityName = '';

    if (!locationID) {
      this.cookieValue = Drupal.settings.nwtel_location.id;
      // this.setLocation(this.cookieName , this.cookieValue, this.cookieExp);
    }

    cityName = Drupal.settings.nwtel_location.name;
    return cityName;
  };
*/
  NWTLocation.prototype.displayLocation = function() {
    $.get('/nwtel/location/get', function(data){
      $('.current-location').html(data.name);
      $('.header__right__top--location').fadeTo(0,1);
      if(data.region === 'Nunavut' || $('.i18n-iu').length>0) {
        $('.header__right__top--language').css('display','inline-block');
      }
    });
  };

  /**
   *
   */
  NWTLocation.prototype.init = function() {
    var
      that = this,
      $curlocation = $('.current-location , .location_selector'),
      $nwtellocation = $('#nwtel-location-selector'),
      $selectcity = $('.select-city'),
      $selectcityinit =$('.select-city-init'),
      $locationbg = $('.nwtel_location_background'),
      checkcookie = that.getCookie();
     
      $nwtellocation.appendTo( $locationbg );
      //$nwtellocation.wrap('<div class="nwtel_location_background"></div>');

    // set the location text into the current location container.
    //$curlocation.html(this.getLocation());
    that.displayLocation();

    // If you click this, launch the popup.
    $curlocation.on('click', function (e) {
      e.preventDefault();
      $locationbg.show();
      $nwtellocation.show();

    });

    //Hide selectors by default.
    $selectcity.hide();

    $locationbg.hide();
    $('body').on('click touchstart', '.nwtel_location_background', function (e){
      if($(e.target).closest('#nwtel-location-selector').length === 0){
      
        if(checkcookie == undefined){
         that.cookieValue = $('.cities option:contains(Whitehorse)').val();
         that.setCookie();
        }
      $(this).hide();

    }
    });
    // when clicking this, show the citieis related to this proving/region.
    $('.provinces').change(function(e){
      e.preventDefault();
      var pid = $(this).val();
      if (pid === '0' ){
        $selectcityinit.show();
        $selectcity.hide();
      }else{
        $selectcityinit.hide();
        $selectcity.hide();
        $('#province-' + pid).show();
      }

    });

    // And when clicking the city, set the location.
    $('.cities').on('change', function (e) {
      that.cookieValue = $(this).val();
    });

$('.nwtel_location_selector--button').on('click', function (e){
  e.preventDefault();
  that.setLocation();
      

});
 if(checkcookie == undefined){
       $locationbg.show();
      $nwtellocation.show();
    }

 };
  /**
   * DOM Ready
   */
  $(function () {
    var nwtLocation = new NWTLocation('Drupal.visitor.location', 7);

  });
});
