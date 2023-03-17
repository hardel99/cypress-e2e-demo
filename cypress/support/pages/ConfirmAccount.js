///<reference types="cypress"/>

import utils from "../utils";

class ConfirmAccount {
    get confirmTitle() { return 'h2.title.text-center' }
    get messageLabel() { return '.row p' }
    get continueBtn() { return utils.useDataQaProperty('continue-button') }


    verifyAccountIsSuccessfullyCreated() {
        this.verifyConfirmationMessages('ACCOUNT CREATED!', 'Congratulations! Your new account has been successfully created!');
    }

    verifyAccountIsSuccessfullyDeleted() {
        this.verifyConfirmationMessages('ACCOUNT DELETED!', 'Your account has been permanently deleted!');
    }

    verifyConfirmationMessages(title, message) {
        cy.verifyElementText(this.confirmTitle, title, true);
        cy.verifyElementText(this.messageLabel, message);
        cy.clickAndValidateElement(this.continueBtn);
    }
}

export default new ConfirmAccount;