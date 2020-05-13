const db = require('./db');
const Person = require('./Person');
const Location = require('./Location');
const Car = require('./Car');
const Participant = require('./Participant');
const Trip = require('./Trip');

// Add columns to Trip table
//   destination_id: foreign key of Location table
// Enable accessors in Trip table
//   setDestination and getDestination
Trip.belongsTo(Location, { as: 'destination', foreignKey: 'destination_id' });
// Trip.hasOne(Location, { as: 'destination', foreignKey: 'trip_id' });

// Enable the accessors in Trip Table
//   setCars getCars addCar addCars
// Add column to Car table
//   trip_id: foreign key of Trip table
Trip.hasMany(Car, { as: 'cars', foreignKey: 'trip_id' });
// Enable accessors in Trip table
//   setTrip and getTrip
Car.belongsTo(Trip, { as: 'trip', foreignKey: 'trip_id' });

// Add columns to Participant table
//   trip_id: foreign key of Trip table
//   person_id columns: foreign key of Person table
// Enable accessors in Person table
//   setTrips getTrips addTrip addTrips
// Enable accessors in Trip table
//   setParticipants getParticipants addParticipant addParticipants
Trip.belongsToMany(Person, { through: Participant, foreignKey: 'trip_id', as: 'participants' });
Person.belongsToMany(Trip, { through: Participant, foreignKey: 'person_id', as: 'trips' });

// Add columns to Participant table
//   departure_location_id: foreign key of Location table
//   car_id: foreign key of Car table
// Enable accessors in Participant table
//   setDepartureLocation and getDepartureLocation
//   setCar and getCar
Participant.belongsTo(Location, { as: 'departureLocation', foreignKey: 'departure_location_id' });
Participant.belongsTo(Car, { as: 'car', foreignKey: 'car_id' });
// Enable the accessors in Car Table
//   setPassengers getPassengers addPassenger addPassengers
Car.hasMany(Participant, { as: 'passengers', foreignKey: 'car_id' });

db.sync({ alter: true });

module.exports = db;