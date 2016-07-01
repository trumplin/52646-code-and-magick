'use strict';

(function() {
  require('./reviews');
  require('./form');
  require('./game');
  var gallery = require('./gallery');
  var imagesBlock = document.querySelector('.photogallery');
  var images = imagesBlock.querySelectorAll('img');

  imagesBlock.addEventListener('click', onImageClick);

  function onImageClick(evt) {
    if (evt.target.tagName === 'IMG') {
      gallery.setImagesList(images);
      gallery.showGallary(evt.target.currentSrc);
    }
  }

})();
