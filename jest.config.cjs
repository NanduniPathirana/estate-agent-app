// Jest configuration (CommonJS extension needed since package.json has
// "type": "module", which Jest's default config loader doesn't support).
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.js'],
  moduleNameMapper: {
    // CSS imports aren't relevant to test logic - map them to a harmless proxy.
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    // Redirect the one file that touches Vite's import.meta.env to a test
    // mock, since import.meta isn't available under Jest's CommonJS transform.
    '.*/utils/env\\.js$': '<rootDir>/src/test/__mocks__/env.js',
  },
  testMatch: ['**/src/**/*.test.{js,jsx}'],
}