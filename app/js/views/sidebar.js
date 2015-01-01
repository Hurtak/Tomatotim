views.sidebar = (function() {
  'use strict';

  // TODO: maybe this should be inside init function?
  var sidebarButton = document.getElementById('sidebar-button');
  var sidebar = document.getElementById('sidebar');

  var sidebarOpen = false;

  var toogleSidebar = function() {
    if (!sidebarOpen) {
      sidebar.setAttribute('data-sidebar-open', '');
    } else {
      sidebar.removeAttribute('data-sidebar-open');
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
