TT.Settings = (function () {
	'use strict';

	function init() {
		// update config defaults with saved settings (if available)
		TT.Config.set('audio', Boolean(TT.Services.Storage.get('audio')));
		TT.Config.set('notifications', Boolean(TT.Services.Storage.get('notifications')));
		TT.Config.set('taskbarFlash', Boolean(TT.Services.Storage.get('taskbarFlash')));
		TT.Config.set('timerAutoPause', Boolean(TT.Services.Storage.get('timerAutoPause')));

		TT.Config.set('workInterval', TT.Services.Storage.get('workInterval') || TT.Config.get('workInterval'));
		TT.Config.set('breakInterval', TT.Services.Storage.get('breakInterval') || TT.Config.get('breakInterval'));
		TT.Config.set('longbreakInterval', TT.Services.Storage.get('longbreakInterval') || TT.Config.get('longbreakInterval'));

		TT.Config.set('repeat', TT.Services.Storage.get('repeat') || TT.Config.get('repeat'));

		// update settings view
		TT.Views.Settings.audio.checked = TT.Config.get('audio');
		TT.Views.Settings.notifications.checked = TT.Config.get('notifications');
		TT.Views.Settings.taskbarFlash.checked = TT.Config.get('taskbarFlash');
		TT.Views.Settings.timerAutoPause.checked = TT.Config.get('timerAutoPause');

		TT.Views.Settings.workInterval.value = TT.Config.get('workInterval') / 60;
		TT.Views.Settings.breakInterval.value = TT.Config.get('breakInterval') / 60;
		TT.Views.Settings.longbreakInterval.value = TT.Config.get('longbreakInterval') / 60;

		TT.Views.Settings.repeat.value = TT.Config.get('repeat');

		// checkboxes
		TT.Views.Settings.audio.addEventListener('click', function () {
			TT.Config.set('audio', this.checked);
			TT.Services.Storage.set('audio', TT.Config.get('audio'));
		});

		if (TT.Services.Notification.isAvaliable()) {
			TT.Views.Settings.notifications.addEventListener('click', function () {
				TT.Config.set('notifications', this.checked);

				if (TT.Config.get('notifications') === true) {
					TT.Services.Notification.requestPermission();
				}

				TT.Services.Storage.set('notifications', TT.Config.get('notifications'));
			});
		} else {
			TT.Views.Settings.hide(TT.Views.Settings.notifications);
		}

		if (TT.Services.TaskbarFlash.isAvaliable()) {
			TT.Views.Settings.taskbarFlash.addEventListener('click', function () {
				TT.Config.set('taskbarFlash', this.checked);
				TT.Services.Storage.set('taskbarFlash', this.checked);
			});
		} else {
			TT.Views.Settings.hide(TT.Views.Settings.taskbarFlash);
		}

		TT.Views.Settings.timerAutoPause.addEventListener('click', function () {
			TT.Config.set('timerAutoPause', this.checked);
			TT.Services.Storage.set('timerAutoPause', this.checked);
		});

		// test buttons
		TT.Views.Settings.audioTest.addEventListener('click', function () {
			TT.Services.Audio.play();
		});

		TT.Views.Settings.notificationsTest.addEventListener('click', function () {
			TT.Services.Notification.newNotification('Web notification test', 'work');
		});

		TT.Views.Settings.taskbarFlashTest.addEventListener('click', function () {
			// flashing only works when browser doesn't have focus
			for (var count = 0; count < 20; count++) {
				setTimeout(TT.Services.TaskbarFlash.flash, 500 * count);
			}
		});

		// inputs type number and +- buttons
		var intervalNames = ['workInterval', 'breakInterval', 'longbreakInterval', 'repeat'];

		var numberInputs = TT.Views.Settings.getNumberInputs();
		var plusMinusButtons = TT.Views.Settings.getPlusMinusButtons();

		for (var i = 0; i < intervalNames.length; i++) {
			// interval settings inputs
			numberInputs[i].addEventListener('blur', makeClickHandlerForInput(numberInputs[i], intervalNames[i]));

			// plus minus buttons
			for (var j = 0; j < 2; j++) {
				plusMinusButtons[i * 2 + j].addEventListener('click', makeClickHandlerForControls(plusMinusButtons[i * 2 + j], intervalNames[i]));
			}
		}

		// reset settings
		TT.Views.Settings.resetSettings.addEventListener('click', function () {
			var confim = confirm('Are you sure?'); // eslint-disable-line no-alert
			if (confim) {
				TT.Services.Storage.clear();
				location.reload(false);
			}
		});

		// request permission in case we have notifications enabled in saved settings
		if (TT.Config.get('notifications') === true) {
			TT.Services.Notification.requestPermission();
		}
	}

	function validateInput(value, min, max, defaultValue) {
		// non-number values converted to NaN
		value = Math.floor(value);

		if (!value) {
			value = defaultValue;
		} else if (value < Number(min)) {
			value = min;
		} else if (value > Number(max)) {
			value = max;
		}

		return Number(value);
	}

	function intervalInput(that, intervalType) {
		// conversion between seconds and minutes
		var multiplier = 60;
		if (intervalType === 'repeat') {
			multiplier = 1;
		}

		that.value = validateInput(that.value, that.min, that.max, TT.Config.get(intervalType) / multiplier);
		TT.Config.set(intervalType, that.value * multiplier);

		if (intervalType === 'repeat') {
			TT.Views.Progress.removeImages();
			TT.Timer.init();
		} else {
			TT.Timer.updateIntervals();
		}

		TT.Services.Storage.set(intervalType, TT.Config.get(intervalType));
	}

	// click handlers for number inputs in settings
	function makeClickHandlerForInput(that, intervalName) {
		return function () {
			intervalInput(that, intervalName);
		};
	}

	// click handler for +- buttons next to settings inputs
	function makeClickHandlerForControls(that, intervalName) {
		return function () {
			// TODO: move to views
			var target = that.getAttribute('data-target');
			target = document.getElementById(target);

			target.value = Number(target.value) + Number(that.getAttribute('data-increment'));

			intervalInput(target, intervalName);
		};
	}

	return {
		init: init
	};
})();
