import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ParticipantItem = (props) => {
  const navigation = useNavigation();
  const icon = props.coming ? (
    <Feather name="check" size={24} />
  ) : props.hasAnswered ? (
    <AntDesign name="close" size={24} color={Colors.primary} />
  ) : props.isCurrentUser ? (
    <Feather
      name="chevron-right"
      size={24}
      onPress={() => navigation.navigate('ParticipantResponse')}
    />
  ) : (
    <AntDesign name="question" size={24} />
  );
  return (
    <View style={styles.row}>
      <View>
        {props.isCurrentUser ? <AntDesign name="exclamation" /> : null}
        <Text style={styles.text}>{props.name}</Text>
      </View>
      <View>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <TouchableOpacity>
        <View>
          <Ionicons
            name="ios-trash"
            size={24} color="black"
            onPress={props.removeParticipant}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  text: {
    fontSize: 18,
    marginLeft: 20,
  },
  icon: {
    color: Colors.secondary,
  },
});

export default ParticipantItem;