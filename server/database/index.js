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
Trip.hasOne(Location, { as: 'destination', foreignKey: 'trip_id' });

// Enable the accessors in Trip Table
//   setCar and getCar
// Add column to Car table
//   trip_id: foreign key of Trip table
Trip.hasMany(Car, { as: 'car', foreignKey: 'trip_id' });

// Add column to Car table
//   driver_id: foreign key of Participant table
Participant.hasOne(Car, { as: 'driver', foreignKey: 'driver_id', constraints: false });

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
Location.hasOne(Participant, { as: 'departureLocation', foreignKey: 'departure_location_id' });
Car.hasOne(Participant, { as: 'car', foreignKey: 'car_id' });

db.sync({ alter: true });

module.exports = db;