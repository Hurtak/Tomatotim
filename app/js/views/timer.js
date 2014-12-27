views.timer = (function() {
  'use strict';

  var getTimeDiv = function() {
    return document.getElementById('clock');
  };

  var getTime = function() {
    return getTimeDiv().innerHTML.trim();
  };

  var setTime = function(time) {
    getTimeDiv().innerHTML = time;
  };

  return {
    getTime: getTime,
    setTime: setTime
  };

}());
