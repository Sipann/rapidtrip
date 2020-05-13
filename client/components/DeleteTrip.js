import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DeleteTrip ({ route, navigation }) {
  const { trip } = route.params;
  const userId = 3;
  trip.adminId = 3;

  if (userId === trip.adminId) {
    //ADMIN ID IS NOT GREAT
    return (
      <View>
        <Text style = {styles.message}>Are you sure you want to delete this Trip?</Text>
        <View style = {styles.container}>
          <TouchableOpacity>
            <Text style = {styles.runbuttonbad} >Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Text style = {styles.runbuttongood} >No</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text style = {styles.message}>Only the Admin can delete the trip.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  message: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: '50%'
  },
  runbuttongood: {
    fontSize:40,
    margin: 40,
    textAlign: 'center',
    backgroundColor: 'blue',
    borderRadius:5
  },
  runbuttonbad: {
    fontSize:40,
    margin: 40,
    textAlign: 'center',
    backgroundColor: 'red',
    borderRadius:5
  }

});
