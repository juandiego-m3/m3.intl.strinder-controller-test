
Feature: Is Search Page working properly?
  Clients need to search in our new search page to find things and stuff

  Scenario: Login in Doctors.net.uk
    Given I open the login page
      And I write user
      And I write password
    When I click the submit button
    Then I see home page

  Scenario: Open Search Page
    Given I open the url 'https://betasearch.doctors.net.uk/'
      And I write user
      And I write password
    When I click the submit button
    Then I see the search box

  Scenario: Search Things and Stuff
    Given I open the url 'https://betasearch.doctors.net.uk'
     And I write user
     And I write password
     And I click the submit button
    Then I see the search box
    When I type things and stuff
    Then I see results
