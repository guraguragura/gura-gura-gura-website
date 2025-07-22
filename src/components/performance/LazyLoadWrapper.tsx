
import React, { Suspense, memo } from 'react'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'

interface LazyLoadWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  height?: string
}

export const LazyLoadWrapper = memo(({ 
  children, 
  fallback,
  height = "200px" 
}: LazyLoadWrapperProps) => {
  const defaultFallback = (
    <div className="flex items-center justify-center" style={{ height }}>
      <LoadingSpinner />
    </div>
  )

  return (
    <ErrorBoundary>
      <Suspense fallback={fallback || defaultFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
})

LazyLoadWrapper.displayName = 'LazyLoadWrapper'
