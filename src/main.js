'use strict';

(function() {
  require('./reviews');
  require('./form');
  require('./game');



  var gallery = require('./gallery');
  var imagesBlock = document.querySelector('.photogallery');
  var images = imagesBlock.querySelectorAll('img');

  imagesBlock.addEventListener('click', onImageClick);
  gallery.setImagesList(images);

  var getIndexOfImage = function(curruent) {
    for( var i = 0; i < images.length; i++) {
      if (curruent === images[i].src) {
        break;
      }
    }
    return i;
  };

  function onImageClick(evt) {
    if (evt.target.tagName === 'IMG') {
      var index = getIndexOfImage(evt.target.currentSrc);
      gallery.showGallary(index);
    }
  }

})();
