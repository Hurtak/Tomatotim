window.Sidebar = (function () {
	'use strict';

	function init() {
		Views.Sidebar.getSidebarButton().addEventListener('click', Views.Sidebar.toogleSidebar);
		Views.Sidebar.getSidebarOverlay().addEventListener('click', Views.Sidebar.closeSidebar);
	}

	return {
		init: init
	};
})();
