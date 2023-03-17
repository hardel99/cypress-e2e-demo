///<reference types="cypress"/>

import utils from "../utils";
import login from "./Login";

class CreateAccount {
    get accountInformationTitle() { return 'h2.title.text-center' }
    get userNameField() { return utils.useDataQaProperty('name') }
    get emailField() { return utils.useDataQaProperty('email') }
    get countryDropdown() { return utils.useDataQaProperty('country') }
    get dayDropdown() { return utils.useDataQaProperty('days') }
    get monthDropdown() { return utils.useDataQaProperty('months') }
    get yearDropdown() { return utils.useDataQaProperty('years') }
    get firstNameField() { return utils.useDataQaProperty('first_name') }
    get lastNameField() { return utils.useDataQaProperty('last_name') }
    get companyField() { return utils.useDataQaProperty('company') }
    get addressLine1Field() { return utils.useDataQaProperty('address') }
    get addressLine2Field() { return utils.useDataQaProperty('address2') }
    get stateField() { return utils.useDataQaProperty('state') }
    get cityField() { return utils.useDataQaProperty('city') }
    get zipCodeField() { return utils.useDataQaProperty('zipcode') }
    get mobileField() { return utils.useDataQaProperty('mobile_number') }
    get passwordField() { return utils.useDataQaProperty('password') }
    get createAccountBtn() { return utils.useDataQaProperty('create-account') }
    get newsLetterCheckbox() { return '#newsletter' }
    get offersCheckbox() { return '#optin' }
    get userTitlePrefix() { return '#id_gender' }
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

        cy.clickElement(this.userTitle(title));
        cy.verifyFieldValue(this.userNameField, user);
        cy.verifyFieldValue(this.emailField, email);
        cy.typeIntoField(this.passwordField, password);
        
        const date = utils.parseStringToDate(dob);
        cy.selectFromDropdown(this.dayDropdown, date.day);
        cy.selectFromDropdown(this.monthDropdown, date.month);
        cy.selectFromDropdown(this.yearDropdown, date.year);
        
        cy.checkElement(this.newsLetterCheckbox);
        cy.checkElement(this.offersCheckbox);
    }

    fillAddressDetails(firstName, lastName, company, addressLine1, addressLine2, country, state, city, zipCode, mobileNumber) {
        cy.typeIntoField(this.firstNameField, firstName);
        cy.typeIntoField(this.lastNameField, lastName);
        cy.typeIntoField(this.companyField, company);

        cy.typeIntoField(this.addressLine1Field, addressLine1);
        cy.typeIntoField(this.addressLine2Field, addressLine2);
        cy.selectFromDropdown(this.countryDropdown, country);
        cy.typeIntoField(this.stateField, state);
        cy.typeIntoField(this.cityField, city);
        cy.typeIntoField(this.zipCodeField, zipCode);

        cy.typeIntoField(this.mobileField, mobileNumber);
    }

    submitForm() {
        cy.clickAndValidateElement(this.createAccountBtn);
    }
}

export default new CreateAccount