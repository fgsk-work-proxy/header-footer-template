/**
 * heroslider Module
 * @requires jquery
 */
define([
  'jquery',
  'slick'
], function ($) {
  'use strict';


 
  /**
   * DOM Ready
   */
 $(function () {

  var $image = $('.marketing__carousel--container .marketing-carousel'),
  $mirrorimage,
  $container = $('.marketing__carousel--container') ,
  $contentcontainer = $('.marketing__content--container'),
  //containerheight = $container.height(),
  conainerwidth = $container.width();
  var rotate = $container.data('rotate');
  var rotate_speed = $container.data('rotate-speed');
  var rotate_transition_speed = $container.data('rotate-transition-speed');
  if(rotate == undefined)
  {
    rotate = 0;
  }

  if(rotate_speed == undefined)
  {
    rotate_speed = 2000;
  }

  if(rotate_transition_speed == undefined)
  {
    rotate_transition_speed = 800;
  }
  
if($image.length>1){

 $('.marketing__carousel--container').slick({
  autoplay: !!rotate,
  autoplaySpeed: rotate_speed,
  dots: true,
  infinite: true,
  speed: rotate_transition_speed,
  slidesToShow: 1,
  adaptiveHeight: true,
  variableWidth: true,
  centerMode: true,
  mobileFirst: true,
  prevArrow: '<div class="site__hero__media__arrow__nav--container"><button type="button" class="slick-prev">Previous</button></div>',
  nextArrow: '<div class="site__hero__media__arrow__nav--container"><button type="button" class="slick-next">Next</button></div>'
      });

  $( '.slick-dots' ).wrap( '<div class="site__hero__media__dots__nav--container"></div>');
$container.css('height','auto');

}else if ($image.length == 1){
  $mirrorimage = $('.marketing__carousel--container .marketing-carousel').clone();
  $image.after($mirrorimage);
$('.marketing__carousel--container').slick({
  dots: false,
  infinite: true,
  speed: 300,
  draggable: false,
  swipe: false,
  slidesToShow: 1,
  adaptiveHeight: true,
  variableWidth: true,
  centerMode: true,
  prevArrow: '',
  nextArrow: ''
      });

 
}
$container.css('height','auto');
//$contentcontainer.height(containerheight);
$contentcontainer.width(conainerwidth);
$(window).resize(function(){
//$contentcontainer.height($container.height());
$contentcontainer.width($container.width());
});

 });

});
