import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const moment = require('moment');

export default function TripsPage () {
  const navigation = useNavigation();
  const username = useSelector(state => state.name);
  const upcomingTrips = useSelector(state => {
    return state.trips
      .filter((trip) => new Date(trip.date) >= Date.now())
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  });
  const pastTrips = useSelector(state => {
    return state.trips
      .filter((trip) => new Date(trip.date) < Date.now())
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  const [showUpcoming, setShowUpcoming] = useState(true);

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
            setShowUpcoming(true);
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>UPCOMING</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowUpcoming(false);
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>PAST TRIPS</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.list}>
        {
          showUpcoming
            ? upcomingTrips.map((trip) => (
              <Item key={trip.id} trip={trip} />
            ))
            : pastTrips.map((trip) => (
              <Item key={trip.id} trip={trip} />
            ))
        }
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