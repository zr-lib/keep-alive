//jest.config.js
module.exports = {
  modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    '.(css|less)$': '<rootDir>/__test__/_nullModule.js',
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/src/',
  coveragePathIgnorePatterns: ['<rootDir>/__test__/'],
  coverageReporters: ['text'],
};
