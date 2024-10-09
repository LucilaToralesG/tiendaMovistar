const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1000,
  viewportHeight:600,
  env: {
    FOO: 'bar',
  },
  e2e: {
      // implement node event listeners here
    "baseUrl": "https://tiendaonline.movistar.com.ar",
    defaultCommandTimeout: 10000,
    "email": "hello@cypress.io",
    "body": "Fixtures are a great way to mock data for responses to routes"  
  },
});
