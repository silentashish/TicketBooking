import React from 'react';
import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {Button, Divider, GenericView, TextField} from '../components';
import {useNavigation} from '@react-navigation/native';

const ThankyouScreen = (props) => {
  const data = props.route.params.data;
  const {allInputName, allSeat} = data;

  const navigation = useNavigation();

  return (
    <GenericView title="Thank you for booking" isBackArrow>
      <>
        <View style={styles.container}>
          <Divider medium />
          <View style={styles.table}>
            <View style={styles.left}>
              <TextField bold>Seat Number</TextField>
            </View>
            <View style={styles.left}>
              <TextField bold>Customer Name</TextField>
            </View>
          </View>
          {allInputName.map((item, id) => (
            <View style={styles.table}>
              <View style={styles.left}>
                <TextField>{allSeat[id]}</TextField>
              </View>
              <View style={styles.left}>
                <TextField>{allInputName[id]}</TextField>
              </View>
            </View>
          ))}
          <Divider medium />
          <Button
            mode="outlined"
            margined
            onPress={() => navigation.navigate('booking')}>
            Done
          </Button>
        </View>
      </>
    </GenericView>
  );
};

const styles = ScaledSheet.create({
  container: {},
  table: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 5,
  },
});

export {ThankyouScreen};
