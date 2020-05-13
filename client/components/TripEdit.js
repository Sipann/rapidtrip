import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
const moment = require('moment');
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
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  const [datePicker, setDatePicker] = useState(false);

  let dateToshow = moment(date).format('MMM Do, YYYY');

  function DateChooser () {
    if (datePicker) {
      return (
        <DateTimePicker
          animation={false}
          mode="date"
          onChange={(evt, selectedTime) => {
            setDatePicker(false);
            const yesterday = moment(Date.now()).subtract(1, 'days');
            if (selectedTime) {
              if (selectedTime > yesterday) {
                setDate(selectedTime);
              } else {
                alert('Cannot plan a trip for the past!');
              }
            }
          }}
          value={date}
        />
      );
    }
    return null;
  }

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
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          defaultValue={mockedTrip.description}
          onChangeText={(description) => setDescription(description)}
          multiline={true}
        />
      </View>
      <Text style={styles.header}>Trip Date</Text>
      <Text style={styles.selectedShow}>{dateToshow}</Text>
      <TouchableOpacity onPress={() => setDatePicker(true)}>
        <Text style={styles.changeDate}>Choose Date</Text>
      </TouchableOpacity>
      <DateChooser />
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
