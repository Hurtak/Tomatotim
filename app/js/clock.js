var clock = (function() {
  'use strict';

  var workInterval = 25;
  var breakInterval = 5;
  var bigBreakInterval = 20;

  var repeat = 4;

  var currentIntervalIndex = 0;
  var currentCountdown = workInterval;

  var intervals = [];
  var countdown;

  var startClock = function() {
    countdown = setInterval(countdownLogic, 1000);
  };

  var pauseClock = function() {
    clearInterval(countdown);
  };

  var resetClock = function() {
    // body...
  };

  var countdownLogic = function () {
    currentCountdown--;

    console.log(intervals);
    console.log(currentIntervalIndex + ' - ' + intervals[currentIntervalIndex]);
    console.log(currentCountdown);

    if (currentCountdown <= 0) {
      if (currentIntervalIndex === intervals.length - 1) {
        currentIntervalIndex = 0;
      }
      currentIntervalIndex++;
      currentCountdown = intervals[currentIntervalIndex];
    }
  };


  var init = function () {

    for (var i = 0; i < repeat; i++) {
      intervals.push(workInterval);
      if (i < repeat - 1) {
        intervals.push(breakInterval);
      }
    }
    intervals.push(bigBreakInterval);

    startClock();

  };


  return {
    init: init,
    startClock: startClock,
    pauseClock: pauseClock
  };

}());
