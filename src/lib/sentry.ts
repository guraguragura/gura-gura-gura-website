import * as Sentry from '@sentry/react'

export const initSentry = () => {
  // Only initialize in production
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.MODE,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
      ],
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      beforeSend(event, hint) {
        // Filter out non-critical errors
        if (event.exception) {
          const error = hint.originalException
          if (error instanceof Error) {
            // Skip certain types of errors
            if (error.message.includes('ResizeObserver loop limit exceeded')) {
              return null
            }
            if (error.message.includes('Non-Error promise rejection')) {
              return null
            }
          }
        }
        return event
      }
    })
  }
}

export const captureError = (error: Error, context?: Record<string, any>) => {
  if (import.meta.env.PROD) {
    Sentry.withScope((scope) => {
      if (context) {
        scope.setContext('additional_info', context)
      }
      Sentry.captureException(error)
    })
  } else {
    console.error('Error:', error, context)
  }
}

export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info') => {
  if (import.meta.env.PROD) {
    Sentry.captureMessage(message, level)
  } else {
    console.log(`[${level}]`, message)
  }
}