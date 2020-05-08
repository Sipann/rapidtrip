export default function parseAlgoOutput (algoOutput, formOutput) {
  algoOutput = mockAlgoOutput;
  formOutput = mockFormOutput;
  // parses algo output
  const parsedOutput = Object.keys(algoOutput).map(key => ({
    driver: { name: key },
    passengers: algoOutput[key].current.map(({Passenger}) => (
      { name: Passenger }
    ))
  }));
  // parses form output to object with keys as names
  const parsedState = formOutput.reduce((acc, user) => (
    acc = {...acc, [user.name] : user}
  ), {});
  // get info from current trip participants state
  const result = parsedOutput.map(({driver, passengers}) => ({
    driver: {
      name: driver.name,
      departureTimeStamp: parsedState[driver.name].departureTimeStamp,
      departureLocation: parsedState[driver.name].departureLocation
    },
    passengers: passengers.map(pass => ({
      name: pass.name,
      departureTimeStamp: parsedState[pass.name].departureTimeStamp,
      departureLocation: parsedState[pass.name].departureLocation
    }))
  }));
  return result;
}

//TODO parse this
const mockAlgoOutput = {
  'Virginie': {
    spots: 2,
    current: [
      { Passenger: 'Nicole', Time: 1 },
      { Passenger: 'Anthony', Time: 6 },
    ],
  },
  'Brendan': {
    spots: 2,
    current: [
      { Passenger: 'Lello', Time: 10 },
      { Passenger: 'Andre', Time: 5 },
    ],
  }
};

const mockFormOutput = [
  {
    "departureTimestamp": 1588774296658,
    "departureLocation": {
      "lat": 37.4219693,
      "lng": -122.0840034,
    },
    "isAdmin": true,
    "isDriver": true,
    "name": "Virginie",
    "seats": 3,
  },
  {
    "departureLocation": {
      "lat": 37.4219693,
      "lng": -122.0840034,
    },
    "departureTimestamp": 1588861330923,
    "isAdmin": true,
    "isDriver": true,
    "name": "Brendan",
    "seats": 5,
  },
  {
    "departureLocation": {
      "lat": 40.656685,
      "lng": -4.6812086,
    },
    "departureTimeStamp": 1588774443514,
    "isAdmin": false,
    "isDriver": false,
    "name": "Anthony",
    "seats": 0,
  },
  {
    "departureLocation": {
      "lat": 40.656685,
      "lng": -4.6812086,
    },
    "departureTimeStamp": 1588774443514,
    "isAdmin": false,
    "isDriver": false,
    "name": "Lello",
    "seats": 0,
  },
  {
    "departureLocation": {
      "lat": 40.656685,
      "lng": -4.6812086,
    },
    "departureTimeStamp": 1588774443514,
    "isAdmin": false,
    "isDriver": false,
    "name": "Andre",
    "seats": 0,
  },
  {
    "departureLocation": {
      "lat": 40.656685,
      "lng": -4.6812086,
    },
    "departureTimeStamp": 1588774443514,
    "isAdmin": false,
    "isDriver": false,
    "name": "Nicole",
    "seats": 0,
  }
];

//TODO to this (getting some extra data and merging)
// const mockResult = [
//   {
//     driver: {
//       id: 1, name: 'Virginie',
//       departureDate: 1588774296658,
//       departureLocation: { lat: 41.401648, lng: -2.186230 },
//       departureTime: '16:30:00'
//     },
//     passengers: [
//       {
//         id: 2, name: 'Brendan',
//         departureLocation: { lat: 41.4019693, lng: -2.1860034 },
//         departureTime: '15:45:00'
//       },
//       {
//         id: 3, name: 'Anthony',
//         departureLocation: { lat: 41.4019695, lng: -2.1862589 },
//         departureTime: '16:15:00'
//       },
//       {
//         id: 4, name: 'Lello',
//         departureLocation: { lat: 41.4019542, lng: -2.1862875 },
//         departureTime: '16:05:00'
//       }
//     ]
//   },
//   {
//     driver: {
//       id: 5, name: 'John',
//       departureDate: 1588774443514,
//       departureLocation: { lat: 41.478622, lng: 2.085599 },
//       departureTime: '20:45:00'
//     },
//     passengers: [
//       {
//         id: 6, name: 'Jane',
//         departureLocation: { lat: 41.473568, lng: 2.081234 },
//         departureTime: '19:45:00'
//       },
//       {
//         id: 7, name: 'Jake',
//         departureLocation: { lat: 41.475789, lng: 2.085781 },
//         departureTime: '19:30:00'
//       }
//     ]
//   }
// ];