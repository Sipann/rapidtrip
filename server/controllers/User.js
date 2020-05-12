const db = require('../database');
const User = db.models.Person;
const Location = db.models.Location;
const Trip = db.models.Trip;

module.exports.getUser = async ctx => {
  // create response object
  let res = {};
  // store user_id passed as parameter
  const userId = ctx.params.user_id;

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
    
    // get all trips associated to the user (if any)
    const trips = await user.getTrips();
    if (trips.length > 0) {
      res.body.trips = trips.map(trip => trip.toJSON());
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
      where: { id: newUser.id },
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
  ctx.body = {};
};

module.exports.updateInfo = async ctx => {
  ctx.body = {};
};

module.exports.createTrip = async ctx => {
  // create response object
  let res = {};
  // store user_id passed as parameter
  const userId = ctx.params.user_id;
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
    await trip.setDestination(destinationInstance);
    // await user.setAdmin(trip, { transaction: t });

    // add trip to databse and get the Trip instance created
    const participant = await user.addTrip(trip, { through: { is_admin: true }, transaction: t });
    if (!participant) throw {
      status: 500,
      message: 'Not possible to create trip.'
    };

    // populate response object
    res.ok = true;
    res.body = trip;
    // set response status
    ctx.status = 200;

    // commit the transaction
    await t.commit();
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