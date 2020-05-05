import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import colorScheme from '../constants/colors';

export default function Homepage ({ navigation }) {

  function Item (name, icon, route) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(route)}>
        <FontAwesome5 name={icon} size={32} color='black' solid/>
        <Text style={styles.textItem}>{name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Welcome to RapidTrip</Text>
      <View style={styles.menu}>
        { Item('My trips', 'road', 'My trips') }
        { Item('Profile', 'user', 'Profile') }
        { Item('Friends', 'user-friends', 'Friends') }
        { Item('Settings', 'cog', 'Settings') }
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