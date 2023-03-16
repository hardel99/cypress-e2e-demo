///<reference types="cypress" />

class HomePage {
    get logo() { return 'a > img' };
    get login_link() { return 'Signup / Login'};

    navigateToLoginPage() {
        cy.contains(this.login_link).click();
    }
}

export default new HomePage;