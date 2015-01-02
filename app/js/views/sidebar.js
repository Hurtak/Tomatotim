views.sidebar = (function() {
  'use strict';

  // TODO: maybe this should be inside init function?
  var sidebarButton = document.getElementById('sidebar-button');

  var sidebarOpen = false;

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
    getSidebarButton: getSidebarButton,
    closeSidebar: closeSidebar,
    toogleSidebar: toogleSidebar
  };

}());
