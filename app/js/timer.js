var timer = (function() {
  'use strict';

  // TODO: after timer reset set icon to gray tomato. also default icon should
  // be gray tomato

  var intervalIndex = 0;
  var timerInterval = config.workInterval;

  var intervals = [];
  var timer;

  var timerTick = function () {
    timerInterval--;

    if (timerInterval <= 0) {
      nextInterval();
    }

    var time = secondsToTime(timerInterval);
    views.timer.setTime(time);
    views.title.setTitle(time);
  };

  var skipInterval = function () {
    nextInterval();
    if (timer) {
      pauseTimer();
      runTimer();
    }
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
      views.title.setFaviconToWork();
    } else if (intervals[intervalIndex] === config.breakInterval) {
      views.title.setFaviconToBreak();
    } else if (intervals[intervalIndex] === config.bigBreakInterval) {
      views.title.setFaviconToLongBreak();
    }

    // tomato img progress update
    var imageIndex = Math.floor(intervalIndex / 2);

    if (intervalIndex > 0 && intervals[intervalIndex] === config.workInterval) {
      views.images.setImageType('work', imageIndex);
      views.images.setImageType('finished', imageIndex - 1);
    } else if (intervals[intervalIndex] === config.breakInterval) {
      views.images.setImageType('break', imageIndex);
    } else if (intervals[intervalIndex] === config.bigBreakInterval) {
      views.images.setImageType('bigBreak', imageIndex);
    }

  };

  var addLeadingZero = function(number) {
    if (number < 10) {
      number = '0' + number;
    }

    return number;
  };

  var secondsToTime = function(seconds) {
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    return addLeadingZero(minutes) + ':' + addLeadingZero(seconds);
  };

  var startTimer = function() {
    if (!timer) {
      runTimer();
    } else {
      pauseTimer();
    }

    views.timerControls.toogleStartButtonCaption();

    if (intervalIndex === 0) {
      views.images.setImageType('work', 0);
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

    views.title.setFaviconToWork();
    views.title.setTitle(time);

    views.images.resetImages();
  };

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

  return {
    init: init,
    startTimer: startTimer,
    pauseTimer: pauseTimer,
    skipInterval: skipInterval,
    resetTimer: resetTimer
  };

}());
