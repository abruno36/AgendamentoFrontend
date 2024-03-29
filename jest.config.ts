import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/style-mock.js",
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/services/(.*)$': '<rootDir>/src/services/$1',
    '^@/contexts/(.*)$': '<rootDir>/src/contexts/$1',
  },
  testPathIgnorePatterns: [
    "<rootDir>/.next/", // Ignora a pasta .next/
    "<rootDir>/node_modules/", // Ignora a pasta node_modules/
  ],
};

export default config;