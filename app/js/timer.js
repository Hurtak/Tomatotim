var timer = (function() {
  'use strict';

  var intervalIndex = 0;
  var timerInterval = config.workInterval;

  var intervals = [];
  var timer;

  var _timerTick = function () {
    timerInterval--;

    if (config.debug) {
      console.log(intervals);
      console.log(intervalIndex + ' - ' + intervals[intervalIndex]);
      console.log(timerInterval);
    }

    if (timerInterval <= 0) {
      if (intervalIndex === intervals.length - 1) {
        intervalIndex = 0;
      }
      intervalIndex++;
      timerInterval = intervals[intervalIndex];
    }
  };

  var startTimer = function() {
    timer = setInterval(_timerTick, 1000);
  };

  var pauseTimer = function() {
    clearInterval(timer);
  };

  var resetTimer = function() {
    pauseTimer();

    intervalIndex = 0;
    timerInterval = config.workInterval;
  };

  var init = function () {
    for (var i = 0; i < config.repeat; i++) {
      intervals.push(config.workInterval);
      if (i < config.repeat - 1) {
        intervals.push(config.breakInterval);
      }
    }
    intervals.push(config.bigBreakInterval);

    startTimer();

  };

  return {
    init: init,
    startTimer: startTimer,
    resetTimer: resetTimer,
    pauseTimer: pauseTimer
  };

}());
