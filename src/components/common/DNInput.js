import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import {TextInput} from 'react-native-paper';
import {GlobalTheme} from '../theme';

const DNInput = (props) => {
  const [text, setText] = useState(props.value);
  const [passVisible, setPassVisible] = useState(false);
  const {title, icon, style, disabled} = props;

  return (
    // <View style={styles.inputWrapper}>
    <View style={styles.inputRow}>
      <TextInput
        disabled={disabled}
        left={props.left}
        right={
          props.isPassword ? (
            <TextInput.Icon
              style={{minWidth: 50}}
              onPress={() => {
                setPassVisible(!passVisible);
              }}
              name={passVisible ? 'eye-off' : 'eye'}
            />
          ) : (
            props.right
          )
        }
        mode="outlined"
        label={props.label}
        style={[
          style,
          styles.textInputStyle(
            props.hasError,
            props.multiline,
            props.textAlignVertical,
          ),
        ]}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder={props.placeholder ? props.placeholder : ''}
        keyboardType={props.KeyboardType ? props.KeyboardType : 'default'}
        returnKeyType={props.returnKeyType ? props.returnKeyType : 'done'}
        secureTextEntry={props.secureTextEntry && !passVisible ? true : false}
        autoFocus={props.autoFocus ? true : false}
        selectionColor={GlobalTheme.darkBlueColor}
        error={props.hasError}
        placeholderTextColor={'rgba(65, 65, 65,0.65)'}
        editable={props.editable ? false : true}
        multiline={props.multiline ? true : false}
        numberOfLines={props.multiline ? 4 : null}
        value={props.value != '' ? props.value : null}
        onChangeText={(text) => {
          setText(text);
          props.onChangeText(text);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    width: '90%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputStyle: (multiline = false, textAlignVertical = false, hasError) => ({
    fontSize: 18,
    width: '90%',
    borderColor: hasError == true ? 'red' : GlobalTheme.black,
    color: 'rgba(65, 65, 65,0.65)',
    backgroundColor: GlobalTheme.white,
    fontFamily: GlobalTheme.fontRegular,
    textAlignVertical: textAlignVertical ? 'top' : 'center',
  }),
});

export {DNInput};
