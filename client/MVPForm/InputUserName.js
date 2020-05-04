import React, { useState } from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Colors from '../constants/colors';
import StyleRefs from '../constants/styles';

const InputUserName = ({
  username,
  scrollToNext,
  setUsernameHandler,
  style
}) => {

  const [enableNext, setEnableNext] = useState(false);

  const onInputHandler = text => {
    setUsernameHandler(text);
    if (text.trim().length > 1) setEnableNext(true);
    else setEnableNext(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>

      <View style={{ ...style, ...styles.usernameContainer }}>

        <View style={styles.usernameInputContainer}>
          <Text>User Name</Text>
          <TextInput
            placeholder="e.g. John Doe"
            onChangeText={text => onInputHandler(text)}
            style={styles.usernameTextInput}
            value={username}
          />
        </View>

        <View>
          <Button
            accessibilityLabel="Next"
            color={Colors.primary}
            disabled={!enableNext}
            onPress={scrollToNext}
            title="NEXT" />
        </View>

      </View>

    </TouchableWithoutFeedback>
  );

};

const styles = StyleSheet.create({
  usernameContainer: {
    ...StyleRefs.container,
  },
  usernameInputContainer: {
    width: '85%',
    marginBottom: 15,
  },
  usernameTextInput: {
    ...StyleRefs.textInput,
    width: '100%',
  },
});

export default InputUserName;