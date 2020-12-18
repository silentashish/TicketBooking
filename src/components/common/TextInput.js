import React, {useState} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import {SmallBoldText, TextField} from './Text';
import {GlobalTheme} from '../theme';

const DNTextInput = (props) => {
  const [text, setText] = useState(props.value);

  const {showTitle = true, showThinTitle = false} = props;

  return (
    <View
      style={[
        props.style,
        styles.shadowViewStyle(props.hasError, props.multiline),
      ]}>
      {showTitle ? (
        <SmallBoldText style={styles.smallBoldTextStyle} text={props.title} />
      ) : showThinTitle ? (
        <TextField>{props.title}</TextField>
      ) : null}
      <TextInput
        style={styles.textInputStyle(props.multiline, props.textAlignVertical)}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder={props.placeholder ? props.placeholder : null}
        keyboardType={props.KeyboardType ? props.KeyboardType : 'default'}
        returnKeyType={props.returnKeyType ? props.returnKeyType : 'done'}
        secureTextEntry={props.secureTextEntry ? true : false}
        autoFocus={props.autoFocus ? true : false}
        selectionColor={GlobalTheme.darkBlueColor}
        placeholderTextColor={GlobalTheme.grey}
        ref={props.refs}
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
  shadowViewStyle: (hasError = false, multiline = false) => ({
    height: multiline ? 130 : 76,
    width: '90%',
    shadowRadius: hasError ? 0 : 5,
    borderRadius: 10,
    borderWidth: hasError ? 1.5 : 0.1,
    shadowOpacity: 0.28,
    alignSelf: 'center',
    paddingHorizontal: 20,
    shadowColor: '#666666',
    justifyContent: 'center',
    borderColor: hasError ? 'red' : 'transparent',
    backgroundColor: GlobalTheme.white,
    shadowOffset: {width: 0, height: 0},
  }),
  smallBoldTextStyle: {
    paddingVertical: 5,
  },
  textInputStyle: (multiline = false, textAlignVertical = false) => ({
    fontSize: 18,
    width: '100%',
    lineHeight: 20,
    borderRadius: 10,
    // borderWidth: 1,
    height: multiline ? 94 : 40,
    color: GlobalTheme.grey,
    paddingTop: multiline ? 10 : null,
    backgroundColor: GlobalTheme.white,
    fontFamily: GlobalTheme.fontRegular,
    textAlignVertical: textAlignVertical ? 'top' : 'center',
  }),
});

export {DNTextInput};
