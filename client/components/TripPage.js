import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
// import colorScheme from '../constants/colors';
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
        <FontAwesome5 name={icon} size={32} color="black" solid />
        <Text style={styles.textItem}>{name}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.textTripName}>{trip.title}</Text>
        <Image
          style={styles.photo}
          source={require('../assets/carClipArt.jpg')}
        />
        <Text style={styles.textTripDate}>{dateToShow}</Text>
        <View style={styles.menu}>
          <View style={styles.menuRow}>
            {Item('Trip Details', 'road', 'TripList')}
            {Item('Participants', 'address-book', 'Profile')}
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
    alignItems: 'center',
  },
  menu: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  item: {
    padding: 20,
    margin: 10,
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    backgroundColor: 'blue',
  },
  textTripName: {
    flex: 1,
    fontSize: 30,
  },
  textTripDate: {
    flex: 1,
    fontSize: 20,
  },
  textItem: {
    fontSize: 16,
    textAlign: 'center',
  },
  photo: {
    height:300
  }
});
