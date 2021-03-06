'use strict';

const base = require('./jest.base.config');

module.exports = {
  ...base,
  displayName: 'unit-test',
  roots: ['<rootDir>/'],
  testMatch: ['**/__units__/**/*.unit.ts'],
  collectCoverage: true,
  modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10
  //   }
  // },
};
