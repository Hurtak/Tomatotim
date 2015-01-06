services.notification = (function() {
  'use strict';

  var notificationTimeout = 5; // seconds
  var notificationsSupported = false;

  var init = function() {

    if (typeof Notification === 'function' && Notification.permission !== 'granted') {
      Notification.requestPermission();
      notificationsSupported = true;
    }

  };

  var newNotification = function (message, iconType) {
    if (!notificationsSupported) {
      return;
    }

    var notification = new Notification(config.appName, {
      icon: 'icons/favicon-' + iconType + '.ico',
      body: message,
    });

    notification.onshow = function () {
      setTimeout(function () {
        notification.close();
      }, notificationTimeout * 1000);
    };

    // TODO: when we have option which automatically pauses timer after
    //       each interval, click on notification could unpause, also we
    //       should increase the close interval when this option is selected
    //
    // notification.onclick = function () {
    //
    // };

  };

  return {
    init: init,
    newNotification: newNotification
  };

}());
