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
        baseAPIUrl: "https://restful-booker.herokuapp.com",  //this should NOT happen in a normal scenario but since there are 2 different applications under test it was specified another baseURL
        specPattern: "cypress/e2e/**/features/*.feature",
        viewportWidth: 1366,
        viewportHeight: 768,
        defaultCommandTimeout: 10000,
        pageLoadTimeout: 60000,
        watchForFileChanges: false,
        retries: {
            runMode: 2,
            openMode: 0,
        },
    },
});
