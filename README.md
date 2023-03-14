# Cypress framework demo

This project is a working demo on how to configure cypress to run with a BDD framework (cucumber in this case)

### Setup the project

Clone the repo:

```git
git clone 'placeholder'
```

Install all dependencies:

```shell
cd 'repository-name'
npm install
```

### Quickstart

To start running cypress tests we have 2 main options:

1. Run the test manually with browser mode:

    ```shell
    npx cypress open
    ```

2. Run the tests via CLI :
    ```shell
    npx cypress run
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

Sicne we don't have access to the application source code, we opted to use a traditional Page-Objet Model with cypress; even though cypress encourages you to avoid it there is nothing wrong to adapt cypress to your own project necesities
