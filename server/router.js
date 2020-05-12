const Router = require('koa-router');
const router = new Router();
const { User, Trip } = require('./controllers');

router.get('/user/:user_email', User.getUser);

router.post('/trip/:user_email', User.createTrip);
router.post('/user', User.createUser);

router.delete('/trip/:trip_id', Trip.deleteTrip);
router.delete('/user/:user_email', User.removeUser);
router.delete('/trip/:trip_id/:user_email', Trip.removeUser);

router.put('/user/:user_email', User.updateInfo);
router.put('/trip/:trip_id', Trip.updateInfo);
router.put('/trip/:trip_id', Trip.updateCarAllocation);
router.put('/trip/:trip_id/:user_email', Trip.includeUser);

module.exports = router;