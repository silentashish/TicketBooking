/**
 * eDigital Nepal React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';

import {AlertModal} from './src/components/common';

import {useSelector, useDispatch} from 'react-redux';
import {setToken, loadUser} from './src/redux/actions/Auth';

import {Provider as PaperProvider} from 'react-native-paper';
import {PaperTheme} from './src/components';

import {LoggedInRoute, NonLoggedInRoute} from './src/routes';

const App = () => {
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.loader.presentLoader);
  const showModal = useSelector((state) => state.modal.presentModal);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchToken() {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const user = await AsyncStorage.getItem('user');

        if (accessToken && user) {
          dispatch(
            setToken({
              accessToken: accessToken,
            }),
          );
          dispatch(
            loadUser({
              user: JSON.parse(user),
            }),
          );
        } else {
          // dispatch(resetAuth());
        }
        setIsAuthLoading(false);
      } catch (e) {
        // dispatch(resetAuth());
        setIsAuthLoading(false);
      }
    }

    fetchToken();
  }, []);

  useEffect(() => {
    if (!isAuthLoading) {
      SplashScreen.hide();
    }
  }, [isAuthLoading]);

  return (
    <PaperProvider theme={PaperTheme}>
      <SafeAreaProvider>
        <NavigationContainer>
          {isAuthenticated ? <LoggedInRoute /> : <NonLoggedInRoute />}

          {showModal ? <AlertModal /> : null}
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
