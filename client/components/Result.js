import React from 'react';
import { View, Text, SectionList, SafeAreaView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import colorScheme from '../constants/colors';

export default function Result ({ result }) {

  function parseResultToList (result) {
    return result.map(({driver, passengers}) => ({
      title: driver.name,
      data: passengers.map(({id, name}) => ({
        key: id,
        name
      }))
    }));
  }

  function Item (item) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>
          { item.name }
        </Text>
      </View>
    );
  }

  function Header (title) {
    return (
      <Text style={styles.header}>
        { `${title}'s car` }
      </Text>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={ parseResultToList(result) }
        renderItem={ ({item}) => Item(item) }
        renderSectionHeader={ ({ section: { title } }) => Header(title) }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: colorScheme.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  header: {
    backgroundColor: colorScheme.accent,
    padding: 10,
    marginTop: 16,
    fontSize: 26,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 24
  }
});