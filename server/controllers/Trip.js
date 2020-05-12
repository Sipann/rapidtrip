const db = require('../database');
const Trip = db.models.Trip;
const User = db.models.Person;

module.exports.createTrip = async ctx => {
  ctx.body = {};
};

module.exports.deleteTrip = async ctx => {
  ctx.body = {};
};

module.exports.removeUser = async ctx => {
  ctx.body = {};
};

module.exports.includeUser = async ctx => {
  // create response object
  let res = {};
  // store trip_id passed as parameter
  const tripId = ctx.params.trip_id;
  // store user_id passed as parameter
  const userId = ctx.params.user_id;  

  try {
    // get Trip instance associated to the provided id
    const trip = await Trip.findByPk(tripId);
    if (!trip) throw {
      status: 404,
      message: 'No trip found with provided id'
    };

    // get User instance associated to the provided id
    const user = await User.findByPk(userId);
    if (!user) throw {
      status: 404,
      message: 'No user found with provided id'
    };

    // add user to trip as a participant
    await trip.addParticipant(user);
    
    // retrieve updated list of participants for response
    const participants = await trip.getParticipants();
    if (participants.length < 0) throw {
      status: 500,
      message: 'Not possible to retrieve participants list'
    };

    // populate response object
    res.ok = true;
    res.body = participants.map(participant => participant.toJSON());
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
  ctx.body = {};
};

module.exports.updateCarAllocation = async ctx => {
  ctx.body = {};
};