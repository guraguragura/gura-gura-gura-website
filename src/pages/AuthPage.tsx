import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import SocialLogin from '@/components/auth/SocialLogin';
import { ScrollArea } from '@/components/ui/scroll-area';

const AuthPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate('/account');
    }
    
    // Only prevent scrolling on login page, not signup page
    if (isLogin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [user, navigate, isLogin]);

  const authContent = (
    <>
      {isLogin ? (
        <LoginForm error={error} setError={setError} />
      ) : (
        <SignupForm error={error} setError={setError} />
      )}

      <SocialLogin isLoading={isLoading} />
    </>
  );

  // Create a split-screen layout for login page, but keep standard layout for signup
  if (isLogin) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left side - Login Form */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-8">
              <img 
                src="/lovable-uploads/fee0a176-d29e-4bbd-9e57-4c3c62a0be2b.png" 
                alt="Gura Logo" 
                className="h-20 w-auto"
              />
            </div>
            
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  Sign In to Your Account
                </CardTitle>
                <CardDescription className="text-center">
                  Welcome back! Sign in to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                {authContent}
              </CardContent>
              <CardFooter>
                <p className="text-center w-full">
                  Don't have an account?{" "}
                  <button
                    onClick={() => {
                      setIsLogin(false);
                      setError(null);
                    }}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        {/* Right side - Image Background */}
        <div className="hidden md:flex md:w-1/2 bg-cyan-100 relative overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-center items-center p-8 z-10">
            <h2 className="text-4xl font-bold text-white mb-4">Shop smart, shop fast,</h2>
            <h2 className="text-4xl font-bold text-white">shop Gura.</h2>
          </div>
          <img 
            src="/lovable-uploads/2b4f1e1c-8388-4e0a-a05c-1efa3ecbb777.png" 
            alt="Gura Shopping" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </div>
    );
  }

  // Standard layout for signup page
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/fee0a176-d29e-4bbd-9e57-4c3c62a0be2b.png" 
            alt="Gura Logo" 
            className="h-20 w-auto"
          />
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Create a New Account
            </CardTitle>
            <CardDescription className="text-center">
              New here? Create an account for yourself or your business and enjoy a whole new way of online shopping!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="max-h-[70vh]">
              {authContent}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <p className="text-center w-full">
              Already have an account?{" "}
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError(null);
                }}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
