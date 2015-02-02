Views.Settings = (function() {
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

  var getNumberInputs = function() {
    return document.querySelectorAll('.settings input[type=number]');
  };

  var getPlusMinusButtons = function() {
    return document.querySelectorAll('.settings [data-increment]');
  };

  return {
    audio: audio,
    audioTest: audioTest,
    notifications: notifications,
    notificationsTest: notificationsTest,
    workInterval: workInterval,
    breakInterval: breakInterval,
    longbreakInterval: longbreakInterval,
    repeat: repeat,
    resetSettings: resetSettings,
    getNumberInputs: getNumberInputs,
    getPlusMinusButtons: getPlusMinusButtons
  };

}());
