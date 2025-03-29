
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  Truck, 
  Shield, 
  CreditCard, 
  HeartHandshake, 
  Smile, 
  Users, 
  ArrowRight, 
  Star, 
  RefreshCw,
  PhoneCall
} from 'lucide-react';

const AdvantageCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-blue-100">
    <CardContent className="p-6 flex flex-col items-center text-center h-full">
      <div className="mb-4 bg-blue-50 p-3 rounded-full">
        <Icon className="h-8 w-8 text-blue-500" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

const StepCard = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
      {number}
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

const ServiceHighlight = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex items-start gap-4">
    <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const AdvantagesPage = () => {
  const advantages = [
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Most orders in Kigali are delivered within 24 hours, and nationwide delivery is available within 2-3 days."
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description: "All products on our platform undergo rigorous quality checks to ensure they meet our high standards."
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Enjoy free shipping on orders over 30,000 RWF in Kigali and 50,000 RWF nationwide."
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Our platform uses the latest security measures to protect your personal and payment information."
    },
    {
      icon: CreditCard,
      title: "Flexible Payment Options",
      description: "Pay with mobile money, credit/debit cards, or choose our convenient cash on delivery option."
    },
    {
      icon: HeartHandshake,
      title: "Support Local Businesses",
      description: "By shopping with Gura, you're supporting thousands of local Rwandan businesses and entrepreneurs."
    },
    {
      icon: Smile,
      title: "Easy Returns",
      description: "Not satisfied with your purchase? Return it within 7 days for a full refund or exchange."
    },
    {
      icon: Users,
      title: "Dedicated Customer Support",
      description: "Our friendly customer service team is available 24/7 to assist you with any questions or concerns."
    }
  ];

  const services = [
    {
      icon: PhoneCall,
      title: "Customer Service",
      description: "Our professional customer service team is ready to answer all your questions 24/7."
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "Changed your mind? You can return most products within 7 days for a full refund."
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "We offer same-day delivery in Kigali and nationwide delivery within 2-3 days."
    }
  ];

  return (
    <PageLayout>
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Why Choose Gura?</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the benefits that make Gura the preferred e-commerce platform for thousands of Rwandans.
          </p>
        </div>

        {/* Key Services Overview */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ServiceHighlight 
                key={i}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>

        {/* Tabs for Different Services */}
        <div>
          <Tabs defaultValue="shopping" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="shopping">Shopping Made Easy</TabsTrigger>
              <TabsTrigger value="delivery">Reliable Delivery</TabsTrigger>
              <TabsTrigger value="service">Customer Service</TabsTrigger>
            </TabsList>
            <TabsContent value="shopping" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Shopping Made Easy</h2>
                  <p className="text-gray-700 mb-4">
                    With thousands of products across dozens of categories, finding what you need is easy on Gura. 
                    Our user-friendly website and mobile app make browsing and purchasing a breeze.
                  </p>
                  <div className="space-y-4 mt-6">
                    <StepCard 
                      number="1" 
                      title="Browse Products" 
                      description="Search our vast catalog or browse by category to find what you're looking for." 
                    />
                    <StepCard 
                      number="2" 
                      title="Add to Cart" 
                      description="Select your items, choose quantities, and add them to your shopping cart." 
                    />
                    <StepCard 
                      number="3" 
                      title="Checkout" 
                      description="Enter your delivery details and payment information to complete your purchase." 
                    />
                  </div>
                </div>
                <div className="h-80 bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src="/lovable-uploads/4de8f3ef-2f9c-4028-b855-f7d4a316dabf.png" 
                    alt="Shopping Experience" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="delivery" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 h-80 bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src="/lovable-uploads/61870ac8-67b1-4faf-9fa6-e40f60010b9d.png" 
                    alt="Delivery Service" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h2 className="text-2xl font-bold mb-4">Fast & Reliable Delivery</h2>
                  <p className="text-gray-700 mb-4">
                    We understand that getting your purchases quickly is important. 
                    That's why we've built one of Rwanda's most efficient delivery networks.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Same-day delivery available in Kigali for orders placed before 12pm</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">2-3 day nationwide delivery to all provinces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Track your order in real-time through our app</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Free shipping on orders over 30,000 RWF in Kigali</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="service" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Customer Service Excellence</h2>
                  <p className="text-gray-700 mb-4">
                    Our friendly customer service team is available 24/7 to assist you with any questions or concerns.
                    We're committed to ensuring your shopping experience is smooth and enjoyable.
                  </p>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Ways to Contact Us:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <div className="bg-blue-100 p-1 rounded">
                          <PhoneCall className="h-4 w-4 text-blue-600" />
                        </div>
                        <span>Call us: +250 788 123 456</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="bg-blue-100 p-1 rounded">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                        </div>
                        <span>Live Chat: Available on our website and app</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="bg-blue-100 p-1 rounded">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        </div>
                        <span>Email: support@gura.rw</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="h-80 bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src="/lovable-uploads/9f9f6f6c-f423-47c6-8964-326b064c2fd8.png" 
                    alt="Customer Service" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Advantages Grid */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">All the Benefits of Shopping with Gura</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <AdvantageCard 
                key={index}
                icon={advantage.icon}
                title={advantage.title}
                description={advantage.description}
              />
            ))}
          </div>
        </div>

        {/* Customer Testimonials */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Emmanuel K.",
                location: "Kigali",
                rating: 5,
                quote: "Gura has completely changed how I shop. Fast delivery, great prices, and the customer service is exceptional!"
              },
              {
                name: "Diane M.",
                location: "Musanze",
                rating: 5,
                quote: "I love that I can now get products from Kigali delivered to my doorstep in Musanze within just 2 days. Amazing service!"
              },
              {
                name: "Patrick R.",
                location: "Huye",
                rating: 5,
                quote: "As a small business owner, selling on Gura has helped me reach customers across Rwanda that I never could before."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white relative">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="italic mb-4 text-gray-700">"{testimonial.quote}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.location}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/shop">
              <Button className="group">
                Start Shopping Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>

        {/* More Info Sections */}
        <section className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
            <Separator className="mb-4" />
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-700">Kigali City</span>
                <span className="font-medium">Same Day / Next Day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Northern Province</span>
                <span className="font-medium">2-3 Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Southern Province</span>
                <span className="font-medium">2-3 Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Eastern Province</span>
                <span className="font-medium">2-3 Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Western Province</span>
                <span className="font-medium">2-3 Days</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Payment Methods</h3>
            <Separator className="mb-4" />
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Credit/Debit Cards</h4>
                  <p className="text-sm text-gray-600">Visa, MasterCard, and other major cards accepted</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M5 4h14c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" /><path d="M18 8H6" /><path d="M18 12H6" /><path d="M12 16H6" /></svg>
                </div>
                <div>
                  <h4 className="font-medium">Mobile Money</h4>
                  <p className="text-sm text-gray-600">MTN Mobile Money and Airtel Money</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="8" cy="8" r="7" /><path d="M18.09 10.37A6 6 0 1 1 9.33 5.62" /><path d="M10.68 16.32A6 6 0 1 0 19.44 11.58" /></svg>
                </div>
                <div>
                  <h4 className="font-medium">Cash on Delivery</h4>
                  <p className="text-sm text-gray-600">Pay when your order arrives</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
                </div>
                <div>
                  <h4 className="font-medium">Bank Transfer</h4>
                  <p className="text-sm text-gray-600">Direct bank transfers accepted</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-lg text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to experience the Gura advantage?</h2>
          <p className="text-blue-100 mb-6">Join the thousands of satisfied customers who shop with Gura every day.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop">
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Start Shopping
              </Button>
            </Link>
            <Link to="/app">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-blue-700">
                Download Our App
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default AdvantagesPage;
