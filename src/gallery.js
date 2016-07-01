'use strict';

(function() {

  var gallaryBlock = document.querySelector('.overlay-gallery');
  var imagePreview = gallaryBlock.querySelector('.overlay-gallery-preview');
  var array = [];
  var indexImage;
  var oldImage;


  var setGallaryEnabled = function() {
    gallaryBlock.addEventListener('click', onCloseClick);
    gallaryBlock.addEventListener('click', onLeftClick);
    gallaryBlock.addEventListener('click', onRightClick);
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

  function getIndexOfImage(curruent) {
    for( var i = 0; i < array.length; i++) {
      if (curruent === array[i]) {
        indexImage = i;
        break;
      }
    }
    return indexImage;
  }


  function onLeftClick(evt) {
    if (evt.target.className === 'overlay-gallery-control overlay-gallery-control-left') {
      if (indexImage > 0) {
        showImage(array[indexImage - 1], true);
        indexImage -= 1;
      } else {
        showImage(array[array.length - 1], true);
        indexImage = array.length - 1;
      }
    }
  }


  function onRightClick(evt) {
    if (evt.target.className === 'overlay-gallery-control overlay-gallery-control-right') {
      if (indexImage < 5) {
        showImage(array[indexImage + 1], true);
        indexImage += 1;
      } else {
        showImage(array[0], true);
        indexImage = 0;
      }
    }
  }

  var showImage = function(picture, flag) {
    var image = new Image();
    image.src = picture;
    if (flag) {
      imagePreview.replaceChild(image, oldImage);
    }
    oldImage = imagePreview.appendChild(image);
  };

  module.exports.showGallary = function(picture) {
    getIndexOfImage(picture);
    gallaryBlock.classList.remove('invisible');
    showImage(picture);
    setGallaryEnabled();
  };

  var hideGallary = function() {
    gallaryBlock.classList.add('invisible');
    imagePreview.removeChild(oldImage);
    gallaryBlock.removeEventListener('click', onCloseClick);
    gallaryBlock.removeEventListener('click', onLeftClick);
    gallaryBlock.removeEventListener('click', onRightClick);
    window.removeEventListener('keydown', onDocumentKeyDown);
  };
})();
