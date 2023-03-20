@backend @frontend @e2e @sanity
Feature: Validate JSON schema
    """
    As a developer, I want to verify API is structure is consistence
    """
Background: Prepare data
    Given sdfasd

Scenario: Validate JSON schema with a third party application
    Given I consult "/berries" endpoint
    Then Validate response is "successfull"
    Then Generate JSON schema
    Given I navigate to the "schema validator"
    Then Generate third party JSON schema
    Then Validate JSON schemas are matching
