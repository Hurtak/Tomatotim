var settings = (function() {
  'use strict';

  var init = function() {

    // update config defaults with saved settings (if avaliable)

    var audio = services.storage.get('audioNotifications');
    if (audio !== null) {
      config.audioNotifications = audio;
    }

    var notifications = services.storage.get('webNotifications');
    if (notifications !== null) {
      config.webNotifications = notifications;
    }

    config.workInterval = services.storage.get('workInterval') || config.workInterval;
    config.breakInterval = services.storage.get('breakInterval') || config.breakInterval;
    config.longbreakInterval = services.storage.get('longbreakInterval') || config.longbreakInterval;

    config.repeat = services.storage.get('repeat') || config.repeat;

    // update settings view

    views.settings.audioNotifications.checked = config.audioNotifications;
    views.settings.webNotifications.checked = config.webNotifications;

    views.settings.workInterval.value = config.workInterval / 60;
    views.settings.breakInterval.value = config.breakInterval / 60;
    views.settings.longbreakInterval.value = config.longbreakInterval / 60;

    views.settings.repeat.value = config.repeat;

    // binding

    views.settings.audioNotifications.addEventListener('blur', function() {
      config.audioNotifications = this.checked;
      services.storage.set('audioNotifications', config.audioNotifications);
    });
    views.settings.webNotifications.addEventListener('blur', function() {
      config.webNotifications = this.checked;
      services.storage.set('webNotifications', config.webNotifications);
      if (config.webNotifications === true) {
        services.notification.requestPermission();
      }
    });

    views.settings.workInterval.addEventListener('blur', function() {
      config.workInterval = this.value * 60;
      services.storage.set('workInterval', config.workInterval);
      timer.updateIntervals();
    });
    views.settings.breakInterval.addEventListener('blur', function() {
      config.breakInterval = this.value * 60;
      services.storage.set('breakInterval', config.breakInterval);
      timer.updateIntervals();
    });
    views.settings.longbreakInterval.addEventListener('blur', function() {
      config.longbreakInterval = this.value * 60;
      services.storage.set('longbreakInterval', config.longbreakInterval);
      timer.updateIntervals();
    });

    views.settings.repeat.addEventListener('blur', function() {
      config.repeat = this.value * 1;
      services.storage.set('repeat', config.repeat);
      timer.updateIntervals();
    });

    // request permisions

    if (config.webNotifications === true) {
      services.notification.requestPermission();
    }

  };


  return {
    init: init
  };

}());

