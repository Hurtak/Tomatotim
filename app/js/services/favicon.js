TT.Services.Favicon = (function () {
	'use strict';

	var icon = document.getElementById('favicon-ico');

	function init() {
		// When we change .ico favicon, IE switches to otherwise unused .png icons,
		// instead of using the changed one. If we remove these icons, dynamic
		// favicon change works.
		if (TT.Services.BrowserDetection.isIE) {
			var favicons = document.querySelectorAll('[data-favicon-explorer]');

			for (var index = 0; index < favicons.length; index++) {
				document.head.removeChild(favicons[index]);
			}
		}
	}

	// type: 'work', 'break', 'longbreak'
	function setFavicon(type) {
		// Firefox: only uses .ico, changing href changes the icon
		// Chrome: we need to delete icon and create new one

		if (TT.Services.BrowserDetection.isFirefox || TT.Services.BrowserDetection.isIE) {
			icon.rel = 'shortcut icon';
			icon.href = 'icons/favicon-' + type + '.ico';
			icon.id = 'favicon-ico';
		} else {
			// chrome, opera
			// TODO: test with Safari
			icon = document.createElement('link');

			icon.rel = 'icon';
			// TODO: maybe remove these?
			icon.setAttribute('type', 'image/png');
			icon.href = 'icons/favicon-16x16-' + type + '.png';
			// TODO: maybe remove these?
			icon.setAttribute('sizes', '16x16');
			icon.id = 'favicon-png';

			var oldIcon = document.getElementById('favicon-png');
			if (oldIcon) {
				document.head.removeChild(oldIcon);
			}

			document.head.appendChild(icon);
		}
	}

	return {
		init: init,
		setFavicon: setFavicon
	};
})();
