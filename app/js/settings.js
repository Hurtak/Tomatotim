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

}());

