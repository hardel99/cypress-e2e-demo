// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('selectFromDropdown', (locator, option) => {
    cy.get(locator).select(option);
});

Cypress.Commands.add('typeIntoField', (locator, text) => {
    cy.get(locator).type(text);
});

Cypress.Commands.add('checkElement', (locator) => {
    cy.get(locator).check();
    cy.get(locator).should('be.checked');
});

Cypress.Commands.add('verifyFieldValue', (locator, value) => {
    cy.get(locator).should('have.value', value).and('be.visible');
});

Cypress.Commands.add('verifyElementText', (locator, text) => {
    cy.get(locator).should('include.text', text).and('be.visible');
});