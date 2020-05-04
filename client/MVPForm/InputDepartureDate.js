import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

const InputDepartureDate = ({ setTripDate }) => {

  const [date, setDate] = useState(new Date());

  const tripDateHandler = (selectedDate) => {
    setDate(selectedDate);
    setTripDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trip Departure Date</Text>
      <DateTimePicker
        mode="date"
        onChange={(evt, selectedDate) => tripDateHandler(selectedDate)}
        value={date} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default InputDepartureDate;
