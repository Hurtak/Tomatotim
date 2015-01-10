var settings = (function() {
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

    // update config defaults with saved settings (if avaliable)

    var audio = services.storage.get('audio');
    if (audio !== null) {
      config.audio = audio;
    }

    var notifications = services.storage.get('notifications');
    if (notifications !== null) {
      config.notifications = notifications;
    }

    config.workInterval = services.storage.get('workInterval') || config.workInterval;
    config.breakInterval = services.storage.get('breakInterval') || config.breakInterval;
    config.longbreakInterval = services.storage.get('longbreakInterval') || config.longbreakInterval;

    config.repeat = services.storage.get('repeat') || config.repeat;

    // update settings view

    views.settings.audio.checked = config.audio;
    views.settings.notifications.checked = config.notifications;

    views.settings.workInterval.value = config.workInterval / 60;
    views.settings.breakInterval.value = config.breakInterval / 60;
    views.settings.longbreakInterval.value = config.longbreakInterval / 60;

    views.settings.repeat.value = config.repeat;

    // binding

    views.settings.audio.addEventListener('click', function() {
      config.audio = this.checked;
      services.storage.set('audio', config.audio);
    });
    views.settings.notifications.addEventListener('click', function() {
      config.notifications = this.checked;
      services.storage.set('notifications', config.notifications);
      if (config.notifications === true) {
        services.notification.requestPermission();
      }
    });

    views.settings.audioTest.addEventListener('click', function() {
      services.audio.play();
    });
    views.settings.notificationsTest.addEventListener('click', function() {
      services.notification.newNotification('Web notification test', 'work');
    });

    views.settings.workInterval.addEventListener('blur', function() {
      this.value = validateInput(this.value, this.min, this.max, config.workInterval / 60);

      config.workInterval = this.value * 60;
      services.storage.set('workInterval', config.workInterval);
      timer.updateIntervals();
    });
    views.settings.breakInterval.addEventListener('blur', function() {
      this.value = validateInput(this.value, this.min, this.max, config.breakInterval / 60);

      config.breakInterval = this.value * 60;
      services.storage.set('breakInterval', config.breakInterval);
      timer.updateIntervals();
    });
    views.settings.longbreakInterval.addEventListener('blur', function() {
      this.value = validateInput(this.value, this.min, this.max, config.longbreakInterval / 60);

      config.longbreakInterval = this.value * 60;
      services.storage.set('longbreakInterval', config.longbreakInterval);
      timer.updateIntervals();
    });

    views.settings.repeat.addEventListener('blur', function() {
      this.value = validateInput(this.value, this.min, this.max, config.repeat);

      config.repeat = this.value * 1;
      services.storage.set('repeat', config.repeat);
      timer.updateIntervals();
    });

    views.settings.resetSettings.addEventListener('click', function() {
      var confim = confirm('Are you sure?');
      if (confim) {
        services.storage.clear();
        location.reload(false);
      }
    });

    // request permisions in case we have notifications enabled in saved settings

    if (config.notifications === true) {
      services.notification.requestPermission();
    }

  };

  return {
    init: init
  };

}());

