///<reference types="cypress"/>

import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import booking from "../../../support/operations/BookingOperations";
import utils from "../../../support/utils";

Given('Authenticate and prepare data', function() {
    // ideally you generate a token by calling an auth endpoint and save it to an env variable
    // but since this is just a demo the value from the api documentation is hardcoded 
    Cypress.env('token', 'abc123');
    Cypress.env('authorization', 'Basic YWRtaW46cGFzc3dvcmQxMjM=');
    booking.createPayloadRequest().then((request) => { 
        this.request = request; 
    });
});

Given('Create a booking', function() {
    booking.createBooking(this.request).then(response => { 
        this.response = response; 
        this.bookingID = this.response.body.bookingid;
    });
});

Then('Validate response is {string}', function(state) {
    booking.validateResponseIs(state, this.response, this.bookingID);
});

When('Get the new booking', function() {
    booking.getBooking(this.bookingID).then((response) => { this.response = response });
});

Then('Validate response content', function() {
    booking.validateResponseMatches(this.request, this.response);
});

When('Update booking {string} value with {string}', function(key, value) {
    this.request[key] = value;
    cy.setCookie('token', Cypress.env('token'));
    booking.updateBooking(this.bookingID, this.request).then(response => {
        this.response = response;
    });
});