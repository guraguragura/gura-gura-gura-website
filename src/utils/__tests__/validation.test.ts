import { describe, it, expect } from 'vitest'
import { emailSchema, passwordSchema, phoneSchema, sanitizeInput } from '../validation'

describe('Validation Utils', () => {
  describe('emailSchema', () => {
    it('should validate correct emails', () => {
      expect(() => emailSchema.parse('test@example.com')).not.toThrow()
      expect(() => emailSchema.parse('user.name+tag@domain.co.uk')).not.toThrow()
    })

    it('should reject invalid emails', () => {
      expect(() => emailSchema.parse('invalid-email')).toThrow()
      expect(() => emailSchema.parse('@domain.com')).toThrow()
      expect(() => emailSchema.parse('test@')).toThrow()
    })
  })

  describe('passwordSchema', () => {
    it('should validate strong passwords', () => {
      expect(() => passwordSchema.parse('StrongPass123')).not.toThrow()
      expect(() => passwordSchema.parse('MyPassword1')).not.toThrow()
    })

    it('should reject weak passwords', () => {
      expect(() => passwordSchema.parse('weak')).toThrow()
      expect(() => passwordSchema.parse('password')).toThrow()
      expect(() => passwordSchema.parse('12345678')).toThrow()
    })
  })

  describe('phoneSchema', () => {
    it('should validate correct phone numbers', () => {
      expect(() => phoneSchema.parse('+250788123456')).not.toThrow()
      expect(() => phoneSchema.parse('250788123456')).not.toThrow()
    })

    it('should reject invalid phone numbers', () => {
      expect(() => phoneSchema.parse('123')).toThrow()
      expect(() => phoneSchema.parse('invalid-phone')).toThrow()
    })
  })

  describe('sanitizeInput', () => {
    it('should remove dangerous characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script')
      expect(sanitizeInput('  normal text  ')).toBe('normal text')
    })
  })
})