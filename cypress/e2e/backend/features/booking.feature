@backend
Feature: Validate Booking API
    """
    As a developer I want to validate Booking API is working by creating a new booking, retrieving the booking just created
    and modifying the booking details
    """

@smoke
Scenario: Create a booking, retrieve it and modify it
    Given Create a booking
    Then Validate response is successfull
    When Get the new booking
    Then Validate response content
    When Update booking "additionalneeds" value with "<updatedValue>"
    Then Validate response is successfull
    When Get the new booking
    Then Validate response content

Examples:
    |       updatedValue      |
    | Aditional needs Updated |