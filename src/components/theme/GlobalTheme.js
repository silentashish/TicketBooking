import {Dimensions} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const {height, width} = Dimensions.get('window');

const GlobalTheme = {
  lightBlueColor: '#e3f2fd',
  midBlueColor: '#BCE0FD',
  blueColor: '#7FC4FD',
  darkBlueColor: '#0E76BD',

  whiteColor: '#ffffff',
  black: '#414141',
  grey: '#666666',
  lightGrey: '#d5d5d5',
  white: '#ffffff',
  yellow: '#FFCC00',
  red: '#E42424',
  orange: '#EA6D22',
  pink1: '#E66EEB',
  pink2: '#FE68AA',
  purple: '#9322EA',
  gradBlue1: '#35A5FF',
  green: '#00b248',

  profileColor: '#0A5C75',

  borderColor: '#666666',

  // DN Student
  background: '#fafafa',

  materialBrown: '#e8f0f5',

  materialGreen: '#d9f5e5',

  materialYellow: '#eef4e5',

  materialBlue: '#daecff',

  materialRed: '#eee0e8',

  materialOrange: '#eef4e5',

  materialWhite: '#eeeeee',
  // theme colors

  // typography
  fontSizeLight: 14,
  fontSizeRegular: 16,
  fontSizeMedium: 18,
  fontSizeSemiBold: 20,
  fontSizeBold: 24,

  //font color
  fontColor: '#414141',

  //radius
  viewRadius: 5,

  //heights
  buttonHeight: 50,
  smallButtonHeight: 35,
  headerHeight: 60,
  deviceHeight: height,
  deviceWidth: width,

  fontLight: 'Metropolis-Light',
  fontMedium: 'Metropolis-Medium',
  fontRegular: 'Metropolis-Regular',
  fontSemiBold: 'Metropolis-SemiBold',
  fontBold: 'Metropolis-Bold',
  // typography
};

const PaperTheme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: GlobalTheme.darkBlueColor,
    accent: '#f1c40f',
    background: '#fff',
    surface: '#fff',
    text: '#414141',
    disabled: '#f5f5f5',
  },
};

export {GlobalTheme, PaperTheme};
