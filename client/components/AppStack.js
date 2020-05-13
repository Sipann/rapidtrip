import React from 'react';
import TripsPage from './TripsPage';
import AddTrip from './AddTrip';
import TripPage from './TripPage';
import CarAllocation from './CarAllocation';
import ChooseLocation from './ChooseLocation';
import DeleteTrip from './DeleteTrip';
import TripDetails from './TripDetails';
import TripEdit from './TripEdit';
import ParticipantsList from './ParticipantsList';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AppStack () {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="TripsPage">
        <Stack.Screen
          name="TripsPage"
          component={TripsPage}
          options={{
            title: 'RapidTrip',
          }}
        />
        <Stack.Screen
          name="AddTrip"
          component={AddTrip}
          options={{ title: 'Add a Trip' }}
        />
        <Stack.Screen name="TripPage" component={TripPage} />
        <Stack.Screen
          name="ChooseLocal"
          component={ChooseLocation}
          options={{ title: 'Choose Trip Destination' }}
        />
        <Stack.Screen
          name="CarAllo"
          component={CarAllocation}
          options={{ title: 'Car Allocation' }}
        />
        <Stack.Screen
          name="DeleteTrip"
          component={DeleteTrip}
          options={{ title: 'Delete the Trip' }}
        />
        <Stack.Screen
          name="TripDetails"
          component={TripDetails}
          options={{ title: 'Trip Details' }}
        />
        <Stack.Screen
          name="TripEdit"
          component={TripEdit}
          options={{ title: 'Edit the Trip' }}
        />
        <Stack.Screen
          name="ParticipantsList"
          component={ParticipantsList}
          options={{ title: 'List of Participants' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
