TT.Config = (function () {
	'use strict';

	var config = {};

	config.debug = false;
	if (window.location.search.indexOf('debug') > -1) {
		// '?debug' at the end of URL activates debug mode
		config.debug = true;
	}

	config.appName = 'Tomatotim';

	config.audio = false;
	config.notifications = false;

	// seconds
	config.workInterval = 25 * 60;
	config.breakInterval = 5 * 60;
	config.longbreakInterval = 20 * 60;

	config.repeat = 4;

	if (config.debug) {
		config.appName = 'DEBUG';

		config.workInterval = 7;
		config.breakInterval = 5;
		config.longbreakInterval = 6;
	}

	var get = function (name) {
		return config[name];
	};

	var set = function (name, value) {
		config[name] = value;
	};

	return {
		get: get,
		set: set
	};
})();
