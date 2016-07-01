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

  function onImageClick(evt) {
    if (evt.target.tagName === 'IMG') {
      var index = gallery.getIndexOfImage(evt.target.currentSrc);
      gallery.showGallary(index);
    }
  }

})();
