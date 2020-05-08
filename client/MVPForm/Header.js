import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../constants/colors';


const Header = ({ style, title }) => {
  return (
    <View style={{ ...styles.headerContainer, ...style }}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    height: 90,
    justifyContent: 'center',
    paddingTop: 36,
    width: '100%',
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
