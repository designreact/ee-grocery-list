'use strict';

const base = require('./jest.base.config');

module.exports = {
  ...base,
  displayName: "integration-test",
  roots: ["<rootDir>/"],
  modulePathIgnorePatterns: ["<rootDir>/.*/__mocks__"],
  testMatch: ["**/__integrations__/**/*.integration.ts?(x)"]
};