import {
  ADD_SELECTED_SEAT,
  CLEAR_SELECTEd_SEAT,
} from '../actions/constant/ActionTypes';

const INITIAL_STATE = {
  selectedSeat: [],
};

const LoginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_SELECTED_SEAT:
      return {
        ...state,
        selectedSeat: state.selectedSeat.includes(action.payload)
          ? state.selectedSeat.filter((item) => item !== action.payload)
          : [...state.selectedSeat, action.payload],
      };

    case CLEAR_SELECTEd_SEAT:
      return {
        ...state,
        selectedSeat: [],
      };

    default:
      return state;
  }
};

export default LoginReducer;
