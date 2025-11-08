import React from 'react';
import { Helmet } from 'react-helmet';
import PageLayout from '@/components/layout/PageLayout';

import MissionSection from '@/components/about/MissionSection';
import VisionSection from '@/components/about/VisionSection';
import ValuesSection from '@/components/about/ValuesSection';
import ServicesSection from '@/components/about/ServicesSection';
import CommunitySection from '@/components/about/CommunitySection';
import ProductsSection from '@/components/about/ProductsSection';
import AppDownloadSection from '@/components/about/AppDownloadSection';
import CallToActionSection from '@/components/about/CallToActionSection';

const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Gura</title>
        <meta name="description" content="Learn about Gura, Rwanda's leading e-commerce platform dedicated to providing superior online shopping experience and innovative solutions." />
      </Helmet>
      <PageLayout>
      <div className="space-y-16 py-6">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-blue-500">Gura</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Gura is a leading e-commerce platform in Rwanda, dedicated to providing a superior online shopping
            experience. We have quickly grown to become a trusted destination for high-quality products, excellent
            customer service, and innovative shopping solutions.
          </p>
        </div>

        <MissionSection />

        <VisionSection />

        <ValuesSection />

        <ServicesSection />

        <CommunitySection />

        <ProductsSection />

        <AppDownloadSection />

        <CallToActionSection />
      </div>
    </PageLayout>
    </>
  );
};

export default AboutUsPage;
