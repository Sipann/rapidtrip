import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { setLightEstimationEnabled } from 'expo/build/AR';

const mockedTrip = {
  id: 1,
  title: 'Trip to Portugal',
  date: new Date(2020, 6, 5),
  location: 'Lisbon',
  description:
    'Lisbon is the capital and the largest city of Portugal, with an estimated population of 505,526 within its administrative limits in an area of 100.05 km2.',
};

const TripEdit = () => {
  const [date, setDate] = useState(new Date(mockedTrip.date));
  const [title, setTitle] = useState('');
  const [location, setLocaction] = useState('');
  const [description, setDescription] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          defaultValue={mockedTrip.title}
          onChangeText={(title) => setTitle(title)}
          style={styles.inputStyle}
        />
      </View>
      <View>
        <Text style={styles.label}>Date</Text>
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          is24Hour={true}
          display="default"
        />
      </View>
      <View>
        <Text style={styles.label}>Location</Text>
        <TextInput
          defaultValue={mockedTrip.location}
          onchangeText={(location) => setLocaction(location)}
          style={styles.inputStyle}
        />
      </View>
      <View>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          defaultValue={mockedTrip.description}
          onChangeText={(description) => setDescription(description)}
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <View>
          <Text style={styles.buttonText}>Save Trip</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  formGroup: {
    display: 'flex',
  },
  label: {
    marginTop: 5,
    fontWeight: '600',
    alignItems: 'center',
  },
  inputStyle: {
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 15,
    color: '#333',
  },
  textArea: {
    height: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingVertical: 25,
    paddingHorizontal: 25,
  },
  button: {
    marginTop: 25,
    borderRadius: 3,
    width: '90%',
    backgroundColor: '#ccc',
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
  },
});

export default TripEdit;
