import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';


const Trips = () => {

  const test = useSelector(state => state.userid);

  return (
    <View style={styles.screen}>
      <Text>TRIPS SCREEN</Text>
      <Text>{test}</Text>
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
