import {AppRegistry, LogBox} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';

import {Provider} from 'react-redux';
import Store from './src/redux/Store';

import {Interceptor} from './src/services/Interceptor';
Interceptor();

LogBox.ignoreAllLogs(true);

const RNRedux = () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RNRedux);
