Services.TaskbarFlash = (function() {
  'use strict';

  var flash = function() {
    try {
      if (window.external.msIsSiteMode()) { // is website pinned to taskbar
        window.external.msSiteModeActivate();
      }
    } catch (e) {

    }
  };

  return {
    flash: flash
  };

}());
