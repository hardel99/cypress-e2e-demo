import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I navigate to the Website", () => {
    cy.visit("/");
});

Then("Search bar is visible", () => {
    //
});
