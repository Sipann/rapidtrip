import React, { useState } from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/colors';
import StyleRefs from '../constants/styles';

import DateTimePicker from '@react-native-community/datetimepicker';


const InputDepartureTime = ({
  scrollToNext,
  scrollToPrev,
  style,
}) => {

  const [time, setTime] = useState(new Date());

  return (

    <View style={{ ...style, ...styles.container }}>

      <Text style={styles.header}>Departure Time</Text>

      <View style={styles.picker}>
        <DateTimePicker
          mode="time"
          onChange={(evt, selectedTime) => setTime(selectedTime)}
          value={time} />
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          onPress={scrollToPrev}
          title="PREVIOUS"
          color={Colors.secondary}
          accessibilityLabel="Previous" />
        <Button
          onPress={() => scrollToNext(time)}
          title="NEXT"
          color={Colors.primary}
          accessibilityLabel="Next" />
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
  header: {
    ...StyleRefs.header,
  },
  picker: {
    width: '100%',
  }
});

export default InputDepartureTime;
