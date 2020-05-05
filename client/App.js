import React from 'react';
import { StyleSheet, View } from 'react-native';
import Homepage from './components/Homepage';

export default function App () {
  return (
    <View style={styles.container}>
      <Homepage></Homepage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
});
