views.sidebar = (function() {
  'use strict';

  var sidebarOpen = false;

  var sidebarButton = document.getElementById('sidebar-button');
  var sidebarOverlay = document.getElementById('sidebar-overlay');

  var getSidebarOverlay = function () {
    return sidebarOverlay;
  };

  var getSidebarButton = function () {
    return sidebarButton;
  };

  var openSidebar = function () {
    if (!sidebarOpen) {
      document.body.setAttribute('data-sidebar-open', '');
      sidebarOpen = true;
    }
  };

  var closeSidebar = function () {
    if (sidebarOpen) {
      document.body.removeAttribute('data-sidebar-open');
      sidebarOpen = false;
    }
  };

  var toogleSidebar = function() {
    if (sidebarOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };

  var isSidebarOpen = function() {
    return sidebarOpen;
  };

  return {
    getSidebarOverlay: getSidebarOverlay,
    getSidebarButton: getSidebarButton,
    isSidebarOpen: isSidebarOpen,
    closeSidebar: closeSidebar,
    toogleSidebar: toogleSidebar
  };

}());
