var Settings = (function() {
  'use strict';

  var init = function() {

    // update config defaults with saved settings (if available)
    Config.set('audio', Boolean(Services.Storage.get('audio')));
    Config.set('notifications', Boolean(Services.Storage.get('notifications')));
    Config.set('taskbarFlash', Boolean(Services.Storage.get('taskbarFlash')));
    Config.set('timerAutoPause', Boolean(Services.Storage.get('timerAutoPause')));

    Config.set('workInterval', Services.Storage.get('workInterval') || Config.get('workInterval'));
    Config.set('breakInterval', Services.Storage.get('breakInterval') || Config.get('breakInterval'));
    Config.set('longbreakInterval', Services.Storage.get('longbreakInterval') || Config.get('longbreakInterval'));

    Config.set('repeat', Services.Storage.get('repeat') || Config.get('repeat'));

    // update settings view
    Views.Settings.audio.checked = Config.get('audio');
    Views.Settings.notifications.checked = Config.get('notifications');
    Views.Settings.taskbarFlash.checked = Config.get('taskbarFlash');
    Views.Settings.timerAutoPause.checked = Config.get('timerAutoPause');

    Views.Settings.workInterval.value = Config.get('workInterval') / 60;
    Views.Settings.breakInterval.value = Config.get('breakInterval') / 60;
    Views.Settings.longbreakInterval.value = Config.get('longbreakInterval') / 60;

    Views.Settings.repeat.value = Config.get('repeat');

    // checkboxes
    Views.Settings.audio.addEventListener('click', function() {
      Config.set('audio', this.checked);
      Services.Storage.set('audio', Config.get('audio'));
    });

    if (Services.Notification.isAvaliable()) {
      Views.Settings.notifications.addEventListener('click', function() {
        Config.set('notifications', this.checked);

        if (Config.get('notifications') === true) {
          Services.Notification.requestPermission();
        }

        Services.Storage.set('notifications', Config.get('notifications'));
      });
    } else {
      Views.Settings.hide(Views.Settings.notifications);
    }

    if (Services.TaskbarFlash.isAvaliable()) {
      Views.Settings.taskbarFlash.addEventListener('click', function() {
        Config.set('taskbarFlash', this.checked);
        Services.Storage.set('taskbarFlash', this.checked);
      });
    } else {
      Views.Settings.hide(Views.Settings.taskbarFlash);
    }

    Views.Settings.timerAutoPause.addEventListener('click', function() {
      Config.set('timerAutoPause', this.checked);
      Services.Storage.set('timerAutoPause', this.checked);
    });

    // test buttons
    Views.Settings.audioTest.addEventListener('click', function() {
      Services.Audio.play();
    });

    Views.Settings.notificationsTest.addEventListener('click', function() {
      Services.Notification.newNotification('Web notification test', 'work');
    });

    Views.Settings.taskbarFlashTest.addEventListener('click', function() {
      // flashing only works when browser doesent have focus
      for (var count = 0; count < 20; count++) {
        setTimeout(Services.TaskbarFlash.flash, 500 * count);
      }
    });

    // inputs type number and +- buttons
    var intervalNames = ['workInterval', 'breakInterval', 'longbreakInterval', 'repeat'];

    var numberInputs = Views.Settings.getNumberInputs();
    var plusMinusButtons = Views.Settings.getPlusMinusButtons();

    for (var i = 0; i < intervalNames.length; i++) {
      // interval settings inputs
      numberInputs[i].addEventListener('blur', makeClickHandlerInput(numberInputs[i], intervalNames[i]));

      // plus minus buttons
      for (var j = 0; j < 2; j++) {
        plusMinusButtons[i * 2 + j].addEventListener('click', makeClickHandlerControls(plusMinusButtons[i * 2 + j], intervalNames[i]));
      }
    }

    // reset settings
    Views.Settings.resetSettings.addEventListener('click', function() {
      var confim = confirm('Are you sure?'); // eslint-disable-line no-alert
      if (confim) {
        Services.Storage.clear();
        location.reload(false);
      }
    });

    // request permission in case we have notifications enabled in saved settings
    if (Config.get('notifications') === true) {
      Services.Notification.requestPermission();
    }

  };

  var validateInput = function(value, min, max, defaultValue) {
    value = Math.floor(value); // non-number values converted to NaN

    if (!value) {
      value = defaultValue;
    } else if (value < min * 1) {
      value = min;
    } else if (value > max * 1) {
      value = max;
    }

    return value * 1;
  };

  var intervalInput = function(that, intervalType) {
    var multiplier = 60; // for conversion from seconds to minutes
    if (intervalType === 'repeat') {
      multiplier = 1;
    }

    that.value = validateInput(that.value, that.min, that.max, Config.get(intervalType) / multiplier);
    Config.set(intervalType, that.value * multiplier);

    if (intervalType === 'repeat') {
      Views.Progress.removeImages();
      Timer.init();
    } else {
      Timer.updateIntervals();
    }

    Services.Storage.set(intervalType, Config.get(intervalType));
  };

  // click handlers for number inputs in settings
  var makeClickHandlerInput = function(that, intervalName) {
    return function() {
      intervalInput(that, intervalName);
    };
  };

  // click handler for +- buttons next to settings inputs
  var makeClickHandlerControls = function(that, intervalName) {
    return function() {
      var target = that.getAttribute('data-target'); // TODO: move to views
      target = document.getElementById(target);

      target.value = target.value * 1 + that.getAttribute('data-increment') * 1;

      intervalInput(target, intervalName);
    };
  };

  return {
    init: init
  };

})();
