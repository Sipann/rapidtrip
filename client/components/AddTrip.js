import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const moment = require('moment');

export default function AddTrip ({ route, navigation }) {
  let finalLocalCords;
  const [tripName, setTripName] = useState('');
  const [tripDescription, setTripDescription] = useState('');
  const [tripDate, setTripDate] = useState(new Date());
  const [dateOn, setDateOn] = useState(false);
  const [location, setLocation] = useState('');
  if (route.params) {
    const { posLocation } = route.params;
    finalLocalCords = { posLocation };
    const { locationName } = route.params;
    if (locationName !== location) setLocation(locationName);
  }

  let dateToshow = moment(tripDate).format('MMM Do, YYYY');

  function DateChooser () {
    if (dateOn) {
      return (
        <DateTimePicker
          animation={false}
          mode="date"
          onChange={(evt, selectedTime) => {
            setDateOn(false);
            const yesterday = moment(Date.now()).subtract(1, 'days');
            if (selectedTime) {
              if (selectedTime > yesterday) {
                setTripDate(selectedTime);
              } else {
                alert('Cannot plan a trip for the past!');
              }
            }
          }}
          value={tripDate}
        />
      );
    }
    return null;
  }

  return (
    <View>
      <Text style={styles.header}>Trip Name</Text>
      <Input placeholder="Name" onChangeText={(value) => setTripName(value)} />
      <Text style={styles.header}>Trip Description</Text>
      <Input
        placeholder="Description"
        onChangeText={(value) => setTripDescription(value)}
      />
      <Text style={styles.header}>Trip Date</Text>
      <Text style={styles.selectedShow}>{dateToshow}</Text>
      <TouchableOpacity onPress={() => setDateOn(true)}>
        <Text style={styles.changeDate}>Choose Date</Text>
      </TouchableOpacity>
      <DateChooser />
      <Text style={styles.header}>Trip Date</Text>
      {location ? <Text style={styles.selectedShow}>{location}</Text> : <Text style={styles.selectedShow}>Location not set</Text>}
      <TouchableOpacity onPress={() => navigation.navigate('ChooseLocal')}>
        <Text style={styles.changeDate}>Choose Location</Text>
      </TouchableOpacity>

      <Button
        title="Create"
        onPress={() => {
          if (tripDate && tripName && tripDescription && location) {
            let infoToSend = {
              TripName: tripName,
              TripDesc: tripDescription,
              TripDate: tripDate,
              TripLoc: {
                lat: finalLocalCords.posLocation.lat,
                lng: finalLocalCords.posLocation.lng,
              },
            };
            //TODO: Here is where we want to call create trip and pass it the object made above
            console.log(infoToSend);
            navigation.navigate('TripsPage');
          } else {
            alert('Missing Some Information');
          }
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    margin: 10,
  },
  selectedShow: {
    textAlign: 'center',
    fontSize: 25,
    margin: 10
  },
  changeDate: {
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 1,
    width: 100,
    alignSelf: 'center',
    margin: 10
  },
});
