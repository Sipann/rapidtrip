import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, SafeAreaView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import colorScheme from '../constants/colors';

export default function Result () {

  const [result, setResult] = useState([]);

  useEffect(() => {
    setResult(parseResultToList(mockResult));
  }, [mockResult]);

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
        sections={ result }
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

//TODO use context or redux
const mockResult = [
  {
    driver: {
      id: 1, name: 'Virginie',
      departureDate: 1588774296658,
      departureLocation: { lat: 41.401648, lng: -2.186230 },
      departureTime: '16:30:00'
    },
    passengers: [
      {
        id: 2, name: 'Brendan',
        departureDate: 1588774296658,
        departureLocation: { lat: 41.4019693, lng: -2.1860034 },
        departureTime: '15:45:00'
      },
      {
        id: 3, name: 'Anthony',
        departureDate: 1588774296658,
        departureLocation: { lat: 41.4019695, lng: -2.1862589 },
        departureTime: '16:15:00'
      },
      {
        id: 4, name: 'Lello',
        departureDate: 1588774296658,
        departureLocation: { lat: 41.4019542, lng: -2.1862875 },
        departureTime: '16:05:00'
      }
    ]
  },
  {
    driver: {
      id: 5, name: 'John',
      departureDate: 1588774443514,
      departureLocation: { lat: 41.478622, lng: 2.085599 },
      departureTime: '20:45:00'
    },
    passengers: [
      {
        id: 6, name: 'Jane',
        departureDate: 1588774443514,
        departureLocation: { lat: 41.473568, lng: 2.081234 },
        departureTime: '19:45:00'
      },
      {
        id: 7, name: 'Jake',
        departureDate: 1588774443514,
        departureLocation: { lat: 41.475789, lng: 2.085781 },
        departureTime: '19:30:00'
      }
    ]
  }
];