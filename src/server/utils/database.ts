import AWS from 'aws-sdk';
import { uuid } from 'uuidv4';

const dynamoClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

export interface Item {
  id: string,
  userId: string,
  checked: boolean,
  text: string,
}

const TableName = 'Items';
const IndexName = 'userId';

export async function getItems(userId: string): Promise<Item[]> {
  const queryParameters = {
    TableName,
    IndexName,
    ExpressionAttributeValues: {
      ':userId': userId,
    },
    KeyConditionExpression: 'userId = :userId',
  };
  try {
    const data = await dynamoClient.query(queryParameters).promise();
    return data.Items as Item[];
  } catch (e) {
    return [];
  }
}

export async function addItem(
  userId: string,
  text: string
): Promise<Item[]> {
  await dynamoClient.put({
    TableName,
    Item: {
      id: uuid(),
      userId,
      text,
      checked: false
    }
  });
  return getItems(userId);
}

export async function updateItem(
  userId: string,
  { id, text, checked = false }: Item
): Promise<Item[]> {
  await dynamoClient.update({
    TableName,
    Key: {
      id,
      userId,
      text,
      checked,
    }
  });
  return getItems(userId);
}

export async function deleteItem(
  userId: string,
  id: string
): Promise<Item[]> {
  await dynamoClient.delete({
    TableName,
    Key: { id }
  });
  return getItems(userId);
}
