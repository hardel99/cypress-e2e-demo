///<reference types="cypress"/>

import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import booking from "../../../support/operations/BookingOperations";
import utils from "../../../support/utils";

let response = {};

Given('Create a booking', () => {
    booking.createBooking().then(data => {
        response = data;
        cy.printLog(response['status']);
    }).as('bookingCreated');
});

Then('Validate response is successfull', () => {
    cy.wait('@bookingCreated');
    cy.printLog(response);
    utils.verifyResponseStatusCode(response, 200);
});

When('Get the new booking', () => {
    //
});

Then('Validate response content', () => {
    //
});

When('Update booking {string} value with {string}', (key, value) => {
    //
});