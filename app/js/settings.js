var Settings = (function() {
  'use strict';

  var init = function() {

    // update config defaults with saved settings (if available)
    var audio = Services.Storage.get('audio');
    if (audio !== null) {
      Config.set('audio', audio);
    }

    var notifications = Services.Storage.get('notifications');
    if (notifications !== null) {
      Config.set('notifications', notifications);
    }

    Config.set('workInterval', Services.Storage.get('workInterval') || Config.get('workInterval'));
    Config.set('breakInterval', Services.Storage.get('breakInterval') || Config.get('breakInterval'));
    Config.set('longbreakInterval', Services.Storage.get('longbreakInterval') || Config.get('longbreakInterval'));

    Config.set('repeat', Services.Storage.get('repeat') || Config.get('repeat'));

    // update settings view
    Views.Settings.audio.checked = Config.get('audio');
    Views.Settings.notifications.checked = Config.get('notifications');

    Views.Settings.workInterval.value = Config.get('workInterval') / 60;
    Views.Settings.breakInterval.value = Config.get('breakInterval') / 60;
    Views.Settings.longbreakInterval.value = Config.get('longbreakInterval') / 60;

    Views.Settings.repeat.value = Config.get('repeat');

    // notifications
    Views.Settings.audio.addEventListener('click', function() {
      Config.set('audio', this.checked);

      Services.Storage.set('audio', Config.get('audio'));
    });

    Views.Settings.notifications.addEventListener('click', function() {
      Config.set('notifications', this.checked);

      if (Config.get('notifications') === true) {
        Services.Notification.requestPermission();
      }

      Services.Storage.set('notifications', Config.get('notifications'));
    });

    // notifications test buttons
    Views.Settings.audioTest.addEventListener('click', function() {
      Services.Audio.play();
    });

    Views.Settings.notificationsTest.addEventListener('click', function() {
      Services.Notification.newNotification('Web notification test', 'work');
    });

    var intervals = ['workInterval', 'breakInterval', 'longbreakInterval', 'repeat'];

    var inputs = document.querySelectorAll('.settings input[type=number]'); // TODO: move to views
    var plusminus = document.querySelectorAll('.settings [data-increment]'); // TODO: move to views

    for (var i = 0; i < intervals.length; i++) {
      // interval settings inputs
      inputs[i].addEventListener('blur', makeClickHandlerInput(inputs[i], intervals[i]));

      // plus minus buttons
      for (var j = 0; j < 2; j++) {
        plusminus[i * 2 + j].addEventListener('click', makeClickHandlerControls(plusminus[i * 2 + j], intervals[i]));
      }
    }

    // reset settings
    Views.Settings.resetSettings.addEventListener('click', function() {
      var confim = confirm('Are you sure?');
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
    value = Math.floor(value);

    if (!value) {
      // after Math.floor all non-number values are converted to 0
      value = defaultValue;
    } else if (value < min * 1) {
      value = min;
    } else if (value > max * 1) {
      value = max;
    }

    return value * 1;
  };

// TODO: rename interval and intervalRepeat
  var interval = function(that, configValue) {
    var multiplier = 60; // for conversion from seconds to minutes
    if (configValue === 'repeat') {
      multiplier = 1;
    }

    that.value = validateInput(that.value, that.min, that.max, Config.get(configValue) / multiplier);
    Config.set(configValue, that.value * multiplier);

    if (configValue === 'repeat') {
      Views.Progress.removeImages();
      Timer.init();
    } else {
      Timer.updateIntervals();
    }

    Services.Storage.set(configValue, Config.get(configValue));
  };

  // click handlers for inputs in settings
  var makeClickHandlerInput = function(that, intervalName) {
    return function() {
      interval(that, intervalName);
    };
  };

  // click handler for +- buttons next to settings inputs
  var makeClickHandlerControls = function(that, intervalName) {
    return function() {
      var target = that.getAttribute('data-target'); // TODO: move to views
      target = document.getElementById(target);

      target.value = target.value * 1 + that.getAttribute('data-increment') * 1;

      interval(target, intervalName);
    };
  };

  return {
    init: init
  };

}());

