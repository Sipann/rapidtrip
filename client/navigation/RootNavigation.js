import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome5 } from '@expo/vector-icons';

import LoadingScreen from '../screens/LoadingScreen';
import Register from '../screens/RegisterScreen';
import Login from '../screens/LoginScreen';

import AppScreens from '../navigation/AppScreens';
import Profile from '../components/ProfilePage';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Screen
      name="Register"
      component={Register}
      options={{ title: 'Register' }}
    />
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{ title: 'Sign In' }}
    />
  </AuthStack.Navigator>
);

const AppStack = createBottomTabNavigator();
const AppStackScreen = () => (
  <AppStack.Navigator>
    <AppStack.Screen
      name="Home"
      component={AppScreens}
      options={{
        tabBarIcon: () => (
          <FontAwesome5 name={'home'} size={32} color="black" solid />
        ),
      }}
    />
    <AppStack.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: () => (
          <FontAwesome5 name={'user-alt'} size={32} color="black" solid />
        ),
      }}
    />
  </AppStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userid }) => (
  <RootStack.Navigator headerMode="none">
    {userid ? (
      <RootStack.Screen name="App" component={AppStackScreen} />
    ) : (
      <RootStack.Screen name="Auth" component={AuthStackScreen} />
    )}
  </RootStack.Navigator>
);

const RootNavigation = () => {
  const isLoading = useSelector((state) => state.isLoading);
  const userid = useSelector((state) => state.userid);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <RootStackScreen userid={userid} />
    </NavigationContainer>
  );
};

export default RootNavigation;
