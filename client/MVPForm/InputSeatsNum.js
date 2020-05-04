import React from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';


const InputSeatsNum = ({ seats, setSeatsNumHandler }) => {

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <View>
        <Text># of seats</Text>
        <TextInput
          keyboardType="number-pad"
          onChangeText={input => setSeatsNumHandler(input)}
          style={styles.seatsInput}
          value={seats}
        />
      </View>
    </TouchableWithoutFeedback>
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