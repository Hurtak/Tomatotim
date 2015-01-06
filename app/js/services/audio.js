services.audio = (function() {
  'use strict';

  var audio;

  var init = function() {
    audio = document.createElement('audio');
    audio.src = 'audio/ding.mp3'; // http://soundbible.com/1619-Music-Box.html
  };

  var play = function() {
    audio.play();
  };

  var setVolume = function(volume) {
    if (!(volume <= 1 && volume >= 0)) {
      volume = 1;
    }

    audio.volume = volume;
  };

  return {
    init: init,
    play: play,
    setVolume: setVolume
  };

}());
