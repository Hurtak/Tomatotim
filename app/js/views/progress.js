views.progress = (function() {
  'use strict';

  var imagesWrapper = document.getElementById('progress');
  var images = imagesWrapper.getElementsByTagName('img');

  var description = document.getElementById('description');

  var imagesAlt = {
    'unfinished': 'Unfinished interval',
    'work': 'Work interval',
    'break': 'Break interval',
    'longbreak': 'Long break interval',
    'finished' : 'Finished interval'
  };

  var setImageType = function(type, index) {
    images[index].src = 'img/tomato-' + type + '.png';
    images[index].alt = imagesAlt[type];
  };

  var resetProgress = function() {
    for (var index = 0; index < images.length; index++) {
      setImageType('unfinished', index);
    }
  };

  var createImage = function(type, width, height) {
    var img = document.createElement('img');

    img.src = 'img/tomato-' + type + '.png';
    img.width = width;
    img.height = height;
    img.alt = imagesAlt[type];

    imagesWrapper.appendChild(img);

  };

  var functionName = function() {

  };

  return {
    setImageType: setImageType,
    resetProgress: resetProgress,
    createImage: createImage
  };

}());
