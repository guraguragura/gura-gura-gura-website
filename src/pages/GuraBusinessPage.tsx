
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Briefcase, 
  Handshake, 
  Users, 
  Truck, 
  DollarSign, 
  Headset, 
  CalendarClock, 
  ShieldCheck
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
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

const GuraBusinessPage = () => {
  const businessFeatures = [
    {
      icon: Briefcase,
      title: "Efficient & Affordable Solutions",
      description: "Access bulk pricing and specialized business catalogs with competitive rates designed specifically for business needs."
    },
    {
      icon: Headset,
      title: "Dedicated Business Support",
      description: "Get priority assistance from our specialized business account managers to handle all your procurement needs."
    },
    {
      icon: DollarSign,
      title: "Flexible Payment Options",
      description: "Benefit from invoice-based payments, credit terms, and customized payment schedules to match your cash flow."
    },
    {
      icon: Truck,
      title: "Seamless Logistics & Delivery",
      description: "Enjoy prioritized shipping, scheduled deliveries, and specialized handling for your business orders."
    }
  ];

  const businessBenefits = [
    {
      title: "Time & Cost Savings",
      description: "Centralize your procurement through Gura and save valuable time and resources. Our competitive bulk pricing ensures you get the best value.",
      icon: DollarSign
    },
    {
      title: "Streamlined Procurement",
      description: "Our business portal provides advanced tools for order management, approval workflows, and detailed reporting for better spend visibility.",
      icon: Briefcase
    },
    {
      title: "Quality Assurance",
      description: "All products on our platform undergo rigorous quality checks, ensuring your business receives only the best supplies and materials.",
      icon: ShieldCheck
    },
    {
      title: "Customized Catalog",
      description: "Work with our business team to create a customized catalog of frequently ordered items with negotiated pricing specifically for your business.",
      icon: CalendarClock
    }
  ];

  const testimonials = [
    {
      quote: "Gura Business has transformed how we handle office supplies. Their bulk pricing and dedicated support save us time and money every month.",
      author: "Emmanuel N.",
      position: "Procurement Manager, Kigali Tech Hub"
    },
    {
      quote: "The customized catalog and flexible payment options make Gura the perfect partner for our hospitality business. Highly recommended!",
      author: "Claire M.",
      position: "Operations Director, Lakeside Resorts"
    },
    {
      quote: "We've reduced our procurement costs by 22% since switching to Gura Business. Their streamlined ordering system is exactly what we needed.",
      author: "Jean-Paul K.",
      position: "CFO, Rwanda Manufacturing Co."
    }
  ];

  return (
    <PageLayout className="space-y-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 -mx-8 px-8 py-16 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Gura for Business</h1>
          <p className="text-xl mb-8">
            Streamline your business procurement with specialized solutions tailored for companies of all sizes. Save time, reduce costs, and focus on what matters most – growing your business.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="#contact">Contact Our Business Team</Link>
          </Button>
        </div>
      </div>

      {/* Key Features Section */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Why Choose Gura for Your Business?</h2>
          <p className="text-xl text-gray-600 mt-2">
            Discover the advantages that make Gura the preferred procurement partner for businesses across Rwanda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 -mx-8 px-8 py-12 rounded-xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">How Gura Business Works</h2>
          <p className="text-gray-600 mt-2">
            Our simple process gets your business up and running quickly
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Register",
                description: "Create a free business account with your company details"
              },
              {
                step: "2",
                title: "Customize",
                description: "Work with our team to set up your business catalog and payment terms"
              },
              {
                step: "3",
                title: "Order",
                description: "Start placing orders with special business pricing and benefits"
              }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Categories Tabs */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Solutions for All Business Types</h2>
          <p className="text-gray-600 mt-2">
            Tailored offerings for different business needs
          </p>
        </div>

        <Tabs defaultValue="small" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="small">Small Business</TabsTrigger>
            <TabsTrigger value="medium">Medium Enterprise</TabsTrigger>
            <TabsTrigger value="large">Large Corporation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="small" className="p-6 bg-white rounded-lg shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Small Business Solutions</h3>
                <p className="text-gray-700 mb-4">
                  Affordable procurement solutions designed to help small businesses thrive without the overhead.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Access to business pricing without minimum order requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Simple monthly invoicing to manage cash flow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Basic reporting and order management tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Free delivery for orders above 100,000 RWF</span>
                  </li>
                </ul>
                <Button className="mt-6">Get Started</Button>
              </div>
              <div className="bg-gray-100 rounded-lg h-64 overflow-hidden">
                <img 
                  src="/lovable-uploads/8b872c64-6416-41e9-bcd6-fa615c17062e.png" 
                  alt="Small Business Solutions" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="medium" className="p-6 bg-white rounded-lg shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Medium Enterprise Solutions</h3>
                <p className="text-gray-700 mb-4">
                  Comprehensive procurement solutions for growing businesses with more complex needs.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Volume discounts and competitive business pricing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Dedicated account manager for personalized service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Advanced reporting and approval workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Flexible payment terms up to 30 days</span>
                  </li>
                </ul>
                <Button className="mt-6">Contact Sales</Button>
              </div>
              <div className="bg-gray-100 rounded-lg h-64 overflow-hidden">
                <img 
                  src="/lovable-uploads/2b4f1e1c-8388-4e0a-a05c-1efa3ecbb777.png" 
                  alt="Medium Enterprise Solutions" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="large" className="p-6 bg-white rounded-lg shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Large Corporation Solutions</h3>
                <p className="text-gray-700 mb-4">
                  Enterprise-grade procurement solutions with maximum customization and support.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Custom pricing with maximum volume discounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Full procurement integration with your ERP systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Comprehensive analytics and spending controls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Customizable payment terms up to 60 days</span>
                  </li>
                </ul>
                <Button className="mt-6">Schedule Consultation</Button>
              </div>
              <div className="bg-gray-100 rounded-lg h-64 overflow-hidden">
                <img 
                  src="/lovable-uploads/97209c9f-86e9-41e3-ae8c-ebfcabf91a15.png" 
                  alt="Large Corporation Solutions" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Benefits Section */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Business Benefits</h2>
          <p className="text-gray-600 mt-2">
            How Gura adds value to your business operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {businessBenefits.map((benefit, index) => (
            <div key={index} className="flex gap-6 p-6 bg-gray-50 rounded-xl">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <benefit.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 -mx-8 px-8 py-12 rounded-xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">What Our Business Clients Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <p className="italic mb-6 text-gray-700">"{testimonial.quote}"</p>
                <div className="mt-auto">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">{testimonial.position}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-blue-50 -mx-8 px-8 py-12 rounded-xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-gray-600 mt-2">
            Contact our business team to discuss how Gura can help your company
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-700">+250 788 123 456</p>
                  <p className="text-sm text-gray-500">Monday to Friday, 8am to 6pm</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-700">business@gura.rw</p>
                  <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <div>
                  <h4 className="font-semibold">Office</h4>
                  <p className="text-gray-700">123 Business Avenue, Kigali</p>
                  <p className="text-sm text-gray-500">Rwanda</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>
            <p className="text-gray-600 mb-4">
              Fill out the form below and our business team will get back to you shortly.
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input type="text" className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input type="text" className="w-full p-2 border rounded-md" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} className="w-full p-2 border rounded-md"></textarea>
              </div>
              <Button className="w-full">Submit</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to streamline your business procurement?</h2>
        <p className="text-gray-600 mb-6">
          Join the hundreds of businesses that trust Gura for their procurement needs.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg">Create Business Account</Button>
          <Button variant="outline" size="lg">Schedule Demo</Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default GuraBusinessPage;
