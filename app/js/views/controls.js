Views.Controls = (function () {
	'use strict';

	// true == start state, false == pause state
	var startButtonState = true;

	var startButton = document.getElementById('start');
	var resetButton = document.getElementById('reset');
	var skipButton = document.getElementById('skip');

	var startButtonIcon = document.getElementById('start-icon');
	var startButtonCaption = document.getElementById('start-caption');

	function toogleStartButtonCaption() {
		if (startButtonState) {
			startButtonCaption.innerHTML = 'pause';
			startButtonIcon.className = 'icon-pause-1';
		} else {
			startButtonCaption.innerHTML = 'start';
			startButtonIcon.className = 'icon-play-1';
		}

		startButtonState = !startButtonState;
	}

	function resetStartButton() {
		if (!startButtonState) {
			toogleStartButtonCaption();
		}
	}

	function getStartButton() {
		return startButton;
	}

	function getResetButton() {
		return resetButton;
	}

	function getSkipButton() {
		return skipButton;
	}

	return {
		getStartButton: getStartButton,
		getResetButton: getResetButton,
		getSkipButton: getSkipButton,
		resetStartButton: resetStartButton,
		toogleStartButtonCaption: toogleStartButtonCaption
	};
})();
