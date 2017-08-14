;(function(window, document) {
  var docEl = document.documentElement;
  var viewportEl = document.querySelector('meta[name="viewport"]');
  var dpr = 0;
  var scale = 0;
  var tid = ''

  if (viewportEl) {
    console.warn('将根据已有的viewport来设置缩放比例');
    var match = viewportEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
    if (match) {
      scale = parseFloat(match[1]);
      dpr = parseInt(1 / scale);
    }
  } else {
    dpr = window.devicePixelRatio || 1;
    dpr = dpr >= 3 ? 3 : ( dpr >=2 ? 2 : 1 );
    scale = 1 / dpr;
  }

  docEl.setAttribute('data-dpr', dpr);
  var scaleContent = 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no';

  if (!viewportEl) {
    viewportEl = document.createElement('meta');
    viewportEl.setAttribute('name', 'viewport');
    viewportEl.setAttribute('content', scaleContent);
    document.head.appendChild(viewportEl);

  } else {
    viewportEl.setAttribute('content', scaleContent);
  }

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width || window.innerWidth;
    if (width / dpr > 540) {
      width = 540 * dpr;
    }
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
  }

  window.addEventListener('resize', function(e) {
    window.clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  }, false);

  window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      window.clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false)

  refreshRem();

})(window, document);
