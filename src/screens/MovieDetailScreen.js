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
  GlobalTheme,
} from '../components';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {resetSeat} from '../redux/actions/SeatSelect';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
          resizeMode={'cover'}
          source={{
            uri: `https://image.tmdb.org/t/p/w780${backdrop_path}`,
          }}
          style={{width: Dimensions.get('window').width, height: 250}}
        />
        <Divider small />
        <View style={styles.mvInfo}>
          <Image
            resizeMode={'cover'}
            source={{
              uri: `https://image.tmdb.org/t/p/w780${poster_path}`,
            }}
            style={{
              width: Dimensions.get('window').width / 2 - 10,
              height: 300,
              marginLeft: 8,
              borderRadius: 10,
              elevation: 7,
            }}
          />
          <View style={styles.mInfo}>
            <TextField bold color={GlobalTheme.fontColor} title>
              {title}
            </TextField>
            <Divider small />
            <View style={styles.rate}>
              <Icon name="star" size={22} color={'#ffd700'} />
              <Divider horizontal small />
              <TextField regular>
                {vote_average}/{vote_count}
              </TextField>
            </View>

            <Divider small />

            <View style={styles.rate}>
              <Icon name="calendar-today" size={17} color={'#000'} />
              <Divider horizontal small />
              <TextField secondarybody>{release_date}</TextField>
            </View>
          </View>
        </View>
        <Divider medium />
        <View style={styles.contain}>
          <TextField secondarybody style={{textAlign: 'justify'}}>
            {overview}
          </TextField>
        </View>

        <Divider medium />

        <View style={styles.contain}>
          <TextField bold>Seat Booking</TextField>
        </View>

        <Divider medium />

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

        <Divider medium />

        <SeatLayout />
        <Divider medium />
        {allSeat.length > 0 && (
          <View style={styles.contain}>
            <TextField>Selected Seat : {allSeat.toString()}</TextField>
            <Divider />
            <Button mode="outlined" onPress={() => setModalVisible(true)}>
              {' '}
              Book Ticket
            </Button>
          </View>
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
  mvInfo: {
    flexDirection: 'row',
  },
  mInfo: {
    justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
    paddingLeft: 20,
  },
  rate: {
    flexDirection: 'row',
  },
  contain: {
    width: '95%',
    alignSelf: 'center',
  },
});

export {MovieDetailScreen};
