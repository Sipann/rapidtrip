/*
INPUT: The carObj and sortedList created by makeInitialCars, and input given from user form, or from remove priority if there was priority.
DETAILS: This function make a list of the changes that *COULD* make the solution more optimized.
It iterates though connection and checks if any of the other passengers meets the following criteria:
  1. The connection is going to my driver
  2. They are closer to my driver than I am
  3. The passenger involved in the connection is not already connected to my driver (See doesCarContain function)
  4. The passengers can both connect to the others driver (See canPassengerConnect)
All connections that meet these criterion are added to the possibleChanges list.
OUTPUT: The findBestChange function is called and the resulting carObj is returned (here comes some recursion)
*/
function checkPossibleChanges (carObj, sortedList, input) {
  const possibleChanges = [];
  Object.keys(carObj).map((driver) => {
    Object.keys(carObj[driver].current).map((index) => {
      sortedList.map((cur) => {
        if (
          !(
            cur.Driver !== driver ||
            cur.Time >= carObj[driver].current[index].Time ||
            doesCarContain(driver, cur.Passenger, carObj) ||
            canPassengerConnect(
              carObj[driver].current[index].Passenger,
              cur.Passenger,
              sortedList,
              carObj
            )
          )
        ) {
          possibleChanges.push([carObj[driver].current[index], cur]);
        }
      });
    });
  });
  carObj = findBestChange(possibleChanges, carObj, input, sortedList);
  return carObj;
}

/*
INPUT: The potential new passenger, the old passenger, the sorted list and the current carObj
DETAILS: This function checks if the change that we are looking for is possible/ if the new passenger can
connect to the old passengers driver
OUTPUT: True if they can connect, False if not
*/
function canPassengerConnect (newPassenger, oldPassenger, sortedList, carObj) {
  let lookForDriver;
  Object.keys(carObj).map((driver) => {
    Object.values(carObj[driver].current).map((passenger) => {
      if (passenger.Passenger === oldPassenger) {
        lookForDriver = driver;
      }
    });
  });
  for (let i = 0; i < sortedList.length; i++) {
    if (
      sortedList[i].Driver === lookForDriver &&
      sortedList[i].passenger === newPassenger
    ) {
      return true;
    }
  }
  return false;
}

/*
INPUT: a driverId, a passengerId, and the currentCarObj
DETAILS: Checks if the passenger is currently connected to the driver
OUTPUT: Returns true or false (Couldn't get it working without the flag...)
*/
function doesCarContain (driverId, passengerId, carObj) {
  let flag = false;
  Object.keys(carObj[driverId].current).map((index) => {
    if (carObj[driverId].current[index].Passenger === passengerId) {
      flag = true;
    }
  });
  return flag;
}

/*
INPUT: Possible changes from checkPossibleChanges, carObj and sortedList from makeInitialCarObj,
input from user form(w or w/o priority removed).
DETAILS: Looks at every change (looking at new/old driver, passenger, distance etc...)
and gives the change a score using a LOG function (THIS IS SOMETHING WE CAN PLAY WITH TO FINE TUNE IT).
All value and information about the change are added to an array.
This array is passed to filterchanges which will determine if one of them is worth doing adn return a carObj
OUTPUT: This carObj given from filterchanges will be returned.
*/
function findBestChange (changes, carObj, input, sortedList) {
  let possibleChanges = [];
  changes.map((change) => {
    let driver1;
    const driver2 = change[1].Driver;
    const pass1Id = change[0].Passenger;
    const pass2Id = change[1].Passenger;
    let pass1NewDist;
    const pass2NewDist = change[1].Time;
    const pass1CurDist = change[0].Time;
    let pass2CurDist;
    Object.keys(carObj).map((driver) => {
      Object.keys(carObj[driver].current).map((index) => {
        if (carObj[driver].current[index].Passenger === pass2Id) {
          pass2CurDist = carObj[driver].current[index].Time;
          pass1NewDist = input.passengers[pass1Id].drivers[driver];
          driver1 = driver;
        }
      });
    });
    let pass1Value = 10 * log5(pass1CurDist / pass1NewDist);
    let pass2Value = 10 * log5(pass2CurDist / pass2NewDist);
    let totalValue = pass1Value + pass2Value;
    possibleChanges.push([
      totalValue,
      driver1,
      driver2,
      pass1Id,
      pass2Id,
      pass1NewDist,
      pass2NewDist,
    ]);
  });
  carObj = filterChanges(possibleChanges, carObj, sortedList, input);
  return carObj;
}

/*
INPUT: A number
OUTPUT: Return the log base 5 of that number (this is something to play around with)
*/
function log5 (val) {
  return Math.log(val) / Math.log(5);
}

/*
INPUT: Possible changes from filterBestChanges, carObj and sortedList from makeInitialCarObj,
input from user form(w or w/o priority removed).
DETAILS: Filters to remove any changes with a negative value then sorts to choose the best
positive value if one exists. Assuming one does... it calls performBestChange to make the
switch in the carObj, this information is then passed back to checkPossibleChanges to see if
there is another possible change to perform that would increase optimization. (recursion)
OUTPUT: If there are no changes worth making then we have hit optimization! return the carobj and be done.
*/
function filterChanges (possibleChanges, carObj, sortedList, input) {
  let filteredChanges = possibleChanges.filter((change) => {
    if (change[0] > 0) {
      return change;
    }
  });
  let finalChange;
  if (filteredChanges.length > 1) {
    let sortedChanges = filteredChanges.sort((a, b) => {
      return b[0] - a[0];
    });
    finalChange = sortedChanges[0];
  } else if (filteredChanges.length === 1) {
    finalChange = filteredChanges[0];
  } else {
    return carObj;
  }
  carObj = performBestChange(finalChange, carObj);
  checkPossibleChanges(carObj, sortedList, input);
  return carObj;
}

/*
INPUT: The change to make and the current carObj
DETAILS: Performs the change on the carObj
OUTPUT: return the new carObj
*/
function performBestChange (finalChange, carObj) {
  finalChange.shift();
  let [
    newDriver1,
    newDriver2,
    pass1,
    pass2,
    pass1Time,
    pass2Time,
  ] = finalChange;
  Object.keys(carObj).map((driver) => {
    Object.keys(carObj[driver].current).map((index) => {
      if (
        (driver === newDriver1 &&
          carObj[driver].current[index].Passenger === pass2) ||
        (driver === newDriver2 &&
          carObj[driver].current[index].Passenger === pass1)
      ) {
        carObj[driver].current[index] = null; //HAD TROUBLE USING SPLICE HERE SO DID THIS INSTEAD, WORKS BUT MAYBE FIX LATER
      }
    });
    carObj[driver].current = carObj[driver].current.filter((element) => {
      return element !== null;
    });
    if (driver === newDriver1) {
      carObj[driver].current.push({ Passenger: pass1[0], Time: pass1Time });
    } else if (driver === newDriver2) {
      carObj[driver].current.push({ Passenger: pass2[0], Time: pass2Time });
    }
  });
  return carObj;
}

export default checkPossibleChanges;