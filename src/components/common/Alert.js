import React, {useEffect, useRef} from 'react';
import {View, Text} from 'react-native';

import AlertPro from 'react-native-alert-pro';
import {GlobalTheme} from '../theme';
import {ScaledSheet} from 'react-native-size-matters';

const DNAlert = ({
  showAlert,
  hideAlert,
  cancelText = 'Cancel',
  confirmText = 'Ok',
  skippedQuestionAlert = false,
  info: {title, message},
  okBtnHandler,
  showCancelButton = 'true',
}) => {
  let alertref = useRef();

  useEffect(() => {
    if (alertref) {
      alertref.current.open();
    }
  }, [alertref]);

  useEffect(() => {
    if (showAlert) {
      alertref.current.open();
    } else {
      alertref.current.close();
    }
  }, [showAlert]);

  return (
    <AlertPro
      ref={alertref}
      useNativeDriver
      show={showAlert}
      showProgress={false}
      title={title}
      message={message}
      closeOnPressMask={false} // mandatory to change after
      closeOnPressBack={false}
      showCancel={showCancelButton === 'true' ? true : false}
      showConfirm={true}
      textCancel={cancelText}
      textConfirm={confirmText}
      confirmButtonColor={GlobalTheme.darkBlueColor}
      onCancel={() => {
        hideAlert();
      }}
      onConfirm={() => {
        if (skippedQuestionAlert) {
          okBtnHandler();
        } else {
          hideAlert();
          okBtnHandler();
        }
      }}
      customStyles={{
        title: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        container: {
          paddingHorizontal: 20,
          // width: '65%',
        },
        buttonCancel: {
          // backgroundColor: '#4da6ff',
          borderWidth: 2,
          borderColor: GlobalTheme.darkBlueColor,
          backgroundColor: 'transparent',
        },
        buttonConfirm: {
          backgroundColor: GlobalTheme.darkBlueColor,
          alignItems: 'center',
          justifyContent: 'center',
        },
        textCancel: {
          color: GlobalTheme.darkBlueColor,
        },
      }}
    />
  );
};

const styles = ScaledSheet.create({
  container: {
    width: '90%',
    // height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '20@ms',
  },
  button: {
    width: '100@s',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30@vs',
    // borderWidth: 2,
  },
  titleStyle: {
    // fontWeight: 'bold',
    fontSize: '25@ms',
  },
  messageStyle: {
    fontSize: '15@ms',
  },
});
export {DNAlert};
