services.storage = (function() {
  'use strict';

  var get = function(storageName) {
    // return JSON.parse(localStorage.getItem(storageName) || '[]');
    return JSON.parse(localStorage.getItem(storageName));
  };

  var set = function(storageName, value) {
    localStorage.setItem(storageName, JSON.stringify(value));
  };

  return {
    set: set,
    get: get
  };

}());
