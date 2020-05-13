import React, { useState } from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  View,
} from 'react-native';

import Colors from '../constants/colors';
import StyleRefs from '../constants/styles';

import AddUserForm from './AddUserForm';
import Header from './Header';


const FormLaunch = () => {

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [users, setUsers] = useState([]);

  const addNewUser = user => {
    if (user.departureDate) {
      user.departureDate = user.departureDate.getTime();
    }
    if (user.seats) {
      user.seats = parseInt(user.seats);
    }
    user.departureTime = user.departureTime.toLocaleTimeString();
    setUsers(currentUsers => [...currentUsers, user]);
    setIsAddingUser(false);
  };

  return (
    <View style={styles.screen}>
      <Header
        title="MVP Form"
        style={styles.pageHeader} />

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
          onPress={() => console.log('all users', users)}
          title="Get All Users" />
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
