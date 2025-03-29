
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Zap, Bell, MapPin, CreditCard, Lock, Star } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex gap-4 items-start">
    <div className="bg-blue-50 p-2 rounded-full shrink-0">
      <Icon className="h-6 w-6 text-blue-500" />
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const GuraAppPage = () => {
  const appFeatures = [
    {
      icon: Zap,
      title: "Fast Browsing",
      description: "Browse thousands of products quickly with our optimized app interface."
    },
    {
      icon: Bell,
      title: "Real-time Order Updates",
      description: "Get notifications at every stage of your order, from confirmation to delivery."
    },
    {
      icon: MapPin,
      title: "Order Tracking",
      description: "Track your orders in real-time and know exactly when they'll arrive."
    },
    {
      icon: CreditCard,
      title: "Quick Checkout",
      description: "Save your payment details for a faster, one-tap checkout experience."
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "Your data is encrypted and never shared with third parties."
    },
    {
      icon: Star,
      title: "Exclusive App Deals",
      description: "Access special promotions and discounts only available to app users."
    }
  ];

  return (
    <PageLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">The Gura Mobile App</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Shop smarter, faster, and more conveniently with the Gura mobile app — your entire marketplace in your pocket.
          </p>
        </div>

        {/* App Preview Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Shop Anytime, Anywhere</h2>
            <p className="text-gray-700 mb-6">
              The Gura mobile app brings the entire marketplace to your fingertips. Whether you're at home, at work, or on the go, our app makes shopping quick and convenient.
            </p>
            <div className="space-y-6">
              {appFeatures.slice(0, 3).map((feature, index) => (
                <FeatureCard 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-[500px] bg-gray-200 rounded-3xl flex items-center justify-center shadow-lg">
              <div className="text-gray-500 text-center">
                <Smartphone className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                App Screenshot
              </div>
              {/* Replace with actual app screenshot: <img src="/app/app-screenshot.png" alt="Gura Mobile App" className="rounded-2xl" /> */}
            </div>
          </div>
        </section>

        {/* More Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">More Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {appFeatures.slice(3).map((feature, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <FeatureCard 
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Download Section */}
        <section className="bg-blue-600 text-white rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4">Download the Gura App Today</h2>
              <p className="mb-6 text-blue-100">
                Join thousands of satisfied users who shop on Gura every day. Our app is free, fast, and secure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="block">
                  <img 
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                    alt="Get it on Google Play" 
                    className="h-14"
                  />
                </a>
                <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="block">
                  <img 
                    src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" 
                    alt="Download on the App Store" 
                    className="h-14"
                  />
                </a>
              </div>
            </div>
            <div className="flex items-end justify-center bg-blue-700 p-6">
              <div className="w-52 h-96 bg-gray-200 rounded-t-2xl flex items-center justify-center">
                <div className="text-gray-500 text-center">
                  <Smartphone className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  App Preview
                </div>
                {/* Replace with actual app preview: <img src="/app/app-preview.png" alt="Gura App Preview" className="rounded-t-2xl" /> */}
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">What Users Say About Our App</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { rating: 5, review: "The app is so intuitive and fast. I can find what I need in seconds!" },
              { rating: 5, review: "I love the exclusive app discounts. I've saved so much money!" },
              { rating: 4, review: "Great app! The order tracking feature is incredibly helpful." },
              { rating: 5, review: "The notifications keep me updated on my orders. Very convenient!" }
            ].map((review, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="italic text-gray-600">"{review.review}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default GuraAppPage;
