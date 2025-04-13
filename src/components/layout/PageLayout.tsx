
import React, { ReactNode } from 'react';
import TopInfoBar from './TopInfoBar';
import Navbar from './Navbar';
import Footer from './Footer';
import { useIsMobile } from "@/hooks/use-mobile";

interface PageLayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
  noPadding?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  fullWidth = false,
  className = "",
  noPadding = false
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopInfoBar />
      <Navbar />
      <div className="flex-grow">
        <div className={`mx-auto ${fullWidth ? 'w-full' : 'w-full md:w-[95%] lg:w-[90%] xl:w-[80%]'} max-w-7xl ${isMobile ? 'px-2 py-2' : 'px-2 sm:px-4 py-4 sm:py-8'} bg-white shadow-sm ${noPadding ? 'p-0' : ''} ${className}`}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
