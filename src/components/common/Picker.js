import React from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-community/picker';

import {TextInput} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

import {GlobalTheme} from '../theme';

const PickerModal = (props) => {
  const {
    data,
    value,
    onValueChange,
    labelName,
    valueName,
    title,
    hasError,
  } = props;
  const styles = _styles(props);

  return (
    <TextInput
      label={title}
      mode="outlined"
      value={value ? value : '   '}
      style={styles.input}
      render={(props) => (
        <View style={styles.shadowViewStyle}>
          <Picker
            selectedValue={value}
            style={styles.pickerStyle}
            error={hasError}
            onValueChange={onValueChange}>
            {/* <Picker.Item label={title ? title : 'Select'} value={undefined} /> */}
            {data.map((item) => (
              <Picker.Item
                key={item.id}
                label={item[labelName ? labelName : 'label']}
                value={item[valueName ? valueName : 'value']}
              />
            ))}
            {/* {!data && (
              <Picker.Item label="Nine-A (2077)" value="Nine-A (2077)" />
            )} */}
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
      // width: full ? '100%' : '80%',
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
      padding: 5,
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

export {PickerModal};

// import React, {useState, useEffect} from 'react';
// import {View, StyleSheet} from 'react-native';

// import {Picker} from '@react-native-community/picker';
// import ShadowView from 'react-native-simple-shadow-view';
// import Icon from 'react-native-vector-icons/FontAwesome5';

// import {GlobalTheme} from '../theme';

// import {useSelector} from 'react-redux';

// const PickerModal = (props) => {
//   const leaveReqSuccess = useSelector((state) => state.leave.leaveReqSuccess);

//   const [selectedValue, setSelectedValue] = useState('');

//   useEffect(() => {
//     if (leaveReqSuccess) {
//       setSelectedValue('');
//     }
//   }, [leaveReqSuccess]);

//   const items = props.pickOptions.map((item, id) => (
//     <Picker.Item key={item.id} label={item.label} value={item.value} />
//   ));

//   return (
//     <ShadowView style={[props.style, styles.shadowViewStyle(props.hasError)]}>
//       <Picker
//         style={styles.pickerStyle}
//         selectedValue={selectedValue}
//         onValueChange={(itemValue, itemPosition) => {
//           setSelectedValue(itemValue);
//           props.onValueChange(itemValue, itemPosition);
//         }}>
//         {items}
//       </Picker>
//       <Icon
//         style={styles.pickerIconStyle}
//         name="chevron-down"
//         size={20}
//         color={GlobalTheme.black}
//       />
//     </ShadowView>
//   );
// };

// const styles = StyleSheet.create({
//   shadowViewStyle: (hasError = false) => ({
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     height: 60,
//     width: '90%',
//     shadowRadius: hasError ? 0 : 5,
//     borderRadius: GlobalTheme.viewRadius,
//     borderWidth: hasError ? 1.5 : 0.1,
//     shadowOpacity: 0.28,
//     alignSelf: 'center',
//     padding: 10,
//     shadowColor: '#666666',
//     justifyContent: 'center',
//     borderColor: hasError ? 'red' : 'transparent',
//     backgroundColor: GlobalTheme.white,
//     shadowOffset: {width: 0, height: 0},
//   }),
//   pickerStyle: {
//     height: 56,
//     width: '100%',
//     backgroundColor: '#FFF',
//   },
//   pickerIconStyle: {
//     position: 'absolute',
//     right: 25,
//     fontSize: 16,
//   },
// });

// export {PickerModal};
