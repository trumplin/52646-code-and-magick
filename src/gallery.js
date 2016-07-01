'use strict';

(function() {

  var galleryBlock = document.querySelector('.overlay-gallery');
  var imagePreview = galleryBlock.querySelector('.overlay-gallery-preview');
  var array = [];
  var indexImage;
  var oldImage;


  var setGallaryEnabled = function() {
    galleryBlock.addEventListener('click', onCloseClick);
    galleryBlock.addEventListener('click', onLeftClick);
    galleryBlock.addEventListener('click', onRightClick);
    window.addEventListener('keydown', onDocumentKeyDown);
  };


  function onCloseClick(evt) {
    if (evt.target.className === 'overlay-gallery-close') {
      hideGallary();
    }
  }

  function onDocumentKeyDown(evt) {
    if (evt.keyCode === 27) {
      hideGallary();
    }
  }

  module.exports.setImagesList = function(images) {
    for( var i = 0; i < images.length; i++) {
      array[i] = images[i].src;
    }
  };

  function onLeftClick(evt) {
    if (evt.target.className === 'overlay-gallery-control overlay-gallery-control-left') {
      if (indexImage > 0) {
        indexImage -= 1;
        showImage(indexImage, true);

      } else {
        indexImage = array.length - 1;
        showImage(array.length - 1, true);
      }
    }
  }


  function onRightClick(evt) {
    if (evt.target.className === 'overlay-gallery-control overlay-gallery-control-right') {
      if (indexImage < 5) {
        indexImage += 1;
        showImage(indexImage, true);

      } else {
        indexImage = 0;
        showImage(indexImage, true);

      }
    }
  }

  var showImage = function(index, flag) {
    var image = new Image();
    image.src = array[index];
    if (flag) {
      imagePreview.replaceChild(image, oldImage);
    }
    oldImage = imagePreview.appendChild(image);
  };

  module.exports.showGallary = function(index) {
    indexImage = index;
    galleryBlock.classList.remove('invisible');
    showImage(index);
    setGallaryEnabled();
  };

  var hideGallary = function() {
    galleryBlock.classList.add('invisible');
    imagePreview.removeChild(oldImage);
    galleryBlock.removeEventListener('click', onCloseClick);
    galleryBlock.removeEventListener('click', onLeftClick);
    galleryBlock.removeEventListener('click', onRightClick);
    window.removeEventListener('keydown', onDocumentKeyDown);
  };
})();
