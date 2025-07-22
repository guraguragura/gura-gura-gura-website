
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import CheckoutPage from '../../../pages/CheckoutPage'
import { AuthProvider } from '../../../contexts/AuthContext'
import { CartProvider } from '../../../contexts/CartContext'

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
      getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null }))
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    }))
  }
}))

// Mock payment processing
vi.mock('@/hooks/useCheckout', () => ({
  useCheckout: () => ({
    isLoading: false,
    processPayment: vi.fn().mockResolvedValue({ success: true }),
    error: null
  })
}))

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
)

describe('Checkout Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    
    // Setup cart with items
    const cartItems = [
      {
        id: 'test-product-1',
        title: 'Test Product',
        price: 25.99,
        quantity: 2,
        thumbnail: '/test-image.jpg'
      }
    ]
    localStorage.setItem('gura-cart', JSON.stringify(cartItems))
  })

  it('should render checkout page with cart items', async () => {
    render(
      <TestWrapper>
        <CheckoutPage />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText(/checkout/i)).toBeInTheDocument()
    })
  })

  it('should show total calculation', async () => {
    render(
      <TestWrapper>
        <CheckoutPage />
      </TestWrapper>
    )
    
    await waitFor(() => {
      // Should show subtotal of $51.98 (25.99 * 2)
      expect(screen.getByText(/\$51\.98/)).toBeInTheDocument()
    })
  })

  it('should handle empty cart state', async () => {
    localStorage.setItem('gura-cart', JSON.stringify([]))
    
    render(
      <TestWrapper>
        <CheckoutPage />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
    })
  })
})
