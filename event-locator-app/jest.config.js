module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js', // Exclude the entry point
    '!src/**/index.js', // Exclude index files
    '!src/**/config/*.js', // Exclude config files
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};