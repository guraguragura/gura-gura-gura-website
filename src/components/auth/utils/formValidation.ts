
import { SignupFormState } from "../hooks/useSignupForm";

export const validateSignupForm = (formState: SignupFormState): string | null => {
  const { firstName, lastName, email, phone, password, confirmPassword, agreeToTerms, signupMethod } = formState;

  if (!firstName || !lastName) {
    return 'Please enter your first and last name';
  }

  if (signupMethod === 'email' && (!email || !/\S+@\S+\.\S+/.test(email))) {
    return 'Please enter a valid email address';
  }

  if (signupMethod === 'phone' && (!phone || !/^\+?[1-9]\d{1,14}$/.test(phone))) {
    return 'Please enter a valid phone number (e.g., +1234567890)';
  }

  if (!password || password.length < 8) {
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
