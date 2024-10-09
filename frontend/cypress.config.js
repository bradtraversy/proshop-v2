const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
    },
  },
});
