const Sequelize = require('sequelize');
const db = require('./db');

class Location extends Sequelize.Model {}

module.exports = Location.init({
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  coordinates: {
    type: Sequelize.GEOMETRY('POINT'),
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'Location',
  underscored: true
});