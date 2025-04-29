
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AccountLayout } from '@/components/account/AccountLayout';
import { PersonalInfo } from '@/components/account/PersonalInfo';
import { Addresses } from '@/components/account/Addresses';
import { Wishlist } from '@/components/account/Wishlist';
import { Orders } from '@/components/account/Orders';
import { OrderDetails } from '@/components/account/OrderDetails';
import { Returns } from '@/components/account/Returns';
import ReturnRequestForm from '@/components/account/ReturnRequestForm';
import { useAuth } from '@/contexts/AuthContext';

const AccountPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return null; // Will redirect in the useEffect
  }
  
  return (
    <AccountLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/account/personal-info" replace />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/returns/new/:orderId/:orderItemId" element={<ReturnRequestForm />} />
        <Route path="*" element={<Navigate to="/account/personal-info" replace />} />
      </Routes>
    </AccountLayout>
  );
};

export default AccountPage;
