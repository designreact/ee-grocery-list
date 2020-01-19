import AWS from 'aws-sdk';
import { uuid } from 'uuidv4';
import config from 'config';
import { Item } from '../../types/Item';

const dynamoClient = new AWS.DynamoDB.DocumentClient({ ...config.get('database.options') });

const TableName = 'Items';
const IndexName = 'UserId';

export async function getItems(userId: string): Promise<Item[]> {
  const queryParameters = {
    TableName,
    IndexName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
  };
  try {
    const data = await dynamoClient.query(queryParameters).promise();
    return data.Items as Item[];
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function addItem(
  userId: string,
  text: string
): Promise<Item[]> {
  await dynamoClient
    .put({
      TableName,
      Item: {
        id: uuid(),
        userId,
        text,
        checked: false
      }
    })
    .promise();
  const items = await getItems(userId);
  return items;
}

export async function updateItem(
  userId: string,
  { id, text, checked = false }: Item
): Promise<Item[]> {
  await dynamoClient
    .update({
      TableName,
      Key: {
        id,
        userId,
        text,
        checked
      }
    })
    .promise();
  const items = await getItems(userId);
  return items;
}

export async function deleteItem(
  userId: string,
  id: string
): Promise<Item[]> {
  await dynamoClient
    .delete({
      TableName,
      Key: { id }
    })
    .promise();
  const items = await getItems(userId);
  return items;
}
