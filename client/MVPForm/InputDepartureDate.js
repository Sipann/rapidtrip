import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


import StyleRefs from '../constants/styles';

import DateTimePicker from '@react-native-community/datetimepicker';

const InputDepartureDate = ({ setTripDate }) => {

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(true);

  const onChange = (_, selectedDate) => {
    setShow(Platform.OS === 'ios');
    setDate(selectedDate);
    setTripDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trip Departure Date</Text>

      {show && (
        <DateTimePicker
          animation={false}
          mode="date"
          onChange={onChange}
          value={date} />
      )}

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    ...StyleRefs.header,
    textAlign: 'center',
  },
});

export default InputDepartureDate;
