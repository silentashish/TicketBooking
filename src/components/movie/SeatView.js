import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {TextField} from '../common';
import {GlobalTheme} from '../theme';
import {useDispatch} from 'react-redux';
import {addSeat} from '../../redux/actions/SeatSelect';

const greenSeat = require('../../assets/green.png');
const blueSeat = require('../../assets/blue.png');
const redSeat = require('../../assets/red.png');

const SeatView = ({name, red, blue, green}) => {
  const dispatch = useDispatch();
  const handlePress = () => {
    if (!red) {
      dispatch(addSeat(name));
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={red ? redSeat : green ? greenSeat : blueSeat}
        style={styles.img}
      />
      <TextField style={styles.tx} bold color={GlobalTheme.white}>
        {name}
      </TextField>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    height: 50,
    width: 50,
    marginVertical: 10,
  },
  img: {
    height: 50,
    width: 50,
  },
  tx: {
    position: 'absolute',
    top: 9,
    right: 13,
  },
});

export {SeatView};
