 'use strict';

 const AWS = require('aws-sdk');
 const dynamodb = new AWS.DynamoDB({
   apiVersion: '2012-08-10',
   endpoint: 'http://localhost:3000',
   region: 'eu-west-1',
 });

 const UserTableParams = {
   AttributeDefinitions: [
     {
       AttributeName: 'UserId',
       AttributeType: 'S'
     }
   ],
   KeySchema: [
     {
       AttributeName: 'UserId',
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
       AttributeName: 'ID',
       AttributeType: 'S'
     },
     {
       AttributeName: 'UserId',
       AttributeType: 'S'
     }
   ],
   KeySchema: [
     {
       AttributeName: 'ID',
       KeyType: 'HASH'
     },
     {
       AttributeName: 'UserId',
       KeyType: 'RANGE'
     }
   ],
   ProvisionedThroughput: {
     ReadCapacityUnits: 5,
     WriteCapacityUnits: 5
   },
   TableName: 'Items'
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