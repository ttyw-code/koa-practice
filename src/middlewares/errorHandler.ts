import type { Context, Next } from 'koa';

interface HttpError extends Error {
  status?: number;
  expose?: boolean;
}

async function errorHandler(ctx: Context, next: Next): Promise<void> {
  try {
    await next();
  } catch (err) {
    const httpErr = err as HttpError;
    ctx.status = httpErr.status || 500;
    ctx.body = {
      code: ctx.status,
      message: httpErr.expose ? httpErr.message : 'Internal Server Error',
      error: httpErr.message,
    };
    ctx.app.emit('error', err, ctx);
  }
}

export default errorHandler;
