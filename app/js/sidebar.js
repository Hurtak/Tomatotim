var sidebar = (function() {
  'use strict';

  var init = function() {
    views.sidebar.getSidebarButton().addEventListener('click', views.sidebar.toogleSidebar);
    views.sidebar.getSidebarOverlay().addEventListener('click', views.sidebar.closeSidebar);
  };

  return {
    init: init
  };

}());

