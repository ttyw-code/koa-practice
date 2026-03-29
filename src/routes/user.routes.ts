import Router from 'koa-router';
import * as userController from '../controllers/user.controller.js';

const router = new Router({ prefix: '/users' });

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);

export default router;
