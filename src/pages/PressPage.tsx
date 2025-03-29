
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Globe, Mail, Camera, Users } from 'lucide-react';

const PressPage = () => {
  const pressReleases = [
    {
      date: "May 15, 2023",
      title: "Gura Expands Operations to Eastern Province",
      excerpt: "Following strong growth in Kigali and other major cities, Gura's e-commerce services are now available across Rwanda's Eastern Province."
    },
    {
      date: "March 2, 2023",
      title: "Gura Secures $5M in Series A Funding",
      excerpt: "The investment will accelerate growth and development of the platform's technology infrastructure."
    },
    {
      date: "December 10, 2022",
      title: "Gura Launches Express Delivery in Kigali",
      excerpt: "New 2-hour delivery service now available for select products within Kigali city limits."
    },
    {
      date: "October 5, 2022",
      title: "Gura Partners with Major Telecom for Mobile Payments",
      excerpt: "Strategic partnership enhances mobile payment options for customers across Rwanda."
    }
  ];

  const mediaFeatures = [
    {
      publication: "Rwanda Business Journal",
      date: "April 2023",
      title: "How Gura is Revolutionizing E-commerce in Rwanda",
      link: "#"
    },
    {
      publication: "Tech Africa",
      date: "January 2023",
      title: "Gura Named Among Top 10 African Startups to Watch",
      link: "#"
    },
    {
      publication: "Kigali Today",
      date: "November 2022",
      title: "Local Tech Company Gura Creating Jobs for Youth",
      link: "#"
    }
  ];

  return (
    <PageLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Press & Media</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the latest news, press releases, and media resources about Gura.
          </p>
        </div>

        {/* Press Contact Section */}
        <section className="mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-4">Press Contact</h2>
                  <p className="text-gray-700 mb-6">
                    For press inquiries, interview requests, or additional information about Gura, please contact our media relations team.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <span>press@gura.rw</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      <span>www.gura.rw/press</span>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Press Kit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Press Releases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <FileText className="mr-2 h-6 w-6 text-blue-500" />
            Press Releases
          </h2>
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-1">{release.date}</div>
                  <h3 className="text-xl font-bold mb-2">{release.title}</h3>
                  <p className="text-gray-700 mb-4">{release.excerpt}</p>
                  <a href="#" className="text-blue-600 hover:underline font-medium">Read full press release</a>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline" className="mt-4">View All Press Releases</Button>
          </div>
        </section>

        {/* Media Coverage */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Globe className="mr-2 h-6 w-6 text-blue-500" />
            Media Coverage
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mediaFeatures.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="text-sm text-gray-500 mb-1">{feature.publication} | {feature.date}</div>
                  <h3 className="text-lg font-bold mb-4 flex-grow">{feature.title}</h3>
                  <a href={feature.link} className="text-blue-600 hover:underline font-medium">Read article</a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Brand Assets */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Camera className="mr-2 h-6 w-6 text-blue-500" />
            Brand Assets
          </h2>
          <p className="text-gray-700 mb-6">
            Download official Gura logos, product images, and brand guidelines for media use. All assets are available in high resolution formats.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="h-40 bg-gray-200 flex items-center justify-center mb-4 rounded">
                  <div className="text-gray-500">Logo Pack</div>
                  {/* Replace with actual image: <img src="/press/logos-preview.jpg" alt="Gura Logos" className="w-full h-full object-cover rounded" /> */}
                </div>
                <h3 className="text-lg font-bold mb-2">Logo Pack</h3>
                <p className="text-gray-600 text-sm mb-4">Includes PNG, SVG, and EPS formats in color and monochrome versions.</p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Logos
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="h-40 bg-gray-200 flex items-center justify-center mb-4 rounded">
                  <div className="text-gray-500">Product Images</div>
                  {/* Replace with actual image: <img src="/press/product-images-preview.jpg" alt="Product Images" className="w-full h-full object-cover rounded" /> */}
                </div>
                <h3 className="text-lg font-bold mb-2">Product Images</h3>
                <p className="text-gray-600 text-sm mb-4">High-resolution images of Gura's mobile app and website interfaces.</p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Images
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="h-40 bg-gray-200 flex items-center justify-center mb-4 rounded">
                  <div className="text-gray-500">Brand Guidelines</div>
                  {/* Replace with actual image: <img src="/press/brand-guidelines-preview.jpg" alt="Brand Guidelines" className="w-full h-full object-cover rounded" /> */}
                </div>
                <h3 className="text-lg font-bold mb-2">Brand Guidelines</h3>
                <p className="text-gray-600 text-sm mb-4">Comprehensive guide to Gura's visual identity, including color palette and typography.</p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Guidelines
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Events */}
        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Users className="mr-2 h-6 w-6 text-blue-500" />
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                date: "June 15-16, 2023",
                title: "Rwanda Tech Summit",
                location: "Kigali Convention Center",
                description: "Gura's CEO will be delivering a keynote on 'The Future of E-commerce in Africa'."
              },
              {
                date: "July 22, 2023",
                title: "Gura Seller Conference",
                location: "Marriott Hotel, Kigali",
                description: "Annual conference for Gura sellers featuring workshops and networking opportunities."
              }
            ].map((event, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-1">{event.date}</div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <div className="text-gray-700 mb-3">Location: {event.location}</div>
                  <p className="text-gray-600">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default PressPage;
