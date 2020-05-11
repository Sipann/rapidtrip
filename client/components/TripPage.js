import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import colorScheme from '../constants/colors';
const moment = require('moment');

export default function TripPage ({ route, navigation  }) {

  const {trip} = route.params;
  const dateToShow = moment(trip.date).format('MMM Do YYYY');

  function Item (name, icon, route) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(route, {trip})}>
        <FontAwesome5 name={icon} size={32} color='black' solid/>
        <Text style={styles.textItem}>{name}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>{trip.title}</Text>
      <Text style={styles.textHeader}>{dateToShow}</Text>
      <View style={styles.menu}>
        { Item('Trip Details', 'road', 'TripList') }
        { Item('Participants', 'address-book', 'Profile') }
        { Item('Car Allocation', 'user-friends', 'FriendList') }
        { Item('Surprise', 'star', 'Settings') }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  item: {
    padding: 20,
    margin: 10,
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    backgroundColor: colorScheme.accent
  },
  textHeader: {
    fontSize: 30
  },
  textItem: {
    fontSize: 16,
    textAlign: 'center'
  }
});