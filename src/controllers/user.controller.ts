import type { Context } from 'koa';
import User from '../models/user.js';

export async function getAllUsers(ctx: Context): Promise<void> {
  const users = await User.find().lean();
  ctx.status = 200;
  ctx.body = { code: 200, message: 'Users fetched successfully', data: users };
}

export async function createUser(ctx: Context): Promise<void> {
  const body = (ctx.request.body as Record<string, unknown>) || {};
  const { name, age, email } = body;
  if (typeof name !== 'string' || !name.trim()) {
    ctx.throw(400, 'name must be a non-empty string');
  }
  if (typeof age !== 'number' || !Number.isFinite(age) || age <= 0) {
    ctx.throw(400, 'age must be a positive number');
  }
  if (typeof email !== 'string' || !email.includes('@')) {
    ctx.throw(400, 'email must be a valid email address');
  }

  const user = await User.create({
    name: (name as string).trim(),
    age: age as number,
    email: (email as string).toLowerCase().trim(),
  });
  ctx.status = 201;
  ctx.body = { code: 201, message: 'User created', data: user };
}

export async function getUserById(ctx: Context): Promise<void> {
  const { id } = ctx.params as { id: string };
  const user = await User.findById(id).lean();
  if (!user) {
    ctx.throw(404, 'User not found');
  }
  ctx.status = 200;
  ctx.body = { code: 200, message: 'User fetched', data: user };
}
