import React from 'react';
import {StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {GlobalTheme} from '../theme';
import {useSelector, useDispatch} from 'react-redux';

import {Loader} from './Loader';
import {Header} from './Header';

const GenericView = (props) => {
  const {
    children,
    style,
    modalLoading,
    loading,
    extraLoading,
    showHeader = true,
  } = props;
  const isLoading = useSelector((state) => state.loader.presentLoader);
  const loadingChecker = loading === undefined ? isLoading : loading;
  return (
    <SafeAreaView style={[style, styles.safeAreaView]}>
      {showHeader && <Header {...props} extraLoading={extraLoading} />}
      {loadingChecker ? (
        modalLoading ? (
          <>
            <Loader modalLoading={modalLoading} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              {children}
            </TouchableWithoutFeedback>
          </>
        ) : (
          <Loader modalLoading={modalLoading} />
        )
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: GlobalTheme.background,
  },
});

export {GenericView};
