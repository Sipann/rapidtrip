import 'react-native-gesture-handler';
import React from 'react';
import Result from './components/Result';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/HomeScreen';

import Form from './MVPForm/FormLaunch';

import Colors from './constants/colors';

const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MVPForm"
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
          }}
        >
          <Stack.Screen
            name="MVPForm"
            component={Form}
            options={{ title: 'Trippy' }}
          />
          <Stack.Screen
            name="Result"
            component={Result}
            options={{ title: 'Car Allocation' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Feed"
          activeColor="#fff"
          barStyle={{ backgroundColor: Colors.secondary }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Notifications"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cogs" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
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
