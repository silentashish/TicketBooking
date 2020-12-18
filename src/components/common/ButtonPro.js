import React, {useEffect} from 'react';

import {TouchableOpacity, ActivityIndicator} from 'react-native';
import {Button} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

import {GlobalTheme} from '../theme';
import {TextField} from './Text';

//  Button component
const ButtonPro = (props) => {
  const {title, onPress, loading, style, disabled, color} = props;
  const styles = _styles(props);

  useEffect(() => {
    console.log('DISABLED STATUS', disabled);
  }, [disabled]);

  return (
    <TouchableOpacity
      activeOpacity={0.2}
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, style]}>
      <TextField style={{marginRight: 4}} color="white">
        {title.toUpperCase()}
      </TextField>
      {loading && <ActivityIndicator size="small" color={GlobalTheme.white} />}
    </TouchableOpacity>
  );
};

// styles for button
const _styles = ({}) => {
  return ScaledSheet.create({
    button: {
      height: '40@vs',
      // borderWidth: 2,
      borderColor: GlobalTheme.darkBlueColor,
      justifyContent: 'center',
      width: 80,
      alignItems: 'center',
      borderRadius: GlobalTheme.viewRadius,
      flexDirection: 'row',
      justifyContent: 'space-around',
      // height: smallHeight ? '25@vs' : '40@vs',
      // borderWidth: outline ? 2 : null,
      // width: margined ? '90%' : null,
      // alignSelf: margined ? 'center' : null,
      // borderColor: outline ? (color ? color : GlobalTheme.darkBlueColor) : null,
      // justifyContent: 'center',
    },
  });
};

export {ButtonPro};
