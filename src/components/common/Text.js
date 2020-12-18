import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {GlobalTheme} from '../theme';

export const TextField = (props) => {
  const {children, onPress, style, numberOfLines} = props;
  const styles = _styles(props);
  return (
    <Text
      numberOfLines={numberOfLines ? numberOfLines : null}
      style={[style, styles.txt]}
      onPress={onPress}>
      {children}
    </Text>
  );
};

const _styles = ({
  title,
  regular,
  largebody,
  color,
  secondarybody,
  center,
  bold,
  huge,
  medium,
  auto,
}) => {
  return ScaledSheet.create({
    txt: {
      fontSize: huge
        ? '25@ms'
        : title
        ? '20@ms'
        : medium
        ? '18@ms'
        : secondarybody
        ? '13@ms'
        : regular
        ? '14@ms'
        : '16@ms',
      color: color ? color : GlobalTheme.fontColor,
      fontWeight: largebody || bold ? 'bold' : null,
      textAlign: center ? 'center' : auto ? 'auto' : null,
    },
  });
};

export const SmallBoldText = (props) => {
  return (
    <Text
      onPress={props.onPress}
      style={[styles.smallBoldText(props.fontSize, props.white), props.style]}>
      {props.text}
    </Text>
  );
};

const styles = StyleSheet.create({
  smallBoldText: (fontSize = false, white = false) => ({
    fontFamily: GlobalTheme.fontBold,
    fontSize: fontSize ? fontSize : 20,
    lineHeight: 18,
    color: white ? GlobalTheme.whiteColor : GlobalTheme.black,
  }),
});
