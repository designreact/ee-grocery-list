 'use strict';
const config = require('config');
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB({ ...config.get('database.options') });

const UserTableParams = {
  AttributeDefinitions: [
    {
      AttributeName: 'userId',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'userId',
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  TableName: 'Users'
};

const ItemTableParams = {
  AttributeDefinitions: [
    {
      AttributeName: 'id',
      AttributeType: 'S'
    },
    {
      AttributeName: 'userId',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'userId',
      KeyType: 'RANGE'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  TableName: 'Items',
  GlobalSecondaryIndexes: [{
    IndexName: 'UserId',
    KeySchema: [
      { AttributeName: 'userId', KeyType: 'HASH' },
    ],
    Projection: {
      ProjectionType: 'ALL',
    },
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  }]
};

const tableParameters = [UserTableParams, ItemTableParams];

const createTable = params => dynamodb.createTable(params).promise();

function createTables() {
  return Promise.all(tableParameters.map(createTable));
};


const describeTable = ({ TableName }) =>
  dynamodb.describeTable({ TableName }).promise();

function describeTables() {
  return Promise.all(tableParameters.map(describeTable));
};

module.exports = {
  createTables,
  describeTables,
};