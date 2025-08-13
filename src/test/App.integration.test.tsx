import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App Integration', () => {
  it('renders the main application structure', () => {
    render(<App />)
    // Test that the app renders without throwing errors
    expect(document.body).toBeInTheDocument()
  })
}) 