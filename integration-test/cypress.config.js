const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5500",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {
    }
  }
});
