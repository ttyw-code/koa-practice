async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      code: ctx.status,
      message: err.expose ? err.message : 'Internal Server Error',
      error: err.message,
    };
    ctx.app.emit('error', err, ctx);
  }
}

module.exports = errorHandler;
