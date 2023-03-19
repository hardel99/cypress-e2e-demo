///<reference types="cypress"/>

import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import booking from "../../../support/operations/BookingOperations";
import utils from "../../../support/utils";

Given('Create a booking', function() {
    //booking.createRequest().then((request) => { this.request = request; });
    //booking.createBooking(this.request).then((data) => { this.response = data });
    booking.createBooking().then(data => { 
        this.response = data; 
    });
});

Then('Validate response is successfull', function() {
    utils.verifyResponseStatusCode(this.response, 200);
    expect(this.response.body.bookingid).to.not.be.oneOf([null, '']);
});

When('Get the new booking', function() {
    booking.getBooking(this.response.body.bookingid).then((data) => { this.response = data });
});

Then('Validate response content', function() {
    //
});

When('Update booking {string} value with {string}', function(key, value) {
    //
});