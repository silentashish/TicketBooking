import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackIcon from 'react-native-vector-icons/MaterialIcons';
import {TextField} from './Text';
import {GlobalTheme, GlobalStyle} from '../theme';
import {ProgressBar} from '@react-native-community/progress-bar-android';

/* Props
isBackArrow for back button
isFlag for flag icon
onPress for back navigation operation
title for navigation title
style for custom style
*/

const Header = (props) => {
  const styles = _styles(props);
  const {
    isBackArrow = false,
    isFlag = false,
    title,
    style,
    isNotification,
    goToNotice,
    // isLogout,
    isExit,
    isMenu = false,
    extraLoading,
  } = props;

  const navigation = useNavigation();

  const [isEng, setIsEng] = useState(true);

  const _popScreen = () => {
    navigation.pop();
  };

  const _switchLanguage = () => {
    setIsEng(!isEng);
  };

  const _openMenu = () => {
    navigation.navigate('Menu');
  };

  return (
    <>
      <View style={[GlobalStyle.shadow, styles.headerStyle]}>
        {extraLoading && (
          <View
            style={{
              position: 'absolute',
              top: GlobalTheme.headerHeight - 7,
              width: '100%',
            }}>
            <ProgressBar
              styleAttr="Horizontal"
              color={GlobalTheme.darkBlueColor}
              style={{
                margin: 0,
                paddingBottom: 0,
                height: 12,
              }}
            />
          </View>
        )}
        <View style={styles.titleRow}>
          {isBackArrow && (
            <TouchableOpacity onPress={() => _popScreen()}>
              <BackIcon
                style={styles.iconStyle}
                name="arrow-back"
                color={GlobalTheme.fontColor}
                size={25}
              />
            </TouchableOpacity>
          )}
          <TextField
            numberOfLines={1}
            color={GlobalTheme.fontColor}
            white
            title>
            {title}
          </TextField>
        </View>

        <View style={styles.flagRow}>
          {isFlag && (
            // <Icon style={styles.iconStyle} name="flag" color={'#fff'} size={25} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => _switchLanguage()}>
              <TextField regular color="white" style={{right: 10}}>
                {isEng ? 'ENG' : 'NEP'}
              </TextField>
            </TouchableOpacity>
          )}

          {isNotification && (
            <TouchableOpacity activeOpacity={0.7} onPress={goToNotice}>
              <Icon
                style={styles.iconStyle}
                name="bell"
                color={GlobalTheme.fontColor}
                size={22}
              />
            </TouchableOpacity>
          )}

          {isMenu && (
            <TouchableOpacity activeOpacity={0.7} onPress={_openMenu}>
              <BackIcon
                style={styles.iconStyle}
                name="more-vert"
                color={GlobalTheme.fontColor}
                size={26}
                style={{width: 22}}
              />
            </TouchableOpacity>
          )}

          {isExit && (
            <TouchableOpacity onPress={props.onExitHandlerPress}>
              <Icon name="power-off" size={22} color={GlobalTheme.red} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

const _styles = ({}) => {
  return StyleSheet.create({
    headerStyle: {
      height: GlobalTheme.headerHeight,
      backgroundColor: GlobalTheme.whiteColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20,
    },
    flagRow: {
      paddingRight: 22,
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconStyle: {
      marginRight: 20,
    },
  });
};

export {Header};
