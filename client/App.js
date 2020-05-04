import React from 'react';
import { StyleSheet, View } from 'react-native';
import Result from './components/Result';

export default function App() {
  return (
    <View style={styles.container}>
      <Result result={[
        {
          driver: { id: 1, name: 'Virginie' },
          passengers: [{ id: 2, name: 'Brendan' }, { id: 3, name: 'Anthony' }]
        },
        {
          driver: { id: 4, name: 'John' },
          passengers: [{ id: 5, name: 'Jane' }, { id: 6, name: 'Jake' }, { id: 7, name: 'Joseph' }]
        }
      ]}></Result>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
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
