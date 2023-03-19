const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
    e2e: {
        async setupNodeEvents(on, config) {
            on("task", {
                log(message) {
                  console.log(message);
        
                  return null;
                },
            });
            
            const bundler = createBundler({
                plugins: [createEsbuildPlugin(config)],
            });

            on("file:preprocessor", bundler);
            await addCucumberPreprocessorPlugin(on, config);

            return config;
        },
        baseUrl: "https://automationexercise.com/",
        specPattern: "cypress/e2e/**/features/*.feature",
        viewportWidth: 1366,
        viewportHeight: 768,
        defaultCommandTimeout: 5000,
        pageLoadTimeout: 60000,
        watchForFileChanges: false
    },
});
