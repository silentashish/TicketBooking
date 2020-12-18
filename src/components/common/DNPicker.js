import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-community/picker';

import {GlobalTheme} from '../theme';
import {ScaledSheet} from 'react-native-size-matters';
import {TextInput} from 'react-native-paper';

const DNPicker = (props) => {
  const {
    data,
    value,
    onValueChange,
    labelName,
    valueName,
    title,
    modalTitle,
    error,
    hideModalTitle,
  } = props;
  const styles = _styles(props);

  return (
    <TextInput
      error={error}
      label={title}
      mode="outlined"
      value={value ? value : '   '}
      style={styles.input}
      render={(props) => (
        <View style={styles.shadowViewStyle}>
          <Picker
            selectedValue={value}
            style={styles.pickerStyle}
            onValueChange={onValueChange}>
            {/* {!hideModalTitle && (
              <Picker.Item
                label={modalTitle ?? title ?? 'Select'}
                value={undefined}
              />
            )} */}
            {data.map((item) => (
              <Picker.Item
                label={item[labelName ? labelName : 'label']}
                value={item[valueName ? valueName : 'value']}
              />
            ))}
            {!data && (
              <Picker.Item label="Nine-A (2077)" value="Nine-A (2077)" />
            )}
          </Picker>
        </View>
      )}
    />
  );
};

const _styles = ({full}) => {
  return ScaledSheet.create({
    input: {
      height: '45@vs',
      width: full ? '100%' : '90%',
      alignSelf: 'center',
      backgroundColor: GlobalTheme.background,
    },
    shadowViewStyle: {
      height: '45@vs',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: GlobalTheme.viewRadius,
      borderWidth: 0.1,
      alignSelf: 'center',
      padding: 10,
      justifyContent: 'center',
      borderColor: 'transparent',
    },
    pickerStyle: {
      height: '45@vs',
      width: '100%',
    },
    pickerIconStyle: {
      position: 'absolute',
      right: 25,
    },
  });
};

export {DNPicker};
