import React from 'react';
import { cn } from '@/lib/utils';
import LoadingSpinner from './LoadingSpinner';

interface PageLoaderProps {
  message?: string;
  className?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ message = 'Loading...', className }) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 bg-background/70 backdrop-blur-sm flex items-center justify-center animate-enter',
        className
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner className="h-8 w-8" />
        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
    </div>
  );
};

export default PageLoader;
