views.sidebar = (function() {
  'use strict';

  // TODO: maybe this should be inside init function?
  var sidebarButton = document.getElementById('sidebar-button');

  var sidebarOpen = false;

  var toogleSidebar = function() {
    if (!sidebarOpen) {
      document.body.setAttribute('data-sidebar-open', '');
    } else {
      document.body.removeAttribute('data-sidebar-open');
    }
    sidebarOpen = !sidebarOpen;
  };

  var getSidebarButton = function () {
    return sidebarButton;
  };

  return {
    getSidebarButton: getSidebarButton,
    toogleSidebar: toogleSidebar
  };

}());
