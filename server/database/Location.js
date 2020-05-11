const Sequelize = require('sequelize');
const db = require('./db');

class Location extends Sequelize.Model {}

Location.init({
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  latitude: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  longitude: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'Location',
  underscored: true,
  timestamps: false
});

module.exports = Location;