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
    For API tests:
    ```
    npm run cy:open-api
    ```
    The main difference between both is the `spec pattern` is changed to make it easier for the developer to navigate throughout files

2. Run the tests via CLI :

    Recommended when you want to run a suite, run all tests and generate a detailed report of the results or any other task that involves just executing the tests and get feedback on the test results

    For example if you are trying to run 1 feature file you can execute:
    ```shell
    npm run cy:test -- --spec cypress/e2e/frontend/features/createAccount.feature
    ```
    You can also run tests via tagging as per example:
    ```shell
    npm run cy:test --env tags="@regression"
    npm run cy:test --env tags="@regression or @smoke"
    npm run cy:test --env tags="@e2e and @negative"
    ```
    When you run a test from CLI, if the test fail the retry-mechanism is going to attempt to run it again 2 more times. If you want to change this behavior modify the `retries.runMode` property in [cypress.config.js](https://github.com/hardel99/cypress-e2e-demo/blob/main/cypress.config.js)

## Element identification strategies

Whenever you want to create/update an element locator please consider:

- Always try to get/keep a CSS selector for the element locator, is the fastest way for Cypress to locate an element and its also maintainable in the long run, is the default locator method for `cy.get()` command and is very easy to use with the Cypress target locator
- As another alternative you can try to locate elements by text, and while this is very easy to understand an mantain, take in count this method is not as good in performance as CSS selectors; so for example if your DOM is very big you may see it takes more time to get the element since is scanning the whole DOM searching for the text you pass it
- This project has no support for XPath locators. XPath is a powerful tool for element identification and dynamic expressions (such as regex), but they are very difficult to mantain and keep consistent and Cypress doesn NOT support them natively (without libraries such as [cypress-xpath](https://www.npmjs.com/package/cypress-xpath)), for the moment the application under test hasn't require to use them
- Sometimes locating an element(s) based on another parent (or neighbor) is also handly, for that Cypress recommends to locate the parent and then pass a child locator with the `find()` (or `its()` method depending if you want to consider only child elements) method, however this framework implements a custom cypress commands to make that process quicker (see [Best practicies](https://github.com/hardel99/cypress-e2e-demo#best-practices) section for more information)
- Cypress does NOT support `iframes` out of the box, so if an element is inside an `iframe` you would have to do either of 2 options:
    
    - Threat the iframe as a parent element, locate it, and do:
        ```js
        cy.get('iframe-locator').find('child-locator');
        //or
        cy.get('iframe-locator').its('child-locator');
        ```
        The `child-locator` is going to be based on the iframe not in the DOM for this to work
    - Install a third party library to handle `iframes` for you such as [cypress-iframe](https://www.npmjs.com/package/cypress-iframe)

## Best practices

All regular Page Object Model Best practices apply to this framework. Other best practices to keep in mind:

- Use simple quotes `' '` for strings locators
- For concatanated values use backticks ` `` `
- Use the cypress custom commands instead of typing the full command whenever possible, i.e.:
    
    Cypress normal way:
    ```js
    cy.get('parent-locator').find('child-locator').each(($el, index, $list) => {
        //some code to perform over each element matching the locator
    });
    ```
    With custom commands:
    ```js
    function abc($el, index, $list) {
        //some code to perform over each element matching the locator
    }
    cy.findElement('parent-locator', 'child-locator', abc);
    ```
- If you need to use data across different steps definition you can either use:
    - Cypress environment variables for sensitive information, i.e.:
    ```js
    Given('get an auth token', () => {
        cy.request('GET', '/endpoint', payload).then(response => {
            Cypress.env('token', response.body.token);
        });
    });

    When('use the token', () => {
        cy.setCookie(Cypress.env('token'));
        cy.request('PUT', '/endpoint', payload);
    });
    ```
    - Global variables for not secured information
    ```js
    Given('get customer name', () => {
        cy.request('GET', '/endpoint', payload).then(response => {
            this.name = response.body.name;
        });
    });

    When('use the customer name', () => {
        cy.get('name-label-locator').should('have.text', this.name);
    });
    ```

## Project structure

Since POM is the selected pattern we can find the following structure
```
cypress/
|   e2e/
|   |   backend/        //similar structure as frontend folder
|   |   frontend/
|   |   |   features/
|   |   |   |   createAccount.feature       //definition of the test scenarios steps
|   |   |   step_definitions/
|   |   |   |   createAccount.js            //definition of the steps used in scenarios in the .feature file
|   fixtures            //test data and assets
|   |   frontend/       //used in frontend
|   |   backend/        //
|   support
|   |   pages
|   |   |   Login.js    //definition of locators and elements operations of the Login page, used in step-definitions
|   command.js          //custom cypress commands
|   e2e.js
|   utils.js            //collection of methods and re-usables across the whole framework, not cypress related
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
- You can see the script definition for these commands on `package.json`
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