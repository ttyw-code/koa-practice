import type { Context } from 'koa';

async function notFound(ctx: Context): Promise<void> {
  ctx.status = 404;
  ctx.body = { code: 404, message: 'Not Found' };
}

export default notFound;
