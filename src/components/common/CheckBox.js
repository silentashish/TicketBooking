import React, {useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import ShadowView from 'react-native-simple-shadow-view';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {TextField} from './Text';
import {GlobalTheme} from '../theme';

const DNCheckBox = (props) => {
  const [selected, setSelected] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setSelected(!selected);
      }}>
      <View style={[styles.checkboxWrapper, props.style]}>
        <ShadowView style={styles.checkbox(selected)}>
          <Icon
            style={{alignSelf: 'center', top: 2}}
            name="check"
            size={15}
            color="#FFF"
          />
        </ShadowView>

        <TextField regular styles={styles.checkboxLabel}>
          {props.label}
        </TextField>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: (selected) => ({
    width: 20,
    height: 20,
    shadowColor: GlobalTheme.darkBlueColor,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 0},
    borderColor: GlobalTheme.lightGrey,
    borderRadius: 3,
    marginRight: 10,
    shadowOpacity: selected ? 0.28 : 0,
    borderWidth: selected ? 0 : 2,
    backgroundColor: selected ? GlobalTheme.darkBlueColor : GlobalTheme.white,
  }),
  checkboxLabel: {
    fontSize: GlobalTheme.fontSizeRegular,
    lineHeight: 24,
    color: GlobalTheme.fontColor,
  },
});

export {DNCheckBox};
