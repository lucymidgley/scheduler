describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.contains("Monday")
  })
  it("should visit root", () => {
    
  });

  it("should navigate to Tuesday", () => {
    cy.get('li').contains("Tuesday")
    .first()
    .click();
  });

  // it("user can create an appointment", () => {
  //   cy.get('[alt="Add"]')
  //   .first()
  //   .click()
  //   cy.get('[data-testid=student-name-input]')
  //   .type("Lydia Miller-Jones")

  //   cy.get('.interviewers__item--selected').should('not.exist')

  //   cy.get('.interviewers__item-image')
  //   .first()
  //   .click()

  //   cy.get('.interviewers__item--selected').should('exist')

  // });
});

