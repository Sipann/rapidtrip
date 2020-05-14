import React, { useEffect, useRef } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import CarSvg from './CarSvg';
import { mockResult } from './mockResults';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import { useRoute } from '@react-navigation/native';

const Result = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { trip, currentUser } = route.params;
  const cars = trip.cars;

  const runAlgo = () => {
    const algoInput = trip.participants.map(p => ({
      departureLocation: {...p.departure_location},
      departureTimestamp: p.departure_time,
      is_driver: p.is_driver,
      is_admin: p.is_admin,
      email: p.email,
      seats: p.seats
    }));
    dispatch(actions.runAlgoAsync(algoInput, trip.id));
  };


  const currentUserCar =
    cars.length &&
    cars.find((car) =>
      car.passengers.some((p) => p.person_id === currentUser.email)
    );
  const driver = currentUserCar.passengers.find((p) => p.is_driver);
  // const userDepartureTime = driver.departure_time;
  // const driverDepartureLocation  = driver.departure_location;
  // const otherCars =
  //   cars.length &&
  //   cars.filter((car) =>
  //     car.passengers.every((p) => p.person_id !== currentUser.email)
  //   );
  const isCurrentUserDriver = driver.person_id === currentUser.email;
  const itemsRef = useRef([]);

  const algoHasRun = !!cars.length;
  const readyToRun = trip.participants.every(
    (p) => !!p.departure_time && !!p.departure_location_id
  );

  if (algoHasRun === false) {
    if (currentUser.is_admin) {
      //!THIS IS A GUESS AS TO THE SHAPE
      if (readyToRun) {
        return (
          <View>
            <Text style={styles.message}>Ready to determine!</Text>
            <TouchableOpacity>
              <Text onPress = {() => runAlgo()} style={styles.runbutton}>Who is Going Where?</Text>
            </TouchableOpacity>
          </View>
        );
      }
      return <Text style={styles.message}>Waiting for more answers</Text>;
    }
    return <Text style={styles.message}>Check back later!</Text>;
  }

  const hideCallout = (index) => {
    itemsRef.current[index].hideCallout();
  };

  const renderMarkers = () => {
    return (
      <View>
        {cars.map((car, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: car.passenger.find((p) => !!p.is_driver)
                  .departureLocation.lat,
                longitude: car.passenger.find((p) => !!p.is_driver)
                  .departureLocation.lng,
              }}
              pinColor={
                car.passenger.find((p) => !!p.is_driver).person_id ===
                driver.person_id
                  ? 'rgba(102, 204, 204, 1)'
                  : 'rgba(255, 0, 0, 0.4)'
              }
              ref={(el) => (itemsRef.current[index] = el)}
            >
              <Callout
                style={
                  car.passenger.find((p) => !!p.is_driver).person_id ===
                  driver.id
                    ? styles.currentUserCarCallout
                    : styles.otherCallout
                }
                onPress={() => hideCallout(index)}
              >
                <View>
                  <Text>
                    {car.passenger.find((p) => !!p.is_driver).person_id}{' '}
                    (driver)
                  </Text>
                  {car.passengers
                    .filter((p) => !p.is_driver)
                    .map((p) => {
                      return <Text key={p.id}>{p.person_id}</Text>;
                    })}
                </View>
              </Callout>
            </Marker>
          );
        })}
      </View>
    );
  };

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, cars.length);
  }, [mockResult]);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <View style={styles.imgCntr}>
          <CarSvg />
        </View>

        {driver && (
          <View style={styles.infos}>
            <Text style={styles.driverTitle}>
              Driver:
              {isCurrentUserDriver ? (
                <Text style={styles.driverName}>You</Text>
              ) : (
                <Text style={styles.driverName}>{driver.person_id}</Text>
              )}
            </Text>
            <Text style={styles.pickupTime}>
              {isCurrentUserDriver ? (
                <Text>
                  Be Ready to leave at: {driver.departureTime.slice(0, -5)}
                </Text>
              ) : (
                <Text>
                  Arrive at your driver by: {driver.departureTime.slice(0, -5)}
                </Text>
              )}
            </Text>
            <Text style={styles.pickupAddress}>
              {driver.departure_location.address}
            </Text>
          </View>
        )}

        <View style={styles.mapCntr}>
          {driver && (
            <MapView
              initialRegion={{
                latitude: driver.departure_location.lat,
                longitude: driver.departure_location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={styles.map}
            >
              {renderMarkers()}
            </MapView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const screenWidth = Dimensions.get('window').width;
const imgWidth = screenWidth * 0.5;

const styles = StyleSheet.create({
  actions: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentUserCarCallout: {
    backgroundColor: '#66cccc',
    width: 150,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutText: {
    textAlign: 'right',
  },
  driverName: {
    fontSize: 16,
  },
  driverTitle: {
    fontSize: 18,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imgCntr: {
    width: imgWidth,
    height: imgWidth,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  infos: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
  },
  map: {
    width: '90%',
    height: '90%',
  },
  mapCntr: {
    flex: 1,
    width: screenWidth,
    height: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherCallout: {
    backgroundColor: 'rgba(255, 0, 0, 0.4)',
    width: 150,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickupAddress: {
    fontSize: 16,
  },
  pickupTime: {
    fontSize: 16,
  },
  message: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: '50%',
  },
  runbutton: {
    fontSize: 20,
    margin: 40,
    textAlign: 'center',
    backgroundColor: 'blue',
    borderRadius: 20,
  },
});

export default Result;
