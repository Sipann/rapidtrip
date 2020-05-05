//======= APP CONFIG ========
const Koa = require('koa');
const app = new Koa();
require('dotenv').config()
const router = require('./router');

const PORT = process.env.PORT;

// ======= LOGGER =======
app
  .use((ctx, next) => {
    const start = new Date;
    return next().then(() => {
      const ms = new Date - start;
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
  })
  .use(router.routes());

//========= APPLICATION LISTENER ========
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});