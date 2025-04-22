import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Shield, Clock, Users, Settings, Heart, Lightbulb, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
  return (
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

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden h-80">
            <img 
              src="/lovable-uploads/1d4104e3-b829-451d-a439-3c761b393137.png" 
              alt="Gura Mission" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Our <span className="text-gray-500">Mission</span></h2>
            <p className="text-gray-600 mb-4">
              Our mission is to revolutionize the retail landscape in Rwanda by offering a convenient, reliable, and enjoyable online shopping experience. We strive to meet the diverse needs of our customers through a wide selection of products, competitive prices, and exceptional service.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-4">Our <span className="text-gray-500">Vision</span></h2>
            <p className="text-gray-600 mb-4">
              Our vision is to be the premier online shopping destination in Rwanda, recognized for our commitment to quality, innovation, and customer satisfaction. We aim to continuously evolve and expand our offerings to stay ahead of market trends and customer expectations.
            </p>
          </div>
          <div className="order-1 md:order-2 rounded-lg overflow-hidden h-80">
            <img 
              src="/lovable-uploads/99aaf028-a794-4d40-a759-ec3226b6d4c2.png" 
              alt="Gura Vision" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-50 py-12 px-6 rounded-lg">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our <span className="text-gray-500">Values</span></h2>
              <div className="h-64 overflow-hidden rounded-lg mb-4">
                <img 
                  src="/lovable-uploads/d5da0d51-848e-43bf-b2fc-1af13d58f968.png" 
                  alt="Our Values" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Settings className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Quality</h3>
                      <p className="text-gray-600">
                        We are dedicated to offering quality products and services. Our stringent quality control procedures guarantee that each item upholds our high standards.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Users className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
                      <p className="text-gray-600">
                        We place our customers at the heart of everything we do. Our goal is to exceed customer expectations through every interaction.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Shield className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Reliability</h3>
                      <p className="text-gray-600">
                        We prioritize reliability with every order. Our commitment to fast delivery ensures that your purchases arrive swiftly and securely, every time.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Lightbulb className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Simplicity</h3>
                      <p className="text-gray-600">
                        Simplicity guides everything we offer. With intuitive navigation and clear choices, we ensure shopping is seamless, making it easy to find exactly what you're looking for.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We are committed to providing a seamless shopping experience through our comprehensive range of services:
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <ShoppingCart className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Shopping</h3>
              <p className="text-gray-600">
                Our intuitive website and mobile app make it easy to browse, search, and purchase products.
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                We offer multiple secure payment options, including credit/debit cards, mobile money, and bank transfers.
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                We offer fast and reliable delivery services across Rwanda, with real-time tracking options.
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Support</h3>
              <p className="text-gray-600">
                Our dedicated customer support team is available to assist you with any questions or issues. We are committed to resolving.
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Returns & Refunds</h3>
              <p className="text-gray-600">
                We offer a hassle-free returns policy, allowing you to return most new, unopened items within 30 days of delivery for a full refund.
              </p>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div>
          <div className="relative h-64 mb-8 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1526551038968-efbc38a6a167" 
              alt="Community Commitment" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl text-white font-bold text-center">Our Commitment To The Community</h2>
            </div>
          </div>
          
          <p className="text-gray-600 text-center mb-8">
            At Gura, we believe in giving back to the community. We are actively involved in various initiatives to support local communities and promote sustainable practices.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
                <span>1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Community Engagement</h3>
              <p className="text-gray-600">
                We partner with local organizations to support educational programs, healthcare initiatives, and community development projects.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
                <span>2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Education</h3>
              <p className="text-gray-600">
                New to online shopping? We've got you covered! Our easy-to-use platform guides you step-by-step through placing your order, making payments, and tracking your delivery.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
                <span>3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Empowerment</h3>
              <p className="text-gray-600">
                We support local artisans and small businesses by providing them with a platform to reach a wider audience and grow their businesses.
              </p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Products</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              At Gura, we offer a diverse range of products across various categories to meet the needs of our customers:
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="h-48 bg-yellow-100">
                <img 
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" 
                  alt="Electronics" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Electronics</h3>
                <p className="text-gray-600 text-sm">
                  Latest gadgets, smartphones, laptops, home appliances, and tech accessories from top brands.
                </p>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="h-48 bg-orange-100">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Fashion" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Fashion</h3>
                <p className="text-gray-600 text-sm">
                  Trendy clothing, footwear, and accessories for men, women, and children.
                </p>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="h-48 bg-red-100">
                <img 
                  src="https://images.unsplash.com/photo-1517649763962-0c623066013b" 
                  alt="Sports & Outdoors" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Sports & Outdoors</h3>
                <p className="text-gray-600 text-sm">
                  Stay fit, play hard, and explore without limits.
                </p>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="h-48 bg-pink-100">
                <img 
                  src="https://images.unsplash.com/photo-1607006677169-a62beb975922" 
                  alt="Beauty & Health" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Beauty & Health</h3>
                <p className="text-gray-600 text-sm">
                  Self-care starts here—explore beauty and health favorites.
                </p>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="h-48 bg-blue-100">
                <img 
                  src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6" 
                  alt="Home & Art" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Home & Art</h3>
                <p className="text-gray-600 text-sm">
                  Furniture, kitchenware, home decor, and appliances to enhance your living space.
                </p>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="h-48 bg-red-100">
                <img 
                  src="https://images.unsplash.com/photo-1542362567-b07e54358753" 
                  alt="Automotive" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Automotive</h3>
                <p className="text-gray-600 text-sm">
                  Everything your car needs, all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="bg-blue-500 text-white rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 p-8">
            <div>
              <div className="text-sm font-medium mb-2">Our App 📱</div>
              <h2 className="text-3xl font-bold mb-4">Download Our App And Grab Great Discounts On Our Products!</h2>
              <p className="mb-6 text-blue-100">
                Make shopping effortless and rewarding. Download the Gura app for personalized deals, seamless subscription management, exclusive promotions, and convenient doorstep delivery.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="bg-black rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m8 2 10 10L8 22" /></svg>
                  <div>
                    <div className="text-xs">GET IT ON</div>
                    <div className="font-medium">Google Play</div>
                  </div>
                </a>
                <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="bg-black rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" /><path d="M10 2c1 .5 2 2 2 5" /></svg>
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="font-medium">App Store</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" 
                alt="Gura Mobile App" 
                className="max-h-64 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Start Your Gura Journey Today</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop">
              <Button size="lg" className="rounded-full">
                Start Shopping
              </Button>
            </Link>
            <Link to="/app">
              <Button variant="outline" size="lg" className="rounded-full">
                Learn More About Our App
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutUsPage;
