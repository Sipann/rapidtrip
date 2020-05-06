import React, { useState } from 'react';
import env from './config/env.config.example';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import * as Facebook from 'expo-facebook';

console.disableYellowBox = true;

export default function App() {
  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isImageLoading, setImageLoadStatus] = useState(false);

  const facebookLogIn = async () => {
    Facebook.initializeAsync(env.FACEBOOK_APP_ID, 'rapidtrip');
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync(env.FACEBOOK_APP_ID, {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
        )
          .then((response) => response.json())
          .then((data) => {
            setLoggedinStatus(true);
            setUserData(data);
          })
          .catch((e) => console.log(e));
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const logout = () => {
    setLoggedinStatus(false);
    setUserData(null);
    setImageLoadStatus(false);
  };

  return isLoggedin ? (
    userData ? (
      <View style={styles.container}>
        <Image
          style={{ width: 200, height: 200, borderRadius: 50 }}
          source={{ uri: userData.picture.data.url }}
          onLoadEnd={() => setImageLoadStatus(true)}
        />
        <ActivityIndicator
          size="large"
          color="#0000ff"
          animating={!isImageLoading}
          style={{ position: 'absolute' }}
        />
        <Text style={{ fontSize: 22, marginVertical: 10 }}>
          Hi {userData.name}!
        </Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={this.logout}>
          <Text style={{ color: '#fff' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    ) : null
  ) : (
    <View style={styles.container}>
      <Image
        style={{
          width: 200,
          height: 200,
          borderRadius: 50,
          marginVertical: 20,
        }}
        source={require('./assets/splash.png')}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={facebookLogIn}>
        <Text style={{ color: '#fff' }}>Login with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ebee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    backgroundColor: '#4267b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  logoutBtn: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
  },
});
