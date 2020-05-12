const Sequelize = require('sequelize');
const db = require('./db');

class Location extends Sequelize.Model {}

Location.init({
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  latitude: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  longitude: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'Location',
  underscored: true,
  timestamps: false
});

module.exports = Location;