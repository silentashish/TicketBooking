import {
  MOVIE_LIST_API_REQUEST,
  MOVIE_LIST_API_SUCCESS,
  MOVIE_LIST_API_FAILURE,
} from '../actions/constant/ActionTypes';

const INITIAL_STATE = {
  movieList: [],
  movieListLoading: false,
  extraMovieLoading: false,
};

const LoginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MOVIE_LIST_API_REQUEST:
      return {
        ...state,
        movieListLoading: state.movieList.length > 0 ? false : true,
        extraMovieLoading: state.movieList.length > 0 ? true : false,
      };

    case MOVIE_LIST_API_SUCCESS:
      return {
        ...state,
        movieListLoading: false,
        extraMovieLoading: false,
        movieList: action.payload,
      };

    case MOVIE_LIST_API_FAILURE:
      return {
        ...state,
        movieListLoading: false,
        extraMovieLoading: false,
      };

    default:
      return state;
  }
};

export default LoginReducer;
