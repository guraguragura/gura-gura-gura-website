import { describe, it, expect, vi } from 'vitest'
import { handleError } from '../errorHandling'

describe('Error Handling Utils', () => {
  describe('handleError', () => {
    it('should handle errors', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      handleError(new Error('Test error'), 'Test Context')
      
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })
})