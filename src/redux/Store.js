import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import Thunk from 'redux-thunk';
import Logger from 'redux-logger';

import LoginReducer from './reducers/Login';
import AuthReducer from './reducers/Auth';
import LoaderReducer from './reducers/Loader';
import ModalReducer from './reducers/Modal';
import NetworkReducer from './reducers/Network';
import MovieReducer from './reducers/Movie';

const rootReducer = combineReducers({
  login: LoginReducer,
  auth: AuthReducer,
  loader: LoaderReducer,
  modal: ModalReducer,
  network: NetworkReducer,
  movie: MovieReducer,
});

const Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(Thunk, Logger)),
);

export default Store;
