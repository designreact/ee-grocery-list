'use strict';

const base = require('./jest-unit.config');

module.exports = {
  ...base,
  displayName: 'unit-test-react',
  testEnvironment: 'jsdom',
  testMatch: ['**/__units__/**/*.unit.tsx']
};
