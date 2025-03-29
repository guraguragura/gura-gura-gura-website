
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Star, Coffee, Heart, Users, Zap, Globe, ArrowRight } from 'lucide-react';

const CareersPage = () => {
  const benefits = [
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "Flexible working hours and remote work options to ensure you can balance your personal and professional life."
    },
    {
      icon: Star,
      title: "Competitive Compensation",
      description: "Attractive salary packages, performance bonuses, and stock options for all full-time employees."
    },
    {
      icon: Heart,
      title: "Comprehensive Healthcare",
      description: "Full health insurance coverage for you and your dependents, including medical, dental, and vision."
    },
    {
      icon: Globe,
      title: "Professional Development",
      description: "Regular training programs, conference stipends, and educational reimbursement to help you grow."
    },
    {
      icon: Users,
      title: "Inclusive Culture",
      description: "A diverse and supportive workplace that celebrates different perspectives and ideas."
    },
    {
      icon: Zap,
      title: "Impact & Innovation",
      description: "Opportunity to work on projects that directly impact Rwanda's digital economy and commerce landscape."
    }
  ];

  const openPositions = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Kigali, Rwanda",
      type: "Full-time"
    },
    {
      title: "UX/UI Designer",
      department: "Product",
      location: "Kigali, Rwanda",
      type: "Full-time"
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Kigali, Rwanda",
      type: "Full-time"
    },
    {
      title: "Customer Support Specialist",
      department: "Operations",
      location: "Remote, Rwanda",
      type: "Full-time"
    },
    {
      title: "Data Analyst",
      department: "Business Intelligence",
      location: "Kigali, Rwanda",
      type: "Full-time"
    },
    {
      title: "Logistics Coordinator",
      department: "Operations",
      location: "Kigali, Rwanda",
      type: "Full-time"
    }
  ];

  return (
    <PageLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Work with a talented team, build innovative solutions, and help shape the future of e-commerce in Rwanda.
          </p>
        </div>

        {/* Why Join Gura */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Work With Us?</h2>
              <p className="text-gray-700 mb-6">
                At Gura, we're more than just an e-commerce platform. We're a team of passionate individuals dedicated to transforming how people shop in Rwanda and beyond. We value innovation, collaboration, and impact in everything we do.
              </p>
              <p className="text-gray-700 mb-6">
                Our team members enjoy a dynamic work environment where ideas are valued, growth is encouraged, and achievements are celebrated. We believe in empowering our employees to take ownership of their work and make meaningful contributions.
              </p>
              <Button className="flex items-center gap-2">
                View Open Positions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden h-80 bg-gray-200 flex items-center justify-center">
              <div className="text-gray-500 text-center">Team Photo</div>
              {/* Replace with actual image: <img src="/careers/team-photo.jpg" alt="Gura team members" className="w-full h-full object-cover" /> */}
            </div>
          </div>
        </section>

        {/* Benefits and Perks */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Benefits & Perks</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="mb-4 bg-blue-50 p-3 inline-block rounded-full">
                    <benefit.icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Briefcase className="mr-2 h-8 w-8 text-blue-500" />
            Open Positions
          </h2>
          <div className="space-y-4">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{position.title}</h3>
                      <div className="text-gray-600 mb-2">{position.department} • {position.location} • {position.type}</div>
                    </div>
                    <Button className="mt-4 md:mt-0">View Position</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Life at Gura */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Life at Gura</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-gray-500">Photo {item}</div>
                {/* Replace with actual image: <img src={`/careers/life-at-gura-${item}.jpg`} alt="Life at Gura" className="w-full h-full object-cover rounded-lg" /> */}
              </div>
            ))}
          </div>
        </section>

        {/* Employee Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Team Says</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Jean Paul",
                role: "Software Engineer",
                tenure: "2 years",
                quote: "Working at Gura has been the highlight of my career. The challenges are real, but so is the support and opportunity to grow."
              },
              {
                name: "Marie",
                role: "Product Manager",
                tenure: "3 years",
                quote: "I love that we're building products that genuinely improve people's lives. The culture of innovation here is inspiring."
              },
              {
                name: "Eric",
                role: "Customer Support Lead",
                tenure: "1.5 years",
                quote: "Gura really values its employees. The work-life balance and growth opportunities here are better than anywhere I've worked before."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gray-50 h-full">
                <CardContent className="p-6">
                  <p className="italic mb-4">"{testimonial.quote}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role} • {testimonial.tenure}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Application Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Hiring Process</h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Application Review",
                description: "Submit your resume and cover letter. Our team will review your application and get back to you within 5 business days."
              },
              {
                step: "2",
                title: "Initial Interview",
                description: "A 30-minute call with our HR team to discuss your background, experience, and expectations."
              },
              {
                step: "3",
                title: "Technical Assessment",
                description: "Depending on the role, you may be asked to complete a technical assessment or case study."
              },
              {
                step: "4",
                title: "Team Interview",
                description: "Meet with the team you'll be working with to discuss your skills and how you'd fit into the team."
              },
              {
                step: "5",
                title: "Final Interview",
                description: "A final conversation with senior leadership to discuss company culture and your career goals."
              }
            ].map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Join Our Team?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals who are passionate about what they do. Check out our open positions or drop us your resume for future opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              View Open Positions
            </Button>
            <Button variant="outline" className="border-blue-600 text-blue-600">
              Send Speculative Application
            </Button>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default CareersPage;
