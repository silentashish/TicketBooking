//setup AXIOS INTERCEPTOR
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

import Store from '../store/Store';
import {hideLoader} from '../store/actions/Loader';
import {showNetInfo} from '../store/actions/Network';
import {API_URL} from '@env';

export const Interceptor = () => {
  axios.defaults.baseURL = `${API_URL}`;

  axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded;charset=UTF-8';

  let networkConnectivityCheck = false;
  let showModalOnce = false;

  axios.interceptors.request.use(
    async function (config) {
      await NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          showModalOnce = true;
          networkConnectivityCheck = true;
        } else {
          showModalOnce = false;
          networkConnectivityCheck = false;
        }
      });

      if (!networkConnectivityCheck) {
        if (!showModalOnce) {
          Store.dispatch(hideLoader());
          Store.dispatch(showNetInfo());
        }
      } else {
        let endpoint = config.url;
        // console.log('endpoint ==> ', endpoint);

        const token = await AsyncStorage.getItem('accessToken');
        if (token != null && !endpoint.includes('renewtoken')) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // console.log('config ==> ', config);
        return config;
      }
    },

    function (err) {
      return Promise.reject(err);
    },
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },

    (error) => {
      return Promise.reject(error);
    },
  );
};
