
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
  const partnerBenefits = [
    {
      icon: Building,
      title: "Trusted & Recognized Brand",
      description: "Join Rwanda's leading e-commerce platform with a strong reputation for quality and reliability that customers trust."
    },
    {
      icon: Users,
      title: "Large & Growing Customer Base",
      description: "Gain immediate access to our extensive customer base across Rwanda, with thousands of daily active shoppers."
    },
    {
      icon: ChartBar,
      title: "Expand Your Reach",
      description: "Extend your market reach beyond your physical location to customers throughout Rwanda with our nationwide delivery network."
    },
    {
      icon: Megaphone,
      title: "Marketing & Visibility Support",
      description: "Benefit from our marketing campaigns, featured product placements, and promotions to increase your products' visibility."
    },
    {
      icon: DollarSign,
      title: "Secure Payments & Seller Support",
      description: "Receive timely payments with our secure payment processing and dedicated seller support team to help you succeed."
    }
  ];

  const sellerTools = [
    {
      title: "Seller Dashboard",
      description: "Comprehensive analytics and sales management tools to track performance and growth opportunities.",
      icon: ChartBar
    },
    {
      title: "Inventory Management",
      description: "Easy-to-use tools to manage your product listings, stock levels, and pricing in real-time.",
      icon: Package
    },
    {
      title: "Order Processing",
      description: "Streamlined order fulfillment with notifications, shipping label generation, and tracking integration.",
      icon: Truck
    },
    {
      title: "Promotional Tools",
      description: "Create discounts, bundle offers, and flash sales to boost your visibility and sales on the platform.",
      icon: BadgePercent
    }
  ];

  const testimonials = [
    {
      quote: "Partnering with Gura has transformed our business. We've expanded from a small local shop to selling nationwide with minimal overhead.",
      author: "Marie C.",
      business: "Kigali Craft Collective"
    },
    {
      quote: "The seller dashboard makes it easy to manage inventory and track sales. Our revenue has increased by 40% since joining the Gura platform.",
      author: "Patrick N.",
      business: "Tech Essentials Rwanda"
    },
    {
      quote: "As a small producer, Gura has given us access to customers we could never reach before. Their seller support team is always ready to help.",
      author: "Diane M.",
      business: "Rwandan Spice Company"
    }
  ];

  return (
    <PageLayout className="space-y-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 -mx-8 px-8 py-16 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Partner with Gura</h1>
          <p className="text-xl mb-8">
            Join Rwanda's leading e-commerce platform and sell your products to customers nationwide. Expand your business reach with our trusted marketplace.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="#apply">Become a Seller</Link>
          </Button>
        </div>
      </div>

      {/* Statistics Banner */}
      <section className="bg-blue-50 -mx-8 px-8 py-10 rounded-xl">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SalesData number="1M+" label="Monthly Visitors" />
            <SalesData number="5,000+" label="Active Sellers" />
            <SalesData number="50,000+" label="Products" />
            <SalesData number="98%" label="Customer Satisfaction" />
          </div>
        </div>
      </section>

      {/* Partner Benefits */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Why Sell on Gura?</h2>
          <p className="text-xl text-gray-600 mt-2">
            Discover the advantages that make Gura the preferred marketplace for thousands of sellers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnerBenefits.map((benefit, index) => (
            <PartnerCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 -mx-8 px-8 py-12 rounded-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">How to Become a Gura Seller</h2>
          <p className="text-gray-600 mt-2">
            Simple steps to start selling on our platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <ProcessStep 
            number="1" 
            title="Apply to Sell" 
            description="Fill out our seller application with your business information and product categories you want to sell." 
          />
          <ProcessStep 
            number="2" 
            title="Verification & Approval" 
            description="Our team will review your application, verify your business documents, and set up your seller account." 
          />
          <ProcessStep 
            number="3" 
            title="Set Up Your Store" 
            description="Upload your products, set prices, and customize your seller profile with our easy-to-use tools." 
          />
          <ProcessStep 
            number="4" 
            title="Start Selling" 
            description="Launch your store on Gura and start receiving orders from customers across Rwanda." 
          />
        </div>
      </section>

      {/* Seller Types */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Solutions for All Seller Types</h2>
          <p className="text-gray-600 mt-2">
            Whether you're a small artisan or a large manufacturer, we have the right tools for you
          </p>
        </div>

        <Tabs defaultValue="small" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="small">Small Sellers</TabsTrigger>
            <TabsTrigger value="medium">Medium Businesses</TabsTrigger>
            <TabsTrigger value="large">Large Enterprises</TabsTrigger>
          </TabsList>
          
          <TabsContent value="small" className="p-6 bg-white rounded-lg shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Small Sellers & Artisans</h3>
                <p className="text-gray-700 mb-4">
                  Perfect for independent creators, small shops, and individual entrepreneurs looking to expand their reach.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Low commission rates and no monthly fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Simple product listing tools with step-by-step guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Optional fulfillment services if you can't handle shipping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Weekly payment processing</span>
                  </li>
                </ul>
                <Button className="mt-6">Apply Now</Button>
              </div>
              <div className="bg-gray-100 rounded-lg h-64 overflow-hidden">
                <img 
                  src="/lovable-uploads/5bc8b271-aa7d-4103-8681-58b3e69bf415.png" 
                  alt="Small Sellers & Artisans" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="medium" className="p-6 bg-white rounded-lg shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Medium Businesses</h3>
                <p className="text-gray-700 mb-4">
                  Tailored for established businesses looking to expand their online presence and reach new customers.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Competitive commission rates with volume discounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Advanced inventory management and bulk uploading tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Featured placement opportunities and promotional support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Bi-weekly payment processing</span>
                  </li>
                </ul>
                <Button className="mt-6">Contact Sales</Button>
              </div>
              <div className="bg-gray-100 rounded-lg h-64 overflow-hidden">
                <img 
                  src="/lovable-uploads/8bb30b2b-7c22-4d70-99e4-285be1712bb4.png" 
                  alt="Medium Businesses" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="large" className="p-6 bg-white rounded-lg shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Large Enterprises</h3>
                <p className="text-gray-700 mb-4">
                  Enterprise solutions for manufacturers, distributors, and large retailers with extensive product catalogs.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Lowest commission rates and customized fee structures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>API integration for seamless inventory and order management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Dedicated account manager and priority seller support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">✓</div>
                    <span>Weekly payment processing with custom options available</span>
                  </li>
                </ul>
                <Button className="mt-6">Enterprise Solutions</Button>
              </div>
              <div className="bg-gray-100 rounded-lg h-64 overflow-hidden">
                <img 
                  src="/lovable-uploads/189d5b38-0cf3-4a56-9606-2caba74233ca.png" 
                  alt="Large Enterprises" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Seller Tools */}
      <section className="bg-gray-50 -mx-8 px-8 py-12 rounded-xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Powerful Tools for Sellers</h2>
          <p className="text-gray-600 mt-2">
            Everything you need to manage and grow your business on Gura
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {sellerTools.map((tool, index) => (
            <div key={index} className="flex gap-6 p-6 bg-white rounded-xl shadow-sm">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <tool.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                <p className="text-gray-600">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fee Structure */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Transparent Fee Structure</h2>
          <p className="text-gray-600 mt-2">
            Simple and fair commission rates with no hidden charges
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              category: "Fashion & Accessories",
              commission: "15%",
              notes: "Free product photography available"
            },
            {
              category: "Electronics & Appliances",
              commission: "10%",
              notes: "Volume discounts available"
            },
            {
              category: "Home & Garden",
              commission: "12%",
              notes: "Includes customer service support"
            },
            {
              category: "Food & Groceries",
              commission: "8%",
              notes: "Special handling for perishables"
            },
            {
              category: "Health & Beauty",
              commission: "15%",
              notes: "Certification assistance available"
            },
            {
              category: "Handcrafted Items",
              commission: "12%",
              notes: "Artisan support program"
            }
          ].map((fee, i) => (
            <Card key={i} className="border-2 border-gray-100">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">{fee.category}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">{fee.commission}</div>
                <p className="text-gray-600 text-sm">{fee.notes}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center text-gray-600 mt-6">
          * Additional fees may apply for premium placements and promotional features
        </p>
      </section>

      {/* Testimonials */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Success Stories from Our Sellers</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <p className="italic mb-6 text-gray-700">"{testimonial.quote}"</p>
                <div className="mt-auto">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">{testimonial.business}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Application Section */}
      <section id="apply" className="bg-blue-50 -mx-8 px-8 py-12 rounded-xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Apply to Become a Seller</h2>
          <p className="text-gray-600 mt-2">
            Fill out the form below to start your journey as a Gura seller
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-bold mb-4">What You'll Need</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <div className="text-blue-600 text-sm font-bold">1</div>
                </div>
                <div>
                  <h4 className="font-semibold">Business Registration</h4>
                  <p className="text-sm text-gray-600">Valid business registration or tax ID</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <div className="text-blue-600 text-sm font-bold">2</div>
                </div>
                <div>
                  <h4 className="font-semibold">Bank Account</h4>
                  <p className="text-sm text-gray-600">Active bank account for receiving payments</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <div className="text-blue-600 text-sm font-bold">3</div>
                </div>
                <div>
                  <h4 className="font-semibold">Product Information</h4>
                  <p className="text-sm text-gray-600">Details about the products you want to sell</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <div className="text-blue-600 text-sm font-bold">4</div>
                </div>
                <div>
                  <h4 className="font-semibold">Contact Information</h4>
                  <p className="text-sm text-gray-600">Valid phone number and email address</p>
                </div>
              </li>
            </ul>
            
            <div className="mt-8 p-4 bg-blue-100 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold">Seller Protection Guarantee</h4>
              </div>
              <p className="text-sm text-gray-700">
                We're committed to creating a safe marketplace for both sellers and buyers. Our seller protection policies help safeguard your business while selling on Gura.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">Seller Application</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" className="w-full p-2 border rounded-md" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input type="text" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Categories</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select a category</option>
                  <option value="fashion">Fashion & Accessories</option>
                  <option value="electronics">Electronics & Appliances</option>
                  <option value="home">Home & Garden</option>
                  <option value="food">Food & Groceries</option>
                  <option value="health">Health & Beauty</option>
                  <option value="craft">Handcrafted Items</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your products</label>
                <textarea rows={3} className="w-full p-2 border rounded-md"></textarea>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" className="mt-1" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to Gura's Seller Terms and Conditions and Privacy Policy
                </label>
              </div>
              <Button className="w-full">Submit Application</Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              question: "How long does the application process take?",
              answer: "Typically, the application review process takes 3-5 business days. Once approved, you can start setting up your store immediately."
            },
            {
              question: "When and how will I get paid?",
              answer: "Payments are processed weekly or bi-weekly depending on your seller level. You'll receive payments directly to your registered bank account."
            },
            {
              question: "What happens if a customer returns a product?",
              answer: "We have a fair returns policy. If a return is initiated within our policy guidelines, the commission will be refunded along with the product cost."
            },
            {
              question: "Can I sell internationally through Gura?",
              answer: "Currently, Gura focuses on the Rwandan market, but we're expanding to neighboring countries soon. Stay tuned for international selling opportunities."
            },
            {
              question: "How do I manage shipping and delivery?",
              answer: "You can choose to handle shipping yourself or use Gura's fulfillment services. We provide integrated shipping labels and tracking for all sellers."
            }
          ].map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50 font-semibold">{faq.question}</div>
              <div className="p-4">{faq.answer}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to grow your business with Gura?</h2>
        <p className="text-gray-600 mb-6">
          Join thousands of successful sellers on Rwanda's leading e-commerce platform.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <a href="#apply">Apply Now</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/faq">Learn More</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default PartnerWithGuraPage;
