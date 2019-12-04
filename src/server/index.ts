import bodyParser from 'koa-bodyparser';

import { app, router } from './app';

import { authMiddleware } from './middleware/auth';
import { clientMiddleware } from './middleware/client';
import { itemMiddlewareGet, itemMiddlewarePost } from './middleware/items';

router.get('/', clientMiddleware);
router.get('/items', itemMiddlewareGet);
router.post('/items', itemMiddlewarePost);

app.use(authMiddleware);
app.use(bodyParser());
app.use(router.routes());

const server = app.listen(4000);

export { app, server };