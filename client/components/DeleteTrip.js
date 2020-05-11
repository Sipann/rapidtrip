import React from 'react';
import {  View, Text } from 'react-native';

export default function DeleteTrip ({ route }) {
  const { trip } = route.params;
  const userId = 2;
  trip.adminId = 2;

  if (userId === trip.adminId) {  //ADMIN ID IS NOT GREAT
    return (
      <View>
        <Text>Delete Trip Page</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Only the Admin can delete this trip</Text>
      </View>
    );
  }

}
