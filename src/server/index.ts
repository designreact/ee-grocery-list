import { app, router } from './app';

import { authMiddleware } from './middleware/auth';
import { clientMiddleware } from './middleware/client';

router.get('/', clientMiddleware);

app.use(router.routes());
app.use(authMiddleware);

const server = app.listen(4000);

export { app, server };