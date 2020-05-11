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
import TripsPage from './components/TripsPage';
import AddTrip from './components/AddTrip';
import TripPage from './components/TripPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ="TripsPage" component ={TripsPage}
          options={{
            title: 'RapidTrip',
          }}/>
        <Stack.Screen name = "AddTrip" component = {AddTrip} options={{ title: 'Add a Trip' }} />
        <Stack.Screen name = "TripPage" component = {TripPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

