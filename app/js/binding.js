var binding = (function() {
  'use strict';

  var init = function () {

    views.timerControls.getStartButton().addEventListener('click', timer.startTimer);
    views.timerControls.getSkipButton().addEventListener('click', timer.nextInterval);
    views.timerControls.getResetButton().addEventListener('click', timer.resetTimer);

  };

  return {
    init: init
  };

}());
