import React from 'react';
import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {seatData} from '../../utils/MovieData';
import {SeatView} from './SeatView';
import {useSelector} from 'react-redux';

const SeatLayout = () => {
  const allSeat = useSelector((state) => state.seatselect.selectedSeat);
  return (
    <View style={styles.container}>
      {seatData.map((itemList) => (
        <View style={styles.rowStyle}>
          {itemList.map((item) => (
            <SeatView
              name={item.name}
              red={item.booked}
              green={allSeat.includes(item.name)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {flexDirection: 'row', justifyContent: 'space-around'},
  rowStyle: {
    flexDirection: 'column',
  },
});

export {SeatLayout};
