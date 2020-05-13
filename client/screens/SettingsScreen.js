import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Settings = () => {

  return (
    <View style={styles.screen}>
      <Text>SETTINGS SCREEN</Text>
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

export default Settings;
