// jest.config.mjs
export default {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '/tests/acceptance/'],
  };
  