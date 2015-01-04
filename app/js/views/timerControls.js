views.timerControls = (function() {
  'use strict';

  var startButtonState = true; // true == start state, false == pause state

  var startButton = document.getElementById('start');
  var resetButton = document.getElementById('reset');
  var skipButton = document.getElementById('skip');

  var startButtonIcon = document.getElementById('start-icon');
  var startButtonCaption = document.getElementById('start-caption');

  var toogleStartButtonCaption = function() {
    if (startButtonState) {
      startButtonCaption.innerHTML = 'pause';
      startButtonIcon.className = 'icon-pause-1';
    } else {
      startButtonCaption.innerHTML = 'start';
      startButtonIcon.className = 'icon-play-1';
    }

    startButtonState = !startButtonState;
  };

  var resetStartButton = function () {
    if (!startButtonState) {
      toogleStartButtonCaption();
    }
  };

  var getStartButton = function () {
    return startButton;
  };

  var getResetButton = function () {
    return resetButton;
  };

  var getSkipButton = function () {
    return skipButton;
  };

  return {
    getStartButton: getStartButton,
    getResetButton: getResetButton,
    getSkipButton: getSkipButton,
    resetStartButton: resetStartButton,
    toogleStartButtonCaption: toogleStartButtonCaption
  };

}());
