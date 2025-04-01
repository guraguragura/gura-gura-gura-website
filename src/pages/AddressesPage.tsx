
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Addresses } from '@/components/account/Addresses';

const AddressesPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-2xl font-bold mb-6">My Addresses</h1>
          <div className="bg-white shadow rounded-lg p-6">
            <Addresses />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddressesPage;
