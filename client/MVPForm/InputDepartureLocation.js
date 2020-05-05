import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { geocodeAddress } from '../services/GoogleAPI';

import Colors from '../constants/colors';
import StyleRefs from '../constants/styles';


const InputDepartureLocation = ({
  addUser,
  scrollToPrev,
  setDepartureLocation,
  style,
}) => {

  const [location, setLocation] = useState(false);
  const [address, setAddress] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const getCoords = async () => {
    try {
      const res = await geocodeAddress(address);
      if (res.status === 'OK') {
        setLocation(res.coords);
      }
      else throw new Error('no geocoding');
    } catch (error) {
      if (error.message === 'no geocoding') {
        Alert.alert(
          'Oops',
          'Unable to locate this address',
          [{ text: 'OK' }]
        );
      }
      console.error(error);
    }
  };

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
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
      const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
      setDepartureLocation({ lat: location.coords.latitude, lng: location.coords.longitude });
      setLocation(location);
    } catch (error) {
      setLocation(null);
      Alert.alert(
        'Could not fetch location',
        'Please try again later or pick a location on the map',
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
        <Text>Enter an address</Text>
        <TextInput
          onChangeText={text => setAddress(text)}
          placeholder="e.g. 27 carrer d'Avila, Barcelona"
          style={styles.textInput}
          value={address} />
        <Button
          onPress={getCoords}
          title="Look" />

        {isFetching
          ? <ActivityIndicator size="large" color={Colors.primary} />
          : null}

        <Text>OR</Text>

        <Button
          title="Geolocate me"
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
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
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
