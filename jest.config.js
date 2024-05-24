export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/tests/acceptance/'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(redux-persist)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  /* testEnvironment: 'node', */
  testEnvironment: 'jest-environment-jsdom',
 
};
