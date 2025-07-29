const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://front.serverest.dev",
    env: {
      apiUrl: "https://serverest.dev",
    },
    supportFile: "cypress/support/commands.js",
  },
});
