///<reference types="cypress"/>

import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import createAccount from "../pages/CreateAccount";
import homePage from "../pages/HomePage";
import login from "../pages/Login";

Given('I navigate to the Website', () => {
    cy.visit('/');
});

When('Application Home Page is visible', () => {
    //valdiate home page elements
});

Then('Signup and create a new user with {string} and {string}', (user, email) => {
    homePage.navigateToLoginPage();
    login.signup(user, email);
});

Then('I fill account details with {string}, {string}, {string}, {string} and {string}', (title, user, email, password, dob) => {
    createAccount.fillSignupDetails(title, user, email, password, dob);
});

Then('I fill address information with {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string} and {string}', (firstName, lastName, company, addressLine1, addressLine2, country, state, city, zipCode, mobileNumber) => {
    cy.get('[data-qa="first_name"]').type(firstName);
    cy.get('[data-qa="last_name"]').type(lastName);
    cy.get('[data-qa="company"]').type(company);
    cy.get('[data-qa="address"]').type(addressLine1);
    cy.get('[data-qa="address2"]').type(addressLine2);
    cy.get('[data-qa="country"]').select(country);
    cy.get('[data-qa="state"]').type(state);
    cy.get('[data-qa="city"]').type(city);
    cy.get('[data-qa="zipcode"]').type(zipCode);
    cy.get('[data-qa="mobile_number"]').type(mobileNumber);
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

Then('Verify user is logued in as {string}', (user) => {
    let userName = 'user-test';
    cy.contains('Logged in as').should('be.visible').and('include.text', `Logged in as ${user}`);
});

Then('Logout', () => {
    cy.get('a[href="/logout"]').should('be.visible').click();
    cy.get('.login-form > h2').should('be.visible').and('have.text', 'Login to your account');
});

When('Login with "<email>" and "<password>"', (email, password) => {
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password);
    cy.get('[data-qa="login-button"]').click();
});

Then('Delete account', () => {
    cy.get('a[href="/delete_account"]').should('be.visible').and('include.text', 'Delete Account').click();
    cy.get('h2.title.text-center').should('be.visible').and(($el) => {
        expect($el.text().toLowerCase()).to.eq('ACCOUNT DELETED!'.toLowerCase());
    });
    cy.get('.row p').first().should('be.visible').and('have.text', 'Your account has been permanently deleted!');
    cy.get('[data-qa="continue-button"]').click();
});