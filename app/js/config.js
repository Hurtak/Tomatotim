var config = (function() {
  'use strict';

  var debug = false;
  if (window.location.search.indexOf('debug') > -1) {
    // '?debug' at the end of URL activates debug mode
    debug = true;
  }

  var appName = document.title;

  var audioNotifications = false;
  var webNotifications = false;

  var workInterval = 25 * 60; // seconds
  var breakInterval = 5 * 60;
  var longbreakInterval = 20 * 60;

  var repeat = 4;

  if (debug) {
    audioNotifications = true;
    webNotifications = true;

    workInterval = 10;
    breakInterval = 5;
    longbreakInterval = 5;

    repeat = 3;

    appName = 'DEBUG';
  }

  return {
    debug: debug,
    appName: appName,
    audioNotifications: audioNotifications,
    webNotifications: webNotifications,
    workInterval: workInterval,
    breakInterval: breakInterval,
    longbreakInterval: longbreakInterval,
    repeat: repeat
  };

}());

var services = {};
var views = {};
