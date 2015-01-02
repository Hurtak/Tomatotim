var binding = (function() {
  'use strict';

  var keys = {
    space: 32,
    esc: 27,
    tab: 9,
    r: 82,
    s: 83,
    h: 72
  };

  var init = function () {

    views.timerControls.getStartButton().addEventListener('click', timer.startTimer);
    views.timerControls.getSkipButton().addEventListener('click', timer.skipInterval);
    views.timerControls.getResetButton().addEventListener('click', timer.resetTimer);

    views.sidebar.getSidebarButton().addEventListener('click', views.sidebar.toogleSidebar);

    document.addEventListener('keydown', keyDown);

  };

  var keyDown = function (e) {
    e = window.event || e; // TODO: is this necessary?

    switch (e.keyCode) {
      case keys.space:
        e.preventDefault();
        timer.startTimer();
        break;
      case keys.esc:
        views.sidebar.closeSidebar();
        break;
      case keys.r:
        timer.resetTimer();
        break;
      case keys.s:
        timer.skipInterval();
        break;
      case keys.h:
        views.sidebar.toogleSidebar();
        break;
      case keys.tab:
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
