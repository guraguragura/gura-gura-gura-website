import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner = ({ size = 'md', className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-muted border-t-primary',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const LoadingState = ({ 
  message = 'Loading...', 
  className 
}: { 
  message?: string; 
  className?: string; 
}) => (
  <div className={cn('flex items-center justify-center p-8', className)}>
    <div className="flex items-center gap-3">
      <LoadingSpinner />
      <span className="text-muted-foreground">{message}</span>
    </div>
  </div>
);