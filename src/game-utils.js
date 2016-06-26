'use strict';

var shiftBackground = 0;

module.exports.cloudLeftRight = function(element, scroll, imageBackgroundWidth) {
  var screenWidth = element.getBoundingClientRect().right - element.getBoundingClientRect().left;
  var leftImageCoordinate = Math.floor((screenWidth / 2 ) - ( imageBackgroundWidth / 2 ));
  if (window.pageYOffset > scroll) {
    element.style.backgroundPositionX = leftImageCoordinate + shiftBackground + 'px';
    shiftBackground -= 1;
  } else {
    element.style.backgroundPositionX = leftImageCoordinate + shiftBackground + 'px';
    shiftBackground += 1;
  }
};
