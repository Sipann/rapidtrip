import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import participants from '../data/participants.js';
import ParticipantItem from './ParticipantItem.js';

// data
const currentUser = {
  id: 'user8',
};
//

const ParticipantsList = () => {

  return (
    <View style={styles.list}>
      <FlatList
        data={participants}
        renderItem={({ item }) => {
          return (
            <ParticipantItem
              isCurrentUser={item.id === currentUser.id}
              name={item.name}
              coming={item.participant}
              hasAnswered={item.hasAnswered} />
          );
        }}
        keyExtractor={item => item.id}
        style={styles.flatList}
      />
    </View>
  );


};

const styles = StyleSheet.create({
  flatList: {
    width: '90%',
    marginVertical: 10,
  },
  list: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(213, 221, 226)',
  }
});

export default ParticipantsList;