# Testing Guide

This project uses multiple testing frameworks to ensure code quality and reliability.

## Test Scripts

- `npm test` - Run tests in watch mode
- `npm run test:unit` - Run unit tests once
- `npm run test:integration` - Run integration tests once
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ui` - Run tests with Vitest UI

## Test Types

### Unit Tests
- Located in `src/**/*.test.{ts,tsx}`
- Use Vitest + React Testing Library
- Test individual components and functions

### Integration Tests
- Located in `src/**/*.integration.test.{ts,tsx}`
- Use separate Vitest configuration
- Test component interactions

### E2E Tests
- Located in `cypress/e2e/**/*.cy.{ts,tsx}`
- Use Cypress
- Test full user workflows

## Running Tests Locally

1. Install dependencies: `npm install`
2. Run unit tests: `npm run test:unit`
3. Run integration tests: `npm run test:integration`
4. Run E2E tests: `npm run test:e2e`

## CI/CD Pipeline

The GitHub Actions workflow automatically runs:
- Linting
- Type checking
- Unit tests
- Integration tests
- Security audit
- Build verification
- Deployment (on main branch) 