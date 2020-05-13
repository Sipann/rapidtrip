import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import participants from '../assets/MockParticipants';
import ParticipantItem from './ParticipantsItem';
import { Ionicons } from '@expo/vector-icons';

const currentUser = {
  id: 'user8',
  admin: true,
};

const ParticipantsScreen = () => {
  const addParticipant = (participant) => {
    participants.push(participant);
  };

  return (
    <>
      {currentUser.admin ? (
        <View style={styles.container}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Add Participant"
            autoCapitalize="none"
            autoCorrect={false}
            onEndEditing={addParticipant}
          />
          <TouchableOpacity style={styles.button}>
            <Ionicons
              style={{ justifyContent: 'center' }}
              name="md-add"
              size={32}
              color="#333"
            />
          </TouchableOpacity>
        </View>
      ) : null}
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
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    width: 100,
    paddingVertical: 25,
    paddingHorizontal: 25,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  container: {
    flexDirection: 'row',
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingVertical: 25,
    paddingHorizontal: 25,
  },
});

export default ParticipantsScreen;
