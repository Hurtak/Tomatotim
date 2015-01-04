views.favicon = (function() {
  'use strict';

  /**
   * types: 'work', 'break', 'longbreak'
   */
  var setFavicon = function(type) {
    var link = document.createElement('link'),
    oldLink = document.getElementById('dynamic-favicon');

    link.rel = 'icon';
    link.setAttribute('type', 'image/png'); // TODO: maybe remove these?
    link.href = '/icons/favicon-16x16-' + type + '.png';
    link.setAttribute('sizes', '16x16'); // TODO: maybe remove these?
    link.id = 'dynamic-favicon';

    if (oldLink) {
      document.head.removeChild(oldLink);
    }

    document.head.appendChild(link);
  };

  return {
    setFavicon: setFavicon
  };

}());
