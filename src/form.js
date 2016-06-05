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
  var selectedReviewMark;
  reviewName.required = true;
  submitButton.disabled = true;
  labelText.innerHTML = '';
  reviewName.onchange = check;
  reviewText.onchange = check;


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
      if (this.value < 3 ) {
        reviewText.required = true;
        submitButton.disabled = true;
        if (reviewText.value === '') {
          labelText.innerHTML = 'отзыв';
        }
      } else {
        reviewText.required = false;
        submitButton.disabled = true;
        labelText.innerHTML = '';
      }
      selectedReviewMark = this.value;
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
      console.log(selectedReviewMark + ' | ' + reviewName.value + ' ' + reviewText.value);
    } else{
      submitButton.disabled = true;
      console.log('переделывай');
    }
  }

})();
