import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building,
  Users,
  ChartBar,
  Package,
  Megaphone,
  DollarSign,
  ShieldCheck,
  Truck,
  BadgePercent
} from 'lucide-react';
import HeroSection from './PartnerWithGuraPage/HeroSection';
import StatisticsBanner from './PartnerWithGuraPage/StatisticsBanner';
import PartnerBenefits from './PartnerWithGuraPage/PartnerBenefits';
import HowItWorks from './PartnerWithGuraPage/HowItWorks';
import SellerTypesTabs from './PartnerWithGuraPage/SellerTypesTabs';

import ProcessFlow from './PartnerWithGuraPage/ProcessFlow';
import TestimonialsSection from './PartnerWithGuraPage/TestimonialsSection';
import ApplicationSection from './PartnerWithGuraPage/ApplicationSection';
import FaqSection from './PartnerWithGuraPage/FaqSection';
import FinalCTA from './PartnerWithGuraPage/FinalCTA';

const PartnerCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <Card className="h-full border-2 border-transparent hover:border-blue-100 transition-all duration-300 hover:shadow-lg">
    <CardContent className="p-6 flex flex-col h-full">
      <div className="mb-4 bg-blue-50 p-3 rounded-full w-14 h-14 flex items-center justify-center">
        <Icon className="h-7 w-7 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>
    </CardContent>
  </Card>
);

const SalesData = ({ number, label }: { number: string, label: string }) => (
  <div className="text-center px-4">
    <div className="text-3xl font-bold text-blue-600">{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

const ProcessStep = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="flex flex-col md:flex-row items-start gap-4">
    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const PartnerWithGuraPage = () => {
  return (
    <PageLayout className="space-y-16">
      <HeroSection />
      <StatisticsBanner />
      <PartnerBenefits />
      <HowItWorks />
      <SellerTypesTabs />
      
      <ProcessFlow />
      <TestimonialsSection />
      <ApplicationSection />
      <FaqSection />
      <FinalCTA />
    </PageLayout>
  );
};

export default PartnerWithGuraPage;
