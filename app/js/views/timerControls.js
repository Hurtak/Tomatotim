views.timerControls = (function() {
  'use strict';

  var getStartButton = function () {
    return document.getElementById('start');
  };

  var toogleStartButtonCaption = function() {
    var button = getStartButton();

    if (button.innerHTML === 'start') {
      button.innerHTML = 'pause';
    } else {
      button.innerHTML = 'start';
    }
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
    toogleStartButtonCaption: toogleStartButtonCaption
  };

}());
