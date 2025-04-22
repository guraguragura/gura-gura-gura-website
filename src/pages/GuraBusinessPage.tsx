
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/business/HeroSection';
import KeyFeaturesSection from '@/components/business/KeyFeaturesSection';
import BusinessTypesTabs from '@/components/business/BusinessTypesTabs';
import BusinessBenefitsSection from '@/components/business/BusinessBenefitsSection';
import TestimonialsSection from '@/components/business/TestimonialsSection';
import ContactSection from '@/components/business/ContactSection';

const GuraBusinessPage = () => {
  return (
    <PageLayout className="space-y-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Key Features Section */}
      <KeyFeaturesSection />

      {/* Cargo Ship Image Banner */}
      <section className="max-w-4xl mx-auto px-2 md:px-0">
        <img 
          src="/lovable-uploads/365ae14c-33cb-40bf-9e0b-403f40a31a8e.png" 
          alt="Bulk shipping cargo ship"
          className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-md border border-gray-200"
        />
      </section>

      {/* Business Categories Tabs */}
      <BusinessTypesTabs />

      {/* Benefits Section */}
      <BusinessBenefitsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Bulk Purchasing Call-to-Action */}
      <section className="text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Looking to purchase in bulk?</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          For all business and wholesale purchases, please contact our dedicated sales team directly at{" "}
          <a href="mailto:sales@gura.rw" className="text-blue-600 underline">sales@gura.rw</a>. <br />
          We’ll help you find the best solution for your business needs—no registration required.
        </p>
        <div className="flex justify-center">
          <a 
            href="mailto:sales@gura.rw" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Sales
          </a>
        </div>
      </section>
    </PageLayout>
  );
};

export default GuraBusinessPage;

