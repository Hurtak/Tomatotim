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
    intervals.push(config.longbreakInterval);

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
    views.title.setTitle(time, timer);
  };

  var nextInterval = function() {
    intervalIndex++;
    if (intervalIndex > intervals.length - 1) {
      intervalIndex = 0;
      resetTimer();
    }

    timerInterval = intervals[intervalIndex];

    views.timer.setTime(secondsToTime(timerInterval));

    var imageIndex = Math.floor(intervalIndex / 2);

    // invervals[ work, break, work, break, ... , long break ]
    if (intervalIndex === intervals.length - 1) {
      // last interval
      views.favicon.setFavicon('longbreak');
      views.progress.setDescription('long break');
      views.progress.setImageType('longbreak', imageIndex);
    } else if (intervalIndex % 2 === 1) {
      // odd interval
      views.favicon.setFavicon('break');
      views.progress.setDescription('break');
      views.progress.setImageType('break', imageIndex);
    } else if (intervalIndex % 2 === 0) {
      // even interval
      views.favicon.setFavicon('work');
      if (intervalIndex > 0) {
        views.progress.setDescription('work');
        views.progress.setImageType('work', imageIndex);
        views.progress.setImageType('finished', imageIndex - 1);
      }
    }

  };

  var skipInterval = function () {
    nextInterval();

    if (timer) {
      // resets timeout countdown
      pauseTimer();
      runTimer();
    }

    views.title.setTitle(secondsToTime(timerInterval), timer);
  };

  var startTimer = function() {
    if (!timer) {
      runTimer();
    } else {
      pauseTimer();
    }

    views.title.setTitle(secondsToTime(timerInterval), timer);
    views.controls.toogleStartButtonCaption();

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
    views.controls.resetStartButton();

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
