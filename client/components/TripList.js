import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

// TODO remove mock data and fetch from database and add to Redux store
const mockedTrips = [
  {
    id: 1,
    title: 'Trip to Portugal',
    date: new Date(2020, 6, 5)
  },
  {
    id: 2,
    title: 'Trip to New York',
    date: new Date(2020, 12, 7)
  }
];

export default function TripList () {

  const tripList = mockedTrips;
  const upcomingTrips = tripList.filter(trip => trip.date >= Date.now());
  const pastTrips = tripList.filter(trip => trip.date < Date.now());
  
  const [currentList, setCurrentList] = useState(upcomingTrips);

  function Item ({ trip }) {
    return (
      <View style={styles.item}>
        <Text>{trip.title}</Text>
        <Text>{trip.date}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <Button title='PAST TRIPS' onPress={() => { setCurrentList(pastTrips); }}/>
        <Button title='UPCOMING' onPress={() => { setCurrentList(upcomingTrips); }}/>
      </View>
      <View style={styles.list}>
        {
          currentList.map(trip =>
            <Item
              key={trip.id}
              trip={trip}
            />)
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  buttonGroup: {},
  list: {},
  item: {}
});