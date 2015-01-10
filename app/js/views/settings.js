views.settings = (function() {
  'use strict';

  var audioNotifications = document.getElementById('audio-notifications');
  var webNotifications = document.getElementById('web-notifications');

  var workInterval = document.getElementById('work-interval');
  var breakInterval = document.getElementById('break-interval');
  var longbreakInterval = document.getElementById('longbreak-interval');

  var repeat = document.getElementById('repeat');

  var resetSettings = document.getElementById('reset-settings');

  return {
    audioNotifications: audioNotifications,
    webNotifications: webNotifications,
    workInterval: workInterval,
    breakInterval: breakInterval,
    longbreakInterval: longbreakInterval,
    repeat: repeat,
    resetSettings: resetSettings
  };

}());
