var timer = (function() {
  'use strict';

  var intervalIndex;
  var timerInterval;

  var intervals = [];
  var timer;

  var init = function () {
    // initialize intervals array
    updateIntervals();

    // load save progress
    intervalIndex = services.storage.get('intervalIndex') || 0;
    timerInterval = services.storage.get('timerInterval') || config.workInterval;

    for (var index = 0; index <= intervalIndex; index++) {
      updateTimerViews(index, true);
    }

    if (intervalIndex === 0 && timerInterval < config.workInterval) {
      views.progress.setImageType('work', 0);
      views.progress.setDescription('work');
    }

    if (intervalIndex === 0 && timerInterval === config.workInterval) {
      services.title.resetTitle();
    } else {
      services.title.setTitle(secondsToTime(timerInterval));
    }

  };

  var updateIntervals = function() {
    intervals = [];

    for (var i = 0; i < config.repeat; i++) {
      intervals.push(config.workInterval);
      intervals.push(config.breakInterval);
    }

    // replace last break with long break
    intervals.pop();
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
    services.storage.set('timerInterval', timerInterval);
  };

  var nextInterval = function(skipped) {
    skipped = skipped || false;

    intervalIndex++;
    if (intervalIndex > intervals.length - 1) {
      intervalIndex = 0;
      resetTimer();
    }

    timerInterval = intervals[intervalIndex];

    updateTimerViews(intervalIndex, skipped);

    services.storage.set('intervalIndex', intervalIndex);

    if (skipped) {
      if (timer) {
        // resets timeout countdown
        pauseTimer();
        runTimer();
      }

      services.title.setTitle(secondsToTime(timerInterval), timer);
      services.storage.set('intervalIndex', intervalIndex);
      services.storage.set('timerInterval', timerInterval);
    }
  };

  var updateTimerViews = function(index, skipped) {
    var imageIndex = Math.floor(index / 2);

    views.timer.setTime(secondsToTime(timerInterval));

    // invervals[ work, break, work, break, ... , long break ]
    if (index === intervals.length - 1) {
      // last interval

      services.favicon.setFavicon('longbreak');
      if (!skipped && config.webNotifications) {
        services.notification.newNotification(config.longbreakInterval / 60 + ' minute long break', 'longbreak');
          services.audio.play();
      }

      views.progress.setDescription('long break');
      views.progress.setImageType('longbreak', imageIndex);

    } else if (index === 0) {
      // first interval: 0

      services.favicon.setFavicon('work');
      if (!skipped) {
        if (config.webNotifications) {
          // TODO: think of better notification text
          services.notification.newNotification('Done', 'work');
        }
        if (config.audioNotifications) {
          services.audio.play();
        }
      }

    } else if (index % 2 === 0) {
      // even interval: 2, 4, 6

      services.favicon.setFavicon('work');
      if (!skipped) {
        if (config.webNotifications) {
          services.notification.newNotification(config.workInterval / 60 + ' minute work', 'work');
        }
        if (config.audioNotifications) {
          services.audio.play();
        }
      }

      views.progress.setDescription('work');
      views.progress.setImageType('work', imageIndex);
      views.progress.setImageType('finished', imageIndex - 1);

    } else if (index % 2 === 1) {
      // odd interval: 1, 3, 6..

      services.favicon.setFavicon('break');
      if (!skipped) {
        if (config.webNotifications) {
          services.notification.newNotification(config.breakInterval / 60 + ' minute break', 'break');
        }
        if (config.audioNotifications) {
          services.audio.play();
        }
      }

      views.progress.setDescription('break');
      views.progress.setImageType('break', imageIndex);

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
    services.storage.set('intervalIndex', intervalIndex);
    services.storage.set('timerInterval', timerInterval);

    views.progress.resetProgress();
  };

  return {
    init: init,
    updateIntervals: updateIntervals,
    startTimer: startTimer,
    pauseTimer: pauseTimer,
    skipInterval: skipInterval,
    resetTimer: resetTimer
  };

}());
