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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';
import { useRoute } from '@react-navigation/native';
import Colors from '../constants/colors';
const moment = require('moment');

const Result = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { trip, currentUser } = route.params;
  let cars = useSelector(state => state.trips.find(t => t.id === trip.id).cars);
  const participants = useSelector(state => state.trips.find(t => t.id === trip.id).participants);

  const runAlgo = () => {
    const algoInput = trip.participants.map(p => ({
      departureLocation: {
        lat: p.departure_location.latitude,
        lng: p.departure_location.longitude
      },
      departureTimestamp: (new Date(p.departure_time)).getTime(),
      isDriver: p.is_driver,
      isAdmin: p.is_admin,
      name: p.email,
      seats: p.seats
    }));    
    dispatch(actions.runAlgoAsync(algoInput, trip.id));
  };

  cars = cars.map(car => {
    const email = car.passengers.find((p) => p.is_driver).person_id;
    const { address, latitude, longitude } = participants.find(p => p.email === email).departure_location;
    const departureTime = participants.find(p => p.email === email).departure_time;
    return {...car, departureLocation: { address, latitude, longitude }, departureTime, driverId: email};
  });
  const currentUserCar =
    cars &&
    cars.length &&
    cars.find((car) =>
      car.passengers.some((p) => p.person_id === currentUser.email)
    );
  const driver = cars.length && currentUserCar.passengers.find((p) => p.is_driver);
  const isCurrentUserDriver = cars.length && driver.person_id === currentUser.email;
  const itemsRef = useRef([]);

  const algoHasRun = !!cars.length;
  const readyToRun = trip.participants.every(
    (p) => !!p.departure_time && !!p.departure_location
  );

  if (algoHasRun === false) {
    if (currentUser.is_admin) {
      if (readyToRun) {
        return (
          <View>
            <Text style={styles.message}>Ready to determine!</Text>
            {/* <TouchableOpacity>
              <Text onPress = {() => runAlgo()} style={styles.runbutton}>Who is Going Where?</Text>
            </TouchableOpacity> */}
            
            <TouchableOpacity onPress = {() => runAlgo()} style={styles.create}>
              <Text style={styles.createText}>Who is Going Where?</Text>
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
                latitude: car.departureLocation.latitude,
                longitude: car.departureLocation.longitude,
              }}
              pinColor={
                car.passengers.find((p) => !!p.is_driver).person_id ===
                driver.person_id
                  ? 'rgba(102, 204, 204, 1)'
                  : 'rgba(255, 0, 0, 0.4)'
              }
              ref={(el) => (itemsRef.current[index] = el)}
            >
              <Callout
                style={
                  car.driverId === driver.person_id
                    ? styles.currentUserCarCallout
                    : styles.otherCallout
                }
                onPress={() => hideCallout(index)}
              >
                <View>
                  <Text>
                    {car.driverId}{' '}
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
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        {/* <View style={styles.imgCntr}>
          <CarSvg />
        </View> */}

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
                  Be Ready to leave at: {moment(currentUserCar.departureTime).format('HH:mm')}
                </Text>
              ) : (
                <Text>
                  Arrive at your driver by: {moment(currentUserCar.departureTime).format('HH:mm')}
                </Text>
              )}
            </Text>
            <Text style={styles.pickupAddress}>
              {currentUserCar.departureLocation.address}
            </Text>
          </View>
        )}

        <View style={styles.mapCntr}>
          {driver && (
            <MapView
              initialRegion={{
                latitude: currentUserCar.departureLocation.latitude,
                longitude: currentUserCar.departureLocation.longitude,
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
  create: {
    textAlign: 'center',
    fontSize: 18,
    width: '90%',
    height: 50,
    alignSelf: 'center',
    marginTop: 15,
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  createText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
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
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
});

export default Result;
