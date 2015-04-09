Services.TaskbarFlash = (function() {
  'use strict';

  var isAvaliable = function() {
    return typeof window.external.msIsSiteMode !== 'undefined' &&
           window.external.msIsSiteMode() && // is webpage pinned to taskbar
           typeof window.external.msSiteModeActivate !== 'undefined';
  };

  var flash = function() {
    if (isAvaliable()) {
      window.external.msSiteModeActivate();
    }
  };

  return {
    isAvaliable: isAvaliable,
    flash: flash
  };

})();
