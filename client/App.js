import React from 'react';
import AppStack from './components/AppStack';
import Profile from './components/ProfilePage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App () {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={AppStack}
          options={{
            tabBarIcon: () => (
              <FontAwesome5 name={'home'} size={32} color="black" solid />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: () => (
              <FontAwesome5 name={'user-alt'} size={32} color="black" solid />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
