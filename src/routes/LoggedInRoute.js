import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import pages
import {BookingScreen, MovieDetailScreen} from '../screens';

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="booking" component={BookingScreen} />
      <Stack.Screen name="moviedetail" component={MovieDetailScreen} />
    </Stack.Navigator>
  );
}

export {App as LoggedInRoute};
