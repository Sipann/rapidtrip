import 'react-native-gesture-handler';
import React from 'react';
import Result from './components/Result';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import LoadingScreen from './screens/LoadingScreen';
// import LoginScreen from './screens/LoginScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import HomeScreen from './screens/HomeScreen';
import env from './config/env.config';

import * as firebase from 'firebase';
import Form from './MVPForm/FormLaunch';

import Colors from './constants/colors';

var firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.AUTH_DOMAIN,
  databaseURL: env.DATABASE_URL,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
};

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App () {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='MVPForm'
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18
            }
          }}
        >
          <Stack.Screen
            name='MVPForm'
            component={Form}
            options={{ title: 'Trippy' }}
          />
          <Stack.Screen
            name='Result'
            component={Result}
            options={{ title: 'Car Allocation' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },

});
