import * as actionTypes from '../actions/actionTypes';

const initialState = {
  // user specific
  userid: '',
  email: '',
  name: '',
  picture: '',
  trips: [],

  // app specific
  error: '',
  isLoading: true,
};


const reducers = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.APP_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case actionTypes.AUTHENTICATE_FAIL: {
      return {
        ...state,
        error: action.message,
      };
    }

    case actionTypes.CREATE_TRIP_FAIL: {
      return {
        ...state,
        error: action.message,
      };
    }

    case actionTypes.CREATE_TRIP_SYNC: {
      return {
        ...state,
        error: null,
        trips: [
          ...state.trips,
          { ...tripCreated }
        ],
      };
    }

    case actionTypes.CREATE_USER_FAIL: {
      return {
        ...state,
        error: action.message,
      };
    }

    case actionTypes.DELETE_TRIP_FAIL: {
      return {
        ...state,
        error: action.message,
      };
    }

    case actionTypes.DELETE_TRIP_SYNC: {
      return {
        ...state,
        error: null,
        trips: state.trips.filter(trip => trip.tripId !== action.tripId),
      };
    }

    case actionTypes.DELETE_USER_FAIL: {
      return {
        ...state,
        error: action.message,
      };
    }

    case actionTypes.REMOVE_USER_FROM_TRIP_FAIL: {
      return {
        ...state,
        error: action.message,
      };
    }

    //! TO BE CHECKED
    case actionTypes.REMOVE_USER_FROM_TRIP_SYNC: {
      return {
        ...state,
        error: null,
      };
    }

    case actionTypes.STORE_USER_FAIL: {
      return {
        ...state,
        error: action.message,
        isLoading: false,
      };
    }

    //! TO BE CHECKED
    case actionTypes.STORE_USER_SYNC: {
      console.log('[reducers] with payload', action.user);   // eslint-disable-line no-console
      return {
        ...state,
        error: null,
        isLoading: false,
        userid: action.user.userid,
      };
      // email: action.user.email,
      //   name: action.user.name,
      //     picture: action.user.picture,
      //       trips: [...action.user.trips],
    }

    case actionTypes.UPDATE_TRIP_FAIL: {
      return {
        ...state,
        error: action.message,
      };
    }

    //! TO BE CHECKED
    case actionTypes.UPDATE_TRIP_SYNC: {
      return {
        ...state,
        error: null,
        isLoading: false,

      };
    }

    case actionTypes.UPDATE_USER_FAIL: {
      return {
        ...state,
        error: action.message,
      };
    }

    //! TO BE CHECKED
    case actionTypes.UPDATE_USER_SYNC: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return state;

  }
};

export default reducers;
