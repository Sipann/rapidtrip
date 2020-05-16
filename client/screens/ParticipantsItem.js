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
  ) : props.isCurrentUser ? (
    <Feather
      name="chevron-right"
      size={24}
      onPress={() => navigation.navigate('ParticipantResponse', { tripId: props.tripId, currentUser: props.currentUser })}
    />
  ) : null;
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.clickable}
        onPress={() => 
          props.isCurrentUser
          && navigation.navigate('ParticipantResponse', {
            tripId: props.tripId,
            currentUser: props.currentUser })}
      >
        <View style={styles.item} >
          {/* {props.isCurrentUser ? <AntDesign name="exclamation" size={24} /> : null} */}
          {props.isCurrentUser  
            ? <Text style={styles.textMe}>{props.name + ' (me)'}</Text>
            : <Text style={styles.text}>{props.name}</Text>
          }
        </View>
        <View>
          <Text style={styles.icon}>{icon}</Text>
        </View>
      </TouchableOpacity>
      {props.isAdmin ? (
        <TouchableOpacity style={styles.trashButton}>
          <View>
            <Ionicons
              name="ios-trash"
              size={24}
              color={Colors.secondary} 
              onPress={props.removeParticipant}
            />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
// rgba(233,68,106,0.2)
const styles = StyleSheet.create({
  row: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  clickable: {
    flexGrow: 1,
    paddingVertical: 25,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  trashButton: {
    paddingVertical: 25,
    paddingHorizontal: 25
  },
  text: {
    fontSize: 18,
    marginLeft: 20,
    width: 220
  },
  textMe: {
    fontSize: 18,
    marginLeft: 20,
    fontWeight: 'bold',
    width: 220
  },
  item: {
    flexDirection: 'row'
  },
  icon: {
    color: Colors.secondary,
  },
});

export default ParticipantItem;
