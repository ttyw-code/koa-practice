const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const logger = require('./middlewares/requestLogger');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const routes = require('./routes');

const app = new Koa();

app.use(errorHandler);
app.use(helmet());
app.use(cors());
app.use(logger);
app.use(koaBody({ json: true, multipart: true, urlencoded: true }));
app.use(routes.routes()).use(routes.allowedMethods());
app.use(notFound);

app.on('error', (err) => {
  console.error('App error', err);
});

module.exports = app;
