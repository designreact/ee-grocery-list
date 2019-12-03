import { authMiddleware } from '../auth';
import { createMockContext } from '@shopify/jest-koa-mocks';

jest.mock('uuidv4', () => ({
  uuid: () => 'mock-uuid',
}));

test('The auth middleware checks if the userId cookie exists', () => {
  const ctx = createMockContext();
  authMiddleware(ctx);
  expect(ctx.cookies.get).toHaveBeenCalledWith('userId');
});

test('The auth middleware sets a cookie if one doesnt exist', () => {
  const ctx = createMockContext();
  authMiddleware(ctx);
  expect(ctx.cookies.set).toHaveBeenCalledWith('userId', 'mock-uuid');
});

test('The auth middleware does not set a cookie if one doesnt exist', () => {
  const ctx = createMockContext();
  ctx.cookies.get = () => 'cookie-value';
  authMiddleware(ctx);
  expect(ctx.cookies.set).not.toHaveBeenCalled();
});