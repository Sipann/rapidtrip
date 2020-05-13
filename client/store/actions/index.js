import { AsyncStorage } from 'react-native';
import * as firebase from 'firebase';

import * as actionTypes from './actionTypes';

import services from '../../services/apiClient';


// UTILITIES

const saveUserLogData = async (userEmail, userid, userToken, expirationTime) => {
  try {
    await AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        expirationTime: expirationTime,
        userEmail: userEmail,
        userid: userid,
        userToken: userToken,
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

const actionFail = message => ({ type: actionTypes.ACTION_FAIL, message });


// APP_IS_LOADING
export const appIsLoading = val => ({ type: actionTypes.APP_IS_LOADING, val });


// AUTHENTICATE
export const authenticateAsync = (mode, email, password, name = '') => {
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
        const newUser = { id: userid, name, email };
        const response = await services.createUserInDB(newUser);
        if (response && response.ok) dispatch(storeUserSync(response.body));
        else if (response && !response.ok) dispatch(actionFail(response.error));
        else throw new Error('create User in DB error');
        saveUserLogData(email, userid, userToken, expirationTime);
      }

      else {
        const response = await services.fetchUserFromDB(email);
        if (response && response.ok) dispatch(storeUserSync(response.body));
        else if (response && !response.ok) dispatch(actionFail(response.error));
        else throw new Error('fetch User from DB error');
        saveUserLogData(email, userid, userToken, expirationTime);
      }


    } catch (error) {
      if (error.message === 'create User in DB error') dispatch(actionFail('Could not create user in DB'));
      else if (error.message === 'fetch User from DB error') dispatch(actionFail('Could not fetch user data from'));
      else dispatch(actionFail('Authentication failed.'));
    }
  };
};


// CREATE TRIP
const createTripSync = trip => ({ type: CREATE_TRIP_SYNC, tripCreated: trip });

export const createTripAsync = async (userEmail, newTrip) => {
  return async dispatch => {
    try {
      const tripDB = {
        title: newTrip.TripName,
        description: newTrip.TripDesc,
        date: new Date(newTrip.TripDate),
        destination: {
          address: newTrip.TripAddress,
          latitude: newTrip.TripLoc.lat,
          longitude: newTrip.TripLoc.lng,
        },
        picture: newTrip.TripPicture,
      };
      const response = await services.createTripInDB(userEmail, tripDB);
      if (response && response.ok) dispatch(createTripSync(response.body));
      else if (response && !response.ok) dispatch(actionFail(response.error));
      else throw new Error('createTripAsync error');
    } catch (error) {
      dispatch(actionFail('Could not create trip'));
    }
  };
};


// DELETE TRIP
const deleteTripSync = tripId => ({ type: actionTypes.DELETE_TRIP_SYNC, tripId });

export const deleteTripAsync = async tripId => {
  return async dispatch => {
    try {
      const response = await services.deleteTripFromDB(tripId);
      if (response && response.ok) dispatch(deleteTripSync(tripId));
      else if (response && !response.ok) dispatch(actionFail(response.error));
      else throw new Error('deleteTripAsync error');
    } catch (error) {
      dispatch(actionFail('Could not delete Trip'));
    }
  };
};


// DELETE USER
export const deleteUserAsync = async userEmail => {
  return async dispatch => {
    try {
      const response = await services.deleteUserFromDB(userEmail);
      if (response && response.ok) {
        await removeUserLogData();
        const currentUser = firebase.auth().currentUser;
        await currentUser.delete();
      }
      else if (response && !response.ok) dispatch(actionFail(response.error));
      else throw new Error('deleteUserAsync error');
    } catch (error) {
      dispatch(actionFail('Could not delete the user'));
    }
  };
};

// INCLUDE PARTICIPANT INFO
const includeParticipantInfoSync = (tripId, participantInfo) => ({
  type: actionTypes.INCLUDE_PARTICIPANT_INFO_SYNC,
  payload: { tripId: tripId, participantInfo: participantInfo }
});

export const includeParticipantInfoAsync = (tripId, participantInfo) => {
  return async dispatch => {
    try {
      const response = await services.includeParticipantInfo(tripId, participantInfo);
      if (response && response.ok) dispatch(includeParticipantInfoSync(tripId, response.body));
      else if (response && !response.ok) dispatch(actionFail(response.error));
      else throw new Error('includeParticipantInfo error');
    } catch (error) {
      dispatch(actionFail('Could not include participant info'));
    }
  };
};


