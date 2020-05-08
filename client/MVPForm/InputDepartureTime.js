import React, { useState } from 'react';
import {
  Button,
  View,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/colors';
import StyleRefs from '../constants/styles';

import InputDepartureWidget from './InputDepartureWidget';


const InputDepartureTime = ({
  scrollToNext,
  showTime,
  style,
}) => {

  const [selectedTime, setSelectedTime] = useState(new Date());

  return (

    <View style={{ ...style, ...styles.container }}>
      {
        showTime
          ? <InputDepartureWidget
            setUserDepartureTime={selectedTime => {
              setSelectedTime(selectedTime);
            }} />
          : null
      }

      <View style={styles.buttonsContainer}>
        <Button
          accessibilityLabel="Next"
          color={Colors.primary}
          onPress={() => scrollToNext(selectedTime)}
          title="NEXT" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
  },
  clock: {
    width: '100%',
  },
  container: {
    ...StyleRefs.container,
  },
  header: {
    ...StyleRefs.header,
  }
});

export default InputDepartureTime;
