# Cypress framework demo

This project is a working demo on how to configure cypress to run with a BDD framework (cucumber in this case). Since is not possible to access to the Application Under Test source code, it was decided to opt for a traditional Page-Objet Model with cypress; even though cypress encourages you to avoid it there is nothing wrong to adapt cypress to your own project necesities

## Setup the project

Clone the repo:

```git
git clone https://github.com/hardel99/cypress-e2e-demo.git
```

Install all dependencies:

```shell
cd 'cypress-e2e-demo'
npm install
```

Finally, to enable reporting, go to [cucumber-json-formatter](https://github.com/cucumber/json-formatter) repository and download the executable respecting to your OS, rename it as the [README.md of the repository](https://github.com/cucumber/json-formatter/README.md) indicates and put it on root project level (see [Project structure](https://github.com/hardel99/cypress-e2e-demo#project-structure) section to see how your repo should be structured)

## Quickstart

This README guide assumes the reader has basic knowledge on how to execute end-to-end testing with cypress

To start running cypress tests we have 2 main options:

1. Run the test manually with Cypress launcher mode:
    
    Recommended when there is no necessity of filtering test execution, since from this mode the only way of selecting what to execute is selecting the file where the test is located and the whole file is going to be executed. To start this mode run:
    ```shell
    npm run cy:open
    ```

2. Run the tests via CLI :

    Recommended when you want to run a suite, run all tests and generate a detailed report of the results or any other task that involves just executing the tests and get feedback on the test results

    For example if you are trying to run 1 feature file you can execute:
    ```shell
    npm run cy:test -- --spec cypress/e2e/frontend/features/createAccount.feature
    ```
    You can also run tests via tagging as per example:
    ```shell
    npm run cy:test --env tags="@regression"
    npm run cy:test --env tags="@frontend and @smoke"
    npm run cy:test --env tags="@e2e or @negative"
    ```
## Project structure

Since POM is the selected pattern we can find the following structure
```
cypress/
|   e2e/
|   |   frontend/
|   |   |   features/
|   |   |   |   createAccount.feature       //definition of the scenarios steps
|   |   |   step_definitions/
|   |   |   |   createAccount.js            //definition of the steps used in the scenarios in the .feature file
|   fixtures            //test data and assets
|   support
|   |   pages
|   |   |   Login.js    //definition of locators and elements operations of the Login page used in step-definitions
|   command.js          //custom cypress commands
|   e2e.js
|   utils.js            //collection of methods and re-usables across the whole framework, nothing cypress related
cucumber-html-report.js
cucumber-json-formatter
cypress.config.js
package.json
README.md
```

## Run strategies

When using Cypress launcher, it doesn't really provide run strategies options (unless you have a cypress dashboard linked to the project), you just select the file you want to run and Cypress run all the tests present in that file. Due to this limitation is important to use and understand how to run tests from Cypress CLI. There are some examples already on the [Quickstart](https://github.com/hardel99/cypress-e2e-demo#quickstart) section but this is a more in deep explanation and recommendations on how to use them.

- Run all tests(except for the ones with the `@ignore` tag, see more on **Notes**):
    ```shell
    npm run cy:test
    ```
- Run all tests in feature file:
    ```shell
    npm run cy:test -- --spec cypress/e2e/frontend/features/createAccount.feature
    ```
- Run all tests and feature files and do NOT generate video of the test playback (useful when running from a CI service):
    ```shell
    npm run cy:test-all
    ```
- Run smoke suite (all scenarios with the `@smoke` tag):
    ```shell
    npm run cy:smoke
    ```
- Run regression suite (all scenarios with the `@regression` tag):
    ```shell
    npm run cy:regression
    ```
- If you want to run only a certain scenario you can make use of tags to filter it (useful when developing a new scenario script). 

    For example imagine the following scenario in the middle of a feature file with lots of other scenarios:
    ```feature
    ...
    @development @id3467901
    Scenario: Add a new shipping address to existing customer
        Given Login to the application as "<user>"
        Then Navigate to Account Information page
        etc..
    ...
    ```
    If you want to only run the `Add a new shipping address to existing customer` scenario you could run:
    ```shell
    npm run cy:test -- --env tags="@development and @id3467901"
    ```
    As long as the tags combination are unique, Cypress is only to execute the `Add a new shipping address to existing customer` scenario for this example.

**Notes**: 
- After a test is executed from CLI a video of the execution is saved under `cypress/videos`
- If a test is executed from CLI a screenshot of the last thing Cypress was able to capture is generated under `cypress/screenshots`
- A report is generated every time you run a test from Cypress CLI under `cucumber-report/report`
    - If you want to generate a report manually run any test from CLI, once it finish execution run the following command:
        ```shell
        npm run cy:report
        ```
- Scenarios with the `@ignore` tag are not executed by default from CLI, unless you modify the `tags` run parameter, examples:
    - Run all tests under `cypress/e2e/frontend/features/createAccount.feature` file regardless of scenarios tags:
        ```shell
        npm run cy:test -- --spec cypress/e2e/frontend/features/createAccount.feature --env tags=""
        ```
    - Run all tests with the `ignore` and `smoke` tag:
        ```shell
        npm run cy:test -- --env tags="@smoke and @ignore"
        ```
    
    