Services.Title = (function () {
	'use strict';

	function setTitle(title, paused) {
		var titlePrefix = '';
		if (!paused) {
			// black square character
			titlePrefix = '\u25A0 ';
		}

		document.title = titlePrefix + title + ' – ' + Config.get('appName');
	}

	function resetTitle() {
		document.title = Config.get('appName');
	}

	return {
		setTitle: setTitle,
		resetTitle: resetTitle
	};
})();
