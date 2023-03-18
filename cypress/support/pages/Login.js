///<reference types="cypress"/>

import utils from "../utils"

class Login {
    get loginTitle() { return '.login-form > h2' }
    get loginEmailField() { return utils.useDataQaProperty('login-email') }
    get loginPasswordField() { return utils.useDataQaProperty('login-password') }
    get loginBtn() { return utils.useDataQaProperty('login-button') }
    get signupTitle() { return '.signup-form > h2' }
    get signupNameField() { return utils.useDataQaProperty('signup-name') }
    get signupEmailField() { return utils.useDataQaProperty('signup-email') }
    get signupBtn() { return utils.useDataQaProperty('signup-button') }
    get loginErrorMessage() { return '.login-form p' }
    get signupErrorMessage() { return '.signup-form p' }


    login(email, password) {
        cy.verifyElementText(this.loginTitle, 'Login to your account');
        cy.typeIntoField(this.loginEmailField, email);
        cy.typeIntoField(this.loginPasswordField, password);
        cy.clickAndValidateElement(this.loginBtn);
    }
    
    signup(user, email) {
        cy.verifyElementText(this.signupTitle, 'New User Signup!');
        cy.typeIntoField(this.signupNameField, user);
        cy.typeIntoField(this.signupEmailField, email);
        cy.clickAndValidateElement(this.signupBtn);
    }

    validateUserIsInLoginScreen(shouldFail = false) {
        cy.verifyURLIncludes(`${shouldFail ? 'signup':'login'}`);
        cy.verifyElementText(this.loginTitle, 'Login to your account');
        cy.verifyElementText(this.signupTitle, 'New User Signup!');
    }

    validateLoginErrorMessage() {
        cy.verifyElementText(this.loginErrorMessage, 'Your email or password is incorrect!');
    }

    validateSignupErrorMessage() {
        cy.verifyElementText(this.signupErrorMessage, 'Email Address already exist!');
    }
}

export default new Login;