
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider, useAuth } from '../../../contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import type { User, AuthError } from '@supabase/supabase-js'

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      signInWithOAuth: vi.fn(),
      onAuthStateChange: vi.fn(),
      getSession: vi.fn()
    }
  }
}))

// Create proper mock User object
const mockUser: Partial<User> = {
  id: 'test-user-id',
  email: 'test@example.com',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: '2023-01-01T00:00:00.000Z',
  confirmed_at: '2023-01-01T00:00:00.000Z',
  email_confirmed_at: '2023-01-01T00:00:00.000Z',
  phone: null,
  phone_confirmed_at: null,
  last_sign_in_at: '2023-01-01T00:00:00.000Z',
  role: 'authenticated',
  updated_at: '2023-01-01T00:00:00.000Z'
}

// Create proper mock Subscription object
const mockSubscription = {
  id: 'test-subscription-id',
  callback: vi.fn(),
  unsubscribe: vi.fn()
}

// Create proper mock AuthError
const mockAuthError: Partial<AuthError> = {
  name: 'AuthError',
  message: 'Invalid credentials',
  code: 'invalid_credentials',
  status: 400
}

// Test component to access auth context
const TestComponent = () => {
  const { user, signInWithEmail, signUpWithEmail, signOut } = useAuth()
  
  return (
    <div>
      <div data-testid="user-status">
        {user ? `Logged in as ${user.email}` : 'Not logged in'}
      </div>
      <button onClick={() => signInWithEmail('test@example.com', 'password')}>
        Sign In
      </button>
      <button onClick={() => signUpWithEmail('test@example.com', 'password', 'John', 'Doe')}>
        Sign Up
      </button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock successful auth state setup
    vi.mocked(supabase.auth.onAuthStateChange).mockReturnValue({
      data: { subscription: mockSubscription }
    })
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
      error: null
    })
  })

  it('should provide authentication context', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in')
  })

  it('should handle sign in', async () => {
    const user = userEvent.setup()
    
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { user: mockUser as User, session: null },
      error: null
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await user.click(screen.getByText('Sign In'))
    
    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password'
      })
    })
  })

  it('should handle sign up', async () => {
    const user = userEvent.setup()
    
    vi.mocked(supabase.auth.signUp).mockResolvedValue({
      data: { user: mockUser as User, session: null },
      error: null
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await user.click(screen.getByText('Sign Up'))
    
    await waitFor(() => {
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
        options: {
          data: {
            first_name: 'John',
            last_name: 'Doe'
          }
        }
      })
    })
  })

  it('should handle sign out', async () => {
    const user = userEvent.setup()
    
    vi.mocked(supabase.auth.signOut).mockResolvedValue({ error: null })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await user.click(screen.getByText('Sign Out'))
    
    await waitFor(() => {
      expect(supabase.auth.signOut).toHaveBeenCalled()
    })
  })

  it('should handle authentication errors', async () => {
    const user = userEvent.setup()
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { user: null, session: null },
      error: mockAuthError as AuthError
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await user.click(screen.getByText('Sign In'))
    
    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalled()
    })
    
    consoleSpy.mockRestore()
  })
})
