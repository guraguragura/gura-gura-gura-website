import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import PageLoader from '@/components/common/PageLoader';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { usePerformanceTracking } from '@/hooks/usePerformanceTracking';

// Only load the Coming Soon page
const ComingSoonPage = React.lazy(() => import('./pages/ComingSoonPage'));

function App() {
  // Track performance metrics
  usePerformanceTracking();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Suspense fallback={<PageLoader message="Loading..." />}>
          <Routes>
            {/* All routes go to Coming Soon page */}
            <Route path="/" element={<ComingSoonPage />} />
            {/* Catch all other routes and redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Toaster />
      </div>
    </ErrorBoundary>
  );
}

export default App;
