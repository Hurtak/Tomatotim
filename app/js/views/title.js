views.title = (function() {
  'use strict';

  var appName = document.title;

  var setTitle = function(title) {
    document.title = title + ' – ' + appName;
  };

  var resetTitle = function () {
    document.title = appName;
  };

  return {
    setTitle: setTitle,
    resetTitle: resetTitle
  };

}());
