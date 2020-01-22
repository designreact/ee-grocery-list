import Koa from 'koa';
import fs from 'fs';
import path from 'path';
import Router from 'koa-router';

const indexPath = path.resolve(__dirname, '../../client/index.html');

const clientRouter = new Router();

clientRouter.get('/', (ctx: Koa.Context): void => {
  const html = fs.readFileSync(indexPath);
  ctx.status = 200;
  ctx.type = 'text/html';
  ctx.body = html;
});

clientRouter.get('*', (ctx: Koa.Context): void => {
  const filePath = path.resolve(__dirname, `../../client${ctx.request.path}`);
  const js = fs.readFileSync(filePath);
  
  switch(true){
    case ctx.request.path.includes('css'): 
      ctx.type = 'text/css';
    break;
    case ctx.request.path.includes('js'): 
      ctx.type = 'application/javascript';
    break;
    case ctx.request.path.includes('svg'): 
      ctx.type = 'image/svg+xml';
    break;
  }
  
  ctx.status = 200;
  ctx.body = js;
});

export const clientMiddleware = clientRouter.routes();