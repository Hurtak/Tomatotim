var Config = (function() {
  'use strict';

  var debug = false;
  if (window.location.search.indexOf('debug') > -1) {
    // '?debug' at the end of URL activates debug mode
    debug = true;
  }

  var appName = document.title;

  var audio = false;
  var notifications = false;

  var workInterval = 25 * 60; // seconds
  var breakInterval = 5 * 60;
  var longbreakInterval = 20 * 60;

  var repeat = 4;

  if (debug) {
    audio = true;
    notifications = true;

    workInterval = 10;
    breakInterval = 5;
    longbreakInterval = 5;

    repeat = 3;

    appName = 'DEBUG';
  }

  return {
    debug: debug,
    appName: appName,
    audio: audio,
    notifications: notifications,
    workInterval: workInterval,
    breakInterval: breakInterval,
    longbreakInterval: longbreakInterval,
    repeat: repeat
  };

}());

var Services = {};
var Views = {};
