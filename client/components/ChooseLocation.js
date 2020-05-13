import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import env from '../config/env.config';

import PlacesInput from 'react-native-places-input';

// import Colors from '../constants/colors';
import StyleRefs from '../constants/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChooseLocation = ({navigation}) => {
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
            console.log(place);
            setPosLocation(place.result.geometry.location);
            setLocationName(place.result.formatted_address);
          }}
        />

        <TouchableOpacity onPress = {() =>navigation.navigate('AddTrip', {posLocation: posLocation, locationName: locationName })}>
          <Text style={styles.button}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

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
  button: {
    backgroundColor: 'blue'
  }
});

export default ChooseLocation;
