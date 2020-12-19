import {ADD_SELECTED_SEAT, CLEAR_SELECTEd_SEAT} from './constant/ActionTypes';

export const addSeat = (data) => {
  return {
    type: ADD_SELECTED_SEAT,
    payload: data,
  };
};

export const resetSeat = () => {
  return {
    type: CLEAR_SELECTEd_SEAT,
  };
};
