TT.Timer = (function () {
	'use strict';

	var intervalIndex;
	var timerInterval;

	var intervals = [];

	var timer;
	// how often are we running precise timer to check if second of real time elapsed in ms
	var timerPrecision = 100;

	function init() {
		// initialize intervals array
		updateIntervals();

		// load saved progress
		intervalIndex = TT.Services.Storage.get('intervalIndex') || 0;
		timerInterval = TT.Services.Storage.get('timerInterval') || TT.Config.get('workInterval');

		// when user changes number of intervals in settings
		if (intervalIndex > intervals.length - 1) {
			if (intervalIndex % 2 === 0) {
				intervalIndex = intervals.length - 2;
			} else {
				intervalIndex = intervals.length - 1;
			}
		}

		// initialize progress images
		for (var i = 0; i < TT.Config.get('repeat'); i++) {
			TT.Views.Progress.createImage('unfinished');
		}

		for (var index = 0; index <= intervalIndex; index++) {
			updateTimerViews(index, true);
		}

		if (intervalIndex === 0 && timerInterval < TT.Config.get('workInterval')) {
			TT.Views.Progress.setImageType('work', 0);
			TT.Views.Progress.setDescription('work');
		}

		if (intervalIndex === 0 && timerInterval === TT.Config.get('workInterval')) {
			TT.Services.Title.resetTitle();
		} else {
			TT.Services.Title.setTitle(secondsToTime(timerInterval));
		}

		// binding
		TT.Views.Controls.getStartButton().addEventListener('click', startTimer);
		TT.Views.Controls.getSkipButton().addEventListener('click', skipInterval);
		TT.Views.Controls.getResetButton().addEventListener('click', resetTimer);
	}

	function updateIntervals() {
		intervals = [];

		for (var i = 0; i < TT.Config.get('repeat'); i++) {
			intervals.push(TT.Config.get('workInterval'));
			intervals.push(TT.Config.get('breakInterval'));
		}

		// replace last break with long break
		intervals.pop();
		intervals.push(TT.Config.get('longbreakInterval'));
	}

	function secondsToTime(seconds) {
		function addLeadingZero(number) {
			if (number < 10) {
				number = '0' + number;
			}
			return number;
		}

		var minutes = Math.floor(seconds / 60);
		seconds %= 60;

		return addLeadingZero(minutes) + ':' + addLeadingZero(seconds);
	}

	function timerTick() {
		timerInterval--;

		if (timerInterval <= 0) {
			nextInterval();
		}

		var time = secondsToTime(timerInterval);

		TT.Views.Timer.setTime(time);

		TT.Services.Title.setTitle(time, timer);
		TT.Services.Storage.set('timerInterval', timerInterval);
	}

	function skipInterval() {
		nextInterval(true);
	}

	function nextInterval(skipped) {
		skipped = skipped || false;

		intervalIndex++;
		if (intervalIndex > intervals.length - 1) {
			intervalIndex = 0;
			resetTimer();
		}

		timerInterval = intervals[intervalIndex];

		updateTimerViews(intervalIndex, skipped);

		TT.Services.Storage.set('intervalIndex', intervalIndex);

		if (skipped) {
			if (timer) {
				// resets timeout countdown
				pauseTimer();
				runTimer();
			}

			TT.Services.Title.setTitle(secondsToTime(timerInterval), timer);
			TT.Services.Storage.set('timerInterval', timerInterval);
		}

		if (TT.Config.get('timerAutoPause')) {
			pauseTimer();
			// TODO: refactor this into pauseTimer()
			TT.Views.Controls.resetStartButton();
			TT.Services.Title.setTitle(secondsToTime(timerInterval), timer);
		}
	}

	function updateTimerViews(index, skipped) {
		var imageIndex = Math.floor(index / 2);

		TT.Views.Timer.setTime(secondsToTime(timerInterval));

		// intervals[ work, break, work, break, ... , long break ]
		if (index === intervals.length - 1) {
			// last interval

			TT.Services.Favicon.setFavicon('longbreak');
			if (!skipped && TT.Config.get('notifications')) {
				TT.Services.Notification.newNotification(TT.Config.get('longbreakInterval') / 60 + ' minute long break', 'longbreak');
			}

			TT.Views.Progress.setDescription('long break');
			TT.Views.Progress.setImageType('longbreak', imageIndex);
		} else if (index === 0) {
			// first interval: 0
			TT.Services.Favicon.setFavicon('work');
			if (!skipped && TT.Config.get('notifications')) {
				// TODO: think of better notification text
				TT.Services.Notification.newNotification('Done', 'work');
			}
		} else if (index % 2 === 1) {
			// odd interval: 1, 3, 5..
			TT.Services.Favicon.setFavicon('break');
			if (!skipped && TT.Config.get('notifications')) {
				TT.Services.Notification.newNotification(TT.Config.get('breakInterval') / 60 + ' minute break', 'break');
			}

			TT.Views.Progress.setDescription('break');
			TT.Views.Progress.setImageType('break', imageIndex);
		} else if (index % 2 === 0) {
			// even interval: 2, 4, 6..
			TT.Services.Favicon.setFavicon('work');
			if (!skipped && TT.Config.get('notifications')) {
				TT.Services.Notification.newNotification(TT.Config.get('workInterval') / 60 + ' minute work', 'work');
			}

			TT.Views.Progress.setDescription('work');
			TT.Views.Progress.setImageType('work', imageIndex);
			TT.Views.Progress.setImageType('finished', imageIndex - 1);
		}

		if (!skipped) {
			if (TT.Config.get('audio')) {
				TT.Services.Audio.play();
			}
			if (TT.Config.get('taskbarFlash')) {
				TT.Services.TaskbarFlash.flash();
			}
		}
	}

	function startTimer() {
		if (!timer) {
			runTimer();
		} else {
			pauseTimer();
		}

		TT.Services.Title.setTitle(secondsToTime(timerInterval), timer);
		TT.Views.Controls.toogleStartButtonCaption();

		if (intervalIndex === 0) {
			TT.Views.Progress.setImageType('work', 0);
			TT.Views.Progress.setDescription('work');
		}
	}

	function runTimer() {
		var elapsedTime = 0;
		var before = new Date();

		timer = setInterval(function () {
			elapsedTime += new Date().getTime() - before.getTime();

			if (elapsedTime >= 1000) {
				timerTick();
				elapsedTime -= 1000;
			}

			before = new Date();
		}, timerPrecision);
	}

	function pauseTimer() {
		timer = clearInterval(timer);
	}

	function resetTimer() {
		pauseTimer();

		intervalIndex = 0;
		timerInterval = TT.Config.get('workInterval');

		var time = secondsToTime(timerInterval);

		TT.Views.Timer.setTime(time);
		TT.Views.Controls.resetStartButton();

		TT.Services.Title.resetTitle();
		TT.Services.Favicon.setFavicon('work');
		TT.Services.Storage.set('intervalIndex', intervalIndex);
		TT.Services.Storage.set('timerInterval', timerInterval);

		TT.Views.Progress.resetProgress();
	}

	return {
		init: init,
		updateIntervals: updateIntervals,
		startTimer: startTimer,
		pauseTimer: pauseTimer,
		skipInterval: skipInterval,
		resetTimer: resetTimer
	};
})();
