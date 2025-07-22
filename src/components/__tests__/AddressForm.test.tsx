import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import AddressForm from '../account/AddressForm'

// Mock dependencies
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user' },
    isAuthenticated: true
  })
}))

vi.mock('@/hooks/useCustomerProfile', () => ({
  useCustomerProfile: () => ({
    customer: { id: 'test-customer' },
    isLoading: false
  })
}))

vi.mock('@/services/geocoding', () => ({
  geocodeAddress: vi.fn().mockResolvedValue({
    lat: -1.9441,
    lng: 30.0619,
    formatted_address: 'Kigali, Rwanda'
  })
}))

describe('AddressForm', () => {
  const mockOnClose = vi.fn()
  const mockOnAddressAdded = vi.fn()

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onAddressAdded: mockOnAddressAdded
  }

  it('should render component', () => {
    const { container } = render(<AddressForm {...defaultProps} />)
    expect(container).toBeTruthy()
  })
})