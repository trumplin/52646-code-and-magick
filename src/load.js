'use strict';
(function() {
  module.exports = function(url, element, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function(evt) {
      var loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
    };

    xhr.onerror = function() {
      element.classList.add('reviews-load-failure');
    };

    xhr.open('GET', url);
    xhr.send();
  };

})();
