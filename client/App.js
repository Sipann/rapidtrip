import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Homepage from './components/Homepage';
import TripList from './components/TripList';
import FriendList from './components/FriendList';
import Settings from './components/Settings';
import Profile from './components/Profile';

import Colors from './constants/colors';

const Stack = createStackNavigator();

export default function App () {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name='Home'
            component={Homepage}
            options={{title: 'RapidTrip'}}
          />
          <Stack.Screen
            name='TripList'
            component={TripList}
            options={{title: 'My Trips'}}
          />
          <Stack.Screen
            name='FriendList'
            component={FriendList}
            options={{title: 'My Friends'}}
          />
          <Stack.Screen
            name='Settings'
            component={Settings}
            options={{title: 'Settings'}}
          />
          <Stack.Screen
            name='Profile'
            component={Profile}
            options={{title: 'My profile'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
});
