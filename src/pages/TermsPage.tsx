
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Separator } from "@/components/ui/separator";

const TermsPage = () => {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <Separator className="mb-8" />
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">1. Introduction</h2>
            <p className="text-gray-700">
              Welcome to Gura. These terms and conditions govern your use of our website and services. 
              By accessing or using Gura, you agree to be bound by these terms. Please read them carefully.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">2. Definitions</h2>
            <p className="text-gray-700">
              "Gura," "we," "us," and "our" refer to Gura Rwanda Ltd. "You" refers to the user or viewer of our website.
              "Services" refers to all products, services, content, features, technologies, or functions offered by Gura.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">3. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing or using our Services, you agree to these Terms and our Privacy Policy. If you do not agree to these Terms, you must not access or use our Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">4. Changes to Terms</h2>
            <p className="text-gray-700">
              We may modify these Terms at any time. We will provide notice of any material changes by posting the updated Terms on our website. Your continued use of our Services after such changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">5. Account Registration</h2>
            <p className="text-gray-700">
              To access certain features of our Services, you may need to register for an account. You must provide accurate, current, and complete information during the registration process and keep your account information updated.
            </p>
            <p className="text-gray-700 mt-2">
              You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">6. User Conduct</h2>
            <p className="text-gray-700">
              You agree not to use our Services to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe the rights of others</li>
              <li>Transmit any harmful code or material</li>
              <li>Interfere with the operation of our Services</li>
              <li>Impersonate any person or entity</li>
              <li>Engage in any fraudulent activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">7. Intellectual Property</h2>
            <p className="text-gray-700">
              All content on our website, including text, graphics, logos, images, and software, is the property of Gura or its content suppliers and is protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">8. Contact Information</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms, please contact us at <a href="mailto:support@gura.rw" className="text-brand-teal hover:underline">support@gura.rw</a>.
            </p>
          </section>

          <div className="mt-8">
            <p className="text-gray-600 italic">Last updated: May 25, 2024</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TermsPage;
