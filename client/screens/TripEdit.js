import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/colors';
const moment = require('moment');

const TripEdit = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const trip = useSelector(state => state.trips.find(t => t.id === route.params.trip.id));
  const [date, setDate] = useState(new Date(trip.date));
  const [title, setTitle] = useState(trip.title);
  const [description, setDescription] = useState(trip.description);
  const [datePicker, setDatePicker] = useState(false);
  const dispatch = useDispatch();

  let dateToshow = moment(date).format('MMM Do, YYYY');

  function DateChooser () {
    if (datePicker) {
      return (
        <DateTimePicker
          animation={false}
          mode="date"
          onChange={(evt, selectedTime) => {
            setDatePicker(false);
            const yesterday = moment(Date.now()).subtract(1, 'days');
            if (selectedTime) {
              if (selectedTime > yesterday) {
                setDate(selectedTime);
              } else {
                alert('Cannot plan a trip for the past!');
              }
            }
          }}
          value={date}
        />
      );
    }
    return null;
  }

  const updateTripInfo = () => {
    dispatch(
      actions.updateTripInfosAsync({
        id: trip.id,
        title,
        description,
        date: new Date(date).getTime(),
      })
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Title</Text>
        <TextInput
          value={title}
          onChangeText={(title) => setTitle(title)}
          style={styles.textArea}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.header}>Description</Text>
        <TextInput
          style={styles.textArea}
          value={description}
          onChangeText={(description) => setDescription(description)}
          multiline={true}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.header}>Trip Date</Text>
        <Text style={styles.textArea}>{dateToshow}</Text>
      </View>
      <TouchableOpacity onPress={() => setDatePicker(true)}>
        <Text style={styles.choosebutton}>Choose Date</Text>
      </TouchableOpacity>
      <DateChooser />
      <TouchableOpacity style={styles.create}>
        <Text style={styles.createText} onPress={updateTripInfo}>
          Save Trip
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    backgroundColor: Colors.background,
    flexGrow: 1,
  },
  card: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    margin: 10,
    padding: 0,
  },
  header: {
    fontSize: 15,
    color: 'white',
    marginLeft: 20,
  },
  textArea: {
    margin: 10,
    marginLeft: 5,
    fontSize: 15,
  },
  choosebutton: {
    textAlign: 'center',
    fontSize: 20,
    width: 100,
    alignSelf: 'center',
    margin: 10,
    borderRadius: 15,
    backgroundColor: Colors.accent,
  },
  create: {
    textAlign: 'center',
    fontSize: 20,
    width: 200,
    alignSelf: 'center',
    margin: 30,
    backgroundColor: Colors.danger,
    borderRadius: 20,
  },
  createText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
  },
});

export default TripEdit;
