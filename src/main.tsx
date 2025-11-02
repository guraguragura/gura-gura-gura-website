
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { WishlistProvider } from './contexts/WishlistContext.tsx';
import { CartProvider } from './contexts/CartContext.tsx';
import { CrispProvider } from './components/crisp/CrispProvider.tsx';
import { initSentry } from './lib/sentry';

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Initialize error monitoring
initSentry();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CrispProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </QueryClientProvider>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </CrispProvider>
  </React.StrictMode>,
);
