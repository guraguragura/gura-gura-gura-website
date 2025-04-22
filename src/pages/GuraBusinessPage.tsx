
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/business/HeroSection';
import KeyFeaturesSection from '@/components/business/KeyFeaturesSection';
import HowItWorksSection from '@/components/business/HowItWorksSection';
import BusinessTypesTabs from '@/components/business/BusinessTypesTabs';
import BusinessBenefitsSection from '@/components/business/BusinessBenefitsSection';
import TestimonialsSection from '@/components/business/TestimonialsSection';
import ContactSection from '@/components/business/ContactSection';
import CTASection from '@/components/business/CTASection';

const GuraBusinessPage = () => {
  return (
    <PageLayout className="space-y-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Key Features Section */}
      <KeyFeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Business Categories Tabs */}
      <BusinessTypesTabs />

      {/* Benefits Section */}
      <BusinessBenefitsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Updated CTA Section */}
      <section className="text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Interested in Bulk Purchasing?</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          For businesses looking to purchase in bulk, please get in touch with our sales team directly at{" "}
          <a href="mailto:sales@gura.rw" className="text-blue-600 underline">sales@gura.rw</a>. We will help tailor solutions to your specific needs.
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
