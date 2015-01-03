views.sidebar = (function() {
  'use strict';

  // TODO: maybe this should be inside init function?
  var sidebarButton = document.getElementById('sidebar-button');
  var sidebarOverlay = document.getElementById('sidebar-overlay');

  var sidebarOpen = false;

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

  return {
    getSidebarOverlay: getSidebarOverlay,
    getSidebarButton: getSidebarButton,
    closeSidebar: closeSidebar,
    toogleSidebar: toogleSidebar
  };

}());
