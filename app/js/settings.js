var settings = (function() {
  'use strict';

  var init = function() {
    // replace config defaults with saved settings
    config.audioNotifications = services.storage.get('audioNotifications') || config.audioNotifications;
    config.webNotifications = services.storage.get('webNotifications') || config.webNotifications;

    config.workInterval = services.storage.get('workInterval') || config.workInterval;
    config.breakInterval = services.storage.get('breakInterval') || config.breakInterval;
    config.longbreakInterval = services.storage.get('longbreakInterval') || config.longbreakInterval;

    config.repeat = services.storage.get('repeat') || config.repeat;

    // update settings view
    views.settings.audioNotifications.checked = config.audioNotifications;
    views.settings.webNotifications.checked = config.webNotifications;

    views.settings.workInterval.value = config.workInterval;
    views.settings.breakInterval.value = config.breakInterval;
    views.settings.longbreakInterval.value = config.longbreakInterval;

    views.settings.numberOfIntervals.value = config.repeat;
  };


  return {
    init: init
  };

}());

