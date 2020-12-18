import {SET_NET_INFO, RESET_STORE} from './constant/ActionTypes';

import {showModal} from './Modal';

export const showNetInfo = () => (dispatch) => {
  dispatch({
    type: SET_NET_INFO,
    payload: false,
  });

  netInfoData = {
    title: 'Oops!',
    message:
      'Looks like your device is not connected to internet. Please try again.',
    modalBottomMessage: 'Check your internet connection and try again.',
    modalImage: 'network',
  };

  dispatch(showModal(netInfoData));
};

export const resetStore = () => {
  return {
    type: RESET_STORE,
  };
};
