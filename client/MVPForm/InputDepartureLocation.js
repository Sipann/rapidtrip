import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import env from '../config/env.config';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import PlacesInput from 'react-native-places-input';

import Colors from '../constants/colors';
import StyleRefs from '../constants/styles';


const InputDepartureLocation = ({
  addUser,
  scrollToPrev,
  setDepartureLocation,
  style,
}) => {

  const [location, setLocation] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions.',
        'You need to grant geolocation permissions to be geolocated.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const geolocateUser = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;
    try {
      setIsFetching(true);
      const locationResponse = await Location.getCurrentPositionAsync({ timeout: 5000 });
      const newLocation = { lat: locationResponse.coords.latitude, lng: locationResponse.coords.longitude };
      setDepartureLocation(newLocation);
      setLocation(newLocation);
    } catch (error) {
      setLocation(null);
      Alert.alert(
        'Could not fetch location.',
        'Please try again later or enter an address into the field.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsFetching(false);
    }
  };

  return (

    <View style={{ ...style, ...styles.container }}>

      <Text style={styles.header}>What is you starting point?</Text>

      <View style={styles.content}>

        <PlacesInput
          googleApiKey={env.GOOGLE_API_KEY}
          placeHolder={'e.g. 27 carrer d\'Avila, Barcelona'}
          language={'en-US'}
          onSelect={place => {
            setLocation(place.result.geometry.location);
            setDepartureLocation(place.result.geometry.location);
          }} />

        {isFetching
          ? <ActivityIndicator size="large" color={Colors.primary} />
          : null}

        <Text>OR</Text>

        <Button
          title="GEOLOCATE ME"
          color={Colors.primary}
          onPress={geolocateUser} />

      </View>

      <View style={styles.buttonsContainer}>
        <Button
          onPress={scrollToPrev}
          title="PREVIOUS"
          color={Colors.secondary}
          accessibilityLabel="Previous" />
        <Button
          accessibilityLabel="Add User"
          color={Colors.primary}
          disabled={!location}
          onPress={addUser}
          title="ADD USER"
        />
      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
  },
  container: {
    ...StyleRefs.container,
    paddingTop: 35,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    ...StyleRefs.header,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    ...StyleRefs.textInput,
    marginBottom: 15,
    width: '90%',
  },

});

export default InputDepartureLocation;