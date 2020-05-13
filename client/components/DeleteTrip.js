import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';
import Colors from '../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/actions';

export default function DeleteTrip () {
  const route = useRoute();
  const navigation = useNavigation();
  const { trip } = route.params;
  const tripAdmin = trip.participants.find(participant => participant.is_admin);

  const isAdmin = useSelector(state => state.userid === tripAdmin.id);
  const dispatch = useDispatch();

  const deleteTrip = () => {
    dispatch(actions.deleteTripAsync(trip.id));
    navigation.navigate('TripsPage');
  };

  if (isAdmin) {
    return (
      <View style = {styles.container}>
        <Text style = {styles.message}>Are you sure you want to delete this Trip?</Text>
        <View style = {styles.buttons}>
          <TouchableOpacity onPress={() => deleteTrip()}>
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
    backgroundColor: Colors.background,
    flexGrow: 1
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  message: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: '50%',
    color: 'white'
  },
  runbuttongood: {
    fontSize:40,
    margin: 40,
    textAlign: 'center',
    backgroundColor: Colors.primary,
    borderRadius:5,
    width: 100
  },
  runbuttonbad: {
    fontSize:40,
    margin: 40,
    textAlign: 'center',
    backgroundColor: Colors.danger,
    borderRadius:5,
    width: 100
  }

});
