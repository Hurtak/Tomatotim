views.title = (function() {
  'use strict';

  var appName = document.title;

  // TODO: check if this line is needed
  document.head = document.head || document.getElementsByTagName('head')[0];

  var changeFavicon = function(src) {
    var link = document.createElement('link'),
    oldLink = document.getElementById('dynamic-favicon');

    link.rel = 'icon';
    link.setAttribute('type', 'image/png'); // TODO: maybe remove these?
    link.href = src;
    link.setAttribute('sizes', '16x16'); // TODO: maybe remove these?
    link.id = 'dynamic-favicon';

    if (oldLink) {
      document.head.removeChild(oldLink);
    }

    document.head.appendChild(link);
  };

  var setTitle = function(title) {
    document.title = title + ' – ' + appName;
  };

  var setFaviconToWork = function() {
    changeFavicon('/icons/favicon-16x16.png');
  };

  var setFaviconToBreak = function() {
    changeFavicon('/icons/favicon-16x16-break.png');
  };

  var setFaviconToLongBreak = function() {
    changeFavicon('/icons/favicon-16x16-break-big.png');
  };

  return {
    setTitle: setTitle,
    setFaviconToWork: setFaviconToWork,
    setFaviconToBreak: setFaviconToBreak,
    setFaviconToLongBreak: setFaviconToLongBreak
  };

}());
