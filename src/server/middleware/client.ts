import Koa from 'koa';
import fs from 'fs';
import path from 'path';
import Router from 'koa-router';

const indexPath = path.resolve(__dirname, '../../client/index.html');
const jsPath = path.resolve(__dirname, '../../client/main.js');

const clientRouter = new Router();

clientRouter.get('/', (ctx: Koa.Context): void => {
  const html = fs.readFileSync(indexPath);
  ctx.status = 200;
  ctx.type = 'text/html';
  ctx.body = html;
});

clientRouter.get('/main.js', (ctx: Koa.Context): void => {
  const js = fs.readFileSync(jsPath);
  ctx.status = 200;
  ctx.type = 'application/javascript';
  ctx.body = js;
});

export const clientMiddleware = clientRouter.routes();