Services.Storage = (function() {
  'use strict';

  var get = function(storageName) {
    return JSON.parse(localStorage.getItem(storageName));
  };

  var set = function(storageName, value) {
    localStorage.setItem(storageName, JSON.stringify(value));
  };

  var clear = function() {
    localStorage.clear();
  };

  return {
    set: set,
    get: get,
    clear: clear
  };

})();
