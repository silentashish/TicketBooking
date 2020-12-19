import {ADD_SELECTED_SEAT, CLEAR_SELECTEd_SEAT} from './constant/ActionTypes';

export const addSeat = (data) => {
  return {
    type: ADD_SELECTED_SEAT,
    payload: data,
  };
};

export const resetSeat = (data) => {
  return {
    type: CLEAR_SELECTEd_SEAT,
    payload: data,
  };
};
