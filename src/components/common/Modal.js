import React from 'react';
import {View, Modal, Image, ToastAndroid} from 'react-native';

import {Title, Subheading} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import AsyncStorage from '@react-native-community/async-storage';

import {Button} from './index';
import {DNAlert} from './Alert';
import {Divider} from './Divider';
import {GlobalTheme} from '../theme';

import {useSelector, useDispatch} from 'react-redux';
import {hideModal} from '../../redux/actions/Modal';
import {resetStore} from '../../redux/actions/Auth';

const AlertModal = () => {
  const showModal = useSelector((state) => state.modal.presentModal);
  const shouldNavigate = useSelector((state) => state.modal.shouldNavigate);
  const navigation = useSelector((state) => state.modal.navigation);
  const navigateTo = useSelector((state) => state.modal.navigateTo);
  const shouldRunFunction = useSelector(
    (state) => state.modal.shouldRunFunction,
  );
  const functionHandler = useSelector((state) => state.modal.functionHandler);
  const functionHandler_1 = useSelector(
    (state) => state.modal.functionHandler_1,
  );
  const modalTitle = useSelector((state) => state.modal.modalTitle);
  const modalMessage = useSelector((state) => state.modal.modalMessage);
  const modalImage = useSelector((state) => state.modal.modalImage);
  const imagePath = useSelector((state) => state.modal.imagePath);
  const shouldLogout = useSelector((state) => state.modal.shouldLogout);
  const callback = useSelector((state) => state.modal.shouldCallback);
  const callback_1 = useSelector((state) => state.modal.shouldCallback_1);
  const modalBottomMessage = useSelector(
    (state) => state.modal.modalBottomMessage,
  );
  const showCancelButton = useSelector((state) => state.modal.showCancelButton);

  const dispatch = useDispatch();

  const validateAndStartExamHandler = () => {
    callback == null ? null : callback();
  };

  const attemptSkippedQuestionHandler = () => {
    callback == null ? null : callback();
  };

  const leaveSkippedQuestionHandler = () => {
    callback_1 == null ? null : callback_1();
  };

  const okBtnHandler = async () => {
    if (shouldLogout) {
      const keys = ['user', 'accessToken', 'firsttime'];
      try {
        const value = await AsyncStorage.getItem('onBoarding');
        if (value !== '') {
        }
        await AsyncStorage.multiRemove(keys);
      } catch (e) {
        console.log('Error is', e);
      }
      dispatch(resetStore());
      //
    } else if (shouldNavigate) {
      if (navigateTo === '' || navigateTo === undefined) {
        navigation.goBack();
      } else {
        navigation.navigate(navigateTo);
      }
      //
    } else if (shouldRunFunction) {
      if (functionHandler === 'exitExamHandler') {
        // dispatch(executeFunction(navigation));
      } else if (functionHandler === 'validateAndStartExamHandler') {
        validateAndStartExamHandler();
      } else if (functionHandler === 'attemptSkippedQuestionHandler') {
        attemptSkippedQuestionHandler();
      }
    }

    dispatch(hideModal());
  };

  const cancelBtnHandler = () => {
    if (functionHandler_1 === 'leaveSkippedQuestionHandler') {
      leaveSkippedQuestionHandler();
    }
    dispatch(hideModal());
  };
  const noInternet = false;

  let image = null;
  switch (modalImage) {
    case 'network':
      image = require('../../assets/internetconnection.png');
      break;

    case 'logout':
      image = require('../../assets/logout.png');
      break;

    case 'fingerprint':
      image = 'fingerprint';
      break;

    case 'notification':
      image = {uri: imagePath};
      break;

    default:
      image = null;
  }

  const styles = _styles(modalImage === 'logout');

  if (!modalImage)
    return (
      <DNAlert
        showCancelButton={showCancelButton}
        showAlert={showModal}
        hideAlert={cancelBtnHandler}
        okBtnHandler={okBtnHandler}
        info={{title: modalTitle, message: modalMessage}}
      />
    );

  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={true}>
      <View style={styles.mainView}>
        <View style={styles.contain(noInternet)}>
          <Divider />
          {image == 'fingerprint' ? (
            <Title style={styles.fingerprintTitle}>{modalTitle}</Title>
          ) : (
            <Title style={styles.title}>{modalTitle}</Title>
          )}
          {modalMessage == 'empty' ? null : (
            <View>
              <Divider small />
              <Subheading style={styles.infotxt}>{modalMessage}</Subheading>
              <Divider small />
            </View>
          )}
          {image == 'fingerprint' ? (
            <View style={{alignSelf: 'center'}}>
              {/* <Check color="gray" height={100} width={100} /> */}
            </View>
          ) : (
            <Image resizeMode="cover" source={image} style={styles.image} />
          )}
          {/* <Divider small /> */}
          {modalBottomMessage && (
            <>
              <Subheading style={[styles.infotxt, styles.max]}>
                {modalBottomMessage}
              </Subheading>
              <Divider medium />
            </>
          )}
          {modalImage === 'network' ? (
            <Button margined mode="outlined" onPress={okBtnHandler}>
              {/* {okButtonText} */}
              Ok
            </Button>
          ) : (
            <View style={styles.rowButton}>
              <Button
                showCancelButton={showCancelButton}
                style={[styles.btn, styles.btncancel]}
                margined
                color={GlobalTheme.fontColor}
                onPress={cancelBtnHandler}>
                {/* {cancelButtonText} */}
                Cancel
              </Button>

              <Button
                // dark
                style={styles.btn}
                margined
                mode="outlined"
                onPress={okBtnHandler}>
                {/* {okButtonText} */}
                Ok
              </Button>
            </View>
          )}
          <Divider />
        </View>
      </View>
    </Modal>
  );
};

const _styles = (small) => {
  return ScaledSheet.create({
    mainView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.44)',
    },
    title: {
      fontSize: '35@ms',
      lineHeight: '35@ms',
      textAlign: 'center',
    },
    fingerprintTitle: {
      fontSize: '29@ms',
      textAlign: 'center',
    },
    contain: (lowHeight) => ({
      // height: lowHeight ? '55%' : '70%',
      width: '90%',
      backgroundColor: GlobalTheme.whiteColor,
      borderRadius: GlobalTheme.viewRadius,
      justifyContent: 'center',
    }),
    btn: {
      width: '40%',
    },
    image: {
      alignSelf: 'center',
      height: small ? '150@vs' : '300@vs',
      width: small ? '150@vs' : '300@vs',
    },
    infotxt: {
      textAlign: 'center',
      maxWidth: '80%',
      alignSelf: 'center',
    },
    max: {
      maxWidth: '80%',
      alignSelf: 'center',
    },
    rowButton: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    btncancel: {
      borderWidth: 2,
      borderColor: GlobalTheme.fontColor,
    },
  });
};
export {AlertModal};
