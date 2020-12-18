import {
  RESET_STORE,
  SET_TOKEN,
  SET_USER,
} from '../actions/constant/ActionTypes';

const INITIAL_STATE = {
  accessToken: '',
  id: '',
  user: '',
  loginDateTime: '',
  isAuthenticated: false,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user ? action.payload.user : '',
        id: action.payload.user.id ? action.payload.user.id : '',
        loginDateTime: new Date(),
      };

    case SET_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
        isAuthenticated: true,
      };

    case RESET_STORE:
      return {
        ...state,
        accessToken: '',
        id: '',
        user: '',
        loginDateTime: '',
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default AuthReducer;
