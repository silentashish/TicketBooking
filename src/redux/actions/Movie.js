import {
  MOVIE_LIST_API_REQUEST,
  MOVIE_LIST_API_SUCCESS,
  MOVIE_LIST_API_FAILURE,
} from './constant/ActionTypes';

import {showModal} from './Modal';

import {showLoader, hideLoader} from './Loader';

import * as api from '../../services/axios/Api';

const movieApiRequestAction = (type) => (dispatch, getState) => {
  dispatch({
    type: type,
  });

  dispatch(showLoader());
};

const movieApiSuccessAction = (loadSuccess, type, navigation) => (dispatch) => {
  dispatch({
    type: type,
    payload: loadSuccess,
  });

  // let modalConfig = {
  //   title: 'Success!',
  //   message: 'Data loaded',
  //   showCancelButton: 'false',
  //   shouldNavigate: true,
  //   navigateTo: 'Dashboard',
  //   navigation: navigation,
  // };
  // dispatch(showModal(modalConfig));
  dispatch(hideLoader());
};

const movieApiFailureAction = (loadFailure, type) => (dispatch) => {
  dispatch({
    type: type,
    payload: loadFailure,
  });

  if (loadFailure !== undefined) {
    let modalConfig = {
      title: 'Sorry!',
      message: loadFailure,
    };

    dispatch(hideLoader());
    dispatch(showModal(modalConfig));
  } else {
    let modalConfig = {
      title: 'Sorry!',
      message: 'Internal Server Error Occur',
      showCancelButton: 'false',
    };

    dispatch(hideLoader());
    dispatch(showModal(modalConfig));
  }
};

export const movieApi = (data, navigation) => (dispatch, getState) => {
  dispatch(movieApiRequestAction(MOVIE_LIST_API_REQUEST));

  api
    .movieListApi(data)
    .then((response) => {
      console.log('movie', response);
      if (response.status === 200) {
        dispatch(
          movieApiSuccessAction(
            response.data.results,
            MOVIE_LIST_API_SUCCESS,
            navigation,
          ),
        );
      } else {
        dispatch(
          movieApiFailureAction(
            'Error while loading movie',
            MOVIE_LIST_API_FAILURE,
          ),
        );
      }
    })
    .catch((error) => {
      dispatch(
        movieApiFailureAction(
          'Error while loading movie',
          MOVIE_LIST_API_FAILURE,
        ),
      );
    });
};
