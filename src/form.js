'use strict';

(function() {
  var MYDATE = 9;
  var MYMONTH = 6;
  var DEFAULTMARK = 3;
  var browserCookies = require('browser-cookies');
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
    var expires = getExpires(MYDATE, MYMONTH);
    browserCookies.set('mark', selectedReviewMark, {expires: expires});
    browserCookies.set('name', reviewName.value, {expires: expires});
  };

  var getExpires = function(myDate, myMonth) {
    var now = new Date();
    var currentDate = now.getDate();
    var currentMonth = now.getMonth();
    var currentYear = now.getFullYear();
    var myYear;
    if (currentMonth >= myMonth && currentDate >= myDate) {
      myYear = currentYear;
    } else {
      myYear = currentYear - 1;
    }
    var birthday = new Date(myYear, myMonth, myDate);
    var difference = Math.floor((now - birthday) / (1000 * 60 * 60 * 24));
    return difference;
  };


  for (var y = 0; y < reviewMark.length; y++) {
    reviewMark[y].onclick = function() {
      selectedReviewMark = this.value;
      check();
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
