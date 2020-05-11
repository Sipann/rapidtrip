const Sequelize = require('sequelize');
const db = require('./db');

class Car extends Sequelize.Model {}

module.exports = Car.init({
  seats: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'Car',
  underscored: true
});