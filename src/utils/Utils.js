import moment from 'moment';
import {Linking, Platform} from 'react-native';

import NepaliDate from 'nepali-date-converter';

import {GlobalTheme} from '../components/theme';
import {Month, twelveHourFormat, MonthShortcut} from '../constants/Constant';

//Get Todays Date
const todayDate = () => {
  const date = moment().toString();
  const formattedDate = moment(date).format('YYYY-MM-DD');
  return formattedDate;
};

const yesterdayDate = () => {
  const date = moment().toString();
  const formattedDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
  return formattedDate;
};

//Format Date to YYYY-MM-DD
const formatDate = (date) => {
  if (date != null) {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    return formattedDate;
  }
};

//Format Today Date to YYYY-MM-DD without moment
const formatDateWithoutMoment = () => {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let date = new Date().getDate();

  month = month.toString().length < 2 ? '0' + month : month;
  date = date.toString().length < 2 ? '0' + date : date;

  return year + '-' + month + '-' + date;

  // const monthNum = val.getMonth();
  // console.log('monthNum ==> ', monthNum);
  // const month = MonthShortcut[monthNum];
  // console.log('month ==> ', month);

  // let slash = val.split(' ').reverse();

  // console.warn('slash ==> ', slash);

  // let year = slash[0];
  // let monthNum = slash[2];

  // const date = new Date(val);
  // console.log('date ==> ', date);

  // let month = slash[2];
  // let date = slash[1];
  // }
};

//Format Time to HH-MM-SS
const formatTime = (time) => {
  if (time != null) {
    // console.log('time ==> ', time);

    // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"
    let dateParam = time.split(/[\s-:]/);
    dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString();

    let hour = new Date(...dateParam).getHours();
    let minute = new Date(...dateParam).getMinutes();
    let second = new Date(...dateParam).getSeconds();

    let hours = hour.toString().length < 2 ? '0' + hour : hour;
    let minutes = minute.toString().length < 2 ? '0' + minute : minute;
    let seconds = secound.toString().length < 2 ? '0' + second : second;

    let formatTime = hours + ':' + minutes + ':' + seconds;

    return formatTime;
  } else {
    return null;
  }
};

// format date to 05 August, 2020
const formatToSentenceDate = (sentenceDate) => {
  if (sentenceDate != null) {
    // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"
    let dateParam = sentenceDate.split(/[\s-:]/);
    dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString();

    let dateYear = new Date(...dateParam).getFullYear();
    let monthNum = new Date(...dateParam).getMonth();
    let date = new Date(...dateParam).getDate();

    const dateNum = date.toString().length < 2 ? '0' + date : date;

    const month = Month[monthNum];

    const filteredDate = month + ' ' + dateNum + ', ' + dateYear;

    return filteredDate;
  }
};

const twelveHourFormatTime = (twelveHour) => {
  if (twelveHour != null) {
    // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"
    let dateParam = twelveHour.split(/[\s-:]/);
    dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString();

    let hour = new Date(...dateParam).getHours();
    let minute = new Date(...dateParam).getMinutes();

    const filteredTime = twelveHourFormat.filter((obj) => {
      if (hour == obj.id) {
        return obj.time;
      }
    });

    return (
      filteredTime[0].time.slice(0, 2) +
      ':' +
      minute +
      ' ' +
      filteredTime[0].time.slice(3, 5)
    );
  }
};

// get Nepali Or English current month
const getMonth = (ods) => {
  if (ods === 'np') {
    let nepaliMonth = new NepaliDate().getMonth() + 1;
    let formatedNepaliMonth =
      nepaliMonth.toString().length < 2 ? '0' + nepaliMonth : nepaliMonth;
    return formatedNepaliMonth;
  } else {
    let currentDate = new Date();
    let englishMonth = currentDate.getMonth() + 1;
    let formatedEnglishMonth =
      englishMonth.toString().length < 2 ? '0' + englishMonth : englishMonth;
    return formatedEnglishMonth;
  }
};

// get NepaliDate year
const getYear = () => {
  return new NepaliDate().getYear();
};

const getFullNepaliDate = (year, month, date) => {
  // console.log('abc ==> ', year, month, date);

  let nepaliFullDate = new NepaliDate(new Date(year, month, date)).getBS();

  let nepaliYear = nepaliFullDate.year;
  let nepaliMonth =
    nepaliFullDate.month.toString().length < 2
      ? '0' + nepaliFullDate.month
      : nepaliFullDate.month;
  let nepaliDate =
    nepaliFullDate.date.toString().length < 2
      ? '0' + nepaliFullDate.date
      : nepaliFullDate.date;

  // console.log('nepali ==> ', nepaliYear + '-' + nepaliMonth + '-' + nepaliDate);

  return nepaliYear + '-' + nepaliMonth + '-' + nepaliDate;
};

