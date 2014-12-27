views.timerControls = (function() {
  'use strict';

  var getStartButton = function () {
    return document.getElementById('start');
  };

  var getPauseButton = function () {
    return document.getElementById('pause');
  };

  var getResetButton = function () {
    return document.getElementById('reset');
  };

  var getSkipButton = function () {
    return document.getElementById('skip');
  };

  return {
    getStartButton: getStartButton,
    getPauseButton: getPauseButton,
    getResetButton: getResetButton,
    getSkipButton: getSkipButton
  };

}());
