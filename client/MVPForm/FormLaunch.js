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

const FormLaunch = () => {

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [users, setUsers] = useState([]);
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
          onPress={() => navigation.navigate('CarAllocation')}
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