//Make Call
const makeCall = (number) => {
  return Linking.openURL(`tel:${number}`);
};

//Get Current English or Nepali Year
const getCurrentYear = (type) => {
  const currentEnglishYear = new Date().getFullYear();
  const currentNepaliYear = parseInt(currentEnglishYear) + 57;
  return type == 'en' ? currentEnglishYear : currentNepaliYear;
};

//Get Current English or Nepali Years
const getCurrentYears = (type) => {
  let nepaliStartingDate = 2070;
  let englishStartingDate = 2013;
  const currentEnglishYear = new Date().getFullYear();
  const currentNepaliYear = parseInt(currentEnglishYear) + 57;

  const diffEnglishYear = currentEnglishYear - englishStartingDate;
  const diffNepaliYear = currentNepaliYear - nepaliStartingDate;

  const years = [];

  if (type == 'np') {
    for (let i = 0; i <= diffNepaliYear; i++) {
      const newDate = (nepaliStartingDate + i).toString();
      years.push({yearLabel: newDate, yearValue: newDate});
    }

    return years.reverse();
  } else if (type == 'en') {
    for (let i = 0; i <= diffEnglishYear; i++) {
      const newDate = (englishStartingDate + i).toString();
      years.push({yearLabel: newDate, yearValue: newDate});
    }

    return years.reverse();
  }
};

//Length of Object
const getObjectLength = (obj) => {
  var count = Object.keys(obj).length;
  return parseInt(count);
};

//print all keys from json
const getObjectKeys = (data) => {
  const keyData = [];
  var filters = data;

  for (var i = 0; i < 1; i++) {
    var obj = filters[i];

    for (var key in obj) {
      keyData.push(key);
    }
  }
  return keyData;
};

//Capitalize First Letter
const firstLetterUppercase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// date and time in react native format
// const gameTimeStatus = (date) => {
//   const formattedDate = moment(moment(date).format('YYYY-MM-DD h:mm:ss'));

//   console.warn('formattedDate ==> ', formattedDate);

//   const formattedCurrentDate = moment(
//     moment(new Date()).format('YYYY-MM-DD h:mm:ss'),
//   ).toISOString();

//   console.warn('formattedCurrentDate ==> ', formattedCurrentDate);

//   const remainingSeconds = formattedDate.diff(formattedCurrentDate, 'seconds');

//   console.warn('remainingSeconds ==> ', remainingSeconds);

//   const finalTime = remainingSeconds < 0 ? false : remainingSeconds;

//   console.warn('finalTime ==> ', finalTime);

//   return finalTime;
// };

const timeColonSeperator = (time, needed) => {
  if (time != null) {
    let spliter = time.split(':');

    if (needed === 'hh') {
      let hourSpliter = spliter[0];
      hourSpliter = hourSpliter.length < 2 ? '0' + hourSpliter : hourSpliter;
      // console.log('hourSpliter ==> ', hourSpliter);
      return hourSpliter;
    } else if (needed === 'mm') {
      let minuteSpliter = spliter[1];
      minuteSpliter =
        minuteSpliter.length < 2 ? '0' + minuteSpliter : minuteSpliter;
      // console.log('minuteSpliter ==> ', minuteSpliter);
      return minuteSpliter;
    } else if (needed === 'ss') {
      let secondSpliter = spliter[2];
      secondSpliter =
        secondSpliter.length < 2 ? '0' + secondSpliter : secondSpliter;
      // console.log('secondSpliter ==> ', secondSpliter);
      return secondSpliter;
    }
  } else {
    return null;
  }
};

const getGridColor = (number) => {
  let color =
    number === 0
      ? GlobalTheme.materialRed
      : number === 1
      ? GlobalTheme.materialBrown
      : number === 2
      ? GlobalTheme.materialGreen
      : number === 3
      ? GlobalTheme.materialOrange
      : number === 4
      ? GlobalTheme.materialBlue
      : GlobalTheme.whiteColor;
  return color;
};

const closeToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 5;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const maybeOpenURL = async (
  url,
  appName,
  appStoreId,
  appStoreLocale,
  playStoreId,
) => {
  Linking.openURL(url).catch((err) => {
    if (err.code === 'EUNSPECIFIED') {
      if (Platform.OS === 'ios') {
        // check if appStoreLocale is set
        const locale =
          typeof appStoreLocale === 'undefined' ? 'us' : appStoreLocale;

        Linking.openURL(
          `https://itunes.apple.com/${locale}/app/${appName}/id${appStoreId}`,
        );
      } else {
        Linking.openURL(
          `https://play.google.com/store/apps/details?id=${playStoreId}`,
        );
      }
    } else {
      throw new Error(`Could not open ${appName}. ${err.toString()}`);
    }
  });
};

const openInStore = async ({
  appName,
  appStoreId,
  appStoreLocale = 'us',
  playStoreId,
}) => {
  if (Platform.OS === 'ios') {
    Linking.openURL(
      `https://itunes.apple.com/${appStoreLocale}/app/${appName}/id${appStoreId}`,
    );
  } else {
    Linking.openURL(
      `https://play.google.com/store/apps/details?id=${playStoreId}`,
    );
  }
};

const convertToZoomData = (url) => {
  try {
    var newUrl = url;
    var id = url.match(/https:\/\/.*us\/j\/(\d+)/i)[1];
    var pwd = newUrl.replace(/https.*pwd=/, '');
    // const finalUrl = `zoomus://zoom.us/join?confno=${id}&pwd=${pwd}`;
    return {
      id: id,
      pwd: pwd,
    };
  } catch (e) {
    return url;
  }
};

const limitTitle = (string) => {
  const finalTitle = string.replace(/^(.{25}[^\s]*).*/, '$1');
  return finalTitle;
};

const convertToStringTime = (total) => {
  if (total >= 60) {
    if (total % 60 == 0) {
      const baseHour = parseInt(total / 60);
      if (baseHour == 1) {
        return baseHour + ' Hour';
      } else return baseHour + ' Hours';
    } else {
      const minutes = total % 60;
      const hours = (total - minutes) / 60;
      if (hours == 1) {
        return hours + ' Hour ' + minutes + ' Minutes';
      } else return hours + ' Hours ' + minutes + ' Minutes';
    }
  } else {
    return total + ' Minutes';
  }
};

const arrayAfterRemovingValue = (array, value) => {
  const tempArray = array;
  for (var i = 0; i < tempArray.length; i++) {
    if (tempArray[i] === value) {
      tempArray.splice(i, 1);
      i--;
    }
  }
  return tempArray;
};

const filterArray = (arr, brr) => {
  const res = arr.filter((f) => !brr.includes(f));
  return res;
};

//Multiple Refs
const mergeRefs = (...refs) => {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) return null;
  if (filteredRefs.length === 0) return filteredRefs[0];
  return (inst) => {
    for (const ref of filteredRefs) {
      if (typeof ref === 'function') {
        ref(inst);
      } else if (ref) {
        ref.current = inst;
      }
    }
  };
};

const totalSecondsFromTime = (time) => {
  var hms = time.split(':');
  const value = +hms[0] * 60 * 60 + +hms[1] * 60 + (+hms[2] || 0);
  return value.toString();
};

const addTwoTime = (timeOne, timeTwo) => {
  let t1 = timeOne.split(':');
  const newMin = parseInt(t1[1]) + parseInt(timeTwo);
  let newHour = parseInt(t1[0]) + parseInt(newMin / 60);
  let newMinute = newMin % 60;
  const pad = (d) => {
    return d < 10 ? '0' + d.toString() : d.toString();
  };
  return `${newHour >= 24 ? pad(newHour - 24) : pad(newHour)}:${pad(
    newMinute,
  )}`;
};

export {
  addTwoTime,
  filterArray,
  totalSecondsFromTime,
  mergeRefs,
  todayDate,
  formatDate,
  formatDateWithoutMoment,
  formatTime,
  yesterdayDate,
  formatToSentenceDate,
  twelveHourFormatTime,
  getMonth,
  getYear,
  makeCall,
  getCurrentYears,
  getCurrentYear,
  getObjectLength,
  getObjectKeys,
  getFullNepaliDate,
  firstLetterUppercase,
  getGridColor,
  closeToBottom,
  maybeOpenURL,
  // gameTimeStatus,
  timeColonSeperator,
  openInStore,
  convertToZoomData,
  limitTitle,
  convertToStringTime,
  arrayAfterRemovingValue,
};
