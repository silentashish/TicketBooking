import {StyleSheet} from 'react-native';

const GlobalStyle = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  p10: {
    padding: 10,
  },
  p20: {
    padding: 20,
  },
  pt100: {
    paddingTop: 100,
  },
  textCenter: {
    textAlign: 'center',
  },
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 0},
    backgroundColor: 'white',
  },
});

export {GlobalStyle};
