
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Separator } from "@/components/ui/separator";

const PrivacyPage = () => {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <Separator className="mb-8" />
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">1. Introduction</h2>
            <p className="text-gray-700">
              At Gura, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
            </p>
            <p className="text-gray-700 mt-2">
              By using our website and services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">2. Information We Collect</h2>
            <p className="text-gray-700 mb-3">
              We collect several types of information from and about users of our website, including:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><span className="font-medium">Personal information:</span> Name, email address, postal address, phone number, and payment information</li>
              <li><span className="font-medium">Account information:</span> Username, password, and account preferences</li>
              <li><span className="font-medium">Transaction information:</span> Details about purchases made through our platform</li>
              <li><span className="font-medium">Technical information:</span> IP address, browser type, device information, and cookies</li>
              <li><span className="font-medium">Usage information:</span> Pages visited, time spent on pages, and other interaction data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-3">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Processing and fulfilling your orders</li>
              <li>Creating and managing your account</li>
              <li>Providing customer support</li>
              <li>Sending transactional emails and order updates</li>
              <li>Sending marketing communications (if you've opted in)</li>
              <li>Improving our website and services</li>
              <li>Analyzing usage patterns and trends</li>
              <li>Protecting against fraud and unauthorized transactions</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">4. How We Share Your Information</h2>
            <p className="text-gray-700 mb-3">
              We may share your personal information with:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><span className="font-medium">Service providers:</span> Third parties that help us operate our website and provide services (e.g., payment processors, shipping companies)</li>
              <li><span className="font-medium">Business partners:</span> Trusted partners who help us offer products and services</li>
              <li><span className="font-medium">Legal authorities:</span> When required by law or to protect our rights</li>
            </ul>
            <p className="text-gray-700 mt-3">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">5. Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">6. Your Rights</h2>
            <p className="text-gray-700 mb-3">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing of your personal information</li>
              <li>Data portability</li>
              <li>Objection to processing of your personal information</li>
              <li>Withdrawal of consent</li>
            </ul>
            <p className="text-gray-700 mt-3">
              To exercise any of these rights, please contact us at <a href="mailto:privacy@gura.rw" className="text-brand-teal hover:underline">privacy@gura.rw</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">7. Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">8. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions or concerns about our privacy policy, please contact us at <a href="mailto:privacy@gura.rw" className="text-brand-teal hover:underline">privacy@gura.rw</a>.
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

export default PrivacyPage;
