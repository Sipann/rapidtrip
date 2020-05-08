import React, { useState } from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/colors';
import StyleRefs from '../constants/styles';
import userFormOutput from './formOutput';
import AddUserForm from './AddUserForm';
import formToAlgo from '../utils/algoInputParser';
import parseAlgoOutput from '../utils/algoOutputParser';
import Algorithm from '../services/Algorithm/Algorithm';

const FormLaunch = () => {

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [users, setUsers] = useState(formOutput);
  const navigation = useNavigation();

  const addNewUser = user => {
    const newUser = userFormOutput(user);
    console.log('newUser', newUser);

    setUsers(currentUsers => [...currentUsers, newUser]);
    setIsAddingUser(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.formContainer}>
        <Button
          accessibilityLabel="Add New User Form"
          color={Colors.primary}
          onPress={() => setIsAddingUser(true)}
          title="Add User" />
        <Modal
          animationType="slide"
          style={styles.formModal}
          visible={isAddingUser}>
          <AddUserForm
            addUser={user => addNewUser(user)}
            dismissModal={() => setIsAddingUser(false)}
            style={styles.addUserForm} />
        </Modal>
      </View>

      <View style={styles.resultsContainer}>
        <Button
          color={Colors.secondary}
          onPress={async () => {
            // const parsedResult = await formToAlgo(users);
            // console.log('parsedResult', parsedResult);
            // const result = Algorithm(parsedResult);
            // console.log('algoResult', result);
            // const inputResultPage = parseAlgoOutput(result, users);
            // console.log('inputResultPage', inputResultPage);
            navigation.navigate('Result');
          }}
          title="Car allocation" />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  addUserForm: {
    flex: 1,
    width: '100%',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formModal: {
    ...StyleRefs.container,
  },
  pageHeader: {
    width: '100%',
  },
  resultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  screen: {
    flex: 1,
    width: '100%',
  },
});

export default FormLaunch;

let formOutput = [
  {
    departureLocation: {
      lat: 41.388516,
      lng: 2.179014,
    },
    departureTimestamp: 1588932000000,
    isAdmin: true,
    isDriver: true,
    name: 'Brendan-MyPlace',
    seats: 2,
  },
  {
    departureLocation: {
      lat: 41.387012,
      lng: 2.170479,
    },
    departureTimestamp: 1588924800000,
    isAdmin: false,
    isDriver: false,
    name: 'Nicole-placaCAT',
    seats: 0,
  },
  {
    departureLocation: {
      lat: 41.394909,
      lng: 2.197982,
    },
    departureTimestamp: 1588939200000,
    isAdmin: false,
    isDriver: true,
    name: 'Virginie-Codeworks',
    seats: 3,
  },
  {
    departureLocation: {
      lat: 41.403107,
      lng: 2.173681,
    },
    departureTimestamp: 1588935600000,
    isAdmin: false,
    isDriver: false,
    name: 'Anthony-SegrataFamilia',
    seats: 0,
  },
  {
    departureLocation: {
      lat: 41.379794,
      lng: 2.124108,
    },
    departureTimestamp: 1588924800000,
    isAdmin: false,
    isDriver: false,
    name: 'Lello-CampNou',
    seats: 0,
  },
];