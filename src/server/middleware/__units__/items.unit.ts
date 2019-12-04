// import { createMockContext } from '@shopify/jest-koa-mocks';
import { itemMiddlewareGet, itemMiddlewarePost } from '../items';
import {
  addItems,
  getItems,
  updateItems,
  deleteItems
} from '../../utils/__mocks__/database.mock';

jest.mock('../../utils/__mocks__/database.mock');

const mockUserId = '01234456789';
const mockItems = ['mock-item-0', 'mock-item-1'];
const mockResponseItems = ['mock-response-item-2', 'mock-response-item-3'];

// TODO: switch to using createMockContext from @shopify/jest-koa-mocks
function createMockContext(params: any = {}): any {
  return {
    cookies: {
      get() {
        return mockUserId;
      }
    },
    ...params
  };
}

describe('itemMiddlewareGet', () => {
  test('expect the itemsMiddleware to return no items for a user with no cookie', async () => {
    const ctx = { cookies: { get(){} }, body: {} };
    await itemMiddlewareGet(ctx);
    expect(ctx.body).toStrictEqual({
      status: 'ok',
      items: []
    });
  });

  test('expect the itemsMiddleware to return the items for a user with a cookie', async () => {
    getItems.mockResolvedValueOnce(mockResponseItems);
    const ctx = createMockContext();
    await itemMiddlewareGet(ctx);
    expect(ctx.body).toStrictEqual({
      status: 'ok',
      items: mockResponseItems
    });
  });
});

describe('itemMiddlewarePost', () => {
  test('expect the itemsMiddleware to add and return items for a user', async () => {
    addItems.mockResolvedValue(mockResponseItems);
    const ctx = createMockContext({
      request: { 
        body: {
          action: 'add',
          items: mockItems
        } 
      }
    });
    
    await itemMiddlewarePost(ctx);
    expect(addItems).toHaveBeenCalledWith(mockUserId, mockItems);
    expect(ctx.body).toStrictEqual({
      status: 'ok',
      items: mockResponseItems
    });
  });

  test('expect the itemsMiddleware to delete and return the remaining items for a user', async () => {
    deleteItems.mockResolvedValue(mockResponseItems);
    const ctx = createMockContext({
      request: { 
        body: {
          action: 'delete',
          items: mockItems
        } 
      }
    });
    await itemMiddlewarePost(ctx);
    expect(deleteItems).toHaveBeenCalledWith(mockUserId, mockItems);
    expect(ctx.body).toStrictEqual({
      status: 'ok',
      items: mockResponseItems
    });
  });

  test('expect the itemsMiddleware to update and return the updated items for a user', async () => {
    updateItems.mockResolvedValue(mockResponseItems);
    const ctx = createMockContext({
      request: { 
        body: {
          action: 'update',
          items: mockItems
        } 
      }
    });
    await itemMiddlewarePost(ctx);
    expect(updateItems).toHaveBeenCalledWith(mockUserId, mockItems);
    expect(ctx.body).toStrictEqual({
      status: 'ok',
      items: mockResponseItems
    });
  });

  test('expect the itemsMiddleware to return an empty array when no action is sent', async () => {
    updateItems.mockResolvedValue(mockResponseItems);
    const ctx = createMockContext({
      request: {
        body: {
          items: mockItems
        }
      }
    });
    await itemMiddlewarePost(ctx);
    expect(ctx.body).toStrictEqual({
      status: 'ok',
      items: []
    });
  });

  test('expect the itemsMiddleware to return an empty array when no userId is in cookies', async () => {
    updateItems.mockResolvedValue(mockResponseItems);
    const ctx = { cookies: { get() {} }, request: { body: {} } };
    await itemMiddlewarePost(ctx);
    expect(ctx.body).toStrictEqual({
      status: 'ok',
      items: []
    });
  });
});
