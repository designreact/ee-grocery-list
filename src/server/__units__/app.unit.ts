import Koa from 'koa';
import KoaRouter from 'koa-router';

import { app, router } from '../app';

test('The app should be an instance of Koa', () => {
  expect(app).toBeInstanceOf(Koa);
});

test('The router should be an instance of Router', () => {
  expect(router).toBeInstanceOf(KoaRouter);
});