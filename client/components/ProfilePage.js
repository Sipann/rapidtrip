import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import Colors from '../constants/colors';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const ProfilePage = () => {
  const user = useSelector((state) => ({
    username: state.name,
    email: state.email,
    picture: state.picture,
  }));
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user.username);
  const [picture, setPicture] = useState(user.picture);

  function submitNewinfo() {
    dispatch(
      actions.updateUserAsync({
        name: username,
        email: user.email,
        picture: picture,
      })
    );
  }

  function logout() {
    dispatch(actions.logoutUser());
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
          setPicture(data.secure_url);
          return data.secure_url;
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.card}>
          <Text style={styles.header}>Your Username</Text>
          <Input
            style={styles.textArea}
            value={username}
            onChangeText={(value) => setUsername(value)}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.header}>Your Email</Text>
          <Input style={styles.textArea} value={user.email} disabled={true} />
        </View>
        <View>
          <Image source={{ uri: picture }} style={styles.profileImage} />
        </View>
        <TouchableOpacity onPress={pickImage} style={styles.choosebutton}>
          <Text style={styles.choosebuttontext}>Upload Image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={submitNewinfo} style={styles.create}>
          <Text style={styles.createText}>Confirm!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={styles.logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.background,
    flexGrow: 1,
    marginTop: 25,
  },
  card: {
    //backgroundColor: Colors.primary,
    borderRadius: 20,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
  },
  header: {
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    margin: 10,
    marginLeft: 5,
    fontSize: 16,
  },
  choosebutton: {
    textAlign: 'center',
    fontSize: 18,
    width: '90%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 15,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
  choosebuttontext: {
    fontSize: 18,
    textAlign: 'center',
  },
  create: {
    textAlign: 'center',
    fontSize: 18,
    width: '90%',
    height: 50,
    alignSelf: 'center',
    marginTop: 15,
    justifyContent: 'center',
    backgroundColor: '#E9446A',
    borderRadius: 3,
  },
  createText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  logout: {
    textAlign: 'center',
    fontSize: 18,
    width: '90%',
    height: 50,
    marginTop: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9446A',
    borderRadius: 3,
  },
  logoutText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  profileImage: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    margin: 10,
  },
});

export default ProfilePage;
