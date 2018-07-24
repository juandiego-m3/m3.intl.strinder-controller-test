// Variables
const LOGIN = "http://www.doctors.net.uk/Login/Login.aspx?go=true"
const SEARCH = "http://betasearch.doctors.net.uk"
const USER = 'doctors-mess'
const PWD = ''

// Search Process
describe('Search Process', function () {
  // Login
  it('User can Login', function () {
    cy.visit(SEARCH);
    cy.get('#aspnetForm');
    cy.get('#ctl00_cCphContent_cTxtUsername').type(USER);
    cy.get('#ctl00_cCphContent_cTxtPassword').type(PWD);
    cy.get('#ctl00_cCphContent_cBtnLogin').click();
    cy.url().should('include', 'search');
  })
  // Search
  it("User can search", function () {
    cy.get(".page-search-result")
    cy.get("#greyBarWrapper")
    cy.get("#query").click()
    cy.get("#query").type('cancer{enter}')
    cy.get(".search-results")
  });
  // Filter
  it("User can filter", function () {
    cy.get('h4').contains('Filter by').first().parent().parent().click();
    cy.get('#searchControlsPopup > div > div > div.modal-body > div > div.filters > div > ul > li:nth-child(4) > label').first().parent().click();
  })
})
