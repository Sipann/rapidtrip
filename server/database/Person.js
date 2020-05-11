const Sequelize = require('sequelize');
const db = require('./db');

class Person extends Sequelize.Model {}

Person.init({
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
  underscored: true,
  timestamps: false
});

module.exports = Person;