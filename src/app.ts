import Koa from 'koa';
import koaBody from 'koa-body';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import logger from './middlewares/requestLogger.js';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';
import routes from './routes/index.js';

const app = new Koa();

app.use(errorHandler);
app.use(helmet());
app.use(cors());
app.use(logger);
app.use(koaBody({ json: true, multipart: true, urlencoded: true }));
app.use(routes.routes()).use(routes.allowedMethods());
app.use(notFound);

app.on('error', (err: unknown) => {
  console.error('App error', err);
});

export default app;
