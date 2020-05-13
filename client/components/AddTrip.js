import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';
const moment = require('moment');

export default function AddTrip ({ route, navigation }) {
  let finalLocalCords;
  const [tripName, setTripName] = useState('');
  const [tripDescription, setTripDescription] = useState('');
  const [tripDate, setTripDate] = useState(new Date());
  const [dateOn, setDateOn] = useState(false);
  const [location, setLocation] = useState('');
  const [photoUrl, setPhotoUrl] = useState(null);
  const user = useSelector(state => ({ id: state.userid, email: state.email }));
  const dispatch = useDispatch();

  if (route.params) {
    const { posLocation } = route.params;
    finalLocalCords = { posLocation };
    const { locationName } = route.params;
    if (locationName !== location) setLocation(locationName);
  }

  let dateToshow = moment(tripDate).format('MMM Do, YYYY');

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const createTrip = () => {
    if (tripDate && tripName && tripDescription && location) {
      let infoToSend = {
        TripName: tripName,
        TripDesc: tripDescription,
        TripDate: tripDate,
        TripAddress: location,
        TripLoc: {
          lat: finalLocalCords.posLocation.lat,
          lng: finalLocalCords.posLocation.lng,
        },
        TripImg: photoUrl,
      };
      dispatch(actions.createTripAsync(user.email, infoToSend));
      navigation.navigate('TripsPage');
    } else {
      alert('Missing Some Information');
    }
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.android || Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 1],
      base64: true,
    });

    if (!result.cancelled) {
      let base64Img = `data:image/jpg;base64,${result.base64}`;

      //Add your cloud name
      let apiUrl = 'https://api.cloudinary.com/v1_1/rapidtrip/image/upload';

      let data = {
        file: base64Img,
        upload_preset: 'rapidTripPhotos',
      };

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      })
        .then(async (r) => {
          let data = await r.json();
          console.log(data.secure_url);
          setPhotoUrl(data.secure_url);
          return data.secure_url;
        })
        .catch((err) => console.log(err));
    }
  };

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
    <ScrollView>
      <View>
        <Text style={styles.header}>Trip Name</Text>
        <Input
          placeholder="Name"
          onChangeText={(value) => setTripName(value)}
        />
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
        {location ? (
          <Text style={styles.selectedShow}>{location}</Text>
        ) : (
          <Text style={styles.selectedShow}>Location not set</Text>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('ChooseLocal')}>
          <Text style={styles.changeDate}>Choose Location</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Trip Photo</Text>

        <View style={styles.group}>
          {photoUrl ? (
            <Image source={{ uri: photoUrl }} style={styles.tripImage} />
          ) : (
            <Text style = {styles.selectedShow}>No Image Yet</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => pickImage()}
          style={styles.uploadButton}
        >
          <Text style={styles.changeDate}>Upload New Image</Text>
        </TouchableOpacity>

        <Button
          title="Create"
          style= {styles.create}
          onPress={createTrip}
        ></Button>
      </View>
    </ScrollView>
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
    margin: 10,
  },
  changeDate: {
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 1,
    width: 100,
    alignSelf: 'center',
    margin: 10,
  },
  tripImage: {
    height: 133,
    width: 400,
    alignSelf: 'center',
  }
});
