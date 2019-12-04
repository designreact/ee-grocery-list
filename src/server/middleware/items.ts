import Koa from 'koa';

import {
  addItems,
  getItems,
  updateItems,
  deleteItems
} from '../utils/__mocks__/database.mock';

const applyUpdates = (userId: string, action: string, items: string[]): Promise<string[]> => {  
  switch (action) {
    case 'add':
      return addItems(userId, items);
    case 'delete':
      return deleteItems(userId, items);
    case 'update':
      return updateItems(userId, items);
    default:
      return Promise.resolve([]);
  }
};

export const itemMiddlewareGet = async (ctx: Koa.Context): Promise<void> => {
  const userId = ctx.cookies.get('userId');
  ctx.body = {
    status: 'ok',
    items: userId ? await getItems(userId) : []
  };
};

export const itemMiddlewarePost = async (ctx: Koa.Context): Promise<void> => {
  const userId = ctx.cookies.get('userId');
  const { action, items } = ctx.request.body;
  
  const updatedItems: string[] = userId ? await applyUpdates(userId, action, items) : [];

  ctx.body = {
    status: 'ok',
    items: updatedItems
  };
};