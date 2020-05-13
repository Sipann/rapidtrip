import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const ProfilePage = () => {
  const user = useSelector(state => ({
    username: state.name,
    email: state.email,
    picture: state.picture
  }));
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user.username);
  const [picture, setPicture] = useState(user.picture);

  function submitNewinfo () {
    dispatch(actions.updateUserAsync({
      name: username,
      email: user.email,
      picture: picture,
    }));
  }

  useEffect(() => {
    getPermissionAsync();
  }, []);

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
      aspect: [4, 3],
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
          setPicture(data.secure_url);
          return data.secure_url;
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <ScrollView>
      <View>
        <View style={styles.group}>
          <Text style={styles.smalltitle}>Your Username</Text>
          <Input
            placeholder="Name"
            value={username}
            onChangeText={(value) => setUsername(value)}
          />
        </View>
        <View style={styles.group}>
          <Text style={styles.smalltitle}>Your Email</Text>
          <Input
            placeholder="Email"
            value={user.email}
            disabled={true}
          />
        </View>
        <View style={styles.group}>
          <Image source={{ uri: picture }} style={styles.profileImage} />
        </View>
        <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload New Image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={submitNewinfo}>
          <Text style={styles.button}>Confirm!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: 'center',
    margin: 40,
  },
  smalltitle: {
    fontSize: 20,
    margin: 0,
  },
  group: {
    marginTop: 20,
    margin: 10,
  },
  button: {
    fontSize: 50,
    margin: 40,
    textAlign: 'center',
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  uploadButton: {
    alignSelf: 'center',
    backgroundColor: 'orange',
  },
  uploadButtonText: {
    fontSize: 40,
  },
  profileImage: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    margin: 10,
  },
});

export default ProfilePage;
