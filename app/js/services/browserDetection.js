Services.BrowserDetection = (function() {
  'use strict';

  // browser detection from http://stackoverflow.com/a/9851769/2955574

  var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  var isFirefox = typeof InstallTrigger !== 'undefined';
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
  var isChrome = !!window.chrome && !isOpera;
  var isIE = /*@cc_on!@*/false || !!document.documentMode;

  return {
    isOpera: isOpera,
    isFirefox: isFirefox,
    isSafari: isSafari,
    isChrome: isChrome,
    isIE: isIE
  };

}());
