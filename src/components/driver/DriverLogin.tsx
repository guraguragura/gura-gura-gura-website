
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import DriverAuthHeader from './auth/DriverAuthHeader';
import DriverLoginForm from './auth/DriverLoginForm';
import DriverSignupForm from './auth/DriverSignupForm';

interface LoginFormData {
  identifier: string;
  password: string;
}

interface SignupFormData {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  driverLicense: string;
}

const DriverLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    try {
      // Check if identifier is email or phone
      const isEmail = data.identifier.includes('@');
      
      const { error } = await supabase.auth.signInWithPassword({
        email: isEmail ? data.identifier : `${data.identifier}@temp.com`,
        password: data.password,
      });

      if (error) throw error;
      
      toast.success('Logged in successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        phone: data.phone,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
            driver_license: data.driverLicense,
            user_type: 'driver'
          }
        }
      });

      if (error) throw error;
      
      toast.success('Account created! Please check your email to verify your account.');
    } catch (error: any) {
      toast.error(error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <DriverAuthHeader isLogin={isLogin} />

        <CardContent>
          {isLogin ? (
            <DriverLoginForm onSubmit={handleLogin} loading={loading} />
          ) : (
            <DriverSignupForm onSubmit={handleSignup} loading={loading} />
          )}

          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverLogin;
