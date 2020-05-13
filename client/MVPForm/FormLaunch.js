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


