const User = require('../models/user');

async function getAllUsers(ctx) {
  const users = await User.find().lean();
  ctx.status = 200;
  ctx.body = { code: 200, message: 'Users fetched successfully', data: users };
}

async function createUser(ctx) {
  const { name, age, email } = ctx.request.body || {};
  if (!name || !age || !email) {
    ctx.throw(400, 'name, age and email are required');
  }

  const user = await User.create({ name, age, email });
  ctx.status = 201;
  ctx.body = { code: 201, message: 'User created', data: user };
}

async function getUserById(ctx) {
  const { id } = ctx.params;
  const user = await User.findById(id).lean();
  if (!user) {
    ctx.throw(404, 'User not found');
  }
  ctx.status = 200;
  ctx.body = { code: 200, message: 'User fetched', data: user };
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
};
