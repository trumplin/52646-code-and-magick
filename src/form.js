'use strict';
var browserCookies = require('browser-cookies');
var MYDATE = 9;
var MYMONTH = 6;
var DEFAULTMARK = 3;

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var reviewMark = document.getElementsByName('review-mark');
  var reviewName = document.querySelector('.review-form-field-name');
  var reviewText = document.querySelector('.review-form-field-text');
  var labelText = document.querySelector('.review-fields-text');
  var labelName = document.querySelector('.review-fields-name');
  var submitButton = document.querySelector('.review-submit');
  var labelReviewFields = document.querySelector('.review-fields');
  var selectedReviewMark = browserCookies.get('mark') || DEFAULTMARK;
  reviewName.value = browserCookies.get('name') || '';
  reviewName.oninput = check;
  reviewText.oninput = check;

  for (var i = 0; i < reviewMark.length; i++) {
    if (reviewMark[i].value === selectedReviewMark) {
      reviewMark[i].checked = true;
      break;
    }
  }

  check();

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  submitButton.onclick = function(evt) {
    evt.preventDefault();
    var expires = getExpires();
    browserCookies.set('mark', selectedReviewMark, {expires: expires});
    browserCookies.set('name', reviewName.value, {expires: expires});
  };

  function getExpires() {
    var now = new Date();
    var currentDate = now.getDate();
    var currentMonth = now.getMonth();
    var currentYear = now.getFullYear();
    var myYear;
    if (currentMonth >= MYMONTH && currentDate >= MYDATE) {
      myYear = currentYear;
    } else {
      myYear = currentYear - 1;
    }
    var birthday = new Date(myYear, MYMONTH, MYDATE);
    var difference = Math.floor((now - birthday) / (1000 * 60 * 60 * 24));
    return difference;
  }

  for (var y = 0; y < reviewMark.length; y++) {
    reviewMark[y].onclick = function() {
      selectedReviewMark = this.value;
      if (selectedReviewMark < 3 ) {
        reviewText.required = true;
        if (reviewText.value === '') {
          labelReviewFields.style.visibility = 'visible';
          labelText.innerHTML = 'отзыв';
          submitButton.disabled = true;
        } else{
          check();
        }
      } else {
        labelReviewFields.style.visibility = 'hidden';
        labelText.innerHTML = '';
        check();
      }
    };
  }

  function check() {
    if (reviewName.value) {
      labelName.innerHTML = '';
    } else {
      labelName.innerHTML = 'имя';
    }

    if ((selectedReviewMark < 3) && (reviewText.value === '')) {
      labelText.innerHTML = 'отзыв';
    } else {
      labelText.innerHTML = '';
    }

    if (labelName.innerHTML === '' && labelText.innerHTML === '') {
      submitButton.disabled = false;
      labelReviewFields.style.visibility = 'hidden';
    } else{
      submitButton.disabled = true;
      labelReviewFields.style.visibility = 'visible';
    }
  }
})();
