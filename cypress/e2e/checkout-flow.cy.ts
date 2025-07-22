
describe('E2E: Complete Checkout Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should complete full checkout journey', () => {
    // Navigate to a product
    cy.contains('Shop Now').click()
    
    // Add product to cart
    cy.get('[data-testid="product-card"]').first().click()
    cy.get('[data-testid="add-to-cart"]').click()
    
    // Verify cart updated
    cy.get('[data-testid="cart-count"]').should('contain', '1')
    
    // Go to cart
    cy.get('[data-testid="cart-button"]').click()
    cy.url().should('include', '/cart')
    
    // Proceed to checkout
    cy.contains('Proceed to Checkout').click()
    cy.url().should('include', '/checkout')
    
    // Fill shipping information
    cy.get('[data-testid="first-name"]').type('John')
    cy.get('[data-testid="last-name"]').type('Doe')
    cy.get('[data-testid="email"]').type('john.doe@example.com')
    cy.get('[data-testid="address"]').type('123 Main St')
    cy.get('[data-testid="city"]').type('Kigali')
    
    // Select payment method
    cy.get('[data-testid="payment-method"]').select('credit-card')
    
    // Complete order (mock payment)
    cy.get('[data-testid="place-order"]').click()
    
    // Verify success
    cy.url().should('include', '/payment/success')
    cy.contains('Order confirmed').should('be.visible')
  })

  it('should handle authentication flow', () => {
    // Try to access protected route
    cy.visit('/account')
    cy.url().should('include', '/auth')
    
    // Sign up
    cy.contains('Create Account').click()
    cy.get('[data-testid="first-name"]').type('Jane')
    cy.get('[data-testid="last-name"]').type('Smith')
    cy.get('[data-testid="email"]').type('jane.smith@example.com')
    cy.get('[data-testid="password"]').type('SecurePass123!')
    cy.get('[data-testid="confirm-password"]').type('SecurePass123!')
    cy.get('[data-testid="terms-checkbox"]').check()
    
    cy.get('[data-testid="submit-signup"]').click()
    
    // Should redirect to account page
    cy.url().should('include', '/account')
  })

  it('should handle responsive design', () => {
    // Test mobile viewport
    cy.viewport(375, 667)
    
    // Check mobile navigation
    cy.get('[data-testid="mobile-menu-button"]').click()
    cy.get('[data-testid="mobile-menu"]').should('be.visible')
    
    // Test tablet viewport
    cy.viewport(768, 1024)
    
    // Navigate to products
    cy.contains('Shop Now').click()
    
    // Verify responsive grid
    cy.get('[data-testid="product-grid"]').should('be.visible')
    
    // Test desktop viewport
    cy.viewport(1920, 1080)
    
    // Verify desktop layout
    cy.get('[data-testid="desktop-nav"]').should('be.visible')
  })
})
