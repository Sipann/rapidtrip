import { AsyncStorage } from 'react-native';
import * as firebase from 'firebase';

import * as actionTypes from './actionTypes';

import services from '../../services/apiClient';


// UTILITIES

const saveUserLogData = async (userid, userToken, expirationTime) => {
  try {
    await AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        expirationTime: expirationTime,
        userToken: userToken,
        userid: userid,
      }));
  } catch (error) {
    console.log('[saveUserLogData] - Could not save User Log Data');  // eslint-disable-line no-console
  }
};

const removeUserLogData = async () => {
  try {
    await AsyncStorage.removeItem('userData');
  }
  catch (error) {
    console.log('[removeUserLogData] - Could not remove User Log Data'); // eslint-disable-line no-console
  }
};




// ACTION CREATORS


// APP_IS_LOADING

export const appIsLoading = val => ({ type: actionTypes.APP_IS_LOADING, payload: val });


// AUTHENTICATE


const authenticateFail = message => ({ type: actionTypes.AUTHENTICATE_FAIL, message });

export const authenticateAsync = (email, password, mode) => {
  return async dispatch => {
    try {
      let userCredentials;
      if (mode === 'signup') { userCredentials = await firebase.auth().createUserWithEmailAndPassword(email, password); }
      else { userCredentials = await firebase.auth().signInWithEmailAndPassword(email, password); }

      const userToken = await userCredentials.user.getIdToken();
      const userid = userCredentials.user.uid;
      const userJSON = userCredentials.user.toJSON();
      const expiresAt = userJSON.stsTokenManager.expirationTime;
      const expirationTime = new Date(expiresAt);

      if (mode === 'signup') {
        const newUser = { email, password, userid };
        dispatch(createUserAsync(newUser));
      }
      else { dispatch(storeUserAsync(userid)); }

      saveUserLogData(userid, userToken, expirationTime);

    } catch (error) {
      dispatch(authenticateFail('Authentication failed.'));
    }
  };
};


// CREATE TRIP

const createTripFail = message => ({ type: actionTypes.CREATE_TRIP_FAIL, message });

const createTripSync = trip => ({ type: CREATE_TRIP_SYNC, tripCreated: { ...trip } });

// "TripDate": 2020 - 05 - 20T17: 44: 03.300Z,
// "TripDesc": "It's gonna be fun",
// "TripName": "This is theTrip",
// "TripLoc": Object {
//   "lat": 48.3114648,
//     "lng": 11.9188758,
//   },
export const createTripAsync = async newTrip => {
  return async dispatch => {
    try {
      const response = await services.createTripInDB(newTrip);
      // if (response && response.ok) dispatch(createTripSync(response.body));
      if (response && response.ok) dispatch(createTripSync(newTrip));
      else if (response && !response.ok) dispatch(createTripFail(response.error));
      else throw new Error('createTripAsync error');
    } catch (error) {
      dispatch(createTripFail('Could not create trip'));
    }
  };
};


// CREATE USER

const createUserFail = message => ({ type: actionTypes.CREATE_USER_FAIL, message });

export const createUserAsync = async newUser => {
  return async dispatch => {
    try {
      dispatch(storeUserSync({ userid: newUser.userid }));
      // const response = await services.createUserInDB(newUser);
      // if (response && response.ok) dispatch(storeUserSync, response.body);
      // else if (response && !response.ok) dispatch(createUserFail(response.error));
      // else throw new Error('createUserAsync error');
    } catch (error) {
      dispatch(createUserFail('Could not create user'));
    }
  };
};


// DELETE TRIP

const deleteTripFail = message => ({ type: actionTypes.DELETE_TRIP_FAIL, message });

const deleteTripSync = trip => ({ type: actionTypes.DELETE_TRIP_SYNC, tripId: trip.tripId });

