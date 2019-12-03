import Koa from 'koa';

export const clientMiddleware = (ctx: Koa.Context): void => {
  ctx.status = 200;
  ctx.body = 'Hello World!';
};
