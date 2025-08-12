import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import AddressForm from '../account/address/AddressForm'

// Mock dependencies
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user' },
    isAuthenticated: true
  })
}))

vi.mock('@/hooks/useCustomerProfile', () => ({
  useCustomerProfile: () => ({
    customer: { id: 'test-customer', first_name: 'John', last_name: 'Doe' },
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

  it('should render component without crashing', () => {
    const { container } = render(<AddressForm {...defaultProps} />)
    expect(container).toBeTruthy()
    expect(screen.getByTestId('address-modal-title')).toHaveTextContent('Add New Address')
  })

  it('should NOT render first and last name fields', () => {
    render(<AddressForm {...defaultProps} />)
    expect(screen.queryByText(/First Name/i)).toBeNull()
    expect(screen.queryByText(/Last Name/i)).toBeNull()
  })
})
