
import { useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { performanceMonitor, trackWebVitals } from '@/utils/monitoring'

export const usePerformanceTracking = () => {
  const location = useLocation()

  useEffect(() => {
    // Track page load performance
    const pageName = location.pathname
    performanceMonitor.trackPageLoad(pageName)
    
    // Track Web Vitals on first load
    if (location.pathname === '/') {
      trackWebVitals()
    }
  }, [location.pathname])

  const trackInteraction = useCallback((action: string) => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const duration = endTime - startTime
      performanceMonitor.trackInteraction(action, duration)
    }
  }, [])

  const trackError = useCallback((error: Error, context?: Record<string, any>) => {
    performanceMonitor.trackError(error, {
      page: location.pathname,
      ...context
    })
  }, [location.pathname])

  return {
    trackInteraction,
    trackError
  }
}
