Feature: Basic Flow

    Background:
        Given I navigate to the Website
    
    @Smoke @e2e
    Scenario: Visiting base URL
        When Website Home Page is visible
        Then Signup and create a new user
        Then I fill account details
        Then I fill address information
        When Click Create account
        Then Verify account is created successfully
        Then Verify user is logued in
        Then Logout
        When Login
        Then Verify user is logued in
        Then Delete account