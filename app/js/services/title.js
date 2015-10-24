TT.Services.Title = (function () {
	'use strict';

	function setTitle(title, paused) {
		var titlePrefix = '';
		if (!paused) {
			// black square character
			titlePrefix = '\u25A0 ';
		}

		document.title = titlePrefix + title + ' – ' + TT.Config.get('appName');
	}

	function resetTitle() {
		document.title = TT.Config.get('appName');
	}

	return {
		setTitle: setTitle,
		resetTitle: resetTitle
	};
})();
