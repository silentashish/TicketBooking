import {SET_TOKEN, SET_USER, RESET_STORE} from './constant/ActionTypes';

export const loadUser = (user) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};

export const setToken = (tokenData) => (dispatch) => {
  dispatch({
    type: SET_TOKEN,
    payload: tokenData.accessToken,
  });
};

export const resetStore = () => {
  return {
    type: RESET_STORE,
  };
};
