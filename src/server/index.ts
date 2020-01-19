import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';

import { app } from './app';

import { authMiddleware } from './middleware/auth';
import { clientMiddleware } from './middleware/client';
import { itemMiddlewareGet, itemMiddlewarePost } from './middleware/items';

const router = new Router();
const PORT = 1337;

router.get('/items', itemMiddlewareGet);
router.post('/items', itemMiddlewarePost);

app.use(clientMiddleware);
app.use(authMiddleware);
app.use(bodyParser());
app.use(router.routes());

const server = app.listen(PORT, (): void => {
  console.log('started on', PORT);
});

export { app, server };