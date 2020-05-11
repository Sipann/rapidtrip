import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
const moment = require('moment');

export default function AddTrip ({ navigation }) {
  const [tripName, setTripName] = useState('');
  const [tripDescription, setTripDescription] = useState('');
  const [tripDate, setTripDate] = useState(new Date());
  const [dateOn, setDateOn] = useState(false);

  let infoToSend = {
    TripName: tripName,
    TripDesc: tripDescription,
    TripDate: tripDate,
  };

  let dateToshow = moment(tripDate).format('MMM Do YYYY');

  function DateChooser () {
    if (dateOn) {
      return (
        <DateTimePicker
          animation={false}
          mode="date"
          onChange={(evt, selectedTime) => {
            setDateOn(false);
            setTripDate(selectedTime);
          }}
          value={tripDate}
        />
      );
    }
    return <Text></Text>;
  }

  return (
    <View>
      <Text>Trip Name</Text>
      <Input placeholder="Name" onChangeText={(value) => setTripName(value)} />
      <Text>Trip Description</Text>
      <Input
        placeholder="Description"
        onChangeText={(value) => setTripDescription(value)}
      />
      <Text>Trip Date</Text>
      <Text>{dateToshow}</Text>
      <TouchableOpacity onPress={() => setDateOn(true)}>
        <Text>Choose Date</Text>
      </TouchableOpacity>
      <DateChooser />

      <Button
        title="Create"
        onPress={() => {
          console.log(infoToSend);
          //HERE IS WHERE I SHOULD BE SENDING THE INFO
          navigation.navigate('TripsPage');
        }}
      ></Button>
    </View>
  );
}
