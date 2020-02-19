import AWS from 'aws-sdk';

import { 
  getItems,
  addItem,
  updateItem,
  deleteItem,
} from '../database';

const expectedItems = ['item-0', 'item-1', 'item-2'];

jest.mock('uuidv4', () => ({
  uuid: () => 'uuid-0123456789'
}));

jest.genMockFromModule('aws-sdk');
jest.mock('aws-sdk');

const mockUserId = 'userid-01234556789';

const dbClientPrototype = AWS.DynamoDB.DocumentClient.prototype;

const promiseMock = jest.fn();
const awsMenthodMock = () => ({
  promise: promiseMock
});

// @ts-ignore
dbClientPrototype.query.mockImplementation(awsMenthodMock);
// @ts-ignore
dbClientPrototype.put.mockImplementation(awsMenthodMock);
// @ts-ignore
dbClientPrototype.update.mockImplementation(awsMenthodMock);
// @ts-ignore
dbClientPrototype.delete.mockImplementation(awsMenthodMock);

describe('getItems', () => {
  test('it gets the users items', async () => {
    expect.assertions(1);
    promiseMock.mockResolvedValue({ Items: expectedItems });
    const expectedParams = {
      TableName: 'Items',
      IndexName: 'UserId',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': mockUserId
      }
    };
    await getItems(mockUserId);
    expect(dbClientPrototype.query).toHaveBeenCalledWith(expectedParams);
  });

  test('it returns items', async () => {
    expect.assertions(1);
    promiseMock.mockResolvedValue({ Items: expectedItems });
    const items = await getItems(mockUserId);
    expect(items).toEqual(expectedItems);
  });

  test('it returns an empty array if AWS errors', async () => {
    expect.assertions(1);
    promiseMock.mockRejectedValue('error');
    const items = await getItems(mockUserId);
    expect(items).toEqual([]);
  });
});

describe('addItem', () => {
  test('it adds an item to the database', async () => {
    expect.assertions(1);
    promiseMock.mockResolvedValue({ Items: expectedItems });
    const expectedParams = {
      TableName: 'Items',
      Item: {
        id: 'uuid-0123456789',
        userId: mockUserId,
        text: 'string',
        checked: false
      }
    };
    await addItem(mockUserId, 'string');
    expect(dbClientPrototype.put).toHaveBeenCalledWith(expectedParams);
  });

  test('it returns the updated items', async () => {
    expect.assertions(1);
    promiseMock.mockResolvedValue({ Items: expectedItems });
    const items = await addItem(mockUserId, 'new-item');
    expect(items).toEqual(expectedItems);
  });
});

describe('updateItem', () => {
  test('it updates the item in the database', async () => {
    expect.assertions(1);
    const expectedParams = {
      TableName: 'Items',
      ExpressionAttributeNames: {
        '#text': 'text'
      },
      ExpressionAttributeValues: {
        ':checked': false,
        ':text': 'string'
      },
      Key: {
        id: 'uuid',
        userId: mockUserId,
      },
      UpdateExpression: 'set #text = :text, checked = :checked'
    };
    await updateItem(mockUserId, { id: 'uuid', text: 'string', checked: false });
    expect(dbClientPrototype.update).toHaveBeenCalledWith(expectedParams);
  });

  test('it defaults checked to false', async () => {
    expect.assertions(1);
    const expectedParams = {
      TableName: 'Items',
      ExpressionAttributeNames: {
        '#text': 'text'
      },
      ExpressionAttributeValues: {
        ':checked': false,
        ':text': 'string'
      },
      Key: {
        id: 'uuid',
        userId: mockUserId,
      },
      UpdateExpression: 'set #text = :text, checked = :checked'
    };
    await updateItem(mockUserId, { id: 'uuid', text: 'string' });
    expect(dbClientPrototype.update).toHaveBeenCalledWith(expectedParams);
  });

  test('it returns the updated items', async () => {
    expect.assertions(1);
    promiseMock.mockResolvedValue({ Items: expectedItems });
    const items = await updateItem(mockUserId, {
      id: 'uuid',
      text: 'string',
      checked: true
    });
    expect(items).toEqual(expectedItems);
  });
});

describe('deleteItem', () => {
  const mockItemId = 'itemid-9876543210';

  test('it deletes the item from the database', async () => {
    expect.assertions(1);
    const expectedParams = {
      TableName: 'Items',
      Key: {
        id: mockItemId,
        userId: mockUserId,
      }
    };
    await deleteItem(mockUserId, mockItemId);
    expect(dbClientPrototype.delete).toHaveBeenCalledWith(expectedParams);
  });
  
  test('it returns the updated items', async () => {
    expect.assertions(1);
    promiseMock.mockResolvedValue({ Items: expectedItems });
    const items = await deleteItem(mockUserId, mockItemId);
    expect(items).toEqual(expectedItems);
  });
});
