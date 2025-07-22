
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider, useCart } from '../../../contexts/CartContext'

// Mock product data
const mockProduct = {
  id: 'test-product-1',
  title: 'Test Product',
  price: 25.99,
  thumbnail: '/test-image.jpg'
}

// Test component to access cart context
const TestComponent = () => {
  const { items, addToCart, removeFromCart, updateQuantity, clearCart, total } = useCart()
  
  return (
    <div>
      <div data-testid="cart-count">{items.length}</div>
      <div data-testid="cart-total">${total.toFixed(2)}</div>
      <button onClick={() => addToCart(mockProduct)}>Add to Cart</button>
      <button onClick={() => removeFromCart('test-product-1')}>Remove from Cart</button>
      <button onClick={() => updateQuantity('test-product-1', 2)}>Update Quantity</button>
      <button onClick={clearCart}>Clear Cart</button>
      {items.map(item => (
        <div key={item.id} data-testid={`cart-item-${item.id}`}>
          {item.title} - Qty: {item.quantity}
        </div>
      ))}
    </div>
  )
}

describe('CartContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('should provide cart context with empty initial state', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$0.00')
  })

  it('should add items to cart', async () => {
    const user = userEvent.setup()
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    await user.click(screen.getByText('Add to Cart'))
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('$25.99')
      expect(screen.getByTestId('cart-item-test-product-1')).toHaveTextContent('Test Product - Qty: 1')
    })
  })

  it('should update quantity when adding existing item', async () => {
    const user = userEvent.setup()
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Add item twice
    await user.click(screen.getByText('Add to Cart'))
    await user.click(screen.getByText('Add to Cart'))
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
      expect(screen.getByTestId('cart-item-test-product-1')).toHaveTextContent('Test Product - Qty: 2')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('$51.98')
    })
  })

  it('should remove items from cart', async () => {
    const user = userEvent.setup()
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Add then remove item
    await user.click(screen.getByText('Add to Cart'))
    await user.click(screen.getByText('Remove from Cart'))
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('$0.00')
    })
  })

  it('should update item quantity', async () => {
    const user = userEvent.setup()
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Add item then update quantity
    await user.click(screen.getByText('Add to Cart'))
    await user.click(screen.getByText('Update Quantity'))
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-item-test-product-1')).toHaveTextContent('Test Product - Qty: 2')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('$51.98')
    })
  })

  it('should clear entire cart', async () => {
    const user = userEvent.setup()
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Add items then clear cart
    await user.click(screen.getByText('Add to Cart'))
    await user.click(screen.getByText('Clear Cart'))
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('$0.00')
    })
  })

  it('should persist cart state in localStorage', async () => {
    const user = userEvent.setup()
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    await user.click(screen.getByText('Add to Cart'))
    
    await waitFor(() => {
      const savedCart = JSON.parse(localStorage.getItem('gura-cart') || '[]')
      expect(savedCart).toHaveLength(1)
      expect(savedCart[0].id).toBe('test-product-1')
    })
  })
})
