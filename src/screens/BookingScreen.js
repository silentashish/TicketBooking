import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {GenericView, Header, SearchBar} from '../components';
import {movieApi} from '../redux/actions/Movie';
import {useSelector, useDispatch} from 'react-redux';
import Slider from 'rn-range-slider';
import {ScaledSheet} from 'react-native-size-matters';

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
        onPress={() => props.navigation.navigate('moviedetail', item)}>
        <Image
          resizeMode={'cover'}
          source={{
            uri: `https://image.tmdb.org/t/p/w780${item.poster_path}`,
          }}
          style={{width: Dimensions.get('window').width / 2 - 10, height: 300}}
        />
        <Text>{item.title}</Text>
        <Text>
          {item.vote_average}/{item.vote_count}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <GenericView
      title="Booking Page"
      isBackArrow={false}
      loading={MovieLoading}
      extraLoading={ExtraMovieLoading}>
      <>
        <SearchBar
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <Slider
          style={{width: '90%', height: 100, alignSelf: 'center'}}
          gravity={'center'}
          min={2}
          max={10}
          step={1}
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
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4499ff',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
  label: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#4499ff',
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export {BookingScreen};
