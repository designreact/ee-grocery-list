import { app, router } from '../app';
import { clientMiddleware } from '../middleware/client';

jest.mock('../app');

beforeEach(() => {
  jest.isolateModules(() => {
    require('../index');
  });
});

test('The server should listen on port 4000', () => {
  expect(app.listen).toHaveBeenCalledWith(4000);
});

test('The server should add the router routes to the app', () => {
  expect(app.use).toHaveBeenCalledWith(router.routes());
});

test('The router should add the clientMiddleware', () => {
  expect(router.get).toHaveBeenCalledWith('/', clientMiddleware);
});
