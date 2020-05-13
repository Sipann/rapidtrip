import env from '../config/env.config';

const BASE_URL = env.API_BASE_URL;

export default {

  // POST '/trip/:user_email'
  createTripInDB: async (userEmail, trip) => {
    try {
      const endpoint = `/trip/${userEmail}`;
      const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(trip),
        headers: { 'Content-Type': 'application/json' }
      };
      return await fetchRequest(endpoint, fetchOptions);
    } catch (error) {
      return { ok: false, error: `[createTripInDB] error: ${error.message}` };
    }
  },


  // POST '/user'
  createUserInDB: async newUser => {
    try {
      const endpoint = '/user';
      const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: { 'Content-Type': 'application/json' }
      };
      return await fetchRequest(endpoint, fetchOptions);
    } catch (error) {
      return { ok: false, error: `[createUserInDB] error: ${error.message}` };
    }
  },

  // DELETE '/trip/:trip_id'
  deleteTripFromDB: async tripId => {
    try {
      const endpoint = `trip/${tripId}`;
      const fetchOptions = {
        method: 'DELETE',
      };
      return await fetchRequest(endpoint, fetchOptions);
    } catch (error) {
      return { ok: false, error: `[deleteTripFromDB] error: ${error.message}` };
    }
  },


  // DELETE '/user/:user_email'
  deleteUserFromDB: async userEmail => {
    try {
      const endpoint = `user/${userEmail}`;
      const fetchOptions = {
        method: 'DELETE',
      };
      return await fetchRequest(endpoint, fetchOptions);
    } catch (error) {
      return { ok: false, error: `[deleteUserFromDB] error: ${error.message}` };
    }
  },

  // GET '/user/:user_email'
  fetchUserFromDB: async userEmail => {
    try {
      const endpoint = `user/${userEmail}`;
      return await fetchRequest(endpoint);
    } catch (error) {
      return { ok: false, error: `[fetchUserFromDB] error: ${error.message}` };
    }
  },


  // PUT '/trip/:trip_id/:user_email'
  includeParticipantInfo: async (tripId, participantInfo) => {
    try {
      const endpoint = `trip/${tripId}/${participantInfo.email}`;
      const fetchOptions = {
        method: 'PUT',
        body: JSON.stringify(participantInfo),
        headers: { 'Content-Type': 'application/json' }
      };
      return await fetchRequest(endpoint, fetchOptions);
    } catch (error) {
      return { ok: false, error: `[includeParticipantInfo] error: ${error.message}` };
    }
  },


  // POST '/trip/:trip_id/:user_email'
  includeUserInTripInDB: async (tripId, newUserEmail) => {
    try {
      const endpoint = `trip/${tripId}/${newUserEmail}`;
      const fetchOptions = {
        method: 'POST',
      };
      return await fetchRequest(endpoint, fetchOptions);
    } catch (error) {
      return { ok: false, error: `[includeUserInTripInDB] error: ${error.message}` };
    }
  },

  // DELETE '/trip/:trip_id/:user_email'
  removeUserFromTripInDB: async (tripId, userEmail) => {
    try {
      const endpoint = `/trip/${tripId}/${userEmail}`;
      const fetchOptions = {
        method: 'DELETE',
      };
      return await fetchRequest(endpoint, fetchOptions);
    } catch (error) {
      return { ok: false, error: `[removeUserFromTripInDB] error: ${error.message}` };
    }
  },

  // PUT '/trip/:trip_id/cars'
  updateCarAllocation: async (trip, cars) => {
    try {
      const endpoint = `trip/${trip.tripId}/cars`;
      const fetchOptions = {
        method: 'PUT',
        body: JSON.stringify(cars),
        headers: { 'Content-Type': 'application/json' }
      };
      return await fetchRequest(endpoint, fetchOptions);
    } catch (error) {
      return { ok: false, error: `[updateCarAllocation] error: ${error.message}` };
    }
  },

  // PUT '/trip/:trip_id/info'
  updateTripInfoInDB: async tripData => {
    try {
      const endpoint = `trip/${tripData.tripId}/info`;
      const fetchOptions = {
        method: 'PUT',
        body: JSON.stringify(tripData),
        headers: { 'Content-Type': 'application/json' }
      };
      return await fetchRequest(endpoint, fetchOptions);
    } catch (error) {
      return { ok: false, error: `[updateTripInDB] error: ${error.message}` };
    }
  },

  // PUT '/user/:user_email'
  updateUserInDB: async userData => {
    try {
      const endpoint = `user/${userData.email}`;
      const fetchOptions = {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: { 'Content-Type': 'application/json' }
      };
      return await fetchRequest(endpoint, fetchOptions);
    } catch (error) {
      return { ok: false, error: `[updateUserInDB] error: ${error.message}` };
    }
  },

};


const fetchRequest = (url, fetchOptions = {}) => {
  return fetch(`${BASE_URL}/${url}`, fetchOptions)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch((err) => {
      console.log(`${err.message} while fetching /${url}`);  // eslint-disable-line no-console
    });
};