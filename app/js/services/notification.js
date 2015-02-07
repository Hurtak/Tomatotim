Services.Notification = (function() {
  'use strict';

  var notificationTimeout = 5; // seconds

  var isAvaliable = function() {
    return typeof window.Notification === 'function';
  };

  var requestPermission = function() {
    if (!isAvaliable()) {
      return false;
    }

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
      return false;
    }

    return true;
  };

  var newNotification = function(message, iconType) {
    if (!requestPermission()) {
      return;
    }

    var notification = new Notification(Config.get('appName'), {
      icon: 'img/notification-96x96-' + iconType + '.png',
      body: message
    });

    notification.onshow = function() {
      setTimeout(function() {
        notification.close();
      }, notificationTimeout * 1000);
    };

    // TODO: when we have option which automatically pauses timer after
    //       each interval, click on notification could unpause, also we
    //       should increase the close interval when this option is selected
    //
    // notification.onclick = function() {
    //
    // };

  };

  return {
    isAvaliable: isAvaliable,
    requestPermission: requestPermission,
    newNotification: newNotification
  };

}());
