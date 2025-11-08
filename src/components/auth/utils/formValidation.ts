
import { SignupFormState } from "../hooks/useSignupForm";
import { z } from 'zod';

const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');
const emailSchema = z.string().email('Invalid email address');
const nameSchema = z.string().trim().min(1, 'Required').max(100, 'Must be less than 100 characters');
const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');

export const validateSignupForm = (formState: SignupFormState): string | null => {
  const { firstName, lastName, email, phone, password, confirmPassword, agreeToTerms, signupMethod } = formState;

  try {
    nameSchema.parse(firstName);
  } catch (e) {
    return 'Please enter your first name';
  }

  try {
    nameSchema.parse(lastName);
  } catch (e) {
    return 'Please enter your last name';
  }

  if (signupMethod === 'email') {
    try {
      emailSchema.parse(email);
    } catch (e) {
      return 'Please enter a valid email address';
    }
  }

  if (signupMethod === 'phone') {
    try {
      phoneSchema.parse(phone);
    } catch (e) {
      return 'Please enter a valid phone number (e.g., +1234567890)';
    }
  }

  // Always validate phone number field
  try {
    phoneSchema.parse(phone);
  } catch (e) {
    return 'Please enter a valid phone number (e.g., +1234567890)';
  }

  try {
    passwordSchema.parse(password);
  } catch (e) {
    return 'Password must be at least 8 characters';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }

  if (!agreeToTerms) {
    return 'You must agree to the terms and conditions';
  }

  return null;
};
