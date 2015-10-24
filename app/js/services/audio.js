TT.Services.Audio = (function () {
	'use strict';

	var audio;

	function init() {
		audio = document.createElement('audio');
		// @source: http://soundbible.com/1619-Music-Box.html
		audio.src = 'audio/ding.mp3';
	}

	function play() {
		audio.play();
	}

	function setVolume(volume) {
		if (!(volume <= 1 && volume >= 0)) {
			volume = 1;
		}

		audio.volume = volume;
	}

	return {
		init: init,
		play: play,
		setVolume: setVolume
	};
})();
