import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../constants/colors';
const moment = require('moment');

export default function TripPage ({ route, navigation }) {
  const { trip } = route.params;
  const dateToShow = moment(trip.date).format('MMM Do YYYY');

  function Item (name, icon, route) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate(route, { trip })}
      >
        <FontAwesome5 name={icon} size={32} color="white" solid />
        <Text style={styles.textItem}>{name}</Text>
      </TouchableOpacity>
    );
  }

  const tripPicture = trip.picture
    ? { uri: trip.picture }
    : require('../assets/carClipArt.jpg');
  return (
    <ScrollView style={styles.container}>
      <View style={styles.page}>
        <View style={styles.card}>
          <Image style={styles.photo} source={tripPicture} />
        </View>
        <Text style={styles.textTripName}>{trip.title}</Text>
        <Text style={styles.textTripDate}>{dateToShow}</Text>
        <View style={styles.menu}>
          <View style={styles.menuRow}>
            {Item('Trip Details', 'road', 'TripDetails')}
            {Item('Participants', 'address-book', 'ParticipantsList')}
          </View>
          <View style={styles.menuRow}>
            {Item('Car Allocation', 'user-friends', 'CarAllo')}
            {Item('Delete Trip', 'frown-open', 'DeleteTrip')}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: Colors.background,
  },
  page: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: Colors.secondary,
    margin: 10,
  },
  menu: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: Colors.accent,
    padding: 20,
    borderRadius: 10
  },
  item: {
    padding: 20,
    margin: 10,
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  textTripName: {
    flex: 1,
    fontSize: 30,
    color: 'white',
  },
  textTripDate: {
    color: 'white',
    flex: 1,
    fontSize: 20,
    marginBottom: 30,
  },
  textItem: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white'
  },
  photo: {
    height: 133,
    width: 350,
    margin: 20,
  },
});
