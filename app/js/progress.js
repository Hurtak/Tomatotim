var progress = (function() {
  'use strict';

  var init = function() {
    for (var i = 0; i < config.repeat; i++) {
      views.progress.createImage('unfinished');
    }
  };

  return {
    init: init
  };

}());
