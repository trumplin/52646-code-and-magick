'use strict';
(function() {
  var REVIEWS_LIST_URL = '//o0.github.io/assets/json/reviews.json';
  var DAY_IN_MILLIS = 1000 * 60 * 60 * 24;
  var BAD_RATING = 2;
  var GOOD_RATING = 3;
  var PAGE_SIZE = 3;
  var EMPTY_ARRAY_MESSAGE = 'По заданным критериям, нет ниодного отзыва';
  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsContainer = document.querySelector('.reviews-list');
  var reviewsBlock = document.querySelector('.reviews');
  var moreReviewsButton = document.querySelector('.reviews-controls-more');
  var templateElement = document.querySelector('template');
  var pageNumber = 0;
  var reviews = [];
  var filteredReviews = [];
  var elementToClone;
  var Filter = {
    'ALL': 'reviews-all',
    'RECENT': 'reviews-recent',
    'GOOD': 'reviews-good',
    'BAD': 'reviews-bad',
    'POPULAR': 'reviews-popular'
  };
  var DEFAULT_FILTER = Filter.ALL;

  if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.review');
  } else{
    elementToClone = templateElement.querySelector('.review');
  }

  reviewsFilter.classList.add('invisible');
  reviewsBlock.classList.add('reviews-list-loading');

  var getReviewElement = function(data, container) {
    var element = elementToClone.cloneNode(true);
    var reviewAuthorImage = new Image(124, 124);
    reviewAuthorImage.onload = function(evt) {
      element.querySelector('.review-author').src = evt.target.src;
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
    return element;
  };

  var renderReviews = function(reviewsArray, page, replace) {
    if (replace) {
      reviewsContainer.innerHTML = '';
    }
    reviewsBlock.classList.remove('reviews-list-loading');
    reviewsFilter.classList.remove('invisible');
    var from = page * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    reviewsArray.slice(from, to).forEach(function(review) {
      getReviewElement(review, reviewsContainer);
    });
  };

  var getFilteredReviews = function(reviewsArray, filter) {
    var reviewsToFilter = reviewsArray.slice(0);
    switch (filter) {

      case Filter.ALL:
        break;

      case Filter.RECENT:
        var today = new Date();
        reviewsToFilter = reviewsArray.filter(function(number) {
          var dateReview = new Date(number.date);
          var daysDifferent = Math.floor((today - dateReview) / DAY_IN_MILLIS);
          if ( daysDifferent < 4 && daysDifferent > 0 ) {
            return number;
          } else {
            return null;
          }
        });

        reviewsToFilter.sort(function(a, b) {
          var a1 = new Date(a.date);
          var b1 = new Date(b.date);
          return b1 - a1;
        });
        break;

      case Filter.GOOD:
        reviewsToFilter = reviewsArray.filter(function(number) {
          return number.rating > BAD_RATING;
        });

        reviewsToFilter.sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;

      case Filter.BAD:
        reviewsToFilter = reviewsArray.filter(function(number) {
          return number.rating < GOOD_RATING;
        });

        reviewsToFilter.sort(function(a, b) {
          return a.rating - b.rating;
        });
        break;

      case Filter.POPULAR:
        reviewsToFilter.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
        break;

    }
    return reviewsToFilter;
  };

  var showErrorMessage = function(message) {
    reviewsContainer.innerHTML = message;
    reviewsFilter.classList.remove('invisible');
  };

  var setFilterEnabled = function(filter) {
    filteredReviews = getFilteredReviews(reviews, filter);
    pageNumber = 0;
    setMoreReviewsButtonEnabled();

    if (filteredReviews.length > 0) {
      renderReviews(filteredReviews, pageNumber, true);
    } else {
      showErrorMessage(EMPTY_ARRAY_MESSAGE);
    }
  };

  var setFiltersEnabled = function() {
    reviewsFilter.addEventListener('click', function(evt) {
      if (evt.target.name === 'reviews') {
        setFilterEnabled(evt.target.id);
      }
    });
  };

  var getReviews = function(callback) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function(evt) {
      var loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
    };

    xhr.onerror = function() {
      reviewsBlock.classList.add('reviews-load-failure');
    };
    xhr.open('GET', REVIEWS_LIST_URL);

    xhr.send();
  };

  var isNextPageAvailable = function(review, page) {
    return (page + 1) < (Math.ceil(review.length / PAGE_SIZE));
  };

  moreReviewsButton.onclick = function() {
    pageNumber++;
    renderReviews(filteredReviews, pageNumber);
    setMoreReviewsButtonEnabled();
  };

  var setMoreReviewsButtonEnabled = function() {
    if (isNextPageAvailable(filteredReviews, pageNumber)) {
      moreReviewsButton.classList.remove('invisible');
    } else {
      moreReviewsButton.classList.add('invisible');
    }
  };

  getReviews(function(loadedReviews) {
    reviews = loadedReviews;
    setFiltersEnabled();
    setFilterEnabled(DEFAULT_FILTER);
  });
})();
