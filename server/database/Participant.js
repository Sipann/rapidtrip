const Sequelize = require('sequelize');
const db = require('./db');

class Participant extends Sequelize.Model {}

module.exports = Participant.init({
  departure_time: {
    type: Sequelize.DATE
  },
}, {
  sequelize: db,
  modelName: 'Participant',
  underscored: true
});