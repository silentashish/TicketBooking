import React from 'react';

import {Button} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

import {GlobalTheme} from '../theme';

//  Button component
const ButtonCustom = (props) => {
  const {buttonDisabled = false} = props;
  const styles = _styles(props);

  return (
    <Button
      disabled={buttonDisabled}
      {...props}
      style={[styles.button, props.style]}
    />
  );
};

// styles for button
const _styles = ({color, mode, margined, smallHeight}) => {
  const outline = mode === 'outlined';
  const text = !mode || mode === 'text';
  const contained = mode === 'contained';

  return ScaledSheet.create({
    button: {
      height: smallHeight ? '25@vs' : '40@vs',
      borderWidth: outline ? 2 : null,
      width: margined ? '90%' : null,
      alignSelf: margined ? 'center' : null,
      borderColor: outline ? (color ? color : GlobalTheme.darkBlueColor) : null,
      justifyContent: 'center',
    },
  });
};

export {ButtonCustom as Button};
