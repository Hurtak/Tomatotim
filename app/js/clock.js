var clock = (function() {
  'use strict';

  var workInterval = 25;
  var breakInterval = 5;
  var bigBreakInterval = 20;

  var repeat = 4;

  var startClock = function() {
    setInterval(function () {

      views.clock.setTime((Math.floor(Math.random() * (60 - 0 + 1)) + 0));
    }, 1000);
  };

  var _pauseClock = function() {
    // body...
  };

  var _resetClock = function() {
    // body...
  };



  return {
    startClock: startClock
  };

}());
