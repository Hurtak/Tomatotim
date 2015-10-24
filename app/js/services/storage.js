TT.Services.Storage = (function () {
	'use strict';

	function get(storageName) {
		return JSON.parse(localStorage.getItem(storageName));
	}

	function set(storageName, value) {
		localStorage.setItem(storageName, JSON.stringify(value));
	}

	function clear() {
		localStorage.clear();
	}

	return {
		set: set,
		get: get,
		clear: clear
	};
})();
