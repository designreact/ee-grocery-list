import Koa from "koa";
import { clientMiddleware } from '../client'

test('The client middleware to set the status and body as expected', () => {
  const ctx = {};
  clientMiddleware(ctx as Koa.Context);
  expect(ctx).toMatchSnapshot();
});