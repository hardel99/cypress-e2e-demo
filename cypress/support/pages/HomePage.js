///<reference types="cypress" />

class HomePage {
    get logo() { return '[alt="Website for automation practice"]' }
    get productCard() { return '.product-image-wrapper' }
    get header() { return '#header' }
    get slider() { return '#slider' }
    get footer() { return '#footer' }
    get loginLink() { return 'a[href="/login"]'}
    get logoutLink() { return 'a[href="/logout"]'}
    get deleteAccountLink() { return 'a[href="/delete_account"]' }
    get userLabel() { return 'Logged in as' }


    validateHomePageElements() {
        cy.verifyURLIncludes(); //empty params to check url = baseUrl
        cy.verifyElementExist(this.logo);
        cy.verifyElementExist(this.productCard);
        cy.verifyElementExist(this.header);
        cy.verifyElementExist(this.slider);
        cy.verifyElementExist(this.footer);
    }
    
    navigateToLoginPage() {
        cy.verifyElementExist(this.loginLink);
        cy.clickElement(this.loginLink);
        cy.verifyURLIncludes('login');
    }

    navigateToDeleteAccountnPage() {
        cy.verifyElementExist(this.logoutLink);
        cy.clickElement(this.deleteAccountLink);
        cy.verifyURLIncludes('delete_account');
    }

    verifyUserIsLoginAs(user) {
        cy.verifyElementTextByContains(this.userLabel, `Logged in as ${user}`);
        cy.verifyElementExist(this.logoutLink);
    }

    logout() {
        cy.verifyElementExistByText(this.userLabel);
        cy.clickElement(this.logoutLink);
        cy.verifyURLIncludes('login');
    }
}

export default new HomePage;