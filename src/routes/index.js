const Router = require('koa-router');
const userRoutes = require('./user.routes');

const router = new Router();
router.get('/', async (ctx) => {
  ctx.status = 200;
  ctx.body = { code: 200, message: 'Welcome to Credit Letter Comparison API' };
});

router.use(userRoutes.routes(), userRoutes.allowedMethods());

module.exports = router;
