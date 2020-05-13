import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
const moment = require('moment');

export default function TripsPage ({ navigation }) {
  const tripList = useSelector(state => state.trips);
  const username = useSelector(state => state.name);
  const upcomingTrips = tripList
    .filter((trip) => new Date(trip.date) >= Date.now())
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const pastTrips = tripList
    .filter((trip) => new Date(trip.date) < Date.now())
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const [currentList, setCurrentList] = useState(upcomingTrips);

  function Item ({ trip }) {
    const tripPicture = trip.picture ? { uri: trip.picture } : require('../assets/carClipArt.jpg');
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TripPage', {
            trip,
          });
        }}
        style={styles.item}
      >
        <Text style={styles.tripname}>{trip.title}</Text>
        <Image
          style={styles.photo}
          source={tripPicture}
        />
        <Text style={styles.tripdate}>
          {moment((new Date(trip.date)).toUTCString()).format('MMM Do, YYYY')}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome {username}!</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddTrip');
        }}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Create New Trip</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
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
    textAlign: 'center',
  },
  list: {
    height: '80%',
  },
  item: {
    margin: 20,
    backgroundColor: 'lightgray',
    padding: 10,
    width: 350,
    alignSelf: 'center',
  },
  tripname: {
    fontSize: 30,
  },
  photo: {
    height: 100,
    width: 300,
    marginTop: 5,
    alignSelf: 'center',
  },
  welcome: {
    fontSize: 20,
    margin: 'auto',
    textAlign: 'center',
  },
});