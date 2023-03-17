const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
    e2e: {
        async setupNodeEvents(on, config) {
            const bundler = createBundler({
                plugins: [createEsbuildPlugin(config)],
            });

            on("file:preprocessor", bundler);
            await addCucumberPreprocessorPlugin(on, config);

            return config;
        },
        baseUrl: "https://automationexercise.com/",
        specPattern: "cypress/e2e/features/**/*.feature",
        viewportWidth: 1920,
        viewportHeight: 1080,
        defaultCommandTimeout: 5000,
        pageLoadTimeout: 60000,
        watchForFileChanges: false
    },
});
