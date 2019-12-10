import Koa from 'koa';

import {
  addItem,
  getItems,
  updateItem,
  deleteItem,
} from '../utils/database';
import { Item } from '../utils/database';

const applyUpdates = (userId: string, action: string, item: Item): Promise<Item[]> => {  
  switch (action) {
    case 'add':
      return addItem(userId, item.text);
    case 'delete':
      return deleteItem(userId, item.id);
    case 'update':
      return updateItem(userId, item);
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
  const { action, item } = ctx.request.body;
  
  const updatedItems: Item[] = userId ? await applyUpdates(userId, action, item) : [];

  ctx.body = {
    status: 'ok',
    items: updatedItems
  };
};