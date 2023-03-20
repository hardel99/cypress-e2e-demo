@frontend
Feature: Create Account and Login
    """
    As a new user I want to be able to see products and menus of Home Page, 
    I must be also able to create an account, login with the new account and delete it
    """

Background:
    Given I navigate to the Website

@regression @e2e
Scenario: Create a new account, login and delete it
    When Application Home Page is visible
    Then Go to Login Page
    Then Signup and create a new user with "<user>" and "<email>"
    Then I fill account details with "<title>", "<user>", "<email>", "<password>" and "<dateOfBirth>"
    Then I fill address information with "<firstName>", "<lastName>", "<company>", "<addressLine1>", "<addressLine2>", "<country>", "<state>", "<city>", "<zipCode>" and "<mobileNumber>"
    When Click Create account
    Then Verify account is created successfully
    When Application Home Page is visible
    Then Verify user is logued in as "<user>"
    Then Logout
    When Login with "<email>" and "<password>"
    Then Verify user is logued in as "<user>"
    Then Delete account

Examples:
    |    user    |        email       | password | title | firstName | lastName | dateOfBirth | company |    addressLine1  | addressLine2 |     country   | state |    city  | zipCode |  mobileNumber  |
    | test-user  | user-test@rvn.com  | passw0rd |  ms   |    Jane   |  Watson  |  1999-12-22 |  RAVN   |   425 E Main St  |     aln2     | United States | Texas |  Houston |  75050  | (972) 262-5050 |
    | test-user2 | user-test2@rvn.com | passw0rd |  mr   |   Peter   |   Wayne  |  2002-7-25  |   FOX   | 319 Locust Court | al2:revenge  |    India      | Dehli | New Dehli|  20166  | (703) 450-7555 |


@negative @smoke
Scenario: Login with wrong credentials
    When Application Home Page is visible
    Then Go to Login Page
    When Login with "<email>" and "<password>"
    Then Verify user is not able to "login"

Examples:
    |      email    |     password     |
    | non@exist.com | non-existantPass |


@negative @ignore @e2e @sanity
Scenario: SignUp with existing account credentials
    When Application Home Page is visible
    Then Go to Login Page
    Given Create dummy account with "<user>", "<email>" and "<password>"
    Then Logout
    Then Signup and create a new user with "<user>" and "<email>"
    Then Verify user is not able to "signup"
    When Login with "<email>" and "<password>"
    Then Delete account

Examples:
    |   user    |          email        | password |
    | temp-user | temp@cypress-user.com | passw0rd |


@smoke @ignore @sanity
Scenario: Login with existing user
    When Application Home Page is visible
    Then Go to Login Page
    When Login with "<email>" and "<password>"
    Then Verify user is logued in as "<user>"
    Then Logout

Examples:
    |  user  |        email     | password |
    | cyuser | cypress@user.com | passw0rd |
