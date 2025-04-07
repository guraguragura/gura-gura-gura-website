
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { WishlistProvider } from './contexts/WishlistContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <WishlistProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WishlistProvider>
    </AuthProvider>
  </React.StrictMode>,
);
