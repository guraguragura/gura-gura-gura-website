describe('App E2E', () => {
  it('should load the application', () => {
    cy.visit('/')
    cy.get('body').should('be.visible')
  })
}) 