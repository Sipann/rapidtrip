import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import Colors from '../constants/colors';
import StyleRefs from '../constants/styles';

import InputSeatsNum from './InputSeatsNum';

const InputIsDriver = ({
  isDriver,
  scrollToNext,
  scrollToPrev,
  style,
  toggleDriverHandler,
}) => {

  const [seats, setSeats] = useState('');

  const seatsInputHandler = (seats) => {
    let formattedSeats = seats.replace(/[^0-9]/g, '');
    setSeats(formattedSeats);
  };

  return (

    <View style={{ ...style, ...styles.isDriverContainer }}>
      <Text style={styles.header}>Driver?</Text>

      <View style={styles.switchContainer}>
        <Text>{isDriver ? 'Yes' : 'No'}</Text>
        <Switch
          ios_backgroundColor={Colors.bgDark}
          onValueChange={toggleDriverHandler}
          style={styles.switchButton}
          thumbColor={isDriver ? Colors.primary : Colors.secondary}
          trackColor={{ false: Colors.primary, true: Colors.secondary }}
          value={isDriver}
        />
      </View>

      <View>
        {isDriver
          ? <InputSeatsNum
            seats={seats}
            setSeatsNumHandler={(input) => seatsInputHandler(input)}
          />
          : null}
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          onPress={scrollToPrev}
          title='PREVIOUS'
          color={Colors.secondary}
          accessibilityLabel='Previous' />
        <Button
          onPress={() => {
            if (isDriver) scrollToNext(seats);
            else scrollToNext();
          }}
          title='NEXT'
          color={Colors.primary}
          accessibilityLabel='Next' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
  },
  header: {
    ...StyleRefs.header,
  },
  isDriverContainer: {
    ...StyleRefs.container,
  },
  switchButton: {
    marginLeft: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
});


export default InputIsDriver;