
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { Link } from 'react-router-dom';
import SocialLogin from '@/components/auth/SocialLogin';
import { useIsMobile } from '@/hooks/use-mobile';

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(
    searchParams.get('mode') === 'signup' ? 'signup' : 'login'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (user) {
      navigate('/account');
    }
    
    // Prevent scrolling on login page
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [user, navigate]);

  // Update mode if search param changes
  useEffect(() => {
    setMode(searchParams.get('mode') === 'signup' ? 'signup' : 'login');
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Header - Only visible on mobile */}
      {isMobile && (
        <div className="bg-[#84D1D3] p-6 flex flex-col items-center">
          <img 
            src="/lovable-uploads/fee0a176-d29e-4bbd-9e57-4c3c62a0be2b.png" 
            alt="Gura Logo" 
            className="h-10 w-auto mb-2"
          />
          <h2 className="text-2xl font-bold text-white mb-2 text-center">
            Shop smart, shop fast,
          </h2>
          <h2 className="text-2xl font-bold text-white text-center">
            shop Gura.
          </h2>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left side - Login Form */}
        <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-start p-6 md:p-16 overflow-y-auto">
          <div className="w-full max-w-md">
            {!isMobile && (
              <Link to="/" className="inline-block mb-12">
                <img 
                  src="/lovable-uploads/fee0a176-d29e-4bbd-9e57-4c3c62a0be2b.png" 
                  alt="Gura Logo" 
                  className="h-12 w-auto"
                />
              </Link>
            )}
            
            {mode === 'login' ? (
              <>
                <LoginForm error={error} setError={setError} />
                <SocialLogin isLoading={isLoading} />
              </>
            ) : (
              <>
                <SignupForm error={error} setError={setError} />
                <SocialLogin isLoading={isLoading} />
              </>
            )}
          </div>
        </div>
        
        {/* Right side - Image Background - Only visible on desktop */}
        <div className="hidden md:block md:w-1/2 bg-[#84D1D3] relative overflow-hidden">
          <div className="absolute top-16 left-10 z-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Shop smart, shop fast,
            </h2>
            <h2 className="text-4xl font-bold text-white">
              shop Gura.
            </h2>
          </div>
          <img 
            src="/lovable-uploads/d6bdd8f8-3811-4b4e-8c28-1c6334fb88a1.png" 
            alt="Happy shopper" 
            className="absolute inset-0 w-full h-full object-contain object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
