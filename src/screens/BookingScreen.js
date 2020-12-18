import React, {useEffect} from 'react';
import {View, Text, FlatList, Image, Dimensions} from 'react-native';
import {GenericView, Header, SearchBar} from '../components';
import {movieApi} from '../redux/actions/Movie';
import {useSelector, useDispatch} from 'react-redux';

const BookingScreen = () => {
  const dispatch = useDispatch();
  const MovieLoading = useSelector((state) => state.movie.movieListLoading);
  const MovieList = useSelector((state) => state.movie.movieList);
  const ExtraMovieLoading = useSelector(
    (state) => state.movie.extraMovieLoading,
  );

  useEffect(() => {
    dispatch(movieApi({page: 1}));
  }, []);

  const renderItem = ({item}) => {
    return (
      <View>
        <Image
          resizeMode={'cover'}
          source={{
            uri: `https://image.tmdb.org/t/p/w780${item.poster_path}`,
          }}
          style={{width: Dimensions.get('window').width / 2 - 10, height: 300}}
        />
        <Text>{item.title}</Text>
      </View>
    );
  };

  return (
    <GenericView
      title="Booking Page"
      isBackArrow={false}
      loading={MovieLoading}
      extraLoading={ExtraMovieLoading}>
      <>
        <SearchBar />
        <FlatList
          data={MovieList}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </>
    </GenericView>
  );
};

export {BookingScreen};
