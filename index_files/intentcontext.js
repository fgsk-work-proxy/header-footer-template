/**
 * Footer Module
 * Controls the 'expandable' functionality and such
 * @requires jquery
 */
define([
  'jquery',
  'intention',
  'viewportsize'
], function ($, Intention, viewportsize) {
  'use strict';

  var
    IntentContext = window.IntentContext ? window.IntentContext : window.IntentContext = {};

  IntentContext.intent = new Intention();

  // Breakpoints
  IntentContext.bp_desktop = 1026;
  IntentContext.bp_tabletlandscape = 864;
  IntentContext.bp_tablet = 670;
  IntentContext.bp_mobilelandscape = 480;
  IntentContext.bp_mobile = 0;

  // setup breakpoints for intentionJS
  IntentContext.horizontal_axis = IntentContext.intent.responsive({
    ID: 'width',
    contexts: [{
      name: 'desktop',
      min: IntentContext.bp_desktop
    }, {
      name: 'tabletlandscape',
      min: IntentContext.bp_tabletlandscape
    }, {
      name: 'tablet',
      min: IntentContext.bp_tablet
    }, {
      name: 'mobilelandscape',
      min: IntentContext.bp_mobilelandscape
    }, {
      name: 'mobile',
      min: IntentContext.bp_mobile
    }],
    matcher: function (measure, context) {
      return measure >= context.min;
    },
    measure: function () {
      IntentContext.v_width = viewportSize.getWidth();
      return IntentContext.v_width;
    }
  });

  IntentContext.horizontal_axis.respond();
  $(window).on('resize', IntentContext.horizontal_axis.respond);

  return IntentContext;
});
