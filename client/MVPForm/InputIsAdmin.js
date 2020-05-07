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

import InputDepartureDate from './InputDepartureDate';

const InputIsAdmin = ({
  isAdmin,
  scrollToNext,
  setIsAdminHandler,
  style,
}) => {

  const [date, setDate] = useState(new Date());

  return (

    <View style={{ ...style, ...styles.isAdminContainer }}>

      <Text style={styles.header}>Trip Admin?</Text>

      <View style={styles.switchContainer}>
        <Text>{isAdmin ? 'Yes' : 'No'}</Text>
        <Switch
          ios_backgroundColor={Colors.bgDark}
          onValueChange={() => setIsAdminHandler()}
          style={styles.switchButton}
          thumbColor={isAdmin ? Colors.primary : Colors.secondary}
          trackColor={{ false: Colors.primary, true: Colors.secondary }}
          value={isAdmin}
        />
      </View>

      <View style={styles.calendar}>
        {
          isAdmin
            ? <InputDepartureDate
              setTripDate={(selectedDate) => {
                setDate(selectedDate);
              }} />
            : null
        }
      </View>


      <View style={styles.buttonsContainer}>
        <Button
          accessibilityLabel="Next"
          color={Colors.primary}
          onPress={() => {
            if (isAdmin) scrollToNext(date);
            else scrollToNext();
          }}
          title="NEXT" />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
  },
  calendar: {
    width: '100%',
  },
  header: {
    ...StyleRefs.header,
  },
  isAdminContainer: {
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


export default InputIsAdmin;
