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
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  // TEMPORARY: Disabling authentication redirect
  // useEffect(() => {
  //   // Wait until loading is done before redirecting
  //   if (!loading && !user) {
  //     navigate('/auth');
  //   }
  // }, [user, loading, navigate]);

  // Show loading spinner while checking authentication (keeping this for UX)
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // TEMPORARY: Removed this check to allow access without authentication
  // if (!user && !loading) {
  //   return <Navigate to="/auth" replace />;
  // }
  
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
