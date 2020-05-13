import React from 'react';
import TripsPage from '../components/TripsPage';
import AddTrip from '../components/AddTrip';
import TripPage from '../components/TripPage';
import CarAllocation from '../components/CarAllocation';
import ChooseLocation from '../components/ChooseLocation';
import DeleteTrip from '../components/DeleteTrip';
import TripDetails from '../components/TripDetails';
import TripEdit from '../components/TripEdit';
import ParticipantsList from '../components/ParticipantsList';
import ParticipantResponse from '../screens/ParticipantResponse';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AppScreens() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="ParticipantResponse">
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
        <Stack.Screen
          name="ParticipantResponse"
          component={ParticipantResponse}
          options={{ title: 'Participant Response' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
