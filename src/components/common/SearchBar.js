import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {Searchbar} from 'react-native-paper';

import {GlobalTheme} from '../theme';

const SearchBar = (props) => {
  const [text, setText] = useState('');

  return (
    <View style={{width: '90%', alignSelf: 'center'}}>
      <Searchbar
        placeholder="Search"
        value={props.value !== '' ? props.value : null}
        onChangeText={(text) => {
          setText(text);
          props.onChangeText(text);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shadowViewStyle: (full = false) => ({
    height: 54,
    width: full ? '100%' : '90%',
    shadowRadius: 5,
    borderRadius: GlobalTheme.viewRadius,
    borderWidth: 0.1,
    shadowOpacity: 0.28,
    alignSelf: 'center',
    shadowColor: '#666666',
    justifyContent: 'center',
    borderColor: 'transparent',
    backgroundColor: GlobalTheme.white,
    shadowOffset: {width: 0, height: 0},
  }),
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconStyle: {
    left: 5,
  },
  textInputStyle: {
    height: 50,
    width: '80%',
    fontSize: 18,
    lineHeight: 20,
    borderRadius: GlobalTheme.viewRadius,
    paddingRight: 10,
    color: GlobalTheme.grey,
    backgroundColor: GlobalTheme.white,
    fontFamily: GlobalTheme.fontRegular,
  },
});

export {SearchBar};
