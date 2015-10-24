TT.Services.Notification = (function () {
	'use strict';

	// seconds
	var notificationTimeout = 5;

	function isAvaliable() {
		return typeof window.Notification === 'function';
	}

	function requestPermission() {
		if (!isAvaliable()) {
			return false;
		}

		if (Notification.permission !== 'granted') {
			Notification.requestPermission();
			return false;
		}

		return true;
	}

	function newNotification(message, iconType) {
		if (!requestPermission()) {
			return;
		}

		var notification = new Notification(TT.Config.get('appName'), {
			icon: 'img/notification-96x96-' + iconType + '.png',
			body: message
		});

		notification.onshow = function () {
			setTimeout(function () {
				notification.close();
			}, notificationTimeout * 1000);
		};
	}

	return {
		isAvaliable: isAvaliable,
		requestPermission: requestPermission,
		newNotification: newNotification
	};
})();
