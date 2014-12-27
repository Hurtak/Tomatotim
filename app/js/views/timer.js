var timer = (function() {
  'use strict';

  var _getTimeDiv = function() {
    return document.getElementById('clock');
  };

  var getTime = function() {
    return _getTimeDiv().innerHTML.trim();
  };

  var setTime = function(time) {
    _getTimeDiv().innerHTML = time;
  };

  return {
    getTime: getTime,
    setTime: setTime
  };

}());
