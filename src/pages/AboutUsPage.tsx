
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Info, Users, Star, Award } from 'lucide-react';

const AboutUsPage = () => {
  return (
    <PageLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About Gura</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to revolutionize e-commerce in Rwanda and beyond, making shopping more accessible, affordable, and enjoyable for everyone.
          </p>
        </div>

        {/* Our Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Info className="mr-2 h-8 w-8 text-blue-500" />
            Our Story
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 mb-4">
                Founded in 2021, Gura started with a simple idea: to create a platform that bridges the gap between local businesses and consumers in Rwanda. What began as a small startup has grown into one of the leading e-commerce platforms in the region.
              </p>
              <p className="text-gray-700 mb-4">
                Our name "Gura" comes from the Kinyarwanda word meaning "to buy," reflecting our commitment to facilitating commerce in a way that respects and celebrates local culture while embracing global innovation.
              </p>
              <p className="text-gray-700">
                Today, we connect thousands of sellers with eager customers, offering everything from electronics and home goods to local crafts and fresh produce, all delivered with the speed and reliability our customers have come to expect.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg h-80 bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">Company Timeline Image</div>
              {/* Replace with actual image: <img src="/about/our-story.jpg" alt="Gura team members" className="w-full h-full object-cover" /> */}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Star className="mr-2 h-8 w-8 text-yellow-500" />
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Customer First</h3>
                <p className="text-gray-600">
                  Every decision we make is driven by what's best for our customers. We're committed to creating experiences that delight and services that exceed expectations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Local Empowerment</h3>
                <p className="text-gray-600">
                  We believe in the power of local businesses. By providing them with a digital platform, we help them reach new markets and grow their customer base.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We continually push the boundaries of what's possible in e-commerce, embracing new technologies and ideas to improve how people shop.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Integrity</h3>
                <p className="text-gray-600">
                  Honesty and transparency are at the core of everything we do. We build trust through ethical practices and open communication.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Users className="mr-2 h-8 w-8 text-green-500" />
            Our Leadership Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Jean Mugabo", role: "CEO & Co-founder", image: "team-member-1.jpg" },
              { name: "Alice Uwase", role: "CTO & Co-founder", image: "team-member-2.jpg" },
              { name: "Robert Kagame", role: "COO", image: "team-member-3.jpg" },
              { name: "Marie Iradukunda", role: "Chief Marketing Officer", image: "team-member-4.jpg" },
              { name: "David Niyonzima", role: "Head of Logistics", image: "team-member-5.jpg" },
              { name: "Sarah Mutesi", role: "Chief Financial Officer", image: "team-member-6.jpg" }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="h-48 w-48 mx-auto rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                  <div className="text-gray-500">Photo</div>
                  {/* Replace with actual image: <img src={`/about/team/${member.image}`} alt={member.name} className="w-full h-full object-cover rounded-full" /> */}
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Impact */}
        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Award className="mr-2 h-8 w-8 text-purple-500" />
            Our Impact
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="text-4xl font-bold text-blue-600 mb-2">5000+</h3>
                  <p className="text-gray-600">Local Businesses Supported</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-blue-600 mb-2">250,000+</h3>
                  <p className="text-gray-600">Happy Customers</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-blue-600 mb-2">35+</h3>
                  <p className="text-gray-600">Cities Serviced</p>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-gray-700 text-center">
                  We're proud of the positive impact we've had on Rwanda's economy and communities. By creating jobs, supporting local businesses, and making goods more accessible, we're contributing to a more prosperous and connected Rwanda.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
};

export default AboutUsPage;
