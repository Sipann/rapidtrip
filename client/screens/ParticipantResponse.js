import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/colors';

const ParticipantResponse = () => {
  const [time, setTime] = useState(Date.now);
  const [location, setLocation] = useState('');
  const [driver, setDriver] = useState(false);
  const [seats, setSeats] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setTime(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>At what time are you going?</Text>
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={time}
          is24Hour={true}
          display="default"
          mode="time"
          onChange={onChange}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Your Location</Text>
        <TextInput
          placeholder="Your location"
          onchangeText={(location) => setLocation(location)}
          style={styles.inputStyle}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Are you a driver?</Text>
        <Text style={styles.label}>{driver ? 'Yes' : 'No'}</Text>
        <Switch
          ios_backgroundColor={Colors.bgDark}
          onValueChange={(driver) => setDriver(driver)}
          style={styles.switchButton}
          thumbColor={driver ? Colors.primary : Colors.secondary}
          trackColor={{ false: Colors.primary, true: Colors.secondary }}
          value={driver}
        />
      </View>
      {driver ? (
        <View>
          <Text style={styles.label}>Number of seats?</Text>
          <TextInput
            placeholder="0"
            onchangeText={(location) => setLocation(location)}
            style={styles.inputStyle}
          />
        </View>
      ) : null}
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
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  switchButton: {
    marginLeft: 15,
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

export default ParticipantResponse;
