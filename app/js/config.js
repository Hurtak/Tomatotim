var config = (function() {
  'use strict';

  var debug = true;

  var workInterval = 25 * 60 * 60;
  var breakInterval = 5 * 60 * 60;
  var bigBreakInterval = 20 * 60 * 60;

  var repeat = 4;

  if (debug) {
    workInterval = 25;
    breakInterval = 5;
    bigBreakInterval = 20;
  }

  return {
    workInterval: workInterval,
    breakInterval: breakInterval,
    bigBreakInterval: bigBreakInterval,
    repeat: repeat,

    debug: debug
  };

}());
