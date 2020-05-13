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
    dispatch(actions.updateTripInfosAsync({
      id: trip.id,
      title,
      description,
      date: (new Date(date)).getTime()
    }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={title}
          onChangeText={title => setTitle(title)}
          style={styles.inputStyle}
        />
      </View>
      <View>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          value={description}
          onChangeText={description => setDescription(description)}
          multiline={true}
        />
      </View>
      <Text style={styles.header}>Trip Date</Text>
      <Text style={styles.selectedShow}>{dateToshow}</Text>
      <TouchableOpacity onPress={() => setDatePicker(true)}>
        <Text style={styles.changeDate}>Choose Date</Text>
      </TouchableOpacity>
      <DateChooser />
      <TouchableOpacity style={styles.button}>
        <View>
          <Text
            style={styles.buttonText}
            onPress={updateTripInfo}
          >Save Trip</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
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
  textArea: {
    height: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingVertical: 25,
    paddingHorizontal: 25,
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

export default TripEdit;
