services.title = (function() {
  'use strict';

  var setTitle = function(title, paused) {
    var titlePrefix = '';
    if (!paused) {
      titlePrefix = '\u25A0 '; // black square character
    }

    document.title = titlePrefix + title + ' – ' + config.appName;
  };

  var resetTitle = function () {
    document.title = config.appName;
  };

  return {
    setTitle: setTitle,
    resetTitle: resetTitle
  };

}());
