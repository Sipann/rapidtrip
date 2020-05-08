/*
INPUT: Input given from user form, or from remove priority if there was priority.
DETAILS: Takes the input and makes an object for each possible "connection" (Passenger to driver).
Creats an array (allList) with each possible connection then sorts them by ascending time(sortedList).
Goes though the list starting from the shortest and makes each connection if possible.
This function then calls reorganizeList and returns the resulting intial CarObj
OUTPUT: A carObj like seen as the final result with all of the smallest connections possible, also returns
the sorted list to be used later.
*/
function makeInitialCars (input) {
  let allList = [];
  Object.keys(input.passengers).map((passenger) => {
    Object.keys(input.passengers[passenger].drivers).map((driver) => {
      if (
        input.passengers[passenger].drivers[driver] +
          input.passengers[passenger].departureTime <
        input.drivers[driver].departureTime
      ) {
        let obj = {
          Driver: driver,
          Passenger: passenger,
          Time: input.passengers[passenger].drivers[driver],
        };
        allList.push(obj);
      }
    });
  });
  let sortedList = allList.sort((a, b) => {
    return a.Time - b.Time;
  });
  let carObj = reorganizeList(sortedList, input, []);
  return [carObj, sortedList];
}

/*
INPUT: The sortedList from makeinitalCars, input from the form and an empty array to store moved passengers
DETAILS: Attempts to create a carObj(like seen in the final result), if a car is missing it reorganizes to
prioritize that missing car and tries again. If the missing car is prioritized more than once there must be
an error with input (Impossible) [THIS IM HONESTLY NOT SURE ABOUT, PLEASE LET ME KNOW IF YOU CAN THINK OF A TIME
WHERE THIS DOESN'T WORK]
OUTPUT: A carObj like seen as the final result which will then be optimized or an error if carObj cannot be made
*/
function reorganizeList (sortedList, input, movedArray) {
  let carObject = {};
  let inACar = [];
  sortedList.map((option) => {
    if (!carObject[option.Driver]) {
      carObject[option.Driver] = {
        spots: input.drivers[option.Driver].spots,
        current: [],
      };
    }
    if (
      carObject[option.Driver].current.length <
        carObject[option.Driver].spots &&
      !inACar.includes(option.Passenger)
    ) {
      carObject[option.Driver].current.push({
        Passenger: option.Passenger,
        Time: option.Time,
      });
      inACar.push(option.Passenger);
    }
  });
  let missingCars = Object.keys(input.passengers).filter((passenger) => {
    return !inACar.includes(passenger);
  });
  if (movedArray.includes(missingCars[0]))
    throw Error('Something is wrong :( Cars do not work');
  if (missingCars.length > 0) {
    let movingIndex;
    for (let i = 0; i < sortedList.length; i++) {
      if (sortedList[i].Passenger === missingCars[0]) {
        movingIndex = i;
        break;
      }
    }
    if (movingIndex === undefined)
      throw Error(`${missingCars[0]} cannot make any cars in time!`);

    let movingvalue = sortedList[movingIndex];
    sortedList.splice(movingIndex, 1);
    sortedList.unshift(movingvalue);
    movedArray.push(missingCars[0]);
    return reorganizeList(sortedList, input, movedArray);
  } else {
    return carObject;
  }
}

export default makeInitialCars;