import { Item } from '../database';

export const addItem = jest.fn(
  (): Promise<Item[]> => 
    Promise.resolve([{ id: 'itemid-0123456789', text: 'items with added', checked: true, userId: 'userId-0987654321' }]
  )
);
export const getItems = jest.fn(
  (): Promise<Item[]> => 
    Promise.resolve([{ id: 'itemid-0123456789', text: 'items', checked: true, userId: 'userId-0987654321' }]
  )
);
export const updateItem = jest.fn(
  (): Promise<Item[]> => 
    Promise.resolve([{ id: 'itemid-0123456789', text: 'items with updated', checked: true, userId: 'userId-0987654321' }]
  )
);
export const deleteItem = jest.fn(
  (): Promise<Item[]> => 
    Promise.resolve([{ id: 'itemid-0123456789', text: 'items with deleted', checked: true, userId: 'userId-0987654321' }]
  )
);