
import React, { ReactNode } from 'react';
import TopInfoBar from './TopInfoBar';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, fullWidth = false }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopInfoBar />
      <Navbar />
      <div className="flex-grow">
        <div className={`mx-auto ${fullWidth ? 'w-full' : 'w-[80%]'} px-4 max-w-7xl py-8 bg-white shadow-sm`}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
