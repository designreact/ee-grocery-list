// import { createMockContext } from '@shopify/jest-koa-mocks';
import { itemMiddlewareGet, itemMiddlewarePost } from '../items';
import {
  addItem,
  getItems,
  updateItem,
  deleteItem
} from '../../utils/database';

jest.mock('../../utils/database');

const mockUserId = '01234456789';
const mockItems = [
  { id: 'id-01234', text: 'mock-item-0', checked: false }, 
  { id: 'id-56789', text: 'mock-item-1', checked: false },
];
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
    addItem.mockResolvedValue(mockResponseItems);
    const ctx = createMockContext({
      request: { 
        body: {
          action: 'add',
          item: mockItems[0]
        } 
      }
    });
    
    await itemMiddlewarePost(ctx);
    expect(addItem).toHaveBeenCalledWith(mockUserId, mockItems[0].text);
    expect(ctx.body).toStrictEqual({
      status: 'ok',
      items: mockResponseItems
    });
  });

  test('expect the itemsMiddleware to delete and return the remaining items for a user', async () => {
    deleteItem.mockResolvedValue(mockResponseItems);
    const ctx = createMockContext({
      request: { 
        body: {
          action: 'delete',
          item: mockItems[0]
        } 
      }
    });
    await itemMiddlewarePost(ctx);
    expect(deleteItem).toHaveBeenCalledWith(mockUserId, mockItems[0].id);
    expect(ctx.body).toStrictEqual({
      status: 'ok',
      items: mockResponseItems
    });
  });

  test('expect the itemsMiddleware to update and return the updated items for a user', async () => {
    updateItem.mockResolvedValue(mockResponseItems);
    const ctx = createMockContext({
      request: { 
        body: {
          action: 'update',
          item: mockItems[0]
        } 
      }
    });
    await itemMiddlewarePost(ctx);
    expect(updateItem).toHaveBeenCalledWith(mockUserId, mockItems[0]);
    expect(ctx.body).toStrictEqual({
      status: 'ok',
      items: mockResponseItems
    });
  });

  test('expect the itemsMiddleware to return items even when action is sent', async () => {
    getItems.mockResolvedValue(mockResponseItems);
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
      items: mockResponseItems,
    });
  });

  test('expect the itemsMiddleware to return an empty array when no userId is in cookies', async () => {
    updateItem.mockResolvedValue(mockResponseItems);
    const ctx = { cookies: { get() {} }, body: {}, request: { body: {} } };
    await itemMiddlewarePost(ctx);
    expect(ctx.body).toStrictEqual({
      status: 'ok',
      items: []
    });
  });
});
