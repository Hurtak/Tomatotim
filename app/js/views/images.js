views.images = (function() {
  'use strict';

  var images = document.querySelectorAll('#progress img');

  var setImageType = function(type, index) {
    var imgName;
    var imgAlt;
    if (type === 'unfinished') {
      imgName = 'black';
      imgAlt = 'Unfinished interval';
    } else if (type === 'finished') {
      imgName = 'white';
      imgAlt = 'Finished interval';
    } else if (type === 'work') {
      imgName = 'red';
      imgAlt = 'Work interval';
    } else if (type === 'break') {
      imgName = 'green';
      imgAlt = 'Break interval';
    } else if (type === 'bigBreak') {
      imgName = 'blue';
      imgAlt = 'Long break interval';
    }

    images[index].src = 'img/tomato-' + imgName + '.png';
    images[index].alt = imgAlt;

  };

  var resetImages = function() {
    for (var index = 0; index < images.length; index++) {
      setImageType('unfinished', index);
    }
  };

  return {
    setImageType: setImageType,
    resetImages: resetImages
  };

}());
