'use strict';

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
  var selectedReviewMark;
  reviewName.required = true;
  submitButton.disabled = true;
  labelText.innerHTML = '';
  reviewName.oninput = check;
  reviewText.oninput = check;

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  for (var i = 0; i < reviewMark.length; i++) {
    if (reviewMark[i].checked) {
      selectedReviewMark = reviewMark[i].value;
      break;
    }
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
    if (reviewText.value) {
      labelText.innerHTML = '';
    } else {
      if (selectedReviewMark < 3) {
        labelText.innerHTML = 'отзыв';
      }
    }
    if (labelName.innerHTML === '' && labelText.innerHTML === '') {
      submitButton.disabled = false;
      labelReviewFields.style.visibility = 'hidden';
      console.log(selectedReviewMark + ' | ' + reviewName.value + ' ' + reviewText.value);
    } else{
      submitButton.disabled = true;
      labelReviewFields.style.visibility = 'visible';
      console.log('переделывай');
    }
  }
})();
