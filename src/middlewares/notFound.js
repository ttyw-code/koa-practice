async function notFound(ctx) {
  ctx.status = 404;
  ctx.body = { code: 404, message: 'Not Found' };
}

module.exports = notFound;
