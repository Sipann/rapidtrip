// TO IMPORT FROM ENV / CONFIG
const BASE_URL = 'http://localhost:3000/';



export default {

  createTripInDB: async trip => {
    try {

      const fetchURL = `${BASE_URL}/${endpoint}`;  // TODO: endpoint
      const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(trip),
        headers: { 'Content-Type': 'application/json' }
      };
      return await fetch(fetchURL, fetchOptions);

    } catch (error) {
      return { ok: false, error: `[createTripInDB] error: ${error.message}` };
    }
  },


  createUserInDB: async newUser => {
    try {

      const fetchURL = `${BASE_URL}/${endpoint}`;  // TODO: endpoint
      const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: { 'Content-Type': 'application/json' }
      };
      return await fetch(fetchURL, fetchOptions);

    } catch (error) {
      return { ok: false, error: `[createUserInDB] error: ${error.message}` };
    }
  },

  deleteTripFromDB: async tripId => {
    try {
      const fetchURL = `${BASE_URL}/${endpoint}/${tripId}`;  // TODO: endpoint
      const fetchOptions = {
        method: 'DELETE',
      };
      return await fetch(fetchURL, fetchOptions);
    } catch (error) {
      return { ok: false, error: `[deleteTripFromDB] error: ${error.message}` };
    }
  },


  deleteUserFromDB: async userid => {
    try {
      const fetchURL = `${BASE_URL}/${endpoint}/${userid}`;  // TODO: endpoint
      const fetchOptions = {
        method: 'DELETE',
      };
      return await fetch(fetchURL, fetchOptions);
    } catch (error) {
      return { ok: false, error: `[deleteUserFromDB] error: ${error.message}` };
    }
  },

  fetchUserFromDB: async userid => {
    try {
      const fetchURL = `${BASE_URL}/${endpoint}/${userid}`;  // TODO: endpoint
      const userFetched = await fetch(fetchURL);
      const userFetchedJSON = await userFetched.json();
      return userFetchedJSON;
    } catch (error) {
      return { ok: false, error: `[fetchUserFromDB] error: ${error.message}` };
    }
  },

  removeUserFromTripInDB: async (userid) => {
    try {
      const fetchURL = `${BASE_URL}/${endpoint}/${userid}`;  // TODO: endpoint
      const fetchOptions = {
        method: 'DELETE',
      };
      return await fetch(fetchURL, fetchOptions);
    } catch (error) {
      return { ok: false, error: `[removeUserFromTripInDB] error: ${error.message}` };
    }
  },

  updateTripInDB: async trip => {
    try {
      const fetchURL = `${BASE_URL}/${endpoint}/${userid}`;  // TODO: endpoint
      const fetchOptions = {
        method: 'PUT',
        body: JSON.stringify(trip),
        headers: { 'Content-Type': 'application/json' }
      };
      return await fetch(fetchURL, fetchOptions);
    } catch (error) {
      return { ok: false, error: `[updateTripInDB] error: ${error.message}` };
    }
  },

  updateUserInDB: async user => {
    try {
      const fetchURL = `${BASE_URL}/${endpoint}/${userid}`;  // TODO: endpoint
      const fetchOptions = {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }
      };
      return await fetch(fetchURL, fetchOptions);
    } catch (error) {
      return { ok: false, error: `[updateUserInDB] error: ${error.message}` };
    }
  },

};
