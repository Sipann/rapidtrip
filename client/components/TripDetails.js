import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MapView from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';

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
  const { trip } = route.params;
  
  const markers = [
    {
      latitude: trip.destination.latitude,
      longitude: trip.destination.longitude,
      title: trip.destination.address,
      subtitle: trip.destination.address
    }
  ];
  return (
    <View style={styles.container}>
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
      <Text style={styles.title}>{trip.title}</Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Date</Text>: {(new Date(trip.date)).toDateString()}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Location</Text>: {trip.destination.address}
      </Text>
      <Text style={styles.text}>{trip.description}</Text>
      <Button  onPress= { ()=> navigation.navigate('TripEdit')} title="Edit Trip" />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  map: {
    position: 'absolute',
    top: 400,
    left: 0,
    right: 0,
    bottom: -600,
  },
});

export default TripDetails;