export const deleteTripAsync = async (tripId) => {
  return async dispatch => {
    try {
      const response = await services.deleteTripFromDB(tripId);
      // if (response && response.ok) dispatch(deleteTripSync(response.body));
      if (response && response.ok) dispatch(deleteTripSync(tripId));
      if (response && !response.ok) dispatch(deleteTripFail(response.error));
      else throw new Error('deleteTripAsync error');
    } catch (error) {
      dispatch(deleteTripFail('Could not delete Trip'));
    }
  };
};


// DELETE USER

const deleteUserFail = message => ({ type: actionTypes.DELETE_USER_FAIL, message });

export const deleteUserAsync = async userid => {
  return async dispatch => {
    try {
      const response = await services.deleteUserFromDB(userid);
      if (response && response.ok) {
        await removeUserLogData();
        const currentUser = firebase.auth().currentUser;
        await currentUser.delete();
      }
      if (response && !response.ok) dispatch(deleteUserFail(response.body));
      else throw new Error('deleteUserAsync error');
    } catch (error) {
      dispatch(deleteUserFail('Could not delete the user'));
    }
  };
};


// REMOVE USER FROM TRIP

const removeUserFromTripFail = message => ({ type: actionTypes.REMOVE_USER_FROM_TRIP_FAIL, message });

const removeUserFromTripSync = payload => ({ type: actionTypes.REMOVE_USER_FROM_TRIP_SYNC, payload });

export const removeUserFromTripAsync = (userid, tripId) => {
  return async dispatch => {
    try {
      const response = await services.removeUserFromTripInDB(userid, tripId);
      if (response && response.ok) dispatch(removeUserFromTripSync(tripId));
      if (response && !response.ok) dispatch(removeUserFromTripFail(response.error));
      else throw new Error('removeUserFromTripAsync error');
    } catch (error) {
      dispatch(removeUserFromTripFail());
    }
  };
};



// STORE USER

const storeUserFail = message => ({ type: actionTypes.STORE_USER_FAIL, message });

const storeUserSync = user => ({ type: actionTypes.STORE_USER_SYNC, user: { ...user } });

export const storeUserAsync = userid => {
  return async dispatch => {
    try {
      console.log('[storeUserAsync]');  // eslint-disable-line no-console
      dispatch(storeUserSync({ userid: userid }));
      // const response = await services.fetchUserFromDB(userid);
      // if (response && response.ok) dispatch(storeUserSync(response.body));
      // else if (response && !response.ok) dispatch(storeUserFail(response.error));
      // else throw new Error('storeUserAsync error');
    } catch (error) {
      dispatch(storeUserFail('Could not fetch your data'));
    }
  };
};


// UPDATE TRIP

const updateTripFail = message => ({ type: actionTypes.UPDATE_TRIP_FAIL, message });

const updateTripSync = trip => ({ type: actionTypes.UPDATE_TRIP_SYNC, payload: { ...trip } });

export const updateTripAsync = trip => {
  return async dispatch => {
    try {
      const response = await services.updateTripInDB(trip);
      if (response && response.ok) dispatch(updateTripSync(response.body));
      else if (response && !response.ok) dispatch(updateTripFail(response.error));
      else throw new Error('updateTripAsync error');
    } catch (error) {
      dispatch(updateTripFail('Could not update trip details'));
    }
  };
};


// UPDATE USER

const updateUserFail = message => ({ type: actionTypes.UPDATE_USER_FAIL, message });

const updateUserSync = user => ({ type: actionTypes.UPDATE_USER_SYNC, payload: { ...user } });

export const updateUserAsync = user => {
  return async dispatch => {
    try {
      const response = await services.updateUserInDB(user);
      if (response && response.ok) dispatch(updateUserSync(response.body));
      if (response && !response.ok) dispatch(updateUserFail(response.error));
      else throw new Error('updateUserAsync error');
    } catch (error) {
      dispatch(updateUserFail('Could not update your details'));
    }
  };
};
