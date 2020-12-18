import React from 'react';
import {View} from 'react-native';
import {GlobalTheme} from '../theme';
import {ScaledSheet} from 'react-native-size-matters';

const Divider = (props) => {
  const styles = _styles(props);
  return <View style={styles.container} />;
};

const _styles = ({
  small,
  medium,
  large,
  borderTopWidth = 0,
  color = GlobalTheme.midBlueColor,
  horizontal,
}) => {
  return ScaledSheet.create({
    container: {
      width: horizontal
        ? small
          ? '6@s'
          : medium
          ? '12@s'
          : large
          ? '24@s'
          : '20@vs'
        : null,
      height: horizontal
        ? null
        : small
        ? '6@vs'
        : medium
        ? '12@vs'
        : large
        ? '24@ms'
        : '20@ms',
      color: color ? color : null,
      borderTopWidth: borderTopWidth ? borderTopWidth : null,
    },
  });
};

export {Divider};
