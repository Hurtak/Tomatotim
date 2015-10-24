window.Timer = (function () {
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
		intervalIndex = Services.Storage.get('intervalIndex') || 0;
		timerInterval = Services.Storage.get('timerInterval') || Config.get('workInterval');

		// when user changes number of intervals in settings
		if (intervalIndex > intervals.length - 1) {
			if (intervalIndex % 2 === 0) {
				intervalIndex = intervals.length - 2;
			} else {
				intervalIndex = intervals.length - 1;
			}
		}

		// initialize progress images
		for (var i = 0; i < Config.get('repeat'); i++) {
			Views.Progress.createImage('unfinished');
		}

		for (var index = 0; index <= intervalIndex; index++) {
			updateTimerViews(index, true);
		}

		if (intervalIndex === 0 && timerInterval < Config.get('workInterval')) {
			Views.Progress.setImageType('work', 0);
			Views.Progress.setDescription('work');
		}

		if (intervalIndex === 0 && timerInterval === Config.get('workInterval')) {
			Services.Title.resetTitle();
		} else {
			Services.Title.setTitle(secondsToTime(timerInterval));
		}

		// binding
		Views.Controls.getStartButton().addEventListener('click', startTimer);
		Views.Controls.getSkipButton().addEventListener('click', skipInterval);
		Views.Controls.getResetButton().addEventListener('click', resetTimer);
	}

	function updateIntervals() {
		intervals = [];

		for (var i = 0; i < Config.get('repeat'); i++) {
			intervals.push(Config.get('workInterval'));
			intervals.push(Config.get('breakInterval'));
		}

		// replace last break with long break
		intervals.pop();
		intervals.push(Config.get('longbreakInterval'));
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

		Views.Timer.setTime(time);

		Services.Title.setTitle(time, timer);
		Services.Storage.set('timerInterval', timerInterval);
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

		Services.Storage.set('intervalIndex', intervalIndex);

		if (skipped) {
			if (timer) {
				// resets timeout countdown
				pauseTimer();
				runTimer();
			}

			Services.Title.setTitle(secondsToTime(timerInterval), timer);
			Services.Storage.set('timerInterval', timerInterval);
		}

		if (Config.get('timerAutoPause')) {
			pauseTimer();
			// TODO: refactor this into pauseTimer()
			Views.Controls.resetStartButton();
			Services.Title.setTitle(secondsToTime(timerInterval), timer);
		}
	}

	function updateTimerViews(index, skipped) {
		var imageIndex = Math.floor(index / 2);

		Views.Timer.setTime(secondsToTime(timerInterval));

		// intervals[ work, break, work, break, ... , long break ]
		if (index === intervals.length - 1) {
			// last interval

			Services.Favicon.setFavicon('longbreak');
			if (!skipped && Config.get('notifications')) {
				Services.Notification.newNotification(Config.get('longbreakInterval') / 60 + ' minute long break', 'longbreak');
			}

			Views.Progress.setDescription('long break');
			Views.Progress.setImageType('longbreak', imageIndex);
		} else if (index === 0) {
			// first interval: 0
			Services.Favicon.setFavicon('work');
			if (!skipped && Config.get('notifications')) {
				// TODO: think of better notification text
				Services.Notification.newNotification('Done', 'work');
			}
		} else if (index % 2 === 1) {
			// odd interval: 1, 3, 5..
			Services.Favicon.setFavicon('break');
			if (!skipped && Config.get('notifications')) {
				Services.Notification.newNotification(Config.get('breakInterval') / 60 + ' minute break', 'break');
			}

			Views.Progress.setDescription('break');
			Views.Progress.setImageType('break', imageIndex);
		} else if (index % 2 === 0) {
			// even interval: 2, 4, 6..
			Services.Favicon.setFavicon('work');
			if (!skipped && Config.get('notifications')) {
				Services.Notification.newNotification(Config.get('workInterval') / 60 + ' minute work', 'work');
			}

			Views.Progress.setDescription('work');
			Views.Progress.setImageType('work', imageIndex);
			Views.Progress.setImageType('finished', imageIndex - 1);
		}

		if (!skipped) {
			if (Config.get('audio')) {
				Services.Audio.play();
			}
			if (Config.get('taskbarFlash')) {
				Services.TaskbarFlash.flash();
			}
		}
	}

	function startTimer() {
		if (!timer) {
			runTimer();
		} else {
			pauseTimer();
		}

		Services.Title.setTitle(secondsToTime(timerInterval), timer);
		Views.Controls.toogleStartButtonCaption();

		if (intervalIndex === 0) {
			Views.Progress.setImageType('work', 0);
			Views.Progress.setDescription('work');
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
		timerInterval = Config.get('workInterval');

		var time = secondsToTime(timerInterval);

		Views.Timer.setTime(time);
		Views.Controls.resetStartButton();

		Services.Title.resetTitle();
		Services.Favicon.setFavicon('work');
		Services.Storage.set('intervalIndex', intervalIndex);
		Services.Storage.set('timerInterval', timerInterval);

		Views.Progress.resetProgress();
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
