'use strict';

module.exports.isNextPageAvailable = function(review, page, pageSize) {
  return (page + 1) < (Math.ceil(review.length / pageSize));
};


module.exports.load = function(url, element, callback) {
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
