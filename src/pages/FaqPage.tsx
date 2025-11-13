
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FaqSearch from '@/components/faq/FaqSearch';
import FaqCategory from '@/components/faq/FaqCategory';
import { faqData } from '@/components/faq/faqData';
import { Button } from '@/components/ui/button';
import ChatButton from '@/components/crisp/ChatButton';

const FaqPage = () => {
  const [searchResults, setSearchResults] = useState(faqData);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  // Check if user has scrolled enough to show the scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle search
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(faqData);
      return;
    }

    const filtered = faqData.map(category => {
      const filteredItems = category.items.filter(
        item => 
          item.question.toLowerCase().includes(query.toLowerCase()) || 
          item.answer.toLowerCase().includes(query.toLowerCase())
      );
      
      return filteredItems.length ? {
        ...category,
        items: filteredItems,
      } : null;
    }).filter(Boolean) as typeof faqData;

    setSearchResults(filtered);
  };

  return (
    <>
      <Helmet>
        <title>FAQ - Frequently Asked Questions | Gura</title>
        <meta name="description" content="Find answers to common questions about shopping, orders, shipping, and more on Gura" />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
      <main className="flex-grow pt-8 pb-16">
        <div className="mx-auto w-[80%] max-w-4xl px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600 text-lg mb-8">
              Find answers to the most common questions about our products, orders, shipping, and more.
            </p>
          </div>

          <FaqSearch onSearch={handleSearch} />
          
          {searchResults.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No results found</h3>
              <p className="text-gray-600">
                We couldn't find any results for your search. Try using different keywords or browse our FAQ categories below.
              </p>
            </div>
          ) : (
            searchResults.map((category, index) => (
              <FaqCategory
                key={index}
                title={category.title}
                description={category.description}
                items={category.items}
              />
            ))
          )}
          
          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
            <p className="text-gray-700 mb-4">
              Can't find the answer you're looking for? Please reach out to our customer support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate('/contact')}
              >
                Contact Support
              </Button>
              <ChatButton variant="outline" label="Live Chat" />
            </div>
          </div>
        </div>
      </main>

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}

      <Footer />
    </div>
    </>
  );
};

export default FaqPage;
