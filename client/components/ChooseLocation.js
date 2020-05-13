import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

import env from '../config/env.config';

import PlacesInput from 'react-native-places-input';

import { TouchableOpacity } from 'react-native-gesture-handler';

const ChooseLocation = ({ navigation }) => {
  const [posLocation, setPosLocation] = useState('');
  const [locationName, setLocationName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Location</Text>
      <View style={styles.content}>
        <PlacesInput
          googleApiKey={env.GOOGLE_API_KEY}
          placeHolder={'e.g. 123 Main Street'}
          language={'en-US'}
          onSelect={(place) => {
            setPosLocation(place.result.geometry.location);
            setLocationName(place.result.formatted_address);
          }}
        />

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddTrip', {
              posLocation: posLocation,
              locationName: locationName,
            })
          }
        >
          <Text style={styles.button}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 35,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    fontSize: 25,
    margin: 10,
    color: 'white',
  },
  button: {
    textAlign: 'center',
    fontSize: 20,
    width: 100,
    alignSelf: 'center',
    margin: 10,
    borderRadius: 15,
    backgroundColor: Colors.accent,
  },
  card: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    margin: 20,
  },
});

export default ChooseLocation;
