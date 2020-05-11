import React, { useEffect, useState, useRef } from 'react';
import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

import { mockResult } from './mockResults';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Result = () => {
  //! currentUser id currently hardcoded
  const userId = 2;
  const [cars, setCars] = useState([]);
  const [currentCar, setCurrentCar] = useState({});
  const itemsRef = useRef([]);
  const [isDriver, setIsDriver] = useState(false);

  const algoHasRun = false; //! Here we need to actually check if the algo has run
  const adminId = 2;
  const readyToRun = true;

  if (algoHasRun === false) {
    if (adminId === userId) {
      //!THIS IS A GUESS AS TO TEH SHAPE
      if (readyToRun) {
        return (
          <View>
            <Text>Ready to run the Algorithm!</Text>
            <TouchableOpacity>
              <Text>RUN THE ALGORITHM</Text>
            </TouchableOpacity>
          </View>
        );
      }
      return (
        <Text>The Algorithm is not yet ready, Waiting for more answers</Text>
      );
    }
    return <Text>Algorithm has not been run. Check back later!</Text>;
  }

  const currentUserCar = (allCars) => {
    const currentCar = allCars.find((car) => {
      if (car.driver.id === userId) {
        setIsDriver(true);
        return car;
      }
      return car.passengers.find((passenger) => passenger.id === userId);
    });
    setCurrentCar(currentCar);
  };

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
                latitude: car.driver.departureLocation.lat,
                longitude: car.driver.departureLocation.lng,
              }}
              pinColor={
                car.driver.id === currentCar.driver.id
                  ? 'rgba(102, 204, 204, 1)'
                  : 'rgba(255, 0, 0, 0.4)'
              }
              ref={(el) => (itemsRef.current[index] = el)}
            >
              <Callout
                style={
                  car.driver.id === currentCar.driver.id
                    ? styles.currentCarCallout
                    : styles.otherCallout
                }
                onPress={() => hideCallout(index)}
              >
                <View>
                  <Text>{car.driver.name} (driver)</Text>
                  {car.passengers.map((p) => {
                    return <Text key={p.id}>{p.name}</Text>;
                  })}
                </View>
              </Callout>
            </Marker>
          );
        })}
      </View>
    );
  };

  const showDirections = () => {
    console.log('TODO, show directions');
  };

  useEffect(() => {
    setCars(mockResult);
    currentUserCar(mockResult);
    itemsRef.current = itemsRef.current.slice(0, mockResult.length);
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
          <Image
            source={require('../assets/cartoonCar.png')}
            style={styles.img}
          />
        </View>

        {currentCar.driver && (
          <View style={styles.infos}>
            <Text style={styles.driverTitle}>
              Driver:
              {isDriver ? (
                <Text style={styles.driverName}>You</Text>
              ) : (
                <Text style={styles.driverName}>{currentCar.driver.name}</Text>
              )}
            </Text>
            <Text style={styles.pickupTime}>
              {isDriver ? (
                <Text>
                  Be Ready to leave at:{' '}
                  {currentCar.driver.departureTime.slice(0, -5)}
                </Text>
              ) : (
                <Text>
                  Arrive at your driver by:{' '}
                  {currentCar.driver.departureTime.slice(0, -5)}
                </Text>
              )}
            </Text>
            <Text style={styles.pickupAddress}>
              Location: Place de L&apos;Etoile - Paris
            </Text>
          </View>
        )}

        <View style={styles.actions}>
          <Text>How do I get there?</Text>
          <Button onPress={showDirections} title="Navigate Me" />
        </View>

        <View style={styles.mapCntr}>
          {currentCar.driver && (
            <MapView
              initialRegion={{
                latitude: currentCar.driver.departureLocation.lat,
                longitude: currentCar.driver.departureLocation.lng,
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
  currentCarCallout: {
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
});

export default Result;
