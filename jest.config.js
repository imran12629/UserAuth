module.exports = {
  preset: 'react-native',
  // testEnvironment: 'jsdom',

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|react-native-flash-message' + 
      ')/)',
  ],

  setupFiles: [
    './jest.setup.js',
  ],
};
