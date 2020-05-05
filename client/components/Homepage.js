import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import colorScheme from '../constants/colors';

export default function Homepage () {

  function Item (name, icon) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Button pressed')}>
        <FontAwesome5 name={icon} size={32} color='black' solid/>
        <Text style={styles.textItem}>{name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Welcome to RapidTrip</Text>
      <View style={styles.menu}>
        { Item('My trips', 'road') }
        { Item('Profile', 'user') }
        { Item('Friends', 'user-friends') }
        { Item('Settings', 'cog') }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  item: {
    padding: 20,
    margin: 10,
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    backgroundColor: colorScheme.accent
  },
  textHeader: {
    fontSize: 30
  },
  textItem: {
    fontSize: 16,
    textAlign: 'center'
  }
});