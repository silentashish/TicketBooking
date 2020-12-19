import React from 'react';
import {View, Image, Modal, StyleSheet, ActivityIndicator} from 'react-native';

import {useSelector} from 'react-redux';
import {ScaledSheet} from 'react-native-size-matters';
import {GlobalTheme} from '../theme';
import LottieView from 'lottie-react-native';

const Loader = ({modalLoading}) => {
  const loaderState = useSelector((state) => state.loader.presentLoader);
  const LoadingPart = () => (
    <View style={styles.loaderView(modalLoading)}>
      <View style={styles.loaderStyle}>
        <LottieView
          source={require('../../assets/loading.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  );
  if (modalLoading)
    return (
      <Modal
        statusBarTranslucent={true}
        animationType="fade"
        transparent={true}
        visible={loaderState}>
        <LoadingPart />
      </Modal>
    );
  return <LoadingPart />;
};

const styles = ScaledSheet.create({
  loaderView: (modalLoading) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: modalLoading ? 'rgba(0,0,0,0.55)' : null,
  }),
  loaderStyle: {
    width: '150@s',
    height: '150@s',
    // backgroundColor: '#FFF',
    // elevation: 20,
    borderRadius: GlobalTheme.viewRadius,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  shimmerStyle: {
    height: '50@s',
    width: '50@s',
  },
});

export {Loader};
