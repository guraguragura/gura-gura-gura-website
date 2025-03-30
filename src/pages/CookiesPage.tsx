
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Separator } from "@/components/ui/separator";

const CookiesPage = () => {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
        <Separator className="mb-8" />
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">What Are Cookies</h2>
            <p className="text-gray-700">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
            </p>
            <p className="text-gray-700 mt-2">
              At Gura, we use cookies to enhance your browsing experience, analyze site traffic, personalize content, and serve targeted advertisements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800">Essential Cookies</h3>
                <p className="text-gray-700">
                  These cookies are necessary for the website to function properly. They enable core functionalities such as security, network management, and account access. You cannot opt out of these cookies.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800">Performance Cookies</h3>
                <p className="text-gray-700">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us measure and improve the performance of our site.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800">Functionality Cookies</h3>
                <p className="text-gray-700">
                  These cookies enable enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800">Targeting/Advertising Cookies</h3>
                <p className="text-gray-700">
                  These cookies are used to build a profile of your interests and show you relevant advertisements on other sites. They remember that you have visited our website and may share this information with other organizations, such as advertisers.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Third-Party Cookies</h2>
            <p className="text-gray-700">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These cookies may track your browsing activity across multiple websites.
            </p>
            <p className="text-gray-700 mt-2">
              Third-party services we use that may place cookies include:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
              <li>Google Analytics (for website analytics)</li>
              <li>Google Ads (for advertising)</li>
              <li>Facebook Pixel (for advertising and analytics)</li>
              <li>Payment processors (for transaction processing)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Managing Cookies</h2>
            <p className="text-gray-700 mb-3">
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>View the cookies stored on your computer</li>
              <li>Allow, block, or delete cookies</li>
              <li>Set preferences for certain websites</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Please note that if you choose to block certain cookies, some features of our website may not function properly.
            </p>
            <p className="text-gray-700 mt-3">
              For more information about how to manage cookies in your web browser, visit:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline">Microsoft Edge</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Cookie Preferences</h2>
            <p className="text-gray-700">
              When you first visit our website, you will be presented with a cookie banner that allows you to accept or customize your cookie preferences. You can change your preferences at any time by clicking on the "Cookie Settings" link in the footer of our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Changes to Our Cookie Policy</h2>
            <p className="text-gray-700">
              We may update our Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about our Cookie Policy, please contact us at <a href="mailto:privacy@gura.rw" className="text-brand-teal hover:underline">privacy@gura.rw</a>.
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

export default CookiesPage;
