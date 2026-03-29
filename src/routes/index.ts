import Router from 'koa-router';
import type { Context } from 'koa';
import userRoutes from './user.routes.js';

const router = new Router();

router.get('/', async (ctx: Context) => {
  ctx.status = 200;
  ctx.body = { code: 200, message: 'Welcome to Credit Letter Comparison API' };
});

router.use(userRoutes.routes(), userRoutes.allowedMethods());

export default router;
