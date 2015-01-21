var Settings = (function() {
  'use strict';

  var validateInput = function(value, min, max, defaultValue) {
    var number = Math.floor(value);

    if (!number) {
      // after Math.floor all non-number values are converted to 0
      number = defaultValue;
    } else if (number < min * 1) {
      number = min;
    } else if (number > max * 1) {
      number = max;
    }

    return number;
  };

  var init = function() {

    // update config defaults with saved settings (if available)
    var audio = Services.Storage.get('audio');
    if (audio !== null) {
      Config.audio = audio;
    }

    var notifications = Services.Storage.get('notifications');
    if (notifications !== null) {
      Config.notifications = notifications;
    }

    Config.workInterval = Services.Storage.get('workInterval') || Config.workInterval;
    Config.breakInterval = Services.Storage.get('breakInterval') || Config.breakInterval;
    Config.longbreakInterval = Services.Storage.get('longbreakInterval') || Config.longbreakInterval;

    Config.repeat = Services.Storage.get('repeat') || Config.repeat;

    // update settings view
    Views.Settings.audio.checked = Config.audio;
    Views.Settings.notifications.checked = Config.notifications;

    Views.Settings.workInterval.value = Config.workInterval / 60;
    Views.Settings.breakInterval.value = Config.breakInterval / 60;
    Views.Settings.longbreakInterval.value = Config.longbreakInterval / 60;

    Views.Settings.repeat.value = Config.repeat;

    // notifications
    Views.Settings.audio.addEventListener('click', function() {
      Config.audio = this.checked;

      Services.Storage.set('audio', Config.audio);
    });

    Views.Settings.notifications.addEventListener('click', function() {
      Config.notifications = this.checked;

      if (Config.notifications === true) {
        Services.Notification.requestPermission();
      }

      Services.Storage.set('notifications', Config.notifications);
    });

    // notifications test buttons
    Views.Settings.audioTest.addEventListener('click', function() {
      Services.Audio.play();
    });

    Views.Settings.notificationsTest.addEventListener('click', function() {
      Services.Notification.newNotification('Web notification test', 'work');
    });

    // interval settings
    Views.Settings.workInterval.addEventListener('blur', function() {
      this.value = validateInput(this.value, this.min, this.max, Config.workInterval / 60);

      Config.workInterval = this.value * 60;
      Timer.updateIntervals();

      Services.Storage.set('workInterval', Config.workInterval);
    });

    Views.Settings.breakInterval.addEventListener('blur', function() {
      this.value = validateInput(this.value, this.min, this.max, Config.breakInterval / 60);

      Config.breakInterval = this.value * 60;
      Timer.updateIntervals();

      Services.Storage.set('breakInterval', Config.breakInterval);
    });

    Views.Settings.longbreakInterval.addEventListener('blur', function() {
      this.value = validateInput(this.value, this.min, this.max, Config.longbreakInterval / 60);

      Config.longbreakInterval = this.value * 60;
      Timer.updateIntervals();

      Services.Storage.set('longbreakInterval', Config.longbreakInterval);
    });

    // repeat
    Views.Settings.repeat.addEventListener('input', function() {
      this.value = validateInput(this.value, this.min, this.max, Config.repeat);

      Config.repeat = this.value * 1;

      Views.Progress.removeImages();
      Timer.init();

      Services.Storage.set('repeat', Config.repeat);
    });

    // reset settings
    Views.Settings.resetSettings.addEventListener('click', function() {
      var confim = confirm('Are you sure?');
      if (confim) {
        Services.Storage.clear();
        location.reload(false);
      }
    });

    // request permission in case we have notifications enabled in saved settings
    if (Config.notifications === true) {
      Services.Notification.requestPermission();
    }

  };

  return {
    init: init
  };

}());

