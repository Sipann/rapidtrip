//! createTripInDB
POST '/trip/:user_email'
// INPUT DATA
const mockInput = {
  "title": "Trip to Paris",
  "description": "Lets go to Paris to visit Virginie",
  "date": "581551200000",
  "destination": {
    "address": "Chez Virginie",
    "latitude": "41.388516",
    "longitude": "2.179014"
  },
  "picture": ""
}
// OUTPUT DATA
const mockOutput = {
  "ok": true,
  "body": {
    "id": 4,
    "title": "Trip to Paris",
    "description": "Lets go to Paris to visit Virginie",
    "date": "1988-06-05T22:00:00.000Z",
    "picture": "",
    "destination": {
      "id": 3,
      "address": "Chez Virginie",
      "latitude": 41.388516,
      "longitude": 2.179014
    },
    "participants": [
      {
        "id": "OnOb52EqwifDj5mr528HagLdvD13",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "picture": "",
        "departure_time": null,
        "is_admin": true,
        "departure_location_id": null,
        "car_id": null
      }
    ],
    "cars": []
  }
}

//! createUserInDB
POST '/user'
// INPUT DATA
const mockInput = {
  "id": "OnOb52EqwifDj5mr528HagLdvD13",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "picture": ""
}
// OUTPUT DATA
const mockOutput = {
  "ok": true,
  "body": {
    "user": {
      "id": "OnOb52EqwifDj5mr528HagLdvD13",
      "name": "Jane Doeee",
      "email": "jane@example.com",
      "picture": "new picture"
    },
    "trips": []
  }
}

//! deleteTripFromDB
DELETE '/trip/:trip_id'
// INPUT DATA
const mockInput = {} // BODY NOT REQUIRED
// OUTPUT DATA
const mockOutput = {
  "ok": true
}

//! deleteUserFromDB
DELETE '/user/:user_email'
// INPUT DATA
const mockInput = {} // BODY NOT REQUIRED
// OUTPUT DATA
const mockOutput = {
  "ok": true
}

//! removeUserFromTripInDB
DELETE '/trip/:trip_id/:user_email'
// INPUT DATA
const mockInput = {} // BODY NOT REQUIRED
// OUTPUT DATA
const mockOutput = { // UPDATED PARTICIPANTS LIST
  "ok": true,
  "body": [
    {
      "id": "BH9FpLeSGlOXXttPsqhz7mqosaq1",
      "name": "John Doe",
      "email": "john@example.com",
      "picture": "",
      "departure_time": null,
      "is_admin": false,
      "departure_location_id": null,
      "car_id": null
    }
  ]
}

//! fetchUserFromDB
GET '/user/:user_email'
// INPUT DATA
const mockInput = {} // BODY NOT REQUIRED
// OUTPUT DATA
const mockOutput = {
  "ok": true,
  "body": {
    "user": {
      "id": "OnOb52EqwifDj5mr528HagLdvD13",
      "name": "Jane Doeee",
      "email": "jane@example.com(opens in new tab)",
      "picture": "new picture"
    },
    "trips": [
      {
        "id": 2,
        "title": "Trip to Paris",
        "description": "Lets go to Paris to visit Virginie",
        "date": "1988-06-05T22:00:00.000Z",
        "picture": "",
        "destination": {
          "id": 3,
          "address": "Chez Virginie",
          "latitude": 41.388516,
          "longitude": 2.179014
        },
        "participants": [
          {
            "id": "OnOb52EqwifDj5mr528HagLdvD13",
            "name": "Jane Doeee",
            "email": "jane@example.com(opens in new tab)",
            "picture": "new picture",
            "departure_time": null,
            "is_admin": true,
            "departure_location_id": null,
            "car_id": null
          },
          {
            "id": "BH9FpLeSGlOXXttPsqhz7mqosaq1",
            "name": "John Doe",
            "email": "john@example.com(opens in new tab)",
            "picture": "",
            "departure_time": null,
            "is_admin": false,
            "departure_location_id": null,
            "car_id": null
          }
        ],
        "cars": []
      },
      {
        "id": 4,
        "title": "Trip to Milan",
        "description": "Lets go to Paris to visit Virginie",
        "date": "2020-06-05T22:00:00.000Z",
        "picture": "",
        "destination": {
          "id": 3,
          "address": "Duomo",
          "latitude": 41.388516,
          "longitude": 2.179014
        },
        "participants": [
          {
            "id": "OnOb52EqwifDj5mr528HagLdvD13",
            "name": "Jane Doe",
            "email": "jane@example.com",
            "picture": "",
            "departure_time": null,
            "is_admin": true,
            "departure_location_id": null,
            "car_id": null
          }
        ],
        "cars": []
      }
    ]
  }
}

