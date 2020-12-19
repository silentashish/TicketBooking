import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import pages
import {BookingScreen, MovieDetailScreen, ThankyouScreen} from '../screens';

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="booking" component={BookingScreen} />
      <Stack.Screen name="moviedetail" component={MovieDetailScreen} />
      <Stack.Screen name="thankyou" component={ThankyouScreen} />
    </Stack.Navigator>
  );
}

export {App as LoggedInRoute};
