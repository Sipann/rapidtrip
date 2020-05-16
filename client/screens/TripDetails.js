import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Colors from '../constants/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

// const trip = {
//   id: 1,
//   title: 'Trip to Portugal',
//   date: new Date(2020, 6, 5),
//   location: 'Lisbon',
//   description:
//     'Lisbon is the capital and the largest city of Portugal, with an estimated population of 505,526 within its administrative limits in an area of 100.05 km2.',
// };

const TripDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const trip = useSelector(state => state.trips.find(t => t.id === route.params.trip.id));

  const markers = [
    {
      latitude: trip.destination.latitude,
      longitude: trip.destination.longitude,
      title: trip.destination.address,
      subtitle: trip.destination.address,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style = {styles.info}>
        <Text style={styles.title}>{trip.title}</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Date</Text>:{' '}
          {new Date(trip.date).toDateString()}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Location</Text>: {trip.destination.address}
        </Text>
        <Text style={styles.text}>{trip.description}</Text>
        <TouchableOpacity style = {styles.choosebutton} onPress={() => navigation.navigate('TripEdit', { trip })}>
          <Text style = {styles.buttontext}>Edit Trip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mapCntr}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: trip.destination.latitude,
            longitude: trip.destination.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.05,
          }}
          annotations={markers}
        />
      </View>
    </ScrollView>
  );
};

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    color: 'white',
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    color: 'white',
  },
  info: {
    padding: 10
  },
  bold: {
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  mapCntr: {
    flex: 1,
    width: screenWidth,
    height: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '90%',
    height: '90%',
  },
  choosebutton: {
    textAlign: 'center',
    fontSize: 20,
    width: 100,
    alignSelf: 'center',
    margin: 10,
    borderRadius: 15,
    backgroundColor: Colors.accent,
  },
  buttontext: {
    fontSize: 20,
    textAlign: 'center'
  }
});

export default TripDetails;
