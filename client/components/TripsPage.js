import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

export default function TripsPage ({ navigation }) {
  const tripList = mockedTrips;
  const upcomingTrips = tripList
    .filter((trip) => trip.date >= Date.now())
    .sort((a, b) => a.date - b.date);
  const pastTrips = tripList
    .filter((trip) => trip.date < Date.now())
    .sort((a, b) => b.date - a.date);

  const [currentList, setCurrentList] = useState(upcomingTrips);

  function Item ({ trip }) {
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate('TripPage', {
          trip
        });
      }} style={styles.item}>
        <Text style={styles.tripname}>{trip.title}</Text>
        <Image
          style={styles.photo}
          source={require('../assets/carClipArt.jpg')}
        />
        <Text style={styles.tripdate}>{trip.date.toUTCString()}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome USERNAME!</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddTrip');
        }}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Creat New Trip</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          onPress={() => {
            setCurrentList(upcomingTrips);
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>UPCOMING</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentList(pastTrips);
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>PAST TRIPS</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.list}>
        {currentList.map((trip) => (
          <Item key={trip.id} trip={trip} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 20,
  },
  button: {
    backgroundColor: 'blue',
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    margin: 10,
    color: 'white',
    textAlign: 'center'
  },
  list: {
    height: '80%',
  },
  item: {
    margin: 20,
    backgroundColor: 'lightgray',
    padding: 10,
  },
  tripname: {
    fontSize: 30,
  },
  photo: {
    height: 100,
    width: '100%',
    marginTop: 5,
  },
  welcome: {
    margin: 'auto',
    textAlign: 'center',
  },
});

const mockedTrips = [
  {
    id: 1,
    title: 'London Roadtrip',
    date: new Date(2014, 6, 5),
  },
  {
    id: 2,
    title: 'Amsterdam Weekend',
    date: new Date(2013, 12, 7),
  },
  {
    id: 11,
    title: 'Amsterdam Weekend',
    date: new Date(2013, 12, 7),
  },
  {
    id: 3,
    title: 'Weekend at Munich',
    date: new Date(2016, 11, 7),
  },
  {
    id: 4,
    title: 'Camping Weekend',
    date: new Date(2016, 12, 8),
  },
  {
    id: 5,
    title: 'Trip to Rome',
    date: new Date(2017, 2, 8),
  },
  {
    id: 6,
    title: 'Trip to Barcelona',
    date: new Date(2020, 5, 10),
  },
  {
    id: 7,
    title: 'Trip to Chamonix',
    date: new Date(2020, 5, 11),
  },
  {
    id: 8,
    title: 'Trip to Andora',
    date: new Date(2020, 5, 15),
  },
  {
    id: 9,
    title: 'Trip to Milan',
    date: new Date(2020, 5, 20),
  },
  {
    id: 10,
    title: 'Trip to Rome',
    date: new Date(2020, 7, 20),
  },
];
