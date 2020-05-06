import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';


const InputSeatsNum = ({ seats, setSeatsNumHandler }) => {

  return (
    <View>
      <Text># of seats</Text>
      <TextInput
        keyboardType="number-pad"
        onChangeText={input => setSeatsNumHandler(input)}
        style={styles.seatsInput}
        value={seats}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  seatsInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    width: 50,
    textAlign: 'center',
  },
});

export default InputSeatsNum;