describe("Appointments", () => {
  beforeEach(() => {
    cy.request("get", "api/debug/reset")
    cy.visit("/")
    cy.contains("Monday")
  })
  
  it("should book an interview", () => {
    cy.get('[alt="Add"]')
    .first()
    .click()
    cy.get('[data-testid=student-name-input]')
    .type("Lydia Miller-Jones")

    cy.get('.interviewers__item--selected').should('not.exist')

    cy.get("[alt='Sylvia Palmer']").click()
    cy.contains("[data-testid=day]", "Monday")
    .contains('1 spot remaining').should('exist')

    cy.get('.interviewers__item--selected').should('exist')
    cy.contains('Save')
    .click()
    cy.contains('Saving').should('exist')
    cy.contains('Lydia Miller-Jones').should('exist')
    cy.contains("[data-testid=day]", "Monday")
    .contains('no spots remaining').should('exist')


  });

  it("should edit an existing interview", () => {
    cy.get('[alt="Edit"]').first()
    .click({ force: true })
    cy.get('[data-testid=student-name-input]')
    .clear()
    .type('Nikolai Rimsky-Korsakov')

    cy.get("[alt='Tori Malcolm']").click()
    cy.get('.interviewers__item--selected').should('exist')
    cy.contains('Save')
    .click()
    cy.contains('Saving').should('exist')
    cy.contains('Nikolai Rimsky-Korsakov').should('exist')
    cy.contains("[data-testid=day]", "Monday")
    .contains('1 spot remaining').should('exist')
    


  });

  it("should delete an existing interview", () => {
    cy.get('[alt="Delete"]').first()
    .click({ force: true })
    cy.contains('Delete the appointment?').should('exist')
    cy.contains('Confirm')
    .click()
    cy.contains('Deleting').should('exist')
    cy.contains('Deleting').should('not.exist')
    cy.contains(".appointment__card--show", "Archie Cohen").should('not.exist');
    cy.contains("[data-testid=day]", "Monday")
    .contains('2 spots remaining').should('exist')
    


  });

});



  