import React from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const mockedTrip = {
  id: 1,
  title: 'Trip to Portugal',
  date: new Date(2020, 6, 5),
  location: 'Lisbon',
  description:
    'Lisbon is the capital and the largest city of Portugal, with an estimated population of 505,526 within its administrative limits in an area of 100.05 km2.',
};

export default function App() {
  const markers = [
    {
      latitude: 37.78825,
      longitude: -122.4324,
      title: 'Foo Place',
      subtitle: '1234 Foo Drive',
    },
  ];
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        annotations={markers}
      />
      <Text style={styles.title}>{mockedTrip.title}</Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Date</Text>: {mockedTrip.date.toDateString()}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Location</Text>: {mockedTrip.location}
      </Text>
      <Text style={styles.text}>{mockedTrip.description}</Text>
    </View>
  );
}

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
