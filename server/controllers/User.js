const db = require('../database');
const User = db.models.Person;
const Location = db.models.Location;
const Trip = db.models.Trip;
const Car = db.models.Car;
const { parseParticipants } = require('./utils');

module.exports.getUser = async ctx => {
  // create response object
  let res = {};
  // store user_email passed as parameter
  const userId = ctx.params.user_email;

  try {
    // get User instance associated to the provided id
    const user = await User.findByPk(userId);
    if (!user) throw {
      status: 404,
      message: 'No user found with provided id'
    };

    // populate response object
    res.ok = true;
    res.body = {};
    res.body.user = user.toJSON();
    res.body.trips = [];
    // set response status
    ctx.status = 200;
    
    // get all trips associated to the user (if any) and its participants
    const trips = await user.getTrips({
      include: [{
        model: User,
        as: 'participants',
        through: {attributes: [
          'departure_time',
          'is_admin',
          'departure_location_id',
          'car_id'
        ]}
      }]
    });

    // parse response object
    if (trips.length > 0) {
      res.body.trips = await trips.map(trip => {
        const formattedTrip = trip.toJSON();
        delete formattedTrip.Participant;
        formattedTrip.participants = parseParticipants(formattedTrip.participants);
        return formattedTrip;
      });
    }
  } catch (error) {
    // populate response object
    res.ok = false;
    res.error = error.message;
    // set response status
    ctx.status = error.status || 400;
  } finally {
    // send response
    ctx.body = res;
  }
};

module.exports.createUser = async ctx => {
  // create response object
  let res = {};
  // store user object passed in body
  const newUser = ctx.request.body;

  try {
    // add user to databse and get the User instance created
    // if id alreay exists in database, get the existing User instance
    const [user, created] = await User.findOrCreate({
      where: { email: newUser.email },
      defaults: newUser
    });
    if (!user) throw {
      status: 500,
      message: 'Not possible to create user'
    };

    // populate response object
    res.ok = true;
    res.body = {};
    res.body.user = user.toJSON();
    res.body.trips = [];
    // set response status
    if (created) ctx.status = 201;
    else ctx.status = 200;
    
    // TODO if user was not created, update its info
    // TODO check if user email is present in any trip and fetch info
  } catch (error) {
    // populate response object
    res.ok = false;
    res.error = error.message;
    // set response status
    ctx.status = error.status || 400;
  } finally {
    // send response
    ctx.body = res;
  }
};

module.exports.removeUser = async ctx => {
  // create response object
  let res = {};
  // store user_email passed as parameter
  const userId = ctx.params.user_email;

  try {
    // delete User instance associated to the provided id
    const number = await User.destroy({ where: { email: userId } });
    if (number <= 0) throw {
      status: 404,
      message: 'No user found with provided id'
    };

    // populate response object
    res.ok = true;
    // set response status
    ctx.status = 200;
  } catch (error) {
    // populate response object
    res.ok = false;
    res.error = error.message;
    // set response status
    ctx.status = error.status || 400;
  } finally {
    // send response
    ctx.body = res;
  }
};

module.exports.updateInfo = async ctx => {
  // create response object
  let res = {};
  // store user_email passed as parameter
  const userId = ctx.params.user_email;
  // store user object passed in body
  const userInfo = ctx.request.body;

  try {
    // get User instance associated to the provided id
    const oldUser = await User.findByPk(userId);
    if (!oldUser) throw {
      status: 404,
      message: 'No user found with provided id'
    };

    const user = await oldUser.update(userInfo, { fields: ['id', 'name', 'picture'] });

    // populate response object
    res.ok = true;
    res.body = user.toJSON();
    // set response status
    ctx.status = 200;
  } catch (error) {
    // populate response object
    res.ok = false;
    res.error = error.message;
    // set response status
    ctx.status = error.status || 400;
  } finally {
    // send response
    ctx.body = res;
  }
};

module.exports.createTrip = async ctx => {
  // create response object
  let res = {};
  // store user_email passed as parameter
  const userId = ctx.params.user_email;
  // store trip object passed in body
  const {
    title,
    description,
    date,
    destination,
    picture
  } = ctx.request.body;

  // start a transaction
  const t = await db.transaction();

  try {
    // get User instance associated to the provided id
    const user = await User.findByPk(userId);
    if (!user) throw {
      status: 404,
      message: 'No user found with provided id'
    };

    // create a new Location instance
    const destinationInstance = await Location.create(destination, { transaction: t });
    if (!destinationInstance) throw {
      status: 400,
      message: 'Not possible to create trip: invalid location'
    };

    // create a new Trip instance
    const trip = await Trip.create({
      title,
      description,
      date: (new Date(+date)).toISOString(),
      picture
    }, { transaction: t });
    if (!trip) throw {
      status: 400,
      message: 'Not possible to create trip: invalid fields'
    };
    await trip.setDestination(destinationInstance, { transaction: t });

    // add trip to databse and get the Trip instance created
    const participant = await user.addTrip(trip, { through: { is_admin: true }, transaction: t });
    if (!participant) throw {
      status: 500,
      message: 'Not possible to create trip.'
    };

    // commit the transaction
    await t.commit();
    
    // retrieve recently added trip with more information
    let newTrip = await Trip.findByPk(trip.get('id'),
      {include: [
        { model: Location, as: 'destination' },
        { model: User, as: 'participants' },
        { model: Car, as: 'cars' }
      ]}
    );
    newTrip = newTrip.toJSON();
    newTrip.participants = parseParticipants(newTrip.participants);
    delete newTrip.destination_id;

    // populate response object
    res.ok = true;
    res.body = newTrip;
    // set response status
    ctx.status = 200;
  } catch (error) {
    // populate response object
    res.ok = false;
    res.error = error.message;
    // set response status
    ctx.status = error.status || 400;
    // rollback the transaction
    await t.rollback();
  } finally {
    // send response
    ctx.body = res;
  }
};