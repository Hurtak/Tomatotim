var binding = (function() {
  'use strict';

  var init = function () {

    views.timerControls.getStartButton().addEventListener('click', timer.startTimer);
    views.timerControls.getPauseButton().addEventListener('click', timer.pauseTimer);
    views.timerControls.getSkipButton().addEventListener('click', function () {
      alert('todo');
    });
    views.timerControls.getResetButton().addEventListener('click', timer.resetTimer);

  };

  return {
    init: init
  };

}());