//! updateUserInDB
PUT '/user/:user_email'
// INPUT DATA
const mockInput = { // can have any combination of those fields
  "id": "OnOb52EqwifDj5mr528HagLdvD13",
  "name": "Jane Doeee",
  "email": "janeeeeee@example.com",
  "picture": "new picture"
}
// OUTPUT DATA
const mockOutput = {
  "ok": true,
  "body": {
      "id": "OnOb52EqwifDj5mr528HagLdvD13",
      "name": "Jane Doeee",
      "email": "jane@example.com",
      "picture": "new picture"
  }
}

//! updateTripInfo
PUT '/trip/:trip_id/info'
// INPUT DATA
const mockInput = {
  "title": "Trip to Milan",
  "description": "Lets go to Paris to visit Virginie",
  "date": "581551200000",
  "destination": {
    "address": "Chez Virginie",
    "latitude": "41.388516",
    "longitude": "2.179014"
  },
  "picture": ""
}
// OUTPUT DATA
const mockOutput = {
  "ok": true,
  "body": {
      "id": 4,
      "title": "Trip to Milan",
      "description": "Lets go to Paris to visit Virginie",
      "date": "1988-06-05T22:00:00.000Z",
      "picture": "",
      "destination": {
          "id": 47,
          "address": "Duomo",
          "latitude": 41.388516,
          "longitude": 2.179014
      }
  }
}

//! updateTripCarAllocation
PUT '/trip/:trip_id/cars'
// INPUT DATA
const mockInput = {
  "cars": [
    {
      "driver_id": "john@example.com",
      "seats": 2,
      "passengers": [
        "jane@example.com",
        "jarvis@example.com",
        "john@example.com"
      ]
    }
  ]
}
// OUTPUT DATA
const mockOutput = {
  "ok": true,
  "body": [
    {
      "id": 45,
      "seats": 2,
      "trip_id": 26,
      "passengers": [
        {
          "departure_time": null,
          "is_admin": true,
          "is_driver": false,
          "trip_id": 26,
          "person_id": "jane@example.com",
          "departure_location_id": null,
          "car_id": 45
        },
        {
          "departure_time": null,
          "is_admin": false,
          "is_driver": false,
          "trip_id": 26,
          "person_id": "jarvis@example.com",
          "departure_location_id": null,
          "car_id": 45
        },
        {
          "departure_time": null,
          "is_admin": false,
          "is_driver": true,
          "trip_id": 26,
          "person_id": "john@example.com",
          "departure_location_id": null,
          "car_id": 45
        }
      ]
    }
  ]
}

//! includeUserInTrip
POST '/trip/:trip_id/:user_email'
// INPUT DATA
const mockInput = {} // BODY NOT REQUIRED
// OUTPUT DATA
const mockOutput = { // UPDATED PARTICIPANTS LIST
  "ok": true,
  "body": [
    {
      "id": "BH9FpLeSGlOXXttPsqhz7mqosaq1",
      "name": "John Doe",
      "email": "john@example.com",
      "picture": "",
      "departure_time": null,
      "is_admin": false,
      "departure_location_id": null,
      "car_id": null
    }
  ]
}

//! updateParticipantInfo
PUT '/trip/:trip_id/:user_email'
// INPUT DATA
const mockInput = {
  "departure_time": "581551200000",
  "departure_location": {
    "address": "My place",
    "latitude": "41.388516",
    "longitude": "2.179014"
  },
  "is_driver": true
}
// OUTPUT DATA
const mockOutput = {
  "ok": true,
  "body": {
      "departure_time": "1988-06-05T22:00:00.000Z",
      "is_admin": false,
      "is_driver": true,
      "trip_id": 26,
      "person_id": "john@example.com",
      "car_id": 45,
      "departure_location": {
          "id": 55,
          "address": "My place",
          "latitude": 41.388516,
          "longitude": 2.179014
      }
  }
}




//! ERROR MESSAGES
const mockError = {
  "ok": false,
  "error": "No user found with provided id"
};
