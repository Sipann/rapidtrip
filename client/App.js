import 'react-native-gesture-handler';
import React from 'react';
import Result from './components/Result';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TripDetails from './screens/TripDetails';
import ParticipantsScreen from './screens/ParticipantsScreen';

import Form from './MVPForm/FormLaunch';

import Colors from './constants/colors';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ParticipantsScreen"
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
          }}
        >
          <Stack.Screen
            name="ParticipantsList"
            component={ParticipantsScreen}
            options={{ title: 'Trip Participants' }}
          />
          <Stack.Screen
            name="TripDetails"
            component={TripDetails}
            options={{ title: 'Trip Details' }}
          />
          <Stack.Screen
            name="MVPForm"
            component={Form}
            options={{ title: 'Trippy' }}
          />
          <Stack.Screen
            name="Result"
            component={Result}
            options={{ title: 'Car Allocation' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
