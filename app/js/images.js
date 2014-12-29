var images = (function() {
  'use strict';

  var init = function() {
    for (var i = 0; i < config.repeat; i++) {
      views.images.createImage('black', 100, 100, 'Unfinished interval');
    }
  };

  return {
    init: init
  };

}());
