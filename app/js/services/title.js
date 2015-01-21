Services.Title = (function() {
  'use strict';

  var setTitle = function(title, paused) {
    var titlePrefix = '';
    if (!paused) {
      titlePrefix = '\u25A0 '; // black square character
    }

    document.title = titlePrefix + title + ' – ' + Config.appName;
  };

  var resetTitle = function() {
    document.title = Config.appName;
  };

  return {
    setTitle: setTitle,
    resetTitle: resetTitle
  };

}());
