import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import participants from '../data/participants';
import ParticipantItem from '../components/ParticipantItem';

const currentUser = {
  id: 'user8',
};

const ParticipantsScreen = () => {
  return (
    <FlatList
      data={participants}
      renderItem={({ item }) => {
        return (
          <ParticipantItem
            isCurrentUser={item.id === currentUser.id}
            name={item.name}
            coming={item.participant}
            hasAnswered={item.hasAnswered}
          />
        );
      }}
      keyExtractor={(item) => item.id}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({});

export default ParticipantsScreen;
