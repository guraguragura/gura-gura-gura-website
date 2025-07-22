
// Custom Cypress commands for reusable test functionality

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      addToCart(productId: string): Chainable<void>
      clearCart(): Chainable<void>
      mockPayment(): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/auth')
    cy.get('[data-testid="email"]').type(email)
    cy.get('[data-testid="password"]').type(password)
    cy.get('[data-testid="submit-login"]').click()
    cy.url().should('not.include', '/auth')
  })
})

Cypress.Commands.add('addToCart', (productId: string) => {
  cy.window().then((win) => {
    const cartItems = JSON.parse(win.localStorage.getItem('gura-cart') || '[]')
    cartItems.push({
      id: productId,
      title: 'Test Product',
      price: 25.99,
      quantity: 1,
      thumbnail: '/test-image.jpg'
    })
    win.localStorage.setItem('gura-cart', JSON.stringify(cartItems))
  })
})

Cypress.Commands.add('clearCart', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('gura-cart')
  })
})

Cypress.Commands.add('mockPayment', () => {
  cy.intercept('POST', '**/payment/**', {
    statusCode: 200,
    body: { success: true, paymentId: 'mock-payment-123' }
  }).as('mockPayment')
})

export {}
