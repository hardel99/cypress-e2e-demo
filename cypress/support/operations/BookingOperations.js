///<reference types="cypress"/>

import utils from "../utils";

class BookingOperations {
    createRequest() {
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

    createBooking() {
        let request = {};
        const randomString = utils.getRandomString(4);

        cy.fixture('backend/booking-payload.json').then(data => {
            request = data;
            request.firstname = request.firstname.concat(' ', randomString); 
            request.lastname = request.lastname.concat(' ', randomString); 
            request.totalprice = Math.floor(Math.random() * 100);
            
            cy.sendRequest('POST', '/booking', request).as('response');
        });

        return cy.get('@response');
    }

    getBooking(id) {
        return cy.sendRequest('GET', `/booking/${id}`);
    }
}

export default new BookingOperations;