//TODO : change this
let formOutput = [
  {
    departureLocation: {
      lat: 41.388516,
      lng: 2.179014,
    },
    departureTimestamp: 1588932000000,
    isAdmin: true,
    isDriver: true,
    name: 'Brendan-MyPlace',
    seats: 2,
  },
  {
    departureLocation: {
      lat: 41.387012,
      lng: 2.170479,
    },
    departureTimestamp: 15889248000000,
    isAdmin: false,
    isDriver: false,
    name: 'Nicole-placaCAT',
    seats: 0,
  },
  {
    departureLocation: {
      lat: 41.394909,
      lng: 2.197982,
    },
    departureTimestamp: 15889392000000,
    isAdmin: false,
    isDriver: true,
    name: 'Virginie-Codeworks',
    seats: 3,
  },
  {
    departureLocation: {
      lat: 41.403107,
      lng: 2.173681,
    },
    departureTimestamp: 15889356000000,
    isAdmin: false,
    isDriver: false,
    name: 'Anthony-SegrataFamilia',
    seats: 0,
  },
  {
    departureLocation: {
      lat: 41.379794,
      lng: 2.124108,
    },
    departureTimestamp: 15889248000000,
    isAdmin: false,
    isDriver: false,
    name: 'Lello-CampNou',
    seats: 0,
  },
];


import {getCommuteTime} from '../services/GoogleAPI';

function formToAlgo() {
  let input = formOutput;
  let intoAlgo = {};
  let intoAlgoWithDrivers = addDriver(input, intoAlgo);
  let intoAlgoWithPassengers = addPassengers(input, intoAlgoWithDrivers);
  console.log(intoAlgoWithPassengers);
}

function addDriver(input, intoAlgo) {
  intoAlgo.drivers = {};
  input.map((tripMember) => {
    if (tripMember.isDriver) {
      intoAlgo.drivers[tripMember.name] = {
        spots: tripMember.seats,
        departureTime: tripMember.departureTimestamp / 1000,
      };
    }
  });
  return intoAlgo;
}

function addPassengers(input, intoAlgo) {
  intoAlgo.passengers = {};
  input.map((passenger) => {
    if (!passenger.isDriver) {
      intoAlgo.passengers[passenger.name] = {};
      intoAlgo.passengers[passenger.name].drivers = {};
      intoAlgo.passengers[passenger.name].departureTime = passenger.departureTimestamp;
      input.map((driver) => {
        if (driver.isDriver) {
          let passengerLocation = `${passenger.departureLocation.lat},${passenger.departureLocation.lng}|`;
          let driverLocation = `${driver.departureLocation.lat},${driver.departureLocation.lng}`;
          intoAlgo.passengers[passenger.name].drivers[driver.name] = getCommuteTime(passengerLocation, driverLocation);
        }
      });
    }
  });
  return intoAlgo;
}

export default formToAlgo;

//TODO: to this  Using the GOOGLE API
// {
//   drivers: {
//   X: {
//   spots: 2,
//   departureTime: 10,
//   },
//   Y: {
//   spots: 2,
//   departureTime: 10,
//   },
//   Z: {
//   spots: 2,
//   departureTime: 100,
//   },
//   },
//   passengers: {
//   A: {
//   drivers: {
//   X: 1,
//   Y: 100,
//   Z: 101,
//   },
//   departureTime: 0,
//   },
//   B: {
//   drivers: {
//   X: 10,
//   Y: 10,
//   Z: 10,
//   },
//   departureTime: 50,
//   },
//   C: {
//   drivers: {
//   X: 6,
//   Y: 100,
//   Z: 99,
//   },
//   departureTime: 0,
//   },
//   D: {
//   drivers: {
//   X: 4,
//   Y: 100,
//   Z: 5,
//   },
//   departureTime: 0,
//   },
//   E: {
//   drivers: {
//   X: 101,
//   Y: 5,
//   Z: 101,
//   },
//   departureTime: 0,
//   },
//   },
//   priority: {
//   F: {
//   driver: {
//   Y: 5,
//   },
//   departureTime: 0,
//   },
//   },
//   };
