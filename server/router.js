//======= ROUTER CONFIG =======
const Router = require('koa-router');
const router = new Router();
const { exampleFunction } = require('./controllers/example');

//======== ROUTES =========
router.get('example-route', exampleFunction);

module.exports = router;