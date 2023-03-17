///<reference types="cypress"/>

import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import confirmAccount from "../../support/pages/ConfirmAccount";
import createAccount from "../../support/pages/CreateAccount";
import homePage from "../../support/pages/HomePage";
import login from "../../support/pages/Login";

Given('I navigate to the Website', () => {
    cy.visit('/');
});

When('Application Home Page is visible', () => {
    homePage.validateHomePageElements()
});

Then('Signup and create a new user with {string} and {string}', (user, email) => {
    homePage.navigateToLoginPage();
    login.signup(user, email);
});

Then('I fill account details with {string}, {string}, {string}, {string} and {string}', (title, user, email, password, dob) => {
    createAccount.fillSignupDetails(title, user, email, password, dob);
});

Then('I fill address information with {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string} and {string}', (firstName, lastName, company, addressLine1, addressLine2, country, state, city, zipCode, mobileNumber) => {
    createAccount.fillAddressDetails(firstName, lastName, company, addressLine1, addressLine2, country, state, city, zipCode, mobileNumber);
});

When('Click Create account', () => {
    createAccount.submitForm();
});

Then('Verify account is created successfully', () => {
    confirmAccount.verifyAccountIsSuccessfullyCreated();
});

Then('Verify user is logued in as {string}', (user) => {
    homePage.verifyUserIsLoginAs(user);
});

Then('Logout', () => {
    homePage.logout();
    login.validateUserIsInLoginScreen();
});

When('Login with {string} and {string}', (email, password) => {
    login.login(email, password);
});

Then('Delete account', () => {
    homePage.navigateToDeleteAccountnPage();
    confirmAccount.verifyAccountIsSuccessfullyDeleted();
});