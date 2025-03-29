
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FaqSearchProps {
  onSearch: (query: string) => void;
}

const FaqSearch: React.FC<FaqSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-10">
      <div className="relative">
        <Input 
          type="text" 
          placeholder="Search for answers..." 
          className="pl-10 py-6 text-base rounded-lg shadow-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Button 
          type="submit" 
          className="absolute right-1 top-1/2 transform -translate-y-1/2"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default FaqSearch;
