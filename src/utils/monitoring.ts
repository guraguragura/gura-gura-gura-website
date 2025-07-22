
import { captureError, captureMessage } from '@/lib/sentry'

export interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  interactionTime: number
  memoryUsage?: number
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: PerformanceMetrics[] = []

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  trackPageLoad(pageName: string): void {
    if (typeof window === 'undefined') return

    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    if (navigationEntry) {
      const metrics: PerformanceMetrics = {
        loadTime: navigationEntry.loadEventEnd - navigationEntry.fetchStart,
        renderTime: navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart,
        interactionTime: navigationEntry.domInteractive - navigationEntry.fetchStart
      }

      // Track memory usage if available
      if ('memory' in performance) {
        const memInfo = (performance as any).memory
        metrics.memoryUsage = memInfo.usedJSHeapSize
      }

      this.metrics.push(metrics)
      this.reportMetrics(pageName, metrics)
    }
  }

  trackInteraction(action: string, duration: number): void {
    captureMessage(`User interaction: ${action} took ${duration}ms`, 'info')
    
    // Alert on slow interactions
    if (duration > 100) {
      captureMessage(`Slow interaction detected: ${action} took ${duration}ms`, 'warning')
    }
  }

  trackError(error: Error, context: Record<string, any>): void {
    captureError(error, {
      ...context,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href
    })
  }

  private reportMetrics(pageName: string, metrics: PerformanceMetrics): void {
    // Report performance metrics
    captureMessage(`Page performance: ${pageName}`, 'info')
    
    // Alert on slow page loads
    if (metrics.loadTime > 3000) {
      captureMessage(`Slow page load detected: ${pageName} took ${metrics.loadTime}ms`, 'warning')
    }
  }

  getAverageMetrics(): PerformanceMetrics | null {
    if (this.metrics.length === 0) return null

    const totals = this.metrics.reduce(
      (acc, metric) => ({
        loadTime: acc.loadTime + metric.loadTime,
        renderTime: acc.renderTime + metric.renderTime,
        interactionTime: acc.interactionTime + metric.interactionTime,
        memoryUsage: acc.memoryUsage + (metric.memoryUsage || 0)
      }),
      { loadTime: 0, renderTime: 0, interactionTime: 0, memoryUsage: 0 }
    )

    const count = this.metrics.length
    return {
      loadTime: totals.loadTime / count,
      renderTime: totals.renderTime / count,
      interactionTime: totals.interactionTime / count,
      memoryUsage: totals.memoryUsage / count
    }
  }
}

// Web Vitals tracking
export const trackWebVitals = (): void => {
  if (typeof window === 'undefined') return

  // Track Core Web Vitals
  import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
    onCLS((metric) => {
      captureMessage(`CLS: ${metric.value}`, metric.value > 0.1 ? 'warning' : 'info')
    })

    onFID((metric) => {
      captureMessage(`FID: ${metric.value}ms`, metric.value > 100 ? 'warning' : 'info')
    })

    onFCP((metric) => {
      captureMessage(`FCP: ${metric.value}ms`, metric.value > 1800 ? 'warning' : 'info')
    })

    onLCP((metric) => {
      captureMessage(`LCP: ${metric.value}ms`, metric.value > 2500 ? 'warning' : 'info')
    })

    onTTFB((metric) => {
      captureMessage(`TTFB: ${metric.value}ms`, metric.value > 800 ? 'warning' : 'info')
    })
  }).catch((error) => {
    console.warn('Failed to load web-vitals:', error)
  })
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance()
