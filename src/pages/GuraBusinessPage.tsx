
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

      {/* CTA */}
      <CTASection />
    </PageLayout>
  );
};

export default GuraBusinessPage;
