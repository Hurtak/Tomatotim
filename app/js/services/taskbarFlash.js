TT.Services.TaskbarFlash = (function () {
	'use strict';

	// TODO: fix, doesent work for android
	function isAvaliable() {
		return typeof window.external.msIsSiteMode !== 'undefined' &&
			// is webpage pinned to taskbar
			window.external.msIsSiteMode() &&
			typeof window.external.msSiteModeActivate !== 'undefined';
	}

	function flash() {
		if (isAvaliable()) {
			window.external.msSiteModeActivate();
		}
	}

	return {
		isAvaliable: isAvaliable,
		flash: flash
	};
})();
