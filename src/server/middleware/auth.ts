import Koa from 'koa';
import { uuid } from 'uuidv4';

export const authMiddleware = async (ctx: Koa.Context, next: Function): Promise<void> => {  
  const userIdCookie = ctx.cookies.get('userId');
  if (typeof userIdCookie === 'undefined') {
    ctx.cookies.set('userId', uuid());
  }
  await next();
};