function getMessage(a, b) {
  "use strict";

  if (typeof (a) === 'boolean') {
    if (a) {
      return 'Я попал в ' + b;
    } else {
      return 'Я никуда не попал';
    }
  }

  if (typeof (a) === 'number') {
    return 'Я прыгнул на ' + a * 100 + ' сантиметров';
  }


  if (typeof (a) === 'object' && typeof (b) === 'object') {

    var length = a.reduce(function (summa, current, i) {
      var multiply = current * b[i];
      return summa + multiply;
    }, 0);
    return 'Я прошёл ' + length + ' метров';
  }


  if (typeof (a) === 'object') {
    var sum = a.reduce(function (summa, current) {
      return summa + current;
    });
    return 'Я прошёл ' + sum + ' шагов';
  }
}
