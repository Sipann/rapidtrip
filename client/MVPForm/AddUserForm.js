import React, { useState } from 'react';
import {
  Button,
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import InputDepartureLocation from './InputDepartureLocation';
import InputDepartureTime from './InputDepartureTime';
import InputIsAdmin from './InputIsAdmin';
import InputIsDriver from './InputIsDriver';
import InputUserName from './InputUserName';


const AddUserForm = ({ addUser, dismissModal }) => {

  const [user, setUser] = useState({
    departureDate: new Date(),
    departureLocation: '',
    departureTime: '',
    isAdmin: false,
    isDriver: false,
    name: '',
    seats: '0',
  });

  const cancelHandler = () => {
    setUser({
      departureDate: new Date(),
      departureLocation: '',
      departureTime: '',
      isAdmin: false,
      isDriver: false,
      name: '',
      seats: '0',
    });
    dismissModal();
  };

  const screenWidth = Dimensions.get('window').width;
  const scroll = React.createRef();

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
      <View style={styles.screen}>

        <View style={styles.carousel}>

          <ScrollView
            keyboardShouldPersistTaps="always"
            horizontal={true}
            pagingEnabled={true}
            scrollEnabled={false}
            ref={scroll}
            contentContainerStyle={{ width: '500%' }}>

            <InputUserName
              scrollToNext={() => {
                scroll.current.scrollTo({ x: 1 * screenWidth, y: 0, animated: true });
                Keyboard.dismiss();}
              }
              setUsernameHandler={(input) => setUser({ ...user, name: input })}
              style={{ width: screenWidth }}
              username={user.name}
            />

            <InputIsAdmin
              isAdmin={user.isAdmin}
              scrollToNext={selectedDate => {
                if (selectedDate) setUser({ ...user, departureDate: selectedDate });
                scroll.current.scrollTo({ x: 2 * screenWidth, y: 0, animated: true });
              }}
              setIsAdminHandler={() => setUser({ ...user, isAdmin: !user.isAdmin })}
              style={{ width: screenWidth }}
            />

            <InputIsDriver
              isDriver={user.isDriver}
              scrollToNext={seats => {
                if (seats) setUser({ ...user, seats: seats });
                scroll.current.scrollTo({ x: 3 * screenWidth, animated: true });
                setShowTime(true);
                Keyboard.dismiss();
              }}
              style={{ width: screenWidth }}
              toggleDriverHandler={() => setUser({ ...user, isDriver: !user.isDriver })}
            />

            <InputDepartureTime
              time={user.departureTime}
              scrollToNext={selectedTime => {
                setUser({ ...user, departureTime: selectedTime });
                scroll.current.scrollTo({ x: 4 * screenWidth, animated: true });
              }}
              scrollToPrev={() => { }}
              setDepartureTime={(evt, selectedTime) => setUser({ ...user, departureTime: selectedTime })}
              style={{ width: screenWidth }}
            />

            <InputDepartureLocation
              addUser={() => addUser(user)}
              scrollToPrev={() => { }}
              setDepartureLocation={(loc) => setUser({ ...user, departureLocation: loc })}
              style={{ width: screenWidth }}
            />

          </ScrollView>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <Button
              onPress={cancelHandler}
              title="CANCEL"
              color="black"
              accessibilityLabel="Cancel" />
          </View>
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'flex-end',
    padding: 10,
  },
  buttonsContainer: {
    width: '100%',
  },
  carousel: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: 'space-between',
  },

});

export default AddUserForm;
