'use strict';

module.exports.getExpires = function(myDate, myMonth) {
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

