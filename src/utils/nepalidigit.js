String.prototype.lastThree = function (parseint) {
  if (parseint) {
    return parseInt(this.substr(this.length - 3)).toString();
  } else {
    return this.substr(this.length - 3);
  }
};
String.prototype.sliceToTwo = function () {
  var sliced = [];
  var number = this;
  var numberLength = number.length;
  for (let i = 0; i < numberLength; i++) {
    sliced.push(number.substr(number.length - 2));
    number = number.slice(0, -2);
    numberLength = numberLength - 1;
  }
  return sliced;
};
String.prototype.removeLastThree = function () {
  return this.slice(0, -3);
};
Array.prototype.reverseAndJoin = function () {
  var list = [];
  this.forEach(function (value, i) {
    if (i == 0) {
      list.push(value.stringifyValues());
    } else if (i == 1 && value == '0') {
      list.push('');
    } else {
      list.push(value.stringifyValues() + ' ' + i.toString().stringifyPlace());
    }
  });
  return list.reverse().join(' ');
};

function commafy(number) {
  var str = number.toString();
  var length = str.length;
  if (length > 3) {
    // get last three digits of given number
    var lastThree = str.lastThree(false);

    // remove last three digit and take remaining digits
    var remStr = str.removeLastThree();

    // make a array
    var remStrips = remStr.sliceToTwo().reverse().join(',') + ',' + lastThree;
    return remStrips;
  } else {
    return str;
  }
}

function convertToCommaNumber(number) {
  var number = number.toString();
  var number_before_decimal = number.split('.')[0];
  var number_after_decimal = number.split('.')[1];
  var text1 = commafy(number_before_decimal);
  var text2 = '';
  if (typeof number_after_decimal !== 'undefined') {
    text2 = number_after_decimal;
    return text1 + '.' + text2;
  } else {
    return text1;
  }
}

export {convertToCommaNumber};
