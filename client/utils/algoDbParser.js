// const mockinput = {
//   Virginie: {
//     spots: 2,
//     current: [
//       { Passenger: 'Nicole', Time: 1 },
//       { Passenger: 'Anthony', Time: 6 },
//     ],
//   },
//   Brendan: {
//     spots: 2,
//     current: [
//       { Passenger: 'Lello', Time: 10 },
//       { Passenger: 'Andre', Time: 5 },
//     ],
//   },
// };

export default function AlgoToDbParser (input) {
  let carArr = [];
  for (let driver of Object.keys(input)) {
    let carObj = {};
    carObj['driver_id'] = driver;
    carObj['seats'] = input[driver].spots;
    carObj['passengers'] = input[driver].current.map((p) => p.Passenger);
    carObj['passengers'].push(driver);
    carArr.push(carObj);
  }
  return carArr;
}

//   "cars": [
//     {
//       "driver_id": "john@example.com",
//       "seats": 2,
//       "passengers": [
//         "jane@example.com",
//         "jarvis@example.com",
//         "john@example.com"
//       ]
//     }
//   ]
// }
