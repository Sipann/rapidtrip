const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./router');
 
const SERVER_PORT = process.env.SERVER_PORT || 3000;

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${SERVER_PORT} `); //eslint-disable-line no-console
});