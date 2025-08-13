import { describe, it, expect, vi } from 'vitest'
import { handleError, ValidationError, NetworkError, AuthenticationError } from '../errorHandling'

describe('Error Handling Utils', () => {
  describe('handleError', () => {
    it('should handle ValidationError', () => {
      const error = new ValidationError('Validation failed', 'email')
      const result = handleError(error, 'Test Context')
      
      expect(result).toBe('Validation failed')
    })

    it('should handle NetworkError', () => {
      const error = new NetworkError('Connection failed', 500)
      const result = handleError(error, 'Test Context')
      
      expect(result).toBe('Network connection failed. Please check your internet connection.')
    })

    it('should handle AuthenticationError', () => {
      const error = new AuthenticationError('Auth failed')
      const result = handleError(error, 'Test Context')
      
      expect(result).toBe('Authentication failed. Please sign in again.')
    })

    it('should handle generic Error', () => {
      const error = new Error('Generic error')
      const result = handleError(error, 'Test Context')
      
      expect(result).toBe('Generic error')
    })

    it('should handle unknown error types', () => {
      const result = handleError('String error', 'Test Context')
      
      expect(result).toBe('An unexpected error occurred. Please try again.')
    })
  })
})