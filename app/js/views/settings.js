Views.Settings = (function() {
  'use strict';

  var audio = document.getElementById('audio');
  var audioTest = document.getElementById('audio-test');
  var notifications = document.getElementById('notifications');
  var notificationsTest = document.getElementById('notifications-test');
  var taskbarFlash = document.getElementById('taskbar-flash');
  var taskbarFlashTest = document.getElementById('taskbar-flash-test');

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

  var hide = function(that) {
    that.parentNode.parentNode.style.display = 'none';
  };

  return {
    audio: audio,
    audioTest: audioTest,
    notifications: notifications,
    notificationsTest: notificationsTest,
    taskbarFlash: taskbarFlash,
    taskbarFlashTest: taskbarFlashTest,
    workInterval: workInterval,
    breakInterval: breakInterval,
    longbreakInterval: longbreakInterval,
    repeat: repeat,
    resetSettings: resetSettings,
    getNumberInputs: getNumberInputs,
    getPlusMinusButtons: getPlusMinusButtons,
    hide: hide
  };

}());
