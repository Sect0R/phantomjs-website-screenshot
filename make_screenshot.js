/**
 * Render url to stdout using phantomjs. 
 * Add support CSS.supports() method
 */

var page = require('webpage').create();
var system = require('system');

if (!system.args[1] || ( system.args[1].indexOf('http') === -1 && system.args[1].indexOf('file://') === -1) ) {
  console.error('Url is required')
}

//viewportSize being the actual size of the headless browser
page.viewportSize = {
  width: 1024,
  height: 768
};

//the clipRect is the portion of the page you are taking a screenshot of
page.clipRect = {
  top: 0,
  left: 0,
  width: 1024,
  height: 768
};

page.onInitialized = function () {
  var includeCSSsupports = page.evaluate(function(){
    return eval('"CSS"in window||(window.CSS={});"supports"in window.CSS||(window.CSS._cacheSupports={},window.CSS.supports=function(a,f){var b=[a,f].toString();return b in window.CSS._cacheSupports?window.CSS._cacheSupports[b]:window.CSS._cacheSupports[b]=function(c,b){var e=document.createElement("div").style;if("undefined"==typeof b){var d=function(b,a){var c=b.split(a);if(1<c.length)return c.map(function(b,a,c){return 0==a%2?b+c[a+1]:""}).filter(Boolean)},a=d(c,/([)])\s*or\s*([(])/gi);if(a)return a.some(function(a){return window.CSS.supports(a)});if(d=d(c,/([)])\s*and\s*([(])/gi))return d.every(function(a){return window.CSS.supports(a)});e.cssText=c.replace("(","").replace(/[)]$/,"")}else e.cssText=c+":"+b;return!!e.length}(a,f)});');
  });
}

page.open(system.args[1], function (status) {

  if (status === "success") {
    
    setTimeout(function() {
    
      page.render('/dev/stdout', {
        format: 'jpg',
        quality: 100
      });

      phantom.exit();
    }, 1000);
  }
});
