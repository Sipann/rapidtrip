import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';
import Colors from '../constants/colors';
const moment = require('moment');

export default function AddTrip({ route, navigation }) {
  let finalLocalCords;
  const [tripName, setTripName] = useState('');
  const [tripDescription, setTripDescription] = useState('');
  const [tripDate, setTripDate] = useState(new Date());
  const [dateOn, setDateOn] = useState(false);
  const [location, setLocation] = useState('');
  const [photoUrl, setPhotoUrl] = useState(null);
  const user = useSelector((state) => ({
    id: state.userid,
    email: state.email,
  }));
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
          setPhotoUrl(data.secure_url);
          return data.secure_url;
        })
        .catch((err) => console.log(err));
    }
  };

  function DateChooser() {
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
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.card}>
          <Text style={styles.header}>Trip Name*</Text>
          <Input
            style={styles.textinput}
            placeholder="Name"
            onChangeText={(value) => setTripName(value)}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.header}>Trip Description*</Text>
          <Input
            style={styles.textinput}
            placeholder="Description"
            onChangeText={(value) => setTripDescription(value)}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.header}>Trip Date*</Text>
          <Text style={styles.selectedShow}>{dateToshow}</Text>
          <TouchableOpacity
            style={styles.choosebutton}
            onPress={() => setDateOn(true)}
          >
            <Text style={styles.buttonText}>Choose Date</Text>
          </TouchableOpacity>
          <DateChooser />
        </View>
        <View style={styles.card}>
          <Text style={styles.header}>Trip Location*</Text>
          {location ? (
            <Text style={styles.selectedShow}>{location}</Text>
          ) : (
            <Text style={styles.selectedShow}>Location Not Set</Text>
          )}
          <TouchableOpacity
            style={styles.choosebutton}
            onPress={() => navigation.navigate('ChooseLocal')}
          >
            <Text style={styles.buttonText}>Choose Location</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.header}>Trip Photo</Text>

          <View style={styles.group}>
            {photoUrl ? (
              <Image source={{ uri: photoUrl }} style={styles.tripImage} />
            ) : (
              <Text style={styles.selectedShow}>No Image Yet</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.choosebutton}
            onPress={() => pickImage()}
          >
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={createTrip} style={styles.create}>
          <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginTop: 30,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  header: {
    fontSize: 16,
    color: '#333',
  },
  selectedShow: {
    textAlign: 'center',
    fontSize: 14,
    margin: 10,
    color: '#333',
  },
  textinput: {
    color: 'white',
  },
  choosebutton: {
    fontSize: 16,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: '#999',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
  tripImage: {
    height: 133,
    width: 400,
    alignSelf: 'center',
  },
  create: {
    textAlign: 'center',
    fontSize: 16,
    width: '90%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 30,
    backgroundColor: '#E9446A',
    borderRadius: 3,
  },
  createText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
