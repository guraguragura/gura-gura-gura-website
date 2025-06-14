
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface DriverProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  email: string | null;
  driver_license: string | null;
  vehicle_type: string;
  is_active: boolean;
  is_available: boolean;
  current_location: any;
  metadata: any;
  created_at: string;
  updated_at: string;
}

export const useDriverAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [driverProfile, setDriverProfile] = useState<DriverProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchDriverProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchDriverProfile(session.user.id);
        } else {
          setDriverProfile(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchDriverProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('driver_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching driver profile:', error);
      } else {
        setDriverProfile(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateAvailability = async (isAvailable: boolean) => {
    if (!driverProfile) return;

    try {
      const { error } = await supabase
        .from('driver_profiles')
        .update({ is_available: isAvailable })
        .eq('id', driverProfile.id);

      if (error) throw error;

      setDriverProfile({ ...driverProfile, is_available: isAvailable });
    } catch (error) {
      console.error('Error updating availability:', error);
      throw error;
    }
  };

  return {
    user,
    driverProfile,
    loading,
    signOut,
    updateAvailability,
    isAuthenticated: !!user && !!driverProfile
  };
};
