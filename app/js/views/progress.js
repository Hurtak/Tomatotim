TT.Views.Progress = (function () {
	'use strict';

	var imagesWrapper = document.getElementById('progress');
	var images = imagesWrapper.getElementsByTagName('i');

	var description = document.getElementById('description');

	var imagesTitle = {
		unfinished: 'Unfinished interval',
		work: 'Work interval',
		break: 'Break interval',
		longbreak: 'Long break interval',
		finished: 'Finished interval'
	};

	function setImageType(type, index) {
		images[index].className = 'icon-tomato color-' + type;
		images[index].title = imagesTitle[type];
	}

	function resetProgress() {
		setDescription('');

		for (var index = 0; index < images.length; index++) {
			setImageType('unfinished', index);
		}
	}

	function createImage(type) {
		var i = document.createElement('i');
		i.className = 'icon-tomato color-' + type;
		i.title = imagesTitle[type];
		imagesWrapper.appendChild(i);
	}

	function removeImages() {
		while (imagesWrapper.firstChild) {
			imagesWrapper.removeChild(imagesWrapper.firstChild);
		}
	}

	function setDescription(text) {
		description.innerHTML = text;
	}

	return {
		setDescription: setDescription,
		setImageType: setImageType,
		resetProgress: resetProgress,
		createImage: createImage,
		removeImages: removeImages
	};
})();
