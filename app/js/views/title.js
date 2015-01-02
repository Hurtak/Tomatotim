views.title = (function() {
  'use strict';

  var appName = document.title;

  var setTitle = function(title, paused) {
    var titlePrefix = '';
    if (!paused) {
      titlePrefix = '\u25A0 ';
    }

    document.title = titlePrefix + title + ' – ' + appName;
  };

  var resetTitle = function () {
    document.title = appName;
  };

  return {
    setTitle: setTitle,
    resetTitle: resetTitle
  };

}());
