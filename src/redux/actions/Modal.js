import {
  PRESENT_MODAL,
  HIDE_MODAL,
  CLEAR_MODAL,
  RESET_STORE,
} from './constant/ActionTypes';

export const showModal = (modalPayload) => {
  return {
    type: PRESENT_MODAL,
    payload: modalPayload,
  };
};

export const hideModal = () => {
  return {
    type: HIDE_MODAL,
  };
};

export const clearModal = () => {
  return {
    type: CLEAR_MODAL,
  };
};

export const resetStore = () => {
  return {
    type: RESET_STORE,
  };
};
