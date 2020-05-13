import * as actionTypes from '../actions/actionTypes';

const initialState = {
  // user specific
  userid: '',
  email: '',
  name: '',
  picture: '',
  trips: [],

  // app specific
  error: null,
  isLoading: true,
};

const deepCloneCars = trip => {
  return trip.cars.map(car => {
    const passengers = car.passengers.map(passenger => ({ ...passenger }));
    return { ...car, passengers };
  });
};

const deepCloneParticipants = trip => {
  return trip.participants.map(participant => ({ ...participant }));
};


const reducers = (state = initialState, action) => {

  switch (action.type) {

    // const actionFail = message => ({ type: actionTypes.ACTION_FAIL, message });
    case actionTypes.ACTION_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.message,
      };
    }

    // const appIsLoading = val => ({ type: actionTypes.APP_IS_LOADING, val });
    case actionTypes.APP_IS_LOADING: {
      return {
        ...state,
        isLoading: action.val,
      };
    }


    // const createTripSync = trip => ({ type: CREATE_TRIP_SYNC, tripCreated: trip });
    case actionTypes.CREATE_TRIP_SYNC: {
      const updatedTrips = state.trips.map(trip => {
        const tripParticipants = deepCloneParticipants(trip);
        const tripCars = deepCloneCars(trip);
        return {
          ...trip,
          participants: tripParticipants,
          cars: tripCars,
        };
      });

      const newTrip = {
        ...action.tripCreated,
        participants: [
          {
            id: state.userid,
            name: state.name,
            email: state.email,
            picture: state.picture,
            departure_time: null,
            is_admin: true,
            departure_location_id: null,
            car_id: null
          }
        ]
      };

      return {
        ...state,
        error: null,
        trips: [
          ...updatedTrips,
          newTrip
        ],
      };
    }

    // const deleteTripSync = tripId => ({ type: actionTypes.DELETE_TRIP_SYNC, tripId });
    case actionTypes.DELETE_TRIP_SYNC: {
      const updatedTrips = state.trips
        .filter(trip => trip.id != action.tripId)
        .map(trip => {
          const tripParticipants = deepCloneParticipants(trip);
          const tripCars = deepCloneCars(trip);
          return {
            ...trip,
            participants: tripParticipants,
            cars: tripCars,
          };
        });

      return {
        ...state,
        error: null,
        trips: updatedTrips,
      };
    }

    // const includeParticipantInfoSync = (tripId, participantInfo) => ({
    //   type: actionTypes.INCLUDE_PARTICIPANT_INFO_SYNC,
    //   payload: { tripId: tripId, participantInfo: participantInfo }
    // });
    case actionTypes.INCLUDE_PARTICIPANT_INFO_SYNC: {

      const updatedTrips = state.trips.map(trip => {
        let tripParticipants;

        if (trip.id === action.payload.tripId) {
          tripParticipants = trip.participants.map(participant => {
            if (participant.person_id === action.payload.participantInfo.person_id) {
              return { ...action.payload.participantInfo };
            }
            else return { ...participant };
          });
        }
        else {
          tripParticipants = deepCloneParticipants(trip);
        }
        const tripCars = deepCloneCars(trip);

        return {
          title: action.trip.title,
          description: action.trip.description,
          date: action.trip.date,
          picture: action.trip.picture,
          participants: tripParticipants,
          cars: tripCars,
        };

      });

      return {
        ...state,
        trips: updatedTrips,
      };
    }

    // const includeUserInTripSync = (tripId, participantsList) => ({
    //  type: actionTypes.INCLUDE_USER_IN_TRIP_SYNC,
    //  payload: { tripId: tripId, participantsList: [...participantsList] }
    // });
    case actionTypes.INCLUDE_USER_IN_TRIP_SYNC: {
      const updatedTrips = state.trips.map(trip => {
        if (trip.id === action.payload.tripId) {
          return {
            ...trip,
            participants: action.payload.participantsList,
            cars: []
          };
        }
        else {
          const tripParticipants = deepCloneParticipants(trip);
          return {
            ...trip,
            participants: tripParticipants,
            cars: []
          };
        }
      });

      return {
        ...state,
        error: null,
        trips: updatedTrips,
      };
    }

    // const removeUserFromTripSync = (tripId, participantsList) => ({
    //   type: actionTypes.REMOVE_USER_FROM_TRIP_SYNC,
    //   payload: { tripId: tripId, participantsList: participantsList }
    // });
    case actionTypes.REMOVE_USER_FROM_TRIP_SYNC: {
      const updatedTrips = state.trips.map(trip => {
        if (trip.id === action.payload.tripId) {
          return {
            ...trip,
            participants: action.payload.participantsList,
            cars: []
          };
        }
        else {
          const tripParticipants = deepCloneParticipants(trip);
          return {
            ...trip,
            participants: tripParticipants,
            cars: []
          };
        }
      });

      return {
        ...state,
        error: null,
        trips: updatedTrips,
      };
    }



    // const storeUserSync = userData => ({ type: actionTypes.STORE_USER_SYNC, userData });
    case actionTypes.STORE_USER_SYNC: {
      if (!action.userData.user) return { ...initialState };

      const { email, name, picture } = action.userData.user;

      const updatedTrips = action.userData.trips.map(trip => {
        const tripParticipants = deepCloneParticipants(trip);
        const tripCars = deepCloneCars(trip);
        return {
          ...trip,
          participants: tripParticipants,
          cars: tripCars,
        };
      });

      return {
        ...state,
        error: null,
        isLoading: false,
        userid: action.userData.user.id,
        email,
        name,
        picture,
        trips: updatedTrips,
      };
    }


    // const updateTripCarsSync = (tripId, cars) => ({ type: actionTypes.UPDATE_TRIP_CARS_SYNC, payload: { tripId, cars } });
    case actionTypes.UPDATE_TRIP_CARS_SYNC: {

      const updatedTrips = state.trips.map(trip => {
        let tripCars;
        const tripParticipants = deepCloneParticipants(trip);
        if (trip.id === action.payload.tripId) {
          tripCars = action.payload.cars;
        }
        else {
          tripCars = deepCloneCars(trip);
        }
        return {
          ...trip,
          participants: tripParticipants,
          cars: tripCars,
        };
      });

      return {
        ...state,
        error: null,
        trips: updatedTrips,
      };
    }


    // const updateTripInfosSync = trip => ({ type: actionTypes.UPDATE_TRIP_INFO_SYNC, trip });
    case actionTypes.UPDATE_TRIP_INFO_SYNC: {

      const updatedTrips = state.trips.map(trip => {
        const tripParticipants = deepCloneParticipants(trip);
        const tripCars = deepCloneCars(trip);

        if (trip.id === action.trip.id) {
          return {
            ...trip,
            title: action.trip.title,
            description: action.trip.description,
            date: action.trip.date,
            participants: tripParticipants,
            cars: tripCars,
          };
        }
        else {
          return {
            ...trip,
            participants: tripParticipants,
            cars: tripCars,
          };
        }
      });

      return {
        ...state,
        error: null,
        trips: updatedTrips,
      };
    }


    // const updateUserSync = userData => ({ type: actionTypes.UPDATE_USER_SYNC, userData });
    case actionTypes.UPDATE_USER_SYNC: {

      const updatedTrips = state.trips.map(trip => {
        const tripParticipants = deepCloneParticipants(trip);
        const tripCars = deepCloneCars(trip);

        return {
          ...trip,
          participants: tripParticipants,
          cars: tripCars,
        };
      });

      return {
        ...state,
        error: null,
        name: action.userData.name,
        picture: action.userData.picture,
        trips: updatedTrips,
      };
    }

    default:
      return state;

  }
};

export default reducers;
