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
    services.title.setTitle(time, timer);
  };

  var nextInterval = function(skipped) {
    skipped = skipped || false;

    intervalIndex++;
    if (intervalIndex > intervals.length - 1) {
      intervalIndex = 0;
      resetTimer();
    }

    timerInterval = intervals[intervalIndex];

    var imageIndex = Math.floor(intervalIndex / 2);

    views.timer.setTime(secondsToTime(timerInterval));

    // invervals[ work, break, work, break, ... , long break ]
    if (intervalIndex === intervals.length - 1) {
      // last interval

      services.favicon.setFavicon('longbreak');
      if (!skipped) {
        services.notification.newNotification(config.longbreakInterval / 60 +
          ' minute long break', 'longbreak');
        services.audio.play();
      }

      views.progress.setDescription('long break');
      views.progress.setImageType('longbreak', imageIndex);

    } else if (intervalIndex === 0) {
      // first interval: 0

      services.favicon.setFavicon('work');
      if (!skipped) {
        // TODO: think of better notification text
        services.notification.newNotification('Done', 'work');
        services.audio.play();
      }

    } else if (intervalIndex % 2 === 0) {
      // even interval: 2, 4, 6

      services.favicon.setFavicon('work');
      if (!skipped) {
        services.notification.newNotification(config.workInterval / 60 +
          ' minute work', 'work');
          services.audio.play();
      }

      views.progress.setDescription('work');
      views.progress.setImageType('work', imageIndex);
      views.progress.setImageType('finished', imageIndex - 1);

    } else if (intervalIndex % 2 === 1) {
      // odd interval: 1, 3, 6..

      services.favicon.setFavicon('break');
      if (!skipped) {
        services.notification.newNotification(config.breakInterval / 60 +
          ' minute break', 'break');
        services.audio.play();
      }

      views.progress.setDescription('break');
      views.progress.setImageType('break', imageIndex);

    }

    if (skipped) {
      if (timer) {
        // resets timeout countdown
        pauseTimer();
        runTimer();
      }

      services.title.setTitle(secondsToTime(timerInterval), timer);
    }
  };

  var skipInterval = function () {
    nextInterval(true);
  };

  var startTimer = function() {
    if (!timer) {
      runTimer();
    } else {
      pauseTimer();
    }

    services.title.setTitle(secondsToTime(timerInterval), timer);
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

    services.title.resetTitle();
    services.favicon.setFavicon('work');

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
