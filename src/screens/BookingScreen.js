import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Divider,
  GenericView,
  GlobalTheme,
  Header,
  SearchBar,
  TextField,
} from '../components';
import {movieApi} from '../redux/actions/Movie';
import {useSelector, useDispatch} from 'react-redux';
import Slider from 'rn-range-slider';
import {ScaledSheet} from 'react-native-size-matters';
import {showModal} from '../redux/actions/Modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BookingScreen = (props) => {
  const dispatch = useDispatch();
  const MovieLoading = useSelector((state) => state.movie.movieListLoading);
  const MovieList = useSelector((state) => state.movie.movieList);
  const ExtraMovieLoading = useSelector(
    (state) => state.movie.extraMovieLoading,
  );

  const [page, setPage] = useState(1);

  const [searchText, setSearchText] = useState('');
  const [showMovieList, setShowMovieList] = useState([]);

  const [lowStar, setLowStar] = useState(2);
  const [highStar, setHighStar] = useState(10);

  useEffect(() => {
    dispatch(movieApi({page}));
  }, [page]);

  useEffect(() => {
    let newList = [];
    MovieList.map((item) => {
      if (item.vote_average > lowStar && item.vote_average < highStar) {
        if (searchText) {
          if (item.title.includes(searchText)) {
            newList = [...newList, item];
          }
        } else {
          newList = [...newList, item];
        }
      }
    });
    setShowMovieList(newList);
  }, [MovieList, searchText, lowStar, highStar]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.MovieBox}
        onPress={() => props.navigation.navigate('moviedetail', item)}>
        <Image
          resizeMode={'cover'}
          source={{
            uri: `https://image.tmdb.org/t/p/w780${item.poster_path}`,
          }}
          style={{width: '100%', height: 250}}
        />
        <View style={styles.infoBox}>
          <TextField bold color={GlobalTheme.borderColor} numberOfLines={2}>
            {item.title}
          </TextField>
          <View style={styles.rate}>
            <Icon name="star" size={20} color={'#ffd700'} />
            <TextField regular>
              {item.vote_average}/{item.vote_count}
            </TextField>
          </View>
        </View>
        <View style={styles.bookNow}>
          <TextField bold color={GlobalTheme.white}>
            Book Now
          </TextField>
        </View>
      </TouchableOpacity>
    );
  };

  const logOut = async () => {
    let modalConfig = {
      title: 'Logout!',
      message: 'Are you sure you want to logout?',
      shouldLogout: true,
      modalBottomMessage:
        'You can login later with your username and password.',
      modalImage: 'logout',
    };
    dispatch(showModal(modalConfig));
  };

  return (
    <GenericView
      title="Movie Booking"
      isBackArrow={false}
      isExit
      loading={MovieLoading}
      onExitHandlerPress={logOut}
      extraLoading={ExtraMovieLoading}>
      <>
        <Divider small />
        <SearchBar
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <Divider medium />
        <View style={{width: '90%', alignSelf: 'center'}}>
          <TextField bold>Filter</TextField>
          <TextField secondarybody>
            (changing the slider position changes average rating)
          </TextField>
          <Slider
            style={{
              width: '100%',
              height: 50,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
            gravity={'center'}
            min={2}
            max={10}
            step={1}
            allowLabelOverflow
            selectionColor="#3df"
            blankColor="#f618"
            onValueChanged={(low, high, fromUser) => {
              setLowStar(low);
              setHighStar(high);
            }}
            renderThumb={() => <View style={styles.root} />}
            renderRail={() => <View style={styles.rail} />}
            renderRailSelected={() => <View style={styles.railselected} />}
            renderLabel={({text, ...restProps}) => {
              return (
                <View style={styles.label} {...restProps}>
                  <Text style={styles.text}>{text}</Text>
                </View>
              );
            }}
            renderNotch={(props) => <View style={styles.notch} {...props} />}
          />
          <View style={styles.score}>
            <TextField secondarybody>{lowStar}</TextField>
            <TextField secondarybody>{highStar}</TextField>
          </View>
          <Divider small />
        </View>

        <FlatList
          data={showMovieList}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReached={() => setPage((page) => page + 1)}
        />
      </>
    </GenericView>
  );
};
const THUMB_RADIUS = 10;

const styles = ScaledSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    borderColor: '#7f7f7f',
    backgroundColor: '#ffffff',
  },
  rail: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#7f7f7f',
  },
  railselected: {
    height: 4,
    backgroundColor: '#4499ff',
    borderRadius: 2,
  },
  notch: {
    width: 10,
    height: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4499ff',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
    display: 'none',
  },
  label: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#4499ff',
    borderRadius: 4,
    height: 0,
    width: 0,
    display: 'none',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  score: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  MovieBox: {
    width: '45%',
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: GlobalTheme.white,
    overflow: 'hidden',
    borderRadius: 5,
    height: 360,
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 4,
  },
  infoBox: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  rate: {
    flexDirection: 'row',
  },
  bookNow: {
    backgroundColor: GlobalTheme.darkBlueColor,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {BookingScreen};
