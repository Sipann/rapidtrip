//===== SERVER CONFIG =====
const Koa = require('koa');
const app = new Koa();
const router = require('./router');
require('dotenv').config()

const PORT = process.env.PORT;

app

//======== LOGGER =========
  .use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  })
  .use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  })

//======== ROUTES =========
  .use(router.routes());

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});