const Sequelize = require('sequelize');
const db = require('./db');

class Car extends Sequelize.Model {}

Car.init({
  seats: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'Car',
  underscored: true,
  timestamps: false
});

module.exports = Car;