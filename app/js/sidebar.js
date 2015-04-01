var Sidebar = (function() {
  'use strict';

  var init = function() {
    Views.Sidebar.getSidebarButton().addEventListener('click', Views.Sidebar.toogleSidebar);
    Views.Sidebar.getSidebarOverlay().addEventListener('click', Views.Sidebar.closeSidebar);
  };

  return {
    init: init
  };

}());
