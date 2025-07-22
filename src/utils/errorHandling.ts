import { toast } from 'sonner';

export interface AppError extends Error {
  code?: string;
  details?: any;
  statusCode?: number;
}

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

// Error messages mapping
export const ErrorMessages = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  AUTHENTICATION_ERROR: 'Authentication failed. Please sign in again.',
  PERMISSION_ERROR: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

// Handle different types of errors consistently
export const handleError = (error: unknown, context?: string): string => {
  console.error(`Error in ${context || 'unknown context'}:`, error);

  if (error instanceof ValidationError) {
    return error.message;
  }

  if (error instanceof NetworkError) {
    return ErrorMessages.NETWORK_ERROR;
  }

  if (error instanceof AuthenticationError) {
    return ErrorMessages.AUTHENTICATION_ERROR;
  }

  if (error instanceof Error) {
    // Handle Supabase specific errors
    if (error.message.includes('JWT')) {
      return ErrorMessages.AUTHENTICATION_ERROR;
    }
    
    if (error.message.includes('violates row-level security')) {
      return ErrorMessages.PERMISSION_ERROR;
    }

    if (error.message.includes('not found')) {
      return ErrorMessages.NOT_FOUND;
    }

    return error.message || ErrorMessages.GENERIC_ERROR;
  }

  return ErrorMessages.GENERIC_ERROR;
};

// Show error toast with consistent styling
export const showErrorToast = (error: unknown, context?: string): void => {
  const message = handleError(error, context);
  toast.error(message);
};

// Show success toast
export const showSuccessToast = (message: string): void => {
  toast.success(message);
};

// Create error boundary fallback props
export const createErrorBoundaryProps = (context: string) => ({
  onError: (error: Error, errorInfo: any) => {
    console.error(`Error boundary caught error in ${context}:`, error, errorInfo);
    
    // In production, send to error monitoring service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to Sentry or other monitoring service
    }
  }
});