import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Result from './components/Result';

export default function App() {
  return (
    <View style={styles.container}>
      <Result />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
