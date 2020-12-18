import AsyncStorage from '@react-native-community/async-storage';
import {ToastAndroid} from 'react-native';

const logOut = async (message) => {
  const keys = ['user', 'accessToken', 'firsttime', 'fingerprint'];
  await AsyncStorage.multiRemove(keys);
  ToastAndroid.show(message, 1500);
};

export {logOut};
