'use strict';

module.exports = {
  preset: 'ts-jest',
  browser: false,
  clearMocks: true,
  testEnvironment: 'node',
  transformIgnorePatterns: ['^.+\\.js$'],
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsConfig: 'tsconfig.json',
    },
  },
};
