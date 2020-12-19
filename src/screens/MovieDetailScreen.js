import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, Image, ScrollView} from 'react-native';
import {
  Button,
  GenericView,
  SeatLayout,
  SeatView,
  TextField,
  Divider,
  InputModal,
} from '../components';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {resetSeat} from '../redux/actions/SeatSelect';

const MovieDetailScreen = (props) => {
  const data = props.route.params;
  const {
    adult,
    backdrop_path,
    original_language,
    original_title,
    overview,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
    vote_count,
  } = data;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetSeat());
    };
  }, []);

  const allSeat = useSelector((state) => state.seatselect.selectedSeat);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <GenericView title={title} isBackArrow>
      <ScrollView>
        <Image
          resizeMode={'contain'}
          source={{
            uri: `https://image.tmdb.org/t/p/w780${backdrop_path}`,
          }}
          style={{width: Dimensions.get('window').width, height: 300}}
        />
        <Image
          resizeMode={'cover'}
          source={{
            uri: `https://image.tmdb.org/t/p/w780${poster_path}`,
          }}
          style={{width: Dimensions.get('window').width / 2 - 10, height: 300}}
        />
        <TextField>{title}</TextField>

        <TextField>{overview}</TextField>
        <TextField>{release_date}</TextField>

        <TextField>
          {vote_average}/{vote_count}
        </TextField>
        <TextField>{adult ? '18+' : ''}</TextField>
        <TextField bold>Seat Booking</TextField>
        <View style={styles.info}>
          <View style={styles.item}>
            <SeatView name="S1" green />
            <TextField secondarybody>Selected</TextField>
          </View>
          <View style={styles.item}>
            <SeatView name="S1" blue />
            <TextField secondarybody>Available</TextField>
          </View>
          <View style={styles.item}>
            <SeatView name="S1" red />
            <TextField secondarybody>Booked</TextField>
          </View>
        </View>
        <SeatLayout />
        <Divider />
        {allSeat.length > 0 && (
          <>
            <TextField>Selected Seat : {allSeat.toString()}</TextField>
            <Divider />
            <Button mode="outlined" onPress={() => setModalVisible(true)}>
              {' '}
              Book Ticket
            </Button>
          </>
        )}
        <Divider />
        <InputModal
          modalVisible={modalVisible}
          closeModal={() => setModalVisible(false)}
        />
      </ScrollView>
    </GenericView>
  );
};

const styles = ScaledSheet.create({
  info: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {MovieDetailScreen};
