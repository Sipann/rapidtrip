import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
// import colorScheme from '../constants/colors';
import { useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
const moment = require('moment');

export default function TripPage () {
  const route = useRoute();
  const navigation = useNavigation();
  const { trip } = route.params;
  const tripAdmin = trip.participants.find(participant => participant.is_admin);
  const currentUser = useSelector(state => ({
    id: state.userid,
    email: state.email,
    is_admin: state.userid === tripAdmin.id
  }));
  const dateToShow = moment(trip.date).format('MMM Do YYYY');

  function Item (name, icon, route) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate(route, { trip, currentUser })}
      >
        <FontAwesome5 name={icon} size={32} color="black" solid />
        <Text style={styles.textItem}>{name}</Text>
      </TouchableOpacity>
    );
  }

  const tripPicture = trip.picture ? { uri: trip.picture } : require('../assets/carClipArt.jpg');
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.textTripName}>{trip.title}</Text>
        <Text style={styles.textTripDate}>{dateToShow}</Text>
        <Image
          style={styles.photo}
          source={tripPicture}
        />
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
    width: 150,
    height: 150,
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
    marginBottom: 30
  },
  textItem: {
    fontSize: 16,
    textAlign: 'center',
  },
  photo: {
    height:133,
    width: 400,
    marginBottom: 50,
  }
});
