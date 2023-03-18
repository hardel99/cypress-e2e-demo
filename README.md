# Cypress framework demo

This project is a working demo on how to configure cypress to run with a BDD framework (cucumber in this case)

### Setup the project

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

### Quickstart

To start running cypress tests we have 2 main options:

1. Run the test manually with browser mode:

    ```shell
    npx cypress open
    ```

2. Run the tests via CLI :

    For example if you are trying to run 1 feature file you can execute:
    ```shell
    npm run cy:test -- --spec cypress/e2e/features/frontend/createAccount.feature
    ```
    You can also run tests via tagging as per example:
    ```shell
    npm run cy:test --env tags="@regression"
    npm run cy:test --env tags="@frontend and @smoke"
    npm run cy:test --env tags="@e2e or @negative"
    ```
### Project structure

```
cypress
|   fixtures
|   support
|   |   scenarios
|   |   steps-definition
|   |   pages
|   |   pageOperations
|   command.js
|   e2e.js
cucumber-json-formatter
cypress.config.json
cypress.env.json
README.md
```

### Disclaimers

Since is not possible to access to the application source code, it was decided to opt for a traditional Page-Objet Model with cypress; even though cypress encourages you to avoid it there is nothing wrong to adapt cypress to your own project necesities
