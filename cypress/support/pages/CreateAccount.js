///<reference types="cypress"/>

import utils from "../utils";
import login from "./Login";

class CreateAccount {
    get accountInformationTitle() { return 'h2.title.text-center' };
    get dayDropdown() { return utils.useDataQaProperty('days') };
    get monthDropdown() { return utils.useDataQaProperty('months') };
    get yearDropdown() { return utils.useDataQaProperty('years') };
    get passwordField() { return utils.useDataQaProperty('password') };
    get newsLetterCheckbox() { return '#newsletter' };
    get offersCheckbox() { return '#optin' };
    get userTitlePrefix() { return '#id_gender' };
    userTitle(title) {
        let genderLocatorSufix = ''; //1 for mr || 2 for ms
        if(title.toLowerCase() === 'mr') {
            genderLocatorSufix = '1';
        } else if(title.toLowerCase() === 'ms') {
            genderLocatorSufix = '2';
        } else {
            throw new Error('Please provide a valid title');
        }

        return this.userTitlePrefix + genderLocatorSufix;
    }

    fillSignupDetails(title, user, email, password, dob) {
        cy.verifyElementText(this.accountInformationTitle, 'Enter Account Information');
        
        let genderLocatorSufix = ''; //1 for mr || 2 for ms
        if(title.toLowerCase() === 'mr') {
            genderLocatorSufix = '1';
        } else if(title.toLowerCase() === 'ms') {
            genderLocatorSufix = '2';
        } else {
            throw new Error('Please provide a valid title');
        }

        cy.get(this.userTitle(title)).click();
        cy.verifyFieldValue(login.signupName, user);
        cy.verifyFieldValue(login.signupEmail, email);
        cy.typeIntoField(this.passwordField, password);
        //break dob
        cy.selectFromDropdown(this.dayDropdown, '2');
        cy.selectFromDropdown(this.monthDropdown, 'February');
        cy.selectFromDropdown(this.yearDropdown, '1999');
        cy.checkElement(this.newsLetterCheckbox);
        cy.checkElement(this.offersCheckbox);
    }
}

export default new CreateAccount