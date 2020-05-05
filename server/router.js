const Router = require('koa-router');
const router = new Router();

const { exampleFunction } = require('./controllers/example')

// ========= ROUTES BELOW =========
router.get('/router-example', exampleFunction);

module.exports = router;