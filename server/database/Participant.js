const Sequelize = require('sequelize');
const db = require('./db');

class Participant extends Sequelize.Model {}

Participant.init({
  departure_time: {
    type: Sequelize.DATE
  },
  is_admin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize: db,
  modelName: 'Participant',
  underscored: true,
  timestamps: false
});

module.exports = Participant;