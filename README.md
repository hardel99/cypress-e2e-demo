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

### Quickstart

To start running cypress tests we have 2 main options:

1. Run the test manually with browser mode:

    ```shell
    npx cypress open
    ```

2. Run the tests via CLI :

    For example if you are trying to run all feature files under e2e folder
    ```shell
    npx cypress run --spec cypress/e2e/*.feature
    ```
    Or if you trying to run only test with certain tags(i.e.: @smoke tag to run a smoke suite)
    ```shell
    npx cypress run --env TAGS="@smoke"
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
cypress.config.json
cypress.env.json
README.md
```

### Disclaimers

Since is not possible to access to the application source code, it was decided to opt for a traditional Page-Objet Model with cypress; even though cypress encourages you to avoid it there is nothing wrong to adapt cypress to your own project necesities
