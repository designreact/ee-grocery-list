'use strict';
/* eslint-disable no-console */

const DynamoDbLocal = require('dynamodb-local');
const config = require('config');

const { createTables, describeTables } = require('./create-tables');

const PORT = config.get('database.port');

async function start() {
  console.log('> Starting dynamodb local');
  await DynamoDbLocal.launch(PORT, null, [], false, true);
  console.log('> Creating tables');
  await createTables();
  console.log('> Tables created');
  await describeTables()
    .then(tables => console.log(tables))
    .catch(errors => console.log(errors));
  console.log('> Running dynamodb local on port', PORT);
}

async function stop() {
  await DynamoDbLocal.stopChild(child);
}

module.exports = {
  start,
  stop,
};