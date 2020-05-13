import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View
} from 'react-native';

import * as actions from '../store/actions';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const LoadingScreen = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const autoLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      console.log('userData', userData); // eslint-disable-line no-console
      if (!userData) {
        dispatch(actions.appIsLoading(false));
        return;
      }
      const data = JSON.parse(userData);
      const { userToken, userid, userEmail, expirationTime } = data;

      const tokenHasExpired = new Date(expirationTime) <= new Date();
      console.log('TOKEN HAS EXPIRED', tokenHasExpired); // eslint-disable-line no-console
      if (tokenHasExpired || !userToken || !userid) {
        dispatch(actions.appIsLoading(false));
        return;
      }

      dispatch(actions.storeUserAsync(userEmail));

    };
    autoLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default LoadingScreen;
