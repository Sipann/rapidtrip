import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Form from './MVPForm/FormLaunch';
import CarAllocation from './components/CarAllocation';

const Stack = createStackNavigator();

export default function App () {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='MVPForm'>
          <Stack.Screen
            name='MVPForm'
            component={Form}
            options={{title: 'MVP Form'}}
          />
          <Stack.Screen
            name='CarAllocation'
            component={CarAllocation}
            options={{title: 'Car Allocation'}}
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
