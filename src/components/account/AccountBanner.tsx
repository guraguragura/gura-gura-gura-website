import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface BannerContent {
  title: string;
  description: string;
}

const AccountBanner = () => {
  const location = useLocation();
  const [firstName, setFirstName] = useState('Customer');
  const { user } = useAuth();
  
  // Fetch customer data to get the first name
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!user) {
        setFirstName('Customer');
        return;
      }

      try {
        // 1) Try customer table by email (most reliable)
        const { data: customer, error: custErr } = await supabase
          .from('customer')
          .select('id, first_name')
          .eq('email', user.email)
          .maybeSingle();

        if (custErr && custErr.code !== 'PGRST116') {
          console.error('Error fetching customer data:', custErr);
        }

        if (customer?.first_name) {
          setFirstName(customer.first_name);
          return;
        }

        // 2) Try default shipping address first_name
        if (customer?.id) {
          const { data: addr } = await supabase
            .from('customer_address')
            .select('first_name, is_default_shipping')
            .eq('customer_id', customer.id)
            .order('is_default_shipping', { ascending: false })
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();
          if (addr?.first_name) {
            setFirstName(addr.first_name);
            return;
          }
        }

        // 3) Try auth metadata fallbacks
        const metaFirst = (user.user_metadata?.first_name as string) || '';
        if (metaFirst) {
          setFirstName(metaFirst);
          return;
        }
        const fullName = (user.user_metadata?.full_name as string) || (user.user_metadata?.name as string) || '';
        if (fullName) {
          setFirstName(fullName.split(' ')[0]);
          return;
        }

        // 4) Fallback
        setFirstName('Customer');
      } catch (error) {
        console.error('Error in fetchCustomerData:', error);
      }
    };

    fetchCustomerData();
  }, [user]);
  
  // Define content based on current path
  const getBannerContent = (): BannerContent => {
    const path = location.pathname;
    
    if (path.includes('/personal-info')) {
      return {
        title: 'Your Personal Information',
        description: 'Manage your personal details and preferences'
      };
    } else if (path.includes('/addresses')) {
      return {
        title: 'Your Addresses',
        description: 'Manage your shipping and billing addresses'
      };
    } else if (path.includes('/wishlist')) {
      return {
        title: 'Your Wishlist',
        description: 'View and manage items saved for later'
      };
    } else if (path.includes('/orders')) {
      return {
        title: 'Your Orders',
        description: 'Track and manage your recent purchases'
      };
    } else if (path.includes('/returns')) {
      return {
        title: 'Your Returns',
        description: 'Manage your return requests and refunds'
      };
    } else {
      return {
        title: 'Your Account',
        description: 'Manage your account settings and preferences'
      };
    }
  };

  const content = getBannerContent();

  return (
    <div className="bg-[#A3E4BF] rounded-lg overflow-hidden mb-6">
      <div className="relative p-8">
        {/* Logo Banner */}
        <div className="absolute top-4 left-4 bg-blue-900 text-white rounded-full px-6 py-3">
          <span className="font-bold text-xl">MyGura</span>
        </div>
        
        {/* Content */}
        <div className="pt-16 pb-4">
          <h1 className="text-blue-900 text-4xl font-bold mb-2">Hello {firstName}</h1>
          <p className="text-blue-900 text-xl">
            {content.description}
          </p>
        </div>
        
        {/* Optional: Decorative Element */}
        <div className="absolute right-8 bottom-4 opacity-50">
          <div className="w-32 h-32 bg-white/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default AccountBanner;
