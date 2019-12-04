import { authMiddleware } from '../auth';
import { createMockContext } from '@shopify/jest-koa-mocks';

jest.mock('uuidv4', () => ({
  uuid: () => 'mock-uuid',
}));

test('The auth middleware checks if the userId cookie exists', () => {
  const ctx = createMockContext();
  const nextSpy = jest.fn();
  authMiddleware(ctx, nextSpy);
  expect(ctx.cookies.get).toHaveBeenCalledWith('userId');
  expect(nextSpy).toHaveBeenCalled();
});

test('The auth middleware sets a cookie if one doesnt exist', () => {
  const ctx = createMockContext();
  const nextSpy = jest.fn();
  authMiddleware(ctx, nextSpy);
  expect(ctx.cookies.set).toHaveBeenCalledWith('userId', 'mock-uuid');
  expect(nextSpy).toHaveBeenCalled();
});

test('The auth middleware does not set a cookie if one doesnt exist', () => {
  const ctx = createMockContext();
  const nextSpy = jest.fn();
  ctx.cookies.get = () => 'cookie-value';
  authMiddleware(ctx, nextSpy);
  expect(ctx.cookies.set).not.toHaveBeenCalled();
  expect(nextSpy).toHaveBeenCalled();
});