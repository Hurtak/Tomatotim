views.favicon = (function() {
  'use strict';

  var init = function() {
    // When we change .ico favicon, IE switches to otherwise unsused .png icons,
    // instead of using the changed one. If we remove these icons, dynamic
    // favicon change works.
    if (browserDetection.isIE) {
      var del = document.querySelectorAll('[data-js-favicon-explorer]');

      for (var i = 0; i < del.length; i++) {
        document.head.removeChild(del[i]);
      }
    }
  };

  /**
   * types: 'work', 'break', 'longbreak'
   */
  var setFavicon = function(type) {
    var icon;
    if (browserDetection.isFirefox || browserDetection.isIE) {
      icon = document.getElementById('favicon-ico');

      icon.rel = 'shortcut icon';
      icon.href = 'icons/favicon-' + type + '.ico';
      icon.id = 'favicon-ico';
    } else {
      // chrome, opera
      // TODO: test with Safari
      icon = document.createElement('link');
      var oldIcon = document.getElementById('favicon-png');

      icon.rel = 'icon';
      icon.setAttribute('type', 'image/png'); // TODO: maybe remove these?
      icon.href = '/icons/favicon-16x16-' + type + '.png';
      icon.setAttribute('sizes', '16x16'); // TODO: maybe remove these?
      icon.id = 'favicon-png';

      if (oldIcon) {
        document.head.removeChild(oldIcon);
      }

      document.head.appendChild(icon);
    }

  };

  return {
    init: init,
    setFavicon: setFavicon
  };

}());
