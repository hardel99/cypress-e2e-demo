///<reference types="cypress"/>
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
Cypress.Commands.add('clickElement', (locator) => {
    cy.get(locator).click();
});

Cypress.Commands.add('clickElementByText', (locator) => {
    cy.contains(locator).click();
});

Cypress.Commands.add('clickAndValidateElement', (locator) => {
    cy.get(locator).should('be.visible').click();
});

Cypress.Commands.add('clickandValidateElementByText', (locator, text) => {
    cy.contains(locator).should('be.visible').and('be.enabled').and('include.text', text).click();
});

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

Cypress.Commands.add('findElement', (parentLocator, childLocator, fn) => {
    if(typeof(fn) === 'function') {
        cy.get(parentLocator).find(childLocator).each(($el, index, $list) => {
            fn($el, index, $list);
        });
    } else {
        cy.get(parentLocator).find(childLocator);
    }
});

Cypress.Commands.add('verifyElementExist', (locator) => {
    cy.get(locator).should('exist').and('be.visible');
});

Cypress.Commands.add('verifyElementExistByText', (locator) => {
    cy.contains(locator).should('exist').and('be.visible');
});

Cypress.Commands.add('verifyFieldValue', (locator, value) => {
    cy.get(locator).should('have.value', value).and('be.visible');
});

Cypress.Commands.add('verifyElementText', (locator, text, ignoreCases=false) => {
    if(ignoreCases) {
        cy.get(locator).should('be.visible').then($el => {
            expect($el.text().toLowerCase()).to.eq(text.toLowerCase());
        });
    } else{
        cy.get(locator).should('include.text', text).and('be.visible');
    }
});

Cypress.Commands.add('verifyElementTextByContains', (locator, text, ignoreCases=false) => {
    if(ignoreCases) {
        cy.contains(locator).should('be.visible').then($el => {
            expect($el.text().toLowerCase()).to.eq(text.toLowerCase());
        });
    } else{
        cy.contains(locator).should('include.text', text).and('be.visible');
    }
});

Cypress.Commands.add('verifyURLIncludes', (endpoint = '') => {
    const url = Cypress.config('baseUrl') + endpoint;
    cy.url().should('eq', url);
});

Cypress.Commands.add('printLog', (message) => {
    cy.task('log', {message});
});

Cypress.Commands.add('sendRequest', ($method, endpoint, payload = {}, $headers = {}, query = {}) => {
    cy.request( {
        method: $method,
        failOnStatusCode: false,
        url: Cypress.config('baseAPIUrl') + endpoint,
        body: payload,
        headers: $headers,
        qs: query,
    }).then(response => {
        cy.printLog(response);
        return cy.wrap(response);
    });
});