var config = (function() {
  'use strict';

  var debug = false;

  var workInterval = 25 * 60; // seconds
  var breakInterval = 5 * 60;
  var longbreakInterval = 20 * 60;

  var repeat = 4;

  var appName = document.title;

  if (debug) {
    workInterval = 25;
    breakInterval = 5;
    longbreakInterval = 5;
  }

  return {
    debug: debug,
    workInterval: workInterval,
    breakInterval: breakInterval,
    longbreakInterval: longbreakInterval,
    repeat: repeat,
    appName: appName
  };

}());

var services = {};
var views = {};
