import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';


const Trips = () => {

  const test = useSelector(state => state.userid);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(actions.logoutUser());
  };

  return (
    <View style={styles.screen}>
      <Text>TRIPS SCREEN</Text>
      <Text>{test}</Text>
      <Button onPress={handleLogout} title="logout" />
    </View>
  );

};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Trips;
