const Router = require('koa-router');
const router = new Router();
const { User, Trip } = require('./controllers');

router.get('/user/:user_id', User.getUser);

router.post('/trip/:admin_id', Trip.createTrip);
router.post('/user', User.createUser);

router.delete('/trip/:trip_id', Trip.deleteTrip);
router.delete('/user/:user_id', User.removeUser);
router.delete('/trip/:trip_id/:user_id', Trip.removeUser);

router.put('/user/:user_id', User.updateInfo);
router.put('/trip/:trip_id', Trip.updateInfo);
router.put('/trip/:trip_id', Trip.updateCarAllocation);
router.put('/trip/:trip_id/:user_id', Trip.includeUser);

module.exports = router;