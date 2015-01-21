Views.Timer = (function() {
  'use strict';

  var timerDiv = document.getElementById('clock');

  var getTime = function() {
    return timerDiv.innerHTML.trim();
  };

  var setTime = function(time) {
    timerDiv.innerHTML = time;
  };

  return {
    getTime: getTime,
    setTime: setTime
  };

}());
