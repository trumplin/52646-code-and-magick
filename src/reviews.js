'use strict';
(function() {
  var reviewsFfilter = document.querySelector('.reviews-filter');
  var reviewsContainer = document.querySelector('.reviews-list');
  var templateElement = document.querySelector('template');
  var elementToClone;

  if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.review');
  } else{
    elementToClone = templateElement.querySelector('.review');
  }

  reviewsFfilter.classList.add('invisible');

  var getReviewElement = function(data, container) {
    var element = elementToClone.cloneNode(true);
    var reviewAuthorImage = new Image();

    reviewAuthorImage.onload = function(evt) {
      element.querySelector('.review-author').src = evt.target.src;
      element.querySelector('.review-author').width = '124';
      element.querySelector('.review-author').height = '124';
    };

    reviewAuthorImage.onerror = function() {
      element.classList.add('review-load-failure');
    };

    reviewAuthorImage.src = data.author['picture'];
    reviewAuthorImage.title = data.author['name'];
    reviewAuthorImage.alt = data.author['name'];
    element.querySelector('.review-text').textContent = data.description;
    element.querySelector('.review-rating').textContent = data.rating;
    element.querySelector('.review-author').alt = reviewAuthorImage.alt;
    element.querySelector('.review-author').title = reviewAuthorImage.title;
    container.appendChild(element);
    reviewsFfilter.classList.remove('invisible');
    return element;
  };

  window.reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
})();
