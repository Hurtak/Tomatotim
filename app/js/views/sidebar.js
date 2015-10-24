Views.Sidebar = (function () {
	'use strict';

	var sidebarOpen = false;

	var sidebarButton = document.getElementById('sidebar-button');
	var sidebarOverlay = document.getElementById('sidebar-overlay');

	function getSidebarOverlay() {
		return sidebarOverlay;
	}

	function getSidebarButton() {
		return sidebarButton;
	}

	function openSidebar() {
		if (!sidebarOpen) {
			document.body.setAttribute('data-sidebar-open', '');
			sidebarOpen = true;
		}
	}

	function closeSidebar() {
		if (sidebarOpen) {
			document.body.removeAttribute('data-sidebar-open');
			sidebarOpen = false;
		}
	}

	function toogleSidebar() {
		if (sidebarOpen) {
			closeSidebar();
		} else {
			openSidebar();
		}
	}

	function isSidebarOpen() {
		return sidebarOpen;
	}

	return {
		getSidebarOverlay: getSidebarOverlay,
		getSidebarButton: getSidebarButton,
		isSidebarOpen: isSidebarOpen,
		closeSidebar: closeSidebar,
		toogleSidebar: toogleSidebar
	};
})();
