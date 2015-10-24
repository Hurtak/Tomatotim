TT.Hotkeys = (function () {
	'use strict';

	var keys = {
		space: 32,
		enter: 13,
		esc: 27,
		tab: 9,
		r: 82,
		s: 83,
		h: 72
	};

	function init() {
		document.addEventListener('keydown', keyDown);
	}

	function keyDown(e) {
		switch (e.keyCode) {
			case keys.space:
				e.preventDefault();
				TT.Timer.startTimer();
				break;
			case keys.esc:
				TT.Views.Sidebar.closeSidebar();
				break;
			case keys.r:
				TT.Timer.resetTimer();
				break;
			case keys.s:
				TT.Timer.skipInterval();
				break;
			case keys.h:
				TT.Views.Sidebar.toogleSidebar();
				break;
			case keys.tab:
				if (!TT.Views.Sidebar.isSidebarOpen()) {
					e.preventDefault();
				}
				break;
			case keys.enter:
				e.preventDefault();
				break;
			default:
				break;
		}
	}

	return {
		init: init
	};
})();
