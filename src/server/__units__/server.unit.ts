import bodyParser from 'koa-bodyparser';

import { app, router } from '../app';

import { authMiddleware } from '../middleware/auth';
import { clientMiddleware } from '../middleware/client';
import { itemMiddlewareGet, itemMiddlewarePost } from '../middleware/items';

jest.mock('../app');
jest.mock('koa-bodyparser');

beforeEach(() => {
  jest.isolateModules(() => {
    require('../index');
  });
});

test('The server should listen on port 4000', () => {
  expect(app.listen).toHaveBeenCalledWith(4000);
});

test('The server should add the body parser middleware', () => {
  expect(app.use).toHaveBeenCalledWith(bodyParser());
});

test('The server should add the router routes to the app', () => {
  expect(app.use).toHaveBeenCalledWith(router.routes());
});

test('The server should add the authMiddleware to the app', () => {
  expect(app.use).toHaveBeenCalledWith(authMiddleware);
});

test('The router should add the clientMiddleware', () => {
  expect(router.get).toHaveBeenCalledWith('/', clientMiddleware);
});

test('The router should add the itemsMiddleware get handler', () => {
  expect(router.get).toHaveBeenCalledWith('/items', itemMiddlewareGet);
});

test('The router should add the itemsMiddleware post handler', () => {
  expect(router.post).toHaveBeenCalledWith('/items', itemMiddlewarePost);
});
