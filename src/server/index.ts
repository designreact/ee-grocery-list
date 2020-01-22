import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import cors from '@koa/cors';

import { app } from './app';

import { authMiddleware } from './middleware/auth';
import { clientMiddleware } from './middleware/client';
import { itemMiddlewareGet, itemMiddlewarePost } from './middleware/items';

const PORT = 1337;
const router = new Router();

router.get('/items', itemMiddlewareGet);
router.post('/items', itemMiddlewarePost);

app.use(clientMiddleware);
app.use(authMiddleware);
app.use(cors({
  origin: '*'
}));
app.use(bodyParser());
app.use(router.routes());

const server = app.listen(PORT, (): void => {
  console.log('started on', PORT);
});

export { app, server };