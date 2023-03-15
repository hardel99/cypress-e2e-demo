///<reference types="cypress"/>

import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given('I navigate to the Website', () => {
    cy.visit("/");
});

When('Website Home Page is visible', () => {
    //valdiate home page elements
});

Then('Signup and create a new user', () => {
    cy.contains(' Signup / Login').click();
    cy.get('.signup-form > h2').should('be.visible').and('have.text', 'New User Signup!');
    cy.get('[data-qa="signup-name"]').type('user-test');
    cy.get('[data-qa="signup-email"]').type('user@email.com');
    cy.get('[data-qa="signup-button"]').click();
});

Then('I fill account details', () => {
    cy.get('h2.title.text-center').should('be.visible').and('include.text', 'Enter Account Information');
    cy.get('[data-qa="name"]').should('have.value', 'user-test');
    cy.get('[data-qa="email"]').should('have.value', 'user@email.com');
    cy.get('#id_gender1').click();
    cy.get('[data-qa="password"]').type('password');
    cy.get('[data-qa="days"]').select('2');
    cy.get('[data-qa="months"]').select('February');
    cy.get('[data-qa="years"]').select('1999');
    cy.get('#newsletter').click();
    cy.get('#newsletter').should('be.checked');
    cy.get('#optin').click();
    cy.get('#optin').should('be.checked');
});

Then('I fill address information', () => {
    cy.get('[data-qa="first_name"]').type('testFN');
    cy.get('[data-qa="last_name"]').type('testLN');
    cy.get('[data-qa="company"]').type('RAVN');
    cy.get('[data-qa="address"]').type('Address Line 1');
    cy.get('[data-qa="address2"]').type('Address Line 2');
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type('NY');
    cy.get('[data-qa="city"]').type('Idw any big city');
    cy.get('[data-qa="zipcode"]').type('33195');
    cy.get('[data-qa="mobile_number"]').type('9856541234');
});

When('Click Create account', () => {
    cy.get('[data-qa="create-account"]').should('be.visible').and('be.enabled').click();
});

Then('Verify account is created successfully', () => {
    cy.get('h2.title.text-center').should('be.visible').and(($el) => {
        expect($el.text().toLowerCase()).to.eq('ACCOUNT CREATED!'.toLowerCase());
    });
    cy.get('.row p').first().should('be.visible').and('have.text', 'Congratulations! Your new account has been successfully created!');
    cy.get('[data-qa="continue-button"]').click();
    //verify it redirects me to home page
});

Then('Verify user is logued in', () => {
    let userName = 'user-test';
    cy.contains('Logged in as').should('be.visible').and('include.text', `Logged in as ${userName}`);
});

Then('Logout', () => {
    cy.get('a[href="/logout"]').should('be.visible').click();
    cy.get('.login-form > h2').should('be.visible').and('have.text', 'Login to your account');
});

When('Login', () => {
    cy.get('[data-qa="login-email"]').type('user@email.com');
    cy.get('[data-qa="login-password"]').type('password');
    cy.get('[data-qa="login-button"]').click();
});

Then('Delete account', () => {
    cy.get('a[href="/delete_account]').should('be.visible').and('include.text', 'Delete Account');
    cy.get('h2.title.text-center').should('be.visible').and(($el) => {
        expect($el.text().toLowerCase()).to.eq('ACCOUNT DELETED!'.toLowerCase());
    });
    cy.get('.row p').first().should('be.visible').and('have.text', 'Your account has been permanently deleted!');
    cy.get('[data-qa="continue-button"]').click();
});