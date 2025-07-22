import { z } from 'zod';

// Email validation schema
export const emailSchema = z.string().email('Please enter a valid email address');

// Phone validation schema
export const phoneSchema = z.string().regex(
  /^\+?[1-9]\d{1,14}$/,
  'Please enter a valid phone number'
);

// Password validation schema
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number');

// Name validation schema
export const nameSchema = z.string()
  .min(1, 'This field is required')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

// Address validation schema
export const addressSchema = z.object({
  first_name: nameSchema,
  last_name: nameSchema,
  address_1: z.string().min(1, 'Address is required').max(200, 'Address is too long'),
  address_2: z.string().max(200, 'Address is too long').optional(),
  city: z.string().min(1, 'City is required').max(100, 'City name is too long'),
  province: z.string().min(1, 'Province/State is required'),
  postal_code: z.string().min(1, 'Postal code is required').max(20, 'Postal code is too long'),
  country_code: z.string().length(2, 'Invalid country code'),
  phone: phoneSchema,
  company: z.string().max(100, 'Company name is too long').optional(),
});

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove < and > characters
    .trim(); // Remove leading/trailing whitespace
};

// Validate and sanitize form data
export const validateAndSanitizeFormData = <T extends Record<string, unknown>>(
  data: T,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; errors: string[] } => {
  try {
    // Sanitize string fields
    const sanitizedData = Object.keys(data).reduce((acc, key) => {
      const value = data[key];
      (acc as any)[key] = typeof value === 'string' ? sanitizeInput(value) : value;
      return acc;
    }, {} as T);

    // Validate with schema
    const validatedData = schema.parse(sanitizedData);
    
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => err.message);
      return { success: false, errors };
    }
    return { success: false, errors: ['Validation failed'] };
  }
};