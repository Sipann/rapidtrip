const db = require('../database');
const User = db.models.Person;

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
      res.body.trips = trips.toJSON();
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
  ctx.body = {};
};

module.exports.removeUser = async ctx => {
  ctx.body = {};
};

module.exports.updateInfo = async ctx => {
  ctx.body = {};
};