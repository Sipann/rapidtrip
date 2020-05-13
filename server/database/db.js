const Sequelize = require('sequelize');

const DB_DBNAME = process.env.DB_DBNAME || 'rapidtrip';
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const sequelize = new Sequelize(DB_DBNAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => {
    //eslint-disable-next-line no-console
    console.log('Connection to DB has been established successfully.');
  })
  .catch((err) => {
    //eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
