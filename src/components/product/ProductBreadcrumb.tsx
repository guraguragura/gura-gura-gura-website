
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface ProductBreadcrumbProps {
  title: string;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ title }) => {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      <Link to="/" className="hover:text-blue-500">Home</Link>
      <ChevronRight className="h-4 w-4" />
      <Link to="/collections" className="hover:text-blue-500">Collections</Link>
      <ChevronRight className="h-4 w-4" />
      <span className="font-semibold text-gray-700">{title}</span>
    </div>
  );
};

export default ProductBreadcrumb;
