import Koa from 'koa';

import { app } from '../app';

test('The app should be an instance of Koa', () => {
  expect(app).toBeInstanceOf(Koa);
});