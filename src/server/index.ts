import { app, router } from './app';
import { clientMiddleware } from './middleware/client';

app.use(router.routes());

router.get('/', clientMiddleware);

const server = app.listen(4000);

export { app, server };