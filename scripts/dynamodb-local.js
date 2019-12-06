'use strict';
/* eslint-disable no-console */

const DynamoDbLocal = require('dynamodb-local');
const { createTables, describeTables } = require('./create-tables');

const dbPort = 3000;

async function start() {
  console.log('> Starting dynamodb local');
  await DynamoDbLocal.launch(dbPort, null, [], false, true);
  console.log('> Creating tables');
  await createTables();
  console.log('> Tables created');
  await describeTables()
    .then(tables => console.log(tables))
    .catch(errors => console.log(errors));
  console.log('> Running dynamodb local on port', dbPort);
}

async function stop() {
  await DynamoDbLocal.stopChild(child);
}

module.exports = {
  start,
  stop,
};