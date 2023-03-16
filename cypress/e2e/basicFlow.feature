Feature: Basic Flow
    
    As a new user I want to be able to see products and menus of Home Page, 
    I must be also able to create an account, login with the new account and delete it

Background:
    Given I navigate to the Website

@Smoke @e2e
Scenario: Create a new account, login and delete it
    When Application Home Page is visible
    Then Signup and create a new user with "<user>" and "<email>"
    Then I fill account details with "<title>", "<user>", "<email>", "<password>" and "<dateOfBirth>"
    Then I fill address information with "<firstName>", "<lastName>", "<company>", "<addressLine1>", "<addressLine2>", "<country>", "<state>", "<city>", "<zipCode>" and "<mobileNumber>"
    When Click Create account
    Then Verify account is created successfully
    Then Verify user is logued in as "<user>"
    Then Logout
    When Login with "<email>" and "<password>"
    Then Verify user is logued in as "<user>"
    Then Delete account

Examples:
    |    user    |        email       | password | title | firstName | lastName | dateOfBirth | company |    addressLine1  | addressLine2 |     country   | state |    city  | zipCode |  mobileNumber  |
    | test-user  | user-test@rvn.com  | passw0rd |  ms   |    Jane   |  Watson  |  1999-12-22 |  RAVN   |   425 E Main St  |     aln2     | United States | Texas |  Houston |  75050  | (972) 262-5050 |
    | test-user2 | user-test2@rvn.com | passw0rd |  mr   |   Peter   |   Wayne  |  2002-7-25  |   FOX   | 319 Locust Court | al2:revenge  |    India      | Dehli | New Dehli|  20166  | (703) 450-7555 |