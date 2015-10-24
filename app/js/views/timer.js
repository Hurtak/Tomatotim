Views.Timer = (function () {
	'use strict';

	var timerDiv = document.getElementById('clock');

	function getTime() {
		return timerDiv.innerHTML.trim();
	}

	function setTime(time) {
		timerDiv.innerHTML = time;
	}

	return {
		getTime: getTime,
		setTime: setTime
	};
})();
