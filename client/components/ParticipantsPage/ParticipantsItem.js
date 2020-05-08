import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

// data
const Colors = {
  yes: '#333',
  no: '#333',
  unknown: '#333',
  isUser: 'rgb(0, 195, 249)',
};
// data

const ParticipantItem = (props) => {

  const goToUserInfo = () => {
    console.log('goToUserInfo');
  };

  const icon = props.coming
    ? <FontAwesome5 name="check" size={18} color={Colors.yes} />
    : props.hasAnswered
      ? <FontAwesome name="close" size={18} color={Colors.no} />
      : props.isCurrentUser
        ? <FontAwesome name="chevron-right" size={18} color={Colors.unknown} onPress={goToUserInfo} />
        : <FontAwesome5 name="question" size={18} color={Colors.unknown} />;



  return (
    <View style={styles.item}>
      <View style={props.isCurrentUser ? styles.userTextCntr : styles.othersTextCntr}>
        {props.isCurrentUser
          ? <FontAwesome5 name="exclamation" size={14} color={Colors.isUser} />
          : null}
        <Text style={styles.text}>{props.name}</Text>
      </View>
      <View style={styles.iconContainer}>
        <LinearGradient
          colors={['rgba(241, 243, 154,1)', 'rgba(175, 233, 249,1)']}
          locations={[0.2, 0.6]}
          start={[0.0, 0.0]}
          end={[1.0, 1.0]}
          style={{ width: '100%', height: '100%', padding: 30, alignItems: 'center' }}>
          <Text
            style={{
              backgroundColor: 'transparent',
              fontSize: 18,
              color: '#fff',
            }}>
            {icon}
          </Text>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    margin: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  item: {
    width: '100%',
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  text: {
    fontSize: 18,
    padding: 10,
    margin: 0,
  },
  othersTextCntr: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    padding: 20,
    margin: 0,
  },
  userTextCntr: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffcf',
    height: '100%',
    padding: 20,
    margin: 0,
  },
});

export default ParticipantItem;