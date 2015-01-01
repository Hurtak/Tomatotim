var timer = (function() {
  'use strict';

  var intervalIndex = 0;
  var timerInterval = config.workInterval;

  var intervals = [];
  var timer;

  var init = function () {
    views.timer.setTime(secondsToTime(timerInterval));

    for (var i = 0; i < config.repeat; i++) {
      intervals.push(config.workInterval);
      if (i < config.repeat - 1) {
        intervals.push(config.breakInterval);
      }
    }
    intervals.push(config.bigBreakInterval);

  };

  var secondsToTime = function(seconds) {
    var addLeadingZero = function(number) {
      if (number < 10) {
        number = '0' + number;
      }

      return number;
    };

    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    return addLeadingZero(minutes) + ':' + addLeadingZero(seconds);
  };

  var timerTick = function () {
    timerInterval--;

    if (timerInterval <= 0) {
      nextInterval();
    }

    var time = secondsToTime(timerInterval);
    views.timer.setTime(time);
    views.title.setTitle(time);
  };

  var nextInterval = function() {
    intervalIndex++;
    if (intervalIndex > intervals.length - 1) {
      intervalIndex = 0;
      resetTimer();
    }

    timerInterval = intervals[intervalIndex];

    // countdown update
    var time = secondsToTime(timerInterval);
    views.timer.setTime(time);

    // favicon update
    if (intervals[intervalIndex] === config.workInterval) {
      views.favicon.setFavicon('work');
    } else if (intervals[intervalIndex] === config.breakInterval) {
      views.favicon.setFavicon('break');
    } else if (intervals[intervalIndex] === config.bigBreakInterval) {
      views.favicon.setFavicon('longbreak');
    }

    // progress description update
    if (intervalIndex > 0 && intervals[intervalIndex] === config.workInterval) {
      views.progress.setDescription('work');
    } else if (intervals[intervalIndex] === config.breakInterval) {
      views.progress.setDescription('break');
    } else if (intervals[intervalIndex] === config.bigBreakInterval) {
      views.progress.setDescription('long break');
    }

    // progress img update
    var imageIndex = Math.floor(intervalIndex / 2);

    if (intervalIndex > 0 && intervals[intervalIndex] === config.workInterval) {
      views.progress.setImageType('work', imageIndex);
      views.progress.setImageType('finished', imageIndex - 1);
    } else if (intervals[intervalIndex] === config.breakInterval) {
      views.progress.setImageType('break', imageIndex);
    } else if (intervals[intervalIndex] === config.bigBreakInterval) {
      views.progress.setImageType('bigbreak', imageIndex);
    }

  };

  var skipInterval = function () {
    nextInterval();
    if (timer) {
      pauseTimer();
      runTimer();
    }

    views.title.setTitle(secondsToTime(timerInterval));
  };

  var startTimer = function() {
    if (!timer) {
      runTimer();
    } else {
      pauseTimer();
    }

    views.title.setTitle(secondsToTime(timerInterval));
    views.timerControls.toogleStartButtonCaption();

    if (intervalIndex === 0) {
      views.progress.setImageType('work', 0);
      views.progress.setDescription('work');
    }
  };

  var runTimer = function () {
    timer = setInterval(timerTick, 1000);
  };

  var pauseTimer = function() {
    timer = clearInterval(timer);
  };

  var resetTimer = function() {
    pauseTimer();

    intervalIndex = 0;
    timerInterval = config.workInterval;

    var time = secondsToTime(timerInterval);

    views.timer.setTime(time);
    views.timerControls.resetStartButton();

    views.title.resetTitle();
    views.favicon.setFavicon('work');

    views.progress.resetProgress();
  };

  return {
    init: init,
    startTimer: startTimer,
    pauseTimer: pauseTimer,
    skipInterval: skipInterval,
    resetTimer: resetTimer
  };

}());
