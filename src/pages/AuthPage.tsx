
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import SocialLogin from '@/components/auth/SocialLogin';

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
    
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [user, navigate]);

  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
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
              {isLogin ? 'Sign In to Your Account' : 'Create a New Account'}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin 
                ? 'Welcome back! Sign in to access your account' 
                : 'New here? Create an account for yourself or your business and enjoy a whole new way of online shopping!'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLogin ? (
              <LoginForm error={error} setError={setError} />
            ) : (
              <SignupForm error={error} setError={setError} />
            )}

            <SocialLogin isLoading={isLoading} />
          </CardContent>
          <CardFooter>
            <p className="text-center w-full">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                }}
                className="text-blue-600 hover:underline font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
