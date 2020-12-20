import React, {useState} from 'react';
import {View, Text, Modal, ToastAndroid} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {Button, Divider, DNInput, TextField} from '../common';
import {GlobalTheme} from '../theme';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const InputModal = ({modalVisible, closeModal}) => {
  const navigation = useNavigation();
  const allSeat = useSelector((state) => state.seatselect.selectedSeat);
  const [allInputName, setAllInputName] = useState([]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <View style={styles.container}>
        <View style={styles.modalContain}>
          <Divider medium />
          <TextField bold color={GlobalTheme.darkBlueColor} title>
            Booking Form
          </TextField>

          <Divider small />
          <ScrollView>
            {allSeat.map((item, id) => (
              <View
                style={{
                  width: '90%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <DNInput
                  left={
                    <TextInput.Icon
                      style={{minWidth: 50}}
                      name="account"
                      color={GlobalTheme.darkBlueColor}
                    />
                  }
                  blurOnSubmit={false}
                  label={`Customer name for seat ${item}`}
                  icon="user"
                  // style={styles.mt30}
                  title="Email"
                  value={allInputName[id]}
                  onChangeText={(email) => {
                    let arr = allInputName;
                    arr[id] = email;
                    setAllInputName(arr);
                  }}
                />

                <Divider medium />
              </View>
            ))}
          </ScrollView>
          <Button
            mode="outlined"
            onPress={() => {
              if (allInputName.length === allSeat.length) {
                closeModal();
                navigation.navigate('thankyou', {
                  data: {allInputName, allSeat},
                });
              } else {
                ToastAndroid.show('Enter All Customer Name', ToastAndroid.LONG);
              }
            }}>
            {' '}
            Submit
          </Button>
          <Divider medium />
        </View>
      </View>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContain: {
    backgroundColor: GlobalTheme.white,
    height: '70%',
    // width: '90%',
    borderRadius: GlobalTheme.viewRadius,
    paddingHorizontal: '15@ms',
  },
});

export {InputModal};
