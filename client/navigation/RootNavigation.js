import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoadingScreen from '../screens/LoadingScreen';
import Trips from '../screens/TripsScreen';
import Details from '../screens/DetailsScreen';
import Settings from '../screens/SettingsScreen';
import Register from '../screens/RegisterScreen';
import Login from '../screens/LoginScreen';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Screen
      name="Register"
      component={Register}
      options={{ title: 'Register' }} />
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{ title: 'Sign In' }} />
  </AuthStack.Navigator>
);

const TripsStack = createStackNavigator();
const TripsStackScreen = () => (
  <TripsStack.Navigator initialRouteName="Trips">
    <TripsStack.Screen name="Trips" component={Trips} />
    <TripsStack.Screen name="Details" component={Details} />
  </TripsStack.Navigator>
);

const SettingsStack = createStackNavigator();
const SettingsStackScreen = () => (
  <SettingsStack.Navigator initialRouteName="Settings">
    <SettingsStack.Screen name="Settings" component={Settings} />
  </SettingsStack.Navigator>
);

const AppStack = createStackNavigator();
const AppStackScreen = () => (
  <AppStack.Navigator headerMode="none" initialRouteName="Trips">
    <AppStack.Screen name="Trips" component={TripsStackScreen} />
    <AppStack.Screen name="Settings" component={SettingsStackScreen} />
  </AppStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userid }) => (
  <RootStack.Navigator headerMode="none">
    {userid
      ? (<RootStack.Screen name="App" component={AppStackScreen} />)
      : (<RootStack.Screen name="Auth" component={AuthStackScreen} />)}
  </RootStack.Navigator>
);

const RootNavigation = () => {

  const isLoading = useSelector(state => state.isLoading);
  const userid = useSelector(state => state.userid);

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