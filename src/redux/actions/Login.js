import {
  LOGIN_POST_API_REQUEST,
  LOGIN_POST_API_SUCCESS,
  LOGIN_POST_API_FAILURE,
} from './constant/ActionTypes';

import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-community/async-storage';

import {setToken, loadUser} from './Auth';
import {showModal} from './Modal';
import {showLoader, hideLoader} from './Loader';

import * as api from '../../services/axios/Api';

const loginApiRequestAction = () => (dispatch, getState) => {
  dispatch({
    type: LOGIN_POST_API_REQUEST,
  });
  dispatch(showLoader());
};

const loginApiSuccessAction = (loginSuccess) => (dispatch, getState) => {
  dispatch({
    type: LOGIN_POST_API_SUCCESS,
    payload: loginSuccess,
  });

  dispatch(
    setToken({
      accessToken: loginSuccess.token,
    }),
  );

  dispatch(
    loadUser({
      user: loginSuccess,
    }),
  );

  dispatch(hideLoader());
};

const loginApiFailureAction = (loginFailure) => (dispatch, getState) => {
  dispatch({
    type: LOGIN_POST_API_FAILURE,
    payload: loginFailure,
  });

  if (loginFailure !== undefined) {
    let modalConfig = {
      title: 'Sorry!',
      message: loginFailure,
      showCancelButton: 'false',
    };

    dispatch(hideLoader());
    dispatch(showModal(modalConfig));
  } else {
    let modalConfig = {
      title: 'Sorry!',
      message: 'Failed to connect to server',
      showCancelButton: 'false',
      modalImage: 'network',
    };

    dispatch(hideLoader());
    dispatch(showModal(modalConfig));
  }
};

const addToKeychain = async (username, password) => {
  // Store the credentials securely in Keychain
  await Keychain.setGenericPassword(username, password);
};

export const loginApi = (body, credentials, status) => (dispatch, getState) => {
  dispatch(loginApiRequestAction());
  api
    .login(body)
    .then((response) => {
      if (response.status === 200) {
        !status
          ? null
          : addToKeychain(credentials.username, credentials.password);
        AsyncStorage.setItem('accessToken', response.data.data.token);
        AsyncStorage.setItem('user', JSON.stringify(response.data.data));
        dispatch(loginApiSuccessAction(response.data.data));
      } else {
        dispatch(loginApiFailureAction(response.data.message));
      }
    })
    .catch((error) => {
      if (error.response.data) {
        dispatch(loginApiFailureAction(error.response.data.message));
      } else {
        dispatch(loginApiFailureAction(error.data));
      }
    });
};
