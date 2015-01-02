views.timerControls = (function() {
  'use strict';

  var startButtonState = true;

  var toogleStartButtonCaption = function() {
    var button = getStartButton();
    var caption = button.querySelector('span');
    var icon = button.querySelector('i');

    if (startButtonState) {
      caption.innerHTML = 'pause';
      icon.className = 'icon-pause-1';
    } else {
      caption.innerHTML = 'start';
      icon.className = 'icon-play-1';
    }

    startButtonState = !startButtonState;
  };

  var resetStartButton = function () {
    if (!startButtonState) {
      toogleStartButtonCaption();
    }
  };

  var getStartButton = function () {
    return document.getElementById('start');
  };

  var getResetButton = function () {
    return document.getElementById('reset');
  };

  var getSkipButton = function () {
    return document.getElementById('skip');
  };

  return {
    getStartButton: getStartButton,
    getResetButton: getResetButton,
    getSkipButton: getSkipButton,
    resetStartButton: resetStartButton,
    toogleStartButtonCaption: toogleStartButtonCaption
  };

}());
