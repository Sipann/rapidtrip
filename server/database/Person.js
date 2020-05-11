const Sequelize = require('sequelize');
const db = require('./db');

class Person extends Sequelize.Model {}

module.exports = Person.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  picture: {
    type: Sequelize.STRING
  }
}, {
  sequelize: db,
  modelName: 'Person',
  underscored: true
});