// INCLUDE USER IN TRIP
const includeUserInTripSync = (tripId, participantsList) => ({
  type: actionTypes.INCLUDE_USER_IN_TRIP_SYNC,
  payload: { tripId: tripId, participantsList: participantsList }
});

export const includeUserInTripAsync = (tripId, newUserEmail) => {
  return async dispatch => {
    try {
      const response = await services.includeUserInTripInDB(tripId, newUserEmail);
      if (response && response.ok) dispatch(includeUserInTripSync(tripId, response.body));
      else if (response && !response.ok) dispatch(actionFail(response.error));
      else throw new Error('includeUserInTripAsync error');
    } catch (error) {
      dispatch(actionFail('Could not include user in trip'));
    }
  };
};

// LOG OUT
export const logoutUser = () => {
  return async dispatch => {
    try {
      await removeUserLogData();
      await firebase.auth().signOut();
      dispatch(storeUserSync({}));
    } catch (error) {
      dispatch(actionFail('Could not log out'));
    }
  };
};

// REMOVE USER FROM TRIP
const removeUserFromTripSync = tripId => ({ type: actionTypes.REMOVE_USER_FROM_TRIP_SYNC, tripId });

export const removeUserFromTripAsync = (tripId, userEmail) => {
  return async dispatch => {
    try {
      const response = await services.removeUserFromTripInDB(tripId, userEmail);
      if (response && response.ok) dispatch(removeUserFromTripSync(tripId));
      else if (response && !response.ok) dispatch(actionFail(response.error));
      else throw new Error('removeUserFromTripAsync error');
    } catch (error) {
      dispatch(actionFail('Could not remove User from Trip'));
    }
  };
};


// STORE USER
const storeUserSync = userData => ({ type: actionTypes.STORE_USER_SYNC, userData });

export const storeUserAsync = userEmail => {
  return async dispatch => {
    try {
      const response = await services.fetchUserFromDB(userEmail);
      if (response && response.ok) dispatch(storeUserSync(response.body));
      else if (response && !response.ok) dispatch(actionFail(response.error));
      else throw new Error('storeUserAsync error');
    } catch (error) {
      dispatch(actionFail('Could not fetch your data'));
    }
  };
};


// UPDATE TRIP / CAR ALLOCATIONS
const updateTripCarsSync = (tripId, cars) => ({ type: actionTypes.UPDATE_TRIP_CARS_SYNC, payload: { tripId, cars } });

export const updateTripCarsAsync = (tripId, cars) => {
  return async dispatch => {
    try {
      const response = await services.updateTripCarsInDB(tripId, cars);
      if (response && response.ok) dispatch(updateTripCarsSync(tripId, cars));
      else if (response && !response.ok) dispatch(actionFail(response.error));
      else throw new Error('updateTripCarsAsync error');
    } catch (error) {
      dispatch(actionFail('Could not update trip car allocation'));
    }
  };
};


// UPDATE TRIP / INFOS
const updateTripInfosSync = trip => ({ type: actionTypes.UPDATE_TRIP_INFO_SYNC, trip });

export const updateTripInfosAsync = trip => {
  return async dispatch => {
    try {
      const response = await services.updateTripInfoInDB(trip);
      if (response && response.ok) dispatch(updateTripInfosSync(response.body));
      else if (response && !response.ok) dispatch(actionFail(response.error));
      else throw new Error('updateTripAsync error');
    } catch (error) {
      dispatch(actionFail('Could not update trip details'));
    }
  };
};


// UPDATE USER
const updateUserSync = userData => ({ type: actionTypes.UPDATE_USER_SYNC, userData });

export const updateUserAsync = userData => {
  return async dispatch => {
    try {
      const response = await services.updateUserInDB(userData);
      if (response && response.ok) dispatch(updateUserSync(response.body));
      else if (response && !response.ok) dispatch(actionFail(response.error));
      else throw new Error('updateUserAsync error');
    } catch (error) {
      dispatch(actionFail('Could not update your details'));
    }
  };
};
