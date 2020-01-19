import Koa from 'koa';

import {
  addItem,
  getItems,
  updateItem,
  deleteItem,
} from '../utils/database';
import { Item } from '../../types/Item';

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
  const items = userId ? await getItems(userId) : [];
  ctx.body = {
    status: 'ok',
    items,
  };
};

export const itemMiddlewarePost = async (ctx: Koa.Context): Promise<void> => {
  const userId = ctx.cookies.get('userId');
  if (!userId) {
    ctx.body = {
      status: 'ok',
      items: [],
    };
    return;
  }
  
  const { action, item } = ctx.request.body;
  const items: Item[] = action
    ? await applyUpdates(userId, action, item)
    : await getItems(userId);

  ctx.body = {
    status: 'ok',
    items
  };
};