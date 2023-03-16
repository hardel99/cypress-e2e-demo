///<reference types="cypress"/>

import utils from "../utils"

class Login {
    get loginTitle() { return '.login-form > h2' };
    get signupTitle() { return '.signup-form > h2' };
    get signupName() { return utils.useDataQaProperty('signup-name') };
    get signupEmail() { return utils.useDataQaProperty('signup-email') };
    get signupButton() { return utils.useDataQaProperty('signup-button') };

    signup(user, email) {
        cy.get(this.signupTitle).should('be.visible').and('have.text', 'New User Signup!');
        cy.typeIntoField(this.signupName, user);
        cy.typeIntoField(this.signupEmail, email);
        cy.get(this.signupButton).click();
    }
}

export default new Login;