import Koa from 'koa';
import { uuid } from 'uuidv4';

export const authMiddleware = (ctx: Koa.Context): void => {
  const userIdCookie = ctx.cookies.get('userId');
  if (typeof userIdCookie === 'undefined') {
    ctx.cookies.set('userId', uuid());
  }
};