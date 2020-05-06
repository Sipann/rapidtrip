/*
X-Z are the driver userIds
A-G are the passenger userIds
EXAMPLE OBJECT FOR INPUT
const inputObj = {
  drivers: {
    X: {
      spots: 2,
      departureTime: 10,
    },
    Y: {
      spots: 2,
      departureTime: 10,
    },
    Z: {
      spots: 2,
      departureTime: 100,
    },
  },
  passengers: {
    A: {
      drivers: {
        X: 1,
        Y: 100,
        Z: 101,
      },
      departureTime: 0,
    },
    B: {
      drivers: {
        X: 10,
        Y: 10,
        Z: 10,
      },
      departureTime: 50,
    },
    C: {
      drivers: {
        X: 6,
        Y: 100,
        Z: 99,
      },
      departureTime: 0,
    },
    D: {
      drivers: {
        X: 4,
        Y: 100,
        Z: 5,
      },
      departureTime: 0,
    },
    E: {
      drivers: {
        X: 101,
        Y: 5,
        Z: 101,
      },
      departureTime: 0,
    },
  },
  priority: {
    F: {
      driver: {
        Y: 5,
      },
      departureTime: 0,
    },
  },
};
/*
The alogithm works by running the functions below with an input similar to the object
above.
The example shows the decsions to switch C&D after the origial car has their positions
not optimized. It shows F being given priprity on car Y and also prioritizes B as he has a later
departure time and thus can only make the car with the later departure time (Z).
It returns an optimized carObject that looks like this...

{
  X: {
    spots: 2,
    current: [
      { Passenger: 'A', Time: 1 },
      { Passenger: 'C', Time: 6 },
    ],
  },
  Z: {
    spots: 2,
    current: [
      { Passenger: 'B', Time: 10 },
      { Passenger: 'D', Time: 5 },
    ],
  },
  Y: {
    spots: 2,
    current: [
      { Passenger: 'E', Time: 5 },
      { Passenger: 'F', Time: 5 },
    ],
  },
};
*/

import makeInitialCars from './MakeInitialCars';
import checkPossibleChanges from './CheckPossibleChanges';

function Algorithm (input) {
  if (Object.keys(input.priority).length > 0) {
    input = removePriority(input);
  }
  impossibleCheck(input);
  let [carObj, sortedList] = makeInitialCars(input);
  let finalCarObj = checkPossibleChanges(carObj, sortedList, input);
  finalCarObj = addPriority(finalCarObj, input);
  return finalCarObj;
}

/*
INPUT: Input given from the form inputs in the style of the example above.
DETAILS: It then changes the spots for each driver by the amount of Prioity passengers they
have, It also checks to make sure that the amount of priority passengers can fit
in the car. The whole algoritm runs with this value and the priority passengers are added
to their cars at the end.
OUTPUT: Returns the same input object with altered spots values for drivers with priority passengers.
It may also return an error if too many priority passengers for a car.
*/
function removePriority (input) {
  let newInput = input;
  Object.keys(newInput.priority).map((passenger) => {
    let priDriver = Object.keys(newInput.priority[passenger].driver)[0];
    newInput.drivers[priDriver].spots--;
    if (newInput.drivers[priDriver].spots < 0) {
      throw Error('Not enough room to deal with Priorities');
    }
    if (
      newInput.drivers[priDriver].departureTime <
      Object.values(newInput.priority[passenger].driver)[0] +
        newInput.priority[passenger].departureTime
    ) {
      throw Error(`Priority passenger ${passenger} cannot make their departure time.`);
    }
  });
  return newInput;
}
/*
  INPUT: Input given from user form, or from remove priority if there was priority.
  DETAILS: Counts the amount of spots avalible for passengers, then counts the passengers.
  OUTPUT: Returns an error if there are more passengers than spots, else returns nothing.
  */
function impossibleCheck (input) {
  let numOfSpots = 0;
  let passengerNum = Object.keys(input.passengers).length;
  Object.keys(input.drivers).map((key) => {
    numOfSpots = numOfSpots + input.drivers[key].spots;
  });
  if (passengerNum > numOfSpots) {
    throw Error('Not enough spots for everybody');
  }
}


/*
INPUT: The final carObj returned from the algorithm, and the input from user form(w or w/o priority removed).
DETAILS: If there are priority passengers then will then be added to their cars on the final carObj
OUTPUT: Returns the FINAL carObj (Algorithm DONE!)...for...now....
*/
function addPriority (finalCarObj, input) {
  Object.keys(input.priority).map((passenger) => {
    let priDriver = Object.keys(input.priority[passenger].driver)[0];
    input.drivers[priDriver].spots++;
    finalCarObj[priDriver].spots++;
    finalCarObj[priDriver].current.push({
      Passenger: passenger,
      Time: Object.values(input.priority[passenger])[0],
    });
  });
  return finalCarObj;
}
export default Algorithm;
