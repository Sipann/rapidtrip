import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import StyleRefs from '../constants/styles';

import TimePicker from '@react-native-community/datetimepicker';


const InputDepartureTime = ({
  setUserDepartureTime,
}) => {

  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(true);

  const onChange = (_, selectedTime) => {
    setShow(Platform.OS === 'ios');
    setTime(selectedTime);
    setUserDepartureTime(selectedTime);
  };


  return (

    <View style={styles.container}>
      <Text style={styles.header}>User Departure Time</Text>

      {show && (
        <View style={styles.picker}>
          <TimePicker
            animation={false}
            mode="time"
            onChange={onChange}
            display='spinner'
            value={time} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleRefs.container,
  },
  header: {
    ...StyleRefs.header,
  },
  picker: {
    width: '100%',
  }
});

export default InputDepartureTime;
