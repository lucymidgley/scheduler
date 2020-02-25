describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.contains("Monday")
  })
  it("should visit root", () => {
  });

  it("should navigate to Tuesday", () => {
    
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .get('.day-list__item--selected').should('exist')
  });

});
