
import React from "react";

const AppDownloadSection = () => (
  <div className="bg-blue-500 text-white rounded-lg overflow-hidden">
    <div className="grid md:grid-cols-2 gap-6 p-8">
      <div>
        <div className="text-sm font-medium mb-2">Our App 📱</div>
        <h2 className="text-3xl font-bold mb-4">
          Download Our App And Grab Great Discounts On Our Products!
        </h2>
        <p className="mb-6 text-blue-100">
          Make shopping effortless and rewarding. Download the Gura app for personalized deals, seamless subscription management, exclusive promotions, and convenient doorstep delivery.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m8 2 10 10L8 22" /></svg>
            <div>
              <div className="text-xs">GET IT ON</div>
              <div className="font-medium">Google Play</div>
            </div>
          </a>
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-900 transition-colors"
          >
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
);

export default AppDownloadSection;
