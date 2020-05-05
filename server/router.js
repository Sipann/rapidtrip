const Router = require('koa-router');
const router = new Router();

// ========= ROUTES BELOW =========
router.get('/test', (ctx) => {
  ctx.body = 'Test Page';
});

module.exports = router;