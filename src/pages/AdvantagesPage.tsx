
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/advantages/HeroSection';
import ServicesOverview from '@/components/advantages/ServicesOverview';
import ServiceTabs from '@/components/advantages/ServiceTabs';
import AdvantagesGrid from '@/components/advantages/AdvantagesGrid';
import Testimonials from '@/components/advantages/Testimonials';
import InfoSections from '@/components/advantages/InfoSections';
import CallToAction from '@/components/advantages/CallToAction';

const AdvantagesPage = () => {
  return (
    <PageLayout>
      <div className="space-y-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Key Services Overview */}
        <ServicesOverview />

        {/* Tabs for Different Services */}
        <ServiceTabs />

        {/* Advantages Grid */}
        <AdvantagesGrid />

        {/* Customer Testimonials */}
        <Testimonials />

        {/* More Info Sections */}
        <InfoSections />

        {/* Call to Action */}
        <CallToAction />
      </div>
    </PageLayout>
  );
};

export default AdvantagesPage;
