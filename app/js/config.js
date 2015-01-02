var config = (function() {
  'use strict';

  var debug = true;

  var workInterval = 25 * 60 * 60;
  var breakInterval = 5 * 60 * 60;
  var longbreakInterval = 20 * 60 * 60;

  var repeat = 4;

  if (debug) {
    workInterval = 25;
    breakInterval = 5;
    longbreakInterval = 5;
  }

  return {
    workInterval: workInterval,
    breakInterval: breakInterval,
    longbreakInterval: longbreakInterval,
    repeat: repeat,

    debug: debug
  };

}());
