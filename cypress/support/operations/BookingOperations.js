///<reference types="cypress"/>

import utils from "../utils";

class BookingOperations {
    createPayloadRequest() {
        let request = {};
        const randomString = utils.getRandomString(4);

        cy.fixture('backend/booking-payload.json').then(data => {
            request = data;
            request.firstname = request.firstname.concat(' ', randomString); 
            request.lastname = request.lastname.concat(' ', randomString); 
            request.totalprice = Math.floor(Math.random() * 100);
            
            cy.printLog(request);
            cy.wrap(request).as('request');
        });
        
        return cy.get('@request');
    }

    createBooking(payload) {
        return cy.sendRequest('POST', '/booking', payload)
    }

    getBooking(id) {
        return cy.sendRequest('GET', `/booking/${id}`);
    }

    updateBooking(id, payload) {
        return cy.sendRequest('PUT', `/booking/${id}`, payload, {
            authorization: Cypress.env('authorization')
        });
    }

    validateResponseMatches(request, response) {
        expect(response.body).to.deep.equal(request);
    }
}

export default new BookingOperations;