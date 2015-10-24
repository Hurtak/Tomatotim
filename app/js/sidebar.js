TT.Sidebar = (function () {
	'use strict';

	function init() {
		TT.Views.Sidebar.getSidebarButton().addEventListener('click', TT.Views.Sidebar.toogleSidebar);
		TT.Views.Sidebar.getSidebarOverlay().addEventListener('click', TT.Views.Sidebar.closeSidebar);
	}

	return {
		init: init
	};
})();
