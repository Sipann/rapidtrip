// import 'react-native-gesture-handler';
// import React from 'react';
// import Result from './components/Result';
// import { StyleSheet, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Form from './MVPForm/FormLaunch';

// import Colors from './constants/colors';

// const Stack = createStackNavigator();

// export default function App () {
//   return (
//     <View style={styles.container}>
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName='MVPForm'
//           screenOptions={{
//             headerStyle: {
//               backgroundColor: Colors.primary,
//             },
//             headerTintColor: 'black',
//             headerTitleAlign: 'center',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//               fontSize: 18
//             }
//           }}
//           >
//           <Stack.Screen
//             name='MVPForm'
//             component={Form}
//             options={{title: 'Trippy'}}
//           />
//           <Stack.Screen
//             name='Result'
//             component={Result}
//             options={{title: 'Car Allocation'}}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'stretch',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import TripsPage from './components/TripsPage'
import AddTrip from './components/AddTrip'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, StyleSheet, Button } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ="TripsPage" component ={TripsPage}
          options={{
            title: 'RapidTrip',
            headerRight: () => (
              <TouchableOpacity
              onPress={() => navigation.navigate('AddTrip')}>
              <Text>Create a New Trip</Text>
              </TouchableOpacity>
            ),
          }}/>
        <Stack.Screen name = "AddTrip" component = {AddTrip} options={{ title: 'Add a Trip' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  new: {
    color: 'black'
  }
})


const mockedTrips = [
  {
    id: 1,
    title: 'London Roadtrip',
    date: new Date(2014, 6, 5),
  },
  {
    id: 2,
    title: 'Amsterdam Weekend',
    date: new Date(2013, 12, 7),
  },
  {
    id: 3,
    title: 'Weekend at Munich',
    date: new Date(2016, 11, 7),
  },
  {
    id: 4,
    title: 'Camping Weekend',
    date: new Date(2016, 12, 8),
  },
  {
    id: 5,
    title: 'Trip to Rome',
    date: new Date(2017, 2, 8),
  },
  {
    id: 6,
    title: 'Trip to Barcelona',
    date: new Date(2020, 5, 10),
  },
  {
    id: 7,
    title: 'Trip to Chamonix',
    date: new Date(2020, 5, 11),
  },
  {
    id: 8,
    title: 'Trip to Andora',
    date: new Date(2020, 5, 15),
  },
  {
    id: 9,
    title: 'Trip to Milan',
    date: new Date(2020, 5, 20),
  },
  {
    id: 10,
    title: 'Trip to Rome',
    date: new Date(2020, 7, 20),
  },
];
