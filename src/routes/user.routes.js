const Router = require('koa-router');
const userController = require('../controllers/user.controller');

const router = new Router({ prefix: '/users' });

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);

module.exports = router;
