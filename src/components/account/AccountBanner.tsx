
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface BannerContent {
  title: string;
  description: string;
}

const AccountBanner = () => {
  const location = useLocation();
  const [firstName, setFirstName] = useState('Customer');
  
  // Fetch customer data to get the first name
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        // Get first customer record as placeholder
        // In a real application, you would fetch the specific customer based on authentication
        const { data, error } = await supabase
          .from('customer')
          .select('first_name')
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching customer data:', error);
          return;
        }

        if (data && data.first_name) {
          setFirstName(data.first_name);
        }
      } catch (error) {
        console.error('Error in fetchCustomerData:', error);
      }
    };

    fetchCustomerData();
  }, []);
  
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
