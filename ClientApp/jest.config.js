module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transformIgnorePatterns: ['node_modules/(?!(lodash-es|enzyme)/)'],
  setupFiles: [
    'raf/polyfill',
    'jest-prop-type-error',
    '<rootDir>/src/internals/testing/enzyme-setup.js'
  ],
  setupFilesAfterEnv: ['jest-extended', '<rootDir>/src/setupTests.js']
};
