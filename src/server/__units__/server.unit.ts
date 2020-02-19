import bodyParser from 'koa-bodyparser';
import KoaRouter from 'koa-router';
import cors from '@koa/cors';

import { authMiddleware } from '../middleware/auth';
import { clientMiddleware } from '../middleware/client';
import { itemMiddlewareGet, itemMiddlewarePost } from '../middleware/items';

// jest.enableAutomock();

jest.mock('koa-bodyparser');
jest.mock('koa-router');
jest.mock('@koa/cors');
jest.mock('../app');
jest.mock('../middleware/auth');
jest.mock('../middleware/client');
jest.mock('../middleware/items');


let server;
beforeEach(() => {
  jest.isolateModules(() => {
    server = require('../index');
  });
});

test('The server should listen on port 3000', () => {
  expect(server.app.listen).toHaveBeenCalledWith(1337, expect.any(Function));
});

test('The server should add the body parser middleware', () => {
  expect(server.app.use).toHaveBeenCalledWith(bodyParser());
});

test('The server should add the cors middleware', () => {
  expect(server.app.use).toHaveBeenCalledWith(
    cors({
      origin: '*'
    })
  );
});

test('The server should add the router routes to the app', () => {
  expect(server.app.use).toHaveBeenCalledWith(server.router.routes());
});


test('The router should be an instance of Router', () => {
  expect(server.router).toBeInstanceOf(KoaRouter);
});

test('The server should add the authMiddleware to the app', () => {
 expect(server.app.use).toHaveBeenCalledWith(authMiddleware);
});

test('The router should add the clientMiddleware', () => {
  expect(server.app.use).toHaveBeenCalledWith(clientMiddleware);
});

test('The router should add the itemsMiddleware get handler', () => {
  expect(server.router.get).toHaveBeenCalledWith('/items', itemMiddlewareGet);
});

test('The router should add the itemsMiddleware post handler', () => {
  expect(server.router.post).toHaveBeenCalledWith('/items', itemMiddlewarePost);
});
