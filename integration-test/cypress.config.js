const { defineConfig } = require("cypress");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5500',
    supportFile: path.resolve(__dirname, 'cypress/support/e2e.js'),
    setupNodeEvents(on, config) {}
  }
});