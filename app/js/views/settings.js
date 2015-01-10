views.settings = (function() {
  'use strict';

  var audio = document.getElementById('audio');
  var audioTest = document.getElementById('audio-test');
  var notifications = document.getElementById('notifications');
  var notificationsTest = document.getElementById('notifications-test');

  var workInterval = document.getElementById('work-interval');
  var breakInterval = document.getElementById('break-interval');
  var longbreakInterval = document.getElementById('longbreak-interval');

  var repeat = document.getElementById('repeat');

  var resetSettings = document.getElementById('reset-settings');

  return {
    audio: audio,
    audioTest: audioTest,
    notifications: notifications,
    notificationsTest: notificationsTest,
    workInterval: workInterval,
    breakInterval: breakInterval,
    longbreakInterval: longbreakInterval,
    repeat: repeat,
    resetSettings: resetSettings
  };

}());
