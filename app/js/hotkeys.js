var Hotkeys = (function() {
  'use strict';

  var keys = {
    space: 32,
    enter: 13,
    esc: 27,
    tab: 9,
    r: 82,
    s: 83,
    h: 72
  };

  var init = function() {
    document.addEventListener('keydown', keyDown);
  };

  var keyDown = function(e) {
    e = e || window.event;

    switch (e.keyCode) {
      case keys.space:
        e.preventDefault();
        Timer.startTimer();
        break;
      case keys.esc:
        Views.Sidebar.closeSidebar();
        break;
      case keys.r:
        Timer.resetTimer();
        break;
      case keys.s:
        Timer.skipInterval();
        break;
      case keys.h:
        Views.Sidebar.toogleSidebar();
        break;
      case keys.tab:
        if (!Views.Sidebar.isSidebarOpen()) {
          e.preventDefault();
        }
        break;
      case keys.enter:
        e.preventDefault();
        break;
      default:
        break;
    }
  };

  return {
    init: init
  };

}());
